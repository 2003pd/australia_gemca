"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ZoomSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Expand card wrapper: shrink padding to 0, flatten rounded corners
      tl.to(wrapperRef.current, {
        padding: "0rem",
        borderRadius: "0rem",
        ease: "none",
      }, 0);

      // Zoom image scale
      tl.to(imgRef.current, {
        scale: 1.15,
        ease: "none",
      }, 0);

      // Fade in the text overlay after expansion
      tl.fromTo(textRef.current, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
      }, 0.2);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="zoom"
      ref={containerRef}
      className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden select-none"
    >
      {/* Boxed image card that expands */}
      <div
        ref={wrapperRef}
        className="h-full w-full p-5 transition-all duration-75 sm:p-8 md:p-16 lg:p-24"
      >
        <div
          className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-[#2A2A2A] shadow-2xl transition-all duration-75"
          style={{ transform: "translateZ(0)" }}
        >
          <img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600"
            alt="Australian education and migration knowledge platform"
            className="w-full h-full object-cover origin-center scale-100"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent pointer-events-none" />

          {/* Centered Typography Overlay */}
          <div
            ref={textRef}
            className="absolute bottom-8 left-5 right-5 z-10 max-w-2xl text-left sm:bottom-12 sm:left-8 sm:right-8 md:bottom-16 md:left-20"
          >
            <span className="text-[#FAF6F0]/50 text-xs tracking-[0.3em] uppercase block mb-3">
              Section 03 // Trust Statement
            </span>
            <h3
              className="text-3xl font-bold uppercase leading-none tracking-normal text-white sm:text-4xl md:text-6xl"
              style={{ fontFamily: "var(--font-serif, serif)" }}
            >
              Knowledge first. Guidance second.
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mt-4 max-w-lg" style={{ fontFamily: "var(--font-inter)" }}>
              GEMCA explains Australian study and migration pathways in plain language, then helps clients apply that knowledge to their own circumstances.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
