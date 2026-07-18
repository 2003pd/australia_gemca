import { motion } from "motion/react";
import { ArrowRight, BookOpen, Globe2, Compass, ShieldCheck } from "lucide-react";

interface CapabilityPanelProps {
  number: string;
  title: string;
  description: string;
  isActive: boolean;
  index: number;
}

const icons = [BookOpen, Globe2, Compass, ShieldCheck];

export default function CapabilityPanel({ number, title, description, isActive, index }: CapabilityPanelProps) {
  const Icon = icons[index % icons.length];

  return (
    <motion.div
      className={`absolute w-[300px] p-6 rounded-2xl border transition-colors duration-500 bg-white/80 backdrop-blur-xl shadow-2xl ${
        isActive 
          ? "border-[#1a2b49]/20 shadow-[#1a2b49]/5" 
          : "border-transparent opacity-40 scale-90 pointer-events-none"
      }`}
      animate={{
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1 : 0.9,
        z: isActive ? 0 : -50,
        y: isActive ? 0 : 20,
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-[#C9A227] tracking-widest">{number}</span>
        <Icon size={20} className="text-[#1a2b49] opacity-70" />
      </div>
      <h3 className="text-xl font-bold text-[#1a2b49] mb-3">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">{description}</p>
      
      <div className="flex items-center gap-2 text-xs font-bold text-[#1a2b49] uppercase tracking-wider group cursor-pointer">
        Explore
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  );
}
