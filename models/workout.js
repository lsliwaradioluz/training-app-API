const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    name: String,
    ready: Boolean,
    sticky: Boolean,
    scheduled: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    sections: [
      {
        name: String,
        complexes: [
          {
            name: String,
            units: [
              {
                exercise: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Exercise",
                },
                sets: Number,
                reps: Number,
                time: Number,
                distance: Number,
                rest: Number,
                remarks: String,
                feedback: String,
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Array of section objects => array of complex objects => array of unit objects => array of exercises

module.exports = mongoose.model("Workout", workoutSchema);
