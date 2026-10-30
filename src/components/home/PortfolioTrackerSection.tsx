"use client";

import React, { useState } from "react";
import { Award, Plus, Trash2, Calendar } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { SEED_CARDS } from "@/lib/data/seed-cards";
import { formatCurrency } from "@/lib/utils";

export function PortfolioTrackerSection() {
  const { portfolio, addPortfolioCard, updatePortfolioItem, removePortfolioCard } = useAppStore();
  const [selectedAddCardId, setSelectedAddCardId] = useState<string>("sbi-cashback");

  const totalPoints = portfolio.reduce((acc, item) => acc + (item.points || 0), 0);
  const totalRupeeValuation = portfolio.reduce((acc, item) => {
    const card = SEED_CARDS.find((c) => c.id === item.cardId);
    const pointValue = card?.pointValueINR || 1.0;
    return acc + (item.points || 0) * pointValue;
  }, 0);

  const handleAdd = () => {
    addPortfolioCard(selectedAddCardId);
  };

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            Local Portfolio & Milestones
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-text tracking-tight mb-4">
            Track points, spend milestones <br />
            <span className="italic font-normal text-gold">& fee-waiver anniversary dates.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            All data persists locally in your browser storage. Track your portfolio valuation in real rupees, milestone completion rings, and renewal fee calendars.
          </p>
        </div>

        {/* Portfolio Summary Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="glass-panel p-6 space-y-1">
            <span className="text-xs uppercase font-semibold text-text-muted">Total Points Accrued</span>
            <div className="font-serif text-3xl sm:text-4xl font-light text-gold">
              {totalPoints.toLocaleString()} <span className="text-sm font-sans text-text-muted">pts</span>
            </div>
            <p className="text-xs text-text-muted">Across {portfolio.length} registered cards</p>
          </div>

          <div className="glass-panel p-6 space-y-1">
            <span className="text-xs uppercase font-semibold text-text-muted">Total Rupee Valuation</span>
            <div className="font-serif text-3xl sm:text-4xl font-light text-success">
              {formatCurrency(totalRupeeValuation)}
            </div>
            <p className="text-xs text-text-muted">Grounded at realistic partner award transfer rates</p>
          </div>

          <div className="glass-panel p-6 space-y-1">
            <span className="text-xs uppercase font-semibold text-text-muted">Active Fee Waivers</span>
            <div className="font-serif text-3xl sm:text-4xl font-light text-violet">
              {portfolio.filter((p) => p.annualSpend >= 400000).length} On Track
            </div>
            <p className="text-xs text-text-muted">Milestones pacing ahead of renewal deadlines</p>
          </div>
        </div>

        {/* Add Card to Portfolio Controls */}
        <div className="glass-panel p-4 sm:p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-text shrink-0">Add Card to Tracker:</span>
            <select
              value={selectedAddCardId}
              onChange={(e) => setSelectedAddCardId(e.target.value)}
              className="rounded-xl border border-line bg-surface/90 px-3 py-2 text-xs sm:text-sm text-text focus:border-gold focus:outline-none w-full sm:w-64 cursor-pointer"
            >
              {SEED_CARDS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-slate-950 font-bold text-xs sm:text-sm hover:opacity-90 active:scale-98 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Portfolio</span>
          </button>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolio.map((item) => {
            const card = SEED_CARDS.find((c) => c.id === item.cardId);
            if (!card) return null;

            const pointValue = card.pointValueINR || 1.0;
            const rupeeVal = (item.points || 0) * pointValue;
            const threshold = card.feeWaiverThresholdINR || card.milestoneThresholdINR || 400000;
            const progress = Math.min(100, Math.round(((item.annualSpend || 0) / threshold) * 100));

            return (
              <div key={item.cardId} className="glass-panel p-6 space-y-5 relative card-3d-tilt">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-text text-base">{card.name}</h4>
                    <span className="text-xs text-text-muted">{card.issuer}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePortfolioCard(item.cardId)}
                    title="Remove from portfolio"
                    className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-surface transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Points & Valuation */}
                <div className="p-3.5 rounded-xl border border-line bg-surface/70 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-text-muted block">Points Balance</span>
                    <input
                      type="number"
                      value={item.points}
                      onChange={(e) =>
                        updatePortfolioItem(item.cardId, { points: Math.max(0, Number(e.target.value)) })
                      }
                      className="font-serif text-lg font-normal text-gold bg-transparent w-28 focus:outline-none"
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-text-muted block">Cash Valuation</span>
                    <span className="font-bold text-success text-sm">{formatCurrency(rupeeVal)}</span>
                  </div>
                </div>

                {/* Spend Milestone Progress Ring / Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Milestone Spend: {formatCurrency(item.annualSpend)}</span>
                    <span className="font-bold text-text">{progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-line overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-success rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-text-muted">
                    <span>Target: {formatCurrency(threshold)}</span>
                    <span>{progress >= 100 ? "✓ Waived" : `${100 - progress}% remaining`}</span>
                  </div>
                </div>

                {/* Renewal Anniversary & Expiry Notice */}
                <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-line">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>Renews: <strong>{item.renewalMonth}</strong></span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-surface border border-line text-text-muted">
                    Fee: {card.annualFee === 0 ? "₹0 LTF" : formatCurrency(card.annualFee)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
