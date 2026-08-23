export interface CardStructuredData {
  id: string;
  name: string;
  issuer: string;
  annualFee: number;
  forexMarkup: number;
  welcomeBonusPoints: number;
  welcomeBonusSpendRequired: number;
  welcomeBonusMonths: number;
  rewardCategories: Record<string, number>;
  transferPartners: string[];
  baseSpendINR?: number;
  basePointsEarned?: number;
  pointValueINR?: number;
  milestoneBonusPoints?: number;
  milestoneThresholdINR?: number;
  feeWaiverThresholdINR?: number;
  loungeAccessSummary?: string;
  effectiveDate: string;
  lastSourceChecked: string;
  sourceDocumentUrl: string;
  affiliateDisclosure: boolean;
}

export interface Citation {
  chunkId: string;
  sourceDocumentUrl: string;
  excerpt: string;
  effectiveDate: string;
  lastSourceChecked: string;
}

export interface MatchmakerRecommendation {
  cardId: string;
  cardName: string;
  rank: number;
  netAnnualValue: number;
  annualRewards: number;
  annualFee: number;
  reasoning: string;
  citations: Citation[];
}

export interface MatchmakerResponse {
  query: string;
  recommendations: MatchmakerRecommendation[];
  summary: string;
  disclaimer: string;
  affiliateDisclosure: string;
  citations: Citation[];
}

export type AIEngineMode = "nexus" | "matchmaker" | "accelerator" | "arbitrageur" | "guardian";

export interface StructuredTripPlanner {
  destination: string;
  flightsStrategy: { cardName: string; multiplierText: string; instruction: string };
  hotelsStrategy: { cardName: string; partnerName: string; transferRatio: string; instruction: string };
  cabsStrategy: { cardName: string; multiplierText: string; instruction: string };
  shoppingForexStrategy: { cardName: string; forexMarkup: number; instruction: string };
  loungeAndPerksAdvice?: string;
  recommendedTotalSavingsEstimate?: string;
  walletOptimizationAdvice?: string;
}

export interface RedemptionGuide {
  programName: string;
  pointsBalance?: number;
  totalRupeeValueEstimate?: string;
  stepByStepProcess: string[];
  whereToUsePoints: string;
  transferRatio: string;
  estimatedValuePerPoint: string;
}

export interface PurchaseStrategy {
  targetItem: string;
  recommendedCard: string;
  multiplierOrCashback: string;
  stepByStepProcess: string[];
}

export interface PurchaseProfitability {
  itemType: string;
  isProfitable: boolean;
  verdictTitle: string;
  rewardsValueEstimate: string;
  merchantSurchargeEstimate: string;
  netProfitOrLoss: string;
  reasoning: string;
  stepByStepProcess: string[];
}

export interface CreditRiskAnalysis {
  cibilScoreBand: string;
  inquiryVelocityRisk: string;
  dtiAssessment: string;
  approvalOddsPercentage: number;
  approvalOddsVerdict: string;
  issuerRulesNotes: string;
  mitigationPlaybook: string[];
}

export interface ConsumerBehaviorInsight {
  cityTierCategory: string;
  spendingPatternOverview: string;
  topCategoryMultipliers: { category: string; recommendedCard: string; yieldText: string }[];
  rbiUsageTrendNote: string;
}

export interface MerchantCategoryCode {
  category: string;
  mccCodes: string;
  description: string;
}

export interface EMIOfferData {
  card_id: string;
  category: string;
  merchant_partner: string;
  min_purchase_amount: number;
  tenure_months: string;
  cost_terms: string;
  valid_till: string;
}

export interface BrandPartnershipData {
  card_id: string;
  partner_name: string;
  offer_detail: string;
  cap: string;
  valid_till: string;
}

export interface PurchaseProtectionData {
  card_id: string;
  protection_type: "Purchase Protection" | "Extended Warranty";
  coverage: string;
  conditions: string;
}

export interface MultiIntentSubResponse {
  subIntentType: string;
  title: string;
  details: string[];
}

