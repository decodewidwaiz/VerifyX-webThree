const express = require("express");
const multer = require("multer");
const { z } = require("zod");
const { validate } = require("../middleware/validate");
const { extractText, validateAgainstMetadata } = require("../services/ocr");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post("/extract", upload.single("file"), async (req, res, next) => {
  try {
    const ocr = await extractText(req.file);
    return res.json({ ocr });
  } catch (error) {
    return next(error);
  }
});

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
