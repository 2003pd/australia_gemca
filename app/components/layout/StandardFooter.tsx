"use client";

import { Phone, Smartphone, Mail, MapPin } from "lucide-react";
import { motion, Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function StandardFooter() {
  return (
    <footer className="w-full bg-white dark:bg-[#050b14] relative z-50 text-[#1a2b49] dark:text-white border-t border-[#1a2b49] dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl pt-20 pb-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >

          <motion.div variants={itemVariants} className="flex items-start gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded border border-[#d4af37] flex items-center justify-center text-[#d4af37] shrink-0 group-hover:bg-[#d4af37] group-hover:text-[#142646] transition-colors">
              <Phone size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1a2b49] dark:text-white mb-1 group-hover:text-[#d4af37] transition-colors">Landline</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">03 7020 3358</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded border border-[#d4af37] flex items-center justify-center text-[#d4af37] shrink-0 group-hover:bg-[#d4af37] group-hover:text-[#142646] transition-colors">
              <Smartphone size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1a2b49] dark:text-white mb-1 group-hover:text-[#d4af37] transition-colors">Mobile</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">0468 485 558</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded border border-[#d4af37] flex items-center justify-center text-[#d4af37] shrink-0 group-hover:bg-[#d4af37] group-hover:text-[#142646] transition-colors">
              <Mail size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1a2b49] dark:text-white mb-1 group-hover:text-[#d4af37] transition-colors">Email</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Ansar@gemca.com.au</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Info@gemca.com.au</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-start gap-4 group cursor-pointer">
            <div className="w-12 h-12 rounded border border-[#d4af37] flex items-center justify-center text-[#d4af37] shrink-0 group-hover:bg-[#d4af37] group-hover:text-[#142646] transition-colors">
              <MapPin size={20} />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1a2b49] dark:text-white mb-1 group-hover:text-[#d4af37] transition-colors">Address</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                313/89 Overton Road<br />
                Williams Landing VIC 3027<br />
                Victoria, Australia
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      <div className="w-full bg-[#0d1b33] py-4 text-center border-t border-[#1a2b49]">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[11px] text-gray-500 font-medium"
        >
          © 2025 GEMCA (Goraya Education & Migration Consultant Australia). All Rights Reserved.
        </motion.p>
      </div>
    </footer>
  );
}
