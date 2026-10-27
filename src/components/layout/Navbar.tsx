"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, ShieldCheck, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const primaryNavLinks = [
  { href: "#hero-search", label: "AI Engines" },
  { href: "#calculator", label: "ROI Calculator" },
  { href: "#compare", label: "Compare Cards" },
  { href: "#breakeven", label: "CPP Breakeven" },
  { href: "#approval-odds", label: "Approval Odds" },
];

const secondaryNavLinks = [
  { href: "#optimizer", label: "Wallet Optimizer" },
  { href: "#dashboard", label: "User Portfolio" },
  { href: "#award-caching", label: "Award Seats" },
  { href: "#faq", label: "FAQ" },
];

const allNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMoreDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled || mobileOpen
            ? "bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl"
            : "bg-slate-950/75 backdrop-blur-md border-b border-slate-800/50"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-3.5 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black text-lg shadow-lg group-hover:scale-105 transition-transform">
              R
            </span>
            <div className="flex flex-col">
              <span className="font-display text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                RewardPath
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                  India AI
                </span>
              </span>
              <span className="text-[9px] text-slate-400 uppercase font-semibold tracking-wider hidden xs:inline-block">
                Cites HDFC, Axis, SBI & Amex
              </span>
            </div>
          </Link>

          {/* Desktop & Laptop Nav: Perfectly balanced across 1024px - 1440px */}
          <ul className="hidden items-center gap-3 lg:gap-4 xl:gap-5 lg:flex">
            {primaryNavLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs font-bold text-slate-300 transition-colors hover:text-amber-400 whitespace-nowrap py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}

            {/* Extra links visible on larger laptop/desktop screens */}
            {secondaryNavLinks.slice(0, 2).map((link) => (
              <li key={link.href} className="hidden 2xl:block">
                <a
                  href={link.href}
                  className="text-xs font-bold text-slate-300 transition-colors hover:text-amber-400 whitespace-nowrap py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}

            {/* "More" Dropdown on 1024px-1440px laptops */}
            <li className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-amber-400 py-1"
                aria-expanded={moreDropdownOpen}
              >
                <span>More</span>
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", moreDropdownOpen && "rotate-180")} />
              </button>

              {moreDropdownOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl animate-fade-in"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  {secondaryNavLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMoreDropdownOpen(false)}
                      className="block rounded-xl px-3 py-2 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-amber-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </li>
          </ul>

          {/* Right Action Buttons */}
          <div className="hidden items-center gap-2.5 lg:flex shrink-0">
            <a
              href="#approval-odds"
              className="hidden xl:flex items-center gap-1 text-[11px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2.5 py-1.5 rounded-xl border border-emerald-800"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Soft-Pull
            </a>

            <a
              href="#hero-search"
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-md hover:from-amber-400 hover:to-amber-500 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Launch AI</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div
            id="mobile-nav-menu"
            className="border-t border-slate-800 bg-slate-950/98 px-4 py-4 lg:hidden max-h-[calc(100dvh-4.5rem)] overflow-y-auto animate-fade-in shadow-2xl"
          >
            <ul className="flex flex-col gap-1">
              {allNavLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-bold text-slate-200 hover:bg-slate-900 hover:text-amber-400 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{link.label}</span>
                    <span className="text-slate-600">→</span>
                  </a>
                </li>
              ))}

              <li className="pt-3 mt-1 border-t border-slate-800/80 flex flex-col gap-2">
                <a
                  href="#approval-odds"
                  className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-emerald-950/80 border border-emerald-800/60 py-3 text-center text-xs font-extrabold text-emerald-400"
                  onClick={() => setMobileOpen(false)}
                >
                  <ShieldCheck className="h-4 w-4" /> Soft-Pull Simulation Guaranteed
                </a>

                <a
                  href="#hero-search"
                  className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-center text-sm font-black text-slate-950 shadow-lg active:scale-98 transition-transform"
                  onClick={() => setMobileOpen(false)}
                >
                  <Sparkles className="h-4 w-4" /> Launch AI Search Engine
                </a>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
