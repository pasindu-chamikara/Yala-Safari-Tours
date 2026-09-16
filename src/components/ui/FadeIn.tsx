"use client";

import { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  mobileOnly?: boolean;
}

export default function FadeIn({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up",
  mobileOnly = false
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTranslateClass = () => {
    if (isVisible) return "translate-x-0 translate-y-0";
    
    switch (direction) {
      case "up": return "translate-y-12";
      case "down": return "-translate-y-12";
      case "left": return "translate-x-12";
      case "right": return "-translate-x-12";
      case "none": return "";
      default: return "translate-y-12";
    }
  };

  const baseClasses = "transition-all duration-1000 ease-out";
  const mobileClasses = mobileOnly 
    ? `md:opacity-100 md:translate-x-0 md:translate-y-0 ${isVisible ? 'opacity-100 ' + getTranslateClass() : 'opacity-0 ' + getTranslateClass()}`
    : `${isVisible ? 'opacity-100' : 'opacity-0'} ${getTranslateClass()}`;

  return (
    <div 
      ref={ref} 
      className={`${baseClasses} ${mobileClasses} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
