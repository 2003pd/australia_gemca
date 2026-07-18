"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    num: "01",
    title: "Student Visa 500",
    src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800",
    desc: "Course, CoE, OSHC, Genuine Student and financial-capacity guidance in one pathway.",
    offsetY: "mt-0",
  },
  {
    num: "02",
    title: "Skilled 189",
    src: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=800",
    desc: "Independent skilled migration planning for eligible occupations and competitive points profiles.",
    offsetY: "mt-12",
  },
  {
    num: "03",
    title: "Employer 482",
    src: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=800",
    desc: "Skills in Demand planning, role alignment, sponsorship obligations and nomination documents.",
    offsetY: "mt-4",
  },
  {
    num: "04",
    title: "Partner Visa",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800",
    desc: "Onshore and offshore partner pathways supported by relationship evidence and clear timelines.",
    offsetY: "mt-16",
  },
];

export default function HorizontalSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      // Pin and slide horizontally
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Horizontal track translation
      tl.to(track, {
        x: -totalScrollWidth,
        ease: "none",
      }, 0);

      // Large background watermark letters move at a slower parallax rate
      tl.fromTo(
        titleBgRef.current,
        { x: 100 },
        { x: -300, ease: "none" },
        0
      );

      // Add dynamic 3D rotation shifts to the cards during transition
      gsap.utils.toArray(".horizontal-card").forEach((card: any) => {
        tl.fromTo(
          card,
          { rotateY: 15, scale: 0.95 },
          { rotateY: -15, scale: 1.02, ease: "none" },
          0
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="horizontal"
      ref={containerRef}
      className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden flex items-center select-none"
    >
      {/* Huge Background Watermark Typography */}
      <div
        ref={titleBgRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 text-[24vw] font-black text-white/5 tracking-tighter leading-none uppercase pointer-events-none z-0 whitespace-nowrap"
        style={{ fontFamily: "var(--font-serif, serif)" }}
      >
        Visa Knowledge Library
      </div>

      {/* Horizontal Slider Track */}
      <div
        ref={trackRef}
        className="relative z-10 flex gap-12 px-24 items-center h-[70vh] w-max"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        {/* Intro Block Card */}
        <div className="w-[30vw] max-w-[400px] flex flex-col justify-center text-left shrink-0 pr-8">
          <span className="text-[#F5E9E6] text-[10px] tracking-[0.3em] uppercase font-bold block mb-4">
            Section 05 // Visa Categories
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white uppercase leading-none mb-6"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            Visa<br />Pathways
          </h2>
          <p className="text-white/50 text-sm leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            Explore key Australian visa pathways with plain-English summaries and clear next steps.
          </p>
        </div>

        {/* Cards mapping */}
        {CARDS.map((card, i) => (
          <div
            key={i}
            className={`horizontal-card shrink-0 w-[24vw] max-w-[320px] aspect-[3/4] bg-white/[0.03] backdrop-blur-md rounded-[2rem] border border-white/10 p-6 flex flex-col justify-between shadow-2xl transition-all duration-75 ${card.offsetY}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-white/40">
              <div>CLASS {card.num}</div>
              <div>GEMCA // SYSTEM</div>
            </div>

            {/* Floating Image */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-[#2A2A2A] my-4">
              <img
                src={card.src}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-left mt-auto">
              <h3
                className="text-white text-lg font-bold uppercase mb-2"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                {card.title}
              </h3>
              <p className="text-white/40 text-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
