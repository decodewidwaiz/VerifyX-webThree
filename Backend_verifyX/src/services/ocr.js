const { env } = require("../config/env");

function buildOutputUrl(baseUrl, outputPath) {
  if (!outputPath) return null;
  if (/^https?:\/\//i.test(outputPath)) return outputPath;
  return `${baseUrl.replace(/\/$/, "")}/${String(outputPath).replace(/^\//, "")}`;
}

async function detectTampering(file) {
  if (!env.ocrApiUrl) {
    const error = new Error("OCR_API_URL is not configured");
    error.status = 503;
    throw error;
  }

  if (!file) {
    const error = new Error("Upload an image file for document detection");
    error.status = 400;
    throw error;
  }

  if (file.mimetype && !file.mimetype.startsWith("image/")) {
    const error = new Error("Fake document detection currently accepts image files only");
    error.status = 400;
    throw error;
  }

  const baseUrl = env.ocrApiUrl.replace(/\/$/, "");
  const formData = new FormData();
  const blob = new Blob([file.buffer], { type: file.mimetype || "application/octet-stream" });
  formData.append("file", blob, file.originalname || "document.jpg");

  let response;
  try {
    response = await fetch(`${baseUrl}/detect`, {
      method: "POST",
      headers: env.ocrApiKey ? { authorization: `Bearer ${env.ocrApiKey}` } : undefined,
      body: formData
    });
  } catch {
    const error = new Error("OCR service is unreachable right now");
    error.status = 502;
    throw error;
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    const error = new Error(payload.error || payload.detail || `OCR service failed with status ${response.status}`);
    error.status = response.ok ? 502 : response.status;
    throw error;
  }

  return {
    success: Boolean(payload.success),
    filename: payload.filename || file.originalname,
    tamperingScale: Number(payload.tampering_scale ?? 0),
    isSuspicious: Boolean(payload.is_suspicious),
    verdict: payload.verdict || "Document analysis complete",
    suspiciousRegions: Array.isArray(payload.suspicious_regions) ? payload.suspicious_regions : [],
    elaImageUrl: buildOutputUrl(baseUrl, payload.ela_image_url),
    raw: payload
  };
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

module.exports = { detectTampering, validateAgainstMetadata };
