import { create } from "zustand";

interface DeviceState {
  isMobile: boolean;
  isTablet: boolean;
  prefersReducedMotion: boolean;
  width: number;
  height: number;
  dpr: number;
  detect: () => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  isMobile: false,
  isTablet: false,
  prefersReducedMotion: false,
  width: 1920,
  height: 1080,
  dpr: 1,

  detect: () => {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    set({
      isMobile: w < 768,
      isTablet: w >= 768 && w < 1024,
      width: w,
      height: window.innerHeight,
      dpr: Math.min(window.devicePixelRatio, 2),
      prefersReducedMotion: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches,
    });
  },
}));
