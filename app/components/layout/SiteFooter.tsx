import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

const footerColumns = [
  {
    title: "Visas",
    links: [
      { label: "Visa Library", href: "/visa" },
      { label: "Skilled Migration", href: "/migrate-to-australia" },
      { label: "Partner & Family", href: "/migrate-to-australia/partner-visa" },
      { label: "Employer Sponsored", href: "/migrate-to-australia/employer-482" },
    ],
  },
  {
    title: "Study",
    links: [
      { label: "Study in Australia", href: "/study-in-australia" },
      { label: "Course Pathways", href: "/study-in-australia#pathways" },
      { label: "States & Cities", href: "/study-in-australia#study-cities" },
      { label: "Student Visa Help", href: "/service" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Points Calculator", href: "/visa#pr-calculator" },
      { label: "Eligibility Checker", href: "/service#migration-tools" },
      { label: "Occupation List", href: "/service#migration-tools" },
      { label: "Document Checklists", href: "/service" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About GEMCA", href: "/about" },
      { label: "Company", href: "/about#story" },
      { label: "Experts", href: "/meet-experts" },
      { label: "Careers", href: "/career" },
    ],
  },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/gemca.au/", color: "#E4405F", bg: "rgba(228,64,95,0.12)" },
  { label: "Facebook", href: "https://www.facebook.com/gemca.au/", color: "#1877F2", bg: "rgba(24,119,242,0.12)" },
  { label: "TikTok", href: "https://www.tiktok.com/@gemca.au", color: "#ffffff", bg: "rgba(255,255,255,0.08)" },
];

function SocialIcon({ label }: { label: string }) {
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[19px] w-[19px] fill-current">
        <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.35-2.45a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
      </svg>
    );
  }

  if (label === "Facebook") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[19px] w-[19px] fill-current">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[19px] w-[19px] fill-current">
      <path d="M16.72 2c.34 2.68 1.85 4.28 4.28 4.45v3.02a7.33 7.33 0 0 1-4.22-1.34v6.28c0 4.03-2.45 6.59-6.21 6.59A6.17 6.17 0 0 1 4 14.86c0-3.88 2.98-6.47 6.82-6.08v3.18c-1.72-.26-3.33.7-3.33 2.78 0 1.74 1.16 2.91 2.85 2.91 1.82 0 2.79-1.08 2.79-3.35V2h3.59Z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative z-[999] overflow-hidden bg-[#07152b] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.2fr]">
          <div>
            <h3 className="mb-5 text-xs font-black uppercase tracking-[0.26em] text-[#d4af37]">Contact</h3>
            <div className="grid gap-4 text-sm font-semibold leading-7 text-white">
              <Link
                href="https://www.google.com/maps/search/?api=1&query=313%2F89%20Overton%20Road%2C%20Williams%20Landing%20VIC%203027"
                target="_blank"
                rel="noreferrer"
                className="flex min-w-0 gap-3 transition-colors hover:text-[#d4af37]"
              >
                <MapPin className="mt-1 shrink-0 text-[#d4af37]" size={18} />
                <span className="min-w-0 break-words">313/89 Overton Road, Williams Landing VIC 3027</span>
              </Link>
              <Link href="tel:0370203358" className="flex gap-3 transition-colors hover:text-[#d4af37]">
                <Phone className="mt-1 shrink-0 text-[#d4af37]" size={18} />
                <span>03 7020 3358</span>
              </Link>
              <Link href="mailto:ansar@gemca.com.au" className="flex gap-3 transition-colors hover:text-[#d4af37]">
                <Mail className="mt-1 shrink-0 text-[#d4af37]" size={18} />
                <span>ansar@gemca.com.au</span>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center border border-white/18 transition hover:-translate-y-0.5 hover:border-white/35"
                  style={{ color: social.color, backgroundColor: social.bg }}
                  aria-label={social.label}
                >
                  <SocialIcon label={social.label} />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-[11px] font-black uppercase tracking-[0.24em] text-[#d4af37] sm:mb-5 sm:text-xs">
                  {column.title}
                </h3>
                <nav className="grid gap-3 text-sm font-bold leading-6 text-white sm:leading-normal">
                  {column.links.map((link) => (
                    <Link key={`${column.title}-${link.label}-${link.href}`} href={link.href} className="transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid min-w-0 gap-6 border-t border-white/10 pt-8 text-xs leading-6 text-white sm:mt-14 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="flex gap-3">
            <ShieldCheck className="mt-1 shrink-0 text-[#d4af37]" size={18} />
            <p>
              Information on this website is general in nature and does not constitute personal migration advice.
              Migration services are provided in association with appropriate professional supervision where required.
            </p>
          </div>
          <div className="min-w-0 space-y-3 break-words font-bold uppercase tracking-[0.1em] sm:tracking-[0.16em] lg:text-right">
            <div>Goraya Education & Migration Consultant Australia Pty Ltd - ABN 96 695 178 744</div>
            <Link href="/terms-and-conditions" className="inline-flex text-[#d4af37] transition-colors hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
