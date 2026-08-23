import type { GuardianResponse, CreditRiskFactor, Citation } from "../types";

export interface GuardianCheckInput {
  query?: string;
  creditScore?: number;
  recentApplications6Mo?: number;
  chase524Status?: number;
  totalCreditLimitUSD?: number;
  currentBalanceUSD?: number;
}

export async function runGuardian(input: GuardianCheckInput | string = {}): Promise<GuardianResponse> {
  const queryStr = typeof input === "string" ? input : input.query || "";
  const lower = queryStr.toLowerCase();

  let cibilScore = typeof input === "object" && input.creditScore ? input.creditScore : 760;
  let recentApps = typeof input === "object" && input.recentApplications6Mo ? input.recentApplications6Mo : 2;
  const totalLimit = typeof input === "object" && input.totalCreditLimitUSD ? input.totalCreditLimitUSD : 800000;
  const balance = typeof input === "object" && input.currentBalanceUSD ? input.currentBalanceUSD : 65000;

  // Parse numbers from query string if available
  const scoreMatch = lower.match(/(?:cibil|score)\s*(?:of|is|:)?\s*(\d{3})/);
  if (scoreMatch?.[1]) cibilScore = parseInt(scoreMatch[1], 10);

  const appMatch = lower.match(/(\d+)\s*(?:apps|applications|inquiries|cibil inquiries)/);
  if (appMatch?.[1]) recentApps = parseInt(appMatch[1], 10);

  const utilizationPercent = Math.round((balance / Math.max(totalLimit, 1)) * 100);

  const riskFactors: CreditRiskFactor[] = [];

  if (cibilScore < 750) {
    riskFactors.push({
      title: "CIBIL Score Below 750 Benchmark",
      severity: "high",
      impactDescription: `Your CIBIL score is currently ${cibilScore}. Premium Indian cards like HDFC Infinia and Axis Atlas require a CIBIL score of 760+ or ₹30L+ ITR.`,
      recommendation: "Pay off credit card balances before statement generation to raise CIBIL above 760.",
    });
  }

  if (recentApps >= 4) {
    riskFactors.push({
      title: "Excessive Hard CIBIL Inquiries Flag",
      severity: "high",
      impactDescription: `${recentApps} CIBIL inquiries logged in the past 6 months. Axis Bank & SBI Card reject applications due to credit-hungry velocity.`,
      recommendation: "Cool off hard applications for 90 days before applying for Axis Atlas or SBI Cashback.",
    });
  }

  if (utilizationPercent > 30) {
    riskFactors.push({
      title: "High CIBIL Credit Utilization Rate",
      severity: "medium",
      impactDescription: `Your credit utilization is ${utilizationPercent}%. CIBIL algorithms penalize scores when total limit utilization exceeds 30%.`,
      recommendation: "Pay down statement balances prior to billing cycle date to drop utilization under 15%.",
    });
  }

  if (riskFactors.length === 0) {
    riskFactors.push({
      title: "Optimal CIBIL & Issuer Velocity Profile",
      severity: "low",
      impactDescription: `Your CIBIL score (${cibilScore}) and application velocity (${recentApps} in 6 mo) are in peak approval range for premium Indian credit cards.`,
      recommendation: "You are clear to submit your application for HDFC Infinia or Axis Atlas.",
    });
  }

  const safeToApplyNextDays = cibilScore < 750 ? 90 : (recentApps >= 4 ? 60 : 0);

  const citations: Citation[] = [
    {
      chunkId: "guardian-cibil-benchmark",
      sourceDocumentUrl: "https://www.cibil.com/credit-score",
      excerpt: "A CIBIL score of 750 or higher is considered excellent by Indian commercial banks and increases approval probability for super-premium credit cards.",
      effectiveDate: "2025-01-01",
      lastSourceChecked: "2025-07-01",
    },
    {
      chunkId: "guardian-hdfc-policy",
      sourceDocumentUrl: "https://www.hdfcbank.com/personal/pay/cards/credit-cards",
      excerpt: "HDFC Bank policy recommends a 6-month gap between card applications to prevent internal credit score downgrades.",
      effectiveDate: "2025-01-01",
      lastSourceChecked: "2025-07-01",
    },
  ];

  return {
    creditScoreRange: cibilScore >= 760 ? `CIBIL ${cibilScore} (Exceptional)` : `CIBIL ${cibilScore} (Requires Boost)`,
    velocityStatus: recentApps >= 4 ? "High Velocity (Inquiry Flag)" : `${recentApps} Inquiries in 6 Mo (Optimal)`,
    riskFactors,
    safeToApplyNextDays,
    maxRecommendedUtilizationPercent: 15,
    summary: `Guardian Analysis: Evaluated CIBIL score (${cibilScore}) and 6-month inquiry count (${recentApps}). ${safeToApplyNextDays > 0 ? `Recommended cooling period of ${safeToApplyNextDays} days before next premium application.` : "Your CIBIL velocity profile is clear for your next application."}`,
    citations,
  };
}
