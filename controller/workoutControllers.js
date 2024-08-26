const { uploadImages } = require("../Cloudinary/upload");
const userModel = require("../models/userModel");
const workoutModel = require("../models/workoutModel");
const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id });
  res.status(200).json(workouts);
};

const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({});
    if (!workouts) return res.status(404).json({ error: "not found" });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) return res.status(404).json({ error: "not found" });
  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const { title, load, reps, image, user_id } = req.body;

  let emptyFields = [];
  if (!req.body.title) emptyFields.push("title");
  if (!req.body.load) emptyFields.push("load");
  if (!req.body.reps) emptyFields.push("reps");
  if (emptyFields.length > 0)
    return res
      .status(400)
      .json({ error: "pleas fill in all the fields", emptyFields });
  try {
    const user_id = req.user._id;
    const secures = await uploadImages(image);

    const workout = await Workout.create({
      title,
      load,
      reps,
      image: [...secures],
      user_id,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  try {
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) return res.status(404).json({ error: "not found" });
    res.status(200).json(workout);
  } catch (error) {
    res.json({ err: error.message });
  }
};

const updateWorkout = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) return res.status(404).json({ error: "not found" });
    res.status(200).json(workout);
  } catch (error) {
    res.json({ err: error.message });
  }
};

const saveWorkout = async (req, res) => {
  const workoutId = req.body.workoutId;
  if (!mongoose.Types.ObjectId.isValid(workoutId)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const user = await userModel.findById(req.body.userId);
  if (user.savedWorkouts.includes(workoutId)) {
    return res.json({ msg: "this workout is already saved" });
  }
  try {
    const SaveAndUpdate = await userModel.updateOne(
      { _id: req.body.userId },
      { $push: { savedWorkouts: workoutId } }
    );
    const savedWorkout = await Workout.findById({ _id: workoutId });
    res.status(200).json(savedWorkout);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

const getSavedWorkouts = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userModel.findById(userId);
    const savedWorkouts = await workoutModel.find({
      _id: { $in: user.savedWorkouts },
    });

    // console.log(savedWorkouts);
    res.status(200).json(savedWorkouts);
  } catch (error) {
    console.log(error);
  }
};

const unSaveWorkout = async (req, res) => {
  const { userId, workoutId } = req.params;
  try {
    const findAndUnasave = await userModel.updateOne(
      { _id: userId },
      { $pull: { savedWorkouts: workoutId } }
    );
    res.status(200).json({ workoutId });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createWorkout,
  getSingleWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
  saveWorkout,
  getSavedWorkouts,
  getAllWorkouts,
  unSaveWorkout,
};
