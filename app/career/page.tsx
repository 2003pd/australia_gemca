import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import SiteHeader from "../components/layout/SiteHeader";
import CareerApplicationForm from "../components/career/CareerApplicationForm";

export const metadata: Metadata = {
  title: "Careers - GEMCA Education & Migration",
  description:
    "Explore career opportunities with GEMCA Education & Migration Consultant Australia.",
};

const roles = [
  {
    title: "Migration Case Coordinator",
    type: "Client support",
    text: "Support document checklists, timelines, client updates and application preparation workflows.",
  },
  {
    title: "Education Counsellor",
    type: "Student pathways",
    text: "Guide students through course options, admissions requirements and realistic study pathway planning.",
  },
  {
    title: "Digital Client Experience Associate",
    type: "Operations",
    text: "Improve enquiry handling, follow-ups, CRM records and the quality of client communication.",
  },
];

const values = [
  "Clear, ethical communication with no outcome promises.",
  "Strong attention to evidence, timelines and client details.",
  "Respectful support for students, families and skilled professionals.",
  "Calm teamwork in a professional consulting environment.",
];

export default function CareerPage() {
  return (
    <main className="relative z-[999] min-h-screen overflow-hidden bg-white text-[#0a1f44]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-white px-5 pb-16 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,31,68,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,31,68,0.045)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#eef4fb] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#0a1f44]/10 bg-[#f7f9fc] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#2e5fa3]">
              <BriefcaseBusiness size={15} />
              Careers at GEMCA
            </div>
            <h1 className="max-w-3xl font-serif text-3xl font-semibold italic leading-tight sm:text-4xl md:text-6xl">
              Build meaningful work around education and migration guidance.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#536079] sm:mt-6 sm:text-lg">
              Join a careful, client-focused consulting team helping students, families and skilled professionals make clearer Australian pathway decisions.
            </p>
            <div className="mt-8 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:flex-wrap">
              <Link
                href="mailto:careers@gemca.com.au"
                className="inline-flex items-center gap-3 rounded-full bg-[#0a1f44] px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#123463]"
              >
                Send Your Profile
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/meet-experts"
                className="inline-flex items-center gap-3 rounded-full border border-[#0a1f44]/15 bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-[#0a1f44] transition hover:border-[#c9a227]"
              >
                Meet Our Team
              </Link>
            </div>
          </div>

          <div>
            <div className="relative min-h-[320px] overflow-hidden rounded-[24px] border border-[#0a1f44]/10 shadow-[0_30px_90px_rgba(10,31,68,0.14)] sm:min-h-[420px] sm:rounded-[28px]">
              <Image
                src="/career-team-hero.png"
                alt="GEMCA professional team collaborating in a premium office"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 48vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/28 via-transparent to-transparent" />
            </div>
            <div className="mt-4 rounded-2xl border border-[#0a1f44]/10 bg-[#0a1f44]/8 p-5 text-[#0a1f44] shadow-[0_20px_60px_rgba(10,31,68,0.1)] backdrop-blur-xl">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#d4af37]">What we value</p>
              <p className="mt-2 text-xl font-black">Professional care, clear process and accountable client support.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef4fb] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#c9a227]">Open Interest Areas</p>
            <h2 className="text-3xl font-black uppercase leading-tight md:text-4xl">Roles we are open to hearing from.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {roles.map((role) => (
              <article key={role.title} className="rounded-2xl border border-[#0a1f44]/10 bg-white p-6 shadow-[0_18px_55px_rgba(10,31,68,0.06)]">
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#2e5fa3]">{role.type}</p>
                <h3 className="text-xl font-black uppercase">{role.title}</h3>
                <p className="mt-4 leading-7 text-[#536079]">{role.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#c9a227]">Working Style</p>
            <h2 className="font-serif text-3xl font-semibold italic leading-tight md:text-5xl">
              Detail-minded, ethical and calm under pressure.
            </h2>
            <p className="mt-5 leading-8 text-[#536079]">
              GEMCA is suited to people who like structured work, client communication and practical problem solving.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value} className="flex gap-4 rounded-2xl border border-[#0a1f44]/10 bg-[#f7f9fc] p-5">
                <CheckCircle2 className="mt-1 shrink-0 text-[#2e5fa3]" size={22} />
                <p className="font-semibold leading-7 text-[#34445d]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0a1f44] px-5 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-[#d4af37]">Apply</p>
            <h2 className="text-2xl font-black uppercase leading-tight md:text-4xl">Submit your resume for future opportunities.</h2>
            <p className="mt-5 max-w-xl leading-8 text-white/62">
              Share your profile with GEMCA. Your application will be saved for admin review with your resume attached.
            </p>
            <div className="mt-6 grid gap-3 text-sm text-white/65">
              <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-[#d4af37]" /> Williams Landing, VIC</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-[#d4af37]" /> Ethical client guidance</span>
            </div>
          </div>
          <CareerApplicationForm />
        </div>
      </section>
    </main>
  );
}
