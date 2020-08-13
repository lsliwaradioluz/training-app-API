const mongoose = require("mongoose");

const connectMongoose = (callback) => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@training-app-uraxw.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("Connected to MongoDB...");
      callback();
    })
    .catch((err) => console.error("Could not connect to MongoDB:", err));
};

exports.connectMongoose = connectMongoose;
