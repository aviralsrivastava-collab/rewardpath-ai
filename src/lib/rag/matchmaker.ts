import { RewardPathAIModel } from "../ai/model";
import type { MatchmakerResponse, SpendProfile } from "../types";

export function inferSpendFromQuery(query: string): SpendProfile {
  const lower = query.toLowerCase();
  const spend: SpendProfile = {
    dining: 15000,
    groceries: 25000,
    travel: 20000,
    gas: 10000,
    other: 30000,
  };

  const diningMatch = lower.match(/(?:₹|\$)?(\d+)\s*(?:a|per|\/)?\s*(?:mo|month)?\s*(?:on|for)?\s*(?:dining|restaurant|food)/) ||
                     lower.match(/(?:dining|restaurant|food)\s*(?:of|is|:)?\s*(?:₹|\$)?(\d+)/);
  if (diningMatch?.[1]) spend.dining = parseInt(diningMatch[1], 10);
  else if (lower.includes("dining") || lower.includes("restaurant") || lower.includes("food")) spend.dining = 20000;

  const grocMatch = lower.match(/(?:₹|\$)?(\d+)\s*(?:a|per|\/)?\s*(?:mo|month)?\s*(?:on|for)?\s*(?:grocer|supermarket)/) ||
                    lower.match(/(?:grocer|supermarket)\s*(?:of|is|:)?\s*(?:₹|\$)?(\d+)/);
  if (grocMatch?.[1]) spend.groceries = parseInt(grocMatch[1], 10);
  else if (lower.includes("grocer") || lower.includes("supermarket") || lower.includes("blinkit")) spend.groceries = 30000;

  const travelMatch = lower.match(/(?:₹|\$)?(\d+)\s*(?:a|per|\/)?\s*(?:mo|month)?\s*(?:on|for)?\s*(?:travel|flight|hotel)/) ||
                      lower.match(/(?:travel|flight|hotel)\s*(?:of|is|:)?\s*(?:₹|\$)?(\d+)/);
  if (travelMatch?.[1]) spend.travel = parseInt(travelMatch[1], 10);
  else if (lower.includes("travel") || lower.includes("london") || lower.includes("flight") || lower.includes("paris") || lower.includes("hotel")) spend.travel = 35000;

  const gasMatch = lower.match(/(?:₹|\$)?(\d+)\s*(?:a|per|\/)?\s*(?:mo|month)?\s*(?:on|for)?\s*(?:gas|ev|fuel)/) ||
                    lower.match(/(?:gas|ev|fuel)\s*(?:of|is|:)?\s*(?:₹|\$)?(\d+)/);
  if (gasMatch?.[1]) spend.gas = parseInt(gasMatch[1], 10);
  else if (lower.includes("gas") || lower.includes("fuel") || lower.includes("ev charging")) spend.gas = 12000;

  return spend;
}

export async function runMatchmaker(query: string): Promise<MatchmakerResponse> {
  const spend = inferSpendFromQuery(query);
  const response = RewardPathAIModel.runMatchmaker(query, spend);
  return response;
}

export async function runMatchmakerWithLLM(query: string): Promise<MatchmakerResponse> {
  const baseResponse = RewardPathAIModel.runNexusEngine(query);
  const synthesized = await RewardPathAIModel.synthesizeWithLLM(query, baseResponse);
  return {
    query,
    recommendations: synthesized.recommendations,
    summary: synthesized.summary,
    disclaimer: synthesized.disclaimer,
    affiliateDisclosure: synthesized.affiliateDisclosure,
    citations: synthesized.citations,
  };
}
