"use client";

import { GraduationCap, Users, Shield, Handshake, Plane, Globe, ArrowRight, LucideIcon } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring, type MotionValue } from "motion/react";
import Premium3DIcon from "../ui/Premium3DIcon";

const services = [
  {
    icon: GraduationCap,
    title: "STUDENT VISAS",
    desc: "Guiding you to top Australian institutions. We handle course selection, university admissions, and the complete subclass 500 visa process."
  },
  {
    icon: Users,
    title: "SKILLED MIGRATION",
    desc: "Expert assistance with Subclass 189, 190, and 491 visas. We navigate skill assessments and state sponsorships on your behalf."
  },
  {
    icon: Shield,
    title: "EMPLOYER SPONSORED",
    desc: "Connecting skilled professionals with Australian employers. Comprehensive support for TSS 482 and ENS 186 visa applications."
  },
  {
    icon: Handshake,
    title: "PARTNER & FAMILY",
    desc: "Reuniting loved ones in Australia. Dedicated management of complex partner, parent, and child visa applications."
  },
  {
    icon: Plane,
    title: "VISITOR VISAS",
    desc: "Seamless processing for tourist and business visitor visas. Ensuring all documentation is perfectly aligned for quick grants."
  },
  {
    icon: Globe,
    title: "AAT APPEALS",
    desc: "Professional representation for visa refusals and cancellations. Strategic advice and tribunal advocacy by registered agents."
  }
];

function Interactive3DIcon({ Icon, mouseX, mouseY }: { Icon: LucideIcon; mouseX: MotionValue<number>; mouseY: MotionValue<number> }) {
  // Map coordinate range [-0.5, 0.5] to 3D rotation angles
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

  // Translate glare position
  const shineX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  return (
    <div
      className="relative w-14 h-14 mb-6 flex items-center justify-center rounded-2xl bg-transparent select-none"
      style={{ perspective: 400, transformStyle: "preserve-3d" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full"
      >
        <motion.div
          className="pointer-events-none absolute -inset-2 z-10 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-70 bg-[radial-gradient(circle_at_var(--shine-x)_var(--shine-y),rgba(255,255,255,0.46)_0%,transparent_58%)]"
          style={{
            "--shine-x": shineX,
            "--shine-y": shineY,
          } as React.CSSProperties}
        />
        <Premium3DIcon Icon={Icon} />
      </motion.div>
    </div>
  );
}

function ServiceCard({ service, i }: { service: typeof services[0]; i: number }) {
  const Icon = service.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid hover transitions without snapping
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    x.set((e.clientX - rect.left) / width - 0.5);
    y.set((e.clientY - rect.top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-[#0a1120] p-8 rounded border border-gray-100 dark:border-white/5 hover:border-[#d4af37] dark:hover:border-[#d4af37] transition-colors group shadow-sm hover:shadow-lg cursor-pointer flex flex-col items-start"
      style={{ transformStyle: "preserve-3d" }}
    >
      <Interactive3DIcon Icon={Icon} mouseX={mouseX} mouseY={mouseY} />
      
      <h3 className="text-xl font-bold text-[#1a2b49] dark:text-white mb-3">{service.title}</h3>
      <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed font-medium mb-6">
        {service.desc}
      </p>
      
      <div className="flex items-center text-sm font-bold text-[#1a2b49] dark:text-[#d4af37] group-hover:text-[#d4af37] dark:group-hover:text-[#2E5FA3] transition-colors mt-auto">
        EXPLORE <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
      </div>
    </motion.div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="services" className="w-full py-24 bg-transparent transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        <div className="mb-16">
          <h4 className="text-[#d4af37] font-bold tracking-widest text-sm uppercase mb-3">Our Core Services</h4>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2b49] dark:text-white mb-4">Pathways to Australia</h2>
          <div className="w-16 h-1 bg-[#d4af37]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
