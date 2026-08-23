import fs from "fs";
import path from "path";
import type { CardStructuredData, ROICalculation, SpendProfile } from "../types";
import { SEED_CARDS } from "../data/seed-cards";

const DATA_DIR = path.join(process.cwd(), "data");
const JSON_PATH = path.join(DATA_DIR, "cards.json");

let cache: CardStructuredData[] | null = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadFromDisk(): CardStructuredData[] {
  ensureDataDir();
  if (!fs.existsSync(JSON_PATH)) {
    return SEED_CARDS;
  }
  const raw = fs.readFileSync(JSON_PATH, "utf-8");
  try {
    const parsed = JSON.parse(raw) as CardStructuredData[];
    return parsed.length > 0 ? parsed : SEED_CARDS;
  } catch {
    return SEED_CARDS;
  }
}

function persist(cards: CardStructuredData[]) {
  ensureDataDir();
  fs.writeFileSync(JSON_PATH, JSON.stringify(cards, null, 2));
  cache = cards;
}

function getCards(): CardStructuredData[] {
  if (!cache || cache.length === 0) {
    cache = loadFromDisk();
  }
  return cache;
}

export function getAllCards(): CardStructuredData[] {
  return [...getCards()].sort((a, b) => a.name.localeCompare(b.name));
}

export function getCardById(id: string): CardStructuredData | null {
  return getCards().find((c) => c.id === id) ?? null;
}

export function upsertCard(card: CardStructuredData) {
  const cards = getCards();
  const idx = cards.findIndex((c) => c.id === card.id);
  if (idx >= 0) {
    cards[idx] = card;
  } else {
    cards.push(card);
  }
  persist(cards);
}

export function seedStructuredCards(cards: CardStructuredData[] = SEED_CARDS) {
  persist(cards);
  return cards.length;
}

/**
 * EXACT NAV FORMULA (User Directive):
 * NAV = [ Sum_{c in C} ( (S_c * 12 / Base) * M_c * V_p ) ] + (B_m * V_p) - EffectiveFee
 */
export function calculateROI(
  card: CardStructuredData,
  spend: SpendProfile
): ROICalculation {
  const categoryMap: Record<keyof SpendProfile, string> = {
    dining: "dining",
    groceries: "groceries",
    travel: "travel",
    gas: "gas",
    other: "other",
  };

  const baseSpendINR = card.baseSpendINR ?? 150;
  const pointValueINR = card.pointValueINR ?? 1.0;

  // Calculate annual total spend across all categories
  const totalAnnualSpend = (Object.keys(spend) as (keyof SpendProfile)[]).reduce(
    (acc, k) => acc + spend[k] * 12,
    0
  );

  const breakdown = (Object.keys(spend) as (keyof SpendProfile)[]).map(
    (key) => {
      const monthlySpend = spend[key];
      const annualSpend = monthlySpend * 12;
      const category = categoryMap[key];
      const multiplier = card.rewardCategories[category] ?? 1;

      // Exact Formula: ( (S_c * 12) / Base ) * M_c
      const pointsEarned = (annualSpend / baseSpendINR) * multiplier;

      // Convert Points to INR: pointsEarned * V_p
      let cashValue = pointsEarned * pointValueINR;

      // Category capping checks (e.g. SBI Cashback capped at ₹5,000/month = ₹60,000/yr)
      if (card.id === "sbi-cashback" && (category === "dining" || category === "groceries" || category === "travel")) {
        if (cashValue > 60000) cashValue = 60000;
      }

      return {
        category,
        spend: annualSpend,
        multiplier,
        pointsEarned: Math.round(pointsEarned),
        cashValue: Math.round(cashValue),
      };
    }
  );

  // Sum of category reward values
  const baseCategoryRewards = breakdown.reduce((sum, b) => sum + b.cashValue, 0);

  // Milestone Bonus: (B_m * V_p)
  let milestoneRewardsValue = 0;
  if (card.milestoneThresholdINR && card.milestoneThresholdINR > 0 && totalAnnualSpend >= card.milestoneThresholdINR) {
    const milestoneBonusPoints = card.milestoneBonusPoints ?? 0;
    milestoneRewardsValue = milestoneBonusPoints * pointValueINR;
  }

  const totalAnnualRewards = baseCategoryRewards + milestoneRewardsValue;

  // Effective Annual Fee (F): Fee waived if total annual spend >= feeWaiverThresholdINR
  let effectiveFee = card.annualFee;
  if (card.feeWaiverThresholdINR && card.feeWaiverThresholdINR > 0 && totalAnnualSpend >= card.feeWaiverThresholdINR) {
    effectiveFee = 0;
  }

  // Exact NAV = Total Rewards + Milestone Rewards - Effective Fee
  const netAnnualValue = totalAnnualRewards - effectiveFee;

  return {
    cardId: card.id,
    cardName: card.name,
    annualFee: effectiveFee,
    annualRewards: Math.round(totalAnnualRewards),
    netAnnualValue: Math.round(netAnnualValue),
    breakdown,
  };
}

export function calculateAllROIs(spend: SpendProfile): ROICalculation[] {
  return getAllCards()
    .map((card) => calculateROI(card, spend))
    .sort((a, b) => b.netAnnualValue - a.netAnnualValue);
}

export function getComparisonMatrix() {
  return getAllCards().map((card) => ({
    id: card.id,
    name: card.name,
    issuer: card.issuer,
    annualFee: card.annualFee,
    feeWaiverThresholdINR: card.feeWaiverThresholdINR ?? 0,
    baseSpendINR: card.baseSpendINR ?? 150,
    pointValueINR: card.pointValueINR ?? 1.0,
    loungeAccessSummary: card.loungeAccessSummary ?? "Standard Lounge Access",
    forexMarkup: card.forexMarkup,
    welcomeBonus: `${card.welcomeBonusPoints.toLocaleString()} pts`,
    welcomeBonusDetails: `₹${card.welcomeBonusSpendRequired.toLocaleString()} in ${card.welcomeBonusMonths} mo`,
    transferPartners: card.transferPartners,
    rewardCategories: card.rewardCategories,
    sourceDocumentUrl: card.sourceDocumentUrl,
    lastSourceChecked: card.lastSourceChecked,
  }));
}
