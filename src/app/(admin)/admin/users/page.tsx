"use client";

import { useEffect, useState } from "react";
import { getUsers, updateUserRole } from "@/lib/firebase/users";
import { UserProfile, Role } from "@/types";
import RoleGuard from "@/components/auth/RoleGuard";
import { auth } from "@/lib/firebase/config";
import { useAuth } from "@/hooks/useAuth";
import { Trash2, UserPlus, X } from "lucide-react";

export default function CustomersManagement() {
  const { profile } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState<Role>("CUSTOMER");
  const [isCreating, setIsCreating] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const { success, data } = await getUsers(["CUSTOMER"]);
    if (success && data) {
      setUsers(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getAuthToken = async () => {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    return null;
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const token = await getAuthToken();
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newUserName,
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("User created successfully!");
      setShowCreateModal(false);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
      setNewUserRole("CUSTOMER");
      fetchUsers();
    } catch (err: any) {
      alert("Failed to create user: " + err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteUser = async (uid: string, name: string) => {
    if (!confirm(`Are you sure you want to completely delete the user ${name}? This action cannot be undone.`)) {
      return;
    }

    try {
      const token = await getAuthToken();
      const res = await fetch(`/api/users/delete?uid=${uid}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUsers(prev => prev.filter(u => u.uid !== uid));
    } catch (err: any) {
      alert("Failed to delete user: " + err.message);
    }
  };

  const handleRoleChange = async (uid: string, newRole: Role) => {
    if (confirm(`Change user role to ${newRole}?`)) {
      const res = await updateUserRole(uid, newRole);
      if (res.success) {
        setUsers(prev => prev.map(u => (u.uid === uid ? { ...u, role: newRole } : u)));
      } else {
        alert("Failed to update user role");
      }
    }
  };

  const getRoleColor = (role: Role) => {
    switch (role) {
      case "SUPER_ADMIN": return "bg-purple-100 text-purple-800";
      case "ADMIN": return "bg-emerald-100 text-emerald-800";
      case "STAFF": return "bg-blue-100 text-blue-800";
      case "CUSTOMER": return "bg-stone-100 text-stone-800";
      default: return "bg-stone-100 text-stone-800";
    }
  };

  // RBAC Helpers
  const canEditUser = (targetRole: Role) => {
    if (profile?.role === "SUPER_ADMIN") return true;
    if (profile?.role === "ADMIN" && (targetRole === "STAFF" || targetRole === "CUSTOMER")) return true;
    return false;
  };

  const availableRolesForCreation = () => {
    if (profile?.role === "SUPER_ADMIN") {
      return ["CUSTOMER", "STAFF", "ADMIN", "SUPER_ADMIN"];
    }
    return ["CUSTOMER", "STAFF"];
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
            <h1 className="text-2xl font-bold text-stone-900">User Management</h1>
            <p className="text-stone-500">Manage user roles and access permissions.</p>
          </div>
          {(profile?.role === "SUPER_ADMIN" || profile?.role === "ADMIN") && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 flex items-center gap-2 rounded-none transition-colors shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create User</span>
            </button>
          )}
        </div>

        <div className="bg-white rounded-none shadow-sm border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-stone-600">
              <thead className="bg-stone-50 text-stone-900 uppercase font-medium border-b border-stone-200">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-stone-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.uid} className="hover:bg-stone-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-none bg-stone-200 flex items-center justify-center font-bold text-stone-500">
                            {(user.name || "A").charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-stone-900">{user.name || "Admin User"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-stone-500">{user.email || "No email in database"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-none text-xs font-semibold ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right flex items-center justify-end gap-3">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.uid, e.target.value as Role)}
                          className="text-sm border-stone-200 rounded-none bg-white text-stone-700 py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!canEditUser(user.role)}
                        >
                          <option value="CUSTOMER">Customer</option>
                          <option value="STAFF">Staff</option>
                          {/* Admins can't promote to Admin/SuperAdmin, but can see the options if the user is already one (though the select is disabled in that case) */}
                          <option value="ADMIN" disabled={profile?.role !== "SUPER_ADMIN" && user.role !== "ADMIN"}>Admin</option>
                          <option value="SUPER_ADMIN" disabled={profile?.role !== "SUPER_ADMIN" && user.role !== "SUPER_ADMIN"}>Super Admin</option>
                        </select>
                        <button
                          onClick={() => handleDeleteUser(user.uid, user.name || "Unknown")}
                          disabled={!canEditUser(user.role) || user.uid === profile?.uid}
                          className="p-2 text-stone-400 hover:text-red-600 disabled:opacity-30 disabled:hover:text-stone-400 transition-colors"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-none shadow-2xl w-full max-w-md overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-stone-100">
                <h3 className="text-xl font-bold text-stone-800">Create New User</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-stone-400 hover:text-stone-600">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleCreateUser} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="w-full px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Assign Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as Role)}
                    className="w-full px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                  >
                    <option value="CUSTOMER">Customer</option>
                    <option value="STAFF">Staff</option>
                    {profile?.role === "SUPER_ADMIN" && (
                      <>
                        <option value="ADMIN">Admin</option>
                        <option value="SUPER_ADMIN">Super Admin</option>
                      </>
                    )}
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white py-2 font-medium transition-colors disabled:opacity-50"
                  >
                    {isCreating ? "Creating..." : "Create User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}
