"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { motion } from "motion/react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  GraduationCap,
  Landmark,
  Mail,
  Map,
  Plane,
  ShieldCheck,
  Sparkle,
  WalletCards,
} from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import Premium3DIcon from "../ui/Premium3DIcon";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=900&auto=format&fit=crop",
    alt: "Modern university library and study space",
    label: "Campus life",
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=900&auto=format&fit=crop",
    alt: "Students collaborating on study plans",
    label: "Student support",
  },
  {
    src: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=900&auto=format&fit=crop",
    alt: "Sydney harbour and Australian city skyline",
    label: "Australian cities",
  },
];

const disciplines = [
  {
    title: "Business",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Information Technology",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Nursing",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Engineering",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Hospitality",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Community Services",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=900&auto=format&fit=crop",
  },
];

const cityCards = [
  {
    city: "Melbourne",
    text: "Strong education ecosystem with lifestyle, transport, and part-time work options.",
    accent: "Victoria",
    image: "https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=1000&auto=format&fit=crop",
  },
  {
    city: "Sydney",
    text: "Global business, technology, and hospitality programs with high student demand.",
    accent: "New South Wales",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    city: "Regional Australia",
    text: "Study pathways that may support longer-term regional planning and affordability.",
    accent: "Regional options",
    image: "/premium-hero-bg.png",
  },
];

const steps = [
  {
    icon: BookOpenCheck,
    title: "Course Match",
    text: "Shortlist courses by background, budget, English level, career plan, and location preference.",
  },
  {
    icon: Building2,
    title: "Admission",
    text: "Prepare application documents, academic evidence, English scores, and provider requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Visa Strategy",
    text: "Build a Genuine Student narrative with financial, academic, and future-plan evidence.",
  },
  {
    icon: Plane,
    title: "Arrival Plan",
    text: "Plan OSHC, accommodation, orientation, work readiness, and next-step pathway guidance.",
  },
];

const support = [
  "University and college shortlisting",
  "Offer letter and COE guidance",
  "Genuine Student statement support",
  "Financial evidence checklist",
  "OSHC and pre-departure planning",
  "Family and dependent document review",
];

const studyServices = [
  {
    icon: ShieldCheck,
    title: "Student Visa (500)",
    text: "Student visa planning, evidence checklist, Genuine Student logic, OSHC and lodgement readiness.",
  },
  {
    icon: Landmark,
    title: "Universities",
    text: "Shortlist Australian universities by course, ranking, intake, fees, city and admission requirements.",
  },
  {
    icon: Building2,
    title: "Colleges",
    text: "Compare college pathways, diplomas, packaged offers, VET courses and progression options.",
  },
  {
    icon: WalletCards,
    title: "Scholarships",
    text: "Review scholarship options, eligibility, academic profile fit and required supporting documents.",
  },
  {
    icon: BookOpenCheck,
    title: "GTE Assistance",
    text: "Prepare a stronger Genuine Temporary Entrant or Genuine Student explanation with clean supporting logic.",
  },
  {
    icon: GraduationCap,
    title: "Course Selection",
    text: "Choose a course that fits your academics, budget, career plan and future study pathway.",
  },
  {
    icon: Map,
    title: "Student Accommodation",
    text: "Understand campus housing, private rentals, shared accommodation and arrival planning basics.",
  },
];

