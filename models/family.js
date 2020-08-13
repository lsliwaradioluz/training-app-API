const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    alias: { type: String, required: true },
    description: { type: String, required: true },
    exercises: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Family", familySchema);
