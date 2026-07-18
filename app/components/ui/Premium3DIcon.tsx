"use client";

import type { LucideIcon } from "lucide-react";

interface Premium3DIconProps {
  Icon: LucideIcon;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-12 w-12",
  md: "h-16 w-16",
  lg: "h-20 w-20",
};

const iconSizes = {
  sm: 25,
  md: 34,
  lg: 42,
};

export default function Premium3DIcon({ Icon, className = "", size = "md" }: Premium3DIconProps) {
  return (
    <div
      className={`app-category-icon relative ${sizeClasses[size]} shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-2xl bg-white shadow-[0_14px_24px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] transition-all duration-300 group-hover:bg-[linear-gradient(135deg,#2ec7d3,#1555bf)] group-hover:shadow-[0_18px_34px_rgba(21,85,191,0.28)]" />
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_18%,rgba(255,255,255,0.75),transparent_32%)] opacity-70 transition-opacity duration-300 group-hover:opacity-35" />
      <div className="absolute -bottom-1 left-1/2 h-3 w-8 -translate-x-1/2 rounded-full bg-[#1d4ed8]/18 blur-md opacity-80" />
      <div className="relative grid h-full w-full place-items-center transition-transform duration-300 group-hover:-translate-y-0.5">
        <Icon
          size={iconSizes[size]}
          strokeWidth={2.1}
          className="text-[#168ed1] transition-colors duration-300 group-hover:text-white"
        />
      </div>
    </div>
  );
}
