const { buildSchema } = require("graphql");

module.exports = buildSchema(`

  scalar Date
  
  type File {
    id: String, 
    name: String, 
    url: String,
    public_id: String,
  }

  type Workout {
    id: String, 
    ready: Boolean, 
    sticky: Boolean, 
    scheduled: Date,
    createdAt: Date, 
    name: String, 
    user: User,
    sections: [workoutSection], 
  }

  type User {
    id: String, 
    username: String, 
    fullname: String, 
    email: String, 
    admin: Boolean, 
    active: Boolean, 
    image: File, 
    workouts: [Workout],
  }

  type Exercise {
    id: String, 
    name: String,
    family: Family,
    image: File, 
  }

  type Family {
    id: String, 
    name: String,
    description: String,
    exercises: [Exercise],
    user: ID, 
    createdAt: Date, 
  }

  type workoutSection {
    id: ID,
    name: String,
    complexes: [workoutComplex] 
  }

  type workoutComplex {
    id: ID, 
    name: String, 
    units: [workoutUnit],
  }

  type workoutUnit {
    id: ID,
    exercise: Exercise,
    sets: Int, 
    reps: Int, 
    time: Int, 
    distance: Int, 
    rest: Int, 
    remarks: String, 
    feedback: String, 
  }

  input workoutSectionInput {
    name: String, 
    complexes: [workoutComplexInput], 
  }

  input workoutComplexInput {
    name: String, 
    units: [workoutUnitInput], 
  }

  input workoutUnitInput {
    exercise: ID, 
    sets: Int, 
    reps: Int, 
    time: Int, 
    distance: Int, 
    rest: Int, 
    remarks: String, 
    feedback: String, 
  }

  type authData {
    token: String, 
    user: User,
  }

  input loginInput {
    identifier: String,
    password: String
  }

  input registerInput {
    username: String, 
    fullname: String, 
    email: String, 
    password: String, 
    admin: Boolean, 
    user: ID, 
  }

  input updateUserInput {
    id: ID,
    username: String, 
    fullname: String, 
    email: String, 
    password: String, 
    admin: Boolean, 
    active: Boolean,
    user: ID, 
  }

  input createFamilyInput {
    name: String,
    user: ID 
  }

  input updateFamilyInput {
    id: String, 
    name: String,
    user: ID
  }

  input createExerciseInput {
    name: String,
    family: ID, 
    image: ID,
  }

  input updateExerciseInput {
    id: ID, 
    name: String,
    family: ID, 
    image: ID, 
  }

  input createWorkoutInput {
    name: String, 
    sticky: Boolean, 
    ready: Boolean, 
    scheduled: Date, 
    user: ID,
    sections: [workoutSectionInput], 
  }

  input updateWorkoutInput {
    id: ID, 
    name: String, 
    sticky: Boolean, 
    ready: Boolean, 
    scheduled: Date, 
    user: ID,
    sections: [workoutSectionInput],
  }

  type RootQuery {
    families(userId: ID): [Family],
    family(id: ID): Family, 
    exercise(id: ID): Exercise,
    users(id: ID): [User],
    user(id: ID, email: String): User,
    workout(id: ID): Workout, 
  }

  type RootMutation {
    register(input: registerInput): authData,
    login(input: loginInput): authData,
    updateUser(input: updateUserInput): User,
    deleteUser(id: ID!): User, 
    createFamily(input: createFamilyInput): Family, 
    updateFamily(input: updateFamilyInput): Family,
    deleteFamily(id: ID!): Family,
    createExercise(input: createExerciseInput): Exercise,
    updateExercise(input: updateExerciseInput): Exercise, 
    deleteExercise(id: ID!): Exercise, 
    createWorkout(input: createWorkoutInput): Workout,
    updateWorkout(input: updateWorkoutInput): Workout,
    deleteWorkout(id: ID!): Workout, 
  }

  schema {
    query: RootQuery,
    mutation: RootMutation, 
  }
`);
