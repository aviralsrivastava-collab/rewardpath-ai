"use client";

import {
  Sparkles,
  Plane,
  Gift,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Plane,
    title: "Destination Trip Planner",
    subtitle: "5-Category Travel Strategy",
    description:
      "Planning a trip to Dubai, London, Singapore, or Bali? Nexus builds a 5-part card strategy covering Flights, Hotels, Cabs, Overseas Shopping, and Forex Markup.",
    status: "Live in Nexus Engine",
    accent: "from-cyan-500/20 to-blue-600/10 border-cyan-500/30 text-cyan-400 hover:border-cyan-400",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    span: "sm:col-span-2",
    targetId: "hero-search",
  },
  {
    icon: ShoppingBag,
    title: "Item Purchase Strategy",
    subtitle: "Category Multipliers & Cashback",
    description:
      "Buying an iPhone, laptop, or luxury items? Nexus maps gift vouchers and card multipliers to maximize rewards and statement cashback.",
    status: "Live in Nexus Engine",
    accent: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400 hover:border-amber-400",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    span: "",
    targetId: "hero-search",
  },
  {
    icon: Gift,
    title: "Step-by-Step Point Redemption Guide",
    subtitle: "How & Where to Redeem Points",
    description:
      "Step-by-step instructions on transferring points to Accor ALL (1:2 ratio), Singapore KrisFlyer, Taj InnerCircle, or Air India for maximum ₹/pt yield.",
    status: "Live in Nexus Engine",
    accent: "from-emerald-500/20 to-teal-600/10 border-emerald-500/30 text-emerald-400 hover:border-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    span: "sm:col-span-2",
    targetId: "hero-search",
  },
  {
    icon: Sparkles,
    title: "Existing Wallet Optimization",
    subtitle: "Maximize Active Cards",
    description:
      "Tell Nexus which credit cards are in your wallet, and get personalized advice on how to use them effectively for every booking.",
    status: "Live in Nexus Engine",
    accent: "from-amber-500/15 to-yellow-600/10 border-amber-500/20 text-amber-300 hover:border-amber-400",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    span: "",
    targetId: "hero-search",
  },
];

export function FeatureGrid() {
  const handleFeatureClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="features" className="px-4 py-20 sm:px-6 bg-slate-950 text-white border-t border-slate-800">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>RewardPath Nexus AI Architecture</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white">
            One Unified Engine. Endless Intelligence.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-slate-300">
            Click any capability below to launch RewardPath Nexus Search Engine.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.title}
                onClick={() => handleFeatureClick(feature.targetId)}
                className={`group text-left cursor-pointer rounded-2xl border bg-gradient-to-b ${feature.accent} p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 ${feature.span}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 border border-slate-700 shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase border ${feature.badge}`}>
                    {feature.status}
                  </span>
                </div>

                <div className="mt-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    {feature.subtitle}
                  </span>
                  <h3 className="text-xl font-black text-white mt-0.5">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-300">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                  <span>Explore in RewardPath Nexus</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
