import { seedStructuredCards, getAllCards } from "./db/structured";
import { seedVectorDb } from "./db/vector";
import { SEED_CARDS } from "./data/seed-cards";

export async function seedAll() {
  // Always seed latest SEED_CARDS to ensure structured store has current Indian card data
  seedStructuredCards(SEED_CARDS);

  const cards = getAllCards();
  let vectorCount = 0;

  try {
    vectorCount = await seedVectorDb(cards);
  } catch (err) {
    console.warn(
      "ChromaDB unavailable — structured data seeded, vector DB skipped.",
      err instanceof Error ? err.message : err
    );
  }

  return {
    structuredCount: cards.length,
    vectorCount,
  };
}
