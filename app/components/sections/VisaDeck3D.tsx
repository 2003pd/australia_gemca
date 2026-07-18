"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface VisaCard {
  subclass: string;
  title: string;
  image: string;
  desc: string;
  highlights: string[];
  link: string;
}

const visas: VisaCard[] = [
  {
    subclass: "Subclass 500",
    title: "Student Visa",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
    desc: "Study at top-tier vocational colleges, premium universities, or language institutions across Australia.",
    highlights: [
      "Up to 48 hours per fortnight work rights.",
      "Direct pathway to Post-Study Work Visa (Subclass 485).",
      "Include secondary family members in your application."
    ],
    link: "#book"
  },
  {
    subclass: "Subclass 189",
    title: "Skilled Independent",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600",
    desc: "A points-tested permanent residency visa for highly skilled professionals without state or employer sponsorship.",
    highlights: [
      "Live, work, and study anywhere in Australia permanently.",
      "Access to Medicare (national healthcare scheme).",
      "Eligible to sponsor family members for permanent residency."
    ],
    link: "#book"
  },
  {
    subclass: "Subclass 190",
    title: "Skilled Nominated",
    image: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&q=80&w=600",
    desc: "A state or territory government nominated permanent visa for skilled professionals in local demand.",
    highlights: [
      "Provides 5 additional points toward your GSM points test score.",
      "Access to permanent resident status upon entry.",
      "Broadened occupation lists specific to state requirements."
    ],
    link: "#book"
  },
  {
    subclass: "Subclass 485",
    title: "Temporary Graduate",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600",
    desc: "Stay, work, and travel in Australia after completing your degree at an Australian educational institution.",
    highlights: [
      "Full-time unrestricted work rights across all industries.",
      "1.5 to 4 years stay duration based on qualification level.",
      "Critical bridge pathway to permanent residency."
    ],
    link: "#book"
  },
  {
    subclass: "Subclass 820/801",
    title: "Partner Visa",
    image: "https://images.unsplash.com/photo-1464998857633-50e59fbf2fe6?auto=format&fit=crop&q=80&w=600",
    desc: "Stay in Australia if you are the spouse or de facto partner of an Australian citizen or permanent resident.",
    highlights: [
      "Full study and work rights while holding the temporary visa.",
      "Eligible for immediate Medicare enrollment.",
      "Direct conversion to Permanent Residence (Subclass 801)."
    ],
    link: "#book"
  }
];

export default function VisaDeck3D() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sectionHovered, setSectionHovered] = useState(false);

  return (
    <section className="relative w-full py-16 bg-[#050b14] overflow-hidden">
      
      {/* Abstract Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Background Accent glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2E5FA3]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Giant Background Word Outline */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[85%] md:-translate-y-[80%] pointer-events-none select-none uppercase z-0 w-full text-center">
        <h2 className="text-[14vw] font-black tracking-tighter text-white/50 select-none leading-none" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          GEMCA
        </h2>
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h4 className="text-[#d4af37] font-bold tracking-widest text-sm uppercase mb-3 flex items-center justify-center gap-2">
            <div className="w-8 h-[1px] bg-[#d4af37]"></div>
            Visa Classes
            <div className="w-8 h-[1px] bg-[#d4af37]"></div>
          </h4>
          <h2 className="text-4xl font-bold text-white leading-tight">
            Explore Your Immigration Pathways
          </h2>
        </div>

        {/* 3D Card Stack Container */}
        <div 
          onMouseEnter={() => setSectionHovered(true)}
          onMouseLeave={() => {
            setSectionHovered(false);
            setHoveredIndex(null);
          }}
          className="w-full max-w-3xl mx-auto h-[260px] sm:h-[340px] md:h-[400px] relative flex items-center justify-center mb-14"
        >
          {visas.map((visa, i) => {
            // Symmetrical placements
            let baseAngle = 0;
            let baseX = 0;
            let baseZ = 30;

            if (i === 0) { baseAngle = -20; baseX = -180; baseZ = 10; }
            else if (i === 1) { baseAngle = -10; baseX = -90; baseZ = 20; }
            else if (i === 2) { baseAngle = 0; baseX = 0; baseZ = 30; }
            else if (i === 3) { baseAngle = 10; baseX = 90; baseZ = 20; }
            else if (i === 4) { baseAngle = 20; baseX = 180; baseZ = 10; }

            // Wider fanned positions on container hover
            let fanX = baseX;
            let fanAngle = baseAngle;
            if (sectionHovered) {
              if (i === 0) { fanAngle = -30; fanX = -260; }
              else if (i === 1) { fanAngle = -15; fanX = -130; }
              else if (i === 3) { fanAngle = 15; fanX = 130; }
              else if (i === 4) { fanAngle = 30; fanX = 260; }
            }

            const isHovered = hoveredIndex === i;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <motion.div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                style={{ zIndex: isHovered ? 50 : baseZ }}
                animate={{
                  x: isHovered ? 0 : fanX,
                  y: isHovered ? -50 : 0,
                  rotate: isHovered ? 0 : fanAngle,
                  scale: isHovered ? 1.08 : (isAnyHovered ? 0.9 : 1),
                  opacity: isHovered ? 1 : (isAnyHovered ? 0.35 : 1)
                }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                className="absolute w-36 h-48 sm:w-44 sm:h-60 md:w-56 md:h-76 rounded-2xl border border-white/10 shadow-2xl overflow-hidden cursor-pointer origin-bottom bg-[#0d1726]"
              >
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/25 z-10" />
                <img 
                  src={visa.image} 
                  alt={visa.title} 
                  className="w-full h-full object-cover"
                />
                
                {/* Content inside Card */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20 flex flex-col justify-end text-left h-full">
                  <div className="text-[9px] sm:text-[10px] font-bold text-[#d4af37] uppercase tracking-wider mb-0.5">
                    {visa.subclass}
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight leading-tight">
                    {visa.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
