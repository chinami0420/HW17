const db = require("../models");
const router = require("express").Router();

module.exports = function (app) {
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.get("/api/workouts/:id", (req, res) => {
    const workoutId = req.params.id;
    db.Workout.find({ _id: workoutId })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.post("/api/workouts", async (req, res) => {
    try {
      const response = await db.Workout.create({ type: "workout" });
      res.json(response);
    } catch (err) {
      console.log("unable to create workout: ", err);
    }
  });
  // Used by api.js to add an exercise to a workout
  app.put("/api/workouts/:id", ({ body, params }, res) => {
    // console.log(body, params)
    const workoutId = params.id;
    console.log(
      `creating new exercise on the backend for workout ${workoutId}`
    );
    let savedExercises = [];

    // gets all the currently saved exercises in the current workout
    db.Workout.find({ _id: workoutId })
      .then((dbWorkout) => {
        savedExercises = dbWorkout[0].exercises;
        let allExercises = [...savedExercises, body];
        console.log(`New exercises for this workout: ${allExercises}`);
        updateWorkout(allExercises);
        res.json(allExercises);
      })
      .catch((err) => {
        res.json(err);
      });

    function updateWorkout(exercises) {
      console.log(`Updating workouts`);
      db.Workout.findByIdAndUpdate(
        workoutId,
        { exercises: exercises },
        function (err) {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
      .then((workout) => {
        res.json(workout);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
