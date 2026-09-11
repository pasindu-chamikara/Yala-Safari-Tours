import { db, storage } from './config';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import imageCompression from 'browser-image-compression';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  createdAt: string | Date;
  fileName: string;
}

const COLLECTION_NAME = 'gallery';

export const addGalleryImage = async (
  file: File,
  title: string,
  description: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Compress the image before uploading
      const options = {
        maxSizeMB: 1, // Compress to max 1MB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      
      const compressedFile = await imageCompression(file, options);
      
      // 1. Upload to Storage
      const fileName = `${Date.now()}_${compressedFile.name}`;
      const storageRef = ref(storage, `gallery/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(progress);
          }
        },
        (error) => {
          console.error('Upload failed:', error);
          reject(error);
        },
        async () => {
          try {
            // 2. Get Download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // 3. Add to Firestore
            const galleryData = {
              url: downloadURL,
              title,
              description,
              fileName,
              createdAt: Timestamp.now(),
            };

            const docRef = await addDoc(collection(db, COLLECTION_NAME), galleryData);
            resolve(docRef.id);
          } catch (error) {
            console.error('Error adding document:', error);
            reject(error);
          }
        }
      );
    } catch (error) {
      console.error('Compression failed:', error);
      reject(error);
    }
  });
};

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        url: data.url,
        title: data.title,
        description: data.description,
        createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        fileName: data.fileName,
      } as GalleryImage;
    });
  } catch (error) {
    console.error('Error getting gallery images:', error);
    throw error;
  }
};

export const deleteGalleryImage = async (id: string, fileName: string): Promise<void> => {
  try {
    // 1. Delete from Firestore
    await deleteDoc(doc(db, COLLECTION_NAME, id));

    // 2. Delete from Storage
    const storageRef = ref(storage, `gallery/${fileName}`);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    throw error;
  }
};
