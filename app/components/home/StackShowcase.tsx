"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    num: "01",
    tag: "STUDY HUB",
    title: "Student Admissions",
    src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800",
    desc: "Course selection, admissions support, Genuine Student logic and Australian study pathway planning.",
  },
  {
    num: "02",
    tag: "GSM HUB",
    title: "Skilled Migration",
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=900&auto=format&fit=crop",
    desc: "Points review, skills assessment planning, EOI strategy and 189, 190 or 491 pathway guidance.",
  },
  {
    num: "03",
    tag: "FAMILY HUB",
    title: "Partner & Family",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800",
    desc: "Evidence planning for partner, parent and family pathways with clear document expectations.",
  },
  {
    num: "04",
    tag: "SPONSORSHIP",
    title: "Employer Sponsored",
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop",
    desc: "Role alignment, employer obligations, sponsorship streams, costs and nomination preparation.",
  },
  {
    num: "05",
    tag: "COMPLEX CASES",
    title: "Appeals & Refusals",
    src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=900&auto=format&fit=crop",
    desc: "Clear review of refusals, evidence gaps, natural justice responses and available next steps.",
  },
];

export default function StackShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      if (cards.length === 0) return;

      gsap.set(cards, {
        yPercent: 115,
        scale: 0.92,
        opacity: 0,
        rotationX: -10,
        z: -80,
      });

      gsap.set(cards[0], {
        yPercent: 0,
        scale: 1,
        opacity: 1,
        rotationX: 0,
        z: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (cards.length - 1)}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        gsap.set(card, { zIndex: cards.length + index });

        if (index === 0) return;

        const previousCard = cards[index - 1];
        const time = index - 1;

        tl.to(
          previousCard,
          {
            yPercent: -18,
            scale: 0.84,
            opacity: 0.22,
            rotationX: 8,
            z: -140,
            ease: "none",
          },
          time
        ).to(
          card,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            rotationX: 0,
            z: 0,
            ease: "none",
          },
          time
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="stack-showcase"
      ref={containerRef}
      className="relative w-full h-screen bg-[#F5E9E6] overflow-hidden flex flex-col justify-between py-16 select-none"
    >
      {/* Title */}
      <div className="container mx-auto px-12 z-20 text-center">
        <span className="text-[#2E5FA3] text-[10px] tracking-[0.3em] uppercase font-bold block mb-4">
          Section 06 // Service Hubs
        </span>
        <h2
          className="text-4xl md:text-5xl font-bold text-[#1A1A1A] uppercase leading-none tracking-tight"
          style={{ fontFamily: "var(--font-serif, serif)" }}
        >
          Choose Your Pathway
        </h2>
      </div>

      {/* 3D Stacking Container */}
      <div
        ref={cardContainerRef}
        className="relative flex-1 w-full flex items-center justify-center"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {CARDS.map((card, i) => (
          <div
            key={i}
            className="stack-card absolute w-[80vw] max-w-[420px] aspect-[3/4] bg-white rounded-[2.5rem] shadow-2xl border border-[#FAF6F0] p-8 flex flex-col justify-between"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex justify-between items-center text-[10px] font-bold tracking-wider text-[#1A1A1A]/40">
              <div>CARD {card.num}</div>
              <div>{card.tag}</div>
            </div>

            {/* Floating Image */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-[#EAE0DC] my-6">
              <img
                src={card.src}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-left mt-auto">
              <h3
                className="text-[#1A1A1A] text-xl font-bold uppercase mb-2"
                style={{ fontFamily: "var(--font-serif, serif)" }}
              >
                {card.title}
              </h3>
              <p className="text-[#1A1A1A]/60 text-xs leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer details */}
      <div className="container mx-auto px-12 z-20 flex justify-between items-center text-[#1A1A1A]/30 text-[10px] tracking-widest uppercase">
        <div>Education first</div>
        <div>Consultation second</div>
      </div>
    </section>
  );
}
