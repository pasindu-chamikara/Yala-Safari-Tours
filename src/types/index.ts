export type Role = "CUSTOMER" | "STAFF" | "ADMIN" | "SUPER_ADMIN";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED";
  createdAt: string;
}

export interface Review {
  id?: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: string;
}

export interface Notification {
  id?: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface SiteSettings {
  contactEmail: string;
  contactPhone: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  tripAdvisorUrl: string;
  taxRate: number;
}
