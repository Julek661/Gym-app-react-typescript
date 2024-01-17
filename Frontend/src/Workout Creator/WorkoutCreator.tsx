import React from "react";
import WorkoutForm from "./WorkoutForm";

export default function WorkoutCreator() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setIsFormOpen(!isFormOpen);
        }}
      >
        Create Workout
      </button>
      {isFormOpen && <WorkoutForm />}
    </div>
  );
}
