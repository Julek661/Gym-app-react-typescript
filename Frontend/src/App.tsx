import React from "react";
import { Route, Routes } from "react-router-dom";
import ExerciseTracker from "./ExerciseTracker";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import WorkoutCreator from "./Workout Creator/WorkoutCreator";
import Login from "./Login/Login";
import "./App.scss";

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState("");
  return (
    <div className="PageTempelate">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        <Route
          path="/exercise"
          element={<ExerciseTracker />}
        />
        <Route path="/workout" element={<WorkoutCreator />} />
      </Routes>
    </div>
  );
};

export default App;
