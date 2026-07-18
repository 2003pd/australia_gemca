import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "../components/layout/SiteHeader";
import { visaDatabase } from "../lib/visaData";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  Compass,
  GraduationCap,
  HeartHandshake,
  Home,
  Landmark,
  Plane,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Family & Other Visas Australia - GEMCA",
  description:
    "Explore partner, parent, visitor, graduate, business investment and Australian citizenship pathways with GEMCA's practical guidance.",
};

const pathways = [
  {
    slug: "partner-visa",
    eyebrow: "Relationship pathway",
    focus: "Evidence across financial, household, social and commitment pillars.",
    bestFor: "Couples planning onshore or offshore partner migration.",
    icon: HeartHandshake,
  },
  {
    slug: "parent-visa",
    eyebrow: "Family reunion",
    focus: "Balance of Family test, costs, queue timing and Assurance of Support.",
    bestFor: "Parents of settled Australian citizens, PR holders or eligible NZ citizens.",
    icon: UsersRound,
  },
  {
    slug: "visitor-visa",
    eyebrow: "Temporary visit",
    focus: "Genuine temporary stay, funds, invitations and visitor conditions.",
    bestFor: "Family visits, tourism, short business visitor activity or events.",
    icon: Plane,
  },
  {
    slug: "graduate-visa-485",
    eyebrow: "Post-study bridge",
    focus: "Course completion timing, English, AFP check, OVHC and future work strategy.",
    bestFor: "Recent Australian graduates planning next skilled or employer pathway.",
    icon: GraduationCap,
  },
  {
    slug: "business-investment",
    eyebrow: "Capital and enterprise",
    focus: "Nomination, business history, assets, investment plan and PR transition.",
    bestFor: "Business owners, investors and entrepreneurs seeking an Australian base.",
    icon: BriefcaseBusiness,
  },
  {
    slug: "citizenship",
    eyebrow: "Final milestone",
    focus: "Residence history, absences, character, test preparation and ceremony steps.",
    bestFor: "Permanent residents ready to become Australian citizens.",
    icon: Landmark,
  },
];

const decisionNotes = [
  {
    title: "Family evidence matters",
    text: "Partner and parent visas are not just forms. Relationship history, sponsor eligibility, family composition and timing need to be clear before lodgement.",
    icon: Home,
  },
  {
    title: "Temporary means temporary",
    text: "Visitor visas need a believable short-stay purpose, enough funds and strong reasons to comply with visa conditions.",
    icon: Plane,
  },
  {
    title: "Plan beyond the next visa",
    text: "Graduate, business and citizenship decisions often affect later PR, work, travel and family options.",
    icon: Compass,
  },
];

const heroSignals = ["Partner", "Parent", "Visitor", "Graduate", "Business", "Citizenship"];

