"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Globe, Heart } from "lucide-react";

const PILLARS = [
  {
    icon: ShieldCheck,
    tag: "Integrity",
    heading: "Registered & Fully Compliant",
    body: "Every case is handled exclusively by MARA-registered agents — licensed, accountable, and operating under Australia's strictest legal and ethical frameworks.",
    accent: "#2E5FA3",
  },
  {
    icon: Globe,
    tag: "Reach",
    heading: "Global Network, Local Expertise",
    body: "Offices in Melbourne, Lahore, and Delhi bridge two hemispheres. Clients in 40+ countries trust our on-ground knowledge to navigate complex bilateral migration pathways.",
    accent: "#6F9FDC",
  },
  {
    icon: Heart,
    tag: "Philosophy",
    heading: "People Before Paperwork",
    body: "Migration is one of the most significant decisions of a person's life. We honor that weight — with empathy, transparency, and an unwavering commitment to your individual outcome.",
    accent: "#7FA8E0",
  },
];

function GlassCard({ pillar, i }: { pillar: typeof PILLARS[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    const glare = glareRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    const rotX = (y - 0.5) * -20;
    const rotY = (x - 0.5) * 20;
    el.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
    if (glare) {
      glare.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(111,159,220,0.25) 0%, transparent 60%)`;
    }
  };

  const handleLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    if (glareRef.current) glareRef.current.style.background = "none";
  };

  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="relative rounded-2xl p-8 cursor-default group overflow-hidden h-full"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(111,159,220,0.15)",
          transition: "transform 0.2s ease-out, box-shadow 0.3s ease",
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: "0 8px 32px rgba(16,41,77,0.5)",
        }}
      >
        {/* Mouse-reactive glare layer */}
        <div
          ref={glareRef}
          className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-100"
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(to right, ${pillar.accent}, transparent)` }} />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-7 relative"
          style={{
            background: `linear-gradient(135deg, ${pillar.accent}30, ${pillar.accent}10)`,
            border: `1px solid ${pillar.accent}40`,
          }}
        >
          <Icon size={26} style={{ color: pillar.accent }} />
          <div
            className="absolute -inset-2 rounded-xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
            style={{ background: pillar.accent }}
          />
        </div>

        {/* Tag */}
        <span
          className="text-[10px] font-black tracking-[0.3em] uppercase mb-3 block"
          style={{ color: pillar.accent }}
        >
          {pillar.tag}
        </span>

        {/* Heading */}
        <h3
          className="text-white text-xl font-black mb-4 leading-snug"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {pillar.heading}
        </h3>

        {/* Body */}
        <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
          {pillar.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function Pillars() {
  return (
    <section
      id="about-pillars"
      className="relative w-full py-28 lg:py-36 bg-[#0D1F3C] overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(46,95,163,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(46,95,163,0.06)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      {/* Large bg text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-[#2E5FA3]/5 select-none pointer-events-none whitespace-nowrap"
        style={{ fontFamily: "var(--font-space-grotesk)" }}>
        VALUES
      </div>

      <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[2px] bg-[#6F9FDC]" />
            <span className="text-[#6F9FDC] text-xs font-bold tracking-[0.3em] uppercase">Our Pillars</span>
          </div>
          <h2
            className="text-4xl lg:text-6xl font-black text-white leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            The Values That<br />
            <span className="text-[#6F9FDC]">Drive Every Decision</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((p, i) => (
            <GlassCard key={i} pillar={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
