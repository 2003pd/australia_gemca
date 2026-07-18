"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Mail,
  MessageSquareQuote,
  Network,
  Phone,
  Send,
  Sparkle,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { addLeadAction } from "../../actions/leads";
import { getExpertsAction } from "../../actions/experts";
import type { ExpertData } from "../../actions/experts";
import { getBlogsAction } from "../../actions/blogs";
import type { BlogData } from "../../actions/blogs";

gsap.registerPlugin(ScrollTrigger);

const fallbackExperts: ExpertData[] = [
  {
    id: "expert-ansar-goraya",
    name: "Ansar Goraya",
    role: "Founder and Principal Consultant",
    image: "/testimonial-consultation.png",
    experience: "5+ years",
    qualifications: ["LLB", "Master of Migration Law, ACU Melbourne", "Former Director, CECA Truganina"],
    specialties: ["Skilled Migration", "Student Pathways", "Partner Visa Evidence", "PR Strategy"],
    languages: ["English", "Punjabi", "Urdu", "Hindi"],
    achievement: "Built GEMCA around education-first migration guidance.",
    stat: "1:1",
    orderIndex: 1,
  },
  {
    id: "expert-education-advisory",
    name: "Education Advisory Team",
    role: "Course and Admissions Strategy",
    image: "/image.png",
    experience: "Study pathways",
    qualifications: ["Course mapping", "Admissions support", "Genuine Student planning"],
    specialties: ["Student Visa 500", "Universities", "Scholarships", "Study cities"],
    languages: ["English", "Hindi", "Punjabi"],
    achievement: "Turns study goals into realistic course and visa-ready plans.",
    stat: "500+",
    orderIndex: 2,
  },
  {
    id: "expert-case-coordination",
    name: "Case Coordination Team",
    role: "Documents and Client Experience",
    image: "/testimonial-consultation.png",
    experience: "Evidence review",
    qualifications: ["Checklist design", "Timeline tracking", "Application coordination"],
    specialties: ["Document Preparation", "EOI Support", "Skills Assessment", "Client Updates"],
    languages: ["English", "Urdu", "Hindi"],
    achievement: "Keeps complex matters organised, visible and calm.",
    stat: "40+",
    orderIndex: 3,
  },
];

const fallbackBlogs: BlogData[] = [
  {
    id: "blog-skilled-points",
    title: "How to read your skilled migration points",
    description: "A practical overview of age, English, education and work experience factors before starting a PR strategy.",
    image: "/testimonial-consultation.png",
    videoUrl: "",
    orderIndex: 1,
  },
  {
    id: "blog-student-pathway",
    title: "Choosing a course that supports your future plan",
    description: "Why course logic, genuine study intent and long-term goals should be aligned before lodging a student visa.",
    image: "/premium-hero-bg.png",
    videoUrl: "",
    orderIndex: 2,
  },
  {
    id: "blog-document-review",
    title: "Documents that make applications easier to review",
    description: "Simple ways to organize evidence, timelines and supporting files so your case is clearer from the beginning.",
    image: "/image.png",
    videoUrl: "",
    orderIndex: 3,
  },
];

const countries = [
  { name: "Australia", stat: "Office base", x: 66, y: 70 },
  { name: "India", stat: "Study pathways", x: 53, y: 49 },
  { name: "Pakistan", stat: "Skilled profiles", x: 47, y: 46 },
  { name: "Nepal", stat: "Student support", x: 56, y: 45 },
  { name: "Sri Lanka", stat: "Visa planning", x: 56, y: 59 },
  { name: "Middle East", stat: "Family pathways", x: 41, y: 43 },
];

const expertise = [
  { title: "Student Visa", text: "Course logic, GS strategy, funds evidence and visa-ready documentation." },
  { title: "Partner Visa", text: "Relationship evidence, timeline structure and document clarity." },
  { title: "Skilled Migration", text: "Points, occupation, skills assessment, EOI and invitation strategy." },
  { title: "Employer Sponsorship", text: "Role alignment, employer pathways and nomination planning." },
  { title: "Appeals", text: "Refusal review, evidence gaps and response strategy." },
  { title: "Universities", text: "Course selection, admissions and realistic study city planning." },
  { title: "Scholarships", text: "Scholarship fit, profile preparation and application guidance." },
  { title: "Skills Assessment", text: "Authority choice, evidence planning and stage-by-stage preparation." },
];

