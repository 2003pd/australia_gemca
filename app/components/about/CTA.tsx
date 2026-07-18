"use client";

import { motion } from "motion/react";
import { Award, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import Premium3DIcon from "../ui/Premium3DIcon";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const WORDS = ["Ready to Start", "Your Australian", "Chapter?"];

export default function CTA() {
  const reducedMotion = typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  return (
    <section
      id="about-cta"
      className="relative w-full py-28 lg:py-36 bg-[#10294D] overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(46,95,163,0.35)_0%,transparent_70%)] pointer-events-none" />

      {/* 3D scene — decorative background */}
      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-25 pointer-events-none hidden lg:block">
        <Scene reduced className="w-full h-full" />
      </div>

      {/* Thin top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2E5FA3] to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 max-w-4xl relative z-10 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          className="mb-8 inline-flex items-center justify-center"
        >
          <Premium3DIcon Icon={Award} size="lg" />
        </motion.div>

        {/* Chapter marker */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="w-8 h-[2px] bg-[#6F9FDC]/50" />
          <span className="text-[#6F9FDC] text-xs font-bold tracking-[0.3em] uppercase">Let&apos;s Begin</span>
          <span className="w-8 h-[2px] bg-[#6F9FDC]/50" />
        </motion.div>

        {/* Word-by-word headline */}
        <div className="mb-8">
          {WORDS.map((line, li) => (
            <div key={li} className="overflow-hidden">
              <motion.div
                initial={reducedMotion ? { opacity: 0 } : { y: "110%" }}
                whileInView={reducedMotion ? { opacity: 1 } : { y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * li, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="block font-black leading-tight text-white"
                  style={{
                    fontSize: "clamp(2.5rem, 6vw, 5rem)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  {li === 1 ? <span className="text-[#6F9FDC]">{line}</span> : line}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white/50 text-lg mb-12 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Book a free consultation with a MARA-registered agent. No obligation — just expert clarity
          on your pathway to Australia.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            className="group flex items-center gap-2 px-8 py-4 bg-[#d4af37] hover:bg-[#c49b2a] text-[#10294D] font-black rounded-xl transition-all duration-300 text-sm tracking-wide shadow-xl shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Book Free Consultation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            className="px-8 py-4 border-2 border-[#2E5FA3] hover:border-[#6F9FDC] text-white hover:text-[#6F9FDC] font-semibold rounded-xl transition-all duration-300 text-sm tracking-wide"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Explore Our Services
          </button>
        </motion.div>

        {/* Trust badge row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-8 text-white/30 text-xs font-medium tracking-widest uppercase"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {["MARA Registered", "12+ Years Experience", "2,500+ Visas Granted", "98% Success Rate"].map((tag, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#2E5FA3]" />
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2E5FA3] to-transparent" />
    </section>
  );
}
