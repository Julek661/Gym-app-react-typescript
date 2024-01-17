import { Link } from "react-router-dom";
import React from "react";

export default function Navbar() {
  return <nav>
    <Link to="/">Home</Link>
    <Link to="/exercise">Exercise Tracker</Link>
    <Link to="/workout">Workouts</Link>
  </nav>;
}
