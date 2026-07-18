"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import dynamic from "next/dynamic";

const StatsScene = dynamic(() => import("./StatsScene"), { ssr: false });

const STATS = [
  { value: 2500, suffix: "+", label: "Visas Granted", desc: "Across all major visa subclasses" },
  { value: 98, suffix: "%", label: "Success Rate", desc: "Client outcomes above industry average" },
  { value: 12, suffix: "+", label: "Years of Practice", desc: "Deep regulatory experience" },
  { value: 40, suffix: "+", label: "Countries Served", desc: "Globally connected, locally present" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setCount(target); return; }
    const dur = 1800;
    const fps = 60;
    const steps = dur / (1000 / fps);
    const inc = target / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(cur));
    }, 1000 / fps);
    return () => clearInterval(timer);
  }, [active, target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="about-stats"
      className="relative w-full py-28 overflow-hidden bg-[#2E5FA3]"
    >
      {/* 3D floating shapes canvas — absolute background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <StatsScene />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Radial glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,159,220,0.25)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-white/50" />
            <span className="text-white/60 text-xs font-bold tracking-[0.3em] uppercase">By the Numbers</span>
            <span className="w-8 h-[2px] bg-white/50" />
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black text-white leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            A Track Record That<br />Speaks for Itself
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="text-center group"
            >
              {/* Number */}
              <div
                className="text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums leading-none"
                style={{ fontFamily: "var(--font-space-grotesk)", textShadow: "0 0 40px rgba(111,159,220,0.5)" }}
              >
                <CountUp target={s.value} suffix={s.suffix} active={inView} />
              </div>

              {/* Label */}
              <div className="text-white font-bold text-sm mb-1 tracking-wide">{s.label}</div>

              {/* Desc */}
              <div className="text-white/50 text-xs leading-relaxed max-w-[140px] mx-auto">{s.desc}</div>

              {/* Underline accent */}
              <div className="mt-4 mx-auto w-8 h-[2px] bg-white/30 group-hover:w-16 group-hover:bg-white/70 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
