const dotenv = require("dotenv");

dotenv.config();

const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || "development",
  frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  mongodbUri: process.env.MONGODB_URI || "",
  ocrApiUrl: process.env.OCR_API_URL || "",
  ocrApiKey: process.env.OCR_API_KEY || ""
};

module.exports = { env };
