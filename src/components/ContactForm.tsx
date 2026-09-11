"use client";

import { useState, useEffect } from "react";
import { Send, UserCircle } from "lucide-react";
import { addMessage } from "@/lib/firebase/messages";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function ContactForm() {
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    
    try {
      await addMessage({
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
      });
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-stone-50 p-8 border border-stone-200 flex justify-center items-center h-[400px]">
        <div className="animate-spin h-8 w-8 border-b-2 border-[#314a1c]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-stone-50 p-12 border border-stone-200 text-center flex flex-col items-center justify-center min-h-[400px]">
        <UserCircle className="w-16 h-16 text-stone-300 mb-6" />
        <h2 className="text-3xl text-stone-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
          Authentication Required
        </h2>
        <p className="text-stone-600 mb-8 max-w-md mx-auto">
          You must be logged in to send us a message. Please sign in or create an account to continue.
        </p>
        <Link 
          href="/login?redirect=/contact" 
          className="bg-[#314a1c] hover:bg-[#1f3012] text-white font-bold py-3 px-8 text-lg transition-all inline-block uppercase tracking-wider"
        >
          Login / Register
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 p-8 border border-stone-200">
      <h2 className="text-3xl text-stone-900 mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
        Send a Message
      </h2>
      
      {isSuccess && (
        <div className="mb-6 p-4 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-none flex items-center justify-between">
          <span>Your message has been sent successfully! We will get back to you shortly.</span>
          <button onClick={() => setIsSuccess(false)} className="text-emerald-800 font-bold ml-4 hover:opacity-75">×</button>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 border border-red-200 rounded-none">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-stone-700">First Name</label>
            <input required type="text" id="firstName" name="firstName" defaultValue={user.displayName?.split(' ')[0] || ''} className="w-full bg-white border border-stone-300 px-4 py-3 rounded-none focus:outline-none focus:border-[#314a1c] focus:ring-1 focus:ring-[#314a1c] transition-colors" placeholder="John" />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-stone-700">Last Name</label>
            <input required type="text" id="lastName" name="lastName" defaultValue={user.displayName?.split(' ').slice(1).join(' ') || ''} className="w-full bg-white border border-stone-300 px-4 py-3 rounded-none focus:outline-none focus:border-[#314a1c] focus:ring-1 focus:ring-[#314a1c] transition-colors" placeholder="Doe" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-stone-700">Email Address</label>
          <input required type="email" id="email" name="email" defaultValue={user.email || ''} readOnly className="w-full bg-stone-100 border border-stone-300 px-4 py-3 rounded-none text-stone-500 cursor-not-allowed focus:outline-none" />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-medium text-stone-700">Subject</label>
          <input required type="text" id="subject" name="subject" className="w-full bg-white border border-stone-300 px-4 py-3 rounded-none focus:outline-none focus:border-[#314a1c] focus:ring-1 focus:ring-[#314a1c] transition-colors" placeholder="How can we help?" />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-stone-700">Message</label>
          <textarea required id="message" name="message" rows={5} className="w-full bg-white border border-stone-300 px-4 py-3 rounded-none focus:outline-none focus:border-[#314a1c] focus:ring-1 focus:ring-[#314a1c] transition-colors resize-none" placeholder="Tell us about your plans..."></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-[#314a1c] hover:bg-[#1f3012] text-white font-bold py-4 px-8 text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
