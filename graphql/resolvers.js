const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { GraphQLDateTime } = require("graphql-iso-date");

const Family = require("../models/family");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const Workout = require("../models/workout");
const File = require("../models/file");

const customScalarResolver = {
  Date: GraphQLDateTime,
};

async function populateWorkout(workout) {
  const populatedWorkout = await workout
    .populate("user")
    .populate({
      path: "sections.complexes.units.exercise",
      model: "Exercise",
      populate: [
        {
          path: "image",
          model: "File",
        },
        {
          path: "family",
          model: "Family",
        },
      ],
    })
    .execPopulate();
  return populatedWorkout;
}

module.exports = {
  customScalarResolver,
  // FAMILIES
  async families({ userId }) {
    const families = await Family.find({ user: userId });
    let exercises = await Exercise.find().populate("image").populate("family");

    const editedFamilies = families.map((family) => {
      const familyId = family._id.toString();
      const familyExercises = [];
      exercises.forEach((exercise) => {
        if (exercise.family._id == familyId) {
          familyExercises.push(exercise);
        }
      });
      return {
        id: family.id,
        name: family.name,
        exercises: familyExercises,
        createdAt: family.createdAt
      };
    });
    return editedFamilies;
  },
  async family({ id }) {
    const family = await Family.findById(id);
    let exercises = await Exercise.find({ family: id }).populate("image");
    family.exercises = exercises;
    return family;
  },
  async createFamily({ input }) {
    const family = new Family(input);
    const savedFamily = await family.save();
    return savedFamily;
  },
  async updateFamily({ input }) {
    const familyId = input.id;
    const family = {
      name: input.name,
    };
    const updatedFamily = await Family.findByIdAndUpdate(familyId, family, {
      new: true,
    });
    return updatedFamily;
  },
  async deleteFamily({ id }) {
    const deletedFamily = await Family.findByIdAndRemove(id);
    return deletedFamily;
  },
  //EXERCISES
  async exercise({ id }) {
    const exercise = await Exercise.findById(id)
      .populate("image")
      .populate("family");

    return exercise;
  },
  async createExercise({ input }) {
    const exercise = new Exercise(input);
    const savedExercise = await exercise.save();
    return savedExercise;
  },
  async updateExercise({ input }) {
    const exerciseId = input.id;
    const exercise = input;
    delete exercise.id;
    const updatedExercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      exercise,
      { new: true }
    ).populate("image");
    return updatedExercise;
  },
  async deleteExercise({ id }) {
    const deletedExercise = await Exercise.findByIdAndRemove(id).populate(
      "image"
    );
    return deletedExercise;
  },
  // AUTHENTICATION
  async register({ input }) {
    const user = await User.findOne({ email: input.email });
    if (user) {
      const error = new Error("User already exists!");
      error.code = 401;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(input.password, 12);

    const newUser = new User({ ...input, password: hashedPassword });
    const savedUser = await newUser.save();

    const token = jwt.sign(
      {
        userId: savedUser._id.toString(),
        email: savedUser.email,
      },
      "piti-token",
      { expiresIn: "1h" }
    );
    return {
      token,
      user: savedUser,
    };
  },
  async login({ input }) {
    const { identifier, password } = input;
    let findOneCondition;

    if (identifier.includes("@")) {
      findOneCondition = { email: identifier };
    } else {
      findOneCondition = { username: identifier };
    }

    const user = await User.findOne(findOneCondition).populate("image");
    if (!user) {
      const error = new Error("User was not found");
      error.code = 401;
      throw error;
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      const error = new Error("Password is incorrect");
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      "piti-token",
      { expiresIn: "1h" }
    );
    return {
      token,
      user,
    };
  },
  // USERS
  async users({ id }) {
    const coach = await User.findById(id).populate("image");
    const users = await User.find({ user: id }).populate("image");
    users.unshift(coach);
    return users;
  },
  async user({ id, email }) {
    let user;
    if (id) {
      user = await User.findById(id).populate("image");
    } else {
      user = await User.findOne({ email }).populate("image");
    }
    
    const workouts = await Workout.find({ user: id }).sort({ scheduled: -1 });
    const populatedWorkouts = workouts.map(workout => {
      return populateWorkout(workout)
    })

    user.workouts = populatedWorkouts
    return user;
  },
  async updateUser({ input }) {
    const userId = input.id
    const user = input
    delete user.id
    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true }).populate("image")
    return updatedUser
  },
  async deleteUser({ id }) {
    const deletedUser = await User.findByIdAndRemove(id).populate("image")
    return deletedUser;
  },
  // WORKOUT
  async createWorkout({ input }) {
    const workout = new Workout(input);
    const savedWorkout = await workout.save();
    const populatedWorkout = populateWorkout(savedWorkout);
    return populatedWorkout;
  },
  async updateWorkout({ input }) {
    const workoutId = input.id;
    const workout = input;
    delete workout.id;
    const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, workout, {
      new: true,
    });
    const populatedWorkout = populateWorkout(updatedWorkout);
    return populatedWorkout;
  },
  async workout({ id }) {
    const workout = await Workout.findById(id);
    const populatedWorkout = populateWorkout(workout);
    return populatedWorkout;
  },
  async deleteWorkout({ id }) {
    const workout = await Workout.findByIdAndRemove(id);
    const populatedWorkout = populateWorkout(workout);
    return populatedWorkout;
  },
};
