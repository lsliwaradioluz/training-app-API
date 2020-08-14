const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    exercises: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Family", familySchema);
