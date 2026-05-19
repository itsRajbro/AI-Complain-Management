// models/Complaint.js
// Mongoose schema for complaints (matches exam requirement exactly)

const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    title: {
      type: String,
      required: [true, "Complaint title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Complaint description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Water Supply",
        "Electricity",
        "Garbage",
        "Roads",
        "Sanitation",
        "Other",
      ],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },
    // AI-generated fields
    aiAnalysis: {
      priority: { type: String, default: "" },
      department: { type: String, default: "" },
      autoResponse: { type: String, default: "" },
      summary: { type: String, default: "" },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", ComplaintSchema);
