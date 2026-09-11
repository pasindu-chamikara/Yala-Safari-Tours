"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Role } from "@/types";
import { Suspense } from "react";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Create auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update auth profile
      await updateProfile(user, { displayName: name });

      // 3. Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        role: "CUSTOMER" as Role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // 4. Redirect
      router.push(redirectPath);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-stone-50">
      <div className="w-full max-w-md bg-white p-8 rounded-none shadow-md border border-stone-200">
        <h1 className="text-3xl font-bold text-stone-900 mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded-none transition-colors mt-2"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-stone-600">
          Already have an account? <Link href="/login" className="text-emerald-700 font-medium hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-stone-50"><div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-700"></div></div>}>
      <RegisterForm />
    </Suspense>
  );
}
