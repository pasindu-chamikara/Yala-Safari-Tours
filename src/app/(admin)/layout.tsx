"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["STAFF", "ADMIN", "SUPER_ADMIN"]} loginRoute="/admin-login">
      <div className="flex h-screen overflow-hidden bg-stone-50">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminTopbar />
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
