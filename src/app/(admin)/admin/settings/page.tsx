"use client";

import { useState, useEffect } from "react";
import { getSiteSettings, updateSiteSettings } from "@/lib/firebase/settings";
import { SiteSettings } from "@/types";
import RoleGuard from "@/components/auth/RoleGuard";
import { Save } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const { success, data } = await getSiteSettings();
      if (success && data) {
        setSettings(data);
      }
      setLoading(false);
    };
    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setSettings((prev) => prev ? {
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value
    } : null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    
    setSaving(true);
    const { success } = await updateSiteSettings(settings);
    if (success) {
      toast.success("Settings saved successfully!");
    } else {
      toast.error("Failed to save settings.");
    }
    setSaving(false);
  };

  if (loading || !settings) {
    return (
      <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
        <div className="flex h-64 items-center justify-center">
          <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-700"></div>
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
      <div className="space-y-6 max-w-4xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Site Settings</h1>
            <p className="text-stone-500">Manage global website configurations and contact information.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-white rounded-none shadow-sm border border-stone-100 overflow-hidden p-6 space-y-6">
            <h2 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Public Contact Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={settings.contactEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Public Contact Phone</label>
                <input
                  type="text"
                  name="contactPhone"
                  value={settings.contactPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">Physical Address</label>
                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-stone-100 overflow-hidden p-6 space-y-6">
            <h2 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2">Social Media Links</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Facebook URL</label>
                <input
                  type="url"
                  name="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Instagram URL</label>
                <input
                  type="url"
                  name="instagramUrl"
                  value={settings.instagramUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-stone-700 mb-1">TripAdvisor URL</label>
                <input
                  type="url"
                  name="tripAdvisorUrl"
                  value={settings.tripAdvisorUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none shadow-sm border border-stone-100 overflow-hidden p-6 space-y-6">
            <h2 className="text-lg font-bold text-stone-800 border-b border-stone-100 pb-2">Financial Configuration</h2>
            
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Global Tax Rate (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                required
                className="w-full md:w-1/2 px-4 py-2 border border-stone-300 rounded-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent outline-none"
              />
              <p className="text-xs text-stone-500 mt-1">This rate will be applied to all newly created safari packages and bookings automatically.</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-6 py-2.5 flex items-center gap-2 rounded-none transition-colors shadow-sm disabled:opacity-50 font-bold"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
            </button>
          </div>
        </form>
      </div>
    </RoleGuard>
  );
}