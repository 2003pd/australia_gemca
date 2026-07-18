"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { visaDatabase } from "../../lib/visaData";

gsap.registerPlugin(ScrollTrigger);

const sponsorVisas = [
  { slug: "employer-482", accent: "#2e9fe6", short: "482", label: "Temporary Skill Shortage" },
  { slug: "employer-186", accent: "#c9a227", short: "186", label: "Employer Nomination Scheme" },
  { slug: "employer-494", accent: "#39b98f", short: "494", label: "Regional Sponsored" },
  { slug: "labour-agreement", accent: "#7c8cff", short: "LA", label: "Labour Agreement" },
];

const processSteps = [
  { title: "Sponsor Check", text: "Confirm business sponsorship position, role need, location and pathway fit.", icon: Building2 },
  { title: "Nomination Strategy", text: "Map occupation, salary, labour market evidence and genuine position logic.", icon: ClipboardCheck },
  { title: "Candidate Evidence", text: "Prepare skills, English, experience, health, character and family documents.", icon: FileCheck2 },
  { title: "Visa Lodgement", text: "Coordinate sponsor, nomination and applicant stages with clear timing.", icon: ShieldCheck },
];

const stats = [
  { label: "Core sponsor routes", value: "4", icon: BriefcaseBusiness },
  { label: "PR pathway options", value: "186 / 191", icon: BadgeCheck },
  { label: "Onshore or offshore", value: "Both", icon: Globe2 },
];

