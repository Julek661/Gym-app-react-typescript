import React, { useContext, useState } from "react";
import { GET_USER_EXERCISES } from "./Queries/Queries";
import { CREATE_EXERCISE, DELETE_EXERCISE } from "./Mutations/Mutations";
import { useQuery } from "@apollo/client";
import { UserContext } from "./App";
import { useGQLMutation } from "./Mutations/Hooks/mutationsHooks";
interface ExerciseInput {
  user_id: string;
  name: string;
  muscletrained: string;
}
interface ExerciseOutput {
  data: {
    id: string;
    name: string;
    muscletrained: string;
    user_id: string;
  };
}
function ExerciseTracker() {
  const loggedIn = useContext(UserContext);
  const [newExerciseName, setNewExerciseName] = useState<string>("");
  const [newMuscleTrained, setNewMuscleTrained] = useState<string>("");

  const {
    loading,
    error,
    data = [],
  } = useQuery(GET_USER_EXERCISES, { variables: { user_id: loggedIn } });

  const { executeMutation: deleteExercise } = useGQLMutation(DELETE_EXERCISE, {
    refetchQueries: [
      { query: GET_USER_EXERCISES, variables: { user_id: loggedIn } },
    ],
  });
  const { executeMutation: createExercise } = useGQLMutation<
    ExerciseOutput,
    ExerciseInput
  >(CREATE_EXERCISE, {
    refetchQueries: [
      { query: GET_USER_EXERCISES, variables: { user_id: loggedIn } },
    ],
  });

  const handleCreateExercise = () => {
    createExercise({
      name: newExerciseName,
      muscletrained: newMuscleTrained,
      user_id: loggedIn,
    });
  };

  const handleDeleteExercise = async (id: string) => {
    await deleteExercise({
      id,
    });
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
