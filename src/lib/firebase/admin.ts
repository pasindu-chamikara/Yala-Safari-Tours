import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const initAdmin = () => {
  if (!getApps().length) {
    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.FIREBASE_PRIVATE_KEY) {
        initializeApp({
          credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          }),
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        });
      }
    } catch (error) {
      console.error("Firebase admin initialization error", error);
    }
  }
};

export const getAdminAuth = () => { initAdmin(); return getAuth(); };
export const getAdminDb = () => { initAdmin(); return getFirestore(); };
export const getAdminStorage = () => { initAdmin(); return getStorage(); };
