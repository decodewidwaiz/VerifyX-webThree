const { env } = require("../config/env");

async function extractText(file) {
  if (env.ocrApiUrl) {
    return {
      mode: "external-pending",
      message: "OCR_API_URL is configured. Wire its multipart contract in services/ocr.js when the provider endpoint is available.",
      fileName: file?.originalname || null
    };
  }

  const error = new Error("OCR_API_URL is not configured");
  error.status = 503;
  throw error;
}

function validateAgainstMetadata(ocrText, claimedMetadata) {
  const haystack = String(ocrText || "").toLowerCase();
  const checks = ["studentName", "degree", "issuerName"].map((key) => {
    const value = String(claimedMetadata?.[key] || "").toLowerCase();
    return {
      field: key,
      expected: claimedMetadata?.[key] || null,
      matched: Boolean(value && haystack.includes(value))
    };
  });

  const matched = checks.filter((check) => check.matched).length;
  return {
    score: checks.length ? Math.round((matched / checks.length) * 100) : 0,
    checks
  };
}

module.exports = { extractText, validateAgainstMetadata };
