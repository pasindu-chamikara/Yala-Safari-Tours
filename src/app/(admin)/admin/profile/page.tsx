"use client";

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

export default function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 font-serif">Admin Profile</h1>
        <p className="text-stone-500 mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-stone-200 flex-shrink-0 bg-stone-50/50">
          <nav className="flex flex-row md:flex-col p-4 gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('general')}
              className={`flex-shrink-0 text-left px-4 py-3 text-sm font-bold transition-colors ${
                activeTab === 'general'
                  ? 'bg-white text-[#314a1c] border border-stone-200 shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              General Info
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex-shrink-0 text-left px-4 py-3 text-sm font-bold transition-colors ${
                activeTab === 'security'
                  ? 'bg-white text-[#314a1c] border border-stone-200 shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex-shrink-0 text-left px-4 py-3 text-sm font-bold transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-white text-[#314a1c] border border-stone-200 shadow-sm'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              Notifications
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-10">
          {activeTab === 'general' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8 border-b border-stone-100">
                <div className="w-24 h-24 bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center relative">
                  {user?.photoURL ? (
                    <Image src={user.photoURL} alt="Profile" fill className="object-cover" />
                  ) : (
                    <span className="text-3xl text-stone-400 uppercase font-bold">{user?.email?.charAt(0) || 'A'}</span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">{user?.displayName || 'Admin User'}</h3>
                  <p className="text-stone-500 mb-4">{user?.email || 'admin@yalasafaritours.com'}</p>
                  <button className="bg-stone-900 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 hover:bg-[#ffcc00] hover:text-stone-900 transition-colors">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Display Name</label>
                  <input type="text" defaultValue={user?.displayName || 'Admin'} className="w-full border border-stone-200 p-3 bg-stone-50 text-stone-900 focus:outline-none focus:border-[#314a1c] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" defaultValue={user?.email || 'admin@yalasafaritours.com'} disabled className="w-full border border-stone-200 p-3 bg-stone-100 text-stone-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Role</label>
                  <input type="text" defaultValue="Administrator" disabled className="w-full border border-stone-200 p-3 bg-stone-100 text-stone-500 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="tel" placeholder="+94 77 123 4567" className="w-full border border-stone-200 p-3 bg-stone-50 text-stone-900 focus:outline-none focus:border-[#314a1c] transition-colors" />
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-[#314a1c] text-white font-bold py-3 px-8 hover:bg-emerald-800 transition-colors shadow-md">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">Change Password</h3>
                <p className="text-sm text-stone-500 mb-6">Ensure your account is using a long, random password to stay secure.</p>
                
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-stone-200 p-3 bg-white text-stone-900 focus:outline-none focus:border-red-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-stone-200 p-3 bg-white text-stone-900 focus:outline-none focus:border-red-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Confirm Password</label>
                    <input type="password" placeholder="••••••••" className="w-full border border-stone-200 p-3 bg-white text-stone-900 focus:outline-none focus:border-red-500 transition-colors" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <button className="bg-stone-900 text-white font-bold py-3 px-8 hover:bg-stone-800 transition-colors shadow-md">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-lg font-bold text-stone-900 mb-1">Email Notifications</h3>
                <p className="text-sm text-stone-500 mb-6">Choose what you want to be notified about.</p>
                
                <div className="space-y-4">
                  {[
                    { title: 'New Bookings', desc: 'Get an email when a new booking is made.' },
                    { title: 'Cancellations', desc: 'Get an email when a booking is cancelled.' },
                    { title: 'New Reviews', desc: 'Get an email when a new customer review is submitted.' },
                    { title: 'System Alerts', desc: 'Get notified about important system events and updates.' }
                  ].map((item, i) => (
                    <label key={i} className="flex items-start gap-4 p-4 border border-stone-100 hover:border-stone-200 bg-stone-50/30 cursor-pointer transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-[#314a1c] border-stone-300 rounded focus:ring-[#314a1c]" />
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">{item.title}</p>
                        <p className="text-sm text-stone-500">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button className="bg-[#314a1c] text-white font-bold py-3 px-8 hover:bg-emerald-800 transition-colors shadow-md">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}