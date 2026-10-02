import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#151515] text-white pt-12 md:pt-24 pb-8 md:pb-12 relative z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-12 border-b border-stone-800 items-center text-left">
          {/* Col 1: Logo */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 flex items-center justify-center overflow-hidden bg-white"><Image src="/logo-yala.jpg" alt="Logo" width={64} height={64} className="w-full h-full object-contain" style={{ width: "auto", height: "auto" }} /></div>
            <div className="text-xs font-bold uppercase tracking-wider text-stone-300">Yala Safari Tours</div>
          </div>

          {/* Col 2 & 3: Contacts */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-stone-800 flex flex-shrink-0 items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div>
              <div>
                <div className="text-xs text-stone-300 mb-1">Call anytime</div>
                <div className="font-bold text-white">+94 77 123 4567</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-stone-800 flex flex-shrink-0 items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
              <div>
                <div className="text-xs text-stone-300 mb-1">Visit Office</div>
                <div className="font-bold text-white">PR88+V9F, Utalii Ln</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-stone-800 flex flex-shrink-0 items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
              <div>
                <div className="text-xs text-stone-300 mb-1">Send email</div>
                <div className="font-bold text-white">info@yalasafaritours.com</div>
              </div>
            </div>
          </div>

          {/* Col 4: Button */}
          <div className="flex justify-center sm:justify-start lg:justify-start">
            <button className="w-full lg:w-auto bg-[#ffcc00] hover:bg-yellow-500 text-stone-900 font-bold py-3 px-8 text-sm transition shadow-md">
              Plan Your Safari Today
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-stone-800 text-sm text-center sm:text-left">
          <div>
            <h4 className="font-bold text-white mb-6">Useful Links</h4>
            <ul className="space-y-4 text-stone-400">
              <li><Link href="/tours" className="hover:text-white transition">Tours & Safaris</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
              <li><Link href="/#parks" className="hover:text-white transition">National Parks</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Destinations</h4>
            <ul className="space-y-4 text-stone-400">
              <li><Link href="/#parks" className="hover:text-white transition">Yala</Link></li>
              <li><Link href="/#parks" className="hover:text-white transition">Udawalawe</Link></li>
              <li><Link href="/#parks" className="hover:text-white transition">Wilpattu</Link></li>
              <li><Link href="/#parks" className="hover:text-white transition">Minneriya</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Safari Categories</h4>
            <ul className="space-y-4 text-stone-400">
              <li><Link href="/tours" className="hover:text-white transition">Leopard Safaris</Link></li>
              <li><Link href="/tours" className="hover:text-white transition">Luxury Safaris</Link></li>
              <li><Link href="/tours" className="hover:text-white transition">Fly-in Safaris</Link></li>
              <li><Link href="/tours" className="hover:text-white transition">Family Safaris</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6">Signup for our Newsletter</h4>
            <p className="text-stone-400 mb-6 leading-relaxed">Join thousands of travelers who receive our best safari stories, travel tips, straight to their inbox.</p>
            <div className="relative mb-6">
              <input type="email" placeholder="Email Address" className="w-full bg-white text-stone-900 py-3 px-6 pr-14 focus:outline-none" />
              <button className="absolute right-1 top-1 w-10 h-10 bg-[#ffcc00] hover:bg-yellow-500 flex items-center justify-center text-stone-900 transition">
                <svg className="w-4 h-4 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center pt-8 text-xs text-stone-500">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-0 text-center items-center">
            <p>&copy; 2025 YALA SAFARI TOURS. All Rights Reserved.</p>
            <Link href="/privacy" className="hover:text-stone-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-300">Terms of Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
