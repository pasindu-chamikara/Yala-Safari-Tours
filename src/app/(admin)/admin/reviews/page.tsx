"use client";

import { useEffect, useState } from "react";
import { getAllReviews, updateReviewStatus, deleteReview } from "@/lib/firebase/reviews";
import { Review } from "@/types";
import RoleGuard from "@/components/auth/RoleGuard";
import { CheckCircle, XCircle, Trash2, Star, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function ReviewsManagementPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    const { success, data } = await getAllReviews();
    if (success && data) {
      setReviews(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id: string) => {
    const { success } = await updateReviewStatus(id, true);
    if (success) {
      toast.success("Review approved and is now public.");
      setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
    } else {
      toast.error("Failed to approve review.");
    }
  };

  const handleHide = async (id: string) => {
    const { success } = await updateReviewStatus(id, false);
    if (success) {
      toast.success("Review hidden from public view.");
      setReviews(prev => prev.map(r => r.id === id ? { ...r, approved: false } : r));
    } else {
      toast.error("Failed to hide review.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this review?")) return;
    
    const { success } = await deleteReview(id);
    if (success) {
      toast.success("Review deleted.");
      setReviews(prev => prev.filter(r => r.id !== id));
    } else {
      toast.error("Failed to delete review.");
    }
  };

  if (loading) {
    return (
      <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN", "STAFF"]}>
        <div className="flex h-64 items-center justify-center">
          <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-700"></div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN", "STAFF"]}>
      <div className="space-y-6 relative">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Reviews & Feedback</h1>
            <p className="text-stone-500">Manage customer reviews before they appear on the public site.</p>
          </div>
        </div>

        <div className="grid gap-4">
          {reviews.length === 0 ? (
            <div className="bg-white p-8 text-center text-stone-500 border border-stone-100 shadow-sm">
              No reviews have been submitted yet.
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className={`bg-white border p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start ${review.approved ? 'border-stone-200' : 'border-amber-200 bg-amber-50/30'}`}>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-stone-900">{review.userName}</h3>
                    <div className="flex items-center space-x-2 text-sm text-stone-500">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-stone-300"}`} />
                    ))}
                  </div>

                  <p className="text-stone-700 mt-2 italic">"{review.comment}"</p>
                  
                  <div className="pt-2">
                    {review.approved ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        Public
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        Pending Approval
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                  {!review.approved ? (
                    <button
                      onClick={() => handleApprove(review.id!)}
                      className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 text-sm font-medium transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleHide(review.id!)}
                      className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-stone-100 text-stone-700 hover:bg-stone-200 px-4 py-2 text-sm font-medium transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Hide</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id!)}
                    className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </RoleGuard>
  );
}