function StudyScene() {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const constellation = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => {
        const angle = index * 1.618;
        const radius = 1.9 + (index % 7) * 0.22;
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(index * 0.7) * 1.2,
          z: Math.sin(angle) * radius - 1.4,
          scale: 0.035 + (index % 5) * 0.01,
          color: index % 3 === 0 ? "#d4af37" : index % 3 === 1 ? "#6f9fdc" : "#ffffff",
        };
      }),
    []
  );

  useEffect(() => {
    const move = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = elapsed * 0.12 + mouse.current.x * 0.12;
      group.current.rotation.x = -0.16 + mouse.current.y * 0.08;
    }

    if (rings.current) {
      rings.current.rotation.z = elapsed * 0.18;
      rings.current.rotation.y = elapsed * 0.08;
    }

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current.x * 0.55, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -mouse.current.y * 0.32, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#07111f"]} />
      <fog attach="fog" args={["#07111f", 4.5, 12]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 5, 4]} intensity={2.6} color="#fff1c6" />
      <pointLight position={[-4, 1.5, 2]} intensity={3.6} color="#6f9fdc" />
      <pointLight position={[3, -2, 2]} intensity={3.8} color="#d4af37" />

      <group ref={group} position={[0.65, 0.05, 0]}>
        <Float speed={1.25} rotationIntensity={0.55} floatIntensity={0.75}>
          <group>
            <mesh rotation={[0.12, -0.28, 0.12]}>
              <boxGeometry args={[1.95, 0.12, 1.36]} />
              <meshStandardMaterial color="#f7f3ea" roughness={0.24} metalness={0.18} />
            </mesh>
            <mesh position={[0, 0.12, 0]} rotation={[0.12, -0.28, 0.12]}>
              <boxGeometry args={[1.82, 0.035, 1.24]} />
              <meshStandardMaterial color="#0e2348" roughness={0.35} metalness={0.32} />
            </mesh>
            <mesh position={[-0.72, 0.18, 0.34]} rotation={[0.12, -0.28, 0.12]}>
              <boxGeometry args={[0.36, 0.018, 0.08]} />
              <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.75} />
            </mesh>
            <mesh position={[-0.08, 0.18, 0.18]} rotation={[0.12, -0.28, 0.12]}>
              <boxGeometry args={[0.96, 0.018, 0.045]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.28} />
            </mesh>
            <mesh position={[-0.04, 0.18, 0]} rotation={[0.12, -0.28, 0.12]}>
              <boxGeometry args={[1.05, 0.018, 0.045]} />
              <meshStandardMaterial color="#6f9fdc" emissive="#6f9fdc" emissiveIntensity={0.55} />
            </mesh>
          </group>
        </Float>

        <Float speed={1} rotationIntensity={0.35} floatIntensity={0.9}>
          <group position={[-0.15, 1.05, -0.1]} rotation={[0.2, 0.35, 0]}>
            <mesh>
              <cylinderGeometry args={[0.78, 0.78, 0.08, 4]} />
              <meshStandardMaterial color="#d4af37" roughness={0.18} metalness={0.58} />
            </mesh>
            <mesh position={[0, -0.18, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[1.06, 0.05, 0.08]} />
              <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.56} />
            </mesh>
            <mesh position={[0.55, -0.34, 0]}>
              <cylinderGeometry args={[0.025, 0.025, 0.55, 12]} />
              <meshStandardMaterial color="#f7f3ea" emissive="#f7f3ea" emissiveIntensity={0.2} />
            </mesh>
            <mesh position={[0.55, -0.68, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.45} />
            </mesh>
          </group>
        </Float>

        <group ref={rings} position={[0, 0.15, -0.2]}>
          {[1.7, 2.1, 2.5].map((radius, index) => (
            <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.55]}>
              <torusGeometry args={[radius, 0.006, 8, 96]} />
              <meshStandardMaterial
                color={index === 1 ? "#d4af37" : "#6f9fdc"}
                emissive={index === 1 ? "#d4af37" : "#6f9fdc"}
                emissiveIntensity={0.9 - index * 0.18}
                transparent
                opacity={0.62}
              />
            </mesh>
          ))}
        </group>

        {constellation.map((point, index) => (
          <Float key={index} speed={0.9 + (index % 4) * 0.08} rotationIntensity={0.5} floatIntensity={0.55}>
            <mesh position={[point.x, point.y, point.z]}>
              <octahedronGeometry args={[point.scale, 0]} />
              <meshStandardMaterial color={point.color} emissive={point.color} emissiveIntensity={0.45} metalness={0.55} roughness={0.2} />
            </mesh>
          </Float>
        ))}
      </group>

      <Sparkles count={95} scale={[8, 4.8, 8]} speed={0.32} size={2.1} color="#d4af37" opacity={0.28} />
    </>
  );
}

function StudyHeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 42 }} dpr={[1, 1.6]}>
        <StudyScene />
      </Canvas>
    </div>
  );
}

