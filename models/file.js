const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    name: String,
    url: String,
    public_id: String, 
    format: String, 
  },
  {
    timestamps: true,
    collection: "upload_file", 
  }
);

module.exports = mongoose.model("File", fileSchema);
