"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck } from "lucide-react";

const trustIndicators = ["Education Guidance", "Visa Pathways", "Migration Support"];

function AnimatedLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ delay, duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function HeroContent() {
  return (
    <div className="relative z-10 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#C89B24]/35 bg-white/74 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#8f6f14] shadow-[0_16px_60px_rgba(8,31,77,0.07)] backdrop-blur-xl"
      >
        <BadgeCheck size={14} />
        GEMCA Education & Migration
      </motion.div>

      <h1 className="text-4xl font-black uppercase leading-[1.02] tracking-normal text-[#081F4D] sm:text-5xl lg:text-6xl xl:text-[66px]">
        <AnimatedLine delay={0.08}>Your</AnimatedLine>
        <AnimatedLine delay={0.16}>
          <span className="bg-[linear-gradient(110deg,#081F4D_0%,#C89B24_38%,#E3BF62_58%,#081F4D_100%)] bg-[length:220%_100%] bg-clip-text text-transparent [animation:gemca-gold-sheen_4.5s_ease-in-out_infinite]">
            Australian Journey,
          </span>
        </AnimatedLine>
        <AnimatedLine delay={0.24}>Designed With</AnimatedLine>
        <AnimatedLine delay={0.32}>Clarity.</AnimatedLine>
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.46, duration: 0.7, ease: "easeOut" }}
        className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#536079] sm:text-lg"
      >
        Explore education, visa and migration pathways with clear guidance, verified information and expert support at every stage.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.58, duration: 0.7, ease: "easeOut" }}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <Link
          href="mailto:info@gemca.com.au"
          className="group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#081F4D] px-6 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_22px_80px_rgba(8,31,77,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_90px_rgba(200,155,36,0.22)]"
        >
          <span className="absolute inset-0 rounded-full border border-[#C89B24]/0 transition group-hover:border-[#C89B24]/75" />
          Book a Consultation
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/migrate-to-australia"
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#081F4D]/14 bg-white/68 px-6 text-xs font-black uppercase tracking-[0.16em] text-[#081F4D] shadow-[0_16px_60px_rgba(8,31,77,0.08)] backdrop-blur-xl transition hover:border-[#C89B24]/60"
        >
          Explore Pathways
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.72, duration: 0.7, ease: "easeOut" }}
        className="mt-9 grid max-w-xl gap-3 sm:grid-cols-3"
      >
        {trustIndicators.map((item) => (
          <div key={item} className="rounded-2xl border border-[#081F4D]/10 bg-white/68 px-4 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#4b5b73] shadow-sm backdrop-blur-xl">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
