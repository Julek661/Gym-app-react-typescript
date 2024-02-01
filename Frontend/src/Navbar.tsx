import { Link } from "react-router-dom";
import React from "react";
import "./Navbar.scss";
import { UserContext } from "./App";

export default function Navbar() {
  const loggedIn = React.useContext(UserContext);

  const navs = [
    { name: "Home", path: "/" },
    { name: "Exercise Tracker", path: "/exercise" },
    { name: "Workouts", path: "/workout" },
  ];
  const navLinks = navs.map((nav) => {
    return (
      <Link className="NavBar__Link" to={nav.path}>
        {nav.name}
      </Link>
    );
  });

  return <nav className="NavBar">{Boolean(loggedIn) && navLinks}</nav>;
}
