"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Building2, Compass, Eye, Fingerprint, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const values = ["Excellence", "Integrity", "Collaboration", "Impact"];

const identity = [
  { label: "Legal Identity", value: "Goraya Education & Migration Consultant Australia Pty Ltd", icon: Building2 },
  { label: "ABN", value: "96 695 178 744", icon: Fingerprint },
  { label: "Office", value: "313/89 Overton Road, Williams Landing VIC 3027", icon: Compass },
];

export default function AboutCompanyShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".company-kicker, .company-title, .company-copy",
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".company-panel",
        { y: 60, opacity: 0, rotateX: 8 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".company-grid",
            start: "top 78%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".company-timeline-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 45%",
            scrub: 0.4,
          },
        }
      );

      gsap.to(".company-orbit", {
        rotate: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      gsap.utils.toArray<HTMLElement>(".company-panel").forEach((panel) => {
        const rotateX = gsap.quickTo(panel, "rotateX", { duration: 0.35, ease: "power3.out" });
        const rotateY = gsap.quickTo(panel, "rotateY", { duration: 0.35, ease: "power3.out" });
        const y = gsap.quickTo(panel, "y", { duration: 0.35, ease: "power3.out" });

        const onMove = (event: MouseEvent) => {
          const rect = panel.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;

          rotateY(px * 10);
          rotateX(py * -10);
          y(-8);
        };

        const onLeave = () => {
          rotateX(0);
          rotateY(0);
          y(0);
        };

        panel.addEventListener("mousemove", onMove);
        panel.addEventListener("mouseleave", onLeave);
      });
    }, section);

    const onPointerMove = (event: PointerEvent) => {
      if (!glowRef.current) return;
      const rect = section.getBoundingClientRect();
      glowRef.current.style.setProperty("--company-x", `${event.clientX - rect.left}px`);
      glowRef.current.style.setProperty("--company-y", `${event.clientY - rect.top}px`);
    };

    section.addEventListener("pointermove", onPointerMove);

    return () => {
      section.removeEventListener("pointermove", onPointerMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="company"
      className="relative overflow-hidden bg-[#081323] px-6 py-28 text-white lg:px-8"
    >
      <div
        ref={glowRef}
        className="company-glow pointer-events-none absolute inset-0 opacity-80"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
        <div className="lg:sticky lg:top-28 lg:min-h-[calc(100vh-8rem)]">
          <div className="company-kicker mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.28em] text-[#d4af37]">
            <span className="h-px w-10 bg-[#d4af37]" />
            About / Company
          </div>
          <h2 className="company-title max-w-3xl font-serif text-3xl font-semibold italic leading-tight md:text-5xl">
            Verifiable facts. Clear mission. Real accountability.
          </h2>
          <p className="company-copy mt-7 max-w-xl text-lg leading-8 text-white/62">
            This company layer is built for people who background-check before they contact. It presents GEMCA
            through history, identity, mission, vision, and values without fluff.
          </p>

          <div className="company-panel relative mt-10 overflow-hidden border border-white/10 bg-white/[0.055] p-7 backdrop-blur-md">
            <div className="company-orbit pointer-events-none absolute -right-12 -top-12 hidden h-52 w-52 place-items-center rounded-full border border-[#d4af37]/25 lg:grid">
              <div className="absolute h-3 w-3 rounded-full bg-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.9)]" />
              <div className="h-28 w-28 rounded-full border border-white/15 bg-white/[0.04]" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37]">Founder</p>
            <h3 className="mt-4 text-4xl font-black uppercase leading-none md:text-6xl">
              Ansar<br />Goraya
            </h3>
            <p className="mt-6 max-w-sm leading-8 text-white/62">
              Former Director of CECA Truganina Branch, founder and CEO of GEMCA, with legal and migration-law
              training behind the practice.
            </p>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="company-panel border border-white/10 bg-[#d4af37] p-6 text-[#081323]">
              <div className="text-6xl font-black leading-none">5</div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.18em]">Years in industry</p>
            </div>
            <div className="company-panel border border-white/10 bg-white/[0.055] p-6 backdrop-blur-md">
              <div className="text-6xl font-black leading-none text-[#d4af37]">10+</div>
              <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-white/70">
                Nationalities served
              </p>
            </div>
          </div>

          <div className="company-panel mt-5 border border-white/10 bg-white/[0.055] p-6 backdrop-blur-md">
            <div className="grid gap-4 text-sm font-bold uppercase tracking-[0.14em] text-white/68">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <span>CECA Truganina Branch</span>
                <span className="text-[#d4af37]">Director</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>GEMCA Pty Ltd</span>
                <span className="text-[#d4af37]">Founder</span>
              </div>
            </div>
          </div>
        </div>

        <div className="company-grid relative grid gap-5">
          <div className="absolute left-4 top-4 hidden h-[calc(100%-2rem)] w-px bg-white/10 md:block">
            <div className="company-timeline-fill h-full origin-top bg-[#d4af37]" />
          </div>

          <article className="company-panel ml-0 border border-white/10 bg-white/[0.055] p-7 backdrop-blur-md md:ml-12">
            <div className="mb-5 flex items-center gap-3 text-[#d4af37]">
              <Award size={26} />
              <h3 className="text-sm font-black uppercase tracking-[0.22em]">History</h3>
            </div>
            <p className="text-2xl font-black uppercase leading-tight text-white">
              Founded by Ansar Goraya after serving as Director of CECA, Career Education Consultancy Australia,
              Truganina Branch.
            </p>
            <p className="mt-5 leading-8 text-white/60">
              Ansar established GEMCA as his own practice with five years in the industry altogether.
            </p>
          </article>

          <div className="grid gap-5 md:ml-12 md:grid-cols-3">
            {identity.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="company-panel border border-white/10 bg-white/[0.055] p-6 backdrop-blur-md">
                  <Icon className="mb-6 text-[#d4af37]" size={26} />
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-white/40">{item.label}</p>
                  <p className="font-bold leading-7 text-white/82">{item.value}</p>
                </article>
              );
            })}
          </div>

          <div className="grid gap-5 md:ml-12 md:grid-cols-2">
            <article className="company-panel border border-white/10 bg-[#d4af37] p-7 text-[#081323]">
              <div className="mb-5 flex items-center gap-3">
                <Sparkles size={26} />
                <h3 className="text-sm font-black uppercase tracking-[0.22em]">Mission</h3>
              </div>
              <p className="text-2xl font-black uppercase leading-tight">
                Make Australia&apos;s migration and education system understandable to everyone, free.
              </p>
              <p className="mt-5 leading-8 text-[#081323]/70">
                Then provide premium personal guidance to those who want it.
              </p>
            </article>

            <article className="company-panel border border-white/10 bg-white/[0.055] p-7 backdrop-blur-md">
              <div className="mb-5 flex items-center gap-3 text-[#d4af37]">
                <Eye size={26} />
                <h3 className="text-sm font-black uppercase tracking-[0.22em]">Vision</h3>
              </div>
              <p className="text-2xl font-black uppercase leading-tight">
                The most-referenced independent migration knowledge source in Australia.
              </p>
            </article>
          </div>

          <article className="company-panel md:ml-12 border border-white/10 bg-white/[0.055] p-7 backdrop-blur-md">
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.22em] text-[#d4af37]">Values</h3>
            <div className="flex flex-wrap gap-3">
              {values.map((value) => (
                <span
                  key={value}
                  className="border border-[#d4af37]/40 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white"
                >
                  {value}
                </span>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
