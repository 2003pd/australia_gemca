"use client";

export default function Footer() {
  return (
    <footer className="bg-[#050d1a] pt-24 pb-12 relative z-20 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold tracking-widest text-white mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              GEMCA
            </h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-8">
              Australia's premium education and migration consultancy experience for study pathways, skilled migration, visa strategy, and consultation planning.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 cursor-pointer transition-colors">in</div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 cursor-pointer transition-colors">f</div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 cursor-pointer transition-colors">ig</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Pathways</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="hover:text-white transition-colors cursor-pointer">Study in Australia</li>
              <li className="hover:text-white transition-colors cursor-pointer">Skilled Migration</li>
              <li className="hover:text-white transition-colors cursor-pointer">Partner Visas</li>
              <li className="hover:text-white transition-colors cursor-pointer">Employer Sponsored</li>
              <li className="hover:text-white transition-colors cursor-pointer">Refusals & Appeals</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="hover:text-white transition-colors cursor-pointer">Visa Library</li>
              <li className="hover:text-white transition-colors cursor-pointer">University Finder</li>
              <li className="hover:text-white transition-colors cursor-pointer">Points Calculator</li>
              <li className="hover:text-white transition-colors cursor-pointer">Knowledge Hub</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li className="hover:text-white transition-colors cursor-pointer">About GEMCA</li>
              <li className="hover:text-white transition-colors cursor-pointer">Meet Ansar Goraya</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact Us</li>
              <li className="hover:text-white transition-colors cursor-pointer">Book Consultation</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] text-white/40 leading-relaxed max-w-3xl text-center md:text-left">
            Information provided on this website is general in nature and does not constitute personal migration advice. Migration services are delivered in association with a supervising Registered Migration Agent where required. ABN 96 695 178 744.
          </div>
          
          <div className="flex gap-6 text-[11px] text-white/40">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Disclaimer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
