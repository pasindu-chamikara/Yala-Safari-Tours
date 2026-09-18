"use client";

import { useState } from 'react';

export default function SchedulePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'block'>('add');
  
  const [tours, setTours] = useState([
    { name: 'Leopard Safari', date: '2026-09-18', time: '05:30 AM', guide: 'Saman Silva' },
    { name: 'Family Safari', date: '2026-09-18', time: '02:30 PM', guide: 'Kamal Perera' },
    { name: 'Luxury Full Day', date: '2026-09-19', time: '06:00 AM', guide: 'Saman Silva' },
  ]);

  const [newDate, setNewDate] = useState('');
  const [newGuide, setNewGuide] = useState('');
  const [newType, setNewType] = useState('');
  const [blockReason, setBlockReason] = useState('');

  const openModal = (type: 'add' | 'block') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (modalType === 'add') {
      if (!newDate) return alert('Please select a date.');
      setTours([{
        name: newType || 'Custom Safari',
        date: newDate,
        time: 'TBD',
        guide: newGuide || 'Pending Guide'
      }, ...tours]);
    } else {
      if (!newDate) return alert('Please select a date.');
      alert(`Blocked ${newDate} for: ${blockReason || 'Maintenance'}`);
    }
    setIsModalOpen(false);
    setNewDate('');
    setNewGuide('');
    setNewType('');
    setBlockReason('');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 font-serif">Schedule & Availability</h1>
          <p className="text-stone-500 mt-2">Manage tour dates, guide availability, and vehicle assignments.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        {/* Calendar Main Area */}
        <div className="flex-1 bg-white border border-stone-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-stone-200 flex justify-between items-center bg-stone-50/50">
            <h2 className="text-xl font-bold text-stone-900 font-serif">September 2026</h2>
            <div className="flex gap-2">
              <button className="p-2 text-stone-400 hover:text-stone-900 border border-stone-200 bg-white hover:bg-stone-50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              <button className="px-4 py-2 text-sm font-bold text-stone-600 border border-stone-200 bg-white hover:bg-stone-50 hover:text-stone-900 transition-colors">
                Today
              </button>
              <button className="p-2 text-stone-400 hover:text-stone-900 border border-stone-200 bg-white hover:bg-stone-50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto bg-stone-50 p-4">
            <div className="grid grid-cols-7 gap-px bg-stone-200 border border-stone-200">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="bg-white py-2 text-center text-xs font-bold text-stone-500 uppercase tracking-wider">
                  {day}
                </div>
              ))}
              
              {/* Generate empty cells for days before the 1st */}
              <div className="bg-stone-50/50 min-h-[120px] p-2 text-stone-400 text-sm">30</div>
              <div className="bg-stone-50/50 min-h-[120px] p-2 text-stone-400 text-sm">31</div>
              
              {/* Generate month days */}
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                // Add some dummy events for visual representation
                const hasTour = [4, 12, 18, 25].includes(day);
                const isFullyBooked = [12, 25].includes(day);
                
                return (
                  <div key={day} className={`bg-white min-h-[120px] p-2 border-t border-stone-100 hover:bg-stone-50 transition-colors ${day === 18 ? 'ring-2 ring-inset ring-[#ffcc00]' : ''}`}>
                    <div className={`text-sm font-bold mb-2 ${day === 18 ? 'text-stone-900 bg-[#ffcc00] w-6 h-6 flex items-center justify-center rounded-full' : 'text-stone-700'}`}>
                      {day}
                    </div>
                    
                    {hasTour && (
                      <div className={`text-xs px-2 py-1 mb-1 truncate shadow-sm font-medium border ${isFullyBooked ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                        {isFullyBooked ? 'Fully Booked' : '2 Tours Scheduled'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white border border-stone-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-stone-900 mb-4 font-serif">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => openModal('add')}
                className="w-full bg-[#314a1c] text-white font-bold py-3 px-4 hover:bg-emerald-800 transition-colors flex justify-center items-center gap-2 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Add Availability
              </button>
              <button 
                onClick={() => openModal('block')}
                className="w-full border border-stone-200 bg-white text-stone-700 font-bold py-3 px-4 hover:bg-stone-50 hover:text-stone-900 transition-colors shadow-sm"
              >
                Block Dates
              </button>
            </div>
          </div>

          <div className="bg-white border border-stone-200 shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-stone-200 bg-stone-50/50">
              <h3 className="font-bold text-stone-900">Upcoming Tours</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {tours.map((tour, i) => (
                <div key={i} className="border border-stone-100 p-4 hover:border-stone-300 transition-colors group cursor-pointer shadow-sm hover:shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-stone-900 group-hover:text-[#314a1c] transition-colors">{tour.name}</h4>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1">Confirmed</span>
                  </div>
                  <div className="space-y-1 text-sm text-stone-500">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {tour.date} at {tour.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      Guide: {tour.guide}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
              <h2 className="text-xl font-bold text-stone-900 font-serif">
                {modalType === 'add' ? 'Add Availability' : 'Block Dates'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Select Date</label>
                <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full border border-stone-200 p-3 bg-white text-stone-900 focus:outline-none focus:border-[#314a1c] transition-colors" />
              </div>
              
              {modalType === 'add' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Assign Guide (Optional)</label>
                    <input type="text" value={newGuide} onChange={e => setNewGuide(e.target.value)} placeholder="Type guide name..." className="w-full border border-stone-200 p-3 bg-white text-stone-900 focus:outline-none focus:border-[#314a1c] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Tour Type</label>
                    <input type="text" value={newType} onChange={e => setNewType(e.target.value)} placeholder="Type safari type..." className="w-full border border-stone-200 p-3 bg-white text-stone-900 focus:outline-none focus:border-[#314a1c] transition-colors" />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">Reason</label>
                  <input type="text" value={blockReason} onChange={e => setBlockReason(e.target.value)} placeholder="e.g. Maintenance, Holiday" className="w-full border border-stone-200 p-3 bg-white text-stone-900 focus:outline-none focus:border-[#314a1c] transition-colors" />
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-stone-100 flex justify-end gap-3 bg-stone-50">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-sm font-bold text-stone-600 hover:text-stone-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className={`px-6 py-2.5 text-sm font-bold text-white transition-colors shadow-sm ${modalType === 'add' ? 'bg-[#314a1c] hover:bg-emerald-800' : 'bg-red-600 hover:bg-red-700'}`}
              >
                {modalType === 'add' ? 'Save Availability' : 'Confirm Block'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}