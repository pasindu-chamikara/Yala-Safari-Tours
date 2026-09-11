"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/hero1.jpg",
  "/hero2.jpg",
  "/hero3.jpg",
  "/hero4.jpg",
  "/hero5.jpg"
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-stone-900 overflow-hidden">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Hero Image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-70 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
    </div>
  );
}
