import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Handshake,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import AboutMotion from "../components/about/AboutMotion";
import AboutCompanyShowcase from "../components/about/AboutCompanyShowcase";
import SiteHeader from "../components/layout/SiteHeader";

export const metadata: Metadata = {
  title: "About GEMCA - Education and Migration Experts",
  description:
    "Learn about GEMCA, our migration experts, client success stories, testimonials, and career opportunities.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Excellence",
    text: "Advice, documents, and education pathways are prepared with professional care, structured review, and clear next steps.",
  },
  {
    icon: MapPin,
    title: "Integrity",
    text: "GEMCA explains realistic options, difficulty, costs, and risks without promising outcomes or using pressure tactics.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    text: "Clients are guided through decisions in plain English, with timelines, document expectations, and responsibilities made visible.",
  },
  {
    icon: Sparkles,
    title: "Impact",
    text: "The goal is bigger than one application: GEMCA exists to make Australia's education and migration system understandable.",
  },
];

const experts = [
  {
    name: "Ansar Goraya",
    role: "Founder and CEO",
    focus:
      "LLB (Pakistan), Master of Migration Law from ACU Melbourne, former Director of CECA Truganina Branch, and 5 years of industry experience.",
  },
  {
    name: "Education Advisory Team",
    role: "Admissions and Course Pathways",
    focus: "Course selection, university options, city guidance, Genuine Student preparation, and study pathway planning.",
  },
  {
    name: "Client Support Team",
    role: "Documents and Case Coordination",
    focus: "Evidence checklists, deadline tracking, application coordination, and clear communication through each stage.",
  },
];

const identity = [
  {
    label: "Legal Name",
    value: "Goraya Education & Migration Consultant Australia Pty Ltd",
  },
  {
    label: "ABN",
    value: "96 695 178 744",
  },
  {
    label: "Office",
    value: "313/89 Overton Road, Williams Landing VIC 3027",
  },
  {
    label: "Phone",
    value: "03 7020 3358",
  },
];

const differentiators = [
  "Education-first guidance before any sales conversation.",
  "Credentialed review led by a principal with legal and migration-law training.",
  "Single accountable principal rather than an anonymous call-centre model.",
  "Plain-English explanations that challenge rumours, misinformation, and unrealistic promises.",
];

const testimonials = [
  {
    name: "Sarah J.",
    pathway: "Student Visa",
    location: "Melbourne pathway",
    result: "Study plan clarified",
    highlight: "Clear updates",
    text: "GEMCA turned a confusing study plan into a clean application. The updates were clear from start to finish.",
  },
  {
    name: "Rahul S.",
    pathway: "Skilled Migration",
    location: "ICT occupation",
    result: "Points strategy mapped",
    highlight: "Detailed review",
    text: "The team mapped my points, skills assessment, and nomination strategy with real attention to detail.",
  },
  {
    name: "Elena R.",
    pathway: "Partner Visa",
    location: "Family pathway",
    result: "Evidence plan improved",
    highlight: "Calm guidance",
    text: "Our case needed care and patience. GEMCA helped us prepare stronger evidence and stay calm.",
  },
];

const stories = [
  {
    stat: "500+",
    title: "Student Pathways Planned",
    text: "Course selection, admission support, GTE preparation, and visa-ready documentation.",
  },
  {
    stat: "40+",
    title: "Occupations Reviewed",
    text: "Skills assessments and occupation strategies across health, trades, IT, engineering, and business.",
  },
  {
    stat: "1:1",
    title: "Case Strategy Sessions",
    text: "Focused consultations that turn eligibility questions into a practical action plan.",
  },
];

