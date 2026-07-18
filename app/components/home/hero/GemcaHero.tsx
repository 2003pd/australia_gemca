"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { BookOpenCheck, FileCheck2, Route } from "lucide-react";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import FloatingPathCard from "./FloatingPathCard";
import HeroLoader from "./HeroLoader";

const AustraliaScene = dynamic(() => import("./AustraliaScene"), {
  ssr: false,
  loading: () => <HeroLoader />,
});

const pathCards = [
  {
    title: "Study",
    text: "Course and university pathways",
    icon: BookOpenCheck,
    className: "left-2 top-10 w-56 sm:left-0 lg:left-2 lg:top-24",
  },
  {
    title: "Visa",
    text: "Clear documentation guidance",
    icon: FileCheck2,
    className: "right-0 top-32 w-56 sm:right-3 lg:top-28",
  },
  {
    title: "Migration",
    text: "Plan your next Australian step",
    icon: Route,
    className: "bottom-10 left-8 w-60 sm:left-12 lg:bottom-20",
  },
];

export default function GemcaHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cursorPixels, setCursorPixels] = useState({ x: 900, y: 260 });
  const [cursorNormal, setCursorNormal] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setCursorPixels({ x, y });
      setCursorNormal({
        x: (x / Math.max(rect.width, 1) - 0.5) * 2,
        y: (y / Math.max(rect.height, 1) - 0.5) * 2,
      });
    };

    section.addEventListener("pointermove", onMove);
    return () => section.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[900px] overflow-hidden bg-[#F8FAFC] px-5 pb-20 pt-32 text-[#081F4D] sm:px-6 lg:px-8"
    >
      <HeroBackground cursor={cursorPixels} />

      <div className="relative z-10 mx-auto grid min-h-[760px] max-w-7xl gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-center">
        <HeroContent />

        <div className="relative min-h-[560px] lg:min-h-[680px]">
          <AustraliaScene cursor={cursorNormal} />
          <div className="pointer-events-none absolute inset-0 hidden sm:block">
            {pathCards.map((card, index) => (
              <FloatingPathCard
                key={card.title}
                title={card.title}
                text={card.text}
                icon={card.icon}
                className={card.className}
                delay={0.55 + index * 0.12}
                cursor={cursorNormal}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-[-1px] z-20 h-24 bg-[#F8FAFC] [clip-path:ellipse(72%_68%_at_50%_100%)]" />

      <style jsx global>{`
        @keyframes gemca-gold-sheen {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </section>
  );
}
