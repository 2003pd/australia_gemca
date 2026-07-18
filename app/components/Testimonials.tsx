"use client";

import { useState, useEffect } from "react";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  country: string;
  flag: string;
  visaType: string;
  rating: number;
  text: string;
  date: string;
}

const testimonialsData: Testimonial[] = [
  {
    name: "Gurpreet Singh",
    country: "India",
    flag: "🇮🇳",
    visaType: "Subclass 189 - Skilled Independent",
    rating: 5,
    text: "Ansar Goraya's legal knowledge is absolute class. He analyzed my points profile, suggested ACS assessment pathways, and managed the entire application. The points calculator score matched exactly what we claimed. Highly recommend GEMCA!",
    date: "2026-05-12",
  },
  {
    name: "Sarah Jenkins",
    country: "United Kingdom",
    flag: "🇬🇧",
    visaType: "Subclass 820 - Partner (Onshore)",
    rating: 5,
    text: "Partner visas are emotionally stressful, but the four-pillar evidence framework GEMCA provided made compiling documents simple. The compliance check was thorough and my visa got approved without any RFI. Thank you, Ansar!",
    date: "2026-06-03",
  },
  {
    name: "Zhang Wei",
    country: "China",
    flag: "🇨🇳",
    visaType: "Subclass 500 - Student Visa",
    rating: 5,
    text: "Securing admission to Monash and getting my subclass 500 approved was very smooth. GEMCA drafted the Genuine Student statement properly, highlighting my course links to previous studies. Extremely professional agency.",
    date: "2026-06-25",
  },
  {
    name: "Amina Yusuf",
    country: "Kenya",
    flag: "🇰🇪",
    visaType: "Subclass 190 - State Nominated (Victoria)",
    rating: 5,
    text: "After my previous agent messed up my subclass 482 transition, GEMCA helped me secure my ROI invitation. Their lawyer-grade precision is what makes them different. Ansar's master of migration law credentials really shine through.",
    date: "2026-07-02",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const active = testimonialsData[activeIndex];

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "LocalBusiness",
              "name": "GEMCA - Goraya Education & Migration Consultant Australia"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": active.rating,
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": active.name
            },
            "reviewBody": active.text,
            "datePublished": active.date
          })
        }}
      />

      {/* Main Card */}
      <div className="bg-[#0A1F44] border border-[#C9A227]/25 rounded-2xl p-8 md:p-12 relative shadow-2xl overflow-hidden">
        
        {/* Decorative Quote Icon */}
        <Quote className="absolute right-6 top-6 w-24 h-24 text-white/5 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px]">
          <div>
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 fill-current ${
                    i < active.rating ? "text-[#C9A227]" : "text-slate-600"
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-lg md:text-xl font-medium text-slate-100 italic leading-relaxed mb-8">
              <span>&ldquo;{active.text}&rdquo;</span>
            </blockquote>
          </div>

          {/* Reviewer Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-700/50 pt-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {active.flag}
              </span>
              <div>
                <cite className="not-italic font-display font-bold text-white text-base block">
                  <span>{active.name}</span>
                </cite>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mt-0.5">
                  From {active.country} &bull; <span className="text-[#C9A227]">{active.visaType}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400 font-mono">
                {active.date}
              </span>
              
              {/* Controls */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-slate-700 rounded-full text-slate-300 hover:text-white hover:border-gold hover:bg-white/5 transition-all"
                  aria-label="Previous review"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 border border-slate-700 rounded-full text-slate-300 hover:text-white hover:border-gold hover:bg-white/5 transition-all"
                  aria-label="Next review"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonialsData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
              idx === activeIndex
                ? "bg-[#C9A227] scale-125"
                : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
