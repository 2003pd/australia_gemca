"use client";

import { motion, Variants } from "motion/react";
import { useEffect, useState } from "react";
import { 
  Award, 
  CheckCircle, 
  TrendingUp, 
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import Premium3DIcon from "../ui/Premium3DIcon";

interface StatItem {
  value: number;
  label: string;
  suffix: string;
  subtext: string;
  icon: LucideIcon;
}

const stats: StatItem[] = [
  { 
    value: 10, 
    label: "Years Experience", 
    suffix: "+",
    subtext: "Providing trusted MARA-registered consultation since a decade.",
    icon: Award
  },
  { 
    value: 5000, 
    label: "Visas Granted", 
    suffix: "+",
    subtext: "Helping students, families, and professionals achieve their dreams.",
    icon: CheckCircle
  },
  { 
    value: 99, 
    label: "Success Rate", 
    suffix: "%",
    subtext: "Achieved through ethical planning and absolute documentation check.",
    icon: TrendingUp
  },
  { 
    value: 15, 
    label: "Partner Institutions", 
    suffix: "+",
    subtext: "Direct partnerships with Australia's top universities and colleges.",
    icon: GraduationCap
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const easePercentage = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(value * easePercentage));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export default function StatsSection() {
  const [hasInView, setHasInView] = useState(false);

  return (
    <section className="relative w-full py-28 bg-transparent overflow-hidden transition-colors duration-500">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Soft Gold Blur */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#d4af37]/5 dark:bg-[#d4af37]/3 rounded-full blur-[120px] pointer-events-none" />
        {/* Soft Blue Blur */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#0A5CFF]/3 dark:bg-[#0A5CFF]/2 rounded-full blur-[150px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          onViewportEnter={() => setHasInView(true)}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={i} 
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="group relative bg-white/60 dark:bg-[#060b13]/60 backdrop-blur-md p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 hover:border-[#d4af37]/50 dark:hover:border-[#d4af37]/40 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                
                {/* Tech Corner Accents */}
                <div className="absolute top-3 left-3 w-2 h-2 border-t border-l border-gray-400/20 group-hover:border-[#d4af37] transition-colors rounded-tl-sm pointer-events-none" />
                <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-gray-400/20 group-hover:border-[#d4af37] transition-colors rounded-tr-sm pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-gray-400/20 group-hover:border-[#d4af37] transition-colors rounded-bl-sm pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-gray-400/20 group-hover:border-[#d4af37] transition-colors rounded-br-sm pointer-events-none" />

                <div>
                  {/* Icon Container */}
                  <Premium3DIcon Icon={Icon} className="mb-6" />

                  {/* Counter Value */}
                  <div 
                    className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1a2b49] via-[#d4af37] to-[#1a2b49] dark:from-[#d4af37] dark:via-[#f7d070] dark:to-[#d4af37] mb-2 leading-none" 
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {hasInView ? (
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    ) : (
                      `0${stat.suffix}`
                    )}
                  </div>

                  {/* Stat Title */}
                  <h4 className="text-base font-bold text-[#1a2b49] dark:text-white mb-3">
                    {stat.label}
                  </h4>
                </div>

                {/* Subtext */}
                <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-medium mt-2">
                  {stat.subtext}
                </p>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
