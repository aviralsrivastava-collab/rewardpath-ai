"use client";

import { useState } from "react";
import { Zap, Sparkles, CheckCircle2 } from "lucide-react";

export function WalletOptimizer() {
  const [selectedCards, setSelectedCards] = useState<string[]>(["hdfc-infinia-metal", "axis-atlas"]);

  const allCardsList = [
    { id: "hdfc-infinia-metal", name: "HDFC Infinia Metal", dining: "5x", travel: "10x", groceries: "3x", gas: "2x", travelScore: 10, diningScore: 5, groceriesScore: 3 },
    { id: "hdfc-diners-black-metal", name: "HDFC Diners Black", dining: "5x", travel: "10x", groceries: "3.3x", gas: "2x", travelScore: 10, diningScore: 5, groceriesScore: 3.3 },
    { id: "axis-atlas", name: "Axis Bank Atlas", dining: "2x", travel: "5x", groceries: "2x", gas: "2x", travelScore: 5, diningScore: 2, groceriesScore: 2 },
    { id: "axis-magnus-burgundy", name: "Axis Magnus Burgundy", dining: "4.8x", travel: "9.6x", groceries: "4.8x", gas: "2x", travelScore: 9.6, diningScore: 4.8, groceriesScore: 4.8 },
    { id: "sbi-cashback", name: "SBI Cashback Card", dining: "5%", travel: "5%", groceries: "5%", gas: "1%", travelScore: 5, diningScore: 5, groceriesScore: 5 },
    { id: "hdfc-regalia-gold", name: "HDFC Regalia Gold", dining: "4x", travel: "4x", groceries: "4x", gas: "1x", travelScore: 4, diningScore: 4, groceriesScore: 4 },
    { id: "hdfc-millennia", name: "HDFC Millennia", dining: "5%", travel: "5%", groceries: "5%", gas: "1%", travelScore: 5, diningScore: 5, groceriesScore: 5 },
    { id: "amex-plat-travel", name: "Amex Plat Travel", dining: "3x", travel: "4x", groceries: "3x", gas: "1x", travelScore: 4, diningScore: 3, groceriesScore: 3 },
    { id: "amex-gold-card", name: "Amex Gold Card", dining: "5x", travel: "4x", groceries: "5x", gas: "1x", travelScore: 4, diningScore: 5, groceriesScore: 5 },
    { id: "sbi-simplyclick", name: "SBI SimplyCLICK", dining: "2.5x", travel: "2.5x", groceries: "2.5x", gas: "1x", travelScore: 2.5, diningScore: 2.5, groceriesScore: 2.5 },
    { id: "icici-amazon-pay", name: "ICICI Amazon Pay", dining: "2%", travel: "5%", groceries: "5%", gas: "1%", travelScore: 5, diningScore: 2, groceriesScore: 5 },
  ];

  const toggleCard = (id: string) => {
    if (selectedCards.includes(id)) {
      if (selectedCards.length > 1) {
        setSelectedCards(selectedCards.filter((c) => c !== id));
      }
    } else {
      setSelectedCards([...selectedCards, id]);
    }
  };

  const downgradeMatrix = [
    {
      currentCard: "HDFC Infinia / Diners Black Metal (₹10,000-₹12,500 fee)",
      action: "Product-Change to HDFC Regalia Gold / Retain via ₹10L milestone fee waiver",
      benefit: "Retains SmartBuy 5x-10x multipliers and Taj/Accor transfer partners.",
    },
    {
      currentCard: "Axis Bank Atlas / Magnus (₹5,000-₹12,500 fee)",
      action: "Product-Change to Axis Horizon / Privilege if travel spend decreases",
      benefit: "Keeps EDGE Miles active with lower annual maintenance threshold.",
    },
    {
      currentCard: "Amex Platinum Travel (₹5,000 fee)",
      action: "Product-Change to Amex Membership Rewards Credit Card (₹0 fee waiver retention)",
      benefit: "Preserves 18k/24k gold collection milestone redemptions.",
    },
  ];

  const activeCards = allCardsList.filter((c) => selectedCards.includes(c.id));

  // Determine optimal card for each category dynamically among user's active wallet cards
  const bestTravelCard = [...activeCards].sort((a, b) => b.travelScore - a.travelScore)[0] ?? activeCards[0];
  const bestDiningCard = [...activeCards].sort((a, b) => b.diningScore - a.diningScore)[0] ?? activeCards[0];
  const bestGroceriesCard = [...activeCards].sort((a, b) => b.groceriesScore - a.groceriesScore)[0] ?? activeCards[0];

  return (
    <section id="optimizer" className="px-3.5 py-16 sm:px-6 sm:py-20 bg-slate-900 text-white border-t border-slate-800">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <Zap className="h-3.5 w-3.5" />
            <span>Accelerator & Downgrade Engine</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
            Wallet Multiplier & Downgrade Arbitrage
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Select the cards currently in your wallet to compute category routing & downgrade playbooks.
          </p>
        </div>

        {/* Card Selector Pills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-6 sm:mb-8">
          {allCardsList.map((c) => {
            const isSelected = selectedCards.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => toggleCard(c.id)}
                aria-pressed={isSelected}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all cursor-pointer border active:scale-98 ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg"
                    : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                }`}
              >
                <CheckCircle2 className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ${isSelected ? "text-slate-950" : "text-slate-600"}`} />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Optimization Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Active Routing */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 space-y-4 shadow-xl">
            <h3 className="text-xs sm:text-sm font-bold uppercase text-amber-400 tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0" /> Category Spend Routing Strategy
            </h3>
            <div className="space-y-2.5 sm:space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span>✈️ <strong>Travel & Airfare:</strong></span>
                <span className="text-emerald-400 font-extrabold">Route to {bestTravelCard.name} ({bestTravelCard.travel})</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span>🍽️ <strong>Dining & Delivery:</strong></span>
                <span className="text-emerald-400 font-extrabold">Route to {bestDiningCard.name} ({bestDiningCard.dining})</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span>🛒 <strong>Groceries & Shopping:</strong></span>
                <span className="text-emerald-400 font-extrabold">Route to {bestGroceriesCard.name} ({bestGroceriesCard.groceries})</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span>⛽ <strong>Fuel & Gas Stations:</strong></span>
                <span className="text-amber-400 font-extrabold">Surcharge Waiver Active (Up to ₹4,000/mo)</span>
              </div>
            </div>
          </div>

          {/* Downgrade Playbook */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-6 space-y-4 shadow-xl">
            <h3 className="text-xs sm:text-sm font-bold uppercase text-cyan-400 tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4 shrink-0" /> Fee Avoidance & Retention Playbook
            </h3>
            <div className="space-y-3 text-xs">
              {downgradeMatrix.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold text-xs">{item.currentCard}</span>
                  <p className="text-white font-medium">{item.action}</p>
                  <p className="text-slate-400 text-[11px] leading-relaxed">{item.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
