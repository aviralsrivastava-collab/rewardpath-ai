import { NextResponse } from "next/server";
import { getComparisonMatrix } from "@/lib/db/structured";
import { seedAll } from "@/lib/seed";
import { getAllCards } from "@/lib/db/structured";

let seeded = false;

async function ensureSeeded() {
  if (!seeded) {
    if (getAllCards().length === 0) await seedAll();
    seeded = true;
  }
}

export async function GET() {
  try {
    await ensureSeeded();
    const cards = getComparisonMatrix();
    return NextResponse.json({ cards });
  } catch {
    return NextResponse.json({ error: "Failed to load cards" }, { status: 500 });
  }
}
