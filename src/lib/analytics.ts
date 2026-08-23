"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("analytics-consent") === "granted";
}

export function setAnalyticsConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  localStorage.setItem("analytics-consent", granted ? "granted" : "denied");
  if (granted && GA_MEASUREMENT_ID) {
    loadGtag();
  }
}

export function loadGtag() {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  if (document.getElementById("gtag-script")) return;

  const script = document.createElement("script");
  script.id = "gtag-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
}

export function sanitizePII(text: string): string {
  return text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[REDACTED_EMAIL]")
    .replace(/\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, "[REDACTED_PHONE]");
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number>
) {
  if (!hasAnalyticsConsent() || !window.gtag) return;

  const sanitizedParams: Record<string, string | number> = {};
  if (params) {
    for (const [key, val] of Object.entries(params)) {
      if (typeof val === "string") {
        sanitizedParams[key] = sanitizePII(val);
      } else {
        sanitizedParams[key] = val;
      }
    }
  }

  window.gtag("event", action, sanitizedParams);
}
