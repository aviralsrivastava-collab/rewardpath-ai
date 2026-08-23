/**
 * SECURITY SANITIZER MODULE
 * Strips HTML, script tags, event handlers, and SQL control characters from user inputs.
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // Remove script tags & content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/on\w+\s*=\s*(['"]).*?\1/gi, "") // Remove inline event handlers (e.g. onload="", onerror="")
    .replace(/javascript\s*:/gi, "") // Remove javascript: pseudo-protocols
    .replace(/[\0\x08\x09\x1a\n\r"'\\%]/g, (char) => {
      // Escape SQL control characters
      switch (char) {
        case "\0":
          return "\\0";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "'":
          return "''";
        case '"':
          return '\\"';
        case "\\":
          return "\\\\";
        default:
          return char;
      }
    })
    .trim();
}
