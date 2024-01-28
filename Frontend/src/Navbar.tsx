import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav className="NavBar">
      <Link className="NavBar__Link" to="/">
        Home
      </Link>
      <Link className="NavBar__Link" to="/login">
        Login
      </Link>
      <Link className="NavBar__Link" to="/exercise">
        Exercise Tracker
      </Link>
      <Link className="NavBar__Link" to="/workout">
        Workouts
      </Link>
    </nav>
  );
}
