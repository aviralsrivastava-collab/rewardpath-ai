"use client";

import React from "react";
import { GitCompare, Check, Trophy, ExternalLink } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { SEED_CARDS } from "@/lib/data/seed-cards";
import { formatCurrency } from "@/lib/utils";

export function CardComparisonSection() {
  const { comparisonCardIds, toggleComparisonCard } = useAppStore();

  const selectedCards = SEED_CARDS.filter((c) => comparisonCardIds.includes(c.id));

  return (
    <section id="compare" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/30 bg-violet/10 text-violet text-xs font-semibold uppercase tracking-wider mb-3">
            <GitCompare className="w-3.5 h-3.5" />
            Side-by-Side Matrix
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-text tracking-tight mb-4">
            Benchmark <br />
            <span className="italic font-normal text-gold">up to 3 cards simultaneously.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Select cards below to contrast fee waiver thresholds, lounge allowances, forex markups, and transfer networks.
          </p>
        </div>

        {/* Card Selector Chips */}
        <div className="mb-8 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted block">
            Select up to 3 cards to compare:
          </span>
          <div className="flex flex-wrap gap-2">
            {SEED_CARDS.map((card) => {
              const isSelected = comparisonCardIds.includes(card.id);
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => toggleComparisonCard(card.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    isSelected
                      ? "border-gold bg-gold/20 text-gold shadow-gold"
                      : "border-line bg-surface/60 text-text-muted hover:border-gold/40 hover:text-text"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 inline mr-1" />}
                  {card.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Side-by-Side Table with horizontal scroll on mobile */}
        <div className="glass-panel overflow-hidden border-line">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[700px] text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-line bg-surface/80">
                  <th className="p-4 sm:p-5 text-text-muted font-bold text-xs uppercase tracking-wider w-1/4">
                    Comparison Metric
                  </th>
                  {selectedCards.map((card) => (
                    <th key={card.id} className="p-4 sm:p-5 text-text font-bold text-sm sm:text-base">
                      <div className="font-serif text-gold text-base sm:text-lg">{card.name}</div>
                      <span className="text-[11px] text-text-muted font-sans font-normal">{card.issuer}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line/40">
                {/* Metric 1: Annual Fee */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-text bg-surface/30">Annual Fee</td>
                  {selectedCards.map((card) => {
                    const isLowest = Math.min(...selectedCards.map((c) => c.annualFee)) === card.annualFee;
                    return (
                      <td key={card.id} className="p-4 sm:p-5">
                        <div className="font-bold text-text">
                          {card.annualFee === 0 ? "₹0 (Lifetime Free)" : formatCurrency(card.annualFee)}
                        </div>
                        {isLowest && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success mt-1">
                            <Trophy className="w-3 h-3" /> Lowest Fee
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Metric 2: Fee Waiver Spend */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-text bg-surface/30">Fee Waiver Threshold</td>
                  {selectedCards.map((card) => (
                    <td key={card.id} className="p-4 sm:p-5 text-text">
                      {card.feeWaiverThresholdINR && card.feeWaiverThresholdINR > 0
                        ? `${formatCurrency(card.feeWaiverThresholdINR)} / year`
                        : "No Waiver / N/A"}
                    </td>
                  ))}
                </tr>

                {/* Metric 3: Forex Markup */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-text bg-surface/30">Forex Markup Fee</td>
                  {selectedCards.map((card) => {
                    const isLowestForex = Math.min(...selectedCards.map((c) => c.forexMarkup)) === card.forexMarkup;
                    return (
                      <td key={card.id} className="p-4 sm:p-5">
                        <span className="font-bold text-text">{card.forexMarkup}%</span>
                        {isLowestForex && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-gold ml-2">
                            <Trophy className="w-3 h-3" /> Best Forex
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Metric 4: Lounge Access */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-text bg-surface/30">Lounge Privileges</td>
                  {selectedCards.map((card) => (
                    <td key={card.id} className="p-4 sm:p-5 text-text-muted text-xs leading-relaxed">
                      {card.loungeAccessSummary}
                    </td>
                  ))}
                </tr>

                {/* Metric 5: Welcome Bonus */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-text bg-surface/30">Welcome Bonus</td>
                  {selectedCards.map((card) => (
                    <td key={card.id} className="p-4 sm:p-5 text-text">
                      <div className="font-bold text-gold">
                        {card.welcomeBonusPoints.toLocaleString()} points
                      </div>
                      <div className="text-[11px] text-text-muted">
                        On ₹{card.welcomeBonusSpendRequired.toLocaleString()} spend in {card.welcomeBonusMonths} mo
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Metric 6: Transfer Partners */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-text bg-surface/30">Transfer Partners</td>
                  {selectedCards.map((card) => (
                    <td key={card.id} className="p-4 sm:p-5 text-xs text-text">
                      {card.transferPartners.length > 0
                        ? card.transferPartners.join(", ")
                        : "Direct Statement Cashback"}
                    </td>
                  ))}
                </tr>

                {/* Metric 7: Verification Source */}
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-text bg-surface/30">Terms Verification</td>
                  {selectedCards.map((card) => (
                    <td key={card.id} className="p-4 sm:p-5 text-xs">
                      <a
                        href={card.sourceDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gold hover:underline font-medium"
                      >
                        <span>Official Bank PDF</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <div className="text-[10px] text-text-muted mt-0.5">Checked: {card.lastSourceChecked}</div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
