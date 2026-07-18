"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles as DreiSparkles } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock,
  FileCheck2,
  Landmark,
  Mail,
  MousePointer2,
  Plane,
  ShieldCheck,
  Star,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Processing context", value: "Invite based", icon: Clock },
  { label: "Visa fee", value: "From AUD 4,765", icon: Landmark },
  { label: "Stay", value: "Permanent", icon: Trophy },
  { label: "Applications", value: "EOI first", icon: FileCheck2 },
];

const eligibility = [
  "Occupation must be on the relevant skilled occupation list.",
  "Skills assessment must be suitable for the nominated occupation.",
  "Expression of Interest is lodged through SkillSelect.",
  "Applicant must meet points-test requirements and receive an invitation.",
  "Age, English, health, character and debt requirements must be satisfied.",
];

const documents = [
  "Passport and identity documents",
  "Skills assessment outcome",
  "English test evidence",
  "Employment references and payslips",
  "Qualification records and transcripts",
  "Police checks and health examination",
  "Partner and dependent documents",
  "EOI and invitation evidence",
];

const process = [
  { title: "Eligibility", text: "Check occupation, points, age, English and assessment pathway." },
  { title: "Documents", text: "Prepare identity, skills, work history, English and family evidence." },
  { title: "Application", text: "Submit EOI, wait for invitation, then lodge a complete visa application." },
  { title: "Grant", text: "Respond to requests, complete health and character checks, and await decision." },
];

const faqs = [
  {
    q: "Is subclass 189 a permanent visa?",
    a: "Yes. The subclass 189 Skilled Independent visa is a permanent visa for invited skilled workers who are not sponsored by an employer, state or family member.",
  },
  {
    q: "Do I need state nomination for subclass 189?",
    a: "No. Subclass 189 is independent. If you need nomination points, compare subclass 190 or subclass 491 instead.",
  },
  {
    q: "Is 65 points enough?",
    a: "65 is the legal threshold for many points-tested skilled visas, but competitive invitation scores can be higher depending on occupation and invitation rounds.",
  },
  {
    q: "Can GEMCA check my documents?",
    a: "Yes. GEMCA can review your pathway, points position, skills assessment evidence and application document strategy before lodgement.",
  },
];

function getUsableImageUrl(value?: string | null) {
  if (!value) {
    return null;
  }

  return value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://") ? value : null;
}

