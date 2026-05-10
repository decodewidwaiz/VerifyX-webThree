const express = require("express");
const multer = require("multer");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const { detectTampering, validateAgainstMetadata } = require("../services/ocr");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

async function handleDetect(req, res, next) {
  try {
    const ocr = await detectTampering(req.file);
    return res.json({ ocr });
  } catch (error) {
    return next(error);
  }
}

router.post("/detect", upload.single("file"), handleDetect);
router.post("/extract", upload.single("file"), handleDetect);

router.post(
  "/validate",
  validate(
    z.object({
      ocrText: z.string().default(""),
      claimedMetadata: z.record(z.any()).default({})
    })
  ),
  async (req, res) => {
    const validation = validateAgainstMetadata(req.body.ocrText, req.body.claimedMetadata);
    return res.json({ validation });
  }
);

module.exports = router;
