import { NextResponse } from "next/server";

export function generateCorrelationId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `req_${timestamp}_${randomStr}`;
}

export function handleServerError(error: unknown, contextName = "API"): NextResponse {
  const correlationId = generateCorrelationId();

  // Detailed error logged ONLY to server-side logs
  console.error(`[${contextName} ERROR] [Correlation ID: ${correlationId}]`, {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });

  // Client receives ONLY a generic message and correlation ID (no stack trace or internal info)
  return NextResponse.json(
    {
      error: `An unexpected server error occurred. Please contact support with Correlation ID: ${correlationId}`,
      correlationId,
    },
    { status: 500 }
  );
}
