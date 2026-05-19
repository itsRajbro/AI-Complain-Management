// routes/authRoutes.js
// Defines authentication API endpoints

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { signup, login, getProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// POST /api/auth/signup
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  signup
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

// GET /api/auth/profile (protected)
router.get("/profile", protect, getProfile);

module.exports = router;
