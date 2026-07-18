"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertCircle, CheckCircle, ChevronDown, ChevronRight, Menu, Send, UserRound, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { addLeadAction } from "../../actions/leads";

const consultationTypes = [
  "Study in Australia Consultation",
  "Skilled Migration Consultation",
  "Employer Sponsored Visa Consultation",
  "Partner or Family Visa Consultation",
  "Visitor Visa Consultation",
  "General Migration Consultation",
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [bookingPending, setBookingPending] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    pathway: "",
    location: "",
    preferredTime: "",
    message: "",
  });

  // Dynamic logo selection: Dark logo for light-background pages, Light logo for dark-background pages
  const isLightBgPage =
    pathname === "/visa" ||
    pathname === "/service" ||
    pathname === "/meet-experts" ||
    pathname === "/career" ||
    pathname === "/employer-sponsored" ||
    pathname === "/family-and-other-visas" ||
    pathname === "/migrate-to-australia" ||
    pathname?.startsWith("/migrate-to-australia/");
  const logoSrc = isLightBgPage ? "/logo-dark.png" : "/logo-light.png";

  const updateBookingField = (field: keyof typeof bookingForm, value: string) => {
    setBookingForm((current) => ({ ...current, [field]: value }));
  };

  const openBookingForm = () => {
    setOpen(false);
    setServiceMenuOpen(false);
    setBookingOpen(true);
    setBookingSuccess(false);
    setBookingError("");
  };

  const closeBookingForm = () => {
    if (bookingPending) return;
    setServiceMenuOpen(false);
    setBookingOpen(false);
  };

  const handleBookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!bookingForm.pathway) {
      setBookingError("Please select a consultation type.");
      return;
    }

    setBookingPending(true);
    setBookingError("");
    setBookingSuccess(false);

    const today = new Date().toISOString().split("T")[0];
    const notes = [
      `Consultation request from header form.`,
      `Location: ${bookingForm.location}`,
      `Preferred contact time: ${bookingForm.preferredTime}`,
      `Message: ${bookingForm.message}`,
    ].join("\n");

    try {
      const response = await addLeadAction({
        id: `lead-${Date.now()}`,
        name: bookingForm.name,
        email: bookingForm.email,
        phone: bookingForm.phone,
        pathway: bookingForm.pathway,
        status: "New",
        date: today,
        notes,
      });

      if (response.success) {
        setBookingSuccess(true);
        setBookingForm({
          name: "",
          email: "",
          phone: "",
          pathway: "",
          location: "",
          preferredTime: "",
          message: "",
        });
      } else {
        setBookingError(response.error || "Unable to save this consultation request.");
      }
    } catch {
      setBookingError("Unable to submit right now. Please try again.");
    } finally {
      setBookingPending(false);
    }
  };

  return (
    <header className="fixed left-0 top-0 z-[10000] w-full px-3 py-3 text-white sm:px-7 sm:py-5">
      <div className="relative mx-auto flex h-12 max-w-[1840px] items-center justify-between sm:h-16">
        <div className="flex h-12 items-center rounded-full bg-[#2d2925]/95 px-3 shadow-[0_20px_55px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:h-[70px] sm:px-7">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center text-white transition-colors hover:text-[#d4af37] cursor-pointer bg-transparent border-none outline-none"
          >
            {open ? <X size={24} strokeWidth={1.8} /> : <Menu size={26} strokeWidth={1.6} />}
          </button>
          <span className="mx-3 hidden h-8 w-px bg-white/18 min-[390px]:block sm:mx-4" />
          <Link
            href="/about"
            aria-label="About GEMCA"
            onClick={() => setOpen(false)}
            className="hidden h-10 w-10 items-center justify-center text-white transition-colors hover:text-[#d4af37] min-[390px]:inline-flex"
          >
            <UserRound size={21} strokeWidth={1.55} />
          </Link>
          <span className="mx-4 hidden h-8 w-px bg-white/18 sm:block" />
          <Link
            href={pathname === "/about" ? "/" : "/about"}
            onClick={() => setOpen(false)}
            className="hidden items-center gap-1 text-sm font-black uppercase tracking-[0.12em] text-white transition-colors hover:text-[#d4af37] sm:inline-flex"
          >
            {pathname === "/about" ? "Home" : "About"}
            <ChevronRight size={16} strokeWidth={2.4} />
          </Link>
        </div>

        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center transition-transform hover:scale-105 min-[390px]:h-24 min-[390px]:w-24 sm:h-44 sm:w-44"
          aria-label="GEMCA home"
        >
          <Image
            src={logoSrc}
            alt="GEMCA Migration logo"
            width={240}
            height={240}
            priority
            className="h-full w-full object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.25)]"
          />
        </Link>

        <div className="flex h-12 items-center rounded-full bg-[#5a5147]/95 px-3 shadow-[0_20px_55px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:h-[70px] sm:px-7">
          <Link
            href="tel:0370203358"
            className="hidden px-5 text-sm font-black uppercase tracking-[0.08em] text-white transition-colors hover:text-[#d4af37] sm:inline-flex"
          >
            Call Now
          </Link>
          <span className="hidden h-8 w-px bg-white/25 sm:block" />
          <button
            type="button"
            onClick={openBookingForm}
            className="px-2 text-[10px] font-black uppercase tracking-[0.08em] text-white transition-colors hover:text-[#d4af37] min-[390px]:text-xs sm:px-6 sm:text-sm"
          >
            <span className="hidden min-[390px]:inline">Book Consult</span>
            <span className="min-[390px]:hidden">Book</span>
          </button>
        </div>
      </div>

      {open ? (
        <div
          data-lenis-prevent
          className="fixed bottom-3 left-3 right-3 top-20 z-[10001] touch-pan-y overflow-y-auto overscroll-contain rounded-[22px] border border-white/8 bg-[#2d2925]/98 px-5 py-6 text-left shadow-[0_24px_70px_rgba(0,0,0,0.42)] backdrop-blur-xl [-webkit-overflow-scrolling:touch] sm:static sm:mx-auto sm:mt-4 sm:max-h-[calc(100vh-112px)] sm:max-w-[1840px] sm:rounded-[32px] sm:px-10 sm:py-8"
        >
          <div className="grid gap-7 text-sm sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            
            {/* Column 1: General Navigation */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] border-b border-white/10 pb-2">
                Navigation
              </h3>
              <nav className="flex flex-col gap-3.5 font-black uppercase tracking-[0.12em] text-white/75 sm:tracking-[0.16em]">
                <Link href="/" onClick={() => setOpen(false)} className="hover:text-[#d4af37] transition-colors flex justify-between items-center group">
                  Home <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </Link>
                <Link href="/about" onClick={() => setOpen(false)} className="hover:text-[#d4af37] transition-colors flex justify-between items-center group">
                  About <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </Link>
                <Link href="/service" onClick={() => setOpen(false)} className="hover:text-[#d4af37] transition-colors flex justify-between items-center group">
                  Services <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </Link>
                <Link href="/study-in-australia" onClick={() => setOpen(false)} className="hover:text-[#d4af37] transition-colors flex justify-between items-center group">
                  Study in Australia <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </Link>
                <Link href="/family-and-other-visas" onClick={() => setOpen(false)} className="hover:text-[#d4af37] transition-colors flex justify-between items-center group">
                  Family & Other Visas <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </Link>
                <Link href="/meet-experts" onClick={() => setOpen(false)} className="hover:text-[#d4af37] transition-colors flex justify-between items-center group">
                  Meet Experts <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </Link>
                <Link href="/career" onClick={() => setOpen(false)} className="hover:text-[#d4af37] transition-colors flex justify-between items-center group">
                  Careers <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </Link>
              </nav>
            </div>

            {/* Column 2: Skilled Migration */}
            <div className="space-y-4">
              <Link href="/migrate-to-australia" onClick={() => setOpen(false)} className="block group">
                <h3 className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] border-b border-white/10 pb-2 group-hover:text-white transition-colors">
                  Skilled Migration
                </h3>
              </Link>
              <nav className="flex flex-col gap-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white/60 sm:tracking-[0.14em]">
                <Link href="/migrate-to-australia/skilled-189" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  189 Skilled Independent
                </Link>
                <Link href="/migrate-to-australia/skilled-190" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  190 Skilled Nominated
                </Link>
                <Link href="/migrate-to-australia/skilled-491" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  491 Regional Provisional
                </Link>
                <Link href="/migrate-to-australia/skills-assessment" onClick={() => setOpen(false)} className="hover:text-[#d4af37] text-[#d4af37]/80 transition-colors font-black">
                  Skills Assessment
                </Link>
              </nav>
            </div>

            {/* Column 3: Employer Sponsored */}
            <div className="space-y-4">
              <Link href="/employer-sponsored" onClick={() => setOpen(false)} className="block group">
                <h3 className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] border-b border-white/10 pb-2 group-hover:text-white transition-colors">
                  Employer Sponsored
                </h3>
              </Link>
              <nav className="flex flex-col gap-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white/60 sm:tracking-[0.14em]">
                <Link href="/migrate-to-australia/employer-482" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  482 TSS Temporary Visa
                </Link>
                <Link href="/migrate-to-australia/employer-186" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  186 ENS Permanent Visa
                </Link>
                <Link href="/migrate-to-australia/employer-494" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  494 Regional Sponsored
                </Link>
                <Link href="/migrate-to-australia/labour-agreement" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors font-black">
                  Labour Agreements
                </Link>
              </nav>
            </div>

            {/* Column 4: Family & Other Visas */}
            <div className="space-y-4">
              <Link href="/family-and-other-visas" onClick={() => setOpen(false)} className="block group">
                <h3 className="text-xs font-black uppercase tracking-[0.24em] text-[#d4af37] border-b border-white/10 pb-2 group-hover:text-white transition-colors">
                  Family & Other Visas
                </h3>
              </Link>
              <nav className="flex flex-col gap-3.5 text-xs font-bold uppercase tracking-[0.1em] text-white/60 sm:tracking-[0.14em]">
                <Link href="/migrate-to-australia/partner-visa" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  Partner Visa (820/309)
                </Link>
                <Link href="/migrate-to-australia/parent-visa" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  Parent Visa Streams
                </Link>
                <Link href="/migrate-to-australia/visitor-visa" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  Visitor Visa (600)
                </Link>
                <Link href="/migrate-to-australia/graduate-visa-485" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  Graduate Visa (485)
                </Link>
                <Link href="/migrate-to-australia/business-investment" onClick={() => setOpen(false)} className="hover:text-[#d4af37] hover:text-white transition-colors">
                  Business & Investment
                </Link>
                <Link href="/migrate-to-australia/citizenship" onClick={() => setOpen(false)} className="hover:text-[#d4af37] text-[#d4af37]/80 transition-colors font-black font-semibold">
                  Australian Citizenship
                </Link>
              </nav>
            </div>

          </div>
          
          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
            <Link
              href="tel:0370203358"
              onClick={() => setOpen(false)}
              className="border border-white/15 px-4 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-white/70 transition-colors hover:border-[#d4af37] hover:text-[#d4af37] sm:px-5 sm:text-xs sm:tracking-[0.16em]"
            >
              Call Now
            </Link>
            <button
              type="button"
              onClick={openBookingForm}
              className="bg-[#d4af37] px-4 py-3 text-[11px] font-black uppercase tracking-[0.12em] text-[#2d2925] transition-colors hover:bg-white sm:px-5 sm:text-xs sm:tracking-[0.16em]"
            >
              Book Consult
            </button>
          </div>
        </div>
      ) : null}

      {bookingOpen ? (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[10001] overflow-y-auto overscroll-contain bg-black/70 px-3 py-5 backdrop-blur-md [-webkit-overflow-scrolling:touch] sm:flex sm:items-center sm:justify-center sm:px-4 sm:py-6"
        >
          <button
            type="button"
            aria-label="Close consultation form"
            onClick={closeBookingForm}
            className="fixed inset-0 z-0 cursor-default"
          />

          <div
            data-lenis-prevent
            className="relative z-10 mx-auto my-0 w-full max-w-2xl touch-pan-y rounded-[24px] border border-white/10 bg-[#17130f] p-5 text-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] sm:max-h-[calc(100vh-48px)] sm:overflow-y-auto sm:rounded-[28px] sm:p-7"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#d4af37]">Consultation</p>
                <h2 className="mt-2 text-2xl font-black uppercase tracking-normal text-white sm:text-3xl">
                  Book Consult
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close consultation form"
                onClick={closeBookingForm}
                disabled={bookingPending}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-[#d4af37] hover:text-[#d4af37] disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-center">
                <CheckCircle className="mx-auto text-green-400" size={34} />
                <h3 className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-white">
                  Request Saved
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-green-100/75">
                  Your details have been sent to the admin panel. Our team will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setBookingSuccess(false)}
                  className="mt-5 rounded-full bg-[#d4af37] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[#17130f] transition-colors hover:bg-white"
                >
                  Add Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {bookingError ? (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs leading-5 text-red-100">
                    <AlertCircle className="mt-0.5 shrink-0 text-red-300" size={16} />
                    <p>{bookingError}</p>
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Full Name</label>
                    <input
                      type="text"
                      value={bookingForm.name}
                      onChange={(event) => updateBookingField("name", event.target.value)}
                      placeholder="Your full name"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d4af37]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Phone Number</label>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(event) => updateBookingField("phone", event.target.value)}
                      placeholder="+61 400 000 000"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Email Address</label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(event) => updateBookingField("email", event.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d4af37]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Location</label>
                    <input
                      type="text"
                      value={bookingForm.location}
                      onChange={(event) => updateBookingField("location", event.target.value)}
                      placeholder="City / country"
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Consultation Type</label>
                    <button
                      type="button"
                      aria-expanded={serviceMenuOpen}
                      onClick={() => setServiceMenuOpen((value) => !value)}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-white outline-none transition-colors hover:border-white/25 focus:border-[#d4af37]"
                    >
                      <span className={bookingForm.pathway ? "truncate" : "truncate text-white/45"}>
                        {bookingForm.pathway || "Select service"}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`shrink-0 text-white/50 transition-transform ${serviceMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {serviceMenuOpen ? (
                      <div className="absolute left-0 right-0 top-full z-[10002] mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#211c17] shadow-[0_18px_50px_rgba(0,0,0,0.45)]">
                        {consultationTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              updateBookingField("pathway", type);
                              setServiceMenuOpen(false);
                            }}
                            className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-[#d4af37] hover:text-[#17130f] ${
                              bookingForm.pathway === type ? "bg-[#d4af37]/15 text-[#d4af37]" : "text-white/82"
                            }`}
                          >
                            {type.replace(" Consultation", "")}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Preferred Time</label>
                    <input
                      type="text"
                      value={bookingForm.preferredTime}
                      onChange={(event) => updateBookingField("preferredTime", event.target.value)}
                      placeholder="Today 4 PM, tomorrow morning..."
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.18em] text-white/55">Details</label>
                  <textarea
                    value={bookingForm.message}
                    onChange={(event) => updateBookingField("message", event.target.value)}
                    placeholder="Tell us your visa subclass, study plan, current visa status, timeline, or main question."
                    rows={4}
                    required
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-white outline-none transition-colors placeholder:text-white/25 focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingPending}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d4af37] px-5 py-4 text-[11px] font-black uppercase tracking-[0.12em] text-[#17130f] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:text-xs sm:tracking-[0.18em]"
                >
                  {bookingPending ? (
                    <span className="h-4 w-4 rounded-full border-2 border-[#17130f] border-t-transparent animate-spin" />
                  ) : (
                    <>
                      Submit To Admin
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
