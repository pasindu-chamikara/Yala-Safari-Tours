"use client";

import { useState, use, useEffect } from 'react';
import { Tour, tours as fallbackTours } from '@/lib/data/tours';
import { notFound, useRouter } from 'next/navigation';
import { createBooking } from '@/lib/firebase/bookings';
import { getTours } from '@/lib/firebase/tours';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { user } = useAuth();
  const resolvedParams = use(params);

  const [tour, setTour] = useState<Tour | null>(null);
  const [loadingTour, setLoadingTour] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      const { success, data } = await getTours();
      const allTours = success && data && data.length > 0 ? data : fallbackTours;
      const found = allTours.find(t => t.id === resolvedParams.id);
      if (found) {
        setTour(found);
      } else {
        router.push('/404');
      }
      setLoadingTour(false);
    };
    fetchTour();
  }, [resolvedParams.id, router]);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    adults: 2,
    children: 0,
    customerName: user?.displayName || '',
    customerEmail: user?.email || '',
    customerPhone: '',
    specialRequests: '',
  });

  if (loadingTour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin h-12 w-12 border-b-2 border-emerald-700"></div>
      </div>
    );
  }
  if (!tour) return null;

  const totalPrice = (tour.price || 0) * formData.adults + ((tour.price || 0) * 0.5) * formData.children;

  const handleNext = () => {
    if (step === 1 && !formData.date) {
      alert("Please select a date.");
      return;
    }
    if (step === 2 && (!formData.customerName || !formData.customerEmail || !formData.customerPhone)) {
      alert("Please fill in all required contact details.");
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    const result = await createBooking({
      tourId: tour.id,
      tourName: tour.title,
      date: formData.date,
      adults: formData.adults,
      children: formData.children,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      specialRequests: formData.specialRequests,
      totalPrice,
      userId: user?.uid || undefined,
    });

    setLoading(false);
    if (result.success) {
      setSuccess(true);
    } else {
      alert("There was an error processing your booking. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-stone-50 pt-32 pb-16 px-6 flex items-center justify-center">
        <div className="bg-white max-w-2xl w-full rounded-none shadow-xl p-12 text-center border border-stone-100">
          <div className="w-20 h-20 bg-emerald-100 rounded-none flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h1 className="text-4xl font-bold text-stone-800 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Booking Request Received!</h1>
          <p className="text-stone-600 text-lg mb-8 leading-relaxed">
            Thank you, {formData.customerName}. Your booking request for <strong>{tour.title}</strong> has been successfully submitted. Our team will review your request and contact you shortly with confirmation and payment details.
          </p>
          <div className="bg-stone-50 rounded-none p-6 mb-8 text-left border border-stone-100">
            <h3 className="font-bold text-stone-800 mb-2">Booking Summary:</h3>
            <ul className="text-stone-600 space-y-2 text-sm">
              <li><strong>Tour:</strong> {tour.title}</li>
              <li><strong>Date:</strong> {formData.date}</li>
              <li><strong>Guests:</strong> {formData.adults} Adults, {formData.children} Children</li>
              <li><strong>Estimated Total:</strong> ${totalPrice}</li>
            </ul>
          </div>
          <Link href="/tours" className="inline-block bg-[#314a1c] hover:bg-emerald-800 text-white font-bold py-3 px-8 rounded-none transition-all uppercase tracking-wider">
            Explore More Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <button onClick={() => router.back()} className="text-stone-500 hover:text-[#314a1c] flex items-center gap-2 font-medium transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Tour Details
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Booking Form */}
          <div className="md:w-2/3 bg-white rounded-none shadow-xl p-8 border border-stone-100">
            <h1 className="text-3xl font-bold text-stone-800 mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>Complete Your Booking</h1>
            
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin h-8 w-8 border-b-2 border-[#314a1c]"></div>
              </div>
            ) : !user ? (
              <div className="bg-stone-50 border border-stone-200 p-8 text-center rounded-none my-8">
                <div className="w-16 h-16 bg-stone-200 text-stone-400 rounded-none flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-stone-800 mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>Authentication Required</h2>
                <p className="text-stone-600 mb-6">You must be logged in to book a tour. Please log in or create an account to secure your spot.</p>
                <Link 
                  href={`/login?redirect=/tours/${tour.id}/book`}
                  className="inline-block bg-[#314a1c] hover:bg-[#1f3012] text-white font-bold py-3 px-8 transition-all uppercase tracking-wider"
                >
                  Login / Register
                </Link>
              </div>
            ) : (
              <>
                {/* Progress Bar */}
                <div className="flex items-center mb-8">
                  <div className={`w-8 h-8 rounded-none flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-[#314a1c] text-white' : 'bg-stone-100 text-stone-400'}`}>1</div>
                  <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-[#314a1c]' : 'bg-stone-100'}`}></div>
                  <div className={`w-8 h-8 rounded-none flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-[#314a1c] text-white' : 'bg-stone-100 text-stone-400'}`}>2</div>
                  <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-[#314a1c]' : 'bg-stone-100'}`}></div>
                  <div className={`w-8 h-8 rounded-none flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-[#314a1c] text-white' : 'bg-stone-100 text-stone-400'}`}>3</div>
                </div>

            {/* Step 1: Date & Guests */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-stone-800 border-b pb-2">Step 1: Date & Guests</h2>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Select Date <span className="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-800 rounded-none px-4 py-3 focus:outline-none focus:border-[#314a1c] focus:ring-1 focus:ring-[#314a1c]"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Adults</label>
                    <input 
                      type="number" 
                      min="1"
                      value={formData.adults}
                      onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value) || 1})}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-800 rounded-none px-4 py-3 focus:outline-none focus:border-[#314a1c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Children (Under 12)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formData.children}
                      onChange={(e) => setFormData({...formData, children: parseInt(e.target.value) || 0})}
                      className="w-full bg-stone-50 border border-stone-200 text-stone-800 rounded-none px-4 py-3 focus:outline-none focus:border-[#314a1c]"
                    />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button onClick={handleNext} className="bg-[#314a1c] hover:bg-emerald-800 text-white font-bold py-3 px-8 rounded-none transition-all uppercase tracking-wider">
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-stone-800 border-b pb-2">Step 2: Contact Details</h2>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formData.customerName}
                    onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    placeholder="John Doe"
                    className="w-full bg-stone-50 border border-stone-200 text-stone-800 rounded-none px-4 py-3 focus:outline-none focus:border-[#314a1c]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input 
                      type="email" 
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full bg-stone-50 border border-stone-200 text-stone-800 rounded-none px-4 py-3 focus:outline-none focus:border-[#314a1c]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-stone-50 border border-stone-200 text-stone-800 rounded-none px-4 py-3 focus:outline-none focus:border-[#314a1c]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Special Requests (Optional)</label>
                  <textarea 
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                    placeholder="Dietary requirements, special occasions, etc."
                    rows={3}
                    className="w-full bg-stone-50 border border-stone-200 text-stone-800 rounded-none px-4 py-3 focus:outline-none focus:border-[#314a1c] resize-none"
                  ></textarea>
                </div>
                <div className="pt-4 flex justify-between">
                  <button onClick={handleBack} className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-3 px-8 rounded-none transition-all uppercase tracking-wider">
                    Back
                  </button>
                  <button onClick={handleNext} className="bg-[#314a1c] hover:bg-emerald-800 text-white font-bold py-3 px-8 rounded-none transition-all uppercase tracking-wider">
                    Review
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-stone-800 border-b pb-2">Step 3: Review & Confirm</h2>
                
                <div className="bg-stone-50 p-6 rounded-none border border-stone-200 space-y-4">
                  <div className="grid grid-cols-2 gap-y-4">
                    <div className="text-stone-500 text-sm">Tour</div>
                    <div className="text-stone-800 font-bold text-right">{tour.title}</div>
                    
                    <div className="text-stone-500 text-sm">Date</div>
                    <div className="text-stone-800 font-bold text-right">{formData.date}</div>
                    
                    <div className="text-stone-500 text-sm">Guests</div>
                    <div className="text-stone-800 font-bold text-right">{formData.adults} Adults, {formData.children} Children</div>
                    
                    <div className="text-stone-500 text-sm">Primary Contact</div>
                    <div className="text-stone-800 font-bold text-right">
                      {formData.customerName}<br/>
                      <span className="text-xs text-stone-500 font-normal">{formData.customerEmail} | {formData.customerPhone}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-stone-200 pt-4 mt-4 flex justify-between items-center">
                    <div className="text-stone-800 font-bold text-lg">Total Estimated Price</div>
                    <div className="text-3xl font-bold text-[#314a1c]">${totalPrice}</div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-none text-sm flex gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <p>No payment is required right now. By submitting this request, you secure your spot. Our team will contact you within 24 hours to confirm and arrange payment.</p>
                </div>

                <div className="pt-4 flex justify-between">
                  <button onClick={handleBack} disabled={loading} className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-3 px-8 rounded-none transition-all uppercase tracking-wider disabled:opacity-50">
                    Back
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="bg-[#314a1c] hover:bg-emerald-800 text-white font-bold py-3 px-8 rounded-none transition-all uppercase tracking-wider flex items-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing...
                      </>
                    ) : (
                      'Submit Booking Request'
                    )}
                  </button>
                </div>
              </div>
            )}
              </>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="md:w-1/3">
            <div className="bg-stone-900 rounded-none shadow-xl overflow-hidden sticky top-32">
              <div className="h-40 relative">
                <img src={tour.img} alt={tour.title} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-playfair)' }}>{tour.title}</h3>
                  <p className="text-stone-300 text-sm">{tour.duration}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-800">
                  <span className="text-stone-400 text-sm font-medium">Price per adult</span>
                  <span className="text-white font-bold">${tour.price}</span>
                </div>
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-800">
                  <span className="text-stone-400 text-sm font-medium">Price per child</span>
                  <span className="text-white font-bold">${(tour.price || 0) * 0.5}</span>
                </div>
                
                <div className="bg-stone-800 rounded-none p-4 mb-4 text-sm text-stone-300">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Free cancellation up to 7 days before
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      No hidden booking fees
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      Instant confirmation email
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
