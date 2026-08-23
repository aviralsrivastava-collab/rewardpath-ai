import { NextResponse } from "next/server";
import { z } from "zod";
import { RewardPathAIModel } from "@/lib/ai/model";
import { seedAll } from "@/lib/seed";
import { getAllCards } from "@/lib/db/structured";
import { handleServerError } from "@/lib/error-handler";
import { sanitizeInput } from "@/lib/sanitizer";

const querySchema = z.object({
  query: z.string().min(1).max(500),
  walletCards: z.array(z.string()).optional(),
  mode: z.string().optional(),
});

let seeded = false;

async function ensureSeeded() {
  if (!seeded) {
    const cards = getAllCards();
    if (cards.length === 0) {
      await seedAll();
    }
    seeded = true;
  }
}

export async function POST(request: Request) {
  try {
    await ensureSeeded();
    const body = await request.json();
    const parsed = querySchema.parse(body);

    // Sanitize user input query against XSS & content injection
    const cleanQuery = sanitizeInput(parsed.query);

    const baseResult = RewardPathAIModel.runNexusEngine(cleanQuery, parsed.walletCards);
    const result = await RewardPathAIModel.synthesizeWithLLM(cleanQuery, baseResult);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query payload", details: error.errors },
        { status: 400 }
      );
    }
    return handleServerError(error, "Matchmaker API");
  }
}
