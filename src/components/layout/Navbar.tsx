"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Sun, Moon, Menu, X, Compass, Calculator, GitCompare, ShieldAlert, Award } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";

export function Navbar() {
  const { theme, setTheme, openAdvisor } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  const navLinks = [
    { label: "Trip & Deals", href: "#engines", icon: Compass },
    { label: "NAV Calculator", href: "#calculator", icon: Calculator },
    { label: "Compare", href: "#compare", icon: GitCompare },
    { label: "CIBIL Odds", href: "#cibil", icon: ShieldAlert },
    { label: "Portfolio", href: "#portfolio", icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line/60 bg-surface/85 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-gold via-gold-deep to-amber-700 flex items-center justify-center shadow-gold transition-transform group-hover:scale-105">
            <span className="font-serif font-black text-slate-950 text-base sm:text-lg tracking-wider">
              RP
            </span>
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-medium tracking-tight text-text block leading-none">
              RewardPath
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-gold block mt-0.5">
              Private Aviation & Banking
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-medium text-text-muted hover:text-text hover:bg-surface-glass border border-transparent hover:border-line transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions (Theme Switcher + Ask AI Button) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="p-2 sm:p-2.5 rounded-xl border border-line bg-surface hover:bg-surface-glass text-text-muted hover:text-gold transition-all"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* AI Copilot Slideover Trigger */}
          <button
            type="button"
            onClick={() => openAdvisor()}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-deep text-slate-950 text-xs sm:text-sm font-bold shadow-gold hover:opacity-95 active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
            <span className="hidden sm:inline">Ask AI Advisor</span>
            <span className="sm:hidden">Advisor</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="lg:hidden p-2 rounded-xl border border-line bg-surface text-text-muted hover:text-text"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-line bg-surface/95 backdrop-blur-2xl px-4 py-4 space-y-2 animate-slide-up">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium text-text hover:bg-line/40 transition-colors"
              >
                <Icon className="w-4 h-4 text-gold" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
