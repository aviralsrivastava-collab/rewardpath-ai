"use client";

import React, { useState, useMemo } from "react";
import { ShieldAlert, CheckCircle2, AlertTriangle, Lock } from "lucide-react";
import { SEED_CARDS } from "@/lib/data/seed-cards";
import { formatCurrency } from "@/lib/utils";

interface BankRule {
  issuer: string;
  ruleName: string;
  description: string;
  cooldownPeriod: string;
}

const BANK_RULES: Record<string, BankRule> = {
  "HDFC Bank": {
    issuer: "HDFC Bank",
    ruleName: "HDFC 6-Month Cooling Period & Income Floor",
    description: "HDFC strictly enforces a 6-month gap between fresh card applications. Infinia requires ₹36L+ annual ITR or ₹3L+ net monthly salary + existing ₹8L+ limit on Regalia.",
    cooldownPeriod: "180 Days between applications",
  },
  "Axis Bank": {
    issuer: "Axis Bank",
    ruleName: "Axis Max 3 Cards Rule & Velocity Check",
    description: "Axis Bank limits cardholders to a maximum of 3 active credit cards. Multiple applications within 90 days trigger automatic automated algorithmic rejections.",
    cooldownPeriod: "90 Days between applications",
  },
  "SBI Card": {
    issuer: "SBI Card",
    ruleName: "SBI 30-Day Re-Application Rule",
    description: "If an application is rejected, wait at least 30 to 45 days before reapplying. Internal risk engine penalizes revolving balances above 30% credit utilization.",
    cooldownPeriod: "30 Days cooling period",
  },
  "American Express India": {
    issuer: "American Express",
    ruleName: "Amex Strict Pin Code & Clean Bureau Requirement",
    description: "Amex mandates servicing pincode address validation and zero 30+ DPD defaults in the last 24 months. 750+ CIBIL score is mandatory.",
    cooldownPeriod: "90 Days cooldown on decline",
  },
};

