import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — RewardPath",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="font-display text-3xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        RewardPath provides informational content about credit cards and travel
        rewards. This is not financial advice. Card terms change frequently —
        always verify current offers on issuer websites before applying.
      </p>
    </div>
  );
}
