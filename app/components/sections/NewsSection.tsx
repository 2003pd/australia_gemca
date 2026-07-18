"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { motion, Variants } from "motion/react";
import Link from "next/link";

const news = [
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    date: "July 12, 2026",
    category: "Visa Updates",
    title: "New Changes to the Temporary Graduate Visa (Subclass 485)",
    desc: "The Department of Home Affairs has announced significant changes regarding age limits and stay periods for international graduates."
  },
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800",
    date: "July 05, 2026",
    category: "Education",
    title: "Top Universities in Australia for International Students in 2026",
    desc: "Discover which Australian institutions are currently leading the global rankings and offering the best scholarships."
  },
  {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    date: "June 28, 2026",
    category: "Migration",
    title: "State Nomination Programs Reopen: What You Need to Know",
    desc: "Several Australian states have reopened their subclass 190 and 491 programs. Here is our comprehensive guide to applying."
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
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function NewsSection() {
  return (
    <section id="news" className="w-full py-24 bg-transparent   overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between mb-16"
        >
          <div>
            <h4 className="text-[#d4af37] font-bold tracking-widest text-sm uppercase mb-3">Latest Insights</h4>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2b49] dark:text-white mb-4">News & Updates</h2>
            <div className="w-16 h-1 bg-[#d4af37]"></div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 text-[#1a2b49] dark:text-white font-bold mt-8 md:mt-0 group transition-colors"
          >
            VIEW ALL POSTS 
            <motion.span 
              className="bg-[#1a2b49]  text-[#1a2b49] dark:text-white p-2 rounded-full group-hover:bg-[#d4af37] dark:group-hover:bg-[#d4af37] transition-colors"
            >
              <ArrowRight size={14} />
            </motion.span>
          </motion.button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {news.map((item, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              className="bg-white dark:bg-[#050b14] rounded-xl shadow-md border border-gray-100 dark:border-white/5 overflow-hidden group cursor-pointer transition-colors"
            >
              <div className="h-48 overflow-hidden relative">
                <motion.div 
                  className="w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute top-4 left-4 bg-[#d4af37] text-[#1a2b49] dark:text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                  {item.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs font-semibold mb-3 transition-colors">
                  <Calendar size={14} />
                  {item.date}
                </div>
                <h3 className="font-bold text-lg text-[#1a2b49] dark:text-white mb-3 leading-tight group-hover:text-[#d4af37] dark:group-hover:text-[#d4af37] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed font-medium mb-6 transition-colors">
                  {item.desc}
                </p>
                <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-[#1a2b49] dark:text-gray-300 group-hover:text-[#d4af37] dark:group-hover:text-[#d4af37] transition-colors">
                  READ MORE <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="md:hidden flex items-center justify-center w-full gap-2 text-[#1a2b49] dark:text-white font-bold mt-10 group transition-colors"
        >
          VIEW ALL POSTS 
          <span className="bg-[#1a2b49]  text-[#1a2b49] dark:text-white p-2 rounded-full group-hover:bg-[#d4af37] dark:group-hover:bg-[#d4af37] transition-colors">
            <ArrowRight size={14} />
          </span>
        </motion.button>

      </div>
    </section>
  );
}
