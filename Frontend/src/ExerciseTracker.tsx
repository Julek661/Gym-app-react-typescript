import React, { useState } from "react";
import { GET_EXERCISES } from "./Queries/Queries";
import { CREATE_EXERCISE, DELETE_EXERCISE } from "./Mutations/Mutations";
import { useQuery, useMutation } from "@apollo/client";

function ExerciseTracker() {
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newMuscleTrained, setNewMuscleTrained] = useState("");

  const { loading, error, data = [], refetch } = useQuery(GET_EXERCISES);

  const [createExercise] = useMutation(CREATE_EXERCISE);
  const [deleteExercise] = useMutation(DELETE_EXERCISE);

  const handleCreateExercise = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await createExercise({
        variables: {
          name: newExerciseName,
          muscletrained: newMuscleTrained,
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
      <h1>Exercise App</h1>

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
      {data.exercises.map((exercise: any) => (
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
