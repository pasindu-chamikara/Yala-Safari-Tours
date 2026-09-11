"use client";

import { useEffect, useState, Suspense } from "react";
import { getBookings, markBookingAsPaid, BookingData } from "@/lib/firebase/bookings";
import RoleGuard from "@/components/auth/RoleGuard";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircle, AlertCircle } from "lucide-react";

function PaymentsContent() {
  const [bookings, setBookings] = useState<(BookingData & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const filterStatus = searchParams.get("status"); // "paid" or "unpaid"
  const { user } = useAuth();

  const fetchPayments = async () => {
    setLoading(true);
    const { success, data } = await getBookings();
    if (success && data) {
      setBookings(data as any);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleMarkAsPaid = async (bookingId: string) => {
    if (!user) return;
    if (confirm("Confirm payment collected for this booking?")) {
      const res = await markBookingAsPaid(bookingId, user.uid);
      if (res.success) {
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, paymentStatus: "PAID" } : b));
      } else {
        alert("Failed to mark as paid");
      }
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filterStatus === "paid") return b.paymentStatus === "PAID";
    if (filterStatus === "unpaid") return b.paymentStatus === "UNPAID" || !b.paymentStatus;
    return true; // show all if no filter
  });

  const totalRevenue = bookings.filter(b => b.paymentStatus === "PAID").reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Payments</h1>
          <p className="text-stone-500">Manage safari payments and collection.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-none shadow-sm border border-stone-100">
          <p className="text-sm font-medium text-stone-500 mb-1">Total Bookings</p>
          <p className="text-3xl font-bold text-stone-900">{bookings.length}</p>
        </div>
        <div className="bg-white p-6 rounded-none shadow-sm border border-stone-100">
          <p className="text-sm font-medium text-stone-500 mb-1">Unpaid Bookings</p>
          <p className="text-3xl font-bold text-amber-600">{bookings.filter(b => b.paymentStatus !== "PAID").length}</p>
        </div>
        <div className="bg-white p-6 rounded-none shadow-sm border border-stone-100">
          <p className="text-sm font-medium text-stone-500 mb-1">Paid Bookings</p>
          <p className="text-3xl font-bold text-emerald-600">{bookings.filter(b => b.paymentStatus === "PAID").length}</p>
        </div>
        <div className="bg-emerald-900 p-6 rounded-none shadow-sm text-white">
          <p className="text-sm font-medium text-emerald-200 mb-1">Collected Revenue</p>
          <p className="text-3xl font-bold">Rs. {totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-none shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-5 border-b border-stone-100 bg-stone-50 flex justify-between items-center">
          <h2 className="font-semibold text-stone-800">
            {filterStatus === "paid" ? "Paid Bookings" : filterStatus === "unpaid" ? "Unpaid Bookings" : "All Payment History"}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-white text-stone-900 uppercase font-medium border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Package</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-stone-500">
                    No payments found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4 font-mono text-xs">{booking.id.substring(0, 8).toUpperCase()}</td>
                    <td className="px-6 py-4 font-medium text-stone-900">{booking.customerName}</td>
                    <td className="px-6 py-4">{booking.tourName}</td>
                    <td className="px-6 py-4">{booking.date}</td>
                    <td className="px-6 py-4 font-medium">Rs. {booking.totalPrice?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {booking.paymentStatus === "PAID" ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-none text-xs font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3 h-3 mr-1" /> Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-none text-xs font-semibold bg-amber-100 text-amber-800">
                          <AlertCircle className="w-3 h-3 mr-1" /> Unpaid
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {booking.paymentStatus !== "PAID" && (
                        <button
                          onClick={() => handleMarkAsPaid(booking.id)}
                          className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-1.5 px-3 rounded transition-colors"
                        >
                          Mark as Paid
                        </button>
                      )}
                      {booking.paymentStatus === "PAID" && (
                        <span className="text-xs text-stone-400">Paid by Staff</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN", "STAFF"]}>
      <Suspense fallback={<div className="p-8">Loading payments...</div>}>
        <PaymentsContent />
      </Suspense>
    </RoleGuard>
  );
}
