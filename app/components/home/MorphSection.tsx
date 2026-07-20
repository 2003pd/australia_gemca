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
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
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
      });

      media.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=90%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          cardRef.current,
          { y: 42, scale: 0.88, borderRadius: "2rem" },
          { y: 0, scale: 1, borderRadius: "0rem", ease: "none" },
          0
        );

        tl.fromTo(
          imgRef.current,
          { scale: 1 },
          { scale: 1.14, ease: "none" },
          0
        );

        tl.fromTo(
          titleRef.current,
          { opacity: 0, y: 42, scale: 0.88 },
          { opacity: 1, y: 0, scale: 1, ease: "none" },
          0.12
        );
      });

      return () => media.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="morph"
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#1A1A1A] px-5 py-20 select-none sm:px-6 lg:h-screen lg:px-0 lg:py-0"
    >
      {/* Centered card that expands to full viewport */}
      <div
        ref={cardRef}
        className="relative z-10 h-[58vh] min-h-[360px] w-full max-w-[520px] overflow-hidden rounded-[2rem] bg-[#2A2A2A] shadow-2xl transition-all duration-75 lg:h-[48vh] lg:min-h-[380px] lg:w-[32vw] lg:min-w-[280px] lg:max-w-none lg:rounded-[3rem]"
        style={{ transform: "translateZ(0)" }}
      >
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600"
          alt="Australian study and migration connection"
          className="absolute inset-0 h-full w-full object-cover origin-center scale-100"
        />

        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

        {/* Large Overlapping Typography */}
        <div className="absolute inset-0 flex items-center justify-center z-20 px-8">
          <h2
            ref={titleRef}
            className="whitespace-nowrap text-center text-[clamp(3rem,16vw,4.5rem)] font-bold uppercase leading-none tracking-normal text-[#FAF6F0] opacity-100 sm:text-7xl lg:text-[12vw] lg:opacity-0"
            style={{
              fontFamily: "var(--font-serif, serif)",
              textShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            Clarity
          </h2>
        </div>

        {/* Minimal card meta overlay */}
        <div className="absolute left-5 top-6 z-20 text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 sm:left-8 sm:top-8 md:left-12 md:top-12">
          Section 07 // Education First
        </div>
      </div>
    </section>
  );
}
