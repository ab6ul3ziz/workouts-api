const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  image: [
    {
      imgID: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model("workouts", workoutSchema);
