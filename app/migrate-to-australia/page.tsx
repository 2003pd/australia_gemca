import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/layout/SiteHeader";
import { visaDatabase } from "../lib/visaData";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle,
  Compass,
  FileCheck2,
  Heart,
  MapPinned,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Migrate to Australia - GEMCA Migration & Education",
  description:
    "Explore Australian migration pathways including skilled migration, employer sponsorship, partner visas, parent visas, graduate pathways and citizenship guidance.",
};

const streamMeta = {
  Skilled: {
    eyebrow: "Points-tested routes",
    title: "Skilled Migration",
    text: "For professionals planning 189, 190, 491 or skills assessment pathways with clear occupation, points and evidence strategy.",
    icon: Users,
    grid: "lg:grid-cols-4",
  },
  Employer: {
    eyebrow: "Business nomination routes",
    title: "Employer Sponsored",
    text: "For workers and employers reviewing sponsorship, nomination, regional roles and permanent employer pathways.",
    icon: Briefcase,
    grid: "lg:grid-cols-4",
  },
  Family: {
    eyebrow: "Relationship and family routes",
    title: "Partner & Family Migration",
    text: "For partners, parents and family members needing evidence planning and realistic pathway clarity.",
    icon: Heart,
    grid: "lg:grid-cols-3",
  },
  Other: {
    eyebrow: "Next-stage migration routes",
    title: "Graduate, Visitor, Business & Citizenship",
    text: "For post-study, visitor, business, labour agreement and citizenship milestones.",
    icon: Compass,
    grid: "lg:grid-cols-3",
  },
} as const;

const summaryStats = [
  { label: "Pathway types", value: "4", icon: Compass },
  { label: "Visa guides", value: Object.keys(visaDatabase).length.toString(), icon: FileCheck2 },
  { label: "Skilled focus", value: "189/190/491", icon: MapPinned },
];