const openings = [
  "Migration Case Coordinator",
  "Education Counsellor",
  "Digital Client Experience Associate",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#d4af37]">
      <span className="h-px w-10 bg-[#d4af37]" />
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="relative z-[999] min-h-screen overflow-x-hidden bg-[#faf6f0] text-[#1a1a1a]">
      <SiteHeader />
      <AboutMotion />

      <section data-about-hero className="relative min-h-screen overflow-hidden bg-[#101010] text-white lg:min-h-[88vh]">
        <Image
          src="/premium-hero-bg.png"
          alt="GEMCA premium migration consultation setting"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="pointer-events-none absolute bottom-8 right-[-82px] flex h-[210px] w-[210px] scale-[0.72] items-center justify-center opacity-40 sm:right-[-70px] sm:h-[220px] sm:w-[220px] sm:scale-100 sm:opacity-45 lg:right-[-80px] lg:top-24 lg:h-[480px] lg:w-[480px] lg:opacity-90">
          <div className="about-hero-3d">
            <div className="about-hero-ring about-hero-ring-one" />
            <div className="about-hero-ring about-hero-ring-two" />
            <div className="about-hero-crystal">
              <span className="about-hero-face about-hero-face-front">G</span>
              <span className="about-hero-face about-hero-face-back">G</span>
              <span className="about-hero-face about-hero-face-left" />
              <span className="about-hero-face about-hero-face-right" />
              <span className="about-hero-face about-hero-face-top" />
              <span className="about-hero-face about-hero-face-bottom" />
            </div>
          </div>
        </div>
        <div className="relative mx-auto flex min-h-screen max-w-7xl items-end px-5 pb-12 pt-32 sm:px-6 sm:pb-16 lg:min-h-[88vh] lg:px-8 lg:pb-20">
          <div className="max-w-4xl" data-about-reveal>
            <SectionLabel>About GEMCA</SectionLabel>
            <h1 className="max-w-3xl font-serif text-[clamp(2.35rem,11vw,3.6rem)] font-semibold italic leading-[1.04] tracking-normal sm:text-5xl lg:text-6xl">
              Migration guidance with precision and care
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 sm:mt-8 sm:text-lg sm:leading-8">
              GEMCA Migration and GEMCA Education help students, professionals, partners, and families understand
              Australian pathways through free knowledge and premium personal guidance.
            </p>
            <div className="mt-8 grid max-w-3xl grid-cols-1 gap-3 text-xs font-bold uppercase tracking-[0.12em] text-white/75 sm:mt-10 sm:grid-cols-3 sm:text-sm sm:tracking-[0.16em]">
              <div className="border border-white/15 bg-white/10 p-3 backdrop-blur-sm sm:p-4" data-about-card>
                <span data-about-count data-about-target="5">5</span> years industry experience
              </div>
              <div className="border border-white/15 bg-white/10 p-3 backdrop-blur-sm sm:p-4" data-about-card>
                <span data-about-count data-about-target="10" data-about-suffix="+">10+</span> client nationalities
              </div>
              <div className="border border-white/15 bg-white/10 p-3 backdrop-blur-sm sm:p-4" data-about-card>Williams Landing office</div>
            </div>
          </div>
        </div>
      </section>

      <AboutCompanyShowcase />

      <section id="story" className="bg-[#faf6f0] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" data-about-reveal>
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="relative max-w-3xl text-3xl font-black uppercase leading-[1.08] md:text-5xl">
              <span className="absolute left-0 top-3 hidden h-[132px] w-px bg-[#d4af37]/50 md:block" />
              <span className="block text-left">Founded to</span>
              <span className="mt-3 block text-left text-[#2e5fa3] md:ml-24">educate first,</span>
              <span className="mt-3 block text-left md:ml-36">then guide personally.</span>
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-black/65">
            <p>
              GEMCA was founded by Ansar Goraya after his work as Director of CECA, Career Education
              Consultancy Australia, Truganina Branch. He established GEMCA as an independent practice focused
              on education pathways, migration knowledge, and accountable personal guidance.
            </p>
            <p>
              The mission is simple: make Australia&apos;s migration and education system understandable to everyone,
              free, and provide premium personal guidance to clients who want help applying that knowledge to
              their own circumstances.
            </p>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <div className="border border-black/10 bg-white p-5" data-about-card>
                <h3 className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-[#2e5fa3]">Mission</h3>
                <p>Make Australia&apos;s migration and education system understandable to everyone.</p>
              </div>
              <div className="border border-black/10 bg-white p-5" data-about-card>
                <h3 className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-[#2e5fa3]">Vision</h3>
                <p>Become the most-referenced independent migration knowledge source in Australia.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl" data-about-reveal>
          <SectionLabel>Why Choose GEMCA</SectionLabel>
          <div className="mb-12 flex max-w-4xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="text-4xl font-black uppercase leading-tight md:text-5xl">
              Clear advice. Strong documents. Better decisions.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="border border-black/10 bg-[#faf6f0] p-7" data-about-card>
                  <Icon className="mb-8 text-[#2e5fa3]" size={34} />
                  <h3 className="mb-3 text-xl font-black uppercase">{item.title}</h3>
                  <p className="leading-7 text-black/60">{item.text}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap gap-3 text-sm font-black uppercase tracking-[0.18em] text-[#0a1f44]">
            <span className="border border-[#d4af37]/50 px-4 py-3">Excellence</span>
            <span className="border border-[#d4af37]/50 px-4 py-3">Integrity</span>
            <span className="border border-[#d4af37]/50 px-4 py-3">Collaboration</span>
            <span className="border border-[#d4af37]/50 px-4 py-3">Impact</span>
          </div>
        </div>
      </section>

      <section id="experts" className="bg-[#101010] px-6 py-24 text-white lg:px-8">
        <div className="mx-auto max-w-7xl" data-about-reveal>
          <SectionLabel>Meet Our Migration Experts</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-4xl font-black uppercase leading-tight md:text-5xl">
                A specialist team around every pathway.
              </h2>
              <p className="mt-6 leading-8 text-white/60">
                The About layer in GEMCA is built on verifiable facts: credentials, office details, company identity,
                and a clear education-first approach.
              </p>
              <div className="mt-8 grid gap-4 text-sm text-white/70">
                <div className="flex gap-3">
                  <Award className="mt-1 shrink-0 text-[#d4af37]" size={20} />
                  <span>LLB plus Master of Migration Law from ACU Melbourne.</span>
                </div>
                <div className="flex gap-3">
                  <Users className="mt-1 shrink-0 text-[#d4af37]" size={20} />
                  <span>Students and clients from more than 10 nationalities.</span>
                </div>
                <div className="flex gap-3">
                  <Building2 className="mt-1 shrink-0 text-[#d4af37]" size={20} />
                  <span>Practice based in Williams Landing, Victoria.</span>
                </div>
              </div>
            </div>
            <div className="grid gap-5">
              {experts.map((expert) => (
                <article key={expert.name} className="border border-white/10 bg-white/[0.04] p-6" data-about-card>
                  <div className="mb-4 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-black uppercase">{expert.name}</h3>
                      <p className="mt-1 text-sm font-bold uppercase tracking-[0.18em] text-[#d4af37]">
                        {expert.role}
                      </p>
                    </div>
                    <Users className="shrink-0 text-white/35" size={30} />
                  </div>
                  <p className="leading-7 text-white/60">{expert.focus}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#faf6f0] px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]" data-about-reveal>
          <div>
            <SectionLabel>Company Details</SectionLabel>
            <h2 className="text-4xl font-black uppercase leading-tight md:text-5xl">
              Verifiable identity, visible office, clear accountability.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {identity.map((item) => (
              <div key={item.label} className="border border-black/10 bg-white p-6" data-about-card>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-[#2e5fa3]">{item.label}</p>
                <p className="text-lg font-bold leading-7 text-black/75">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center" data-about-reveal>
          <div>
            <SectionLabel>Why GEMCA Is Different</SectionLabel>
            <h2 className="text-4xl font-black uppercase leading-tight md:text-5xl">
              Built against misinformation and pressure selling.
            </h2>
            <p className="mt-6 leading-8 text-black/60">
              GEMCA&apos;s position is education-first: explain the system in plain language, then guide personally
              when a client is ready for strategy and support.
            </p>
          </div>
          <div className="grid gap-4">
            {differentiators.map((item) => (
              <div key={item} className="flex gap-4 border border-black/10 bg-[#faf6f0] p-5" data-about-card>
                <CheckCircle2 className="mt-1 shrink-0 text-[#2e5fa3]" size={22} />
                <p className="font-semibold leading-7 text-black/70">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-6 py-20 text-[#0a1f44] lg:px-8">
        <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(232,240,250,0.88),rgba(255,255,255,0))]" />
        <div className="relative mx-auto max-w-7xl" data-about-reveal>
          <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SectionLabel>Testimonials</SectionLabel>
              <h2 className="max-w-3xl text-3xl font-black uppercase leading-tight md:text-4xl">
                What clients say after the plan becomes clear.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-[#536079]">
                Calm, practical guidance for study, skilled migration and family pathways.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#0a1f44]/10 bg-[#f7f9fc] p-4">
                <p className="text-2xl font-black text-[#2e5fa3]">5.0</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#65738a]">Review tone</p>
              </div>
              <div className="rounded-2xl border border-[#0a1f44]/10 bg-[#f7f9fc] p-4">
                <p className="text-2xl font-black text-[#2e5fa3]">1:1</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#65738a]">Guidance style</p>
              </div>
              <div className="rounded-2xl border border-[#0a1f44]/10 bg-[#f7f9fc] p-4">
                <p className="text-2xl font-black text-[#2e5fa3]">3</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#65738a]">Pathways shown</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="overflow-hidden rounded-[26px] border border-[#0a1f44]/10 bg-[#f7f9fc] shadow-[0_26px_80px_rgba(10,31,68,0.10)]" data-about-card>
              <div className="relative h-72 overflow-hidden bg-[#0a1f44] sm:h-80">
                <Image
                  src="/testimonial-consultation.png"
                  alt="Advisor and client reviewing consultation documents"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f44]/72 via-[#0a1f44]/18 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4">
                  <span className="rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[#0a1f44]">
                    Featured review
                  </span>
                  <div className="flex gap-1 text-[#d4af37]">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <Star key={star} size={15} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-7">
                <Quote className="mb-4 text-[#2e5fa3]/22" size={40} />
                <p className="text-xl font-bold leading-8 text-[#0a1f44]">
                  "{testimonials[1].text}"
                </p>
                <div className="mt-6 grid gap-4 border-t border-[#0a1f44]/10 pt-5 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#65738a]">Client</p>
                    <h3 className="mt-2 text-lg font-black uppercase">{testimonials[1].name}</h3>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#65738a]">Pathway</p>
                    <p className="mt-2 font-bold text-[#2e5fa3]">{testimonials[1].pathway}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#65738a]">Focus</p>
                    <p className="mt-2 font-bold text-[#536079]">{testimonials[1].result}</p>
                  </div>
                </div>
              </div>
            </article>

            <div className="grid gap-4">
              {testimonials.map((item) => (
                <article key={item.name} className="rounded-[22px] border border-[#0a1f44]/10 bg-white p-5 shadow-[0_18px_55px_rgba(10,31,68,0.07)] transition-colors hover:border-[#2e5fa3]/25 hover:bg-[#f7f9fc]" data-about-card>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base font-black uppercase text-[#0a1f44]">{item.name}</h3>
                      <p className="mt-1 text-[11px] font-black uppercase tracking-[0.14em] text-[#2e5fa3]">
                        {item.pathway}
                      </p>
                    </div>
                    <div className="flex gap-0.5 text-[#d4af37]">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} size={13} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="leading-7 text-[#536079]">{item.text}</p>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-[#0a1f44]/10 pt-4 text-[10px] font-black uppercase tracking-[0.13em]">
                    <span className="rounded-full border border-[#0a1f44]/10 bg-[#f7f9fc] px-3 py-2 text-[#65738a]">{item.location}</span>
                    <span className="rounded-full border border-[#2e5fa3]/20 bg-[#eaf2fb] px-3 py-2 text-[#2e5fa3]">{item.highlight}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl" data-about-reveal>
          <SectionLabel>Success Stories</SectionLabel>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <h2 className="text-4xl font-black uppercase leading-tight md:text-5xl">
              Outcomes shaped by preparation.
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {stories.map((story) => (
                <article key={story.title} className="border border-black/10 bg-[#faf6f0] p-6" data-about-card>
                  <div className="mb-8 text-5xl font-black text-[#2e5fa3]">{story.stat}</div>
                  <h3 className="mb-3 text-lg font-black uppercase">{story.title}</h3>
                  <p className="text-sm leading-7 text-black/60">{story.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="careers" className="bg-[#101010] px-6 py-24 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center" data-about-reveal>
          <div>
            <SectionLabel>Careers</SectionLabel>
            <h2 className="text-4xl font-black uppercase leading-tight md:text-5xl">
              Join a team that treats migration work seriously.
            </h2>
            <p className="mt-6 max-w-xl leading-8 text-white/60">
              We look for careful communicators, detail-minded case handlers, and people who can balance empathy
              with professional discipline.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-white/60">
              <div className="flex gap-3">
                <Mail className="mt-1 shrink-0 text-[#d4af37]" size={18} />
                <span>Careers and partnership enquiries can be sent to the GEMCA team for review.</span>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-1 shrink-0 text-[#d4af37]" size={18} />
                <span>Client-facing roles require careful communication, source discipline, and no-outcome-promise ethics.</span>
              </div>
            </div>
          </div>
          <div className="border border-white/10 bg-white/[0.04] p-7" data-about-card>
            <div className="mb-7 flex items-center gap-3 text-[#d4af37]">
              <BriefcaseBusiness size={28} />
              <h3 className="text-xl font-black uppercase">Open interest areas</h3>
            </div>
            <div className="grid gap-4">
              {openings.map((opening) => (
                <div key={opening} className="flex items-center gap-3 border border-white/10 p-4">
                  <CheckCircle2 className="text-[#6f9fdc]" size={20} />
                  <span className="font-bold uppercase tracking-[0.08em]">{opening}</span>
                </div>
              ))}
            </div>
            <Link
              href="mailto:careers@gemca.com.au"
              className="mt-8 inline-flex items-center gap-2 bg-[#d4af37] px-6 py-3 text-xs font-black uppercase tracking-[0.18em] text-black transition-colors hover:bg-white"
            >
              Send your profile
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
