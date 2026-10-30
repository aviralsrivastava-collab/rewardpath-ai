"use client";

import React, { useState } from "react";
import { Plane, Calendar, Clock, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface AwardFlight {
  id: string;
  origin: string;
  destination: string;
  airline: string;
  cabin: "Business" | "First" | "Economy";
  dates: string;
  points: number;
  taxes: number;
  cashFareEquivalent: number;
  seatsRemaining: number;
  transferPartners: string[];
}

const AWARD_FLIGHTS: AwardFlight[] = [
  {
    id: "bom-lhr-vs",
    origin: "Mumbai (BOM)",
    destination: "London Heathrow (LHR)",
    airline: "Virgin Atlantic Upper Class",
    cabin: "Business",
    dates: "Nov 14, 2026 - Nov 28, 2026",
    points: 42500,
    taxes: 12500,
    cashFareEquivalent: 220000,
    seatsRemaining: 3,
    transferPartners: ["Amex MR (1:1)", "HDFC Infinia (1:1)", "Axis Atlas (1:2)"],
  },
  {
    id: "del-sin-sq",
    origin: "Delhi (DEL)",
    destination: "Singapore Changi (SIN)",
    airline: "Singapore Airlines KrisFlyer",
    cabin: "Business",
    dates: "Dec 05, 2026 - Dec 18, 2026",
    points: 43000,
    taxes: 4200,
    cashFareEquivalent: 145000,
    seatsRemaining: 2,
    transferPartners: ["HDFC Infinia (1:1)", "HDFC Regalia (1:1)", "Axis Atlas (1:2)"],
  },
  {
    id: "blr-dxb-ek",
    origin: "Bengaluru (BLR)",
    destination: "Dubai International (DXB)",
    airline: "Emirates Skywards",
    cabin: "Business",
    dates: "Nov 20, 2026 - Dec 02, 2026",
    points: 38000,
    taxes: 6800,
    cashFareEquivalent: 98000,
    seatsRemaining: 4,
    transferPartners: ["HDFC SmartBuy (1:1)", "Axis Travel Edge (1:1)"],
  },
  {
    id: "del-cdg-af",
    origin: "Delhi (DEL)",
    destination: "Paris Charles de Gaulle (CDG)",
    airline: "Air France Flying Blue",
    cabin: "Business",
    dates: "Jan 12, 2027 - Jan 26, 2027",
    points: 40000,
    taxes: 9800,
    cashFareEquivalent: 195000,
    seatsRemaining: 2,
    transferPartners: ["Axis Atlas (1:2)", "HDFC Infinia (1:1)"],
  },
];

export function AwardAvailabilitySection() {
  const [selectedCabin, setSelectedCabin] = useState<string>("All");

  const filtered = AWARD_FLIGHTS.filter(
    (f) => selectedCabin === "All" || f.cabin === selectedCabin
  );

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 z-10 border-t border-line/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-wider mb-3">
              <Plane className="w-3.5 h-3.5" />
              Award Seat Availability Tracker
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-text tracking-tight mb-4">
              Real-time sweet spots <br />
              <span className="italic font-normal text-gold">from India to global hubs.</span>
            </h2>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              Curated Saver award seats on partner frequent flyer programs with verified conversion ratios from Indian credit cards.
            </p>
          </div>

          {/* Compliance Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/5 text-gold text-xs font-semibold self-start md:self-auto shrink-0">
            <AlertCircle className="w-4 h-4 text-gold shrink-0" />
            <span>Example Data / Simulated Live Feed</span>
          </div>
        </div>

        {/* Cabin Filter */}
        <div className="flex items-center gap-2 mb-8">
          {(["All", "Business"] as const).map((cabin) => (
            <button
              key={cabin}
              onClick={() => setSelectedCabin(cabin)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCabin === cabin
                  ? "bg-gold text-bg font-bold shadow-md"
                  : "bg-surface border border-line/60 text-text-muted hover:text-text"
              }`}
            >
              {cabin === "All" ? "All Cabins" : `${cabin} Class`}
            </button>
          ))}
        </div>

        {/* Award Flights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((flight) => {
            const savings = flight.cashFareEquivalent - flight.taxes;
            return (
              <div
                key={flight.id}
                className="glass-panel p-6 sm:p-8 space-y-5 relative overflow-hidden card-3d-tilt"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-gold uppercase tracking-wider block">
                      {flight.airline}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-text mt-1">
                      {flight.origin} → {flight.destination}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold border border-success/40 bg-success/15 text-success">
                    {flight.cabin} Class
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>{flight.dates}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-violet" />
                    <span className="text-success font-semibold">{flight.seatsRemaining} Saver Seats Left</span>
                  </div>
                </div>

                {/* Point Cost & Cash Equivalent */}
                <div className="p-4 rounded-xl border border-line bg-surface/70 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-text-muted block">Award Cost</span>
                    <span className="font-serif text-2xl font-normal text-gold">
                      {flight.points.toLocaleString()} <span className="text-xs font-sans text-text-muted">miles</span>
                    </span>
                    <span className="text-[11px] text-text-muted block">+ {formatCurrency(flight.taxes)} taxes</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-text-muted block">Cash Equivalent</span>
                    <span className="font-serif text-xl font-normal text-text line-through opacity-70">
                      {formatCurrency(flight.cashFareEquivalent)}
                    </span>
                    <span className="text-[11px] font-bold text-success block">
                      Save {formatCurrency(savings)}
                    </span>
                  </div>
                </div>

                {/* Transfer Partners */}
                <div className="pt-1">
                  <span className="text-[10px] uppercase font-bold text-text-muted block mb-1.5">
                    Transfer Points Directly From:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {flight.transferPartners.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-1 rounded-lg text-xs bg-line/50 border border-line text-text font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
