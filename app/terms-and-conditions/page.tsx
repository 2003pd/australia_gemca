import type { Metadata } from "next";
import SiteHeader from "../components/layout/SiteHeader";
import { getSitePageAction } from "../actions/sitePages";

export const metadata: Metadata = {
  title: "Terms & Conditions - GEMCA",
  description: "Read GEMCA website terms and conditions.",
};

function renderContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) {
        return {
          type: "heading",
          text: block.replace(/^##\s+/, ""),
        };
      }

      return {
        type: "paragraph",
        text: block,
      };
    });
}

export default async function TermsAndConditionsPage() {
  const response = await getSitePageAction("terms-and-conditions");
  const page = response.data || {
    title: "Terms & Conditions",
    content: "## Terms & Conditions\n\nContent is being prepared.",
  };
  const blocks = renderContent(page.content);

  return (
    <main className="relative z-[999] min-h-screen bg-[#f7f9fc] text-[#0a1f44]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-white px-5 pb-14 pt-32 sm:px-6 lg:px-8 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,31,68,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,31,68,0.045)_1px,transparent_1px)] bg-[size:46px_46px]" />
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#d4af37]/12 blur-[100px]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#9b7a12]">Legal</p>
          <h1 className="text-4xl font-black uppercase leading-tight sm:text-5xl lg:text-6xl">{page.title}</h1>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-[#536079]">
            This page is managed from the GEMCA admin panel.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-5xl rounded-[28px] border border-[#0a1f44]/10 bg-white p-6 shadow-[0_24px_90px_rgba(10,31,68,0.08)] sm:p-10">
          <div className="space-y-7">
            {blocks.map((block, index) =>
              block.type === "heading" ? (
                <h2 key={`${block.type}-${index}`} className="pt-3 text-2xl font-black uppercase leading-tight text-[#0a1f44] first:pt-0">
                  {block.text}
                </h2>
              ) : (
                <p key={`${block.type}-${index}`} className="text-base font-semibold leading-8 text-[#536079]">
                  {block.text}
                </p>
              )
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
