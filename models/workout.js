const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Enter a name for this workout"
    },
    type: {
        type: String,
        enum: ["cardio", "resistance"]
    },
    duration: {
        type: Number,
        min: [0, "Must be more than 0"]
    },
    distance: {
        type: Number,
        min: [0, "Must be more than 0"]
    },
    weight: {
        type: Number,
        min: [0, "Must be more than 0"]
    },
    sets: {
        type: Number,
        min: [0, "Must be more than 0"]
    },
    reps: {
        type: Number,
        min: [0, "Must be more than 0"]
    }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;