import React, { useState } from "react";
import {
  FieldValues,
  useForm,
} from "react-hook-form";
import { GET_EXERCISES } from "../Queries/Queries";
import { useQuery } from "@apollo/client";

interface ExerciseData {
  exercises: {
    id: string;
    name: string;
    muscletrained: string;
  }[];
}

export default function WorkoutForm() {
  const { data = { exercises: [] } } = useQuery<ExerciseData>(GET_EXERCISES);
  const [workout, setWorkout] = useState<FieldValues[]>([]);
  const { exercises } = data;
  const { register, handleSubmit } = useForm();

  const workoutTable = workout.map((workout) => {
    return (
      <tr>
        <td>{workout.Exercise}</td>
        <td>{workout.Sets}</td>
        <td>{workout.Repetitions}</td>
      </tr>
    );
  });

  const handleSubmitExercise = (data: FieldValues) => {
    const exerciseSelected = exercises.find((exercise) => exercise.name === data.Exercise);
    setWorkout([...workout, { ...data, exerciseID: exerciseSelected?.id }]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitExercise)}>
        <input
          {...register("Repetitions")}
          type="text"
          placeholder="Repetitions"
        />
        <input {...register("Sets")} type="text" placeholder="Sets" />

        <select {...register("Exercise", { required: true })}>
          {exercises?.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <input type="submit" />
      </form>
      {workoutTable.length > 0 && workoutTable}
    </>
  );
}
