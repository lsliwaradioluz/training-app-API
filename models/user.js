const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: String,
    username: String,
    email: String,
    password: String,
    admin: Boolean,
    active: { type: Boolean, default: true },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "File" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
    collection: "users-permissions_user",
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
