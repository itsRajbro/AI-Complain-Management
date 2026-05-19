// routes/aiRoutes.js
// Defines AI analysis API endpoints

const express = require("express");
const router = express.Router();
const { analyzeComplaint } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/ai/analyze (protected - must be logged in)
router.post("/analyze", protect, analyzeComplaint);

module.exports = router;
