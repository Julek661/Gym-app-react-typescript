import React from "react";
import WorkoutForm from "./WorkoutForm";
import { GET_EXERCISES, GET_WORKOUT_COMPONENTS } from "../Queries/Queries";
import { useQuery } from "@apollo/client";

export default function WorkoutCreator() {
  const [isFormOpen, setIsFormOpen] = React.useState(false);

  const {
    loading,
    error,
    data = [],
    refetch,
  } = useQuery(GET_WORKOUT_COMPONENTS);

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
