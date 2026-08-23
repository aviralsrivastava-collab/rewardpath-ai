"use client";

import { useState } from "react";
import { Zap, Sparkles, CheckCircle2 } from "lucide-react";

export function WalletOptimizer() {
  const [selectedCards, setSelectedCards] = useState<string[]>(["hdfc-infinia-metal", "axis-atlas"]);

  const allCardsList = [
    { id: "hdfc-infinia-metal", name: "HDFC Infinia Metal", dining: "5x", travel: "10x", groceries: "3x", gas: "2x" },
    { id: "hdfc-diners-black-metal", name: "HDFC Diners Black", dining: "5x", travel: "10x", groceries: "3.3x", gas: "2x" },
    { id: "axis-atlas", name: "Axis Bank Atlas", dining: "2x", travel: "5x", groceries: "2x", gas: "2x" },
    { id: "axis-magnus-burgundy", name: "Axis Magnus Burgundy", dining: "4.8x", travel: "9.6x", groceries: "4.8x", gas: "2x" },
    { id: "sbi-cashback", name: "SBI Cashback Card", dining: "5%", travel: "5%", groceries: "5%", gas: "1%" },
    { id: "hdfc-regalia-gold", name: "HDFC Regalia Gold", dining: "4x", travel: "4x", groceries: "4x", gas: "1x" },
    { id: "hdfc-millennia", name: "HDFC Millennia", dining: "5%", travel: "5%", groceries: "5%", gas: "1%" },
    { id: "amex-plat-travel", name: "Amex Plat Travel", dining: "3x", travel: "4x", groceries: "3x", gas: "1x" },
    { id: "amex-gold-card", name: "Amex Gold Card", dining: "5x", travel: "4x", groceries: "5x", gas: "1x" },
    { id: "sbi-simplyclick", name: "SBI SimplyCLICK", dining: "2.5x", travel: "2.5x", groceries: "2.5x", gas: "1x" },
    { id: "icici-amazon-pay", name: "ICICI Amazon Pay", dining: "2%", travel: "5%", groceries: "5%", gas: "1%" },
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

  return (
    <section id="optimizer" className="px-4 py-20 sm:px-6 bg-slate-900 text-white border-t border-slate-800">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <Zap className="h-3.5 w-3.5" />
            <span>Accelerator & Downgrade Engine</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Wallet Multiplier & Downgrade Arbitrage
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Select the cards currently in your wallet to compute category routing & downgrade playbooks.
          </p>
        </div>

        {/* Card Selector Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {allCardsList.map((c) => {
            const isSelected = selectedCards.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleCard(c.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg"
                    : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"
                }`}
              >
                <CheckCircle2 className={`h-4 w-4 ${isSelected ? "text-slate-950" : "text-slate-600"}`} />
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Optimization Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Routing */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase text-amber-400 tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Category Spend Routing Strategy
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span>✈️ <strong>Travel & Airfare:</strong></span>
                <span className="text-emerald-400 font-extrabold">Route to {allCardsList.find(c => selectedCards.includes(c.id))?.name ?? "Selected Card"}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span>🍽️ <strong>Dining & Swiggy/Zomato:</strong></span>
                <span className="text-emerald-400 font-extrabold">Route to {allCardsList.find(c => selectedCards.includes(c.id))?.name ?? "Selected Card"}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span>🛒 <strong>Online Groceries & Amazon:</strong></span>
                <span className="text-emerald-400 font-extrabold">Route to SBI Cashback / HDFC SmartBuy</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <span>⛽ <strong>Fuel & Gas Stations:</strong></span>
                <span className="text-amber-400 font-extrabold">Surcharge Waiver Active (Up to ₹4,000/mo)</span>
              </div>
            </div>
          </div>

          {/* Downgrade Playbook */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold uppercase text-cyan-400 tracking-wider flex items-center gap-2">
              <Zap className="h-4 w-4" /> Fee Avoidance & Retention Playbook
            </h3>
            <div className="space-y-3 text-xs">
              {downgradeMatrix.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold">{item.currentCard}</span>
                  <p className="text-white font-medium">{item.action}</p>
                  <p className="text-slate-400 text-[11px]">{item.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
