import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Github } from "lucide-react";

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
            {/* Replaced <Link> with standard <a> tag to force a hard browser refresh */}
            <a href="/" className="group flex items-center space-x-2.5">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="shrink-0 transition-transform duration-200 group-hover:scale-110"
              >
                <rect width="24" height="24" rx="6" fill="url(#compendium-mark)" />
                <path
                  d="M16.24 7.76 A6 6 0 1 0 16.24 16.24"
                  stroke="#fafaf9"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <circle cx="17.9" cy="12" r="1.3" fill="#fafaf9" />
                <defs>
                  <linearGradient
                    id="compendium-mark"
                    x1="0"
                    y1="0"
                    x2="24"
                    y2="24"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#1c1917" />
                    <stop offset="1" stopColor="#57534e" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-mono text-xs tracking-[0.2em] font-bold text-stone-900 uppercase">
                Compendium
              </span>
            </a>
            
            {/* Right side header items */}
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-stone-200 text-[11px] font-mono text-stone-500 bg-white">
                Synthesized Daily
              </span>
              <a
                href="https://github.com/rxm-gupta/COMPENDIUM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-800 hover:text-black transition-colors"
                title="View my GitHub"
              >
                <Github className="w-[18px] h-[18px]" fill="currentColor" />
              </a>
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