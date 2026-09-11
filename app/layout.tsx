import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Compendium — Tactical Product & AI Syntheses",
  description: "Automated executive dossiers and playbooks extracted from high-signal operator discussions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-[#fafaf9] text-[#1c1917] flex flex-col selection:bg-stone-200 selection:text-stone-900">
        <header className="border-b border-stone-200/80 bg-[#fafaf9]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="group flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-900 transition-transform duration-200 group-hover:scale-125" />
              <span className="font-mono text-xs tracking-wider font-bold text-stone-900 uppercase">
                COMPENDIUM
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-stone-200 text-[11px] font-mono text-stone-500 bg-white">
                Synthesized Daily
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-stone-200/80 py-12 mt-20 text-xs font-mono text-stone-400">
          <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>Automated via n8n & Google Gemini</p>
            <p>Preserving practitioner-level insight</p>
          </div>
        </footer>
      </body>
    </html>
  );
}