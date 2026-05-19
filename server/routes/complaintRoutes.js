// routes/complaintRoutes.js
// Defines complaint API endpoints

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  addComplaint,
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
  searchByLocation,
} = require("../controllers/complaintController");
const { protect } = require("../middleware/authMiddleware");

// Validation rules for adding a complaint
const complaintValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("title").notEmpty().withMessage("Complaint title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("location").notEmpty().withMessage("Location is required"),
];

// GET /api/complaints/search?location=Ghaziabad  ← MUST be before /:id routes
router.get("/search", searchByLocation);

// POST /api/complaints
router.post("/", complaintValidation, addComplaint);

// GET /api/complaints
router.get("/", protect, getAllComplaints);

// PUT /api/complaints/:id
router.put("/:id", protect, updateComplaint);

// DELETE /api/complaints/:id
router.delete("/:id", protect, deleteComplaint);

module.exports = router;
