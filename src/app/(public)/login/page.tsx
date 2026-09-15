"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

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
          const { signOut } = await import("firebase/auth");
          await signOut(auth);
          setError("Staff and Admin accounts must use the Admin Login portal.");
        } else {
          router.push(redirectPath);
        }
      } else {
        router.push(redirectPath);
      }
      
    } catch (err: any) {
      console.error(err);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-stone-50">
      <div className="w-full max-w-md bg-white p-8 rounded-none shadow-md border border-stone-200">
        <h1 className="text-3xl font-bold text-stone-900 mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 text-stone-900 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 text-stone-900 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded-none transition-colors"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-stone-600">
          Don't have an account? <Link href="/register" className="text-emerald-700 font-medium hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-700"></div></div>}>
      <LoginForm />
    </Suspense>
  );
}
