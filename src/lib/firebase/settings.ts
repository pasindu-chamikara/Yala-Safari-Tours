import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./config";
import { SiteSettings } from "@/types";

const defaultSettings: SiteSettings = {
  contactEmail: "info@yalasafari.com",
  contactPhone: "+94 77 123 4567",
  address: "Yala National Park, Sri Lanka",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  tripAdvisorUrl: "https://tripadvisor.com",
  taxRate: 0,
};

export const getSiteSettings = async (): Promise<{ success: boolean; data?: SiteSettings; error?: any }> => {
  try {
    const docRef = doc(db, "settings", "general");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() as SiteSettings };
    } else {
      // If no settings exist yet, return defaults
      return { success: true, data: defaultSettings };
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
    return { success: false, error };
  }
};

export const updateSiteSettings = async (settings: SiteSettings): Promise<{ success: boolean; error?: any }> => {
  try {
    const docRef = doc(db, "settings", "general");
    await setDoc(docRef, settings, { merge: true });
    return { success: true };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error };
  }
};
