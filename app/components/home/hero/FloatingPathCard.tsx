"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";

interface FloatingPathCardProps {
  title: string;
  text: string;
  icon: LucideIcon;
  className?: string;
  delay?: number;
  cursor: { x: number; y: number };
}

export default function FloatingPathCard({ title, text, icon: Icon, className = "", delay = 0, cursor }: FloatingPathCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{ x: cursor.x * 10, y: cursor.y * -8 }}
      className={`pointer-events-none absolute rounded-2xl border border-[#C89B24]/35 bg-white/58 p-4 text-[#081F4D] shadow-[0_22px_80px_rgba(8,31,77,0.13)] backdrop-blur-2xl ${className}`}
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#081F4D] text-[#C89B24]">
        <Icon size={18} />
      </div>
      <p className="text-[11px] font-black uppercase tracking-[0.18em]">{title}</p>
      <p className="mt-2 max-w-[190px] text-sm font-semibold leading-5 text-[#54627b]">{text}</p>
    </motion.div>
  );
}
