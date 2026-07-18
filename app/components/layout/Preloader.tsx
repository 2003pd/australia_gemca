"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lightfall from "../Lightfall";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2.5 second loading screen for a premium dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A1F44] overflow-hidden"
        >
          {/* Lightfall Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Lightfall
              colors={['#1B4178', '#2E5FA3', '#C9A227']}
              backgroundColor="#050b14"
              speed={1.5}
              streakCount={6}
              streakWidth={1}
              streakLength={1.5}
              glow={1.2}
              density={0.8}
              twinkle={1.5}
              zoom={2}
              backgroundGlow={0.8}
              opacity={1}
              mouseInteraction={false} // Disable mouse interaction on preloader to not block pointer
            />
          </div>

          {/* Logo Animation */}
          <div className="relative z-10 flex flex-col items-center bg-white px-16 py-12 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-[#1a2b49] flex items-end mb-8"
            >
              GEMCA<span className="text-[#d4af37] text-4xl lg:text-5xl mb-2 ml-2">▲</span>
            </motion.div>
            
            {/* Loading Bar Container */}
            <div className="w-64 h-[4px] bg-gray-200 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#d4af37] to-[#f4d46b]"
              />
            </div>
            
            {/* Loading Text */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 text-gray-500 text-xs font-bold tracking-[0.3em] uppercase"
            >
              Preparing Your Future
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
