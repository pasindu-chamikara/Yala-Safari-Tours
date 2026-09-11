"use client";

import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: Role[];
  fallbackRoute?: string;
  loginRoute?: string;
}

export default function RoleGuard({
  children,
  allowedRoles,
  fallbackRoute = "/",
  loginRoute = "/login",
}: RoleGuardProps) {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(loginRoute);
      } else if (profile) {
        if (allowedRoles.includes(profile.role)) {
          setIsAuthorized(true);
        } else {
          router.push(fallbackRoute);
        }
      }
      // If user exists but profile is null, we do not redirect. We will handle it in the render block.
    }
  }, [user, profile, loading, router, allowedRoles, fallbackRoute]);

  if (loading || (user && profile && !isAuthorized)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  if (user && !profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-stone-50 text-center">
        <div className="max-w-md bg-white p-8 rounded-none shadow-sm border border-red-100">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Profile Not Found</h2>
          <p className="text-stone-600 mb-6">
            You are logged in, but your database profile is missing (likely due to the earlier database error).
          </p>
          <div className="bg-stone-100 p-4 rounded-none mb-6 text-left">
            <p className="text-sm font-bold text-stone-500 mb-1">Your exact UID is:</p>
            <code className="text-emerald-700 font-mono font-bold break-all">{user.uid}</code>
          </div>
          <p className="text-sm text-stone-500 mb-6">
            Please ensure you created a document in the <strong>users</strong> collection with exactly this UID as the Document ID, and added the <code>role</code> field.
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={async () => {
                try {
                  await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    role: "SUPER_ADMIN",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                  });
                  window.location.reload();
                } catch (error) {
                  alert("Failed to create profile. Ensure Firestore is in Test Mode.");
                  console.error(error);
                }
              }}
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-none transition-colors"
            >
              Auto-Fix: Create Super Admin Profile
            </button>
            <button 
              onClick={async () => {
                await logout();
                window.location.href = "/login";
              }}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-2 px-4 rounded-none transition-colors"
            >
              Log Out & Switch Accounts
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
