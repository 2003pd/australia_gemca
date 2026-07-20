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
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
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
      });

      media.add("(max-width: 1023px)", () => {
        gsap.set(track, { clearProps: "transform" });
        gsap.set(titleBgRef.current, { clearProps: "transform" });
        gsap.fromTo(
          titleBgRef.current,
          { x: 36, opacity: 0 },
          {
            x: -36,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          ".horizontal-card",
          { opacity: 0, y: 46, rotateY: 8, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: track,
              start: "top 82%",
            },
          }
        );
      });

      return () => media.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="horizontal"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#1A1A1A] px-5 py-20 select-none sm:px-6 lg:h-screen lg:px-0 lg:py-0"
    >
      {/* Huge Background Watermark Typography */}
      <div
        ref={titleBgRef}
        className="pointer-events-none absolute left-0 top-1/2 z-0 -translate-y-1/2 whitespace-nowrap text-[24vw] font-black uppercase leading-none tracking-normal text-white/5"
        style={{ fontFamily: "var(--font-serif, serif)" }}
      >
        Visa Knowledge Library
      </div>

      {/* Horizontal Slider Track */}
      <div
        ref={trackRef}
        className="relative z-10 grid w-full grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:flex lg:h-[70vh] lg:w-max lg:items-center lg:gap-12 lg:px-24"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        {/* Intro Block Card */}
        <div className="flex min-h-[280px] flex-col justify-center text-left sm:col-span-2 lg:w-[30vw] lg:max-w-[400px] lg:shrink-0 lg:pr-8">
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
            className={`horizontal-card flex aspect-[3/4] w-full flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-md transition-all duration-75 sm:p-6 lg:w-[24vw] lg:max-w-[320px] lg:shrink-0 ${card.offsetY}`}
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