function VisaCard({ slug, visa }: { slug: string; visa: (typeof visaDatabase)[string] }) {
  return (
    <Link
      href={`/migrate-to-australia/${slug}`}
      className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[22px] border border-[#0a1f44]/10 bg-white p-5 shadow-[0_18px_55px_rgba(10,31,68,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#c9a227]/55 hover:shadow-[0_28px_90px_rgba(10,31,68,0.13)]"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-[#c9a227] opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full border border-[#c9a227]/30 bg-[#c9a227]/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a12]">
          {visa.subclass}
        </span>
        <ArrowRight className="mt-1 text-[#0a1f44]/35 transition duration-300 group-hover:translate-x-1 group-hover:text-[#c9a227]" size={18} />
      </div>

      <h3 className="mt-6 text-xl font-black uppercase leading-tight text-[#0a1f44] transition-colors group-hover:text-[#1b4178]">
        {visa.title}
      </h3>
      <p className="mt-4 line-clamp-4 text-sm font-semibold leading-7 text-[#536079]">{visa.overview}</p>

      <div className="mt-auto grid gap-2 pt-7 text-xs font-bold text-[#536079]">
        <div className="flex items-center gap-2">
          <BadgeCheck size={14} className="text-[#c9a227]" />
          {visa.duration}
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#2e5fa3]" />
          {visa.location}
        </div>
      </div>
    </Link>
  );
}

export default function MigrateLandingPage() {
  const streams = (Object.keys(streamMeta) as Array<keyof typeof streamMeta>).map((category) => ({
    category,
    items: Object.entries(visaDatabase).filter(([, visa]) => visa.category === category),
    meta: streamMeta[category],
  }));

  return (
    <main className="relative z-[999] min-h-screen bg-[#f7f9fc] pb-20 text-[#0a1f44]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-white px-5 pb-14 pt-32 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,31,68,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,31,68,0.045)_1px,transparent_1px)] bg-[size:46px_46px]" />
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-[#c9a227]/12 blur-[100px]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#c9a227]/30 bg-[#c9a227]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#9b7a12]">
              <span className="h-2 w-2 rounded-full bg-[#c9a227]" />
              Migration pathways
            </div>
            <h1 className="max-w-3xl text-4xl font-black uppercase leading-[1.02] tracking-normal text-[#0a1f44] sm:text-5xl lg:text-6xl">
              Migrate to Australia with a clear pathway.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[#536079]">
              Compare skilled, employer sponsored, partner, family, graduate and citizenship pathways in plain English before choosing your next step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#pathways"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#0a1f44] px-6 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#1b4178]"
              >
                Explore Pathways
                <ArrowRight size={15} />
              </Link>
              <Link
                href="mailto:ansar@gemca.com.au"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-[#0a1f44]/12 bg-white px-6 text-xs font-black uppercase tracking-[0.16em] text-[#0a1f44] transition hover:border-[#c9a227]/55"
              >
                Book Consultation
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[32px] border border-[#0a1f44]/10 bg-[#0a1f44] shadow-[0_34px_110px_rgba(10,31,68,0.18)]">
              <div className="relative aspect-[1.35/1] min-h-[330px]">
                <Image
                  src="/migration-pathways-hero.png"
                  alt="Australian skyline for migration pathway planning"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/90 via-[#0a1f44]/18 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#c9a227]">GEMCA pathway desk</p>
                  <h2 className="mt-2 max-w-lg text-2xl font-black uppercase leading-tight sm:text-3xl">
                    Points, occupation, sponsorship and evidence in one structured view.
                  </h2>
                </div>
              </div>
            </div>

            <div className="relative -mt-8 mx-4 grid gap-3 rounded-[24px] border border-[#0a1f44]/10 bg-white/90 p-4 shadow-[0_22px_70px_rgba(10,31,68,0.12)] backdrop-blur-xl sm:grid-cols-3 sm:p-5">
              {summaryStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-2xl bg-[#f7f9fc] p-4">
                    <Icon className="mb-4 text-[#c9a227]" size={20} />
                    <div className="text-xl font-black uppercase text-[#0a1f44]">{stat.value}</div>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-[#6a7890]">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="pathways" className="mx-auto max-w-7xl space-y-14 px-5 py-14 sm:px-6 lg:px-8 lg:py-18">
        {streams.map(({ category, items, meta }) => {
          const Icon = meta.icon;
          return (
            <section key={category} className="rounded-[30px] border border-[#0a1f44]/10 bg-white/70 p-5 shadow-[0_20px_80px_rgba(10,31,68,0.06)] backdrop-blur-xl sm:p-7">
              <div className="mb-7 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0a1f44] text-[#c9a227]">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#9b7a12]">{meta.eyebrow}</p>
                    <h2 className="mt-2 text-2xl font-black uppercase leading-tight text-[#0a1f44] sm:text-3xl">{meta.title}</h2>
                  </div>
                </div>
                <p className="max-w-3xl text-sm font-semibold leading-7 text-[#536079] lg:justify-self-end">{meta.text}</p>
              </div>

              <div className={`grid gap-5 sm:grid-cols-2 ${meta.grid}`}>
                {items.map(([slug, visa]) => (
                  <VisaCard key={slug} slug={slug} visa={visa} />
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-[#0a1f44] p-7 text-white shadow-[0_32px_110px_rgba(10,31,68,0.2)] sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.24),transparent_30%),linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,36px_36px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.22em] text-[#c9a227]">Not sure where to begin?</p>
              <h2 className="max-w-2xl text-3xl font-black uppercase leading-tight sm:text-4xl">
                Get your migration position reviewed before you invest time and documents.
              </h2>
              <div className="mt-6 grid gap-3 text-sm font-bold text-white/74 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-[#c9a227]" />
                  Points and occupation review
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={15} className="text-[#c9a227]" />
                  Evidence and document checklist
                </div>
              </div>
            </div>
            <Link
              href="mailto:ansar@gemca.com.au"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#c9a227] px-7 text-xs font-black uppercase tracking-[0.18em] text-[#0a1f44] transition hover:bg-[#d9b84a]"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
