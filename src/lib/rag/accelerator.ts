import { getAllCards } from "../db/structured";
import type { AcceleratorResponse, Citation } from "../types";

export async function runAccelerator(
  walletInput: string[] | string = ["hdfc-infinia-metal", "axis-atlas"]
): Promise<AcceleratorResponse> {
  const allCards = getAllCards();
  let selectedIds: string[] = [];

  if (Array.isArray(walletInput)) {
    selectedIds = walletInput;
  } else {
    const lower = walletInput.toLowerCase();
    allCards.forEach((c) => {
      const cardLower = c.name.toLowerCase();
      const firstWord = cardLower.split(" ")[0];
      if (lower.includes(cardLower) || (firstWord && lower.includes(firstWord))) {
        selectedIds.push(c.id);
      }
    });
  }

  const userCards = allCards.filter((c) => selectedIds.includes(c.id));
  const activeCards = userCards.length > 0 ? userCards : allCards.slice(0, 2);

  const optimizations = activeCards.map((card) => {
    const categories = Object.entries(card.rewardCategories)
      .map(([cat, mult]) => `${mult}x on ${cat}`)
      .join(", ");

    const citations: Citation[] = [
      {
        chunkId: `${card.id}-rewards`,
        sourceDocumentUrl: card.sourceDocumentUrl,
        excerpt: `${card.name} reward rate: ${categories}. Verified effective ${card.effectiveDate}.`,
        effectiveDate: card.effectiveDate,
        lastSourceChecked: card.lastSourceChecked,
      },
    ];

    let tip = `Maximize value by using ${card.name} for all ${Object.keys(card.rewardCategories)[0]} spend.`;
    let quarterlyCapNotice: string | undefined = undefined;

    if (card.id === "hdfc-infinia-metal") {
      tip = "Route flight and hotel bookings via HDFC SmartBuy portal for 5x rewards (33.3% net reward rate). Transfer 1:1 to KrisFlyer / Air India / Accor.";
      quarterlyCapNotice = "15,000 monthly bonus points cap on SmartBuy portal bookings.";
    } else if (card.id === "axis-atlas") {
      tip = "Use Axis Atlas directly on airline and hotel websites to earn 5 EDGE Miles per ₹100. Transfer to Accor / Flying Blue at 1:2 ratio.";
      quarterlyCapNotice = "10,000 EDGE Miles annual milestone bonus on reaching ₹7.5L spend.";
    } else if (card.id === "sbi-cashback") {
      tip = "Use SBI Cashback for 5% direct cashback on all online merchant spending (Amazon, Flipkart, Swiggy, Zomato).";
      quarterlyCapNotice = "₹5,000 monthly cashback cap on 5% online tier.";
    } else if (card.id === "hdfc-regalia-gold") {
      tip = "Use Regalia Gold for Marks & Spencer, Myntra, and Reliance Digital for 5x rewards + milestone flight vouchers at ₹4L spend.";
    } else if (card.id === "amex-plat-travel") {
      tip = "Unlock 40,000 bonus Membership Rewards points + ₹10,000 Taj voucher upon completing ₹4L spend within the card membership year.";
      quarterlyCapNotice = "Milestone bonuses trigger at ₹1.9L, ₹4L annual spend thresholds.";
    } else if (card.id === "icici-amazon-pay") {
      tip = "Use ICICI Amazon Pay for 5% uncapped cashback on Amazon India for Prime members and 2% on Amazon Pay partner merchants.";
    }

    return {
      cardName: card.name,
      category: Object.keys(card.rewardCategories)[0] || "general",
      multiplierText: categories,
      tip,
      quarterlyCapNotice,
      citations,
    };
  });

  const allCitations = optimizations.flatMap((o) => o.citations);
  const totalEstimatedBonusPoints = activeCards.reduce((acc, c) => acc + c.welcomeBonusPoints, 0);

  return {
    walletCards: activeCards.map((c) => c.name),
    optimizations,
    totalEstimatedBonusPoints,
    summary: `Decoded multiplier rules for your ${activeCards.length} wallet cards (${activeCards.map((c) => c.name).join(", ")}). Squeezing maximum velocity out of your Indian card portfolio can yield an extra ~${Math.round(totalEstimatedBonusPoints * 0.4).toLocaleString()} reward points annually.`,
    citations: allCitations,
  };
}
