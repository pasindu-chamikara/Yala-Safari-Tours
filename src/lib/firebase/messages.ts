import { db } from "./config";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from "firebase/firestore";
import { ContactMessage } from "@/types";

const COLLECTION_NAME = "messages";

export const addMessage = async (messageData: Omit<ContactMessage, "id" | "status" | "createdAt">) => {
  const newMessage: Omit<ContactMessage, "id"> = {
    ...messageData,
    status: "UNREAD",
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), newMessage);
  return docRef.id;
};

export const getMessages = async (): Promise<ContactMessage[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as ContactMessage));
};

export const updateMessageStatus = async (id: string, status: ContactMessage["status"]) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, { status });
};

export const deleteMessage = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};