export default function EmployerSponsoredExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState(sponsorVisas[0].slug);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-sponsor-reveal]",
        { y: 46, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 76%", once: true },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-sponsor-card]").forEach((card) => {
        const rotateX = gsap.quickTo(card, "rotateX", { duration: 0.25, ease: "power3.out" });
        const rotateY = gsap.quickTo(card, "rotateY", { duration: 0.25, ease: "power3.out" });
        const y = gsap.quickTo(card, "y", { duration: 0.25, ease: "power3.out" });

        const move = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          rotateY((px - 0.5) * 12);
          rotateX((py - 0.5) * -10);
          y(-8);
        };

        const leave = () => {
          rotateX(0);
          rotateY(0);
          y(0);
        };

        card.addEventListener("mousemove", move);
        card.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", move);
          card.removeEventListener("mouseleave", leave);
        });
      });
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlug((current) => {
        const currentIndex = sponsorVisas.findIndex((item) => item.slug === current);
        return sponsorVisas[(currentIndex + 1) % sponsorVisas.length].slug;
      });
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      <section className="relative isolate min-h-[86vh] overflow-hidden bg-[#071b3f] px-5 pb-12 pt-32 text-white sm:px-6 lg:px-8">
        <Image
          src="/home-consultation-hero.png"
          alt="Employer sponsored visa consultation in an Australian office"
          fill
          priority
          className="absolute inset-0 object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,251,255,0.98)_0%,rgba(247,251,255,0.92)_26%,rgba(247,251,255,0.42)_52%,rgba(7,27,63,0.16)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#f7fbff] via-[#f7fbff]/72 to-transparent" />

        <div className="relative mx-auto flex min-h-[calc(86vh-8rem)] max-w-7xl flex-col justify-center">
          <div className="max-w-3xl text-[#071b3f]" data-sponsor-reveal>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#0a1f44]/10 bg-white/78 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#9b7a12] shadow-[0_18px_60px_rgba(10,31,68,0.10)] backdrop-blur-xl">
              <Sparkles size={14} />
              Employer Sponsored Visas
            </div>
            <h1 className="max-w-3xl text-4xl font-black uppercase leading-[1.02] tracking-normal sm:text-5xl lg:text-6xl">
              Employer sponsored visa strategy.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#4c5b72]">
              Plan 482, 186, 494 and labour agreement pathways with employer nomination, candidate evidence and permanent residency options in one structured view.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="mailto:ansar@gemca.com.au" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#c9a227] px-6 text-xs font-black uppercase tracking-[0.16em] text-[#071b3f] transition hover:bg-[#d9b84a]">
                Book Consultation
                <ArrowRight size={15} />
              </Link>
              <Link href="#pathways" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#0a1f44]/12 bg-white/78 px-6 text-xs font-black uppercase tracking-[0.16em] text-[#071b3f] shadow-[0_18px_60px_rgba(10,31,68,0.08)] backdrop-blur-xl transition hover:border-[#c9a227]/55">
                Explore Pathways
              </Link>
            </div>
          </div>

          <div className="mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4" data-sponsor-reveal>
            {sponsorVisas.map((item) => {
              const visa = visaDatabase[item.slug];
              const selected = activeSlug === item.slug;

              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setActiveSlug(item.slug)}
                  className={`rounded-[18px] border p-4 text-left shadow-[0_18px_60px_rgba(10,31,68,0.08)] backdrop-blur-xl transition ${
                    selected ? "border-[#c9a227]/60 bg-white text-[#071b3f]" : "border-white/45 bg-white/58 text-[#34445d] hover:bg-white/82"
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: item.accent }}>
                    {visa.subclass}
                  </span>
                  <span className="mt-2 block text-sm font-black uppercase leading-tight">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <article key={stat.label} data-sponsor-reveal className="rounded-[24px] border border-[#0a1f44]/10 bg-[#f7fbff] p-5 shadow-[0_20px_70px_rgba(10,31,68,0.06)]">
                <Icon className="mb-5 text-[#2e9fe6]" size={24} />
                <p className="text-3xl font-black uppercase text-[#0a1f44]">{stat.value}</p>
                <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#66748a]">{stat.label}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="pathways" className="bg-[#f7fbff] px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl" data-sponsor-reveal>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#c9a227]">Choose the right sponsor route</p>
            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">Employer sponsored pathways.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {sponsorVisas.map((item) => {
              const visa = visaDatabase[item.slug];
              const selected = activeSlug === item.slug;

              return (
                <article
                  key={item.slug}
                  data-sponsor-card
                  className={`group relative min-h-[360px] overflow-hidden rounded-[26px] border bg-white p-5 shadow-[0_24px_80px_rgba(10,31,68,0.08)] transition duration-300 ${
                    selected ? "border-[#c9a227]/60" : "border-[#0a1f44]/10 hover:border-[#2e9fe6]/40"
                  }`}
                  onMouseEnter={() => setActiveSlug(item.slug)}
                >
                  <div className="absolute right-5 top-5 text-6xl font-black text-[#0a1f44]/[0.035]">{item.short}</div>
                  <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl text-sm font-black text-white shadow-[0_16px_40px_rgba(46,159,230,0.2)]" style={{ backgroundColor: item.accent }}>
                    {item.short}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a12]">{visa.subclass}</p>
                  <h3 className="mt-3 text-xl font-black uppercase leading-tight text-[#0a1f44]">{visa.title}</h3>
                  <p className="mt-4 line-clamp-4 text-sm font-semibold leading-7 text-[#536079]">{visa.overview}</p>
                  <Link href={`/migrate-to-australia/${item.slug}`} className="absolute bottom-5 left-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#0a1f44] transition group-hover:text-[#2e9fe6]">
                    View Detail
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div data-sponsor-reveal>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#c9a227]">Sponsor process</p>
            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">From business need to visa decision.</h2>
            <p className="mt-5 text-sm font-semibold leading-8 text-[#536079]">
              Employer sponsored visas move through connected stages. GEMCA helps align the employer case and the applicant evidence before lodgement.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article key={step.title} data-sponsor-card className="rounded-[24px] border border-[#0a1f44]/10 bg-[#f7fbff] p-5 shadow-[0_18px_60px_rgba(10,31,68,0.06)]">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0a1f44] text-[#c9a227]">
                      <Icon size={22} />
                    </div>
                    <span className="text-4xl font-black text-[#0a1f44]/10">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-xl font-black uppercase">{step.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#536079]">{step.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#071b3f] px-5 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[34px] border border-white/12 bg-white/[0.06] p-7 shadow-[0_34px_120px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-10" data-sponsor-reveal>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#f4d66b]">Employer sponsored consultation</p>
              <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight md:text-5xl">Review the role, sponsor and candidate before you lodge.</h2>
              <div className="mt-6 grid gap-3 text-sm font-bold text-white/72 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-[#c9a227]" size={18} />
                  Sponsor and nomination checklist
                </div>
                <div className="flex items-center gap-2">
                  <UsersRound className="text-[#c9a227]" size={18} />
                  Candidate evidence strategy
                </div>
              </div>
            </div>
            <Link href="mailto:ansar@gemca.com.au" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#c9a227] px-7 text-xs font-black uppercase tracking-[0.18em] text-[#071b3f] transition hover:bg-[#d9b84a]">
              Book Consultation
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
