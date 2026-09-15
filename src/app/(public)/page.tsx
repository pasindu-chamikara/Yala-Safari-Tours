import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { getTours } from "@/lib/firebase/tours";
import { tours as fallbackTours } from "@/lib/data/tours";
import { getVehicles } from "@/lib/firebase/vehicles";
import HeroSlider from "@/components/HeroSlider";
import PopularTours from "@/components/home/PopularTours";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { success, data } = await getTours();
  const plainData = success && data ? JSON.parse(JSON.stringify(data)) : null;
  const displayTours = plainData && plainData.length > 0 ? plainData.slice(0, 3) : fallbackTours.slice(0, 3);

  const vehicles = await getVehicles();

  return (
    <main className="flex flex-col min-h-screen bg-white font-sans w-full overflow-hidden">
      {/* Floating Premium Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] md:min-h-screen flex flex-col pt-20 md:pt-0 justify-center">
        <HeroSlider />
        {/* Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/50 to-transparent z-[5]"></div>

        {/* Main Content */}
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full flex-grow flex flex-col justify-center py-10">
          <div className="flex items-center gap-2 md:gap-4 text-white text-xs md:text-sm font-bold tracking-widest mb-6">
            <div className="w-6 md:w-10 h-px bg-red-500"></div>
            TRUSTED BY 2000+ TRAVELLERS WORLDWIDE
            <div className="w-6 md:w-10 h-px bg-red-500"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-2xl max-w-3xl" style={{ fontFamily: 'var(--font-playfair)' }}>
            Experience the Wild Heart of Sri Lanka
          </h1>
          <p className="text-lg md:text-xl text-stone-100 font-medium mb-10 drop-shadow-xl max-w-xl leading-relaxed">
            Luxury Sri Lankan Safaris Designed to Rewild Your Soul, Transform Lives, and Protect Wildlife & Wild Spaces
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/tours"
              className="bg-[#ffcc00] text-stone-900 border border-[#ffcc00] hover:bg-yellow-500 hover:border-yellow-500 font-bold py-3 px-8 transition-colors shadow-xl w-full sm:w-auto"
            >
              Explore Tours
            </Link>
          </div>
        </div>

      </section>

      {/* Trust Bar (Moved from hero to unclutter photo) */}
      <div className="w-full bg-stone-900 px-6 md:px-12 py-8 relative z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-white text-sm md:text-base">
          <div className="flex items-center gap-3 font-medium">
            <div className="bg-emerald-500 p-2 rounded-full">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
            Rated 4.9/5 on TripAdvisor
          </div>
          <div className="flex items-center gap-3 font-medium">
            <div className="bg-stone-800 p-2 rounded-full">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            10+ Years of Safari Experience
          </div>
          <div className="flex items-center gap-3 font-medium">
            <div className="bg-stone-800 p-2 rounded-full">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            </div>
            Local Guides & Authentic Experiences
          </div>
        </div>
      </div>

      {/* Destinations Section */}
      <section id="parks" className="py-12 relative z-20 mt-6 overflow-hidden bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <div className="flex flex-col items-center justify-center group cursor-default">
            <div className="flex items-center justify-center gap-4 text-[#314a1c] text-sm font-bold tracking-widest mb-4">
              <div className="w-8 h-px bg-[#314a1c] transition-all duration-700 group-hover:w-24 group-hover:bg-emerald-600"></div>
              <span className="transition-transform duration-500 group-hover:scale-110 group-hover:text-emerald-700">EXPLORE</span>
              <div className="w-8 h-px bg-[#314a1c] transition-all duration-700 group-hover:w-24 group-hover:bg-emerald-600"></div>
            </div>
            <h2 className="text-5xl text-stone-900 mb-4 transition-colors duration-700 group-hover:text-stone-700" style={{ fontFamily: 'var(--font-playfair)' }}>
              Sri Lanka's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#314a1c] via-emerald-500 to-[#314a1c] bg-[length:200%_auto] animate-[text-gradient_5s_linear_infinite]">Iconic</span> Destinations
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto transition-colors duration-700 group-hover:text-stone-900">
              From the vast plains of the Yala National Park to the majestic peaks of Adam's Peak - explore where your adventure begins.
            </p>
          </div>
        </div>

        {/* Expanding Accordion Track */}
        <div className="max-w-[90rem] mx-auto px-4 md:px-6 w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full h-[700px] md:h-[600px]">
            {[
              { name: 'Yala National Park', desc: 'Famous for leopards, elephants, sloth bears, and diverse wildlife. Experience an exciting safari through forests, grasslands, and lagoons.', img: '/yala.jpg', slug: 'yala' },
              { name: 'Udawalawe National Park', desc: 'One of Sri Lanka\'s best destinations for elephant sightings, surrounded by beautiful grasslands and forests.', img: '/udawalawa.jpg', slug: 'udawalawe' },
              { name: 'Wilpattu National Park', desc: 'Explore Sri Lanka\'s largest national park, famous for its peaceful forests, unique villu lakes, and rich wildlife.', img: '/wilpattu.jpg', slug: 'wilpattu' },
              { name: 'Minneriya National Park', desc: 'Home to the famous Elephant Gathering, where large herds of wild elephants gather around the Minneriya Tank.', img: '/minneriya.jpg', slug: 'minneriya' },
            ].map((dest, i) => (
              <Link href={`/parks/${dest.slug}`} key={i} className="relative flex-1 md:hover:flex-[3] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl flex items-end">
                <img src={dest.img} alt={dest.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 md:via-stone-900/30 to-transparent opacity-90 md:opacity-80 group-hover:opacity-60 transition-opacity duration-700"></div>

                <div className="relative p-6 md:p-8 w-full flex flex-col justify-end">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-none bg-white/20 backdrop-blur-md flex items-center justify-center mb-3 md:mb-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 md:delay-100">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>

                  <h3 className="text-2xl md:text-3xl text-white font-bold whitespace-normal md:whitespace-nowrap transition-transform duration-500 drop-shadow-md" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {dest.name}
                  </h3>

                  <div className="grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-stone-200 text-sm md:text-base mt-2 md:mt-3 line-clamp-2 md:line-clamp-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 md:delay-200 pr-4">
                        {dest.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Safari Insights & Travel Tips Section */}
      <section className="py-12 bg-[#eef2e6] relative">
        <div className="absolute top-0 left-0 w-full -translate-y-[40%] rotate-180 z-10">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-24 fill-[#eef2e6]" preserveAspectRatio="none">
            <path d="M0,60 C150,80 300,20 450,50 C600,80 750,10 900,40 C1050,70 1200,30 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 text-center">
          <div className="flex items-center justify-center gap-4 text-[#314a1c] text-sm font-bold tracking-widest mb-4">
            <div className="w-16 h-px bg-[#314a1c]"></div>
            SAFARI
            <div className="w-16 h-px bg-[#314a1c]"></div>
          </div>
          <h2 className="text-5xl text-stone-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Safari Insights & Travel Tips</h2>
          <p className="text-stone-600 mb-16 max-w-2xl mx-auto">Get ready for your Yala adventure with helpful safari tips, wildlife insights, and travel information designed to make your experience unforgettable.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-12">
            {[
              { 
                tag: 'PLAN YOUR SAFARI', 
                title: 'Best Time to Visit', 
                desc: 'Discover the best times to visit Yala National Park and learn when you\'re most likely to experience amazing wildlife sightings.',
                linkText: 'Explore Guide →',
              },
              { 
                tag: 'TRAVEL SMART', 
                title: 'Essential Safari Tips', 
                desc: 'Learn what to bring, how to prepare, and the important safari etiquette to follow for a safe and enjoyable wildlife experience.',
                linkText: 'Read Safari Tips →',
              },
              { 
                tag: 'MEET THE WILDLIFE', 
                title: 'Wildlife Guide', 
                desc: 'Discover the incredible animals of Yala, from Sri Lankan leopards and elephants to sloth bears, crocodiles, and beautiful birds.',
                linkText: 'Discover Wildlife →',
              }
            ].map((blog, i) => (
              <div key={i} className="group cursor-pointer flex flex-col bg-white border border-stone-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[10px] font-bold px-3 py-1 bg-[#314a1c] text-white mb-6 tracking-widest self-start">{blog.tag}</span>
                <h3 className="text-2xl font-bold text-stone-900 mb-4 font-serif" style={{ fontFamily: 'var(--font-playfair)' }}>{blog.title}</h3>
                <p className="text-base text-stone-600 mb-8 flex-grow">{blog.desc}</p>
                
                <div className="flex items-center text-[#314a1c] font-bold text-sm mt-auto group-hover:text-yellow-600 transition-colors">
                  {blog.linkText}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full translate-y-[40%] z-10">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-24 fill-white" preserveAspectRatio="none">
            <path d="M0,60 C150,80 300,20 450,50 C600,80 750,10 900,40 C1050,70 1200,30 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Popular Safaris Section */}
      <section className="py-12 px-6 max-w-7xl mx-auto text-center relative z-20 mt-10">
        <div className="flex items-center justify-center gap-4 text-[#314a1c] text-sm font-bold tracking-widest mb-4">
          <div className="w-16 h-px bg-[#314a1c]"></div>
          OUR MOST
          <div className="w-16 h-px bg-[#314a1c]"></div>
        </div>
        <h2 className="text-5xl text-stone-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Popular Safaris & Tours</h2>
        <p className="text-stone-600 mb-10">Handpicked journeys that bring you closer to Sri Lanka's untamed beauty.</p>

        <PopularTours initialTours={displayTours} />

        <Link href="/tours" className="inline-block bg-[#ffcc00] hover:bg-yellow-500 text-black font-extrabold py-3 px-8 transition shadow-md">
          View All Safaris
        </Link>
      </section>



      {/* Our Fleet Section */}
      <section className="py-12 px-6 max-w-[90rem] mx-auto text-center relative z-20">
        <div className="flex items-center justify-between mb-12 text-left">
          <div>
            <p className="text-[#314a1c] text-sm font-bold tracking-widest mb-2 uppercase">Our Fleet</p>
            <h2 className="text-5xl text-stone-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Custom Safari Jeeps</h2>
            <p className="text-stone-600">Built for rugged terrain, designed for your safety and maximum wildlife visibility.</p>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 border-2 border-stone-300 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:border-stone-900 hover:bg-stone-50 transition shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <button className="w-12 h-12 border-2 border-stone-900 flex items-center justify-center text-stone-900 hover:bg-stone-50 transition shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>

        {vehicles.length === 0 ? (
          <div className="py-20 text-stone-500 border border-stone-200 bg-stone-50/50">
            <p>Our fleet gallery is currently being updated. Check back soon!</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x hide-scrollbar text-left">
            {vehicles.map((vehicle, i) => (
              <div key={vehicle.id || i} className="min-w-[85vw] md:min-w-[450px] lg:min-w-[500px] bg-white overflow-hidden shadow-sm border border-stone-100 snap-center">
                <div className="relative h-72 md:h-80">
                  <img src={vehicle.url} alt={vehicle.title} className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-[#314a1c]/80 backdrop-blur-sm text-white">4x4 Safari Jeep</span>
                </div>
                <div className="px-6 py-5">
                  <h3 className="text-xl text-stone-900 font-bold font-serif" style={{ fontFamily: 'var(--font-playfair)' }}>{vehicle.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center gap-4 mt-8">
          <Link href="/tours" className="bg-[#ffcc00] hover:bg-yellow-500 text-black font-extrabold py-3 px-8 transition shadow-md">
            Book a Safari
          </Link>
        </div>
      </section>

      {/* About Yala Safari Tours */}
      <section className="relative overflow-hidden pt-24 bg-gradient-to-b from-white to-[#ffeb99] z-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div className="relative z-20 pb-24">
            <div className="flex items-center gap-4 text-[#314a1c] text-sm font-bold tracking-widest mb-4">
              <div className="w-16 h-px bg-[#314a1c]"></div>
              ABOUT
            </div>
            <h2 className="text-5xl text-stone-900 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>Yala Safari Tours</h2>
            <div className="border-l-4 border-red-500 pl-4 py-1 mb-8">
              <h3 className="text-xl font-bold text-stone-800">From our roots in Yala to the heart of your next adventure.</h3>
            </div>
            <p className="text-sm text-stone-700 mb-4 leading-relaxed font-medium">
              Yala Safari Tours was born from a passion for sharing the beauty of Sri Lanka with the world. Our team of local experts creates authentic experiences that blend wildlife, culture, and comfort - ensuring every traveler leaves with unforgettable memories.
            </p>
            <p className="text-sm text-stone-700 mb-10 leading-relaxed font-medium">
              The creation of Yala Safari Tours is a true community effort, bringing together skilled hands and loving hearts. A few days before the wedding, women from the community gather to craft this vibrant necklace, pouring their collective love and blessings into every knot.
            </p>
            <Link href="/about" className="inline-block bg-white hover:bg-stone-50 text-stone-900 font-bold py-3 px-8 transition shadow-md border border-stone-200">
              Know More
            </Link>
          </div>

          <div className="relative z-20 pb-24 flex justify-center">
            {/* Decorative Circular Rings */}
            <div className="absolute w-[400px] h-[400px] border-[12px] border-dashed border-white opacity-40"></div>
            <div className="absolute w-[460px] h-[460px] border-[8px] border-dashed border-white opacity-20"></div>

            <div className="w-[360px] h-[360px] overflow-hidden border-4 border-white shadow-2xl relative z-10">
              <img src="/about5.jpg" alt="Local Guide" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Torn Edge mask for the bottom transition */}
        <div className="absolute bottom-0 left-0 w-full z-30">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-24 fill-white" preserveAspectRatio="none">
            <path d="M0,60 C150,80 300,20 450,50 C600,80 750,10 900,40 C1050,70 1200,30 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-12 px-6 border-b border-stone-100 relative z-20 bg-white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 text-[#314a1c] text-sm font-bold tracking-widest mb-4">
            <div className="w-16 h-px bg-[#314a1c]"></div>
            OUR TRUSTED PARTNERS
            <div className="w-16 h-px bg-[#314a1c]"></div>
          </div>
          <h2 className="text-4xl text-stone-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>Partners & Affiliations</h2>
          <p className="text-stone-500">We proudly collaborate with leading travel and tourism organizations to ensure safe, sustainable, and unforgettable safari experiences.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-stone-900 grayscale">
          <div className="flex justify-center py-4"><span className="text-xl font-serif font-bold italic">So Sri Lanka</span></div>
          <div className="flex justify-center py-4"><span className="text-lg font-bold flex items-center gap-1"><span className="w-6 h-6 bg-green-500 inline-block rounded-full"></span>tripadvisor</span></div>
          <div className="flex justify-center py-4"><span className="text-sm font-bold uppercase text-center leading-tight">Yala<br />Wildlife<br />Service</span></div>
          <div className="flex justify-center py-4"><span className="text-xl font-serif text-amber-700 italic">elewana<br /><span className="text-[10px] uppercase font-sans text-stone-500 not-italic tracking-widest">collection</span></span></div>
        </div>
      </section>


      {/* Testimonials */}
      <section className="py-12 px-6 max-w-7xl mx-auto text-center relative z-20 bg-white">
        <div className="flex items-center justify-center gap-4 text-[#314a1c] text-sm font-bold tracking-widest mb-4">
          <div className="w-16 h-px bg-[#314a1c]"></div>
          TESTIMONIALS
          <div className="w-16 h-px bg-[#314a1c]"></div>
        </div>
        <h2 className="text-5xl text-stone-900 mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>What Our Guests Say</h2>
        <p className="text-stone-600 mb-16">Real stories from travelers who explored with Yala Safari Tours.</p>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 text-left">
          {[
            { rating: 5, title: "Professional and Reliable", text: "We are so pleased that we chose Yala Safari Tours! Everything was well organized, from the booking to the safari experience. Our driver was friendly, professional, and very knowledgeable about the wildlife. READ MORE →", author: "Nelly", loc: "United Kingdom", platform: "Google" },
            { rating: 5, title: "An Amazing Wildlife Experience", text: "Our Yala safari was one of the highlights of our Sri Lanka trip. We saw elephants, crocodiles, beautiful birds, and even a leopard! The whole experience was exciting and unforgettable. READ MORE →", author: "Daniel", loc: "Australia", platform: "Tripadvisor" },
            { rating: 5, title: "Excellent Safari Guide", text: "Our safari guide made the experience truly special. He knew the park very well and was patient while helping us spot wildlife. We felt comfortable and safe throughout the entire journey. READ MORE →", author: "Sophie", loc: "France", platform: "Google" },
            { rating: 5, title: "Highly Recommended", text: "From the first booking to the end of our safari, everything was smooth and hassle-free. The team was friendly, punctual, and extremely helpful. We would definitely recommend Yala Safari Tours. READ MORE →", author: "Michael", loc: "Germany", platform: "Tripadvisor" },
            { rating: 5, title: "Perfect Family Adventure", text: "We had a wonderful safari with our family. The jeep was comfortable, the service was excellent, and our children loved seeing the elephants and other animals in their natural habitat. A fantastic experience! READ MORE →", author: "Emma", loc: "Netherlands", platform: "Google" },
            { rating: 5, title: "Worth Every Moment", text: "Yala Safari Tours gave us an unforgettable day in the wild. Our guide was knowledgeable and made sure we had plenty of opportunities to enjoy and photograph the wildlife. We would happily book again! READ MORE →", author: "James", loc: "United States", platform: "Tripadvisor" },
          ].map((review, i) => (
            <div key={i} className="bg-white p-8  shadow-sm border border-stone-100 mb-6 break-inside-avoid">
              <div className="flex gap-1 text-[#ffcc00] mb-3">
                {[...Array(review.rating)].map((_, j) => <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>)}
              </div>
              <h4 className="font-bold text-stone-900 mb-3">{review.title}</h4>
              <p className="text-sm text-stone-500 mb-6 leading-relaxed">{review.text}</p>
              <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="leading-tight">
                    <div className="font-bold text-stone-900 text-sm">{review.author}</div>
                    <div className="text-xs text-stone-400">{review.loc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold">
                  {review.platform === 'Google' ? <div className="text-blue-500 font-serif text-lg leading-none mr-1">G</div> : <div className="w-5 h-5 bg-green-500 mr-1"></div>}
                  <div className="text-[10px] text-stone-500">Published on<br /><span className="text-stone-800">{review.platform}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA & Awards */}
      <section className="relative pt-24 pb-48 z-20">
        <div className="max-w-5xl mx-auto px-6 relative z-30 mb-[-100px] bg-white  p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 border-t-8 border-[#ffcc00]">
          <div className="w-full flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl text-stone-900 mb-8" style={{ fontFamily: 'var(--font-playfair)' }}>
              We're here to help you plan your <br /> <span className="text-[#314a1c]">Perfect Safari Experience</span>
            </h2>
            <Link href="/tours" className="inline-block bg-[#ffcc00] hover:bg-yellow-500 text-stone-900 font-bold py-3 px-8 transition shadow-md">
              Plan Your Safari Today
            </Link>
          </div>
        </div>

        <div className="relative w-full h-[500px] z-10 pt-32">
          <div className="absolute inset-0 bg-stone-900 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop" alt="Leopard" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
          </div>
        </div>

        {/* Dark torn edge transitioning into footer */}
        <div className="absolute bottom-0 left-0 w-full z-30 translate-y-1/2 rotate-180">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-24 fill-[#151515]" preserveAspectRatio="none">
            <path d="M0,60 C150,80 300,20 450,50 C600,80 750,10 900,40 C1050,70 1200,30 1440,60 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#151515] text-white pt-24 pb-12 relative z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-stone-800">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center overflow-hidden bg-white"><Image src="/logo-yala.jpg" alt="Logo" width={64} height={64} className="w-full h-full object-contain" style={{ width: "auto", height: "auto" }} /></div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-300">Yala Safari Tours</div>
            </div>

            <div className="flex flex-wrap items-center gap-12 text-sm text-stone-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-800 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div>
                <div>
                  <div className="text-xs text-stone-500 mb-1">Call anytime</div>
                  <div className="font-bold text-white">+94 77 123 4567</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-800 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
                <div>
                  <div className="text-xs text-stone-500 mb-1">Visit Office</div>
                  <div className="font-bold text-white">PR88+V9F, Utalii Ln, Tissamaharama, Sri Lanka</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-stone-800 flex items-center justify-center"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                <div>
                  <div className="text-xs text-stone-500 mb-1">Send email</div>
                  <div className="font-bold text-white">info@yalasafaritours.com</div>
                </div>
              </div>
            </div>

            <button className="bg-[#ffcc00] hover:bg-yellow-500 text-stone-900 font-bold py-3 px-8 text-sm transition shadow-md">
              Plan Your Safari Today
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-b border-stone-800 text-sm">
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
              <div className="flex gap-12">
                <ul className="space-y-4 text-stone-400">
                  <li><Link href="/tours" className="hover:text-white transition">Leopard Safaris</Link></li>
                  <li><Link href="/tours" className="hover:text-white transition">Luxury Safaris</Link></li>
                  <li><Link href="/tours" className="hover:text-white transition">Fly-in Safaris</Link></li>
                  <li><Link href="/tours" className="hover:text-white transition">Family Safaris</Link></li>
                  <li><Link href="/tours" className="hover:text-white transition">Honeymoon Safaris</Link></li>
                </ul>
                <ul className="space-y-4 text-stone-400">
                  <li><Link href="/tours" className="hover:text-white transition">Migration Safaris</Link></li>
                  <li><Link href="/tours" className="hover:text-white transition">Conservation Safaris</Link></li>
                  <li><Link href="/tours" className="hover:text-white transition">4x4 Safaris</Link></li>
                  <li><Link href="/tours" className="hover:text-white transition">Milestone Safaris</Link></li>
                </ul>
              </div>
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
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition cursor-pointer">f</div>
                <div className="w-10 h-10 bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition cursor-pointer">t</div>
                <div className="w-10 h-10 bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition cursor-pointer">in</div>
                <div className="w-10 h-10 bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition cursor-pointer">y</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center pt-8 text-xs text-stone-500">
            <div className="flex gap-6 mb-4 md:mb-0 text-center items-center">
              <p>&copy; 2025 YALA SAFARI TOURS. All Rights Reserved.</p>
              <Link href="/privacy" className="hover:text-stone-300">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-stone-300">Terms of Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
