import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from './config';
import { UserProfile, Role } from '@/types';

export const getUsers = async (roles?: Role[]) => {
  try {
    let q = collection(db, 'users') as any;
    
    if (roles && roles.length > 0) {
      q = query(collection(db, 'users'), where('role', 'in', roles));
    }
    
    const querySnapshot = await getDocs(q);
    const users: UserProfile[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ uid: doc.id, ...doc.data() } as UserProfile);
    });
    return { success: true, data: users };
  } catch (error) {
    console.error('Error fetching users: ', error);
    return { success: false, error, data: [] };
  }
};

export const updateUserRole = async (uid: string, role: Role) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, { role });
    return { success: true };
  } catch (error) {
    console.error('Error updating user role: ', error);
    return { success: false, error };
  }
};
