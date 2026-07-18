"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    question: "What services does GEMCA provide?",
    answer:
      "GEMCA supports study pathways, student visas, skilled migration, partner and family visas, employer sponsored options, skills assessment planning, document preparation and consultation strategy.",
  },
  {
    question: "Can I book a consultation before choosing a visa pathway?",
    answer:
      "Yes. A consultation can help clarify your background, goals, timeline and realistic pathway before you decide which visa or study option fits best.",
  },
  {
    question: "Does GEMCA help with PR points and skilled migration planning?",
    answer:
      "Yes. GEMCA can help review points factors, occupation fit, English test planning, skills assessment stages, EOI strategy and state nomination options.",
  },
  {
    question: "Can students get help selecting courses in Australia?",
    answer:
      "Yes. GEMCA helps students compare courses, cities, admission requirements, Genuine Student logic, future plans and visa-ready documentation.",
  },
  {
    question: "How do I send my documents or resume?",
    answer:
      "You can start from the Book Consult button for migration enquiries or use the Career page resume form for job applications. Submissions go into the admin panel for review.",
  },
];

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-reveal",
        { opacity: 0, y: 80, filter: "blur(14px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".faq-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#1A1A1A] px-5 py-20 text-white sm:px-6 sm:py-28 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:54px_54px]" />
      <div className="absolute left-[-160px] top-20 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />
      <div className="absolute bottom-0 right-[-140px] h-96 w-96 rounded-full bg-[#2E5FA3]/14 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="faq-reveal">
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#d4af37]">
            <MessageCircleQuestion size={15} />
            FAQ
          </div>
          <h2 className="font-serif text-4xl font-semibold italic leading-tight text-white md:text-6xl">
            Questions before your Australian journey starts.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/58">
            Clear answers for study, migration, PR planning and consultation workflows.
          </p>
          <div className="faq-line mt-10 h-px w-full origin-left bg-gradient-to-r from-[#d4af37] via-white/20 to-transparent" />
        </div>

        <div className="faq-reveal space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <article key={item.question} className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.045] backdrop-blur-xl transition-colors hover:border-[#d4af37]/35">
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-base font-black uppercase leading-6 tracking-[0.04em] text-white sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown className={`shrink-0 text-[#d4af37] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} size={22} />
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 text-sm leading-7 text-white/62 sm:px-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
