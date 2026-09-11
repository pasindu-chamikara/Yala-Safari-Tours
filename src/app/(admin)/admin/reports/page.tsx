"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import RoleGuard from "@/components/auth/RoleGuard";
import { DollarSign, ShoppingBag, Users, Star } from "lucide-react";

export default function ReportsPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    totalUsers: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch Bookings
        const bookingsSnap = await getDocs(query(collection(db, "bookings")));
        let rev = 0;
        let pending = 0;
        bookingsSnap.forEach(doc => {
          const data = doc.data();
          if (data.totalPrice) rev += parseFloat(data.totalPrice);
          if (data.status === "PENDING") pending += 1;
        });

        // Fetch Users
        const usersSnap = await getDocs(query(collection(db, "users")));
        
        setStats({
          totalRevenue: rev,
          totalBookings: bookingsSnap.size,
          pendingBookings: pending,
          totalUsers: usersSnap.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
        <div className="flex h-64 items-center justify-center">
          <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-700"></div>
        </div>
      </RoleGuard>
    );
  }

  const statCards = [
    { label: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-100" },
    { label: "Total Bookings", value: stats.totalBookings, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Pending Bookings", value: stats.pendingBookings, icon: Star, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Total Registered Users", value: stats.totalUsers, icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Reports & Analytics</h1>
            <p className="text-stone-500">Overview of business performance.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white border border-stone-200 shadow-sm p-6 flex items-center space-x-4">
                <div className={`w-14 h-14 ${stat.bg} flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-stone-900 mt-1">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-stone-200 shadow-sm p-8 text-center mt-8">
          <h2 className="text-lg font-bold text-stone-800 mb-2">Visual Charts</h2>
          <p className="text-stone-500">
            For more advanced charting (line graphs and bar charts), we recommend installing a library like Recharts.
            These basic stats reflect real-time reads directly from your Firestore Database.
          </p>
        </div>
      </div>
    </RoleGuard>
  );
}