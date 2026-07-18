"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    num: "01",
    label: "Our Origin",
    heading: "Built on Integrity",
    body: "GEMCA was founded in Melbourne in 2012 by Ansar Goraya — a MARA-registered agent who believed that every person, regardless of background, deserves honest, expert guidance on their path to Australia.",
  },
  {
    num: "02",
    label: "Our Mission",
    heading: "Precision Meets Purpose",
    body: "We don't just file visa applications. We architect life-changing journeys — combining deep regulatory knowledge with a genuine commitment to every client's outcome, from first consultation to final grant.",
  },
  {
    num: "03",
    label: "Our Reach",
    heading: "Global Network, Local Heart",
    body: "With offices spanning Australia, Pakistan, and India, and clients across 40+ countries, GEMCA brings world-class migration expertise to your doorstep — in your language, in your timezone.",
  },
];

export default function StoryScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;

    // Integrate ScrollTrigger with Lenis
    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      const total = CHAPTERS.length;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${total * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);
          setActiveChapter(Math.min(Math.floor(p * total), total - 1));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const dialRotation = progress * 360;

  return (
    <section
      ref={sectionRef}
      id="about-story"
      className="relative w-full bg-[#0A1E3D] overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div ref={stickyRef} className="relative w-full h-full flex items-center">

        {/* Left: visual column */}
        <div className="relative w-full lg:w-1/2 h-full flex items-center justify-center">
          {/* Spinning dial */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-[420px] h-[420px] rounded-full border border-[#2E5FA3]/20"
              style={{ transform: `rotate(${dialRotation}deg)`, transition: "transform 0.1s linear" }}
            >
              {/* Tick marks */}
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
                  style={{ height: "100%", transform: `translateX(-50%) rotate(${i * 10}deg)` }}
                >
                  <div className={`mx-auto ${i % 3 === 0 ? "w-[2px] h-4 bg-[#2E5FA3]/60" : "w-px h-2 bg-[#2E5FA3]/25"}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Chapter number — large bg */}
          <motion.div
            key={activeChapter}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-[18vw] lg:text-[12vw] font-black text-[#2E5FA3]/10 select-none pointer-events-none absolute"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {CHAPTERS[activeChapter].num}
          </motion.div>

          {/* Chapter label */}
          <div className="relative z-10 text-center">
            <motion.div
              key={`label-${activeChapter}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#6F9FDC] text-xs font-bold tracking-[0.3em] uppercase mb-3"
            >
              {CHAPTERS[activeChapter].label}
            </motion.div>

            {/* Progress ring */}
            <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto">
              <circle cx="40" cy="40" r="34" fill="none" stroke="#2E5FA3" strokeWidth="1" opacity="0.2" />
              <circle
                cx="40" cy="40" r="34"
                fill="none" stroke="#6F9FDC" strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress)}`}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
                style={{ transition: "stroke-dashoffset 0.1s linear" }}
              />
              <text x="40" y="45" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="700" fontFamily="var(--font-space-grotesk)">
                {Math.round(progress * 100)}%
              </text>
            </svg>
          </div>

          {/* Chapter dots */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
            {CHAPTERS.map((_, i) => (
              <div
                key={i}
                className="transition-all duration-500 rounded-full"
                style={{
                  width: i === activeChapter ? "28px" : "8px",
                  height: "8px",
                  background: i === activeChapter ? "#6F9FDC" : "#2E5FA3",
                  opacity: i === activeChapter ? 1 : 0.4,
                }}
              />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-2/3 bg-gradient-to-b from-transparent via-[#2E5FA3]/40 to-transparent" />

        {/* Right: text column */}
        <div className="w-full lg:w-1/2 h-full flex items-center px-10 lg:px-16">
          <motion.div
            key={`text-${activeChapter}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#2E5FA3] text-4xl font-black" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {CHAPTERS[activeChapter].num}
              </span>
              <span className="w-10 h-[2px] bg-[#6F9FDC]" />
              <span className="text-[#6F9FDC] text-xs font-bold tracking-[0.25em] uppercase">
                {CHAPTERS[activeChapter].label}
              </span>
            </div>

            <h2
              className="text-4xl lg:text-5xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {CHAPTERS[activeChapter].heading}
            </h2>

            <p className="text-white/60 text-lg leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              {CHAPTERS[activeChapter].body}
            </p>

            <div className="mt-10 flex items-center gap-3 text-[#6F9FDC] text-sm font-bold tracking-widest uppercase">
              <span>{String(activeChapter + 1).padStart(2, "0")}</span>
              <div className="flex-1 h-px bg-[#2E5FA3]/40" />
              <span>{String(CHAPTERS.length).padStart(2, "0")}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
