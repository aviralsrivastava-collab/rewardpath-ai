import { NextResponse } from "next/server";
import crypto from "crypto";
import { trainAndBuildEmbeddingIndex } from "../../../../../../scripts/train-ai-model";
import { handleServerError } from "@/lib/error-handler";

function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const adminKey = process.env.ADMIN_SECRET_KEY;

    // Strict Admin Auth & Token Check: Refuse access if key is missing or invalid
    if (!adminKey || !authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized — Valid Admin Bearer token required" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    if (!safeCompare(token, adminKey)) {
      return NextResponse.json(
        { error: "Forbidden — Invalid Admin token" },
        { status: 403 }
      );
    }

    const artifact = await trainAndBuildEmbeddingIndex();
    return NextResponse.json({
      message: "Embedding index artifact rebuilt successfully",
      version: artifact.version,
      chunkCount: artifact.chunkCount,
    });
  } catch (error) {
    return handleServerError(error, "Admin Reindex API");
  }
}
