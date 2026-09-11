import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy } from 'firebase/firestore';
import { db } from './config';
import { Review } from '@/types';

export const createReview = async (review: Omit<Review, 'id' | 'createdAt' | 'approved'>) => {
  try {
    const docRef = await addDoc(collection(db, 'reviews'), {
      ...review,
      approved: false, // Reviews start as pending
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating review: ', error);
    return { success: false, error };
  }
};

export const getApprovedReviews = async () => {
  try {
    const q = query(collection(db, 'reviews'), where('approved', '==', true));
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
    });
    // Sort in memory to avoid needing a composite index
    reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return { success: true, data: reviews };
  } catch (error) {
    console.error('Error fetching approved reviews: ', error);
    return { success: false, error, data: [] };
  }
};

export const getAllReviews = async () => {
  try {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const reviews: Review[] = [];
    querySnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
    });
    return { success: true, data: reviews };
  } catch (error) {
    console.error('Error fetching all reviews: ', error);
    return { success: false, error, data: [] };
  }
};

export const updateReviewStatus = async (id: string, approved: boolean) => {
  try {
    const docRef = doc(db, 'reviews', id);
    await updateDoc(docRef, { approved });
    return { success: true };
  } catch (error) {
    console.error('Error updating review status: ', error);
    return { success: false, error };
  }
};

export const deleteReview = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'reviews', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting review: ', error);
    return { success: false, error };
  }
};
