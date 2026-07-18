"use client";

import dynamic from "next/dynamic";

const Ferrofluid = dynamic(() => import("./Ferrofluid"), { ssr: false });

export default function FerrofluidBg() {
  return (
    <div className="fixed inset-0 z-[-49] pointer-events-none">
      <Ferrofluid
        colors={["#2E5FA3", "#2E5FA3", "#1B3E73", "#2E5FA3"]}
        speed={0.25}
        scale={1.8}
        turbulence={0.8}
        fluidity={0.12}
        rimWidth={0.18}
        sharpness={3}
        shimmer={1.2}
        glow={2.5}
        flowDirection="down"
        opacity={0.7}
        mouseInteraction={true}
        mouseStrength={0.8}
        mouseRadius={0.3}
        mouseDampening={0.2}
        mixBlendMode="screen"
      />
    </div>
  );
}
