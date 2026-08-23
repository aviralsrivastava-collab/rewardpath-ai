"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#hero-search", label: "AI Engines" },
  { href: "#calculator", label: "ROI Calculator" },
  { href: "#compare", label: "Compare Cards" },
  { href: "#breakeven", label: "CPP Breakeven" },
  { href: "#approval-odds", label: "Approval Odds" },
  { href: "#dashboard", label: "User Portfolio" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl"
          : "bg-slate-950/60 backdrop-blur-md border-b border-slate-800/40"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black text-lg shadow-lg group-hover:scale-105 transition-transform">
            R
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg font-black tracking-tight text-white flex items-center gap-1">
              RewardPath <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">India AI</span>
            </span>
            <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider">Cites HDFC, Axis, SBI & Amex Terms</span>
          </div>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-bold text-slate-300 transition-colors hover:text-amber-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#approval-odds"
            className="flex items-center gap-1 text-xs font-extrabold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Soft-Pull Only
          </a>

          <a
            href="#hero-search"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-slate-950 shadow-md hover:from-amber-400 hover:to-amber-500 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Launch AI Search
          </a>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 lg:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-sm font-bold text-slate-200 hover:text-amber-400"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-slate-800">
              <a
                href="#hero-search"
                className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-amber-500 py-3 text-center text-sm font-bold text-slate-950"
                onClick={() => setMobileOpen(false)}
              >
                <Sparkles className="h-4 w-4" /> Launch AI Search
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
