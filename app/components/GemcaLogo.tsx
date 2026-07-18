"use client";

import React from "react";

export default function GemcaLogo({ 
  className = "", 
  light = false 
}: { 
  className?: string;
  light?: boolean;
}) {
  const textColor = light ? "#E2E8F0" : "#2A3348"; // slate-200 vs ink

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 250 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Letter G (x-offset = 0) */}
        <g id="letter-G">
          <polygon points="0,12 40,12 32,20 8,20" fill="#1A365D" /> {/* Top Dark */}
          <polygon points="0,12 8,20 8,44 0,52" fill="#2B6CB0" /> {/* Left Medium */}
          <polygon points="0,52 8,44 32,44 40,52" fill="#4299E1" /> {/* Bottom Light */}
          <polygon points="40,52 32,44 32,34 40,34" fill="#2B6CB0" /> {/* Right Lower */}
          <polygon points="40,34 32,34 22,34 22,28 40,28" fill="#3182CE" /> {/* Inner Bar */}
          <polygon points="22,28 32,28 32,34 22,34" fill="#63B3ED" /> {/* Inner Bar highlight */}
          <polygon points="8,20 32,20 32,28 8,28" fill="#1A365D" /> {/* Inner Top shadow */}
          <polygon points="8,28 22,28 22,44 8,44" fill="#2C5282" /> {/* Inner core */}
        </g>

        {/* Letter E (x-offset = 50) */}
        <g id="letter-E">
          <polygon points="50,12 58,20 58,44 50,52" fill="#2B6CB0" /> {/* Left Bar */}
          <polygon points="50,12 90,12 82,20 58,20" fill="#1A365D" /> {/* Top Bar */}
          <polygon points="58,28 82,28 78,34 58,34" fill="#3182CE" /> {/* Mid Bar */}
          <polygon points="58,34 78,34 74,38 58,38" fill="#4299E1" /> {/* Mid Bar shade */}
          <polygon points="50,52 58,44 82,44 90,52" fill="#4299E1" /> {/* Bottom Bar */}
        </g>

        {/* Letter M (x-offset = 100) */}
        <g id="letter-M">
          <polygon points="100,12 108,12 108,52 100,52" fill="#1A365D" /> {/* Left Vertical */}
          <polygon points="100,12 108,20 108,44 100,52" fill="#2B6CB0" /> {/* Left Inner */}
          <polygon points="108,12 120,38 120,48 108,22" fill="#3182CE" /> {/* Left Diagonal */}
          <polygon points="132,12 120,38 120,48 132,22" fill="#4299E1" /> {/* Right Diagonal */}
          <polygon points="132,12 140,12 140,52 132,52" fill="#1A365D" /> {/* Right Vertical */}
          <polygon points="132,20 140,12 140,52 132,44" fill="#2B6CB0" /> {/* Right Inner */}
        </g>

        {/* Letter C (x-offset = 150) */}
        <g id="letter-C">
          <polygon points="150,12 190,12 182,20 158,20" fill="#1A365D" /> {/* Top Bar */}
          <polygon points="150,12 158,20 158,44 150,52" fill="#2B6CB0" /> {/* Left Bar */}
          <polygon points="150,52 158,44 182,44 190,52" fill="#4299E1" /> {/* Bottom Bar */}
        </g>

        {/* Letter A (x-offset = 200) */}
        <g id="letter-A">
          <polygon points="200,52 216,12 224,12 208,52" fill="#1A365D" /> {/* Left Leg */}
          <polygon points="204,44 216,16 220,28 210,44" fill="#2B6CB0" /> {/* Left Inner */}
          <polygon points="240,52 224,12 216,12 232,52" fill="#3182CE" /> {/* Right Leg */}
          <polygon points="236,44 224,16 220,28 230,44" fill="#4299E1" /> {/* Right Inner */}
          <polygon points="212,34 228,34 226,40 214,40" fill="#63B3ED" /> {/* Horizontal Bridge */}
          
          {/* Gold Diamond Facet above A */}
          <polygon points="228,0 234,5 228,10 222,5" fill="#C9A227" />
          <polygon points="228,0 234,5 228,5" fill="#E5C158" /> {/* Highlight facet */}
        </g>

        {/* Tagline Line 1 */}
        <text
          x="120"
          y="64"
          fill={textColor}
          fontSize="4.8"
          fontFamily="var(--font-inter), sans-serif"
          fontWeight="bold"
          letterSpacing="2.6"
          textAnchor="middle"
        >
          GORAYA EDUCATION & MIGRATION
        </text>

        {/* Tagline Line 2 */}
        <text
          x="120"
          y="72"
          fill={textColor}
          fontSize="4.8"
          fontFamily="var(--font-inter), sans-serif"
          fontWeight="bold"
          letterSpacing="2.6"
          textAnchor="middle"
        >
          CONSULTANT AUSTRALIA
        </text>
      </svg>
    </div>
  );
}
