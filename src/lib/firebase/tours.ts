import { collection, addDoc, serverTimestamp, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
import { db, storage } from './config';
import { Tour } from '../data/tours';

export const uploadTourImage = async (file: File): Promise<string> => {
  try {
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
    const compressedFile = await imageCompression(file, options);
    const fileName = `${Date.now()}_${compressedFile.name}`;
    const storageRef = ref(storage, `tours/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, compressedFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

export const getTours = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'tours'));
    const tours: Tour[] = [];
    querySnapshot.forEach((doc) => {
      tours.push({ id: doc.id, ...doc.data() } as Tour);
    });
    return { success: true, data: tours };
  } catch (error) {
    console.error('Error fetching tours: ', error);
    return { success: false, error, data: [] };
  }
};

export const createTour = async (tourData: Omit<Tour, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, 'tours'), {
      ...tourData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating tour: ', error);
    return { success: false, error };
  }
};

export const updateTour = async (id: string, tourData: Partial<Tour>) => {
  try {
    const docRef = doc(db, 'tours', id);
    await updateDoc(docRef, {
      ...tourData,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating tour: ', error);
    return { success: false, error };
  }
};

export const deleteTour = async (id: string) => {
  try {
    const docRef = doc(db, 'tours', id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting tour: ', error);
    return { success: false, error };
  }
};

// Seed function for development
export const seedTours = async (localTours: Tour[]) => {
    for (const tour of localTours) {
        // Just checking if exists by id might be tricky if IDs are auto-generated,
        // but let's just add them.
        await createTour(tour);
    }
}
