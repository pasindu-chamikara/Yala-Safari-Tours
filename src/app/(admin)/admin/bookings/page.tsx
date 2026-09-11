"use client";

import { useEffect, useState, useMemo } from "react";
import { getBookings, updateBookingStatus, BookingData } from "@/lib/firebase/bookings";
import { format } from "date-fns";
import { Search, Filter } from "lucide-react";

type BookingWithId = BookingData & { id: string; createdAt: any };

export default function BookingsManagement() {
  const [bookings, setBookings] = useState<BookingWithId[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");

  const fetchBookings = async () => {
    setLoading(true);
    const { success, data } = await getBookings();
    if (success && data) {
      setBookings(data as BookingWithId[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, newStatus: BookingData['status']) => {
    const res = await updateBookingStatus(id, newStatus);
    if (res.success) {
      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
      );
    } else {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "CONFIRMED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "CANCELLED":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-stone-100 text-stone-800 border-stone-200";
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchSearch = 
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.tourName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatus = statusFilter === "ALL" || booking.status === statusFilter;
      const matchPayment = paymentFilter === "ALL" || booking.paymentStatus === paymentFilter;

      return matchSearch && matchStatus && matchPayment;
    });
  }, [bookings, searchQuery, statusFilter, paymentFilter]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Bookings Management</h1>
          <p className="text-stone-500">View, filter, and manage all safari reservations.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-none shadow-sm border border-stone-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search ID, Name, or Package..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        
        <div className="flex w-full md:w-auto gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-stone-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-none focus:ring-emerald-500 focus:border-emerald-500 block p-2"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="bg-stone-50 border border-stone-200 text-stone-700 text-sm rounded-none focus:ring-emerald-500 focus:border-emerald-500 block p-2"
          >
            <option value="ALL">All Payments</option>
            <option value="PAID">Paid</option>
            <option value="UNPAID">Unpaid</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-none shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-stone-900 uppercase font-medium border-b border-stone-200">
              <tr>
                <th className="px-6 py-4">Booking ID & Date</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Package Details</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-stone-500">
                    <p className="text-lg font-medium text-stone-900">No bookings found</p>
                    <p>Try adjusting your search or filters.</p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-stone-50">
                    <td className="px-6 py-4">
                      <p className="font-mono text-xs text-stone-500 mb-1">{booking.id.substring(0,8).toUpperCase()}</p>
                      <p className="font-medium text-stone-900">
                        {booking.date ? format(new Date(booking.date), "MMM dd, yyyy") : "N/A"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-stone-900">{booking.customerName}</p>
                      <p className="text-xs text-stone-500">{booking.customerPhone}</p>
                      <p className="text-xs text-stone-500">{booking.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-stone-900">{booking.tourName}</p>
                      <p className="text-xs text-stone-500">{booking.adults} Adults, {booking.children} Kids</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-stone-900">Rs. {booking.totalPrice?.toLocaleString()}</p>
                      <span className={`text-[10px] uppercase tracking-wider font-bold ${booking.paymentStatus === 'PAID' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {booking.paymentStatus || 'UNPAID'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 border rounded-none text-[11px] uppercase tracking-wider font-bold ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value as BookingData['status'])}
                        className="text-xs font-medium border-stone-200 rounded-none bg-white text-stone-700 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 border shadow-sm"
                      >
                        <option value="PENDING">Set Pending</option>
                        <option value="CONFIRMED">Confirm Booking</option>
                        <option value="COMPLETED">Mark Completed</option>
                        <option value="CANCELLED">Cancel Booking</option>
                      </select>
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
