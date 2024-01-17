import React from "react";
import { Route, Routes } from "react-router-dom";
import ExerciseTracker from "./ExerciseTracker";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import WorkoutCreator from "./Workout Creator/WorkoutCreator";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercise" element={<ExerciseTracker />} />
        <Route path="/workout" element={<WorkoutCreator />} />
      </Routes>
    </>
  );
};

export default App;
