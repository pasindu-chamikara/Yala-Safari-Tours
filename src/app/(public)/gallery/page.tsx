"use client";

import { useState, useEffect } from 'react';
import { GalleryImage, getGalleryImages } from '@/lib/firebase/gallery';
import { X, ZoomIn } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getGalleryImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Navbar />

      <main className="pt-32 pb-10 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 text-[#314a1c] text-sm font-bold tracking-widest mb-4">
            <div className="w-16 h-px bg-[#314a1c]"></div>
            CAPTURED MOMENTS
            <div className="w-16 h-px bg-[#314a1c]"></div>
          </div>
          <h1 className="text-5xl text-stone-900 mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>Our Safari Gallery</h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg">
            Immerse yourself in the breathtaking beauty of Sri Lanka's wildlife. Through the lens of our guests and guides, experience the untamed wilderness.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-[#314a1c]"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center text-stone-500 py-10 bg-white shadow-sm border border-stone-100">
            <p className="text-xl font-medium">No images available yet.</p>
            <p className="mt-2">Check back soon for amazing safari moments!</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="break-inside-avoid relative group cursor-pointer overflow-hidden bg-stone-200"
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-none transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox / Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-stone-950/95 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-md transition-opacity">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-none p-2 transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-6xl h-full flex flex-col md:flex-row items-center gap-8 relative">
            <div className="flex-1 w-full h-[40vh] md:h-[80vh] relative flex items-center justify-center">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title} 
                className="max-w-full max-h-full object-contain drop-shadow-2xl"
              />
            </div>
            
            <div className="w-full md:w-80 lg:w-96 bg-stone-900/80 p-6 md:p-8 rounded-none border border-white/10 text-left shrink-0 max-h-[30vh] md:max-h-none overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-emerald-500 rounded-none"></div>
                <h2 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {selectedImage.title}
                </h2>
              </div>
              
              <p className="text-stone-300 mb-8 leading-relaxed font-light text-sm md:text-base">
                {selectedImage.description || "A breathtaking moment captured during our safaris. The untamed beauty of Sri Lanka's wilderness on full display."}
              </p>
              
              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-stone-500 font-medium tracking-wider uppercase">
                <span>Date Captured</span>
                <span>{new Date(selectedImage.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
