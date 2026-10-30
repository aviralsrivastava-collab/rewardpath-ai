"use client";

import React, { useState } from "react";
import { Plane, CheckCircle, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface RoutePreset {
  name: string;
  cashFare: number;
  points: number;
  taxes: number;
  route: string;
  program: string;
}

const PRESETS: RoutePreset[] = [
  {
    name: "Mumbai → London (Business)",
    route: "BOM → LHR",
    cashFare: 220000,
    points: 42500,
    taxes: 12500,
    program: "Virgin Atlantic Flying Club",
  },
  {
    name: "Delhi → Singapore (Saver)",
    route: "DEL → SIN",
    cashFare: 145000,
    points: 43000,
    taxes: 4200,
    program: "Singapore Airlines KrisFlyer",
  },
  {
    name: "Mumbai → Dubai (Emirates)",
    route: "BOM → DXB",
    cashFare: 36000,
    points: 25000,
    taxes: 4800,
    program: "Emirates Skywards",
  },
  {
    name: "Delhi → Goa (Domestic Cash Trap)",
    route: "DEL → GOI",
    cashFare: 5500,
    points: 12500,
    taxes: 1200,
    program: "Domestic Bank Portal",
  },
];

export function PointsBreakevenSection() {
  const [cashFare, setCashFare] = useState<number>(220000);
  const [pointsRequired, setPointsRequired] = useState<number>(42500);
  const [taxesPaid, setTaxesPaid] = useState<number>(12500);
  const [selectedPresetName, setSelectedPresetName] = useState<string>("Mumbai → London (Business)");

  // RPP Calculation: (Cash Fare - Taxes) / Points
  const netCashSaved = Math.max(0, cashFare - taxesPaid);
  const rupeePerPoint = pointsRequired > 0 ? netCashSaved / pointsRequired : 0;

  let verdict = {
    title: "EXCELLENT SWEET SPOT",
    badgeColor: "bg-success/20 text-success border-success/40",
    description: "Tremendous award arbitrage. You are getting extraordinary return on points. Transfer and book immediately.",
    isGood: true,
  };

  if (rupeePerPoint < 0.5) {
    verdict = {
      title: "POOR VALUE — PAY CASH",
      badgeColor: "bg-red-500/20 text-red-400 border-red-500/40",
      description: "Low yield. You are receiving under ₹0.50 per point. Pay cash instead and preserve points for international business class.",
      isGood: false,
    };
  } else if (rupeePerPoint < 1.0) {
    verdict = {
      title: "DECENT AIRLINE VALUE",
      badgeColor: "bg-gold/20 text-gold border-gold/40",
      description: "Standard award redemption value. Acceptable if cash liquidity is your priority.",
      isGood: true,
    };
  }

  const applyPreset = (preset: RoutePreset) => {
    setSelectedPresetName(preset.name);
    setCashFare(preset.cashFare);
    setPointsRequired(preset.points);
    setTaxesPaid(preset.taxes);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
            <Plane className="w-3.5 h-3.5" />
            Arbitrage Breakeven Math
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-text tracking-tight mb-4">
            Points vs Cash <br />
            <span className="italic font-normal text-gold">real-time breakeven calculator.</span>
          </h2>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Calculate your exact Rupee-Per-Point (RPP) yield before transferring points to airline frequent flyer programs.
          </p>
        </div>

        {/* Route Presets Bar */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-text-muted block mb-2">
            Load Verified Flight Route Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  selectedPresetName === p.name
                    ? "border-gold bg-gold/20 text-gold shadow-gold"
                    : "border-line bg-surface/60 text-text-muted hover:border-gold/40 hover:text-text"
                }`}
              >
                <span>{p.name}</span>
                <span className="text-[10px] ml-1.5 opacity-70">({p.program.split(" ")[0]})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Inputs Column (6 cols) */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 space-y-6">
            <h3 className="font-serif text-xl font-normal text-text">Flight Fare Details</h3>

            {/* Input 1: Cash Fare */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text flex justify-between">
                <span>1. Cash Ticket Price (INR):</span>
                <span className="text-gold">{formatCurrency(cashFare)}</span>
              </label>
              <input
                type="number"
                value={cashFare}
                onChange={(e) => setCashFare(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-line bg-surface/80 px-4 py-3 text-sm text-text focus:border-gold focus:outline-none"
              />
            </div>

            {/* Input 2: Points Required */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text flex justify-between">
                <span>2. Award Miles / Points Required:</span>
                <span className="text-gold">{pointsRequired.toLocaleString()} pts</span>
              </label>
              <input
                type="number"
                value={pointsRequired}
                onChange={(e) => setPointsRequired(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-xl border border-line bg-surface/80 px-4 py-3 text-sm text-text focus:border-gold focus:outline-none"
              />
            </div>

            {/* Input 3: Taxes Paid in Cash */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text flex justify-between">
                <span>3. Taxes & Carrier Surcharges Paid in Cash:</span>
                <span className="text-gold">{formatCurrency(taxesPaid)}</span>
              </label>
              <input
                type="number"
                value={taxesPaid}
                onChange={(e) => setTaxesPaid(Math.max(0, Number(e.target.value)))}
                className="w-full rounded-xl border border-line bg-surface/80 px-4 py-3 text-sm text-text focus:border-gold focus:outline-none"
              />
            </div>

            <div className="text-[11px] text-text-muted bg-surface/40 p-3 rounded-xl border border-line/50">
              Formula: (Cash Price ₹{cashFare.toLocaleString()} − Taxes ₹{taxesPaid.toLocaleString()}) ÷ {pointsRequired.toLocaleString()} Points = Real Rupee Value Per Point.
            </div>
          </div>

          {/* Results Card (6 cols) */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-10 border-gold/40 bg-surface/85 relative overflow-hidden shadow-glass space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Calculated Point Yield
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${verdict.badgeColor}`}>
                {verdict.title}
              </span>
            </div>

            <div>
              <div className="text-xs text-text-muted mb-1">Effective Value Per Point:</div>
              <div className="font-serif text-5xl sm:text-6xl font-light text-text flex items-baseline gap-2">
                <span className="text-gold font-normal">₹{rupeePerPoint.toFixed(2)}</span>
                <span className="text-sm font-sans text-text-muted font-normal">/ point</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-line bg-surface/70 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-text">
                {verdict.isGood ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                )}
                <span>Arbitrage Verdict & Recommendation:</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                {verdict.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-3 rounded-lg bg-surface border border-line">
                <span className="text-[10px] uppercase text-text-muted block">Net Cash Saved</span>
                <span className="font-bold text-success text-sm">{formatCurrency(netCashSaved)}</span>
              </div>
              <div className="p-3 rounded-lg bg-surface border border-line">
                <span className="text-[10px] uppercase text-text-muted block">Target Benchmark</span>
                <span className="font-bold text-text text-sm">&gt; ₹1.20 / point</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
