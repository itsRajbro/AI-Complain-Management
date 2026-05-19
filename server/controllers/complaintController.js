// controllers/complaintController.js
// Handles all CRUD operations for complaints

const { validationResult } = require("express-validator");
const Complaint = require("../models/Complaint");

// @desc    Add a new complaint
// @route   POST /api/complaints
// @access  Public
const addComplaint = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, title, description, category, location } = req.body;

    const complaint = await Complaint.create({
      name,
      email,
      title,
      description,
      category,
      location,
    });

    res.status(201).json({
      message: "Complaint stored successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private
const getAllComplaints = async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update complaint status
// @route   PUT /api/complaints/:id
// @access  Private
const updateComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({ message: "Updated status shown", complaint: updatedComplaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a complaint
// @route   DELETE /api/complaints/:id
// @access  Private
const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    await complaint.deleteOne();
    res.json({ message: "Complaint removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search complaints by location
// @route   GET /api/complaints/search?location=Ghaziabad
// @access  Public
const searchByLocation = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ message: "Location query is required" });
    }

    const complaints = await Complaint.find({
      location: { $regex: location, $options: "i" }, // case-insensitive match
    }).sort({ createdAt: -1 });

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addComplaint,
  getAllComplaints,
  updateComplaint,
  deleteComplaint,
  searchByLocation,
};