const successCubes = [
  { client: "Sarah", country: "India", visa: "Student Visa 500", review: "My study plan finally made sense." },
  { client: "Rahul", country: "Pakistan", visa: "Skilled 190", review: "The points and nomination plan became clear." },
  { client: "Elena", country: "Sri Lanka", visa: "Partner Visa", review: "Evidence preparation felt calm and structured." },
];

function CrystalGlobe() {
  const group = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    return Array.from({ length: 150 }).map((_, index) => {
      const phi = Math.acos(-1 + (2 * index) / 150);
      const theta = Math.sqrt(150 * Math.PI) * phi;
      const radius = 2.05 + (index % 7) * 0.004;
      return {
        position: [radius * Math.cos(theta) * Math.sin(phi), radius * Math.sin(theta) * Math.sin(phi), radius * Math.cos(phi)] as [number, number, number],
        scale: 0.018 + (index % 5) * 0.004,
        gold: index % 6 === 0,
      };
    });
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.16;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={1.3} />
      <pointLight position={[3, 3, 4]} intensity={7} color="#C9A227" />
      <pointLight position={[-4, -1, 2]} intensity={5} color="#7ab2ff" />
      <group ref={group} scale={0.82}>
        <mesh>
          <sphereGeometry args={[1.72, 48, 48]} />
          <meshStandardMaterial color="#0A1F44" emissive="#123b74" emissiveIntensity={0.25} transparent opacity={0.2} wireframe />
        </mesh>
        {particles.map((particle, index) => (
          <mesh key={index} position={particle.position}>
            <sphereGeometry args={[particle.scale, 8, 8]} />
            <meshStandardMaterial color={particle.gold ? "#C9A227" : "#0A1F44"} emissive={particle.gold ? "#C9A227" : "#1E4F8F"} emissiveIntensity={particle.gold ? 1.25 : 1.05} />
          </mesh>
        ))}
        {Array.from({ length: 8 }).map((_, index) => (
          <mesh key={`line-${index}`} rotation={[Math.PI / 2, 0, (index / 8) * Math.PI]}>
            <torusGeometry args={[2.05, 0.004, 8, 120]} />
            <meshStandardMaterial color="#C9A227" emissive="#C9A227" emissiveIntensity={0.65} transparent opacity={0.55} />
          </mesh>
        ))}
      </group>
      <Sparkles count={90} scale={[7, 4.5, 7]} size={2.1} speed={0.35} color="#2E5FA3" opacity={0.38} />
    </>
  );
}

function GlobalGlobe() {
  const group = useRef<THREE.Group>(null);
  const landShapes = useMemo(
    () => [
      { position: [-0.55, 0.42, 1.36], scale: [0.42, 0.18, 0.03], rotation: [0.2, -0.25, -0.35] },
      { position: [0.28, 0.25, 1.46], scale: [0.34, 0.14, 0.03], rotation: [0.1, 0.18, 0.42] },
      { position: [-0.18, -0.18, 1.5], scale: [0.5, 0.17, 0.03], rotation: [-0.14, 0.04, -0.12] },
      { position: [0.6, -0.4, 1.28], scale: [0.32, 0.13, 0.03], rotation: [0.15, 0.32, -0.55] },
      { position: [-0.72, -0.54, 1.18], scale: [0.28, 0.12, 0.03], rotation: [0.3, -0.3, 0.28] },
    ],
    [],
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.1;
  });

  return (
    <>
      <ambientLight intensity={2.4} />
      <pointLight position={[3, 2, 4]} intensity={8} color="#bfe9ff" />
      <pointLight position={[-3, 1, 3]} intensity={5} color="#ffffff" />
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[1.55, 48, 48]} />
          <meshPhysicalMaterial color="#6ecfff" emissive="#2aa7ee" emissiveIntensity={0.34} roughness={0.2} metalness={0.05} transmission={0.18} transparent opacity={0.78} clearcoat={0.85} clearcoatRoughness={0.18} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.61, 48, 48]} />
          <meshStandardMaterial color="#b8ecff" emissive="#7dd7ff" emissiveIntensity={0.42} transparent opacity={0.16} side={THREE.BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.575, 36, 36]} />
          <meshStandardMaterial color="#ecfbff" emissive="#bcecff" emissiveIntensity={0.22} transparent opacity={0.2} wireframe />
        </mesh>
        {landShapes.map((shape, index) => (
          <mesh key={index} position={shape.position as [number, number, number]} rotation={shape.rotation as [number, number, number]} scale={shape.scale as [number, number, number]}>
            <sphereGeometry args={[1, 18, 10, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
            <meshStandardMaterial color="#e9fbff" emissive="#aeeaff" emissiveIntensity={0.24} transparent opacity={0.34} roughness={0.5} />
          </mesh>
        ))}
        <mesh>
          <torusGeometry args={[1.78, 0.01, 8, 120]} />
          <meshStandardMaterial color="#d9f6ff" emissive="#7dd7ff" emissiveIntensity={0.8} transparent opacity={0.75} />
        </mesh>
        <mesh rotation={[0.55, 0.2, 1.2]}>
          <torusGeometry args={[1.88, 0.008, 8, 120]} />
          <meshStandardMaterial color="#ffffff" emissive="#bfefff" emissiveIntensity={0.62} transparent opacity={0.58} />
        </mesh>
      </group>
      <Sparkles count={65} scale={[5, 5, 5]} size={2} speed={0.28} color="#dff8ff" opacity={0.48} />
    </>
  );
}

