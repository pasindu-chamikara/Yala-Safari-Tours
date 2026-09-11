"use client";

import { useEffect, useState } from "react";
import { getAdminNotifications, markNotificationRead, markAllNotificationsRead, deleteNotification } from "@/lib/firebase/notifications";
import { Notification } from "@/types";
import RoleGuard from "@/components/auth/RoleGuard";
import { Bell, CheckCircle2, Trash2, Info, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    const { success, data } = await getAdminNotifications();
    if (success && data) {
      setNotifications(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id: string) => {
    const { success } = await markNotificationRead(id);
    if (success) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  const handleMarkAllRead = async () => {
    const { success } = await markAllNotificationsRead();
    if (success) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast.success("All notifications marked as read");
    }
  };

  const handleDelete = async (id: string) => {
    const { success } = await deleteNotification(id);
    if (success) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      toast.success("Notification deleted");
    }
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "INFO": return <Info className="w-6 h-6 text-blue-500" />;
      case "SUCCESS": return <CheckCircle className="w-6 h-6 text-emerald-500" />;
      case "WARNING": return <AlertTriangle className="w-6 h-6 text-amber-500" />;
      case "ERROR": return <AlertCircle className="w-6 h-6 text-red-500" />;
      default: return <Bell className="w-6 h-6 text-stone-500" />;
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN", "STAFF"]}>
      <div className="space-y-6 max-w-4xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Notifications</h1>
            <p className="text-stone-500">System alerts and updates.</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 flex items-center gap-2 rounded-none transition-colors shadow-sm text-sm font-medium border border-stone-200"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark All as Read</span>
            </button>
          )}
        </div>

        <div className="bg-white border border-stone-200 shadow-sm rounded-none overflow-hidden">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-stone-500 flex flex-col items-center">
              <Bell className="w-12 h-12 text-stone-200 mb-3" />
              <p>You have no notifications at this time.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-4 sm:p-6 flex gap-4 transition-colors ${notif.read ? 'bg-white' : 'bg-emerald-50/30'}`}>
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-bold ${notif.read ? 'text-stone-700' : 'text-stone-900'}`}>{notif.title}</h3>
                      <span className="text-xs text-stone-400 whitespace-nowrap ml-4">
                        {new Date(notif.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className={`mt-1 text-sm ${notif.read ? 'text-stone-500' : 'text-stone-700 font-medium'}`}>
                      {notif.message}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end justify-center">
                    {!notif.read && (
                      <button
                        onClick={() => handleMarkRead(notif.id!)}
                        className="text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2 py-1 rounded"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif.id!)}
                      className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors rounded"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </RoleGuard>
  );
}