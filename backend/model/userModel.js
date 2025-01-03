const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    age: { type: Number, required: true },
    goals: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Goal",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
