"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MapStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const floatImgRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(pathRef.current, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 30%",
            scrub: true,
          },
        });
      }

      gsap.to(floatImgRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".map-reveal",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#FAF6F0] py-24 select-none"
    >
      <div className="absolute inset-0 z-0 h-full w-full opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="none" className="h-full w-full">
          <path
            ref={pathRef}
            d="M -100,300 C 200,150 400,450 600,200 C 800,50 900,400 1100,250"
            fill="none"
            stroke="#2E5FA3"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-20">
        <div className="flex max-w-xl flex-col items-start">
          <span className="map-reveal mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-[#2E5FA3]">
            Williams Landing // Melbourne West
          </span>

          <h2
            className="map-reveal mb-8 text-4xl font-bold uppercase leading-tight tracking-normal text-[#1A1A1A] sm:text-5xl md:text-7xl"
            style={{ fontFamily: "var(--font-serif, serif)" }}
          >
            Every pathway<br />
            needs context
          </h2>

          <p className="map-reveal mb-6 text-sm leading-relaxed text-[#1A1A1A]/70 md:text-base" style={{ fontFamily: "var(--font-inter)" }}>
            GEMCA is built for people who land mid-funnel from search: a student comparing cities, a skilled worker checking points, or a family reviewing evidence.
          </p>

          <p className="map-reveal text-xs leading-relaxed text-[#1A1A1A]/50" style={{ fontFamily: "var(--font-inter)" }}>
            Each page should orient the visitor quickly, define the next step, and explain the system before asking for a consultation.
          </p>

          <div ref={detailRef} className="map-reveal mt-12 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#2E5FA3]" />
            <span>Knowledge platform structure</span>
          </div>
        </div>

        <div className="relative flex min-h-[460px] w-full items-center justify-center sm:h-[55vh]">
          <div ref={floatImgRef} className="aspect-[3/4] w-full max-w-[400px] overflow-hidden rounded-3xl bg-[#EAE0DC] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800"
              alt="Australian city and migration pathway context"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute right-0 top-[8%] flex max-w-[180px] flex-col gap-1 rounded-xl border border-[#F5E9E6] bg-white/80 p-3 text-[10px] font-bold tracking-wider text-[#1A1A1A]/80 shadow-lg backdrop-blur-md pointer-events-none sm:right-[10%] sm:p-4">
            <div>ABN 96 695 178 744</div>
            <div>01 // VERIFIED BUSINESS</div>
          </div>

          <div className="absolute bottom-[8%] left-0 flex max-w-[180px] flex-col gap-1 rounded-xl border border-[#F5E9E6] bg-white/80 p-3 text-[10px] font-bold tracking-wider text-[#1A1A1A]/80 shadow-lg backdrop-blur-md pointer-events-none sm:left-[8%] sm:p-4">
            <div>10+ NATIONALITIES</div>
            <div>02 // CLIENT CONTEXT</div>
          </div>
        </div>
      </div>
    </section>
  );
}
