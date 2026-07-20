"use client";

import { useEffect, useState } from "react";
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
  const [isDesktopDeck, setIsDesktopDeck] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktopDeck(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#050b14] py-16 lg:py-16">
      
      {/* Abstract Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      
      {/* Background Accent glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#2E5FA3]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Giant Background Word Outline */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-[62%] select-none text-center uppercase sm:-translate-y-[70%] lg:-translate-y-[80%]">
        <h2 className="select-none text-[22vw] font-black leading-none tracking-normal text-white/10 sm:text-[18vw] lg:text-[14vw] lg:text-white/50 lg:tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          GEMCA
        </h2>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10 text-center sm:mb-14 lg:mb-16">
          <h4 className="mb-3 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-[#d4af37]">
            <div className="h-px w-8 bg-[#d4af37]"></div>
            Visa Classes
            <div className="h-px w-8 bg-[#d4af37]"></div>
          </h4>
          <h2 className="mx-auto max-w-xl text-4xl font-bold leading-tight tracking-normal text-white lg:max-w-none">
            Explore Your Immigration Pathways
          </h2>
        </div>

        {/* 3D Card Stack Container */}
        <div 
          onMouseEnter={() => isDesktopDeck && setSectionHovered(true)}
          onMouseLeave={() => {
            setSectionHovered(false);
            setHoveredIndex(null);
          }}
          className="relative mx-auto mb-8 grid w-full max-w-md grid-cols-1 gap-5 sm:max-w-2xl sm:grid-cols-2 lg:mb-14 lg:flex lg:h-[400px] lg:max-w-3xl lg:items-center lg:justify-center"
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
            const cardMotion = isDesktopDeck
              ? {
                  x: isHovered ? 0 : fanX,
                  y: isHovered ? -50 : 0,
                  rotate: isHovered ? 0 : fanAngle,
                  scale: isHovered ? 1.08 : (isAnyHovered ? 0.9 : 1),
                  opacity: isHovered ? 1 : (isAnyHovered ? 0.35 : 1)
                }
              : {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: 1
                };

            return (
              <motion.div
                key={i}
                onMouseEnter={() => isDesktopDeck && setHoveredIndex(i)}
                style={{ zIndex: isHovered ? 50 : baseZ }}
                initial={{ opacity: 0, y: 36, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.28 }}
                animate={cardMotion}
                transition={{ type: "spring", stiffness: 150, damping: 18, delay: isDesktopDeck ? 0 : i * 0.06 }}
                className="relative h-[18rem] w-full origin-bottom cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#0d1726] shadow-2xl sm:h-[19rem] lg:absolute lg:h-76 lg:w-56"
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
