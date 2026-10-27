import type { Metadata } from "next";
import Link from "next/link";
import { Handshake, ShieldCheck, Calculator, ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — RewardPath AI",
  description:
    "Affiliate relationship transparency, commission neutrality policies, and disclosure standards for RewardPath AI.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-4xl px-3.5 py-20 sm:px-6 sm:py-24 text-white space-y-8 sm:space-y-10">
      <div className="border-b border-slate-800 pb-6 space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to RewardPath Home
        </Link>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 mb-2">
            <Handshake className="h-3.5 w-3.5" />
            <span>Federal Trade Commission (FTC) & ASCI Transparency</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl font-black text-white">Affiliate Relationship Disclosure</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Last revised: August 2026. Complete transparency on how RewardPath sustains free financial AI intelligence.
          </p>
        </div>
      </div>

      {/* 1. Clear Relationship Statement */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-amber-400 flex items-center gap-2">
          <Handshake className="h-5 w-5 shrink-0" /> 1. How We Earn Compensation
        </h2>
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm space-y-3 text-slate-300 leading-relaxed">
          <p>
            RewardPath AI participates in affiliate referral partnerships with select banking institutions, card issuers, and partner aggregator networks.
          </p>
          <p>
            When you click on certain outbound links to apply for a credit card or financial product featured on our website, we may receive compensation or a referral fee from the respective issuer upon successful card issuance.
          </p>
        </div>
      </section>

      {/* 2. Algorithmic Neutrality Guarantee */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-amber-400 flex items-center gap-2">
          <Calculator className="h-5 w-5 shrink-0" /> 2. Strict Algorithmic Neutrality Guarantee
        </h2>
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm space-y-3 text-slate-300 leading-relaxed">
          <p>
            Our core mission is mathematical truth in rewards. We believe financial recommendations should never be distorted by commercial payouts.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 text-xs text-slate-300 space-y-2">
            <h3 className="font-bold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 shrink-0" /> Three Pillars of Editorial Independence:
            </h3>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>
                <strong>Deterministic NAV Math:</strong> Net Annual Value is calculated using pure mathematical formulas: <code>NAV = Rewards Earned − Effective Annual Fee</code>. No commercial weighting is added.
              </li>
              <li>
                <strong>Unbiased Card Inclusions:</strong> We list cards regardless of whether we hold an active affiliate relationship with the issuing bank.
              </li>
              <li>
                <strong>Direct On-Component Disclosure:</strong> Disclosures are not hidden in tiny footers. Every recommendation widget clearly discloses affiliate ties directly alongside the card details.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Inquiries and Verification */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-amber-400 flex items-center gap-2">
          <ExternalLink className="h-5 w-5 shrink-0" /> 3. Verification & Bank Documents
        </h2>
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs sm:text-sm space-y-2 text-slate-300 leading-relaxed">
          <p>
            Every numeric claim, welcome bonus offer, and fee waiver threshold displayed across RewardPath links back to grounded official issuer documentation. Always verify current offers on the issuer&apos;s website prior to completing an application.
          </p>
        </div>
      </section>
    </div>
  );
}
