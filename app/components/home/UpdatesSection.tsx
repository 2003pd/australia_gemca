"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const UPDATES = [
  {
    num: "01",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800",
    title: "Student Visa 500: what to prepare",
    desc: "A plain-English guide to course logic, Genuine Student evidence, funds, OSHC and visa-ready documents.",
  },
  {
    num: "02",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800",
    title: "Skilled migration points explained",
    desc: "How age, English, qualifications, work history, skills assessment and nomination can shape 189, 190 and 491 planning.",
  },
  {
    num: "03",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
    title: "Partner visa evidence basics",
    desc: "How relationship timelines, shared commitments, statements and supporting documents make a family pathway clearer.",
  },
];

export default function UpdatesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger rise of updates cards on scroll trigger
      gsap.fromTo(
        ".update-card",
        { opacity: 0, y: 120 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="updates"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F5E9E6] py-32 flex flex-col justify-center overflow-hidden select-none"
    >
      <div className="container mx-auto px-12 lg:px-20 max-w-7xl">
        
        {/* Header */}
        <div className="mb-24 text-left max-w-xl">
          <span className="text-[#2E5FA3] text-[10px] tracking-[0.3em] uppercase font-bold block mb-4">
            Section 08 // Latest Knowledge
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold text-[#1A1A1A] leading-tight tracking-tight uppercase"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            Knowledge &amp;<br />Guides
          </h2>
        </div>

        {/* Updates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {UPDATES.map((item, i) => (
            <div
              key={i}
              className="update-card flex flex-col items-start text-left cursor-pointer group"
            >
              {/* Image with hover zoom */}
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-[#EAE0DC] mb-8">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Number overlay */}
                <div className="absolute top-8 left-8 text-white text-xs font-bold tracking-widest bg-black/35 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {item.num}
                </div>
              </div>

              {/* Title & Desc */}
              <h3
                className="text-[#1A1A1A] text-2xl font-bold uppercase mb-4 group-hover:text-[#2E5FA3] transition-colors leading-tight"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                {item.title}
              </h3>
              
              <p className="text-[#1A1A1A]/60 text-sm leading-relaxed mb-6" style={{ fontFamily: "var(--font-inter)" }}>
                {item.desc}
              </p>

              {/* Action Trigger */}
              <div className="flex items-center gap-2 text-[#2E5FA3] text-[10px] font-bold tracking-widest uppercase mt-auto">
                <span>Read Article</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
