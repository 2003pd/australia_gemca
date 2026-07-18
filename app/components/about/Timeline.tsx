"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const MILESTONES = [
  {
    year: "2012",
    title: "Founded in Melbourne",
    desc: "GEMCA was established by Ansar Goraya — a MARA-registered migration agent — with one founding belief: every person deserves honest, expert guidance.",
    side: "left",
  },
  {
    year: "2016",
    title: "Education Pathways Division",
    desc: "We launched our dedicated student visa and university placement arm, partnering with top Australian institutions to open doors for international scholars.",
    side: "right",
  },
  {
    year: "2019",
    title: "Regional Expansion",
    desc: "Strategic offices opened in Lahore and Delhi — bringing our MARA-registered expertise directly to clients across South Asia.",
    side: "left",
  },
  {
    year: "2023",
    title: "1,000 Skilled Visas",
    desc: "A landmark milestone: over 1,000 successful skilled migration outcomes achieved, cementing our position as a national leader in the space.",
    side: "right",
  },
  {
    year: "2025",
    title: "GEMCA Digital",
    desc: "Our fully digital consultation platform launched — bringing premium migration advice to any device, anywhere in the world, in real time.",
    side: "left",
  },
];

const PATH_HEIGHT = 120; // px between milestones

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  // Drive SVG strokeDashoffset with scroll
  useEffect(() => {
    if (!pathRef.current) return;
    const totalLength = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = `${totalLength}`;
    pathRef.current.style.strokeDashoffset = `${totalLength}`;

    const unsub = scrollYProgress.on("change", (v) => {
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = `${totalLength * (1 - v)}`;
      }
    });
    return unsub;
  }, [scrollYProgress]);

  const totalH = (MILESTONES.length - 1) * PATH_HEIGHT;

  return (
    <section
      ref={sectionRef}
      id="about-timeline"
      className="relative w-full py-28 lg:py-36 bg-[#EEF3FA] dark:bg-[#070f1f] overflow-hidden transition-colors duration-500"
    >
      {/* Bg watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-[#2E5FA3]/5 select-none pointer-events-none whitespace-nowrap"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        JOURNEY
      </div>

      <div className="container mx-auto px-6 lg:px-16 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#2E5FA3]" />
            <span className="text-[#2E5FA3] text-xs font-bold tracking-[0.3em] uppercase">Our Journey</span>
            <span className="w-8 h-[2px] bg-[#2E5FA3]" />
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black text-[#10294D] dark:text-white leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            A Decade of<br />
            <span className="text-[#2E5FA3]">Impact & Growth</span>
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* SVG path spine — desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]">
            <svg
              width="4"
              height="100%"
              viewBox={`0 0 4 ${totalH + 100}`}
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              {/* Background track */}
              <path
                d={`M2,0 C2,${totalH * 0.25} 2,${totalH * 0.5} 2,${totalH + 100}`}
                fill="none"
                stroke="#2E5FA3"
                strokeWidth="2"
                strokeOpacity="0.12"
              />
              {/* Animated fill */}
              <path
                ref={pathRef}
                d={`M2,0 C2,${totalH * 0.25} 2,${totalH * 0.5} 2,${totalH + 100}`}
                fill="none"
                stroke="#2E5FA3"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 0.08s linear" }}
              />
            </svg>
          </div>

          {/* Mobile vertical line */}
          <div className="lg:hidden absolute left-6 top-0 bottom-0 w-[2px] bg-[#2E5FA3]/20" />

          {/* Milestone items */}
          {MILESTONES.map((m, i) => {
            const isLeft = m.side === "left";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-center mb-16 last:mb-0 ${isLeft ? "lg:flex-row-reverse" : "lg:flex-row"}`}
              >
                {/* Spacer */}
                <div className="hidden lg:block w-5/12" />

                {/* Spine node */}
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.05, type: "spring", bounce: 0.5 }}
                    className="w-12 h-12 rounded-full bg-[#2E5FA3] border-4 border-[#EEF3FA] dark:border-[#070f1f] flex items-center justify-center shadow-lg shadow-[#2E5FA3]/30"
                  >
                    <span
                      className="text-white text-[10px] font-black"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {m.year.slice(2)}
                    </span>
                  </motion.div>
                </div>

                {/* Card */}
                <div className="w-[calc(100%-64px)] ml-16 lg:ml-0 lg:w-5/12 group">
                  <div
                    className="relative bg-white dark:bg-[#0D1F3C] border border-[#2E5FA3]/10 dark:border-[#2E5FA3]/20 rounded-2xl p-7 shadow-md hover:shadow-xl hover:border-[#2E5FA3]/40 transition-all duration-400 cursor-default"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    {/* Year badge */}
                    <span
                      className="inline-block text-[10px] font-black text-white bg-[#2E5FA3] px-3 py-1 rounded-full mb-4 tracking-widest"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {m.year}
                    </span>

                    <h3
                      className="text-[#10294D] dark:text-white font-black text-lg mb-3"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {m.title}
                    </h3>
                    <p
                      className="text-gray-600 dark:text-white/50 text-sm leading-relaxed"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {m.desc}
                    </p>

                    {/* Hover accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl bg-gradient-to-r from-[#2E5FA3] to-[#6F9FDC] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