export default function FamilyAndOtherVisasPage() {
  return (
    <main className="relative z-[999] min-h-screen bg-[#f7f9fc] pb-20 text-[#0a1f44]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#07152b] px-5 pb-16 pt-32 text-white sm:px-6 lg:px-8 lg:pt-36">
        <Image
          src="/family-other-visas-hero.png"
          alt="Family and visitor visa consultation for Australian migration planning"
          fill
          priority
          className="absolute inset-0 object-cover object-center opacity-70"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,21,43,0.96)_0%,rgba(7,21,43,0.82)_44%,rgba(7,21,43,0.28)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f7f9fc] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/10 px-4 py-2 font-serif text-sm font-semibold italic tracking-normal text-[#f4d66b] backdrop-blur-xl">
              <ShieldCheck size={14} />
              Family & Other Visas
            </div>
            <h1 className="max-w-4xl font-serif text-4xl font-semibold italic leading-[1.04] tracking-normal sm:text-5xl lg:text-7xl">
              Family, visit and next-step Australian pathways.
            </h1>
            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/72">
              Clear guidance for partner, parent, visitor, graduate, business investment and citizenship matters where timing, evidence and future consequences all matter.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="mailto:ansar@gemca.com.au" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#d4af37] px-6 text-xs font-black uppercase tracking-[0.16em] text-[#07152b] transition hover:bg-white">
                Book Consultation
                <ArrowRight size={15} />
              </Link>
              <Link href="#pathways" className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/18 bg-white/10 px-6 text-xs font-black uppercase tracking-[0.16em] text-white backdrop-blur-xl transition hover:border-[#d4af37]">
                View Pathways
              </Link>
            </div>
            <div className="mt-8 flex max-w-2xl flex-wrap gap-2">
              {heroSignals.map((item) => (
                <span key={item} className="rounded-full border border-white/14 bg-white/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/72 backdrop-blur-xl">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/14 bg-white/10 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d4af37]">Quick pathway map</p>
            <div className="mt-5 grid gap-3">
              {["Partner & parent evidence", "Visitor stay purpose", "Graduate work rights", "Business nomination", "Citizenship residence history"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-sm font-bold text-white/72">
                  <CheckCircle2 className="shrink-0 text-[#d4af37]" size={17} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {decisionNotes.map((note) => {
            const Icon = note.icon;
            return (
              <article key={note.title} className="rounded-[24px] border border-[#0a1f44]/10 bg-white p-5 shadow-[0_20px_70px_rgba(10,31,68,0.06)]">
                <Icon className="mb-5 text-[#d4af37]" size={24} />
                <h2 className="text-lg font-black uppercase">{note.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#536079]">{note.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="pathways" className="px-5 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-4xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#9b7a12]">Available pathways</p>
            <h2 className="text-3xl font-black uppercase leading-tight md:text-5xl">Choose the visa by purpose, not just subclass.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {pathways.map((pathway) => {
              const visa = visaDatabase[pathway.slug];
              const Icon = pathway.icon;

              return (
                <Link
                  key={pathway.slug}
                  href={`/migrate-to-australia/${pathway.slug}`}
                  className="group relative flex min-h-[410px] flex-col overflow-hidden rounded-[26px] border border-[#0a1f44]/10 bg-white p-6 shadow-[0_24px_80px_rgba(10,31,68,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/55 hover:shadow-[0_30px_100px_rgba(10,31,68,0.13)]"
                >
                  <div className="absolute right-5 top-5 text-5xl font-black text-[#0a1f44]/[0.035]">{visa.subclass.split(" ")[1] || "PR"}</div>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#0a1f44] text-[#d4af37] shadow-[0_18px_50px_rgba(10,31,68,0.16)]">
                    <Icon size={24} />
                  </div>
                  <p className="mt-6 text-[10px] font-black uppercase tracking-[0.18em] text-[#9b7a12]">{pathway.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-[#0a1f44]">{visa.title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-7 text-[#536079]">{pathway.focus}</p>
                  <div className="mt-5 rounded-2xl bg-[#f7f9fc] p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#66748a]">Best for</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#0a1f44]/78">{pathway.bestFor}</p>
                  </div>
                  <div className="mt-auto grid gap-2 pt-6 text-xs font-bold text-[#536079]">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[#d4af37]" />
                      {visa.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <BadgeCheck size={14} className="text-[#2e5fa3]" />
                      {visa.location}
                    </div>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#0a1f44] transition group-hover:text-[#d4af37]">
                    Read guide
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[32px] bg-[#07152b] p-7 text-white shadow-[0_32px_110px_rgba(10,31,68,0.2)] sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#d4af37]">Before you apply</p>
            <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight md:text-5xl">
              The right visa depends on relationship, timing, funds and long-term intent.
            </h2>
          </div>
          <div className="grid gap-3 text-sm font-bold text-white/72">
            {[
              "Check sponsor and family eligibility before paying fees.",
              "Match temporary visa evidence to the real purpose of stay.",
              "Review future PR, travel and citizenship consequences early.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#d4af37]" size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
