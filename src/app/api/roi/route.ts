import { NextResponse } from "next/server";
import { z } from "zod";
import { calculateAllROIs } from "@/lib/db/structured";
import { seedAll } from "@/lib/seed";
import { getAllCards } from "@/lib/db/structured";
import type { SpendProfile } from "@/lib/types";

const spendSchema = z.object({
  dining: z.number().min(0).max(1000000),
  groceries: z.number().min(0).max(1000000),
  travel: z.number().min(0).max(1000000),
  gas: z.number().min(0).max(1000000),
  other: z.number().min(0).max(1000000),
});

let seeded = false;

async function ensureSeeded() {
  if (!seeded) {
    if (getAllCards().length === 0) await seedAll();
    seeded = true;
  }
}

export async function POST(request: Request) {
  try {
    await ensureSeeded();
    const body = await request.json();
    const spend = spendSchema.parse(body) as SpendProfile;
    const results = calculateAllROIs(spend);
    return NextResponse.json({ results });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid spend profile", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Calculation failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ensureSeeded();
    const results = calculateAllROIs({
      dining: 15000,
      groceries: 25000,
      travel: 20000,
      gas: 10000,
      other: 30000,
    });
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Calculation failed" }, { status: 500 });
  }
}
