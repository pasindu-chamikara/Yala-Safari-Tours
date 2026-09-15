import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Heart, Globe2, Shield, Leaf, HeartHandshake } from "lucide-react";

export const metadata = {
  title: 'About Us | Yala Safari Tours',
  description: 'Our heritage, our passion, and our promise to you.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 font-sans overflow-hidden">
      <Navbar />

      {/* 1. Cinematic Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/hero3.jpg" 
            alt="Majestic Sri Lankan Elephant" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-stone-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-50/10 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 mt-10 max-w-4xl mx-auto transform translate-y-8">
          <div className="inline-flex items-center gap-4 text-[#ffcc00] font-bold tracking-[0.2em] text-xs uppercase mb-8">
            <div className="w-12 h-px bg-[#ffcc00]"></div>
            Our Heritage
            <div className="w-12 h-px bg-[#ffcc00]"></div>
          </div>
          <h1 className="text-6xl md:text-8xl text-white mb-6 leading-tight drop-shadow-2xl" style={{ fontFamily: 'var(--font-playfair)' }}>
            The Spirit of Yala
          </h1>
          <p className="text-xl md:text-2xl text-stone-300 font-light drop-shadow-lg leading-relaxed">
            More than just a safari. We are the stewards of Sri Lanka's wild spaces.
          </p>
        </div>
      </section>

      {/* 2. Brand Identity & Intro Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center relative z-20">

        
        <h2 className="text-4xl md:text-5xl text-stone-900 mb-10 leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
          Born from a profound respect for nature.
        </h2>
        <div className="w-24 h-1 bg-[#314a1c] mx-auto mb-10"></div>
        <p className="text-stone-600 text-xl leading-loose font-light">
          Yala Safari Tours was founded on a simple yet powerful vision: to share the breathtaking biodiversity of our island while actively preserving it. What began as a collective of local wildlife enthusiasts has grown into a premier journey of discovery, blending thrilling encounters with unwavering eco-conscious principles.
        </p>
      </section>

      {/* 3. True Sri Lankan Hospitality (Using about2.jpg) */}
      <section className="py-12 bg-stone-900 relative overflow-hidden">
        {/* Decorative subtle background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-500 via-stone-900 to-stone-900"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="order-2 lg:order-1 text-stone-300">
            <div className="flex items-center gap-4 text-[#ffcc00] font-bold tracking-widest text-sm uppercase mb-6">
              <Heart className="w-5 h-5" />
              Community & Care
            </div>
            <h3 className="text-4xl md:text-5xl text-white mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
              True Sri Lankan Hospitality
            </h3>
            <p className="text-lg leading-relaxed mb-8 font-light text-stone-400">
              A safari with us is not merely a transaction; it is an invitation into our community. We believe that the warmth of our people is as essential to your experience as the wilderness itself.
            </p>
            <p className="text-lg leading-relaxed mb-10 font-light text-stone-400">
              The creation of Yala Safari Tours is a true community effort, bringing together skilled hands and loving hearts. Just as the women from our community gather to craft vibrant traditional pieces, pouring their collective love and blessings into every knot, our team pours that same dedication into caring for you throughout your journey.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>100%</span>
                <span className="text-xs uppercase tracking-widest text-stone-500">Local Staff</span>
              </div>
              <div className="w-px h-12 bg-stone-700"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-serif text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>24/7</span>
                <span className="text-xs uppercase tracking-widest text-stone-500">Dedicated Support</span>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/5] md:aspect-square w-full rounded-none overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-stone-800">
              <img 
                src="/about2.jpg" 
                alt="Community and Hospitality" 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-900/20 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Experience Collage (Using about3.jpg & about4.jpg) */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8">
          
          {/* Overlapping Image Grid */}
          <div className="md:w-1/2 relative min-h-[400px] w-full">
            <div className="absolute top-0 left-0 w-3/4 aspect-[3/4] rounded-none overflow-hidden shadow-2xl z-10 animate-float-slow border-4 border-white">
              <img src="/about3.jpg" alt="Safari Experience" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-2/3 aspect-square rounded-none overflow-hidden shadow-2xl z-20 border-8 border-stone-50 bg-stone-200">
              <img src="/about4.jpg" alt="Wildlife Encounter" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-16">
            <h3 className="text-4xl text-stone-900 mb-8 font-serif leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Curating unforgettable encounters with nature.
            </h3>
            <p className="text-stone-600 text-lg leading-relaxed mb-12 font-light">
              The thrill of spotting a majestic leopard resting on a granite boulder, the awe of seeing a herd of elephants bathing in a waterhole, and the serenity of a sunset over the scrub jungle – these are the moments we live to share with you.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-[#314a1c]/10 text-[#314a1c] rounded-none flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl text-stone-900 font-bold mb-2">Uncompromising Quality</h4>
                  <p className="text-stone-600 font-light">Our custom-modified 4x4 jeeps and highly trained drivers ensure maximum safety and comfort without sacrificing the rugged thrill of the wild.</p>
                </div>
              </div>
              
              <div className="flex gap-6 items-start">
                <div className="w-14 h-14 shrink-0 bg-amber-100 text-amber-600 rounded-none flex items-center justify-center">
                  <Globe2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl text-stone-900 font-bold mb-2">Eco-Conscious Exploration</h4>
                  <p className="text-stone-600 font-light">We strictly adhere to ethical wildlife viewing practices. We observe quietly, leave no trace, and ensure our presence never disturbs the natural harmony.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="bg-stone-100 py-16 border-t border-stone-200 text-center px-6">
        <h2 className="text-5xl text-stone-900 mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
          Ready for the ultimate adventure?
        </h2>
        <p className="text-stone-500 text-xl font-light mb-12 max-w-2xl mx-auto">
          Let our experts craft a personalized safari itinerary that exceeds your wildest expectations.
        </p>
        <Link 
          href="/tours" 
          className="inline-flex items-center justify-center bg-[#314a1c] hover:bg-[#1f3012] text-white font-bold py-5 px-12 text-lg transition-all shadow-xl hover:shadow-2xl"
        >
          Explore Our Safari Packages
        </Link>
      </section>
    </main>
  );
}