export default function StudyInAustraliaExperience() {
  return (
    <div className="overflow-hidden bg-[#07111f] text-white">
      <section className="relative overflow-hidden">
        <StudyHeroCanvas />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(7,17,31,0.98)_0%,rgba(7,17,31,0.82)_42%,rgba(7,17,31,0.38)_100%)]" />
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:54px_54px] opacity-45" />

        <div className="relative z-[2] mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-6 pb-14 pt-32 lg:min-h-[660px] lg:grid-cols-[0.98fr_0.72fr] lg:px-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#d4af37] backdrop-blur-xl"
            >
              <Sparkle size={15} />
              Study in Australia
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              style={{ opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl font-serif text-4xl font-semibold italic leading-[1.06] tracking-normal sm:text-5xl"
            >
              Build your Australian study pathway.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.75 }}
              className="mt-6 max-w-2xl text-base leading-7 text-white/68"
            >
              Course selection, admissions, Genuine Student preparation, student visa strategy, and arrival planning
              in one premium advisory experience.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ opacity: 1 }}
              transition={{ delay: 0.32, duration: 0.75 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link href="mailto:ansar@gemca.com.au" className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#d4af37] px-6 text-[11px] font-black uppercase tracking-[0.16em] text-[#07111f] shadow-[0_24px_80px_rgba(212,175,55,0.24)] transition hover:bg-white">
                Start Counselling
                <ArrowRight size={15} />
              </Link>
              <a href="#pathways" className="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/14 bg-white/[0.05] px-6 text-[11px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl transition hover:border-[#d4af37] hover:text-[#d4af37]">
                Explore Pathways
                <GraduationCap size={16} />
              </a>
            </motion.div>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {heroImages.map((image) => (
                <div key={image.label} className="group relative h-24 overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover opacity-72 transition duration-500 group-hover:scale-105 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/86 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 text-[10px] font-black uppercase tracking-[0.18em] text-white">
                    {image.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 26 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="rounded-[26px] border border-white/12 bg-white/[0.075] p-5 shadow-[0_26px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl"
          >
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37]">Premium planner</p>
            <div className="mt-5 grid gap-3">
              {[
                ["Course fit", "Study options matched to your profile"],
                ["Visa readiness", "Evidence strategy before lodgement"],
                ["Future plan", "Career and pathway logic made clear"],
              ].map(([label, text]) => (
                <div key={label} className="flex gap-4 rounded-2xl border border-white/10 bg-[#07111f]/50 p-4">
                  <BadgeCheck className="mt-1 shrink-0 text-[#d4af37]" size={21} />
                  <div>
                    <h2 className="text-sm font-black uppercase tracking-[0.1em]">{label}</h2>
                    <p className="mt-1 text-sm leading-6 text-white/56">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#07111f] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#d4af37]">Study support</p>
              <h2 className="font-serif text-3xl font-semibold italic leading-tight md:text-4xl">
                Everything you need for a stronger study plan.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-white/62">
              From Student Visa 500 to course selection, universities, colleges, scholarships and accommodation,
              GEMCA helps you prepare the pathway before you commit.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {studyServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className={`group border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/45 hover:bg-white/[0.085] ${
                    index === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className="mb-7 flex items-center justify-between">
                    <Premium3DIcon Icon={Icon} />
                    <span className="text-3xl font-black text-white/10">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase leading-tight text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pathways" className="bg-[#f7f3ea] px-6 py-16 text-[#0a1f44] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#b8942f]">Course direction</p>
              <h2 className="font-serif text-3xl font-semibold italic leading-tight md:text-4xl">
                Choose a study plan that makes sense after graduation.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#536079]">
              GEMCA helps align admissions, Genuine Student evidence, work goals, finances, and long-term pathway
              thinking before you commit to a course.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((item, index) => (
              <article key={item.title} className="group overflow-hidden border border-[#0a1f44]/10 bg-white shadow-[0_16px_50px_rgba(10,31,68,0.06)] transition hover:-translate-y-1 hover:border-[#d4af37]/50 hover:shadow-[0_24px_80px_rgba(10,31,68,0.12)]">
                <div className="relative h-40 overflow-hidden bg-[#07111f]">
                  <img
                    src={item.image}
                    alt={`${item.title} study pathway in Australia`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/75 via-transparent to-transparent" />
                  <span className="absolute bottom-4 right-4 text-4xl font-black text-white/22">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <GraduationCap className="text-[#2e5fa3]" size={24} />
                    <span className="rounded-full border border-[#0a1f44]/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#5a6478]">
                      Course fit
                    </span>
                  </div>
                  <h3 className="text-xl font-black uppercase">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5a6478]">
                    Compare providers, entry requirements, fees, duration, and student visa evidence expectations.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="study-cities" className="bg-white px-6 py-16 text-[#0a1f44] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-4xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#b8942f]">Where to study</p>
            <h2 className="font-serif text-3xl font-semibold italic leading-tight md:text-4xl">
              Match your city to your budget, lifestyle, and pathway.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5a6478]">
              Compare campus lifestyle, living costs, transport, work access, and long-term study goals before
              choosing your destination.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {cityCards.map((item) => (
              <article key={item.city} className="group overflow-hidden border border-[#0a1f44]/10 bg-[#f7f9fc] shadow-[0_18px_60px_rgba(10,31,68,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/50 hover:shadow-[0_28px_90px_rgba(10,31,68,0.13)]">
                <div className="relative h-44 overflow-hidden bg-[#07111f]">
                  <img
                    src={item.image}
                    alt={`${item.city} study destination in Australia`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07111f]/70 via-transparent to-transparent" />
                  <Premium3DIcon Icon={Map} size="sm" className="absolute bottom-4 left-4" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2e5fa3]">{item.accent}</p>
                  <h3 className="mt-1 text-xl font-black uppercase">{item.city}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5a6478]">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#07111f] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#d4af37]">How GEMCA helps</p>
            <h2 className="font-serif text-3xl font-semibold italic leading-tight md:text-4xl">
              From course idea to arrival plan.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.title} className="rounded-[22px] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
                  <div className="mb-7 flex items-center justify-between">
                    <Icon className="text-[#d4af37]" size={25} />
                    <span className="text-4xl font-black text-white/10">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/58">{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ea] px-6 py-16 text-[#0a1f44] lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#b8942f]">Document strength</p>
            <h2 className="font-serif text-3xl font-semibold italic leading-tight md:text-4xl">
              A cleaner file before the application starts.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5a6478]">
              The strongest student pathway is not only about a course. It is about a clear reason, credible funding,
              academic progression, and future intent.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {support.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#0a1f44]/10 bg-white p-4">
                <CheckCircle2 className="mt-1 shrink-0 text-[#2e5fa3]" size={18} />
                <p className="text-sm font-bold leading-6 text-[#2a3348]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-[#0a1f44] lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            { icon: Landmark, value: "Provider", label: "University and college comparison" },
            { icon: WalletCards, value: "Budget", label: "Fees, living costs, and evidence review" },
            { icon: GraduationCap, value: "Pathway", label: "Study logic and future plan" },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.value} className="rounded-[22px] border border-[#0a1f44]/10 bg-[#f7f9fc] p-6">
                <Icon className="mb-7 text-[#d4af37]" size={28} />
                <h3 className="text-3xl font-black uppercase">{item.value}</h3>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-[#5a6478]">{item.label}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-[#07111f] px-6 py-16 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[30px] border border-[#d4af37]/30 bg-white/[0.06] p-7 shadow-[0_32px_110px_rgba(0,0,0,0.24)] backdrop-blur-xl lg:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(212,175,55,0.18),transparent_34%,rgba(111,159,220,0.18))]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.26em] text-[#d4af37]">Start with clarity</p>
              <h2 className="font-serif text-3xl font-semibold italic leading-tight md:text-4xl">
                Get your study plan reviewed before you apply.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
                GEMCA can help you compare courses, understand documents, prepare your Genuine Student logic, and
                move with a cleaner plan.
              </p>
            </div>
            <Link href="mailto:ansar@gemca.com.au" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#d4af37] px-7 text-xs font-black uppercase tracking-[0.18em] text-[#07111f] transition hover:bg-white">
              Book Consultation
              <Mail size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
