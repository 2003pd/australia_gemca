"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function HomePreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Elegant frame-rate based progress counter (2.5 seconds total)
    const duration = 2200;
    const start = performance.now();

    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setPercent(Math.floor(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    requestAnimationFrame(update);
  }, []);

  const logoLetters = ["G", "E", "M", "C", "A"];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="home-preloader"
          className="fixed inset-0 w-full h-screen z-[99999] overflow-hidden select-none flex items-center justify-center bg-[#FAF6F0]"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          {/* Top Curtain Slide Up */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#FAF6F0] z-10 border-b border-[#FAF6F0]/20"
          />

          {/* Bottom Curtain Slide Down */}
          <motion.div
            initial={{ y: "0%" }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#FAF6F0] z-10 border-t border-[#FAF6F0]/20"
          />

          {/* Loader Elements Container (centered) */}
          <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
            
            {/* Subtle Grid Backdrop */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

            {/* Giant Outlined Counter Background */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-black/[0.03] select-none pointer-events-none tracking-tighter leading-none"
              style={{ fontFamily: "var(--font-serif, serif)", WebkitTextStroke: "1px rgba(0,0,0,0.04)" }}
            >
              {String(percent).padStart(3, "0")}
            </div>

            {/* Staggered Title Reveal */}
            <div className="relative flex flex-col items-center mb-8">
              <div className="flex gap-3 overflow-hidden">
                {logoLetters.map((letter, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.span
                      initial={{ y: "110%", rotate: 10 }}
                      animate={{ y: "0%", rotate: 0 }}
                      transition={{
                        delay: 0.08 * i,
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="block text-6xl md:text-8xl font-bold tracking-tight text-[#1A1A1A] uppercase"
                      style={{ fontFamily: "var(--font-serif, serif)" }}
                    >
                      {letter}
                    </motion.span>
                  </div>
                ))}
              </div>

              {/* Expanding Horizontal Gold Line Underneath */}
              <div className="w-[180px] h-[1.5px] bg-[#EAE0DC] mt-4 relative overflow-hidden rounded-full">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#d4af37] transition-all duration-75"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Interactive Loading Label */}
            <div className="flex flex-col items-center gap-2 mt-4 text-[#1A1A1A]/40 text-[9px] tracking-[0.4em] uppercase font-bold">
              <span>Loading Knowledge Platform</span>
              <span className="font-mono tabular-nums text-[8px] text-[#2E5FA3] opacity-80">{percent}%</span>
            </div>

          </div>

          {/* Coordinates overlay details */}
          <div className="absolute bottom-8 left-12 z-20 text-[#1A1A1A]/30 text-[9px] tracking-[0.25em] uppercase font-bold">
            Education // Migration // GEMCA
          </div>
          <div className="absolute bottom-8 right-12 z-20 text-[#1A1A1A]/30 text-[9px] tracking-[0.25em] uppercase font-bold">
            LAT -37.8136 // LON 144.9631
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
