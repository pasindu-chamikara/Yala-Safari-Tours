"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    // Exact match for most paths
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path) && path !== '/';
  };

  const linkClass = (path: string) => 
    `px-4 py-2.5 rounded-none transition-all duration-300 hover:shadow-sm ${
      isActive(path) 
        ? "bg-stone-100/80 text-[#314a1c] font-bold shadow-sm" 
        : "hover:bg-stone-100/80 hover:text-[#314a1c]"
    }`;

  return (
    <>
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 group">
      <div className="bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl shadow-stone-800/10 rounded-none px-4 md:px-6 h-20 flex justify-between items-center relative transition-all duration-500 hover:bg-white/80">

        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center gap-3 lg:gap-4 flex-none">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Menu" 
            className="lg:hidden p-2.5 text-stone-700 hover:text-[#314a1c] transition-colors bg-stone-100/80 rounded-none shadow-sm hover:shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          
          <Link href="/" className="flex items-center group/logo">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-none flex items-center justify-center overflow-hidden bg-white shadow-sm border border-white/60 transition-all duration-500 group-hover/logo:scale-105 group-hover/logo:shadow-md">
              <Image src="/logo-yala.jpg" alt="Logo" width={56} height={56} className="w-[85%] h-[85%] object-contain" />
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-stone-600 flex-1 justify-center">
          <Link href="/tours" className={linkClass('/tours')}>
            Tours & Safaris
          </Link>
          <Link href="/#parks" className={`px-4 py-2.5 rounded-none transition-all duration-300 hover:shadow-sm hover:bg-stone-100/80 hover:text-[#314a1c]`}>
            National Parks
          </Link>
          <Link href="/gallery" className={linkClass('/gallery')}>
            Gallery
          </Link>
          <Link href="/about" className={linkClass('/about')}>
            About Us
          </Link>
          <Link href="/contact" className={linkClass('/contact')}>
            Contact
          </Link>
          <Link href="/leave-review" className={linkClass('/leave-review')}>
            Leave a Review
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 lg:gap-3 flex-none justify-end">
          
          <div className="flex items-center gap-2 pl-0 xl:pl-3 xl:border-l border-stone-200/60">

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-label="Profile"
                className="w-10 h-10 rounded-none flex items-center justify-center text-stone-600 bg-stone-100/80 hover:bg-stone-200 hover:text-[#314a1c] transition-all duration-300 shadow-sm"
              >
                {user && user.photoURL ? (
                  <Image src={user.photoURL} alt="Profile" width={40} height={40} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                )}
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute right-0 mt-3 w-56 bg-white border border-stone-100 shadow-2xl rounded-none py-2 z-50 transition-all duration-200 origin-top-right ${isProfileOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                {user ? (
                  <>
                    <div className="px-4 py-3 border-b border-stone-100 mb-1 bg-stone-50/50">
                      <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold mb-1">Signed in as</p>
                      <p className="font-bold text-stone-800 truncate">{user.displayName || "User"}</p>
                      <p className="text-xs text-stone-500 truncate">{user.email}</p>
                    </div>
                    <Link href="/admin" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-[#314a1c]">
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="px-4 py-3 border-b border-stone-100 mb-1 bg-stone-50/50">
                      <p className="text-sm font-semibold text-stone-800">Welcome to Yala Safari</p>
                      <p className="text-xs text-stone-500 mt-0.5">Sign in to manage your bookings</p>
                    </div>
                    <Link href="/login" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-[#314a1c] font-medium">
                      Sign In
                    </Link>
                    <Link href="/register" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-stone-700 hover:bg-stone-50 hover:text-[#314a1c]">
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-stone-100">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-none flex items-center justify-center overflow-hidden bg-white shadow-sm border border-stone-100">
              <Image src="/logo-yala.jpg" alt="Logo" width={40} height={40} className="w-[85%] h-[85%] object-contain" />
            </div>
            <span className="font-serif font-bold text-lg text-stone-900 tracking-wider">YALA SAFARI</span>
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
          <Link href="/tours" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 text-lg font-medium transition-colors ${isActive('/tours') ? 'text-[#314a1c] bg-stone-50 border-l-4 border-[#314a1c]' : 'text-stone-600 hover:text-[#314a1c] hover:bg-stone-50 border-l-4 border-transparent'}`}>
            Tours & Safaris
          </Link>
          <Link href="/#parks" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-lg font-medium text-stone-600 hover:text-[#314a1c] hover:bg-stone-50 border-l-4 border-transparent transition-colors">
            National Parks
          </Link>
          <Link href="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 text-lg font-medium transition-colors ${isActive('/gallery') ? 'text-[#314a1c] bg-stone-50 border-l-4 border-[#314a1c]' : 'text-stone-600 hover:text-[#314a1c] hover:bg-stone-50 border-l-4 border-transparent'}`}>
            Gallery
          </Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 text-lg font-medium transition-colors ${isActive('/about') ? 'text-[#314a1c] bg-stone-50 border-l-4 border-[#314a1c]' : 'text-stone-600 hover:text-[#314a1c] hover:bg-stone-50 border-l-4 border-transparent'}`}>
            About Us
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 text-lg font-medium transition-colors ${isActive('/contact') ? 'text-[#314a1c] bg-stone-50 border-l-4 border-[#314a1c]' : 'text-stone-600 hover:text-[#314a1c] hover:bg-stone-50 border-l-4 border-transparent'}`}>
            Contact
          </Link>
          <Link href="/leave-review" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 text-lg font-medium transition-colors ${isActive('/leave-review') ? 'text-[#314a1c] bg-stone-50 border-l-4 border-[#314a1c]' : 'text-[#314a1c] hover:bg-stone-50 border-l-4 border-transparent'}`}>
            Leave a Review
          </Link>
        </div>
      </div>
    </>
  );
}
