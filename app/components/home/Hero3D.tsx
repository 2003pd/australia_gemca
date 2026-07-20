"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MouseEvent } from "react";
import { useRef, useState } from "react";

const brandLines = ["Goraya Education & Migration", "Consultant Australia"];
const australiaHeroImage =
  "https://images.unsplash.com/photo-1526958977630-bc61b30a2009?fm=jpg&q=85&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF1c3RyYWxpYXxlbnwwfHwwfHx8MA%3D%3D";

export default function Hero3D() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lens, setLens] = useState({ x: 50, y: 50, visible: false });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const handleImageMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setLens({ x, y, visible: true });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[#0a0a0f] px-5 pb-10 pt-6 text-white sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_48%,rgba(139,92,246,0.24),transparent_34%),radial-gradient(circle_at_84%_34%,rgba(236,72,153,0.18),transparent_28%),radial-gradient(circle_at_58%_76%,rgba(59,130,246,0.18),transparent_32%),linear-gradient(180deg,#0a0a0f,#08080d)]" />
      <div className="hero3d-mesh pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.62)_78%)]" />

      <motion.div style={{ scale: heroScale }} className="relative z-10 mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl gap-8 pt-24 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <motion.div style={{ opacity: textOpacity }} className="relative z-20 max-w-3xl pt-12 lg:pt-0">
          <h1 className="max-w-4xl font-serif text-4xl font-semibold italic uppercase leading-[1.04] tracking-normal text-white sm:text-5xl lg:text-6xl xl:text-[68px]">
            {brandLines.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <span
                  className="brand-drop-line block"
                  style={{ animationDelay: `${index * 0.16}s` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/58 sm:text-lg"
          >
            Education, visa and migration guidance anchored in Australia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="mailto:info@gemca.com.au" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#3b82f6] px-7 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_24px_80px_rgba(236,72,153,0.28)] transition hover:-translate-y-0.5">
              Book Free Consultation
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </Link>
            <Link href="/service" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/18 bg-white/[0.04] px-7 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#8b5cf6]">
              Explore Services
              <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 42, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.38, duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleImageMouseMove}
          onMouseLeave={() => setLens((current) => ({ ...current, visible: false }))}
          className="relative min-h-[300px] cursor-auto overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_34px_120px_rgba(0,0,0,0.36)] backdrop-blur-xl sm:min-h-[420px] lg:min-h-[520px] lg:cursor-none"
        >
          <div
            className="absolute inset-0 scale-[1.03] bg-cover bg-center"
            style={{ backgroundImage: `url("${australiaHeroImage}")` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,15,0.26),rgba(10,10,15,0.05)),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(10,10,15,0.38))]" />
          <motion.div
            aria-hidden="true"
            animate={{ opacity: lens.visible ? 1 : 0, scale: lens.visible ? 1 : 0.82 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="pointer-events-none absolute h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/45 bg-cover shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_20px_70px_rgba(0,0,0,0.45),inset_0_0_24px_rgba(255,255,255,0.28)] backdrop-blur-sm"
            style={{
              left: `${lens.x}%`,
              top: `${lens.y}%`,
              backgroundImage: `url("${australiaHeroImage}")`,
              backgroundPosition: `${lens.x}% ${lens.y}%`,
              backgroundSize: "190% 190%",
            }}
          />
        </motion.div>
      </motion.div>

      <style jsx global>{`
        @keyframes hero3d-mesh {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-1.2%, 1.4%, 0) scale(1.04);
          }
        }

        @keyframes brand-drop-line {
          0% {
            opacity: 0;
            filter: blur(16px);
            transform: translateY(-115%);
          }
          14%,
          84% {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(110%);
          }
        }

        .hero3d-mesh {
          background:
            radial-gradient(circle at 20% 18%, rgba(139, 92, 246, 0.18), transparent 28%),
            radial-gradient(circle at 74% 54%, rgba(236, 72, 153, 0.18), transparent 32%),
            radial-gradient(circle at 88% 24%, rgba(59, 130, 246, 0.16), transparent 30%);
          animation: hero3d-mesh 14s ease-in-out infinite;
          will-change: transform;
        }

        .brand-drop-line {
          animation: brand-drop-line 5s cubic-bezier(0.18, 0.9, 0.22, 1.12) infinite both;
          will-change: transform, opacity, filter;
        }
      `}</style>
    </section>
  );
}
