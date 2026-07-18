"use client";

import { useEffect } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero3D from "./Hero3D";
import GallerySection from "./GallerySection";
import ZoomSection from "./ZoomSection";
import MapStorySection from "./MapStorySection";
import HorizontalSection from "./HorizontalSection";
import StackShowcase from "./StackShowcase";
import MorphSection from "./MorphSection";
import UpdatesSection from "./UpdatesSection";
import FaqSection from "./FaqSection";
import HomePreloader from "./HomePreloader";
import VisaDeck3D from "../sections/VisaDeck3D";
import SiteHeader from "../layout/SiteHeader";

gsap.registerPlugin(ScrollTrigger);

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function HomeExperience() {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${playfair.variable} ${inter.variable} w-full min-h-screen bg-[#1A1A1A] select-none text-[#1A1A1A] relative z-[999]`}>
      <HomePreloader />
      <SiteHeader />
      <Hero3D />
      <GallerySection />
      <ZoomSection />
      <MapStorySection />
      <HorizontalSection />
      <VisaDeck3D />
      <StackShowcase />
      <MorphSection />
      <UpdatesSection />
      <FaqSection />
    </div>
  );
}
