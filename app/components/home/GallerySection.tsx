"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800",
    alt: "Australian university learning environment",
    class: "left-[10%] top-[15%] w-[25vw] max-w-[320px] aspect-[4/5]",
    moveY: -100,
    scaleStart: 1.0,
    scaleEnd: 1.15,
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800",
    alt: "Students preparing study documents",
    class: "left-[38%] top-[30%] w-[28vw] max-w-[360px] aspect-[3/4] z-10",
    moveY: -60,
    scaleStart: 1.0,
    scaleEnd: 1.25,
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
    alt: "Migration consultation documents",
    class: "right-[10%] top-[10%] w-[22vw] max-w-[280px] aspect-[4/5]",
    moveY: -140,
    scaleStart: 1.0,
    scaleEnd: 1.12,
  },
];

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the gallery section during the scroll timeline
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

      // Animate title: letters shrink slightly in spacing and fade
      tl.fromTo(
        titleRef.current,
        { letterSpacing: "0.2em", opacity: 0.8 },
        { letterSpacing: "0.05em", opacity: 1, ease: "none" },
        0
      );

      // Animate each image independently (parallax moveY + scaling)
      imgRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const config = IMAGES[index];
        const img = ref.querySelector("img");
        
        tl.to(ref, { y: config.moveY, ease: "none" }, 0);
        if (img) {
          tl.fromTo(
            img,
            { scale: config.scaleStart },
            { scale: config.scaleEnd, ease: "none" },
            0
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden flex flex-col justify-between py-16 select-none"
    >
      {/* Title */}
      <div className="container mx-auto px-12 z-20">
        <h2
          ref={titleRef}
          className="text-[6vw] font-bold text-[#FAF6F0] tracking-[0.1em] uppercase leading-none"
          style={{ fontFamily: "var(--font-serif, serif)" }}
        >
          Study, Skills, Visas
        </h2>
        <p className="text-[#FAF6F0]/40 text-xs tracking-widest uppercase mt-4">
          Chapter 02 // Knowledge Pathways
        </p>
      </div>

      {/* Collage Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {IMAGES.map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              imgRefs.current[i] = el;
            }}
            className={`absolute rounded-3xl overflow-hidden shadow-2xl bg-[#2A2A2A] pointer-events-auto ${img.class}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover origin-center"
            />
          </div>
        ))}
      </div>

      {/* Footer detail */}
      <div className="container mx-auto px-12 z-20 flex justify-between items-center text-[#FAF6F0]/30 text-[10px] tracking-widest uppercase">
        <div>University pages</div>
        <div>Visa guides</div>
      </div>
    </section>
  );
}
