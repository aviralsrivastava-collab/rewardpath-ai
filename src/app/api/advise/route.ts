import { NextResponse } from "next/server";
import { z } from "zod";
import { RewardPathAIModel } from "@/lib/ai/model";
import { getAllCards } from "@/lib/db/structured";
import { seedAll } from "@/lib/seed";

const adviseSchema = z.object({
  query: z.string().min(2).max(600),
  walletCards: z.array(z.string()).optional(),
});

let seeded = false;
async function ensureDb() {
  if (!seeded) {
    if (getAllCards().length === 0) {
      await seedAll();
    }
    seeded = true;
  }
}

export async function POST(request: Request) {
  try {
    await ensureDb();
    const body = await request.json();
    const { query, walletCards = [] } = adviseSchema.parse(body);

    // Get deterministic ground-truth RAG evaluation
    const baseEvaluation = RewardPathAIModel.runNexusEngine(query, walletCards);

    const cardsContext = baseEvaluation.recommendations
      .map(
        (r) =>
          `- ${r.cardName}: NAV ₹${r.netAnnualValue.toLocaleString()}, Annual Fee ₹${r.annualFee.toLocaleString()}, Rewards ₹${r.annualRewards.toLocaleString()}. Key rule: ${r.reasoning}`
      )
      .join("\n");

    const citationsContext = baseEvaluation.citations
      .slice(0, 4)
      .map((c) => `- [${c.chunkId}] ${c.excerpt} (Source: ${c.sourceDocumentUrl})`)
      .join("\n");

    const systemPrompt = `You are the RewardPath Command Center AI, a senior rewards and travel card strategist in India.
Your mission is educational financial analysis only.
Rules:
1. Cite issuer documents for every fee, multiplier, and rule.
2. Say "not verified" when unsure.
3. NEVER invent numbers or claim false benefits.
4. Output strictly valid JSON with keys:
   {
     "answer": "A clear, authoritative 2-3 sentence strategic summary directly addressing the user.",
     "steps": ["Actionable step 1 with verified numbers", "Step 2 transfer or booking instructions", "Step 3 fee waiver or lounge usage"],
     "citations": [{"label": "Issuer Document", "url": "URL", "excerpt": "exact rule"}]
   }`;

    const userPrompt = `User Query: "${query}"

Verified Bank Context:
Intent: ${baseEvaluation.intentType}
${cardsContext || "None"}

Issuer Ground Truth Citations:
${citationsContext || "None"}`;

    // 1. Anthropic API
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicKey) {
      try {
        const Anthropic = (await import("@anthropic-ai/sdk")).default;
        const anthropic = new Anthropic({ apiKey: anthropicKey });
        const message = await anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
        });

        const textBlock = message.content.find((c) => c.type === "text");
        if (textBlock && textBlock.text) {
          const parsed = JSON.parse(textBlock.text.trim());
          if (parsed.answer) {
            return NextResponse.json({
              answer: parsed.answer,
              steps: parsed.steps || [],
              citations: parsed.citations || baseEvaluation.citations.slice(0, 3).map((c) => ({
                label: c.chunkId,
                url: c.sourceDocumentUrl,
                excerpt: c.excerpt,
              })),
              disclaimer: "Educational analysis only — not financial advice.",
            });
          }
        }
      } catch {
        // Fallback to Gemini or deterministic
      }
    }

    // 2. Google Gemini API (Verified working in this environment)
    const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (geminiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `${systemPrompt}\n\n${userPrompt}`,
                    },
                  ],
                },
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2,
              },
            }),
            signal: AbortSignal.timeout(8000),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            if (parsed.answer) {
              return NextResponse.json({
                answer: parsed.answer,
                steps: parsed.steps || [],
                citations: parsed.citations || baseEvaluation.citations.slice(0, 3).map((c) => ({
                  label: c.chunkId,
                  url: c.sourceDocumentUrl,
                  excerpt: c.excerpt,
                })),
                disclaimer: "Educational analysis only — not financial advice.",
              });
            }
          }
        }
      } catch {
        // Fallback to deterministic
      }
    }

    // 3. Deterministic Ground Truth Fallback
    const synthesized = await RewardPathAIModel.synthesizeWithLLM(query, baseEvaluation);

    let defaultSteps = [
      "Select the card matching your primary spend category to maximize reward multipliers.",
      "Transfer points to partner airlines (1:1 ratio) or hotels (1:2 ratio) for highest rupee value.",
      "Meet annual milestone thresholds to trigger automatic joining and renewal fee waivers.",
    ];

    if (baseEvaluation.tripPlanner) {
      defaultSteps = [
        `Flights: Book with ${baseEvaluation.tripPlanner.flightsStrategy.cardName} (${baseEvaluation.tripPlanner.flightsStrategy.multiplierText}).`,
        `Hotels: Transfer to ${baseEvaluation.tripPlanner.hotelsStrategy.transferRatio} using ${baseEvaluation.tripPlanner.hotelsStrategy.cardName}.`,
        `Forex: Swipe ${baseEvaluation.tripPlanner.shoppingForexStrategy.cardName} for ${baseEvaluation.tripPlanner.shoppingForexStrategy.forexMarkup}% low forex markup.`,
      ];
    } else if (baseEvaluation.creditRiskAnalysis) {
      defaultSteps = baseEvaluation.creditRiskAnalysis.mitigationPlaybook.slice(0, 3);
    } else if (baseEvaluation.purchaseProfitability) {
      defaultSteps = baseEvaluation.purchaseProfitability.stepByStepProcess.slice(0, 3);
    } else if (baseEvaluation.redemptionGuide) {
      defaultSteps = baseEvaluation.redemptionGuide.stepByStepProcess.slice(0, 3);
    }

    return NextResponse.json({
      answer: synthesized.summary,
      steps: defaultSteps,
      citations: baseEvaluation.citations.slice(0, 3).map((c) => ({
        label: c.chunkId,
        url: c.sourceDocumentUrl,
        excerpt: c.excerpt,
      })),
      disclaimer: "Educational analysis only — not financial advice.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payload", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to generate advice" }, { status: 500 });
  }
}
