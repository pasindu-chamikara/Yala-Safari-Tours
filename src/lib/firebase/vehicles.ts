import { db, storage } from './config';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export interface Vehicle {
  id: string;
  title: string;
  url: string;
  storagePath: string;
  createdAt: number;
}

const COLLECTION_NAME = 'vehicles';

export async function uploadVehicleImage(file: File, title: string): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    // Create a unique filename
    const timestamp = Date.now();
    const storagePath = `vehicles/${timestamp}_${file.name}`;
    const storageRef = ref(storage, storagePath);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Add document to Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      title,
      url: downloadURL,
      storagePath,
      createdAt: serverTimestamp()
    });

    return { success: true, data: { id: docRef.id, url: downloadURL, storagePath } };
  } catch (error: any) {
    console.error("Error uploading vehicle image:", error);
    return { success: false, error: error.message };
  }
}

export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const vehicles: Vehicle[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      vehicles.push({
        id: doc.id,
        title: data.title || '',
        url: data.url || '',
        storagePath: data.storagePath || '',
        createdAt: data.createdAt?.toMillis() || Date.now(),
      });
    });
    
    return vehicles;
  } catch (error) {
    console.error("Error getting vehicles:", error);
    return [];
  }
}

export async function deleteVehicle(id: string, storagePath: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Delete from Firestore
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    
    // Delete from Storage
    if (storagePath) {
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting vehicle:", error);
    return { success: false, error: error.message };
  }
}
