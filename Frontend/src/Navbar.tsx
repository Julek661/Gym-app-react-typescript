import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.scss";
import { UserContext } from "./App";

export default function Navbar() {
  const loggedIn = React.useContext(UserContext);

  const navs = [
    { name: "Home", path: "/", id: 1 },
    { name: "Exercise Tracker", path: "/exercise", id: 2},
    { name: "Workouts", path: "/workout", id: 3},
    { name: "Calorie Tracker", path: "/calorie", id: 4},
  ];
  const navLinks = navs.map((nav) => {
    return (
      <Link className="NavBar__Link" to={nav.path} key={nav.id}>
        {nav.name}
      </Link>
    );
  });

  return <nav className="NavBar">{Boolean(loggedIn) && navLinks}</nav>;
}
