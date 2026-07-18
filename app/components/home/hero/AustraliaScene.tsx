"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import AustraliaMap from "./AustraliaMap";

interface AustraliaSceneProps {
  cursor: { x: number; y: number };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

export default function AustraliaScene({ cursor }: AustraliaSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="relative h-[410px] w-full sm:h-[500px] lg:h-[620px]" aria-label="Interactive 3D Australia education and migration pathway map">
      <Canvas
        camera={{ position: [0, 0, 5.1], fov: 38 }}
        dpr={[1, 1.55]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.45} />
        <directionalLight position={[3, 4, 5]} intensity={2.6} color="#F8FAFC" />
        <pointLight position={[-2.5, 2.2, 2.8]} intensity={3.4} color="#C89B24" />
        <pointLight position={[2.5, -1.8, 2]} intensity={2.2} color="#164A8A" />
        <AustraliaMap active={active} reducedMotion={reducedMotion} cursor={cursor} />
        <Environment preset="city" />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-6 bottom-8 rounded-full border border-[#081F4D]/10 bg-white/62 px-5 py-3 text-center text-[10px] font-black uppercase tracking-[0.18em] text-[#4b5b73] shadow-[0_16px_60px_rgba(8,31,77,0.10)] backdrop-blur-xl">
        Australia pathways: study, visa, migration
      </div>
    </div>
  );
}
