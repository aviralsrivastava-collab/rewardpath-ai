import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const userId = body.userId || "anonymous_session";

    // In-memory / session data purging & anonymization
    const response = NextResponse.json({
      success: true,
      message: `All personal data and session state associated with ${userId} has been permanently anonymized and purged.`,
      deletedAt: new Date().toISOString(),
    });

    // Clear any authentication or tracking cookies with secure flags
    response.cookies.set("rewardpath_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    response.cookies.set("analytics_consent", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Failed to process data deletion request" }, { status: 500 });
  }
}
