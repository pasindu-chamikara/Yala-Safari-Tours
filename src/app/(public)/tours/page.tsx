import Link from 'next/link';
import Navbar from "@/components/Navbar";

export const metadata = {
  title: 'Explore Tours | Yala Safari',
  description: 'Discover the beauty of Sri Lanka with our guided tours.',
};

import { tours as fallbackTours } from '@/lib/data/tours';
import { getTours } from '@/lib/firebase/tours';

export const dynamic = 'force-dynamic';

export default async function ToursPage() {
  const { success, data } = await getTours();
  const displayTours = success && data && data.length > 0 ? data : fallbackTours;
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <img
            src="/yala.jpg"
            alt="Sri Lanka Landscape"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-50/10 to-transparent"></div>
        <div className="relative z-10 text-center px-6 mt-16">
          <div className="flex items-center justify-center gap-4 text-emerald-400 text-sm font-bold tracking-widest mb-6">
            <div className="w-12 h-px bg-emerald-400"></div>
            DISCOVER SRI LANKA
            <div className="w-12 h-px bg-emerald-400"></div>
          </div>
          <h1 className="text-6xl md:text-8xl text-white font-bold mb-6 drop-shadow-xl" style={{ fontFamily: 'var(--font-playfair)' }}>
            Explore Tours
          </h1>
          <p className="text-xl text-white font-medium max-w-2xl mx-auto drop-shadow-md">
            Journey beyond the safari. Experience the rich culture, pristine beaches, and misty mountains of the Pearl of the Indian Ocean.
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative z-20 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayTours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-none overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group flex flex-col transform hover:-translate-y-2">
              <div className="relative h-[350px] overflow-hidden">
                <img 
                  src={tour.img} 
                  alt={tour.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-80"></div>
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <div className="flex gap-2 mb-3">
                      {tour.tags.map((tag, i) => (
                        <span key={i} className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold px-3 py-1 rounded-none">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl text-white font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {tour.title}
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center text-stone-500 text-sm font-semibold tracking-wide uppercase mb-4">
                  <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {tour.duration}
                  <span className="mx-3 text-stone-300">|</span>
                  <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {tour.locations}
                </div>
                
                <p className="text-stone-600 mb-8 leading-relaxed">
                  {tour.desc}
                </p>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-stone-100">
                    <div className="flex flex-col">
                      <span className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Duration</span>
                      <span className="text-stone-700 font-medium">{tour.duration}</span>
                    </div>
                    <Link 
                      href={`/tours/${tour.id}`}
                      className="flex items-center gap-2 text-[#314a1c] hover:text-emerald-700 font-bold transition-colors group/btn"
                    >
                      View Details
                      <span className="w-8 h-8 rounded-none bg-stone-100 flex items-center justify-center group-hover/btn:bg-[#314a1c] group-hover/btn:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Custom Tour CTA */}
      <section className="py-12 px-6 bg-emerald-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>Create Your Own Journey</h2>
          <p className="text-lg text-emerald-100 mb-10">
            Have a specific route in mind? Our travel experts can design a custom itinerary tailored perfectly to your preferences and schedule.
          </p>
          <Link 
            href="/login"
            className="inline-block bg-white text-emerald-900 px-8 py-4 rounded-none font-bold hover:bg-stone-100 transition-colors shadow-lg"
          >
            Contact Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
