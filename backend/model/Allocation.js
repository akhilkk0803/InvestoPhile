const mongoose = require("mongoose");

const AllocationSchema = new mongoose.Schema(
  {
    stock: {
      type: Number,
      required: true,
    },
    fixedDeposit: {
      type: Number,
      required: true,
    },
    gold: {
      type: Number,
      required: true,
    },
    govt_bond: {
      type: Number,
      required: true,
    },
    mutualFund: {
      type: Number,
      required: true,
    },
    projected_return: {
      type: Number,
      required: true,
    },
    sharpe_ratio: {
      type: Number,
      required: true,
    },
    projected_cagr: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Allocation", AllocationSchema);
