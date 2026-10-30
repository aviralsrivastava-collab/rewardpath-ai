import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/90 text-text transition-colors duration-300 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold via-gold-deep to-amber-700 flex items-center justify-center font-serif font-black text-slate-950 text-sm">
                RP
              </div>
              <span className="font-serif text-lg font-medium text-text">RewardPath</span>
            </div>

            <p className="text-xs text-text-muted leading-relaxed max-w-md">
              RewardPath is an educational credit card rewards and private aviation advisory engine for India. All Net Annual Value calculations, milestone trackers, and approval simulators are deterministic and cited to verified bank terms.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted pt-1">
              <div className="flex items-center gap-1.5 text-success">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero CIBIL Bureau Inquiries</span>
              </div>
              <div className="flex items-center gap-1.5 text-gold">
                <Lock className="w-4 h-4" />
                <span>Zero Bank Credential Requests</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold block">
              Advisory Engines
            </span>
            <ul className="space-y-2 text-xs text-text-muted">
              <li>
                <a href="#engines" className="hover:text-gold transition-colors">
                  Destination Trip Planner
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-gold transition-colors">
                  Net Annual Value Calculator
                </a>
              </li>
              <li>
                <a href="#compare" className="hover:text-gold transition-colors">
                  Card Benchmark Matrix
                </a>
              </li>
              <li>
                <a href="#cibil" className="hover:text-gold transition-colors">
                  CIBIL Underwriting Simulator
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-gold transition-colors">
                  Milestone & Portfolio Tracker
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold block">
              Compliance & Legal
            </span>
            <ul className="space-y-2 text-xs text-text-muted">
              <li>
                <Link href="/privacy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-gold transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="pt-8 border-t border-line/60 space-y-3 text-[11px] text-text-muted leading-relaxed">
          <p>
            <strong>Regulatory & Financial Disclaimer:</strong> RewardPath is not a bank, non-banking financial company (NBFC), or registered financial advisor with SEBI or RBI. Information provided across all calculators, simulators, and AI copilot interactions is for educational and informational analysis only and should not be construed as financial, legal, or investment advice. Credit card approvals, terms, interest rates, and welcome bonuses remain subject to sole discretionary underwriting by issuing banks (HDFC Bank, Axis Bank, SBI Card, American Express, ICICI Bank).
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-text-muted/70">
            <span>© {new Date().getFullYear()} RewardPath AI. All rights reserved.</span>
            <span>Educational Use Only • Grounded in Official Issuer Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
