import type { CardStructuredData } from "../types";

export interface VectorChunk {
  id: string;
  cardId: string;
  content: string;
  sourceDocumentUrl: string;
  effectiveDate: string;
  lastSourceChecked: string;
  chunkType: "terms" | "bonus" | "rewards" | "fees";
}

function buildChunksForCard(card: CardStructuredData): VectorChunk[] {
  const base = {
    cardId: card.id,
    sourceDocumentUrl: card.sourceDocumentUrl,
    effectiveDate: card.effectiveDate,
    lastSourceChecked: card.lastSourceChecked,
  };

  const categoryText = Object.entries(card.rewardCategories)
    .map(([cat, mult]) => `${cat}: ${mult}x`)
    .join(", ");

  return [
    {
      id: `${card.id}-fees`,
      ...base,
      chunkType: "fees" as const,
      content: `${card.name} (${card.issuer}) charges an annual fee of $${card.annualFee}. Foreign transaction markup is ${card.forexMarkup}%. Source: ${card.sourceDocumentUrl}`,
    },
    {
      id: `${card.id}-bonus`,
      ...base,
      chunkType: "bonus" as const,
      content: `${card.name} welcome bonus: ${card.welcomeBonusPoints.toLocaleString()} points after spending $${card.welcomeBonusSpendRequired.toLocaleString()} within ${card.welcomeBonusMonths} months. Source: ${card.sourceDocumentUrl}`,
    },
    {
      id: `${card.id}-rewards`,
      ...base,
      chunkType: "rewards" as const,
      content: `${card.name} earns rewards at: ${categoryText}. Transfer partners: ${card.transferPartners.join(", ") || "none"}. Source: ${card.sourceDocumentUrl}`,
    },
    {
      id: `${card.id}-terms`,
      ...base,
      chunkType: "terms" as const,
      content: `${card.name} full terms effective ${card.effectiveDate}, last verified ${card.lastSourceChecked}. Annual fee $${card.annualFee}, forex markup ${card.forexMarkup}%. Reward categories: ${categoryText}.`,
    },
  ];
}

let inMemoryChunks: VectorChunk[] = [];

async function getChromaCollection() {
  const { ChromaClient } = await import("chromadb");
  const client = new ChromaClient({
    path: process.env.CHROMA_URL ?? "http://localhost:8000",
  });
  return client.getOrCreateCollection({
    name: "card_terms",
    metadata: { description: "Credit card terms and conditions chunks" },
  });
}

export async function seedVectorDb(cards: CardStructuredData[]) {
  const chunks = cards.flatMap(buildChunksForCard);
  inMemoryChunks = chunks;

  try {
    const col = await getChromaCollection();
    await col.upsert({
      ids: chunks.map((c) => c.id),
      documents: chunks.map((c) => c.content),
      metadatas: chunks.map((c) => ({
        cardId: c.cardId,
        sourceDocumentUrl: c.sourceDocumentUrl,
        effectiveDate: c.effectiveDate,
        lastSourceChecked: c.lastSourceChecked,
        chunkType: c.chunkType,
      })),
    });
  } catch {
    // In-memory fallback is already populated
  }

  return chunks.length;
}

function keywordSearch(query: string, nResults: number): VectorChunk[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = inMemoryChunks.map((chunk) => {
    const text = chunk.content.toLowerCase();
    const score = terms.reduce(
      (acc, term) => acc + (text.includes(term) ? 1 : 0),
      0
    );
    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, nResults)
    .map((s) => s.chunk);
}

export async function queryVectorDb(
  query: string,
  nResults = 8
): Promise<VectorChunk[]> {
  try {
    const col = await getChromaCollection();
    const results = await col.query({
      queryTexts: [query],
      nResults,
    });

    if (!results.ids[0]?.length) {
      return keywordSearch(query, nResults);
    }

    return results.ids[0].map((id, i) => ({
      id: id as string,
      cardId: (results.metadatas?.[0]?.[i]?.cardId as string) ?? "",
      content: (results.documents?.[0]?.[i] as string) ?? "",
      sourceDocumentUrl:
        (results.metadatas?.[0]?.[i]?.sourceDocumentUrl as string) ?? "",
      effectiveDate:
        (results.metadatas?.[0]?.[i]?.effectiveDate as string) ?? "",
      lastSourceChecked:
        (results.metadatas?.[0]?.[i]?.lastSourceChecked as string) ?? "",
      chunkType:
        (results.metadatas?.[0]?.[i]?.chunkType as VectorChunk["chunkType"]) ??
        "terms",
    }));
  } catch {
    return keywordSearch(query, nResults);
  }
}

export { buildChunksForCard };
