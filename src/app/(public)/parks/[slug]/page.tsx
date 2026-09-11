import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronLeft, MapPin, Leaf, ShieldCheck, Clock } from "lucide-react";

const parkDetails = {
  'yala': {
    name: 'Yala National Park',
    desc: 'Famous for leopards, elephants, sloth bears, and diverse wildlife.',
    fullDesc: `Yala National Park is one of the most popular wildlife destinations in Sri Lanka. It is especially famous for its Sri Lankan leopards, elephants, sloth bears, crocodiles, and many species of birds. A Yala safari offers an exciting opportunity to explore forests, grasslands, lagoons, and beautiful natural landscapes while observing wildlife in its natural habitat.`,
    highlights: [
      "Famous for Sri Lankan leopards",
      "Elephants, sloth bears, crocodiles & deer",
      "Rich variety of birds",
      "Beautiful forests, lakes, and grasslands",
      "Ideal for exciting wildlife safaris"
    ],
    img: '/yala.jpg',
    stats: { size: '979 km²', established: '1938' }
  },
  'udawalawe': {
    name: 'Udawalawe National Park',
    desc: 'One of Sri Lanka\'s best destinations for elephant sightings, surrounded by beautiful grasslands and forests.',
    fullDesc: `Udawalawe National Park is one of the best places in Sri Lanka to see wild elephants. The park is home to large herds of elephants as well as water buffalo, crocodiles, deer, monkeys, and many different bird species. Its open grasslands and surrounding forests provide excellent opportunities for wildlife photography and safari experiences.`,
    highlights: [
      "Excellent for elephant sightings",
      "Large open grasslands",
      "Water buffalo, crocodiles, deer & monkeys",
      "Many bird species",
      "Great choice for families and wildlife lovers"
    ],
    img: '/udawalawa.jpg',
    stats: { size: '308 km²', established: '1972' }
  },
  'wilpattu': {
    name: 'Wilpattu National Park',
    desc: 'Explore Sri Lanka\'s largest national park, famous for its peaceful forests, unique villu lakes, and rich wildlife.',
    fullDesc: `Wilpattu National Park is the largest national park in Sri Lanka and is famous for its unique villu lakes, natural water-filled depressions surrounded by forest. The park provides a peaceful and less crowded safari experience. Visitors can discover leopards, elephants, sloth bears, deer, crocodiles, and a variety of birds.`,
    highlights: [
      "Sri Lanka's largest national park",
      "Famous for natural villu lakes",
      "Good chance of seeing leopards",
      "Elephants, sloth bears & deer",
      "Peaceful and less crowded safari experience"
    ],
    img: '/wilpattu.jpg',
    stats: { size: '1,317 km²', established: '1938' }
  },
  'minneriya': {
    name: 'Minneriya National Park',
    desc: 'Home to the famous Elephant Gathering, where large herds of wild elephants gather around the Minneriya Tank.',
    fullDesc: `Minneriya National Park is world-famous for the Minneriya Elephant Gathering, where large numbers of wild elephants come together around the Minneriya Tank, especially during the dry season. The park also provides opportunities to see deer, monkeys, crocodiles, and many species of birds.`,
    highlights: [
      "Famous for the Elephant Gathering",
      "Large herds of wild elephants",
      "Beautiful Minneriya Tank",
      "Deer, monkeys, crocodiles & birds",
      "Excellent destination for wildlife photography"
    ],
    img: '/minneriya.jpg',
    stats: { size: '89 km²', established: '1997' }
  }
};

export default async function ParkDetails({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const park = parkDetails[resolvedParams.slug as keyof typeof parkDetails];

  if (!park) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 overflow-hidden font-sans pb-24">
      {/* Immersive Hero Section */}
      <section className="relative w-full h-[50vh] md:h-[80vh] min-h-[350px]">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src={park.img} 
            alt={park.name} 
            fill 
            className="object-cover object-center"
            priority
          />
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/20 to-stone-900/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80"></div>
        </div>

        {/* Back Button - Glassmorphism */}
        <div className="absolute top-8 left-6 md:left-12 z-20">
          <Link 
            href="/#parks" 
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-none bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:-translate-x-1 group"
          >
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Explore
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 translate-y-[-4rem] md:translate-y-[-6rem]">
          <div className="max-w-6xl mx-auto flex flex-col items-start">
            <div className="flex items-center gap-2 text-emerald-400 font-bold tracking-widest text-xs uppercase mb-4">
              <MapPin className="w-4 h-4" />
              <span>Sri Lanka</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-4 drop-shadow-xl leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              {park.name}
            </h1>
            <p className="text-lg md:text-2xl text-stone-200 max-w-2xl font-light drop-shadow-md border-l-2 border-emerald-500 pl-4">
              {park.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Overlapping Content Section */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 md:px-6 -mt-16 md:-mt-12">
        <div className="bg-white rounded-none shadow-2xl overflow-hidden border border-stone-100 flex flex-col md:flex-row">
          
          {/* Main Description Column */}
          <div className="p-8 md:p-12 md:w-3/5 border-b md:border-b-0 md:border-r border-stone-100 bg-white relative">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
               <Leaf className="w-48 h-48 text-stone-900" />
            </div>
            
            <h2 className="text-3xl text-stone-900 mb-8 font-serif" style={{ fontFamily: 'var(--font-playfair)' }}>
              About The Park
            </h2>
            
            <p className="text-stone-600 text-lg leading-loose relative z-10 font-light">
              {park.fullDesc}
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-stone-100 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-none bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Established</p>
                  <p className="text-lg font-bold text-stone-800">{park.stats.established}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-none bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Area Size</p>
                  <p className="text-lg font-bold text-stone-800">{park.stats.size}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Column */}
          <div className="p-8 md:p-12 md:w-2/5 bg-stone-50/50 relative">
            <h3 className="text-xl font-bold text-stone-900 mb-8 flex items-center gap-3">
              <div className="w-8 h-px bg-[#314a1c]"></div>
              Key Highlights
            </h3>
            
            <div className="flex flex-col gap-6">
              {park.highlights.map((highlight, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 rounded-none shadow-sm border border-stone-100 flex items-start gap-4 hover:shadow-md transition-shadow group"
                >
                  <div className="mt-0.5 w-6 h-6 rounded-none bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-stone-700 font-medium leading-tight pt-0.5">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>



    </main>
  );
}
