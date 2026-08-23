export {
  getAllCards,
  getCardById,
  upsertCard,
  seedStructuredCards,
  calculateROI,
  calculateAllROIs,
  getComparisonMatrix,
} from "./structured";

export {
  seedVectorDb,
  queryVectorDb,
  buildChunksForCard,
} from "./vector";
export type { VectorChunk } from "./vector";
