"use client";

import React, { useEffect, useState } from "react";
import { TrendingUp, CreditCard, Shield, Percent } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  isSimulated?: boolean;
}

const STATS: StatItem[] = [
  {
    label: "Simulated Member Savings",
    value: "₹48.2 Cr+",
    subtext: "Combined net yield across 12,000+ member portfolio simulations",
    icon: TrendingUp,
    isSimulated: true,
  },
  {
    label: "Premium Cards Evaluated",
    value: "14 Cards",
    subtext: "Verified ground truth across HDFC, Axis, SBI, Amex & ICICI",
    icon: CreditCard,
    isSimulated: false,
  },
  {
    label: "CIBIL Score Impact",
    value: "0 Points",
    subtext: "All underwriting and approval simulations run 100% client-side",
    icon: Shield,
    isSimulated: false,
  },
  {
    label: "Grounded Terms Citing",
    value: "100%",
    subtext: "Every reward multiplier and milestone linked to official PDFs",
    icon: Percent,
    isSimulated: false,
  },
];

export function StatsSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-y border-line/50 bg-surface/30 backdrop-blur-md z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="glass-panel p-6 relative overflow-hidden card-3d-tilt transition-all group"
              >
                {/* Background accent glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-xl pointer-events-none group-hover:bg-gold/10 transition-colors" />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                  {stat.isSimulated && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border border-gold/30 bg-gold/5 text-gold/80">
                      Example Data
                    </span>
                  )}
                </div>

                <div className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-text mb-2">
                  {mounted ? stat.value : "—"}
                </div>
                <div className="text-sm font-semibold text-text mb-1">
                  {stat.label}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
