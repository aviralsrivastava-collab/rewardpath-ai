import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — RewardPath",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Affiliate Disclosure</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        RewardPath may earn a commission when you apply for a credit card
        through links on our site. This compensation does not affect our
        recommendation rankings or the Net Annual Value math we display. All
        affiliate relationships are disclosed directly on recommendation
        components.
      </p>
    </div>
  );
}