function VisaScene() {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.08 + mouse.current.x * 0.12;
    group.current.rotation.x = mouse.current.y * 0.05;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouse.current.x * 0.45, 0.035);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -mouse.current.y * 0.28, 0.035);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <fog attach="fog" args={["#ffffff", 4, 12]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[4, 5, 3]} intensity={2.4} color="#fff5d6" />
      <pointLight position={[-3, 2, 2]} intensity={4} color="#c9a227" />
      <pointLight position={[3, -2, 1]} intensity={2.3} color="#2e5fa3" />

      <group ref={group}>
        {Array.from({ length: 14 }).map((_, index) => {
          const angle = (index / 14) * Math.PI * 2;
          const radius = 2.5 + (index % 3) * 0.35;
          return (
            <Float key={index} speed={1 + index * 0.03} rotationIntensity={1} floatIntensity={1.2}>
              <mesh position={[Math.cos(angle) * radius, Math.sin(angle * 1.4) * 0.7, Math.sin(angle) * radius - 1.5]}>
                <octahedronGeometry args={[0.08 + (index % 4) * 0.018, 0]} />
                <meshStandardMaterial color={index % 2 ? "#C9A227" : "#ffffff"} roughness={0.2} metalness={0.65} />
              </mesh>
            </Float>
          );
        })}

        {Array.from({ length: 7 }).map((_, index) => (
          <mesh key={index} position={[-2.8 + index * 0.9, -1.2 + Math.sin(index) * 0.28, -2.6]} rotation={[0.4, 0.1, -0.45]}>
            <boxGeometry args={[0.68, 0.012, 0.012]} />
            <meshStandardMaterial emissive="#C9A227" emissiveIntensity={1.4} color="#C9A227" />
          </mesh>
        ))}
      </group>

      <DreiSparkles count={90} scale={[7, 4, 7]} speed={0.35} size={2.2} color="#C9A227" opacity={0.42} />
    </>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="visa-glass-card overflow-hidden border border-[#0a1f44]/10 bg-white/70">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group flex w-full items-center justify-between gap-5 p-6 text-left"
      >
        <span className="text-lg font-black uppercase leading-tight text-[#0a1f44]">{q}</span>
        <ChevronDown className={`shrink-0 text-[#c9a227] transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
            animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
            exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 leading-8 text-[#5a6478]">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function VisaDetailExperience({ dbVisa }: { dbVisa?: any }) {
  const visaName = dbVisa ? dbVisa.name : "Skilled Independent Visa";
  const subclass = dbVisa ? dbVisa.subclass : "189";
  const description = dbVisa ? dbVisa.summary : "A points-tested permanent visa for invited skilled workers who can qualify without state, employer or family sponsorship.";
  const heroImage = getUsableImageUrl(dbVisa?.heroImage);
  const featuredImage = getUsableImageUrl(dbVisa?.seoOgImage);
  
  // Dynamic stats mapping
  const displayStats = dbVisa ? [
    { label: "Stay Duration", value: dbVisa.stay || "Permanent", icon: Clock },
    { label: "Base Visa Fee", value: `From AUD ${parseFloat(dbVisa.baseCost || "0").toLocaleString()}`, icon: Landmark },
    { label: "Travel Rights", value: dbVisa.travel || "5 Years", icon: Plane },
    { label: "Work Rights", value: dbVisa.work || "Full Rights", icon: ShieldCheck },
  ] : stats;

  // Dynamic lists
  const displayEligibility = dbVisa && dbVisa.eligibilities && dbVisa.eligibilities.length > 0 
    ? dbVisa.eligibilities.map((e: any) => e.description || e.title)
    : eligibility;

  const displayDocuments = dbVisa && dbVisa.documents && dbVisa.documents.length > 0
    ? dbVisa.documents.map((d: any) => d.name)
    : documents;

  const displayProcess = dbVisa && dbVisa.steps && dbVisa.steps.length > 0
    ? dbVisa.steps.map((s: any) => ({ title: s.title, text: s.description }))
    : process;

  const displayFaqs = dbVisa && dbVisa.faqs && dbVisa.faqs.length > 0
    ? dbVisa.faqs.map((f: any) => ({ q: f.question, a: f.answer }))
    : faqs;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-visa-reveal]",
        { y: 60, opacity: 0, rotateX: 8, filter: "blur(14px)" },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-visa-root]",
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-visa-section]").forEach((section) => {
        gsap.fromTo(
          section,
          { y: 110, scale: 0.96, opacity: 0, filter: "blur(18px)" },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".visa-glass-card").forEach((card) => {
        const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.35, ease: "power3.out" });
        const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.35, ease: "power3.out" });
        const y = gsap.quickTo(card, "y", { duration: 0.35, ease: "power3.out" });

        const move = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          rotateY(((event.clientX - rect.left) / rect.width - 0.5) * 10);
          rotateX(((event.clientY - rect.top) / rect.height - 0.5) * -10);
          y(-8);
        };

        const moveHandler = (e: Event) => move(e as MouseEvent);
        const leave = () => {
          rotateX(0);
          rotateY(0);
          y(0);
        };

        card.addEventListener("mousemove", moveHandler);
        card.addEventListener("mouseleave", leave);
      });

      gsap.to(".visa-progress-beam", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-visa-root]",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div data-visa-root className="relative overflow-hidden bg-white">
      <div className="visa-progress-beam fixed left-0 top-0 z-[10001] h-1 w-full origin-left scale-x-0 bg-[#c9a227]" />
      
      {/* Dynamic Hero Banner background overlay */}
      {heroImage && (
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <img 
            src={heroImage} 
            alt="Hero Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>
      )}

      <div className="pointer-events-none fixed inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.6]}>
          <VisaScene />
        </Canvas>
      </div>

      <section className="relative z-10 min-h-screen px-6 pb-20 pt-40 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div data-visa-reveal>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#0a1f44]/10 bg-white/65 px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-[#0a1f44] shadow-[0_20px_80px_rgba(10,31,68,0.08)] backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.8)]" />
              Live pathway guide
            </div>
            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.92] tracking-normal text-[#0a1f44] md:text-7xl lg:text-8xl">
              Subclass {subclass} {visaName}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.75 }}
              className="mt-8 max-w-2xl text-lg leading-8 text-[#5a6478]"
            >
              {description}
            </motion.p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="mailto:ansar@gemca.com.au" className="visa-magnetic-btn group inline-flex items-center gap-3 bg-[#0a1f44] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_22px_60px_rgba(10,31,68,0.22)]">
                Book Consultation
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#eligibility" className="visa-magnetic-btn inline-flex items-center gap-3 border border-[#0a1f44]/15 bg-white/70 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#0a1f44] backdrop-blur-xl">
                Explore Eligibility
                <MousePointer2 size={15} />
              </a>
            </div>
          </div>

          <div className="relative min-h-[520px] flex items-center justify-center" data-visa-reveal>
            {dbVisa ? (
              <div className="relative w-full max-w-[440px] h-[480px] rounded-3xl overflow-hidden border border-[#0a1f44]/10 shadow-[0_30px_90px_rgba(10,31,68,0.16)] bg-[#faf6f0]">
                {/* Featured Image */}
                {featuredImage ? (
                  <img 
                    src={featuredImage} 
                    alt={dbVisa.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-tr from-[#0a1f44] to-[#2e5fa3] text-white">
                    <Plane className="text-[#c9a227] w-12 h-12 mb-4 animate-bounce" />
                    <p className="text-xl font-black uppercase">{dbVisa.name}</p>
                    <p className="text-sm opacity-60 mt-1">Subclass {dbVisa.subclass}</p>
                  </div>
                )}
                {/* Floating badge for status */}
                <div className="absolute top-6 left-6 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                  {dbVisa.status || "Published"}
                </div>
                {/* Floating badge for subclass card */}
                <div className="absolute bottom-6 right-6 bg-[#0a1f44] text-white p-6 rounded-2xl shadow-2xl min-w-[150px] border border-white/10">
                  <p className="text-3xl font-black text-[#c9a227]">{dbVisa.subclass}</p>
                  <p className="text-[10px] uppercase font-bold text-white/50 tracking-wider mt-1">{dbVisa.category?.name || "Visa Pathway"}</p>
                </div>
              </div>
            ) : (
              <>
                <div className="visa-float-card absolute left-4 top-12 w-72 rotate-[-7deg] rounded-[28px] border border-white/70 bg-white/65 p-6 shadow-[0_30px_90px_rgba(10,31,68,0.16)] backdrop-blur-xl">
                  <div className="mb-12 flex items-center justify-between">
                    <BadgeCheck className="text-[#c9a227]" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[#5a6478]">Visa Card</span>
                  </div>
                  <p className="text-5xl font-black text-[#0a1f44]">189</p>
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.12em] text-[#5a6478]">Skilled Independent</p>
                </div>

                <div className="visa-float-card absolute right-0 top-36 w-64 rotate-[8deg] rounded-[24px] border border-[#0a1f44]/10 bg-[#0a1f44] p-6 text-white shadow-[0_35px_100px_rgba(10,31,68,0.28)]">
                  <Plane className="mb-10 text-[#c9a227]" />
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/45">Australian pathway</p>
                  <p className="mt-3 text-3xl font-black uppercase leading-tight">Permanent residence pathway</p>
                </div>

                <div className="visa-float-card absolute bottom-16 left-24 w-72 rotate-[3deg] rounded-[26px] border border-[#0a1f44]/10 bg-white/75 p-6 shadow-[0_28px_90px_rgba(10,31,68,0.12)] backdrop-blur-xl">
                  <FileCheck2 className="mb-7 text-[#2e5fa3]" />
                  <p className="text-xl font-black uppercase text-[#0a1f44]">Expression of Interest</p>
                  <p className="mt-3 leading-7 text-[#5a6478]">EOI first, invitation second, complete application third.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24 lg:px-8" data-visa-section>
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          {displayStats.map((stat: any) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="visa-glass-card rounded-[26px] border border-[#0a1f44]/10 bg-white/70 p-6 shadow-[0_24px_80px_rgba(10,31,68,0.08)] backdrop-blur-xl">
                <Icon className="mb-10 text-[#c9a227]" size={30} />
                <div className="text-3xl font-black uppercase text-[#0a1f44]">{stat.value}</div>
                <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[#5a6478]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="eligibility" className="relative z-10 px-6 py-24 lg:px-8" data-visa-section>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#c9a227]">Eligibility</p>
            <h2 className="text-4xl font-black uppercase leading-tight text-[#0a1f44] md:text-6xl">
              The core requirements at a glance.
            </h2>
          </div>
          <div className="grid gap-4">
            {displayEligibility.map((item: any, index: number) => (
              <div key={item} className="visa-glass-card flex gap-5 rounded-[24px] border border-[#0a1f44]/10 bg-white/72 p-6 shadow-[0_22px_70px_rgba(10,31,68,0.07)] backdrop-blur-xl">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#0a1f44] text-sm font-black text-white">
                  {index + 1}
                </div>
                <p className="text-lg font-semibold leading-8 text-[#2a3348]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-[#0a1f44] px-6 py-24 text-white lg:px-8" data-visa-section>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(201,162,39,0.24),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(111,159,220,0.2),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#c9a227]">Floating Timeline</p>
            <h2 className="text-4xl font-black uppercase leading-tight md:text-6xl">
              Processing steps with cinematic depth.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-4">
            {displayProcess.map((step: any, index: number) => (
              <div key={step.title} className="visa-glass-card relative rounded-[28px] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-xl">
                <div className="mb-12 text-6xl font-black text-[#c9a227]">{String(index + 1).padStart(2, "0")}</div>
                <h3 className="text-2xl font-black uppercase">{step.title}</h3>
                <p className="mt-4 leading-8 text-white/62">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 overflow-hidden bg-white px-6 py-20 lg:px-8" data-visa-section>
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#c9a227]">Document Checklist</p>
            <h2 className="text-3xl font-black uppercase leading-tight text-[#0a1f44] md:text-5xl">
              Evidence cards for your application.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {displayDocuments.map((item: any) => (
              <div key={item} className="rounded-2xl border border-[#0a1f44]/10 bg-white p-5 shadow-[0_14px_40px_rgba(10,31,68,0.06)]">
                <Check className="mb-8 text-[#c9a227]" />
                <p className="font-black uppercase leading-tight text-[#0a1f44]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24 lg:px-8" data-visa-section>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#c9a227]">FAQ</p>
            <h2 className="text-4xl font-black uppercase leading-tight text-[#0a1f44] md:text-6xl">
              Answers before the consultation.
            </h2>
          </div>
          <div className="grid gap-4">
            {displayFaqs.map((faq: any, index: number) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-28 lg:px-8" data-visa-section>
        <div className="visa-cta-panel relative mx-auto max-w-7xl overflow-hidden rounded-[38px] border border-[#c9a227]/35 bg-[#0a1f44] p-8 text-white shadow-[0_40px_140px_rgba(10,31,68,0.28)] lg:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.35),transparent_28%),linear-gradient(120deg,rgba(255,255,255,0.08),transparent_35%,rgba(201,162,39,0.16))]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#c9a227]">
                <Star size={16} fill="currentColor" />
                Case-specific strategy
              </p>
              <h2 className="text-4xl font-black uppercase leading-tight md:text-6xl">
                Get your subclass {subclass} position reviewed.
              </h2>
              <p className="mt-6 max-w-2xl leading-8 text-white/66">
                Understand your points, occupation, skills assessment, documents and realistic invitation context before
                investing in the next step.
              </p>
            </div>
            <Link href="mailto:ansar@gemca.com.au" className="visa-magnetic-btn inline-flex items-center justify-center gap-3 bg-[#c9a227] px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-[#0a1f44] shadow-[0_24px_70px_rgba(201,162,39,0.32)]">
              Book Consultation
              <Mail size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 pb-24 lg:px-8">
        <div className="mx-auto flex max-w-7xl gap-4 rounded-[24px] border border-[#0a1f44]/10 bg-white/72 p-6 text-sm leading-7 text-[#5a6478] backdrop-blur-xl">
          <ShieldCheck className="mt-1 shrink-0 text-[#c9a227]" size={22} />
          <p>
            Information on this page is general in nature and is not personal migration advice. Processing times,
            fees and invitation context can change. GEMCA can provide guidance based on your facts and documents.
          </p>
        </div>
      </section>
    </div>
  );
}
