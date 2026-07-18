"use client";

import { Star, Quote } from "lucide-react";
import { motion, Variants } from "motion/react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Student Visa (Subclass 500)",
    text: "GEMCA made my university application and visa process completely stress-free. Their team was always available to answer my questions. I am now studying my dream course in Melbourne!",
    rating: 5
  },
  {
    name: "Rahul Sharma",
    role: "Skilled Independent (Subclass 189)",
    text: "Professional, transparent, and highly knowledgeable. They guided me through the complex skill assessment and state nomination process perfectly. Highly recommend their services.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Partner Visa (Subclass 820)",
    text: "Bringing my partner to Australia felt like an impossible mountain to climb, but the agents at GEMCA handled our case with so much care and expertise. Thank you for uniting our family.",
    rating: 5
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 bg-transparent   overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h4 className="text-[#d4af37] font-bold tracking-widest text-sm uppercase mb-3">Success Stories</h4>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2b49] dark:text-white mb-4">What Our Clients Say</h2>
          <div className="flex items-center justify-center w-full max-w-[200px]">
            <div className="h-[1px] w-full bg-[#d4af37]"></div>
            <div className="w-2 h-2 rounded-full bg-[#d4af37] mx-2"></div>
            <div className="h-[1px] w-full bg-[#d4af37]"></div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(212, 175, 55, 0.15), 0 8px 10px -6px rgba(212, 175, 55, 0.1)" }}
              className="bg-white dark:bg-[#0a1120] p-8 rounded-xl shadow-lg border border-gray-100 dark:border-white/5 relative group cursor-default transition-all duration-300"
            >
              <div className="absolute top-6 right-6 text-gray-200 dark:text-white/5 dark:text-white/5 group-hover:text-[#d4af37]/10 transition-colors">
                <Quote size={60} />
              </div>
              
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="fill-[#d4af37] text-[#d4af37]" size={16} />
                ))}
              </div>
              
              <p className="text-gray-800 dark:text-gray-100 mb-8 italic relative z-10 font-medium leading-relaxed min-h-[100px]">
                "{t.text}"
              </p>
              
              <div className="border-t border-gray-100 dark:border-white/10 pt-6 relative z-10 transition-colors">
                <h4 className="font-bold text-[#1a2b49] dark:text-white text-lg transition-colors">{t.name}</h4>
                <p className="text-sm font-semibold text-[#d4af37] mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
