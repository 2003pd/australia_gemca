"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MessagesSquare, FileSearch, ShieldCheck, PlaneTakeoff } from "lucide-react";

const steps = [
  {
    icon: MessagesSquare,
    title: "Initial Consultation",
    desc: "We analyze your profile, understand your goals, and map out the most viable migration or study pathways available for you."
  },
  {
    icon: FileSearch,
    title: "Skill & Document Assessment",
    desc: "Our registered agents meticulously review your documents and assist with your skill assessment to ensure absolute compliance."
  },
  {
    icon: ShieldCheck,
    title: "Application Lodgment",
    desc: "We handle the complex paperwork and liaise directly with the Department of Home Affairs on your behalf."
  },
  {
    icon: PlaneTakeoff,
    title: "Visa Grant & Relocation",
    desc: "Celebrate your success! We provide post-grant support to ensure a smooth transition to your new life in Australia."
  }
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="w-full py-32 bg-transparent   relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        <div className="text-center mb-24">
          <h4 className="text-[#d4af37] font-bold tracking-widest text-sm uppercase mb-3">How It Works</h4>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2b49] dark:text-white">Your Journey to Australia</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Line (Background) */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200  -translate-x-1/2 transition-colors"></div>
          
          {/* Animated Gold Line */}
          <motion.div 
            className="absolute left-[28px] md:left-1/2 top-0 w-[4px] bg-gradient-to-b from-[#d4af37] to-[#f4d46b] -translate-x-1/2 origin-top rounded-full z-10"
            style={{ height: lineHeight }}
          />

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            const Icon = step.icon;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className={`relative flex items-center justify-end md:justify-between w-full mb-16 last:mb-0 ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Empty div for spacing on Desktop */}
                <div className="hidden md:block w-5/12"></div>

                {/* Center Node */}
                <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-white dark:bg-[#050b14] border-4 border-[#1a2b49] dark:border-white/10 rounded-full flex items-center justify-center -translate-x-1/2 z-20 shadow-xl transition-colors">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="w-10 h-10 bg-[#1a2b49] dark:bg-white/5 rounded-full flex items-center justify-center text-[#d4af37]"
                  >
                    <Icon size={20} />
                  </motion.div>
                </div>

                {/* Content Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="w-[calc(100%-80px)] md:w-5/12 bg-white dark:bg-[#0a1120] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 relative group cursor-default transition-all"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-lg pointer-events-none"></div>
                  <div className="relative">
                    <div className="text-5xl font-black text-black dark:text-white absolute -top-12 -left-4 pointer-events-none transition-colors select-none">
                      0{index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-[#1a2b49] dark:text-white mb-3 relative z-10 transition-colors">{step.title}</h3>
                    <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed font-medium relative z-10 transition-colors">{step.desc}</p>
                  </div>
                </motion.div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