export function CibilSimulatorSection() {
  const [selectedCardId, setSelectedCardId] = useState<string>("hdfc-infinia-metal");
  const [cibilScore, setCibilScore] = useState<number>(765);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(180000);
  const [recentInquiries, setRecentInquiries] = useState<number>(1);
  const [hasExistingCardWithBank, setHasExistingCardWithBank] = useState<boolean>(true);

  const selectedCard = SEED_CARDS.find((c) => c.id === selectedCardId) || SEED_CARDS[0];
  const issuerRule = BANK_RULES[selectedCard.issuer] || BANK_RULES["HDFC Bank"];

  // Approval Simulation Engine
  const simulation = useMemo(() => {
    let odds = 50;
    const reasons: string[] = [];
    const mitigations: string[] = [];

    // CIBIL Score Impact
    if (cibilScore >= 780) {
      odds += 30;
      reasons.push("CIBIL score above 780 places you in the Tier 1 Prime score bracket.");
    } else if (cibilScore >= 740) {
      odds += 20;
      reasons.push("740-779 CIBIL satisfies standard premium underwriting criteria.");
    } else if (cibilScore >= 700) {
      odds += 5;
      reasons.push("700-739 score meets basic approval criteria, but premium cards require manual credit review.");
      mitigations.push("Maintain zero late payments for 3 months to lift score above 750.");
    } else {
      odds -= 30;
      reasons.push("Score below 700 triggers high credit risk flags with tier-1 lenders.");
      mitigations.push("Pay down revolving card balances to bring utilization under 30%.");
    }

    // Income floor check
    const annualIncome = monthlyIncome * 12;
    if (selectedCard.id === "hdfc-infinia-metal") {
      if (annualIncome >= 3600000) {
        odds += 15;
        reasons.push("Annual income meets or exceeds HDFC Infinia's ₹36L requirement.");
      } else {
        odds -= 25;
        reasons.push("Infinia typically requires ₹36L+ ITR or ₹3L+ net monthly salary.");
        mitigations.push("Consider acquiring HDFC Regalia Gold first, build an ₹8L credit limit, then apply for an upgrade.");
      }
    } else if (selectedCard.id === "axis-atlas") {
      if (annualIncome >= 1200000) {
        odds += 15;
        reasons.push("Income satisfies Axis Atlas underwriting threshold (₹12L/yr).");
      }
    } else {
      if (annualIncome >= 600000) {
        odds += 10;
        reasons.push("Annual income comfortably qualifies for entry-to-mid tier cashback cards.");
      }
    }

    // Hard inquiry velocity
    if (recentInquiries === 0) {
      odds += 10;
      reasons.push("Zero hard inquiries in the last 6 months shows disciplined credit behavior.");
    } else if (recentInquiries <= 2) {
      odds += 5;
      reasons.push("Inquiry velocity is acceptable (under 3 hard credit checks).");
    } else if (recentInquiries >= 5) {
      odds -= 25;
      reasons.push("High inquiry velocity (>4 recent checks) indicates credit hunger.");
      mitigations.push("Pause all loan and card applications for at least 90 days before reapplying.");
    }

    // Existing relationship
    if (hasExistingCardWithBank) {
      odds += 8;
      reasons.push(`Existing credit or salary relationship with ${selectedCard.issuer} speeds up KYC.`);
    }

    const clampedOdds = Math.max(10, Math.min(96, odds));
    let verdictTitle = "VERY HIGH APPROVAL ODDS";
    let verdictColor = "text-success border-success/40 bg-success/15";

    if (clampedOdds < 45) {
      verdictTitle = "ELEVATED RISK OF REJECTION";
      verdictColor = "text-red-400 border-red-500/40 bg-red-500/15";
    } else if (clampedOdds < 75) {
      verdictTitle = "MODERATE APPROVAL PROBABILITY";
      verdictColor = "text-gold border-gold/40 bg-gold/15";
    }

    return {
      odds: clampedOdds,
      verdictTitle,
      verdictColor,
      reasons,
      mitigations,
    };
  }, [cibilScore, monthlyIncome, recentInquiries, hasExistingCardWithBank, selectedCard]);

  return (
    <section id="cibil" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            Underwriting & Rules Simulator
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-text tracking-tight mb-4">
            CIBIL approval odds <br />
            <span className="italic font-normal text-gold">& issuer cooling-period checks.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Simulate your approval probability client-side against real Indian banking rules (HDFC 6-month rule, Axis max 3 cards, SBI re-application intervals).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Simulator Inputs (6 cols) */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-xl font-normal text-text">Profile Inputs</h3>

            {/* Target Card Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text">Select Target Credit Card:</label>
              <select
                value={selectedCardId}
                onChange={(e) => setSelectedCardId(e.target.value)}
                className="w-full rounded-xl border border-line bg-surface/90 px-4 py-3 text-sm text-text focus:border-gold focus:outline-none cursor-pointer"
              >
                {SEED_CARDS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.issuer})
                  </option>
                ))}
              </select>
            </div>

            {/* Slider 1: CIBIL Score */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-text">
                <span>Estimated CIBIL Score:</span>
                <span className="text-gold font-bold text-sm">{cibilScore}</span>
              </div>
              <input
                type="range"
                min={550}
                max={900}
                step={5}
                value={cibilScore}
                onChange={(e) => setCibilScore(Number(e.target.value))}
                className="w-full accent-gold h-1.5 bg-line rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text-muted">
                <span>550 (Poor)</span>
                <span>750 (Tier-1 Prime)</span>
                <span>900 (Flawless)</span>
              </div>
            </div>

            {/* Slider 2: Monthly In-Hand Income */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-text">
                <span>Monthly In-Hand Salary / Income:</span>
                <span className="text-gold font-bold text-sm">{formatCurrency(monthlyIncome)}</span>
              </div>
              <input
                type="range"
                min={25000}
                max={500000}
                step={5000}
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="w-full accent-gold h-1.5 bg-line rounded-lg cursor-pointer"
              />
            </div>

            {/* Input 3: Recent Hard Inquiries */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-medium text-text">
                <span>Hard Credit Inquiries (Past 6 Months):</span>
                <span className="text-gold font-bold text-sm">{recentInquiries} inquiries</span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                step={1}
                value={recentInquiries}
                onChange={(e) => setRecentInquiries(Number(e.target.value))}
                className="w-full accent-gold h-1.5 bg-line rounded-lg cursor-pointer"
              />
            </div>

            {/* Toggle: Relationship with Bank */}
            <label className="flex items-center gap-3 p-3.5 rounded-xl border border-line bg-surface/50 text-xs text-text cursor-pointer hover:border-gold/40 transition-colors">
              <input
                type="checkbox"
                checked={hasExistingCardWithBank}
                onChange={(e) => setHasExistingCardWithBank(e.target.checked)}
                className="w-4 h-4 rounded text-gold accent-gold"
              />
              <span>I currently hold an active credit card or salary account with {selectedCard.issuer}.</span>
            </label>

            {/* Privacy Compliance Callout */}
            <div className="p-4 rounded-xl border border-line/60 bg-surface/40 flex items-start gap-2.5 text-xs text-text-muted">
              <Lock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>
                <strong>100% Client-Side Privacy:</strong> We never ask for your PAN, phone number, or bank credentials. This simulator queries zero credit bureaus and has zero impact on your CIBIL score.
              </span>
            </div>
          </div>

          {/* Simulator Output (6 cols) */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-10 border-line bg-surface/85 relative overflow-hidden shadow-glass space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="text-xs uppercase font-bold tracking-wider text-text-muted">
                Underwriting Simulation Output
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${simulation.verdictColor}`}>
                {simulation.verdictTitle}
              </span>
            </div>

            {/* Odds Percentage Display */}
            <div className="flex items-baseline gap-3">
              <div className="font-serif text-5xl sm:text-6xl font-light text-gold">
                {simulation.odds}%
              </div>
              <div className="text-sm text-text-muted">
                Estimated probability of automated card approval
              </div>
            </div>

            {/* Specific Bank Issuer Rule Evaluation */}
            <div className="p-4 rounded-xl border border-line bg-surface/60 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-gold block">
                📌 Applicable Issuer Rule: {issuerRule.ruleName}
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                {issuerRule.description}
              </p>
              <div className="text-[11px] text-violet font-semibold pt-1">
                Cooldown requirement: {issuerRule.cooldownPeriod}
              </div>
            </div>

            {/* Key Approval Factors */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-text block">
                Positive Approval Drivers:
              </span>
              <div className="space-y-1.5">
                {simulation.reasons.map((r, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-text">
                    <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mitigation Playbook (If any) */}
            {simulation.mitigations.length > 0 && (
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Risk Reduction Playbook:
                </span>
                <div className="space-y-1">
                  {simulation.mitigations.map((m, idx) => (
                    <p key={idx} className="text-xs text-text-muted">
                      • {m}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
