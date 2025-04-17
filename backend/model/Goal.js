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
    investmentAmount: String,
    targetAmount: {
      type: String,
      required: true,
    },
    riskTolerance: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      required: true,
    },
    frequency: {
      type: String,
      default: "monthly",
    },
    duration: {
      type: Number,
      required: true,
    },
    progress: [
      {
        progressNumber: {
          type: String,
          required: true,
        },
        investment: {
          type: Number,
          required: true,
        },
      },
    ],
    allocation: {
      type: mongoose.Types.ObjectId,
      ref: "Allocation",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Goal", GoalSchema);
