"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Bell } from "lucide-react";
import Link from "next/link";
import { getAdminNotifications } from "@/lib/firebase/notifications";

export default function AdminTopbar() {
  const { profile } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!profile || (profile.role !== "SUPER_ADMIN" && profile.role !== "ADMIN" && profile.role !== "STAFF")) return;
    
    const fetchNotifs = async () => {
      const { success, data } = await getAdminNotifications();
      if (success && data) {
        setUnreadCount(data.filter(n => !n.read).length);
      }
    };
    
    fetchNotifs();
    // In a production app, we would use onSnapshot here for real-time updates
  }, [profile]);

  return (
    <header className="bg-white border-b border-stone-200 h-16 flex items-center justify-end px-8">
      <div className="flex items-center space-x-6">
        
        <Link href="/admin/notifications" className="relative text-stone-500 hover:text-stone-800 transition-colors">
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        <div className="flex items-center space-x-3 border-l border-stone-200 pl-6">
          <div className="text-right">
            <p className="text-sm font-medium text-stone-900">{profile?.name || 'Loading...'}</p>
            <p className="text-xs text-stone-500 capitalize">{profile?.role?.toLowerCase() || '...'}</p>
          </div>
          <div className="h-10 w-10 rounded-none bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
            {profile?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}
