"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, UserCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How does RewardPath calculate Net Annual Value (NAV)?",
    answer:
      "Net Annual Value is calculated deterministically using the formula: NAV = (Annual Points Earned × Rupee Valuation per Point) + Milestone Bonus Values − Effective Annual Fee. If your annual spend exceeds the issuer fee-waiver threshold (e.g. ₹10L on HDFC Infinia), the effective fee is factored as ₹0.",
  },
  {
    question: "Will simulating my approval odds impact my CIBIL score?",
    answer:
      "Zero impact. RewardPath never connects to credit bureaus and never requests your PAN, mobile number, or bank credentials. All CIBIL underwriting models run 100% client-side in your browser using publicly documented bank policies.",
  },
  {
    question: "What is the HDFC 6-month rule?",
    answer:
      "HDFC Bank strictly requires a cooling period of 180 days (6 months) between credit card applications. Submitting multiple applications within this window causes automated algorithmic rejection by HDFC's credit engine.",
  },
  {
    question: "Why shouldn't I redeem points for statement credit or cash?",
    answer:
      "Direct statement credit devalues your points down to ₹0.20–₹0.30 per point. Transferring the same points to airline frequent flyer programs (like Singapore KrisFlyer or Virgin Atlantic) or hotel programs (like Accor Live Limitless) yields between ₹1.20 and ₹1.80 per point—over 500% higher value.",
  },
  {
    question: "How frequently are bank devaluation terms updated?",
    answer:
      "Our card database is actively audited against RBI master directions and issuer terms. Every card profile displays a visible 'Last Verified' timestamp and direct links to official bank PDF terms.",
  },
];

interface ExpertContributor {
  name: string;
  title: string;
  verifiedPortfolio: string;
  specialty: string;
}

const EXPERT_CONTRIBUTORS: ExpertContributor[] = [
  {
    name: "Aviral Srivastava",
    title: "Chief Product Architect & Financial Systems Engineer",
    verifiedPortfolio: "HDFC Infinia Metal + Axis Atlas + Amex Plat Travel",
    specialty: "Aviation award arbitrage & algorithmic credit risk scoring",
  },
  {
    name: "RewardPath Strategy Desk",
    title: "Indian Credit Card Research Group",
    verifiedPortfolio: "14 Verified Tier-1 & Tier-2 Credit Products",
    specialty: "RBI Master Directions, MCC mapping & merchant surcharge tracking",
  },
];

export function SocialProofAndFaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Verified Research & Contributor Team */}
        <div>
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
              <UserCheck className="w-3.5 h-3.5" />
              Verified Contributors & Methodology
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-text tracking-tight mb-4">
              Built by experienced cardholders, <br />
              <span className="italic font-normal text-gold">grounded in bank regulations.</span>
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              We do not fabricate fake reviews. RewardPath’s algorithms are designed by dedicated Indian rewards strategists with verified six-figure point portfolios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERT_CONTRIBUTORS.map((c) => (
              <div key={c.name} className="glass-panel p-6 sm:p-8 space-y-3 relative card-3d-tilt">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center font-serif font-bold text-gold text-base">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-text text-base">{c.name}</h3>
                    <span className="text-xs text-text-muted block">{c.title}</span>
                  </div>
                </div>
                <div className="pt-2 text-xs text-text-muted space-y-1">
                  <div>
                    <strong className="text-gold">Verified Portfolio:</strong> {c.verifiedPortfolio}
                  </div>
                  <div>
                    <strong className="text-violet">Focus Area:</strong> {c.specialty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div>
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-text tracking-tight mb-2">
              Everything you need to know about <br />
              <span className="italic font-normal text-gold">points, CIBIL & card underwriting.</span>
            </h2>
          </div>

          <div className="glass-panel divide-y divide-line/60 overflow-hidden">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="p-5 sm:p-6 transition-colors hover:bg-surface/40">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-text text-sm sm:text-base">{faq.question}</span>
                    <span className="p-1 rounded-lg bg-surface text-text-muted border border-line shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-gold" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-4 text-xs sm:text-sm text-text-muted leading-relaxed max-w-3xl animate-fade-in">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
