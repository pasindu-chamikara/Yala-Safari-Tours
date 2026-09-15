import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: 'Contact Us | Yala Safari Tours',
  description: 'Get in touch with us to plan your ultimate safari adventure.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-stone-50 font-sans overflow-hidden">
      <Navbar />

      {/* 1. Cinematic Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/hero4.jpg" 
            alt="Safari Landscape" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-stone-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-stone-50 via-stone-50/10 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-6 mt-10 max-w-4xl mx-auto transform translate-y-8">
          <h1 className="text-5xl md:text-7xl text-white mb-4 leading-tight drop-shadow-2xl" style={{ fontFamily: 'var(--font-playfair)' }}>
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-stone-300 font-light drop-shadow-lg leading-relaxed">
            We'd love to hear from you. Start planning your adventure today.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto relative z-20 -mt-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 bg-white p-8 md:p-12 shadow-2xl border border-stone-100">
          
          {/* Contact Information */}
          <div className="flex flex-col space-y-10">
            <div>
              <h2 className="text-3xl text-stone-900 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Contact Information
              </h2>
              <p className="text-stone-600 font-light leading-relaxed mb-8">
                Whether you have a question about our safari packages, need help crafting a custom itinerary, or just want to say hello, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#314a1c]/10 text-[#314a1c] rounded-none flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg text-stone-900 font-bold mb-1">Our Location</h4>
                  <p className="text-stone-600 font-light">Yala National Park Road, Tissamaharama, Sri Lanka</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#314a1c]/10 text-[#314a1c] rounded-none flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg text-stone-900 font-bold mb-1">Phone Number</h4>
                  <p className="text-stone-600 font-light">+94 77 123 4567<br/>+94 47 987 6543</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#314a1c]/10 text-[#314a1c] rounded-none flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg text-stone-900 font-bold mb-1">Email Address</h4>
                  <p className="text-stone-600 font-light">info@yalasafari.com<br/>bookings@yalasafari.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#314a1c]/10 text-[#314a1c] rounded-none flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg text-stone-900 font-bold mb-1">Working Hours</h4>
                  <p className="text-stone-600 font-light">Mon - Sun: 6:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />

        </div>
      </section>

    </main>
  );
}
