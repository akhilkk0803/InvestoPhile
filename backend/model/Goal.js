const mongoose = require("mongoose");
const GoalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    goalName: {
      type: String,
      required: true,
    },
    investmentType: {
      type: String,
      enum: ["Sip", "Lumpsum"],
      required: true,
    },
    investmentAmount: Number,
    targetAmount: {
      type: Number,
      required: true,
    },
    riskTolerance: {
      type: String,
      enum: ["Very Low", "Low", "Moderate", "High", "Very High"],
      required: true,
    },
    frequency: {
      type: String,
    },
    duration: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Goal", GoalSchema);
