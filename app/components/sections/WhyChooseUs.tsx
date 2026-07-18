"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const reasons = [
  "Registered Migration Agents (MARA)",
  "Transparent & Ethical Processes",
  "High Success Rate in Complex Cases",
  "Tailored Education & Career Pathways",
  "End-to-End Support System"
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="w-full py-24 bg-transparent   overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Image */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Team"
                className="w-full h-full object-cover"
              />
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-4 border-[#d4af37] rounded-lg m-4 opacity-80 pointer-events-none"></div>
            </div>
            
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              className="absolute -bottom-10 -right-10 bg-[#1a2b49] dark:bg-[#d4af37] text-[#1a2b49] dark:text-white dark:text-[#050b14] p-8 rounded-lg shadow-xl hidden md:block"
            >
              <div className="text-4xl font-bold text-[#d4af37] dark:text-[#050b14] mb-1">10+</div>
              <div className="text-sm font-semibold uppercase tracking-wider">Years of Trust</div>
            </motion.div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2"
          >
            <h4 className="text-[#d4af37] font-bold tracking-widest text-sm uppercase mb-3">About Us</h4>
            <h2 className="text-4xl font-bold text-[#1a2b49] dark:text-white mb-6 leading-tight">Why Choose GEMCA for Your Journey?</h2>
            <div className="w-16 h-1 bg-[#d4af37] mb-8"></div>
            
            <p className="text-gray-800 dark:text-gray-200 mb-8 text-lg font-medium leading-relaxed">
              We understand that migrating or studying in Australia is a life-changing decision. Our expert team of registered agents provides personalized, honest, and professional guidance to make your dream a reality.
            </p>

            <div className="space-y-4">
              {reasons.map((reason, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1), duration: 0.5 }}
                  className="flex items-center gap-4 bg-[#fafafa] dark:bg-[#0a1120] p-4 rounded border border-gray-100 dark:border-white/5 hover:border-[#d4af37] dark:hover:border-[#d4af37] transition-colors cursor-default"
                >
                  <CheckCircle className="text-[#d4af37] shrink-0" size={24} />
                  <span className="font-semibold text-[#1a2b49] dark:text-gray-200">{reason}</span>
                </motion.div>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
