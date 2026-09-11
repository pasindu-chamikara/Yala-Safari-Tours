"use client";

import { useEffect, useState } from "react";
import { getBookings, BookingData } from "@/lib/firebase/bookings";
import { useAuth } from "@/hooks/useAuth";
import { 
  CalendarDays, 
  Wallet, 
  CalendarCheck, 
  Car,
  Clock,
  TrendingUp,
  XCircle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [bookings, setBookings] = useState<(BookingData & { id: string; createdAt: any })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const res = await getBookings();
      if (res.success && res.data) {
        setBookings(res.data as any);
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  // Calculate metrics
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  
  const totalBookings = bookings.length;
  const todaysSafaris = bookings.filter(b => b.date === today);
  const upcomingSafaris = bookings.filter(b => b.date > today && b.status !== "CANCELLED");
  
  const pendingCount = bookings.filter(b => b.status === "PENDING").length;
  const confirmedCount = bookings.filter(b => b.status === "CONFIRMED").length;
  const completedCount = bookings.filter(b => b.status === "COMPLETED").length;
  const cancelledCount = bookings.filter(b => b.status === "CANCELLED").length;
  
  const unpaidCount = bookings.filter(b => b.paymentStatus !== "PAID").length;
  
  const revenueTotal = bookings.filter(b => b.paymentStatus === "PAID").reduce((acc, b) => acc + (b.totalPrice || 0), 0);
  const revenueToday = bookings.filter(b => b.paymentStatus === "PAID" && b.paidAt?.startsWith(today)).reduce((acc, b) => acc + (b.totalPrice || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Dashboard Overview</h1>
        <p className="text-stone-500">Welcome back, {profile?.name || "Admin"}. Here is what's happening today.</p>
      </div>

      {/* Top Main KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-none shadow-sm border border-stone-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Today's Safaris</p>
            <p className="text-3xl font-bold text-stone-900 mt-1">{todaysSafaris.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-none flex items-center justify-center">
            <CalendarDays className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-none shadow-sm border border-stone-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Pending Approvals</p>
            <p className="text-3xl font-bold text-stone-900 mt-1">{pendingCount}</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-none flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-none shadow-sm border border-stone-100 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-stone-500">Unpaid Bookings</p>
            <p className="text-3xl font-bold text-stone-900 mt-1">{unpaidCount}</p>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-none flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-emerald-900 rounded-none shadow-sm border border-emerald-800 p-5 flex items-center justify-between text-white">
          <div>
            <p className="text-sm font-medium text-emerald-200">Total Revenue Collected</p>
            <p className="text-3xl font-bold mt-1">Rs. {revenueTotal.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-emerald-800 rounded-none flex items-center justify-center">
            <Wallet className="w-6 h-6 text-emerald-300" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Schedule */}
          <div className="bg-white rounded-none shadow-sm border border-stone-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 bg-stone-50 flex justify-between items-center">
              <h2 className="font-semibold text-stone-800">Today's Safari Schedule</h2>
              <span className="text-xs font-medium bg-white px-2 py-1 rounded border border-stone-200 text-stone-500">{today}</span>
            </div>
            <div className="p-0">
              {todaysSafaris.length === 0 ? (
                <div className="p-8 text-center text-stone-500">No safaris scheduled for today.</div>
              ) : (
                <table className="w-full text-left text-sm text-stone-600">
                  <thead className="bg-white text-stone-400 font-medium border-b border-stone-100">
                    <tr>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Package</th>
                      <th className="px-6 py-3">Guests</th>
                      <th className="px-6 py-3 text-right">Payment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {todaysSafaris.map((safari) => (
                      <tr key={safari.id} className="hover:bg-stone-50">
                        <td className="px-6 py-3 font-medium text-stone-900">{safari.customerName}</td>
                        <td className="px-6 py-3">{safari.tourName}</td>
                        <td className="px-6 py-3">{safari.adults} Adults, {safari.children} Kids</td>
                        <td className="px-6 py-3 text-right">
                          {safari.paymentStatus === "PAID" ? (
                            <span className="text-emerald-600 font-semibold text-xs">PAID</span>
                          ) : (
                            <span className="text-amber-600 font-semibold text-xs">UNPAID</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 text-right">
              <Link href="/admin/schedule" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">View Full Schedule &rarr;</Link>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-none shadow-sm border border-stone-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
              <h2 className="font-semibold text-stone-800">Recent Bookings</h2>
            </div>
            <div className="p-0">
              {bookings.length === 0 ? (
                <div className="p-8 text-center text-stone-500">No bookings found.</div>
              ) : (
                <table className="w-full text-left text-sm text-stone-600">
                  <tbody className="divide-y divide-stone-50">
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id} className="hover:bg-stone-50">
                        <td className="px-6 py-3">
                          <p className="font-medium text-stone-900">{booking.customerName}</p>
                          <p className="text-xs text-stone-500">{booking.tourName} for {booking.date}</p>
                        </td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' : 
                            booking.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : 
                            'bg-stone-100 text-stone-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right font-medium">
                          Rs. {booking.totalPrice?.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 text-right">
              <Link href="/admin/bookings" className="text-sm font-medium text-emerald-700 hover:text-emerald-800">Manage All Bookings &rarr;</Link>
            </div>
          </div>

        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          
          {/* Status Breakdown */}
          <div className="bg-white rounded-none shadow-sm border border-stone-100 p-6">
            <h2 className="font-semibold text-stone-800 mb-4">Booking Status</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-stone-600">
                  <CalendarCheck className="w-4 h-4 mr-2 text-emerald-500" /> Confirmed
                </div>
                <span className="font-medium">{confirmedCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-stone-600">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-blue-500" /> Completed
                </div>
                <span className="font-medium">{completedCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-stone-600">
                  <Clock className="w-4 h-4 mr-2 text-amber-500" /> Pending
                </div>
                <span className="font-medium">{pendingCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-stone-600">
                  <XCircle className="w-4 h-4 mr-2 text-rose-500" /> Cancelled
                </div>
                <span className="font-medium">{cancelledCount}</span>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex justify-between items-center">
                <span className="text-sm font-medium text-stone-900">Total All-Time</span>
                <span className="font-bold text-stone-900">{totalBookings}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="bg-white rounded-none shadow-sm border border-stone-100 p-6">
            <h2 className="font-semibold text-stone-800 mb-4">Quick Insights</h2>
            <div className="space-y-5">
              <div>
                <p className="text-sm text-stone-500 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> Upcoming Safaris</p>
                <p className="text-2xl font-bold text-stone-900">{upcomingSafaris.length}</p>
              </div>
              <div>
                <p className="text-sm text-stone-500 flex items-center"><Wallet className="w-3 h-3 mr-1" /> Payments Collected Today</p>
                <p className="text-2xl font-bold text-emerald-600">Rs. {revenueToday.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-stone-500 flex items-center"><Car className="w-3 h-3 mr-1" /> Available Jeeps</p>
                <p className="text-2xl font-bold text-stone-900">12 <span className="text-sm font-normal text-stone-400">/ 15</span></p>
                <div className="w-full bg-stone-100 h-1.5 rounded-none mt-2">
                  <div className="bg-emerald-500 h-1.5 rounded-none" style={{ width: "80%" }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
