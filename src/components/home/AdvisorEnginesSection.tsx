"use client";

import React, { useState } from "react";
import {
  Compass,
  ShoppingBag,
  Gift,
  Layers,
  Plane,
  Hotel,
  Car,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/store/useAppStore";

type EngineTab = "trip" | "purchase" | "redemption" | "wallet";

interface DestinationPlan {
  city: string;
  country: string;
  flights: string;
  hotels: string;
  cabs: string;
  shopping: string;
  forex: string;
  lounge: string;
  estSavings: string;
}

const DESTINATIONS: Record<string, DestinationPlan> = {
  dubai: {
    city: "Dubai",
    country: "United Arab Emirates",
    flights: "Book Emirates flights via HDFC SmartBuy (10x points) or transfer Axis Atlas EDGE Miles to Singapore KrisFlyer / Air India.",
    hotels: "Transfer Atlas EDGE Miles to Accor Live Limitless (1:2 ratio) for Fairmont or Sofitel Dubai Downtown.",
    cabs: "Use Uber UAE with HDFC Infinia (2% forex markup is offset by 3.3% base reward rate).",
    shopping: "Swipe Infinia or Diners Black at Dubai Mall for 3.3% net return + VAT tax refund at airport kiosks.",
    forex: "2.0% markup saves 1.5% compared to standard 3.5% cards. Net positive returns on all retail spends.",
    lounge: "Unlimited Priority Pass access at Dubai Terminal 1, 2, and 3 (Marhaba and Ahlan Lounges).",
    estSavings: "₹28,500 – ₹75,000",
  },
  london: {
    city: "London",
    country: "United Kingdom",
    flights: "Virgin Atlantic Flying Club off-peak Business Class requires 42,500 points (transfer 1:1 from Amex/HDFC) + taxes.",
    hotels: "Marriott Bonvoy or IHG points via Amex / Axis. Transfer points to IHG One Rewards or Marriott.",
    cabs: "London Underground contactless tap with low forex card (Infinia 2% markup).",
    shopping: "Bicester Village & Harrods: High value shopping triggers annual milestone spend targets.",
    forex: "2.0% low markup saves ₹7,500 per ₹5L spend over standard credit cards.",
    lounge: "Unlimited Priority Pass at Heathrow T2, T3, T4, and T5 (Plaza Premium Lounges).",
    estSavings: "₹65,000 – ₹1,80,000",
  },
  singapore: {
    city: "Singapore",
    country: "Singapore",
    flights: "Singapore Airlines KrisFlyer Saver Business award requires 43,000 miles (1:1 transfer from HDFC / Axis).",
    hotels: "Accor Live Limitless transfer (1:2 ratio) for Raffles Singapore or Swissôtel The Stamford.",
    cabs: "Grab app rides linked to credit card with international travel multiplier.",
    shopping: "Orchard Road shopping with direct 3.3% reward points accrual.",
    forex: "2.0% low forex markup beats cash currency exchange rates at Changi Airport.",
    lounge: "Complimentary access to SATS Premier Lounges across all 4 Changi Airport terminals.",
    estSavings: "₹38,000 – ₹95,000",
  },
  paris: {
    city: "Paris",
    country: "France",
    flights: "Air France / KLM Flying Blue Promo Awards start at 40,000 miles in Business (1:1 transfer from HDFC/Axis).",
    hotels: "Accor ALL luxury redemption at Pullman or Novotel Paris Tour Eiffel.",
    cabs: "Paris Metro & G7 Cabs via digital contactless payment.",
    shopping: "Galeries Lafayette luxury purchases: claim 12% French VAT refund + 3.3% card rewards.",
    forex: "2.0% forex markup eliminates bank gouging on Euro transactions.",
    lounge: "Paris CDG Terminal 2E Priority Pass lounges with French champagne bar.",
    estSavings: "₹52,000 – ₹1,40,000",
  },
};

export function AdvisorEnginesSection() {
  const [activeTab, setActiveTab] = useState<EngineTab>("trip");
  const [selectedDest, setSelectedDest] = useState<string>("dubai");
  const { openAdvisor } = useAppStore();

  const destPlan = DESTINATIONS[selectedDest];

  return (
    <section id="engines" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            4-in-1 Advisory Engines
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-text tracking-tight mb-4">
            Custom playbooks for <br />
            <span className="italic font-normal text-gold">trips, purchases & point redemptions.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Move beyond generic card lists. Select an execution engine to view verified 5-part category strategies grounded in bank regulations.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 sm:gap-3 p-1.5 rounded-2xl glass-panel max-w-2xl mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("trip")}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "trip"
                ? "bg-gradient-to-r from-gold to-gold-deep text-slate-950 shadow-gold"
                : "text-text-muted hover:text-text hover:bg-surface/50"
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>Trip Planner</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("purchase")}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "purchase"
                ? "bg-gradient-to-r from-gold to-gold-deep text-slate-950 shadow-gold"
                : "text-text-muted hover:text-text hover:bg-surface/50"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Item Purchase</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("redemption")}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "redemption"
                ? "bg-gradient-to-r from-gold to-gold-deep text-slate-950 shadow-gold"
                : "text-text-muted hover:text-text hover:bg-surface/50"
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Point Valuation</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("wallet")}
            className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "wallet"
                ? "bg-gradient-to-r from-gold to-gold-deep text-slate-950 shadow-gold"
                : "text-text-muted hover:text-text hover:bg-surface/50"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Wallet Router</span>
          </button>
        </div>

        {/* Tab 1: Destination Trip Planner */}
        {activeTab === "trip" && (
          <div className="glass-panel p-6 sm:p-10 space-y-8 animate-fade-in">
            {/* Destination Switcher Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-gold block mb-1">
                  Select International Route
                </span>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(DESTINATIONS).map((destKey) => (
                    <button
                      key={destKey}
                      type="button"
                      onClick={() => setSelectedDest(destKey)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                        selectedDest === destKey
                          ? "border-gold bg-gold/15 text-gold shadow-gold"
                          : "border-line bg-surface/60 text-text-muted hover:border-gold/40 hover:text-text"
                      }`}
                    >
                      {DESTINATIONS[destKey].city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-text-muted block">Estimated Net Trip Savings:</span>
                <span className="font-serif text-2xl sm:text-3xl font-light text-success">
                  {destPlan.estSavings}
                </span>
              </div>
            </div>

            {/* 5-Part Strategy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl border border-line bg-surface/60 space-y-2 card-3d-tilt">
                <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider">
                  <Plane className="w-4 h-4" /> 1. Flights Strategy
                </div>
                <p className="text-xs sm:text-sm text-text leading-relaxed">
                  {destPlan.flights}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-line bg-surface/60 space-y-2 card-3d-tilt">
                <div className="flex items-center gap-2 text-violet font-bold text-xs uppercase tracking-wider">
                  <Hotel className="w-4 h-4" /> 2. Hotels Strategy
                </div>
                <p className="text-xs sm:text-sm text-text leading-relaxed">
                  {destPlan.hotels}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-line bg-surface/60 space-y-2 card-3d-tilt">
                <div className="flex items-center gap-2 text-success font-bold text-xs uppercase tracking-wider">
                  <Car className="w-4 h-4" /> 3. Local Cabs & Transit
                </div>
                <p className="text-xs sm:text-sm text-text leading-relaxed">
                  {destPlan.cabs}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-line bg-surface/60 space-y-2 card-3d-tilt">
                <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider">
                  <ShoppingBag className="w-4 h-4" /> 4. Shopping & VAT Refund
                </div>
                <p className="text-xs sm:text-sm text-text leading-relaxed">
                  {destPlan.shopping}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-line bg-surface/60 space-y-2 card-3d-tilt">
                <div className="flex items-center gap-2 text-violet font-bold text-xs uppercase tracking-wider">
                  <CreditCard className="w-4 h-4" /> 5. Forex & Markup Math
                </div>
                <p className="text-xs sm:text-sm text-text leading-relaxed">
                  {destPlan.forex}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-line bg-surface/60 space-y-2 card-3d-tilt">
                <div className="flex items-center gap-2 text-success font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> 6. Airport Lounge Privileges
                </div>
                <p className="text-xs sm:text-sm text-text leading-relaxed">
                  {destPlan.lounge}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line">
              <span className="text-xs text-text-muted">
                Transfer ratios verified effective for August 2025 airline partnership terms.
              </span>
              <button
                type="button"
                onClick={() => openAdvisor(`Plan my full award travel booking for a trip to ${destPlan.city}`)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gold hover:text-gold-light"
              >
                <span>Ask AI Copilot for complete {destPlan.city} day-by-day award itinerary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Item Purchase Strategy */}
        {activeTab === "purchase" && (
          <div className="glass-panel p-6 sm:p-10 space-y-6 animate-fade-in">
            <h3 className="font-serif text-2xl font-normal text-text">
              High-Ticket Purchase Profitability Analyzer
            </h3>
            <p className="text-sm text-text-muted">
              Should you swipe a credit card for an automobile, laptop, or home renovation? Evaluate dealer swipe fee surcharges against reward milestone bonuses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-gold/40 bg-surface/70 space-y-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-gold/15 text-gold border border-gold/30">
                  Vehicle / Car Purchase
                </span>
                <div className="font-bold text-text text-base">Dealer Surcharge Math</div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Auto dealerships charge 1.5% to 2.0% swipe surcharge (₹15,000 on ₹10L). Swiping is <strong>PROFITABLE</strong> only if hitting annual milestone bonuses (e.g. Amex 40k MR bonus or Infinia ₹10L fee waiver). If dealer charges &gt; 2.2%, pay via NEFT.
                </p>
                <div className="text-xs font-semibold text-success flex items-center gap-1.5 pt-2">
                  <CheckCircle2 className="w-4 h-4" /> Net Benefit: +₹15,000 to +₹35,000
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-violet/40 bg-surface/70 space-y-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-violet/15 text-violet border border-violet/30">
                  iPhone / Electronics
                </span>
                <div className="font-bold text-text text-base">Amazon / SmartBuy Vouchers</div>
                <p className="text-xs text-text-muted leading-relaxed">
                  Zero merchant surcharge on official Apple / Reliance Digital channels. Buy Amazon Pay vouchers on HDFC SmartBuy for 5x rewards (16.6% return), or swipe SBI Cashback for flat 5% statement credit.
                </p>
                <div className="text-xs font-semibold text-success flex items-center gap-1.5 pt-2">
                  <CheckCircle2 className="w-4 h-4" /> Net Benefit: +₹6,000 to +₹18,000
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-red-500/40 bg-surface/70 space-y-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-red-500/15 text-red-400 border border-red-500/30">
                  Gold & Jewelry (MCC 5944)
                </span>
                <div className="font-bold text-text text-base">Category Exclusion Warning</div>
                <p className="text-xs text-text-muted leading-relaxed">
                  <strong>EXCLUDED from reward points</strong> across HDFC, Axis, SBI, and ICICI to prevent merchant arbitrage. Swiping ₹5 Lakhs earns 0 points. Opt for 0% No-Cost EMI merchant discount schemes instead.
                </p>
                <div className="text-xs font-semibold text-red-400 flex items-center gap-1.5 pt-2">
                  <AlertTriangle className="w-4 h-4" /> Zero Points Accrual
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Point Valuation Guide */}
        {activeTab === "redemption" && (
          <div className="glass-panel p-6 sm:p-10 space-y-6 animate-fade-in">
            <h3 className="font-serif text-2xl font-normal text-text">
              Real Rupee Valuation Per Point (RPP)
            </h3>
            <p className="text-sm text-text-muted">
              Never redeem credit card points for statement cash or merchandise catalogs. Compare real redemption tiers across Indian bank programs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl border border-red-900/40 bg-surface/50 text-center space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                  Worst Value
                </span>
                <div className="font-serif text-3xl font-light text-text">₹0.20 – ₹0.30</div>
                <div className="font-semibold text-xs text-text">Statement Cash Credit</div>
                <p className="text-[11px] text-text-muted">
                  Banks penalize cash redemption by 70%+. Avoid this option unless points are expiring in 48 hours.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-line bg-surface/50 text-center space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Average Value
                </span>
                <div className="font-serif text-3xl font-light text-text">₹0.35 – ₹0.50</div>
                <div className="font-semibold text-xs text-text">Brand Vouchers (Croma/Myntra)</div>
                <p className="text-[11px] text-text-muted">
                  Standard Gyftr and bank reward catalog gift cards. Moderate liquidity, moderate return.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-violet/40 bg-surface/50 text-center space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet">
                  High Value
                </span>
                <div className="font-serif text-3xl font-light text-text">₹0.80 – ₹1.20</div>
                <div className="font-semibold text-xs text-text">SmartBuy Flights & KrisFlyer</div>
                <p className="text-[11px] text-text-muted">
                  1:1 direct flight booking on HDFC SmartBuy portal or 1:1 transfer to airline partners.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-gold/40 bg-gold/5 text-center space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold font-bold">
                  ★ Maximum Sweet Spot
                </span>
                <div className="font-serif text-3xl font-light text-gold">₹1.80+</div>
                <div className="font-semibold text-xs text-text">Accor ALL & Luxury Awards</div>
                <p className="text-[11px] text-text-muted">
                  Transfer Axis EDGE Miles to Accor Live Limitless (1:2 ratio) for ₹1.80 per point at Sofitel/Fairmont.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Wallet Router */}
        {activeTab === "wallet" && (
          <div className="glass-panel p-6 sm:p-10 space-y-6 animate-fade-in">
            <h3 className="font-serif text-2xl font-normal text-text">
              Merchant Category Routing Table
            </h3>
            <p className="text-sm text-text-muted">
              Swipe the right plastic for every swipe to avoid missing out on 5x and 10x multipliers.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-line text-text-muted text-[11px] uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Spend Category</th>
                    <th className="pb-3 font-semibold">Recommended Card</th>
                    <th className="pb-3 font-semibold">Reward Rate</th>
                    <th className="pb-3 font-semibold">Execution Tip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/40">
                  <tr>
                    <td className="py-3.5 font-bold text-text">Flights & Hotels</td>
                    <td className="py-3.5 text-gold font-medium">HDFC Infinia / Axis Atlas</td>
                    <td className="py-3.5 text-success font-semibold">10x to 33.3% Return</td>
                    <td className="py-3.5 text-text-muted text-xs">Route via SmartBuy or direct airline portal</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-text">Restaurants & Zomato</td>
                    <td className="py-3.5 text-gold font-medium">HDFC Diners Black / Infinia</td>
                    <td className="py-3.5 text-success font-semibold">5x Points (16.6%)</td>
                    <td className="py-3.5 text-text-muted text-xs">Uncapped rewards on all dining POS swipes</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-text">Quick-Commerce & Blinkit</td>
                    <td className="py-3.5 text-gold font-medium">SBI Cashback Card</td>
                    <td className="py-3.5 text-success font-semibold">5% Direct Cashback</td>
                    <td className="py-3.5 text-text-muted text-xs">Auto statement credit up to ₹5,000 monthly</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-text">Amazon Shopping</td>
                    <td className="py-3.5 text-gold font-medium">ICICI Amazon Pay</td>
                    <td className="py-3.5 text-success font-semibold">5% Unlimited Cashback</td>
                    <td className="py-3.5 text-text-muted text-xs">Lifetime Free card with zero annual fee</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-bold text-text">International Trips</td>
                    <td className="py-3.5 text-gold font-medium">HDFC Infinia (2% Forex)</td>
                    <td className="py-3.5 text-success font-semibold">+1.3% Net Yield</td>
                    <td className="py-3.5 text-text-muted text-xs">Base 3.3% reward beats 2% forex markup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
