import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "AI Engines (4 Modes)", href: "#hero-search" },
    { label: "ROI Calculator", href: "#calculator" },
    { label: "Card Comparison", href: "#compare" },
    { label: "CPP Breakeven Math", href: "#breakeven" },
    { label: "Approval Odds Checker", href: "#approval-odds" },
    { label: "User Portfolio Dashboard", href: "#dashboard" },
    { label: "Wallet Optimizer", href: "#wallet-optimizer" },
    { label: "Award Seat Caching", href: "#award-caching" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "SOC 2 Trust Center", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 font-black text-sm">
                R
              </span>
              <span className="font-display text-lg font-black text-white">RewardPath AI</span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-400">
              AI-powered credit card and travel rewards advisory platform grounded in cited issuer terms. Net annual value math shown transparently. Educational purpose only — not financial advice.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>Soft-pull credit simulation — Zero score impact</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-slate-300 transition-colors hover:text-amber-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-[11px] leading-relaxed text-slate-400 space-y-2">
          <p>
            © {new Date().getFullYear()} RewardPath. Information provided is for educational and informational purposes only and does not constitute financial advice. Credit card terms, annual fees, and welcome bonus offers change frequently — verify current details directly on the issuer&apos;s website before applying.
          </p>
          <p className="text-amber-400/90 font-medium">
            🤝 Affiliate Relationship Disclosure: We may earn a commission when you apply for a credit card through our links. This disclosure is displayed directly on every recommendation component. Affiliate commissions do not alter our recommendation math or ranking logic.
          </p>
        </div>
      </div>
    </footer>
  );
}
