"use client";

import { useState } from "react";
import { createReview } from "@/lib/firebase/reviews";
import { useAuth } from "@/hooks/useAuth";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function LeaveReviewPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) {
      toast.error("You must be logged in to leave a review.");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    setSubmitting(true);
    const { success } = await createReview({
      userId: profile.uid,
      userName: profile.name || "Guest",
      rating,
      comment,
    });

    if (success) {
      toast.success("Thank you! Your review has been submitted for approval.");
      router.push("/");
    } else {
      toast.error("Failed to submit review.");
    }
    setSubmitting(false);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 max-w-md w-full shadow-lg text-center space-y-6">
          <Star className="w-16 h-16 text-stone-300 mx-auto" />
          <h1 className="text-2xl font-bold text-stone-800">Please Sign In</h1>
          <p className="text-stone-600">You must be logged in to leave a review of your experience.</p>
          <Link href="/login?redirect=/leave-review" className="block w-full bg-emerald-700 text-white py-3 font-semibold hover:bg-emerald-600 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-stone-50 flex flex-col items-center justify-center">
      <Navbar />
      <div className="flex-1 w-full flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white shadow-xl p-8 md:p-12 mt-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-stone-900 uppercase tracking-widest mb-3">Leave a Review</h1>
          <p className="text-stone-600">We hope you had a wonderful safari experience! Please share your thoughts.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center">
            <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-4">Overall Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-stone-300"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <p className="text-stone-500 text-sm mt-3">
              {rating === 5 ? "Excellent!" : rating === 4 ? "Very Good" : rating === 3 ? "Average" : rating === 2 ? "Poor" : rating === 1 ? "Terrible" : ""}
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider mb-2">Your Comments</label>
            <textarea
              required
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your tour guide, the animals you saw, and your overall experience..."
              className="w-full p-4 border border-stone-300 focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-emerald-700 text-white py-4 font-bold tracking-widest uppercase hover:bg-emerald-600 transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
      </div>
    </div>
  );
}
