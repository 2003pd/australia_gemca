"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import ModelViewer with ssr: false since it uses Canvas
const ModelViewer = dynamic(() => import("../ModelViewer"), { ssr: false });

const features = [
  "Student Visa",
  "Skilled Migration",
  "Visitor Visa",
  "Permanent Residency",
  "Partner Visa",
  "Education Counselling"
];

const stats = [
  { value: "5000+", label: "Successful Applications" },
  { value: "98%", label: "Visa Success Rate" },
  { value: "10+", label: "Years Experience" },
  { value: "24/7", label: "Support" }
];

export default function HeroImmersive() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#F4F9FF] to-[#E6F0FA]"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] bg-[#00C2FF]/10 blur-[120px] rounded-full mix-blend-multiply animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-64 w-[800px] h-[800px] bg-[#0A5CFF]/10 blur-[150px] rounded-full mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8)_0%,rgba(244,249,255,0.4)_100%)] pointer-events-none" />

      {/* Floating Sparkles / Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_2px_rgba(46,197,255,0.4)]"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: Math.random() * 0.5 + 0.2
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [null, 0],
              scale: [1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8 max-w-7xl flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side Content */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col z-20"
          style={{ y: y1, opacity }}
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 shadow-[0_4px_20px_rgba(10,92,255,0.08)] backdrop-blur-md w-fit mb-8"
          >
            <span className="text-lg leading-none">🇦🇺</span>
            <span className="text-xs font-bold tracking-wider text-[#0A5CFF] uppercase">Trusted Australian Migration Experts</span>
          </motion.div>

          {/* Headings */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl lg:text-7xl font-bold tracking-tight text-[#0D1B2A] leading-[1.05] mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Your Journey to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A5CFF] to-[#2EC5FF]">Australia</span> Starts Here.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed font-light"
          >
            Helping students, professionals and families achieve their Australian dream through trusted education, migration and visa solutions.
          </motion.p>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="grid grid-cols-2 gap-3 mb-12"
          >
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group flex items-center gap-3 p-3 rounded-xl bg-white/40 border border-white/50 backdrop-blur-sm shadow-sm hover:shadow-[0_8px_30px_rgba(10,92,255,0.12)] hover:-translate-y-1 transition-all duration-300"
              >
                <CheckCircle2 size={18} className="text-[#00C2FF] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-semibold text-[#0D1B2A]">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <button className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-[#0A5CFF] to-[#00C2FF] text-white px-8 py-4 rounded-xl text-sm font-bold shadow-[0_8px_25px_rgba(10,92,255,0.3)] hover:shadow-[0_12px_35px_rgba(10,92,255,0.4)] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <span className="relative z-10">Book Free Consultation</span>
              <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="group w-full sm:w-auto flex items-center justify-center bg-white/60 border border-white text-[#0D1B2A] px-8 py-4 rounded-xl text-sm font-bold shadow-sm hover:bg-white hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5">
              Explore Services
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-gray-200/50"
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-2xl font-bold text-[#0D1B2A]">{stat.value}</span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>

        </motion.div>

        {/* Right Side 3D Model Viewer */}
        <motion.div 
          className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative z-10 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        >
          {/* Decorative Rings Behind Model */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#00C2FF]/20 animate-[spin_20s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-[#0A5CFF]/10 animate-[spin_30s_linear_infinite_reverse]" />
          
          <div className="w-full h-full relative z-20 drop-shadow-[0_20px_50px_rgba(10,92,255,0.15)]">
            {mounted && (
              <ModelViewer
                // Using DamagedHelmet as a reliable high-quality placeholder until you add your Globe model
                url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb"
                width={"100%" as any}
                height={"100%" as any}
                autoRotate={true}
                fadeIn={true}
                autoFrame={true}
                enableHoverRotation={true}
                enableMouseParallax={true}
                enableManualRotation={true}
                enableManualZoom={false}
                showScreenshotButton={false}
                environmentPreset="city"
                autoRotateSpeed={0.5}
              />
            )}
          </div>
          
          {/* Floating Glass Badges around model */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-10 z-30 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md shadow-lg border border-white text-xs font-bold text-[#0D1B2A]"
          >
            Study in Australia
          </motion.div>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-32 left-0 z-30 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md shadow-lg border border-white text-xs font-bold text-[#0A5CFF]"
          >
            Visa Approved ✔
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
