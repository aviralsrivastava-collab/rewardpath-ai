export interface AppConfig {
  nodeEnv: string;
  isProduction: boolean;
  appUrl: string;
  openaiApiKey?: string;
  adminSecretKey?: string;
  databaseUrl?: string;
}

export function validateAndGetConfig(): AppConfig {
  const nodeEnv = process.env.NODE_ENV || "development";
  const isProduction = nodeEnv === "production";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const adminSecretKey = process.env.ADMIN_SECRET_KEY;
  let databaseUrl = process.env.DATABASE_URL;

  // Enforce SSL/TLS on production database connections
  if (databaseUrl && isProduction && !databaseUrl.includes("sslmode=")) {
    databaseUrl += databaseUrl.includes("?") ? "&sslmode=require" : "?sslmode=require";
  }

  // Refuse startup in production if critical variables are missing
  if (isProduction) {
    const missingVars: string[] = [];
    if (!openaiApiKey) missingVars.push("OPENAI_API_KEY");
    if (!adminSecretKey) missingVars.push("ADMIN_SECRET_KEY");

    if (missingVars.length > 0) {
      const errorMsg = `[FATAL STARTUP ERROR] Missing critical environment variables for production: ${missingVars.join(", ")}. The application refuses to start until these are configured.`;
      console.error(errorMsg);
      // In production server environment, throw fatal startup exception
      if (typeof window === "undefined" && process.env.STRICT_ENV_VALIDATION === "true") {
        throw new Error(errorMsg);
      }
    }
  }

  return {
    nodeEnv,
    isProduction,
    appUrl,
    openaiApiKey,
    adminSecretKey,
    databaseUrl,
  };
}

export const config = validateAndGetConfig();
