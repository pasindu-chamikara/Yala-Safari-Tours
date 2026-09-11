"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { 
  LayoutDashboard, 
  Calendar, 
  CalendarClock, 
  Car, 
  Package, 
  Image as ImageIcon, 
  Users, 
  Wallet, 
  Star, 
  BarChart3, 
  UserCog, 
  Bell, 
  Settings, 
  ShieldCheck,
  LogOut,
  MessageSquare
} from "lucide-react";

interface SidebarGroup {
  label: string;
  items: SidebarItem[];
  restrictedTo?: string[];
}

interface SidebarItem {
  href: string;
  label: string;
  icon: any;
  isSubItem?: boolean;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const { profile, logout } = useAuth();

  const sidebarGroups: SidebarGroup[] = [
    {
      label: "", // Un-grouped top level
      items: [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      ],
    },
    {
      label: "OPERATIONS",
      items: [
        { href: "/admin/bookings", label: "Bookings", icon: Calendar },
        { href: "/admin/schedule", label: "Availability & Schedule", icon: CalendarClock },
        { href: "/admin/vehicles", label: "Vehicles / Jeeps", icon: Car },
      ],
    },
    {
      label: "SAFARI MANAGEMENT",
      restrictedTo: ["SUPER_ADMIN", "ADMIN"],
      items: [
        { href: "/admin/packages", label: "Safari Packages", icon: Package },
        { href: "/admin/gallery", label: "Gallery / Media", icon: ImageIcon },
      ],
    },
    {
      label: "",
      items: [
        { href: "/admin/users", label: "Customers", icon: Users }, // Note: Users page is temporarily acting as Customer management
        { href: "/admin/messages", label: "Messages & Enquiries", icon: MessageSquare },
      ],
    },

    {
      label: "",
      items: [
        { href: "/admin/reviews", label: "Reviews & Feedback", icon: Star },
        { href: "/admin/reports", label: "Reports & Analytics", icon: BarChart3 },
      ],
    },
    {
      label: "",
      restrictedTo: ["SUPER_ADMIN", "ADMIN"],
      items: [
        { href: "/admin/staff", label: "Staff & Roles", icon: UserCog }, // We can create a dedicated staff page later
      ],
    },
    {
      label: "",
      items: [
        { href: "/admin/notifications", label: "Notifications", icon: Bell },
        { href: "/admin/settings", label: "Settings", icon: Settings, restrictedTo: ["SUPER_ADMIN", "ADMIN"] } as any, // Typed loosely to allow individual item restriction logic if needed
      ],
    },
    {
      label: "",
      items: [
        { href: "/admin/profile", label: "Admin Profile", icon: ShieldCheck },
      ],
    }
  ];

  return (
    <aside className="w-64 bg-stone-950 text-stone-300 flex flex-col min-h-screen overflow-y-auto custom-scrollbar">
      <div className="p-6 text-center border-b border-stone-800 sticky top-0 bg-stone-950 z-10">
        <h1 className="font-bold text-xl tracking-widest text-white">YALA SAFARI</h1>
        <p className="text-xs text-emerald-500 tracking-widest mt-1">ADMIN PANEL</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-6">
        {sidebarGroups.map((group, index) => {
          // Group level RBAC check
          if (group.restrictedTo && profile && !group.restrictedTo.includes(profile.role)) {
            return null;
          }

          return (
            <div key={index} className="space-y-1">
              {group.label && (
                <h3 className="px-3 text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 mt-4">
                  {group.label}
                </h3>
              )}
              
              <div className="space-y-1">
                {group.items.map((link) => {
                  // Individual item RBAC check
                  if ((link as any).restrictedTo && profile && !(link as any).restrictedTo.includes(profile.role)) {
                    return null;
                  }

                  const isActive = pathname === link.href || (pathname === "/admin/payments" && link.href.includes("/admin/payments"));
                  const Icon = link.icon;
                  
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center py-2 px-3 rounded-none transition-colors ${
                        link.isSubItem ? "ml-4 text-sm" : ""
                      } ${
                        pathname === link.href // Exact match preferred for styling
                          ? "bg-emerald-900/40 text-emerald-400 font-medium" 
                          : "hover:bg-stone-800 hover:text-white"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${pathname === link.href ? "text-emerald-400" : "text-stone-400"}`} />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-stone-800 sticky bottom-0 bg-stone-950">
        <button
          onClick={() => logout()}
          className="flex items-center space-x-3 w-full py-2.5 px-3 rounded-none text-stone-400 hover:bg-stone-800 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
