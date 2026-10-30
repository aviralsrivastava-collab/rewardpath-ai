"use client";

import React from "react";
import { Layers, Check, ArrowRight, RefreshCw } from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";
import { SEED_CARDS } from "@/lib/data/seed-cards";

interface DowngradePath {
  cardName: string;
  recommendedAction: string;
  downgradeOption: string;
  preservesLimit: boolean;
  retentionScript: string;
}

const DOWNGRADE_PLAYBOOK: Record<string, DowngradePath> = {
  "hdfc-infinia-metal": {
    cardName: "HDFC Infinia Metal",
    recommendedAction: "Spend ₹10L to trigger automatic fee waiver, or request 10,000 bonus points retention.",
    downgradeOption: "Downgrade to HDFC Regalia Gold (Lifetime Free / ₹2.5k fee) or Millennia.",
    preservesLimit: true,
    retentionScript:
      "Ask retention desk: 'I am evaluating my card portfolio due to the ₹12,500 renewal fee. Are there spend-based retention offers or fee reversal bonuses available on my account?'",
  },
  "axis-atlas": {
    cardName: "Axis Bank Atlas",
    recommendedAction: "Achieve ₹7.5L spend for 10,000 bonus miles milestone which easily offsets the ₹5,000 fee.",
    downgradeOption: "Downgrade to Axis Horizon, Axis Select, or Lifetime Free Axis MyZone.",
    preservesLimit: true,
    retentionScript:
      "Quote competitor offerings: 'Other banks offer lower renewal thresholds. Can you verify if my account qualifies for an annual spend fee waiver?'",
  },
  "amex-plat-travel": {
    cardName: "Amex Platinum Travel",
    recommendedAction: "Complete ₹4L spend within card anniversary to unlock ₹10k Taj voucher + 40,000 MR points.",
    downgradeOption: "Product change to Amex Membership Rewards Gold or Amex SmartEarn.",
    preservesLimit: true,
    retentionScript:
      "Amex frequently offers 5,000 to 10,000 Membership Rewards points as a renewal courtesy if asked politely.",
  },
};

export function WalletOptimizerSection() {
  const { walletCardIds, toggleWalletCard, openAdvisor } = useAppStore();

  const activeWalletCards = SEED_CARDS.filter((c) => walletCardIds.includes(c.id));

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet/30 bg-violet/10 text-violet text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            Active Wallet & Retention Playbook
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-text tracking-tight mb-4">
            Wallet multiplier router <br />
            <span className="italic font-normal text-gold">& annual fee downgrade strategies.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Select the cards you currently carry. RewardPath generates a custom swipe-routing rule for every purchase, plus step-by-step scripts to get fees waived.
          </p>
        </div>

        {/* Card Selection Chips */}
        <div className="mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted block">
            Select Cards Currently in Your Wallet:
          </span>
          <div className="flex flex-wrap gap-2">
            {SEED_CARDS.map((card) => {
              const inWallet = walletCardIds.includes(card.id);
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => toggleWalletCard(card.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    inWallet
                      ? "border-gold bg-gold/20 text-gold shadow-gold"
                      : "border-line bg-surface/60 text-text-muted hover:border-gold/40 hover:text-text"
                  }`}
                >
                  {inWallet && <Check className="w-3.5 h-3.5 inline mr-1" />}
                  {card.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Wallet Routing Table (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="font-serif text-lg font-normal text-text">
                Your Customized Category Routing
              </h3>
              <span className="text-xs text-gold font-bold">
                {activeWalletCards.length} Cards Selected
              </span>
            </div>

            {activeWalletCards.length === 0 ? (
              <div className="text-center py-10 text-xs text-text-muted">
                Please select at least one card above to generate your wallet swipe routing table.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-line bg-surface/60 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-text block">1. Flights & Airlines</span>
                    <span className="text-text-muted text-[11px]">Primary travel booking channel</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gold block">
                      {activeWalletCards.find((c) => c.rewardCategories.travel >= 5)?.name || activeWalletCards[0].name}
                    </span>
                    <span className="text-success text-[10px] font-semibold">Highest Travel Multiplier</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-line bg-surface/60 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-text block">2. Dining & Swiggy/Zomato</span>
                    <span className="text-text-muted text-[11px]">Restaurant meals & food delivery</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gold block">
                      {activeWalletCards.find((c) => c.rewardCategories.dining >= 4)?.name || activeWalletCards[0].name}
                    </span>
                    <span className="text-success text-[10px] font-semibold">5x Dining Reward Multiplier</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-line bg-surface/60 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-text block">3. Groceries & Quick-Commerce</span>
                    <span className="text-text-muted text-[11px]">Blinkit, Instamart & supermarkets</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gold block">
                      {activeWalletCards.find((c) => c.rewardCategories.groceries >= 4)?.name || activeWalletCards[0].name}
                    </span>
                    <span className="text-success text-[10px] font-semibold">5% Direct Cashback</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-line bg-surface/60 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-text block">4. Overseas / International Swipes</span>
                    <span className="text-text-muted text-[11px]">Foreign currency transactions</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-gold block">
                      {activeWalletCards.find((c) => c.forexMarkup <= 2.0)?.name || activeWalletCards[0].name}
                    </span>
                    <span className="text-success text-[10px] font-semibold">Low Forex Surcharge</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Retention & Downgrade Playbook (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 border-b border-line pb-4">
              <RefreshCw className="w-4 h-4 text-gold" />
              <h3 className="font-serif text-lg font-normal text-text">
                Fee Retention Playbook
              </h3>
            </div>

            <div className="space-y-4 text-xs text-text">
              <div className="p-3.5 rounded-xl bg-surface/60 border border-line space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-gold block">
                  Rule 1: Never Close Cards Blindly
                </span>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  Closing your oldest credit card reduces your total credit limit and cuts your credit history length, temporarily dropping your CIBIL score by 15-30 points.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/60 border border-line space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-violet block">
                  Rule 2: Request A Product Change
                </span>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  Instead of closing, request a <em>Product Change</em> to a Lifetime Free (LTF) card. This preserves your credit card number, limit, and 100% of your bureau vintage.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface/60 border border-line space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-success block">
                  Rule 3: Phone Banking Retention Script
                </span>
                <p className="text-text-muted text-[11px] italic">
                  &ldquo;I notice my renewal fee of ₹12,500 has been debited. Given my annual spends across the year, I would like to check if my account is eligible for a retention points offer or spend-based reversal.&rdquo;
                </p>
              </div>

              {activeWalletCards.some((c) => DOWNGRADE_PLAYBOOK[c.id]) && (
                <div className="p-3.5 rounded-xl bg-gold/5 border border-gold/30 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-gold block">
                    Your Wallet Specific Downgrade Options:
                  </span>
                  {activeWalletCards.filter((c) => DOWNGRADE_PLAYBOOK[c.id]).map((c) => (
                    <div key={c.id} className="text-[11px] text-text-muted">
                      <span className="font-semibold text-text">{c.name}: </span>
                      {DOWNGRADE_PLAYBOOK[c.id].downgradeOption}
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => openAdvisor("Generate a custom retention script to get my credit card annual fee waived")}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gold/40 bg-gold/10 text-gold font-bold text-xs hover:bg-gold/20 transition-all cursor-pointer"
              >
                <span>Ask AI for custom bank retention scripts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
