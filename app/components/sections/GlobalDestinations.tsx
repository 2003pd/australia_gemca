"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Premium3DIcon from "../ui/Premium3DIcon";

const destinations = [
  {
    name: "SYDNEY",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=1200",
    desc: "The harbor city offering world-class universities and thriving tech industries."
  },
  {
    name: "MELBOURNE",
    image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&q=80&w=1200",
    desc: "Australia's cultural and educational capital, perfect for students."
  },
  {
    name: "BRISBANE",
    image: "https://images.unsplash.com/photo-1549603099-1bd24dd0df97?auto=format&fit=crop&q=80&w=1200",
    desc: "The sunny state capital, rapidly growing with excellent migration pathways."
  },
  {
    name: "PERTH",
    image: "https://images.unsplash.com/photo-1580554529328-912df0dbfcd1?auto=format&fit=crop&q=80&w=1200",
    desc: "A gateway to the west, offering high wages and regional visa opportunities."
  }
];

export default function GlobalDestinations() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="destinations" className="w-full py-24 bg-transparent   overflow-hidden transition-colors duration-500">
      
      {/* Background Image Reveal */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            key={hoveredIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <img 
              src={destinations[hoveredIndex].image} 
              alt={destinations[hoveredIndex].name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-[#050b14]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h4 className="text-[#d4af37] font-bold tracking-widest text-sm uppercase mb-3 flex items-center gap-2">
            <div className="w-8 h-[1px] bg-[#d4af37]"></div>
            Where We Take You
          </h4>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a2b49] dark:text-white max-w-2xl leading-tight">
            Explore your possibilities across Australia&apos;s premier cities.
          </h2>
        </motion.div>

        <div className="flex flex-col w-full border-t border-white/10">
          {destinations.map((dest, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 border-b border-white/10 cursor-pointer"
            >
              {/* City Name */}
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-400 dark:text-white/50 group-hover:text-[#1a2b49] dark:text-white transition-all duration-500 tracking-tighter" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {dest.name}
              </h3>
              
              {/* Description & Icon */}
              <div className="flex items-center gap-8 mt-6 md:mt-0 opacity-0 md:-translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                <p className="text-white bg-black/90 dark:bg-black/85 px-5 py-3 rounded-xl max-w-sm text-base hidden lg:block font-medium shadow-lg backdrop-blur-md border border-white/10">
                  {dest.desc}
                </p>
                <Premium3DIcon Icon={ArrowUpRight} size="lg" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
