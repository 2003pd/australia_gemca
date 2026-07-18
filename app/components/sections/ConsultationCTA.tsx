"use client";

import { CalendarPlus, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Premium3DIcon from "../ui/Premium3DIcon";

export default function ConsultationCTA() {
  return (
    <section id="book" className="w-full bg-transparent   border-y border-[#2a3c5a] dark:border-white/10 overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl py-10 flex flex-col md:flex-row items-center justify-between">
        
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-6 mb-6 md:mb-0"
        >
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="shrink-0"
          >
            <Premium3DIcon Icon={CalendarPlus} size="lg" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-semibold text-[#d4af37] mb-1">Book a Consultation</h3>
            <p className="text-gray-800 dark:text-gray-100 text-sm font-medium">Take the first step towards your future in Australia.</p>
          </div>
        </motion.div>

        <motion.button 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          whileHover={{ scale: 1.05, backgroundColor: "#9a7009" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-[#b8860b] text-white px-8 py-4 rounded text-sm font-bold shadow-lg"
        >
          BOOK NOW <ArrowRight size={16} />
        </motion.button>
        
      </div>
    </section>
  );
}
