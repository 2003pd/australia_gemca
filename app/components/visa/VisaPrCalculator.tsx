"use client";

import { Award, BadgeCheck, Check, ChevronRight, Gauge, Info, Sparkles, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

type Option = {
  label: string;
  detail?: string;
  points: number;
};

const ageOptions: Option[] = [
  { label: "18 to 24", points: 25 },
  { label: "25 to 32", points: 30 },
  { label: "33 to 39", points: 25 },
  { label: "40 to 44", points: 15 },
  { label: "45 plus", detail: "Not eligible for points-tested skilled invitation", points: 0 },
];

const englishOptions: Option[] = [
  { label: "Competent", detail: "Minimum level", points: 0 },
  { label: "Proficient", points: 10 },
  { label: "Superior", points: 20 },
];

const overseasExperienceOptions: Option[] = [
  { label: "Less than 3 years", points: 0 },
  { label: "3 to 4 years", points: 5 },
  { label: "5 to 7 years", points: 10 },
  { label: "8 plus years", points: 15 },
];

const australianExperienceOptions: Option[] = [
  { label: "Less than 1 year", points: 0 },
  { label: "1 to 2 years", points: 5 },
  { label: "3 to 4 years", points: 10 },
  { label: "5 to 7 years", points: 15 },
  { label: "8 plus years", points: 20 },
];

const qualificationOptions: Option[] = [
  { label: "Doctorate", points: 20 },
  { label: "Bachelor / Master", points: 15 },
  { label: "Diploma / Trade", points: 10 },
  { label: "Recognised award", points: 10 },
  { label: "No recognised qualification", points: 0 },
];

const partnerOptions: Option[] = [
  { label: "Single or PR/citizen partner", points: 10 },
  { label: "Skilled partner", detail: "Age, English and skills assessment", points: 10 },
  { label: "Partner competent English", points: 5 },
  { label: "No partner points", points: 0 },
];

const nominationOptions: Option[] = [
  { label: "Subclass 189", detail: "Independent", points: 0 },
  { label: "Subclass 190", detail: "State nominated", points: 5 },
  { label: "Subclass 491", detail: "Regional nominated/sponsored", points: 15 },
];

const extras = [
  { key: "australianStudy", label: "Australian study requirement", points: 5 },
  { key: "regionalStudy", label: "Study in regional Australia", points: 5 },
  { key: "communityLanguage", label: "Credentialled community language", points: 5 },
  { key: "professionalYear", label: "Professional Year in Australia", points: 5 },
  { key: "specialistEducation", label: "Specialist education qualification", points: 10 },
] as const;

type ExtraKey = (typeof extras)[number]["key"];

function OptionGrid({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: number;
  options: Option[];
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#647086]">{label}</p>
      <div className="grid gap-1.5">
        {options.map((option, index) => {
          const selected = value === index;

          return (
            <button
              key={`${label}-${option.label}`}
              type="button"
              onClick={() => onChange(index)}
              className={`flex min-h-11 items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition ${
                selected
                  ? "border-[#c9a227]/55 bg-[#fff8df] text-[#071b3f] shadow-[0_14px_36px_rgba(201,162,39,0.16)]"
                  : "border-[#0a1f44]/10 bg-white/75 text-[#263955] hover:border-[#c9a227]/35 hover:bg-white"
              }`}
            >
              <span className="min-w-0">
                <span className="block text-xs font-black sm:text-sm">{option.label}</span>
                {option.detail ? <span className="mt-0.5 block text-[11px] font-semibold leading-4 text-[#66748a]">{option.detail}</span> : null}
              </span>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-black ${selected ? "bg-[#071b3f] text-white" : "bg-[#eef3f8] text-[#071b3f]"}`}>
                {option.points}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function VisaPrCalculator() {
  const [age, setAge] = useState(1);
  const [english, setEnglish] = useState(1);
  const [overseasExperience, setOverseasExperience] = useState(0);
  const [australianExperience, setAustralianExperience] = useState(0);
  const [qualification, setQualification] = useState(1);
  const [partner, setPartner] = useState(0);
  const [nomination, setNomination] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState<Record<ExtraKey, boolean>>({
    australianStudy: false,
    regionalStudy: false,
    communityLanguage: false,
    professionalYear: false,
    specialistEducation: false,
  });

  const totals = useMemo(() => {
    const overseasPoints = overseasExperienceOptions[overseasExperience].points;
    const australianPoints = australianExperienceOptions[australianExperience].points;
    const employmentPoints = Math.min(overseasPoints + australianPoints, 20);
    const extrasPoints = extras.reduce((sum, item) => sum + (selectedExtras[item.key] ? item.points : 0), 0);
    const total =
      ageOptions[age].points +
      englishOptions[english].points +
      employmentPoints +
      qualificationOptions[qualification].points +
      partnerOptions[partner].points +
      nominationOptions[nomination].points +
      extrasPoints;

    return {
      total,
      employmentPoints,
      employmentCapped: overseasPoints + australianPoints > employmentPoints,
      extrasPoints,
      remaining: Math.max(65 - total, 0),
      progress: Math.min((total / 95) * 100, 100),
      bestPathway: total >= 80 ? "Strong PR profile" : total >= 65 ? "EOI ready range" : "Improve points first",
      nextAction:
        total >= 80
          ? "Check occupation ceiling and lodge strategy."
          : total >= 65
            ? "Review evidence before claiming points."
            : "Target English, nomination or bonus points.",
    };
  }, [age, english, overseasExperience, australianExperience, qualification, partner, nomination, selectedExtras]);

  const resultLabel = totals.total >= 65 ? "Threshold met" : `${totals.remaining} more points`;

  return (
    <section id="pr-calculator" className="relative z-10 mb-12 overflow-hidden rounded-[24px] border border-[#0a1f44]/10 bg-white/88 shadow-[0_22px_70px_rgba(10,31,68,0.10)] backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_16%_12%,rgba(201,162,39,0.14),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(46,95,163,0.10),transparent_34%)]" />
      <div className="relative">
        <div className="grid gap-4 border-b border-[#0a1f44]/10 p-4 sm:p-5 lg:grid-cols-[1fr_0.46fr] lg:items-stretch lg:p-6">
          <div className="rounded-[20px] border border-[#0a1f44]/10 bg-[#f8fafc]/88 p-4 sm:p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c9a227]/25 bg-[#fff8df] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[#9a7414]">
              <Gauge size={14} />
              PR points calculator
            </div>
            <h2 className="mt-4 max-w-3xl text-2xl font-black uppercase leading-tight tracking-normal text-[#071b3f] sm:text-3xl lg:text-4xl">
              Estimate your skilled visa score.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#536079]">
              Uses the Australian skilled migration points-test structure for 189, 190 and 491 pathways. Final eligibility depends on evidence, occupation, invitation round and visa criteria.
            </p>

            <div className="mt-4 grid gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#071b3f] sm:grid-cols-3">
              <div className="rounded-xl border border-[#0a1f44]/10 bg-white px-3 py-2">189 Independent</div>
              <div className="rounded-xl border border-[#0a1f44]/10 bg-white px-3 py-2">190 +5 points</div>
              <div className="rounded-xl border border-[#0a1f44]/10 bg-white px-3 py-2">491 +15 points</div>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#071b3f]/10 bg-[#071b3f] p-4 text-white shadow-[0_18px_54px_rgba(7,27,63,0.18)] sm:p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/48">Estimated points</p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-5xl font-black leading-none text-[#f6d66f] sm:text-6xl">{totals.total}</span>
                  <span className="text-[11px] font-black uppercase tracking-[0.14em] text-white/54">/ 65</span>
                </div>
              </div>
              <div className={`rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] ${totals.total >= 65 ? "bg-emerald-400/15 text-emerald-200" : "bg-[#f6d66f]/15 text-[#f6d66f]"}`}>
                {resultLabel}
              </div>
            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-[#f6d66f] via-[#c9a227] to-emerald-300 transition-all duration-500" style={{ width: `${totals.progress}%` }} />
            </div>

            <div className="mt-4 grid gap-2 text-xs font-bold text-white/66">
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                <span className="text-white/42">Profile signal</span>
                <p className="mt-1 text-base font-black text-white">{totals.bestPathway}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                <span className="text-white/42">Next action</span>
                <p className="mt-1 text-sm font-bold leading-5 text-white">{totals.nextAction}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#f7f9fc]/96 p-4 sm:p-5 lg:p-6">
          <div className="grid gap-4 xl:grid-cols-3">
            <OptionGrid label="Age" value={age} options={ageOptions} onChange={setAge} />
            <OptionGrid label="English" value={english} options={englishOptions} onChange={setEnglish} />
            <OptionGrid label="Qualification" value={qualification} options={qualificationOptions} onChange={setQualification} />
            <OptionGrid label="Overseas experience" value={overseasExperience} options={overseasExperienceOptions} onChange={setOverseasExperience} />
            <OptionGrid label="Australian experience" value={australianExperience} options={australianExperienceOptions} onChange={setAustralianExperience} />
            <OptionGrid label="Partner points" value={partner} options={partnerOptions} onChange={setPartner} />
            <OptionGrid label="Nomination pathway" value={nomination} options={nominationOptions} onChange={setNomination} />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.74fr]">
            <div className="space-y-3">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#647086]">Additional claims</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {extras.map((item) => {
                  const checked = selectedExtras[item.key];

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setSelectedExtras((current) => ({ ...current, [item.key]: !current[item.key] }))}
                      className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${
                        checked
                          ? "border-[#c9a227]/55 bg-[#fff8df] text-[#071b3f]"
                          : "border-[#0a1f44]/10 bg-white/75 text-[#263955] hover:border-[#c9a227]/35 hover:bg-white"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${checked ? "border-[#071b3f] bg-[#071b3f] text-white" : "border-[#0a1f44]/18 bg-white"}`}>
                          {checked ? <Check size={13} /> : null}
                        </span>
                        <span className="text-sm font-black">{item.label}</span>
                      </span>
                      <span className="shrink-0 rounded-full bg-[#eef3f8] px-3 py-1 text-xs font-black text-[#071b3f]">
                        +{item.points}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[#0a1f44]/10 bg-white p-4">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#647086]">Quick breakdown</p>
              <div className="mt-3 space-y-2 text-sm font-bold text-[#263955]">
                <div className="flex justify-between gap-3"><span>Employment</span><span>{totals.employmentPoints}</span></div>
                <div className="flex justify-between gap-3"><span>Bonus claims</span><span>{totals.extrasPoints}</span></div>
                <div className="flex justify-between gap-3"><span>Nomination</span><span>{nominationOptions[nomination].points}</span></div>
              </div>
              {totals.employmentCapped ? (
                <p className="mt-3 rounded-xl bg-[#fff8df] px-3 py-2 text-xs font-bold leading-5 text-[#8a650d]">Employment experience is capped at 20 points.</p>
              ) : null}
            </div>
          </div>

          <div className="mt-4 grid gap-3 rounded-2xl border border-[#0a1f44]/10 bg-white p-4 text-sm leading-6 text-[#536079] sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex gap-3">
              <Info className="mt-1 shrink-0 text-[#c9a227]" size={18} />
              <p>
                This is an estimator. You must prove each EOI claim if invited, and invitation scores can be higher than the 65-point minimum.
              </p>
            </div>
            <a href="#book-consultation" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#071b3f] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#102d63]">
              Review profile
              <ChevronRight size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative flex flex-wrap items-center gap-3 border-t border-white/10 bg-[#061631] px-6 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white/58 sm:px-8">
        <span className="inline-flex items-center gap-2 text-[#f6d66f]"><Sparkles size={14} /> Points-tested streams</span>
        <span className="inline-flex items-center gap-2"><BadgeCheck size={14} /> 189</span>
        <span className="inline-flex items-center gap-2"><Award size={14} /> 190</span>
        <span className="inline-flex items-center gap-2"><TrendingUp size={14} /> 491</span>
      </div>
    </section>
  );
}
