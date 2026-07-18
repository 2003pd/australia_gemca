"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MorphSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Card morph transition: expand to full screen viewport width & height, remove border-radius
      tl.to(cardRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: "0rem",
        ease: "none",
      }, 0);

      // Image scales up during morph
      tl.to(imgRef.current, {
        scale: 1.12,
        ease: "none",
      }, 0);

      // Large overlapping typography fades and slides up over the full bleed image
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 120, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out" },
        0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="morph"
      ref={containerRef}
      className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Centered card that expands to full viewport */}
      <div
        ref={cardRef}
        className="relative w-[32vw] h-[48vh] min-w-[280px] min-h-[380px] rounded-[3rem] overflow-hidden shadow-2xl z-10 transition-all duration-75 bg-[#2A2A2A]"
        style={{ transform: "translateZ(0)" }}
      >
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600"
          alt="Australian study and migration connection"
          className="w-full h-full object-cover origin-center scale-100"
        />

        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

        {/* Large Overlapping Typography */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-8">
          <h2
            ref={titleRef}
            className="text-[12vw] font-bold text-[#FAF6F0] leading-none tracking-tighter text-center uppercase whitespace-nowrap opacity-0"
            style={{
              fontFamily: "var(--font-serif, serif)",
              textShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            Clarity
          </h2>
        </div>

        {/* Minimal card meta overlay */}
        <div className="absolute top-12 left-12 z-20 text-white/40 text-[10px] tracking-[0.25em] uppercase font-bold">
          Section 07 // Education First
        </div>
      </div>
    </section>
  );
}
