"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800",
    alt: "Australian university learning environment",
    class: "lg:left-[10%] lg:top-[15%] lg:w-[25vw] lg:max-w-[320px]",
    moveY: -100,
    scaleStart: 1.0,
    scaleEnd: 1.15,
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800",
    alt: "Students preparing study documents",
    class: "z-10 lg:left-[38%] lg:top-[30%] lg:w-[28vw] lg:max-w-[360px] lg:aspect-[3/4]",
    moveY: -60,
    scaleStart: 1.0,
    scaleEnd: 1.25,
  },
  {
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
    alt: "Migration consultation documents",
    class: "lg:right-[10%] lg:top-[10%] lg:w-[22vw] lg:max-w-[280px]",
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
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
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
      });

      media.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
            },
          }
        );

        imgRefs.current.forEach((ref, index) => {
          if (!ref) return;
          const img = ref.querySelector("img");

          gsap.fromTo(
            ref,
            { opacity: 0, y: 48, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 86%",
              },
            }
          );

          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.08 },
              {
                scale: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: ref,
                  start: "top 88%",
                },
              }
            );
          }
        });

        ScrollTrigger.refresh();
      });

      return () => media.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#1A1A1A] px-5 py-16 select-none sm:px-6 lg:h-screen lg:px-0"
    >
      {/* Title */}
      <div className="container z-20 mx-auto lg:px-12">
        <h2
          ref={titleRef}
          className="max-w-5xl text-4xl font-bold uppercase leading-[0.95] tracking-normal text-[#FAF6F0] sm:text-5xl lg:text-[6vw] lg:tracking-[0.1em]"
          style={{ fontFamily: "var(--font-serif, serif)" }}
        >
          Study, Skills, Visas
        </h2>
        <p className="mt-4 text-xs uppercase tracking-widest text-[#FAF6F0]/40">
          Chapter 02 // Knowledge Pathways
        </p>
      </div>

      {/* Collage Container */}
      <div className="relative z-10 mt-12 grid w-full grid-cols-1 gap-5 pointer-events-none sm:grid-cols-3 lg:absolute lg:inset-0 lg:mt-0 lg:block lg:h-full">
        {IMAGES.map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              imgRefs.current[i] = el;
            }}
            className={`relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#2A2A2A] shadow-2xl pointer-events-auto lg:absolute ${img.class}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 h-full w-full object-cover origin-center"
            />
          </div>
        ))}
      </div>

      {/* Footer detail */}
      <div className="container z-20 mx-auto mt-12 flex items-center justify-between gap-5 text-[10px] uppercase tracking-widest text-[#FAF6F0]/30 lg:mt-0 lg:px-12">
        <div>University pages</div>
        <div>Visa guides</div>
      </div>
    </section>
  );
}
