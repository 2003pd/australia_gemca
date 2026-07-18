"use client";

import dynamic from "next/dynamic";

// Each chapter is lazy-loaded for optimal bundle splitting
const AboutHero = dynamic(() => import("./AboutHero"), { ssr: false });
const Timeline = dynamic(() => import("./Timeline"));

export default function AboutUs() {
  return (
    <div id="about-us" className="w-full">
      {/* Chapter 1 — Kinetic Hero */}
      <AboutHero />

      {/* Chapter 5 — SVG Draw Timeline */}
      <Timeline />
    </div>
  );
}
