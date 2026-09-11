import { tours as fallbackTours } from '@/lib/data/tours';
import { getTours } from '@/lib/firebase/tours';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function TourDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { success, data } = await getTours();
  const allTours = success && data && data.length > 0 ? data : fallbackTours;
  const tour = allTours.find((t) => t.id === resolvedParams.id);

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Header */}
      <section className="relative h-[40vh] min-h-[350px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-stone-900">
          <img
            src={tour.img}
            alt={tour.title}
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="flex gap-2 mb-4">
            {tour.tags.map((tag, i) => (
              <span key={i} className="bg-emerald-600/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-none uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl text-white font-bold mb-4 drop-shadow-lg" style={{ fontFamily: 'var(--font-playfair)' }}>
            {tour.title}
          </h1>
          <div className="flex items-center gap-6 text-stone-200 font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {tour.duration}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              {tour.locations}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="flex-grow lg:w-2/3">
          <section className="mb-12">
            <h2 className="text-3xl text-stone-800 font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>Overview</h2>
            {tour.bestFor && (
              <p className="text-emerald-700 font-bold mb-4">
                Best For: <span className="text-stone-600 font-normal">{tour.bestFor}</span>
              </p>
            )}
            <p className="text-stone-600 text-lg leading-relaxed mb-6">
              {tour.longDesc || tour.desc}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl text-stone-800 font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>Itinerary</h2>
            <div className="space-y-6">
              {tour.itinerary?.map((item) => (
                <div key={item.day} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-none bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold flex-shrink-0">
                      D{item.day}
                    </div>
                    <div className="w-0.5 h-full bg-emerald-100 mt-2"></div>
                  </div>
                  <div className="pb-8">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">{item.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-none shadow-sm border border-stone-100">
              <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                What's Included
              </h3>
              <ul className="space-y-3">
                {tour.includes?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-600">
                    <span className="text-emerald-500 mt-1">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-none shadow-sm border border-stone-100">
              <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                Not Included
              </h3>
              <ul className="space-y-3">
                {tour.excludes?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-stone-600">
                    <span className="text-red-400 mt-1">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Sidebar / Booking CTA */}
        <div className="lg:w-1/3">
          <div className="sticky top-32 bg-white rounded-none shadow-xl p-8 border border-stone-100">
            <h3 className="text-2xl font-bold text-stone-800 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>Ready for an Adventure?</h3>
            <p className="text-stone-500 mb-6">Book this tour today and secure your spot.</p>
            
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-bold text-[#314a1c]">${tour.price}</span>
              <span className="text-stone-500">/ person</span>
            </div>

            <Link 
              href={`/tours/${tour.id}/book`}
              className="block w-full bg-[#314a1c] hover:bg-emerald-800 text-white text-center font-bold py-4 px-6 rounded-none shadow-md hover:shadow-xl transition-all uppercase tracking-wider"
            >
              Book Now
            </Link>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-stone-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              Secure booking. No immediate payment required.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
