import React, { MouseEventHandler, useContext, useState } from "react";
import { GET_EXERCISES, GET_USER_EXERCISES } from "./Queries/Queries";
import { CREATE_EXERCISE, DELETE_EXERCISE } from "./Mutations/Mutations";
import { useQuery, useMutation } from "@apollo/client";
import { UserContext } from "./App";

function ExerciseTracker() {
  const loggedIn = useContext(UserContext);
  const [newExerciseName, setNewExerciseName] = useState<string>("");
  const [newMuscleTrained, setNewMuscleTrained] = useState<string>("");

  const {
    loading,
    error,
    data = [],
    refetch,
  } = useQuery(GET_USER_EXERCISES, { variables: { user_id: loggedIn } });

  const [createExercise] = useMutation(CREATE_EXERCISE);
  const [deleteExercise] = useMutation(DELETE_EXERCISE);

  const handleCreateExercise = async () => {
    try {
      const { data = [] } = await createExercise({
        variables: {
          name: newExerciseName,
          muscletrained: newMuscleTrained,
          user_id: loggedIn,
        },
      });

      console.log("Mutation response:", data);

      if (data && data.createExercise) {
        console.log("Created exercise:", data.createExercise);
        refetch();
        setNewExerciseName("");
        setNewMuscleTrained("");
      } else {
        console.error("Failed to create exercise. No data returned.");
      }
    } catch (error: any) {
      console.error("Error creating exercise:", error.message);
    }
  };

  const handleDeleteExercise = async (id: string) => {
    try {
      const { data } = await deleteExercise({
        variables: {
          id,
        },
      });

      console.log("Mutation response:", data);

      if (data && data.deleteExercise) {
        console.log("Deleted exercise with ID:", data.deleteExercise);
        refetch();
      } else {
        console.error("Failed to delete exercise. No data returned.");
      }
    } catch (error: any) {
      console.error("Error deleting exercise:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Exercise Library</h1>

      <div>
        <h2>Create a New Exercise</h2>
        <label>
          Name:
          <input
            placeholder="Exercise Name"
            className="exerciseInput"
            aria-label="exerciseInput"
            type="text"
            value={newExerciseName}
            onChange={(e) => {
              setNewExerciseName(e.target.value);
            }}
          />
        </label>
        <label>
          Muscle Trained:
          <input
            placeholder="Muscle Trained"
            className="muscleInput"
            aria-label="muscleInput"
            type="text"
            value={newMuscleTrained}
            onChange={(e) => setNewMuscleTrained(e.target.value)}
          />
        </label>
        <button onClick={handleCreateExercise}>Create Exercise</button>
      </div>

      <h2>Exercises</h2>
      {data?.userExercises.map((exercise: any) => (
        <div key={exercise.id}>
          <h3>{exercise.name}</h3>
          <p>Muscle Trained: {exercise.muscletrained}</p>
          <button onClick={() => handleDeleteExercise(exercise.id)}>
            Delete Exercise
          </button>
        </div>
      ))}
    </div>
  );
}

export default ExerciseTracker;
