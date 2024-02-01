import React from "react";
import { Route, Routes } from "react-router-dom";
import ExerciseTracker from "./ExerciseTracker";
import Navbar from "./Navbar";
import WorkoutCreator from "./Workout Creator/WorkoutCreator";
import Login from "./Login/Login";
import "./App.scss";

export const UserContext = React.createContext("");

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState<string>("");

  return (
    <div className="PageTempelate">
      <UserContext.Provider value={loggedIn}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="/exercise" element={<ExerciseTracker />} />
          <Route path="/workout" element={<WorkoutCreator />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