function MagneticButton({ href, children, variant = "gold" }: { href: string; children: React.ReactNode; variant?: "gold" | "glass" }) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.12em] transition duration-300 hover:-translate-y-0.5 sm:gap-3 sm:px-6 sm:py-4 sm:text-xs sm:tracking-[0.18em] ${
        variant === "gold"
          ? "bg-[#C9A227] text-[#071426] shadow-[0_24px_70px_rgba(201,162,39,0.28)]"
          : "border border-[#0A1F44]/18 bg-[#0A1F44]/6 text-[#0A1F44] backdrop-blur-xl"
      }`}
    >
      <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      <ArrowRight className="relative transition-transform group-hover:translate-x-1" size={15} />
    </a>
  );
}

export default function MeetExpertsExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [experts, setExperts] = useState<ExpertData[]>(fallbackExperts);
  const [blogs, setBlogs] = useState<BlogData[]>(fallbackBlogs);
  const [selectedExpert, setSelectedExpert] = useState<ExpertData | null>(null);
  const [activeExpertise, setActiveExpertise] = useState(expertise[0]);
  const [country, setCountry] = useState(countries[0]);
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", goal: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-expert-reveal]", { y: 54, opacity: 0, filter: "blur(14px)" });
      gsap.utils.toArray<HTMLElement>("[data-expert-reveal]").forEach((element) => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 82%", once: true },
        });
      });

      gsap.to(".meet-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.2 },
      });

      gsap.to(".expert-float", {
        y: -18,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.24,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let active = true;

    Promise.all([getExpertsAction(), getBlogsAction()]).then(([expertsResponse, blogsResponse]) => {
      if (!active) return;
      if (expertsResponse.success && expertsResponse.data?.length) {
        setExperts(expertsResponse.data);
      }
      if (blogsResponse.success && blogsResponse.data?.length) {
        setBlogs(blogsResponse.data);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountry((currentCountry) => {
        const currentIndex = countries.findIndex((item) => item.name === currentCountry.name);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % countries.length;
        return countries[nextIndex];
      });
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addLeadAction({
      id: `lead-${Date.now()}`,
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      pathway: "Meet Experts Consultation",
      status: "New",
      date: new Date().toISOString().split("T")[0],
      notes: `Consultation request from Meet Experts page.\nGoal: ${formState.goal}`,
    });
    setSubmitted(true);
    setFormState({ name: "", email: "", phone: "", goal: "" });
  };

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      <div className="meet-progress fixed left-0 top-0 z-[10001] h-1 w-full origin-left scale-x-0 bg-[#C9A227]" />

      <section className="relative min-h-[76vh] overflow-hidden bg-white px-5 pb-10 pt-24 text-[#0A1F44] sm:px-6 sm:pt-28 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(201,162,39,0.16),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(10,31,68,0.1),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,31,68,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,31,68,0.045)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0A1F44]/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className="expert-float absolute h-1.5 w-1.5 rounded-full bg-[#0A1F44]/55 shadow-[0_0_24px_rgba(10,31,68,0.26)]"
              style={{ left: `${4 + ((index * 19) % 92)}%`, top: `${10 + ((index * 23) % 76)}%`, opacity: 0.2 + (index % 6) * 0.08 }}
            />
          ))}
        </div>

        <div className="relative mx-auto grid min-h-[calc(76vh-6rem)] max-w-7xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div data-expert-reveal>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#0A1F44]/12 bg-[#0A1F44]/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#0A1F44] backdrop-blur-xl">
              <Sparkle size={14} />
              GEMCA Expert Council
            </div>
            <h1 className="max-w-3xl font-serif text-3xl font-semibold italic leading-[1.08] tracking-normal text-[#0A1F44] sm:text-4xl md:text-5xl lg:text-6xl">
              Meet the experts shaping Australian journeys.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#0A1F44]/68">
              Trusted education and migration professionals guiding students, families and skilled migrants with calm strategy, evidence and care.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
              <MagneticButton href="#consultation">Book Consultation</MagneticButton>
              <MagneticButton href="#team" variant="glass">Meet Our Team</MagneticButton>
            </div>
          </div>

          <div className="relative h-[310px] sm:h-[380px] lg:h-[500px]" data-expert-reveal>
            <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.7]}>
              <CrystalGlobe />
            </Canvas>
            <div className="pointer-events-none absolute bottom-1 left-1/2 w-[92%] -translate-x-1/2 rounded-[22px] border border-[#0A1F44]/12 bg-white/75 p-4 text-center text-[10px] font-black uppercase tracking-[0.12em] text-[#0A1F44]/72 shadow-[0_24px_80px_rgba(10,31,68,0.14)] backdrop-blur-2xl sm:w-[82%] sm:rounded-[28px] sm:p-5 sm:text-xs sm:tracking-[0.18em]">
              Education - Migration - Global Connectivity
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="relative bg-[#071426] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-6 border-b border-white/10 pb-10 lg:grid-cols-[0.72fr_0.28fr] lg:items-end" data-expert-reveal>
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#C9A227]">GEMCA Expert Council</p>
              <h2 className="max-w-5xl font-serif text-3xl font-semibold italic leading-tight tracking-normal text-white md:text-5xl">
                Personal guidance from specialists who understand every step of the Australian journey.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/58 lg:text-right">
              Meet the people behind strategy, documentation and pathway clarity for students, families and skilled professionals.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {experts.map((expert, index) => (
              <button
                key={expert.name}
                type="button"
                onClick={() => setSelectedExpert(expert)}
                className="group expert-float relative min-h-[460px] overflow-hidden rounded-[26px] border border-white/12 bg-white/[0.075] p-4 text-left shadow-[0_34px_100px_rgba(0,0,0,0.26)] backdrop-blur-2xl transition duration-500 hover:-translate-y-3 hover:border-[#C9A227]/50 sm:min-h-[520px] sm:rounded-[34px] sm:p-5"
                data-expert-reveal
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
                <span className="absolute -inset-y-full left-0 w-20 -rotate-12 bg-white/12 opacity-0 blur-xl transition duration-700 group-hover:translate-x-[520px] group-hover:opacity-100" />
                <div className="relative h-60 overflow-hidden rounded-[22px] bg-[#0A1F44] sm:h-72 sm:rounded-[26px]">
                  <Image src={expert.image} alt={expert.name} fill className="object-cover transition duration-700 group-hover:scale-108" sizes="(min-width: 1024px) 30vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071426]/84 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-white/12 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl">
                    {expert.experience}
                  </div>
                </div>
                <div className="pt-6">
                  <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#C9A227]">{expert.role}</p>
                  <h3 className="mt-2 text-2xl font-black uppercase text-white">{expert.name}</h3>
                  <p className="mt-4 leading-7 text-white/58">{expert.achievement}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {expert.specialties.slice(0, 3).map((item) => (
                      <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white/62">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7 flex gap-3 opacity-0 transition duration-300 group-hover:opacity-100">
                    <span className="rounded-full bg-[#C9A227] px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#071426]">View Profile</span>
                    <span className="rounded-full border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white">Book</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="knowledge" className="relative bg-white px-5 py-16 text-[#0A1F44] sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl" data-expert-reveal>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#C9A227]">GEMCA Blog</p>
              <h2 className="whitespace-nowrap font-serif text-2xl font-semibold italic leading-tight tracking-normal sm:text-3xl md:text-5xl">
                Practical insights for study, visa and migration.
              </h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {blogs.map((blog) => (
              <article key={blog.id} className="overflow-hidden rounded-[24px] border border-[#0A1F44]/10 bg-[#f7f9fc] shadow-[0_22px_70px_rgba(10,31,68,0.08)]">
                <div className="relative h-56 overflow-hidden bg-[#0A1F44]">
                  <Image src={blog.image} alt={blog.title} fill className="object-cover transition duration-500 hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/68 via-transparent to-transparent" />
                  {blog.videoUrl ? (
                    <a href={blog.videoUrl} target="_blank" rel="noreferrer" className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#0A1F44]">
                      Watch Video
                    </a>
                  ) : null}
                </div>
                <div className="p-6">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A227]">Migration Insight</p>
                  <h3 className="text-xl font-black uppercase leading-tight">{blog.title}</h3>
                  <p className="mt-4 leading-7 text-[#536079]">{blog.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0A1F44] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div data-expert-reveal>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#C9A227]">Global Connections</p>
            <h2 className="max-w-4xl font-serif text-4xl font-semibold italic leading-[1.06] tracking-normal md:text-6xl">
              Guidance across borders, anchored in Australia.
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-white/62">Students and families move through complex decisions. GEMCA turns that global movement into a visible, structured plan.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {countries.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onMouseEnter={() => setCountry(item)}
                  className={`rounded-2xl border p-4 text-left transition ${country.name === item.name ? "border-[#C9A227]/50 bg-[#C9A227]/10" : "border-white/10 bg-white/[0.05]"}`}
                >
                  <p className="font-black uppercase">{item.name}</p>
                  <p className="mt-1 text-sm text-white/54">{item.stat}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-[390px] sm:h-[520px]" data-expert-reveal>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.6]}>
              <GlobalGlobe />
            </Canvas>
            <div className="absolute left-1/2 top-1/2 w-56 -translate-x-1/2 translate-y-20 rounded-[24px] border border-white/12 bg-white/10 p-4 text-center backdrop-blur-2xl sm:w-64 sm:translate-y-28 sm:p-5">
              <Globe2 className="mx-auto text-[#C9A227]" size={28} />
              <p className="mt-3 text-xl font-black uppercase">{country.name}</p>
              <p className="mt-1 text-sm text-white/58">{country.stat}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-5 py-16 text-[#0A1F44] sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl" data-expert-reveal>
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#C9A227]">Expertise Visualization</p>
            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">Click a node. See the strategy layer.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.28fr_0.72fr] lg:items-start">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {expertise.map((node) => (
                <button
                  key={node.title}
                  type="button"
                  onClick={() => setActiveExpertise(node)}
                  className={`min-h-28 rounded-[18px] border p-4 text-left transition duration-300 hover:-translate-y-1 ${activeExpertise.title === node.title ? "border-[#C9A227]/60 bg-[#fff8df]" : "border-[#0A1F44]/10 bg-white"}`}
                >
                  <Network className="mb-4 text-[#2e5fa3]" size={21} />
                  <p className="text-sm font-black uppercase leading-tight">{node.title}</p>
                </button>
              ))}
            </div>
            <article className="rounded-[24px] bg-[#0A1F44] p-6 text-white shadow-[0_24px_70px_rgba(10,31,68,0.16)] lg:min-h-[250px]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#C9A227]">Expanded node</p>
              <h3 className="mt-4 text-2xl font-black uppercase leading-tight">{activeExpertise.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/64">{activeExpertise.text}</p>
              <div className="mt-6 flex items-center gap-3 text-sm font-bold text-white/72">
                <CheckCircle2 className="text-[#C9A227]" size={22} />
                Evidence-first planning before lodgement.
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl" data-expert-reveal>
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#C9A227]">Client Success Wall</p>
            <h2 className="whitespace-nowrap text-2xl font-black uppercase leading-tight sm:text-3xl md:text-5xl">
              Floating proof, not promises.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {successCubes.map((cube, index) => (
              <article key={cube.client} className="expert-float group relative min-h-72 rounded-[30px] border border-white/12 bg-white/[0.07] p-6 shadow-[0_32px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl transition hover:-translate-y-2 hover:border-[#C9A227]/50" style={{ animationDelay: `${index * 160}ms` }}>
                <MessageSquareQuote className="mb-8 text-[#C9A227]" size={32} />
                <p className="text-xl font-black leading-8">&ldquo;{cube.review}&rdquo;</p>
                <div className="mt-8 border-t border-white/10 pt-5 text-sm font-bold text-white/60">
                  <p className="text-white">{cube.client}</p>
                  <p>{cube.country} • {cube.visa}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="relative overflow-hidden bg-white px-5 py-16 text-[#0A1F44] sm:px-6 sm:py-24 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(201,162,39,0.14),transparent_30%),radial-gradient(circle_at_20%_70%,rgba(46,95,163,0.12),transparent_32%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-expert-reveal>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#C9A227]">Consultation Experience</p>
            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">A premium first conversation, built around clarity.</h2>
            <p className="mt-5 leading-8 text-[#536079]">Send your profile goal and the team will review the best starting point for your study, visa or migration pathway.</p>
          </div>
          <form onSubmit={handleSubmit} className="rounded-[34px] border border-[#0A1F44]/10 bg-white/82 p-6 shadow-[0_34px_100px_rgba(10,31,68,0.12)] backdrop-blur-xl" data-expert-reveal>
            {submitted ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50 p-5 text-emerald-800">
                <BadgeCheck className="mb-3" size={28} />
                <p className="font-black uppercase">Request saved</p>
                <p className="mt-2 text-sm">Your consultation request has been sent to the admin panel.</p>
              </div>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={formState.name} onChange={(event) => setFormState((state) => ({ ...state, name: event.target.value }))} required placeholder="Full name" className="rounded-2xl border border-[#0A1F44]/10 bg-[#f7f9fc] px-4 py-4 text-sm font-semibold outline-none focus:border-[#C9A227]" />
              <input value={formState.phone} onChange={(event) => setFormState((state) => ({ ...state, phone: event.target.value }))} required placeholder="Phone" className="rounded-2xl border border-[#0A1F44]/10 bg-[#f7f9fc] px-4 py-4 text-sm font-semibold outline-none focus:border-[#C9A227]" />
            </div>
            <input value={formState.email} onChange={(event) => setFormState((state) => ({ ...state, email: event.target.value }))} required type="email" placeholder="Email address" className="mt-4 w-full rounded-2xl border border-[#0A1F44]/10 bg-[#f7f9fc] px-4 py-4 text-sm font-semibold outline-none focus:border-[#C9A227]" />
            <textarea value={formState.goal} onChange={(event) => setFormState((state) => ({ ...state, goal: event.target.value }))} required rows={5} placeholder="Tell us your goal: study, PR, partner visa, skills assessment..." className="mt-4 w-full resize-none rounded-2xl border border-[#0A1F44]/10 bg-[#f7f9fc] px-4 py-4 text-sm font-semibold leading-7 outline-none focus:border-[#C9A227]" />
            <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#0A1F44] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#123463]">
              Send to experts
              <Send size={15} />
            </button>
          </form>
        </div>
      </section>

      {selectedExpert ? (
        <div className="fixed inset-0 z-[10050] overflow-y-auto bg-[#071426]/86 p-4 backdrop-blur-xl">
          <div className="mx-auto my-8 max-w-6xl overflow-hidden rounded-[34px] border border-white/12 bg-[#0A1F44] text-white shadow-[0_40px_140px_rgba(0,0,0,0.45)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#C9A227]">Immersive Profile</p>
                <h2 className="mt-2 text-3xl font-black uppercase">{selectedExpert.name}</h2>
              </div>
              <button type="button" onClick={() => setSelectedExpert(null)} className="rounded-full border border-white/15 p-3 text-white/70 transition hover:text-white" aria-label="Close profile">
                <X size={20} />
              </button>
            </div>
            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[440px]">
                <Image src={selectedExpert.image} alt={selectedExpert.name} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44] via-transparent to-transparent" />
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-xl font-bold text-[#C9A227]">{selectedExpert.role}</p>
                <p className="mt-4 leading-8 text-white/64">{selectedExpert.achievement}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    ["Experience", selectedExpert.experience],
                    ["Success statistic", selectedExpert.stat],
                    ["Languages", selectedExpert.languages.join(", ")],
                    ["Education", selectedExpert.qualifications[1] || selectedExpert.qualifications[0]],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/36">{label}</p>
                      <p className="mt-2 font-bold text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-black uppercase">Specializations</h3>
                    <div className="grid gap-2">
                      {selectedExpert.specialties.map((item) => (
                        <p key={item} className="flex gap-3 text-sm text-white/66"><CheckCircle2 className="shrink-0 text-[#C9A227]" size={18} />{item}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-black uppercase">Qualifications</h3>
                    <div className="grid gap-2">
                      {selectedExpert.qualifications.map((item) => (
                        <p key={item} className="flex gap-3 text-sm text-white/66"><GraduationCap className="shrink-0 text-[#C9A227]" size={18} />{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton href="#consultation">Book Consultation</MagneticButton>
                  <a href="tel:0370203358" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">
                    <Phone size={15} /> Call Office
                  </a>
                  <a href="mailto:ansar@gemca.com.au" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-4 text-xs font-black uppercase tracking-[0.16em] text-white">
                    <Mail size={15} /> Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
