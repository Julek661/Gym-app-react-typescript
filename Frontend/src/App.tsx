import React from "react";
import { Link} from "@tanstack/react-router";

const App = () => {
  return (
    <>
      <h1>Welcome to Gym App</h1>
      <h2>Choose a page to navigate to:</h2>
      <button>
        <Link to={"/exercise"}>Exercise tracker</Link>
      </button>
    </>
  );
};

export default App;
