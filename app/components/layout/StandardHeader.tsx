"use client";

import Link from "next/link";
import { Calendar, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function StandardHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white dark:bg-[#050b14] border-b border-gray-100 dark:border-white/10 sticky top-0 z-50 shadow-sm transition-colors duration-500"
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl h-24 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center cursor-pointer max-w-[220px] md:max-w-[280px]">
          <img 
            src="/logo-dark.png" 
            alt="GEMCA Logo" 
            className="h-12 md:h-16 w-auto object-contain block dark:hidden"
          />
          <img 
            src="/logo-light.png" 
            alt="GEMCA Logo" 
            className="h-12 md:h-16 w-auto object-contain hidden dark:block"
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#1a2b49] dark:text-gray-300">
          <Link href="/" className="relative group">
            <span className="hover:text-[#d4af37] transition-colors">HOME</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="#services" className="relative group">
            <span className="hover:text-[#d4af37] transition-colors">SERVICES</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="#about" className="relative group">
            <span className="hover:text-[#d4af37] transition-colors">ABOUT US</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] transition-all group-hover:w-full"></span>
          </Link>
          <Link href="#destinations" className="relative group">
            <span className="hover:text-[#d4af37] transition-colors">DESTINATIONS</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d4af37] transition-all group-hover:w-full"></span>
          </Link>
          
          <div className="w-[1px] h-6 bg-gray-200  mx-2"></div>
          
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-transparent transition-colors text-[#1a2b49] dark:text-white"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#book"
            className="flex items-center gap-2 bg-[#1a2b49] dark:bg-[#d4af37] text-white px-6 py-3 rounded text-sm font-bold hover:bg-[#d4af37] dark:hover:bg-[#b8860b] transition-colors shadow-lg shadow-[#1a2b49]/10 dark:shadow-[#d4af37]/20"
          >
            <Calendar size={16} />
            BOOK CONSULTATION
          </motion.a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-[#1a2b49] dark:text-white"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button className="text-[#1a2b49] dark:text-white p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

      </div>
    </motion.header>
  );
}