export interface NexusResponse {
  query: string;
  intentType: "trip_planner" | "purchase_strategy" | "card_recommendation" | "redemption_guide" | "profitability_analysis" | "credit_risk_analysis" | "multi_intent" | "adversarial_edge_case";
  summary: string;
  tripPlanner?: StructuredTripPlanner;
  purchaseStrategy?: PurchaseStrategy;
  purchaseProfitability?: PurchaseProfitability;
  redemptionGuide?: RedemptionGuide;
  creditRiskAnalysis?: CreditRiskAnalysis;
  consumerBehaviorInsight?: ConsumerBehaviorInsight;
  multiIntentSubResponses?: MultiIntentSubResponse[];
  emiOffers?: EMIOfferData[];
  brandPartnerships?: BrandPartnershipData[];
  purchaseProtection?: PurchaseProtectionData[];
  isAdversarialOrEdgeCase?: boolean;
  clarifyingQuestion?: string;
  recommendations: MatchmakerRecommendation[];
  disclaimer: string;
  affiliateDisclosure: string;
  citations: Citation[];
}

export interface AcceleratorOptimization {
  cardName: string;
  category: string;
  multiplierText: string;
  tip: string;
  quarterlyCapNotice?: string;
  citations: Citation[];
}

export interface AcceleratorResponse {
  walletCards: string[];
  optimizations: AcceleratorOptimization[];
  totalEstimatedBonusPoints: number;
  summary: string;
  citations: Citation[];
}

export interface TripPlaybookStep {
  phase: "Phase 1: Wallet Strategy" | "Phase 2: Gap Filler" | "Phase 3: Execution Playbook";
  title: string;
  description: string;
  pointsRequired: number;
  cashFee: number;
  transferPartner: string;
  transferRatio: string;
  estimatedTransferMinutes: number;
}

export interface ArbitrageurResponse {
  query: string;
  origin: string;
  destination: string;
  cabinClass: "Economy" | "Business" | "First";
  cashPriceEquivalent: number;
  pointsRequired: number;
  taxesAndFees: number;
  centsPerPoint: number;
  sweetSpotName: string;
  playbook: TripPlaybookStep[];
  alternateOptions: {
    route: string;
    program: string;
    points: number;
    dates: string;
    reason: string;
  }[];
  summary: string;
  citations: Citation[];
}

export interface CreditRiskFactor {
  title: string;
  severity: "low" | "medium" | "high";
  impactDescription: string;
  recommendation: string;
}

export interface GuardianResponse {
  creditScoreRange: string;
  velocityStatus: string;
  riskFactors: CreditRiskFactor[];
  safeToApplyNextDays: number;
  maxRecommendedUtilizationPercent: number;
  summary: string;
  citations: Citation[];
}

export interface ROICalculation {
  cardId: string;
  cardName: string;
  annualFee: number;
  annualRewards: number;
  netAnnualValue: number;
  breakdown: {
    category: string;
    spend: number;
    multiplier: number;
    pointsEarned: number;
    cashValue: number;
  }[];
}

export interface SpendProfile {
  dining: number;
  groceries: number;
  travel: number;
  gas: number;
  other: number;
}

export interface BreakevenCalculation {
  cashPrice: number;
  pointsRequired: number;
  taxesAndFees: number;
  effectiveCPP: number;
  baselineCPP: number;
  isSweetSpot: boolean;
  recommendation: string;
  savingsVsCash: number;
}

export interface ApprovalOddsResult {
  scoreEstimate: number;
  income: number;
  chaseCount: number;
  oddsRating: "Excellent" | "Good" | "Fair" | "Low";
  approvalProbabilityPercent: number;
  reasons: string[];
  trustBanner: string;
}

export interface UserPortfolio {
  pointsBalances: { program: string; points: number; estimatedValueUSD: number; expiryDate?: string }[];
  milestones: { id: string; cardName: string; spendGoal: number; currentSpend: number; deadline: string; bonusPoints: number }[];
  upcomingFees: { cardName: string; fee: number; dueDate: string; actionRecommendation: string }[];
  churningStatus: {
    chase524Count: number;
    chase524ResetDate: string;
    sapphireEligibleDate: string;
    amexOncePerLifetimeStatus: Record<string, boolean>;
  };
}

export interface AwardCachedFlight {
  id: string;
  route: string;
  airline: string;
  program: string;
  points: number;
  taxesUSD: number;
  cabin: string;
  seatsAvailable: number;
  lastUpdatedMinsAgo: number;
}

export const DEFAULT_SPEND: SpendProfile = {
  dining: 15000,
  groceries: 25000,
  travel: 20000,
  gas: 10000,
  other: 30000,
};

export const LEGAL_DISCLAIMER =
  "This information is for educational purposes only and does not constitute RBI-regulated financial advice. Card terms, GST fee impacts, and reward structures change frequently — verify current terms on the official bank website before applying.";

export const AFFILIATE_DISCLOSURE =
  "We may earn a referral commission when you apply through bank partner links. This does not alter our algorithmic ranking math or Net Annual Value calculations.";
