"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const resize = () => {
      lenis.resize();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    window.addEventListener("load", resize);
    window.addEventListener("resize", resize);

    const timers = [250, 750, 1500].map((delay) => window.setTimeout(resize, delay));

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("load", resize);
      window.removeEventListener("resize", resize);
      timers.forEach((timer) => window.clearTimeout(timer));
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
