"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Fetch user profile to determine role
      const { doc, getDoc } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase/config");
      
      const docRef = doc(db, "users", userCredential.user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const profile = docSnap.data();
        if (profile.role === "SUPER_ADMIN" || profile.role === "ADMIN" || profile.role === "STAFF") {
          router.push("/admin");
        } else {
          await signOut(auth);
          setError("Access denied. This portal is for staff only.");
        }
      } else {
        await signOut(auth);
        setError("Access denied. No profile found.");
      }
      
    } catch (err: any) {
      console.error(err);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-stone-900">
      <div className="w-full max-w-md bg-stone-800 p-8 rounded-none shadow-xl border border-stone-700">
        <h1 className="text-3xl font-bold text-white mb-2 text-center" style={{ fontFamily: 'var(--font-playfair)' }}>Admin Portal</h1>
        <p className="text-stone-400 text-center mb-6 text-sm">Staff & Administrator Access Only</p>
        
        {error && <p className="text-red-400 bg-red-900/30 p-3 text-sm mb-4 text-center border border-red-800">{error}</p>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-stone-900 border border-stone-700 text-white rounded-none focus:outline-none focus:border-emerald-500 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-stone-900 border border-stone-700 text-white rounded-none focus:outline-none focus:border-emerald-500 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-none transition-colors mt-2"
          >
            {loading ? "Authenticating..." : "Secure Login"}
          </button>
        </form>
        <div className="mt-6 pt-6 border-t border-stone-700 text-center">
          <Link href="/login" className="text-sm text-stone-500 hover:text-stone-300 transition-colors">
            &larr; Back to Customer Login
          </Link>
        </div>
      </div>
    </div>
  );
}
