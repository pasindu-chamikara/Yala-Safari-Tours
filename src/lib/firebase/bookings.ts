import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db } from './config';

export interface BookingData {
  tourId: string;
  tourName: string;
  date: string;
  adults: number;
  children: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  paymentStatus: 'UNPAID' | 'PAID';
  paidAt?: string;
  paidBy?: string;
  userId?: string; // Optional if guest checkout
}

export const createBooking = async (bookingData: Omit<BookingData, 'paymentStatus' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, 'bookings'), {
      ...bookingData,
      status: 'PENDING',
      paymentStatus: 'UNPAID',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding booking: ', error);
    return { success: false, error };
  }
};

export const getBookings = async () => {
  try {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const bookings: (BookingData & { id: string; createdAt: any })[] = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() } as any);
    });
    return { success: true, data: bookings };
  } catch (error) {
    console.error('Error fetching bookings: ', error);
    return { success: false, error, data: [] };
  }
};

export const updateBookingStatus = async (id: string, status: BookingData['status']) => {
  try {
    const docRef = doc(db, 'bookings', id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating booking status: ', error);
    return { success: false, error };
  }
};

export const markBookingAsPaid = async (id: string, staffUid: string) => {
  try {
    const docRef = doc(db, 'bookings', id);
    await updateDoc(docRef, {
      paymentStatus: 'PAID',
      paidAt: new Date().toISOString(),
      paidBy: staffUid,
      updatedAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error marking booking as paid: ', error);
    return { success: false, error };
  }
};
