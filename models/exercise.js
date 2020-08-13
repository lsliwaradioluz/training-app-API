const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    alias: { type: String, required: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
    family: { type: mongoose.Schema.Types.ObjectId, ref: "Family" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exercise", exerciseSchema);
