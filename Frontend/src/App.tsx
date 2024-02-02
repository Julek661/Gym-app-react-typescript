import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ExerciseTracker from "./ExerciseTracker";
import Navbar from "./Navbar";
import WorkoutCreator from "./Workout Creator/WorkoutCreator";
import Login from "./Login/Login";
import "./App.scss";

export const UserContext = React.createContext("");

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState<string>(() => {
    // Retrieve the logged in state from localStorage when initializing the state
    const savedLoggedIn = localStorage.getItem("loggedIn");
    return savedLoggedIn ? JSON.parse(savedLoggedIn) : "";
  });

  useEffect(() => {
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <div className="PageTempelate">
      <UserContext.Provider value={loggedIn}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
          {loggedIn && <Route path="/exercise" element={<ExerciseTracker />} />}
          {loggedIn && <Route path="/workout" element={<WorkoutCreator />} />}
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
