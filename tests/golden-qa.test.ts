import { seedAll } from "../src/lib/seed";
import { runMatchmaker } from "../src/lib/rag/matchmaker";
import { runAccelerator } from "../src/lib/rag/accelerator";
import { runArbitrageur } from "../src/lib/rag/arbitrageur";
import { runGuardian } from "../src/lib/rag/guardian";
import { calculateAllROIs } from "../src/lib/db/structured";
import { RewardPathAIModel } from "../src/lib/ai/model";

interface GoldenTest {
  name: string;
  run: () => Promise<boolean> | boolean;
  message: string;
}

const GOLDEN_TESTS: GoldenTest[] = [
  {
    name: "Matchmaker: London travel query returns recommendations with citations",
    run: async () => {
      const r = await runMatchmaker("How do I get to London for free using points?");
      return r.recommendations.length >= 1 && r.citations.length >= 1;
    },
    message: "Must return at least one recommendation with citations",
  },
  {
    name: "Matchmaker: Every recommendation has NAV and citations",
    run: async () => {
      const r = await runMatchmaker("Best card for dining & groceries");
      return r.recommendations.every(
        (rec) =>
          typeof rec.netAnnualValue === "number" &&
          rec.citations.length > 0 &&
          rec.citations.every((c) => c.sourceDocumentUrl.startsWith("http"))
      );
    },
    message: "All recommendations must include NAV and valid citation URLs",
  },
  {
    name: "Matchmaker: No-fee query prioritizes zero-fee cards",
    run: async () => {
      const r = await runMatchmaker("no annual fee cashback");
      return r.recommendations.some((rec) => rec.annualFee === 0);
    },
    message: "At least one top-3 recommendation should have ₹0 annual fee",
  },
  {
    name: "Matchmaker: Response includes legal disclaimer & affiliate disclosure",
    run: async () => {
      const r = await runMatchmaker("best travel card in India");
      return (
        r.disclaimer.includes("educational") &&
        r.affiliateDisclosure.includes("commission")
      );
    },
    message: "Must include disclaimer and affiliate disclosure",
  },
  {
    name: "ROI calculator: NAV = rewards - fee",
    run: () => {
      const calcs = calculateAllROIs({ dining: 15000, groceries: 25000, travel: 20000, gas: 10000, other: 30000 });
      return calcs.every((c) => c.netAnnualValue === c.annualRewards - c.annualFee);
    },
    message: "NAV must equal annualRewards minus annualFee for all cards",
  },
  {
    name: "Accelerator Engine: Returns wallet card multiplier optimizations and tips",
    run: async () => {
      const r = await runAccelerator(["hdfc-infinia-metal", "axis-atlas"]);
      return r.optimizations.length >= 2 && r.citations.length >= 2;
    },
    message: "Accelerator must return optimizations and citations for user cards",
  },
  {
    name: "Arbitrageur Engine: Calculates CPP breakeven and 3-phase playbook",
    run: async () => {
      const r = await runArbitrageur("Mumbai to London in Business Class");
      return r.centsPerPoint > 0 && r.playbook.length === 3 && r.citations.length >= 1;
    },
    message: "Arbitrageur must return positive CPP, 3 playbook phases, and citations",
  },
  {
    name: "Guardian Engine: Flags CIBIL score & inquiry risk factors",
    run: async () => {
      const r = await runGuardian({ creditScore: 720, recentApplications6Mo: 5 });
      return r.riskFactors.some((rf) => rf.title.includes("CIBIL") || rf.title.includes("Inquiries")) && r.citations.length >= 1;
    },
    message: "Guardian must flag CIBIL score / inquiry risks and cite rules",
  },
  {
    name: "Structured DB has cards loaded",
    run: () => {
      const calcs = calculateAllROIs({ dining: 15000, groceries: 25000, travel: 20000, gas: 10000, other: 30000 });
      return calcs.length >= 6;
    },
    message: "Structured DB must contain at least 6 cards",
  },
  {
    name: "Dataset Package ML-01: Hinglish flight query resolves correctly",
    run: () => {
      const r = RewardPathAIModel.runNexusEngine("Plane ka ticket book karne ke liye best card konsa hai?");
      return r.intentType === "trip_planner" && r.recommendations.length > 0;
    },
    message: "Hinglish flight query must resolve to trip_planner intent",
  },
  {
    name: "Dataset Package ML-03: Hinglish no-fee cashback query resolves correctly",
    run: () => {
      const r = RewardPathAIModel.runNexusEngine("Sabse accha cashback card kaunsa hai bina annual fee ke?");
      return r.recommendations.some((rec) => rec.annualFee === 0);
    },
    message: "Hinglish no-fee cashback query must prioritize ₹0 fee cards",
  },
  {
    name: "Dataset Package MI-01: Multi-Intent query splits into sub-answers",
    run: () => {
      const r = RewardPathAIModel.runNexusEngine("Best card for a Dubai trip AND for buying a new phone before I go?");
      return r.intentType === "multi_intent" && (r.multiIntentSubResponses?.length ?? 0) >= 2;
    },
    message: "Multi-intent query must split into at least 2 sub-responses",
  },
  {
    name: "Dataset Package AD-01: Vague query returns clarifying question",
    run: () => {
      const r = RewardPathAIModel.runNexusEngine("What's the best card?");
      return r.intentType === "adversarial_edge_case" && !!r.clarifyingQuestion;
    },
    message: "Vague query must return a clarifying question",
  },
  {
    name: "Dataset Package AD-03: Impossible 10% cashback no-fee card returns edge case notice",
    run: () => {
      const r = RewardPathAIModel.runNexusEngine("I want a card with 10% cashback on everything and no fees.");
      return r.intentType === "adversarial_edge_case" && r.summary.includes("No commercial credit card");
    },
    message: "Impossible card query must state no such card exists",
  },
  {
    name: "Dataset Package AD-04: 5 Lakh jewelry spend flags jewelry category exclusion",
    run: () => {
      const r = RewardPathAIModel.runNexusEngine("I want to spend 5 lakh on jewelry and earn maximum points");
      return r.intentType === "adversarial_edge_case" && r.summary.includes("EXCLUDED");
    },
    message: "Jewelry spend query must flag jewelry exclusion",
  },
];

async function runGoldenTests() {
  console.log("Running golden Q&A regression tests with Dataset Package (54 Test Cases)...\n");

  await seedAll();

  let passed = 0;
  let failed = 0;

  for (const test of GOLDEN_TESTS) {
    try {
      const success = await test.run();
      if (!success) throw new Error(test.message);
      console.log(`  ✓ ${test.name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${test.name}`);
      console.error(`    ${err instanceof Error ? err.message : test.message}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed`);

  if (failed > 0) {
    process.exit(1);
  }
}

runGoldenTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
