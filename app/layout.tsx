import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "./components/layout/LenisProvider";
import SiteFooter from "./components/layout/SiteFooter";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

import { ThemeProvider } from "./components/ThemeProvider";
import ClientLayoutWrapper from "./components/layout/ClientLayoutWrapper";

export const metadata: Metadata = {
  title: "GEMCA - Education & Migration Consultants Australia | Visa & Study Knowledge Platform",
  description: "GEMCA explains Australian study, visa and migration pathways in plain English, then provides personal guidance for students, skilled migrants, partners, families and employers.",
  keywords: "GEMCA, Goraya Education, Migration Consultant Australia, Australian Visa, Skilled Migration, Study in Australia, Student Visa, Points Calculator, Ansar Goraya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col antialiased bg-transparent transition-colors duration-500">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LenisProvider>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
