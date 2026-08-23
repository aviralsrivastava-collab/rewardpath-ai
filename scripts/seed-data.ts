#!/usr/bin/env tsx
import { seedAll } from "../src/lib/seed";

async function main() {
  console.log("Seeding card data...");
  const result = await seedAll();
  console.log(
    `Done: ${result.structuredCount} cards in SQLite, ${result.vectorCount} chunks in ChromaDB`
  );
}

main().catch(console.error);
