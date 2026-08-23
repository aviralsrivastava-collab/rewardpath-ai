import { NextResponse } from "next/server";
import { z } from "zod";
import { RewardPathAIModel } from "@/lib/ai/model";
import { seedAll } from "@/lib/seed";
import { getAllCards } from "@/lib/db/structured";

const chatSchema = z.object({
  query: z.string().min(2).max(500),
  walletCards: z.array(z.string()).optional(),
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
    const parsed = chatSchema.parse(body);

    const baseResult = RewardPathAIModel.runNexusEngine(parsed.query, parsed.walletCards);
    const synthesizedResult = await RewardPathAIModel.synthesizeWithLLM(parsed.query, baseResult);
    const modelStatus = RewardPathAIModel.getStatus();

    return NextResponse.json({ ...synthesizedResult, modelStatus });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid query payload", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to process RewardPath Nexus request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const status = RewardPathAIModel.getStatus();
  return NextResponse.json({ modelStatus: status });
}
