"use client";

import { useState } from "react";
import Link from "next/link";

export default function PopularTours({ initialTours }: { initialTours: any[] }) {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ['All', 'Most Popular', 'Special Offer', 'Best Value', 'Featured Safari', 'Trending Now'];

  // Basic filtering logic
  const filteredTours = initialTours.filter(tour => {
    if (activeTab === "All") return true;
    
    // Fallback: If tags exist, use them, otherwise assign a random/mock logic 
    // just so the UI shows something responsive. In a real app, 'tour' would 
    // have accurate categories.
    if (tour.tags && tour.tags.includes(activeTab)) return true;
    
    // As a fallback to make UI feel responsive even if tags don't perfectly match:
    const mockCategory = tour.tags && tour.tags.length > 0 ? tour.tags[0] : 'Featured Safari';
    return mockCategory === activeTab;
  });

  // Always show something so the grid doesn't completely empty out if filtering is too strict on mock data
  const toursToDisplay = filteredTours.length > 0 ? filteredTours : initialTours;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {tabs.map((tab, i) => (
          <button 
            key={i} 
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 border text-sm font-medium transition ${
              activeTab === tab 
                ? 'bg-[#314a1c] text-white border-[#314a1c]' 
                : 'bg-white text-stone-600 border-stone-200 hover:border-[#314a1c]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
        {toursToDisplay.map((tour, i) => (
          <div key={tour.id || i} className="bg-white overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-shadow flex flex-col">
            <div className="relative h-56">
              <img src={tour.img} alt={tour.title} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-[#314a1c] text-white">
                {tour.tags && tour.tags.length > 0 ? tour.tags[0] : 'Featured Safari'}
              </span>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-2 text-stone-800 font-semibold text-base mb-3">
                <svg className="w-5 h-5 text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {tour.duration}
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">{tour.title}</h3>
              <p className="text-stone-500 text-sm mb-6 flex-grow line-clamp-2">{tour.desc}</p>
              <div className="flex justify-between items-end mt-auto">
                <div>
                  <p className="text-stone-400 text-xs uppercase mb-1">Start from</p>
                  <p className="text-xl font-bold text-[#314a1c]">Rs. {tour.price?.toLocaleString() || 'N/A'}</p>
                </div>
                <Link href={`/tours/${tour.id}`} className="bg-[#ffcc00] hover:bg-yellow-500 text-black font-extrabold py-2 px-6 text-sm transition">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
