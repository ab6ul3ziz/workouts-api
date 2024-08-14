const express = require("express");
const {
  getSingleWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
  saveWorkout,
  getSavedWorkouts,
  getAllWorkouts,
  unSaveWorkout,
} = require("../controller/workoutControllers");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.use(requireAuth);

router.get("/", getWorkouts);

router.get("/all", getAllWorkouts);

router.get("/:id", getSingleWorkout);

router.get("/:id/saved", getSavedWorkouts);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

router.put("/save", saveWorkout);

router.delete("/:userId/:workoutId", unSaveWorkout);

module.exports = router;
