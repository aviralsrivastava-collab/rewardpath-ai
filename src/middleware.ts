import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit } from "@/lib/rate-limiter";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "127.0.0.1";

  // 1. BLOCK ATTACK VECTOR 6: INTERNAL FILE EXPOSURE & SENSITIVE PATH BLOCKING
  const lowerPath = pathname.toLowerCase();
  const sensitivePathPatterns = [
    "/.env",
    "/.git",
    "/.ds_store",
    "/admin-backdoor",
    "/debug",
    "/test-only",
    "/seed-data",
  ];

  if (
    sensitivePathPatterns.some((pattern) => lowerPath.includes(pattern)) ||
    lowerPath.endsWith(".pem") ||
    lowerPath.endsWith(".key") ||
    lowerPath.endsWith(".crt")
  ) {
    return new NextResponse(
      JSON.stringify({ error: "Access Denied: Protected resource" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. STRICT CORS CHECK FOR API ROUTES
  if (pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (origin && origin !== allowedOrigin && !origin.startsWith("http://localhost:")) {
      return new NextResponse(
        JSON.stringify({ error: "CORS policy violation: Unauthorized origin" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    // Handle OPTIONS preflight
    if (request.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 204 });
      response.headers.set("Access-Control-Allow-Origin", origin || allowedOrigin);
      response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      return response;
    }
  }

  // 3. RATE LIMITING FOR API ROUTES
  if (pathname.startsWith("/api/")) {
    const isSensitive = pathname.startsWith("/api/ai/admin/") || pathname.startsWith("/api/user/");
    const limit = isSensitive ? 5 : 60; // 5 req/min for sensitive, 60 req/min for general API
    const windowMs = 60000; // 1 minute window

    const rateKey = `${ip}:${pathname.startsWith("/api/ai/admin/") ? "admin" : "api"}`;
    const { allowed, remaining, resetSec } = checkRateLimit(rateKey, limit, windowMs);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests. Please slow down and try again later.",
          retryAfterSeconds: resetSec,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(resetSec),
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": String(remaining),
          },
        }
      );
    }
  }

  const response = NextResponse.next();

  // Add security headers to all responses
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  return response;
}

export const config = {
  matcher: ["/api/:path*", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
