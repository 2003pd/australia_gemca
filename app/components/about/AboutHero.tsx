"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const HEADLINE = ["GORAYA", "EDUCATION", "& MIGRATION"];
const SUBHEAD = "CONSULTANT AUSTRALIA";

export default function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const unsub = scrollYProgress.on("change", (v) => setScrollProgress(v));
    return unsub;
  }, [scrollYProgress]);

  const reducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  return (
    <section
      ref={ref}
      id="about-hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#10294D]"
    >
      {/* 3D canvas — right side */}
      <motion.div
        style={reducedMotion ? {} : { y }}
        className="absolute inset-0 w-full h-full"
      >
        <Scene
          scrollProgress={scrollProgress}
          reduced={isMobile}
          className="w-full h-full"
        />
      </motion.div>

      {/* Dark gradient overlay so text reads cleanly */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#10294D] via-[#10294D]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#10294D] via-transparent to-transparent pointer-events-none" />

      {/* Chapter marker */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute top-10 left-8 lg:left-16 flex items-center gap-3"
      >
        <span className="w-8 h-[2px] bg-[#6F9FDC]" />
        <span className="text-[#6F9FDC] text-xs font-bold tracking-[0.25em] uppercase">About Us</span>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={reducedMotion ? {} : { opacity }}
        className="relative z-10 container mx-auto px-8 lg:px-16 max-w-7xl"
      >
        <div className="max-w-3xl">
          {/* Per-word kinetic title */}
          <div className="mb-6 overflow-hidden">
            {HEADLINE.map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.div
                  initial={reducedMotion ? { opacity: 0 } : { y: "110%", opacity: 0 }}
                  animate={reducedMotion ? { opacity: 1 } : { y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.15 * li, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span
                    className="block font-black leading-none tracking-tighter text-white"
                    style={{
                      fontSize: "clamp(3.5rem, 9vw, 8rem)",
                      fontFamily: "var(--font-space-grotesk)",
                    }}
                  >
                    {li === 0 ? (
                      <>
                        <span className="text-white">GOR</span>
                        <span className="text-[#6F9FDC]">AYA</span>
                      </>
                    ) : line}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-[#6F9FDC] text-sm md:text-base font-bold tracking-[0.3em] uppercase mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {SUBHEAD}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left w-24 h-[3px] bg-gradient-to-r from-[#2E5FA3] to-[#6F9FDC] mb-10"
          />

          {/* Descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Over a decade of precision, integrity, and outcomes — guiding thousands from aspiration
            to a new life in Australia.
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-[0.2em] uppercase font-medium">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={20} className="text-[#6F9FDC]" />
        </motion.div>
      </motion.div>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#2E5FA3] to-[#6F9FDC] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </section>
  );
}
