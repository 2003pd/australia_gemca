"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  ClipboardCheck,
  FileCheck2,
  Languages,
  MapPinned,
  Scale,
  SearchCheck,
  ShieldAlert,
  Sparkles,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import ServiceTools from "./ServiceTools";
import Premium3DIcon from "../ui/Premium3DIcon";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "PR Consultation",
    icon: BadgeCheck,
    desc: "Personalised Permanent Residency planning and pathway guidance.",
  },
  {
    title: "Visa Consultation",
    icon: FileCheck2,
    desc: "Professional consultation for all Australian visa categories.",
  },
  {
    title: "Skills Assessment",
    icon: SearchCheck,
    desc: "Assessment support through ACS, VETASSESS, TRA, Engineers Australia and other authorities.",
  },
  {
    title: "EOI Assistance",
    icon: ClipboardCheck,
    desc: "Complete Expression of Interest preparation and optimisation.",
  },
  {
    title: "State Nomination",
    icon: MapPinned,
    desc: "Expert guidance for 190 and 491 state nomination applications.",
  },
  {
    title: "Visa Refusal Assistance",
    icon: ShieldAlert,
    desc: "Strategic support for refused or cancelled visa applications.",
  },
  {
    title: "AAT Appeals",
    icon: Scale,
    desc: "Professional Administrative Review Tribunal appeal assistance.",
  },
  {
    title: "Document Preparation",
    icon: BookOpenCheck,
    desc: "Complete document verification, organisation and application preparation.",
  },
  {
    title: "English Test Guidance",
    icon: Languages,
    desc: "IELTS, PTE and other English language test preparation guidance.",
  },
  {
    title: "Migration Planning",
    icon: Waypoints,
    desc: "Long-term migration roadmap planning across study, work, skills, nomination and permanent residency goals.",
  },
];

export default function ServiceExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-service-heading]",
        { y: 54, opacity: 0, filter: "blur(14px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        "[data-service-card]",
        { y: 70, opacity: 0, rotateX: 12, rotateY: -7, scale: 0.94, filter: "blur(18px)" },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-service-grid]",
            start: "top 82%",
            once: true,
          },
        }
      );

      gsap.to(".service-particle", {
        y: -24,
        x: 12,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: "sine.inOut",
      });

      gsap.to(".service-line", {
        x: 80,
        opacity: 0.7,
        duration: 4,
        repeat: -1,
        yoyo: true,
        stagger: 0.35,
        ease: "sine.inOut",
      });

      gsap.to(".service-cta-glow", {
        backgroundPosition: "200% center",
        duration: 5,
        repeat: -1,
        ease: "none",
      });

      gsap.utils.toArray<HTMLElement>("[data-service-card]").forEach((card) => {
        const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.32, ease: "power3.out" });
        const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.32, ease: "power3.out" });
        const y = gsap.quickTo(card, "y", { duration: 0.32, ease: "power3.out" });
        const lightX = gsap.quickTo(card, "--card-x", { duration: 0.25, ease: "power2.out" });
        const lightY = gsap.quickTo(card, "--card-y", { duration: 0.25, ease: "power2.out" });

        const move = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;

          lightX(px * 100);
          lightY(py * 100);
          rotateY((px - 0.5) * 10);
          rotateX((py - 0.5) * -10);
          y(-9);
        };

        const leave = () => {
          rotateX(0);
          rotateY(0);
          y(0);
          lightX(50);
          lightY(0);
        };

        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", move);
          card.removeEventListener("mouseleave", leave);
        });
      });
    }, root);

    const moveRoot = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      root.style.setProperty("--service-x", `${event.clientX - rect.left}px`);
      root.style.setProperty("--service-y", `${event.clientY - rect.top}px`);
    };

    root.addEventListener("pointermove", moveRoot);
    cleanups.push(() => root.removeEventListener("pointermove", moveRoot));

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate overflow-hidden bg-white px-6 pb-28 pt-40 text-[#0a1f44] lg:px-8"
    >
      <div className="service-mouse-light pointer-events-none absolute inset-0 z-0" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(10,31,68,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,31,68,0.035)_1px,transparent_1px)] bg-[size:54px_54px]" />

      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="service-particle pointer-events-none absolute z-0 h-2 w-2 rotate-45 bg-[#c9a227]/45 shadow-[0_0_22px_rgba(201,162,39,0.35)]"
          style={{
            left: `${8 + ((index * 17) % 86)}%`,
            top: `${10 + ((index * 23) % 78)}%`,
            opacity: 0.2 + (index % 5) * 0.09,
          }}
        />
      ))}

      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="service-line pointer-events-none absolute z-0 h-px w-36 -rotate-12 bg-gradient-to-r from-transparent via-[#c9a227]/35 to-transparent"
          style={{
            left: `${-5 + index * 15}%`,
            top: `${18 + ((index * 11) % 68)}%`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <div
            data-service-heading
            className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#0a1f44]/10 bg-white/70 px-5 py-3 text-xs font-black uppercase tracking-[0.24em] shadow-[0_20px_70px_rgba(10,31,68,0.08)] backdrop-blur-xl"
          >
            <Sparkles size={16} className="text-[#c9a227]" />
            Our Expert Services
          </div>
          <h1 data-service-heading className="text-4xl font-black uppercase leading-tight md:text-6xl lg:text-7xl">
            Expert Migration & Education Services
          </h1>
          <p data-service-heading className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#5a6478]">
            End-to-end professional guidance for Australian migration, student visas, permanent residency,
            employer sponsorship and legal support.
          </p>
        </div>

        <div data-service-grid className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                data-service-card
                className="service-premium-card group relative min-h-[320px] overflow-hidden rounded-[30px] border border-[#0a1f44]/10 bg-white/68 p-7 shadow-[0_28px_90px_rgba(10,31,68,0.08)] backdrop-blur-xl"
              >
                <div className="absolute right-6 top-6 text-6xl font-black text-[#0a1f44]/[0.035]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <Premium3DIcon Icon={Icon} size="lg" className="mb-9" />
                <h2 className="max-w-xs text-2xl font-black uppercase leading-tight">{service.title}</h2>
                <p className="mt-5 min-h-24 leading-8 text-[#5a6478]">{service.desc}</p>
                <Link
                  href="mailto:ansar@gemca.com.au"
                  className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#0a1f44] transition-colors group-hover:text-[#c9a227]"
                >
                  Learn More
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            );
          })}
        </div>

        <ServiceTools />

        <div className="service-cta-glow relative mt-20 overflow-hidden rounded-[38px] border border-[#c9a227]/30 bg-[#0a1f44] bg-[linear-gradient(110deg,#0a1f44,#102f65,#c9a227,#0a1f44)] bg-[length:220%_100%] p-8 text-white shadow-[0_44px_140px_rgba(10,31,68,0.24)] lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.18),transparent_28%),radial-gradient(circle_at_82%_70%,rgba(201,162,39,0.24),transparent_26%)]" />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-[#f4d66b]">
                Premium Consultation
              </p>
              <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">
                Ready to Start Your Australian Journey?
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="mailto:ansar@gemca.com.au"
                className="service-cta-button inline-flex items-center justify-center gap-3 bg-[#c9a227] px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-[#0a1f44] shadow-[0_24px_70px_rgba(201,162,39,0.35)]"
              >
                Book Consultation
                <ArrowRight size={15} />
              </Link>
              <Link
                href="tel:0370203358"
                className="service-cta-button inline-flex items-center justify-center gap-3 border border-white/25 bg-white/10 px-7 py-4 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur-xl"
              >
                Talk to an Expert
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
