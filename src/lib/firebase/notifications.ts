import { collection, addDoc, getDocs, updateDoc, doc, query, orderBy, limit, deleteDoc } from 'firebase/firestore';
import { db } from './config';
import { Notification } from '@/types';

export const createNotification = async (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'notifications'), {
      ...notification,
      read: false,
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error creating notification: ', error);
    return { success: false, error };
  }
};

export const getAdminNotifications = async () => {
  try {
    const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'), limit(50));
    const querySnapshot = await getDocs(q);
    const notifications: Notification[] = [];
    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() } as Notification);
    });
    return { success: true, data: notifications };
  } catch (error) {
    console.error('Error fetching notifications: ', error);
    return { success: false, error, data: [] };
  }
};

export const markNotificationRead = async (id: string) => {
  try {
    const docRef = doc(db, 'notifications', id);
    await updateDoc(docRef, { read: true });
    return { success: true };
  } catch (error) {
    console.error('Error marking notification as read: ', error);
    return { success: false, error };
  }
};

export const markAllNotificationsRead = async () => {
  try {
    // Ideally done via a batched write or server function, but for small amounts this is okay,
    // or we can just fetch and update.
    const { data } = await getAdminNotifications();
    const unread = data?.filter(n => !n.read) || [];
    
    // Process sequentially (simple approach)
    for (const notif of unread) {
      if (notif.id) {
        await updateDoc(doc(db, 'notifications', notif.id), { read: true });
      }
    }
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteNotification = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'notifications', id));
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
