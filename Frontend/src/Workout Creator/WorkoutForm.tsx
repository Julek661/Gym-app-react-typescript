import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { GET_EXERCISES } from "../Queries/Queries";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMPONENT } from "../Mutations/Mutations";

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

  const [createComponent] = useMutation(CREATE_COMPONENT);

  const handleCreateComponent = async (e: any) => {
    e.preventDefault();
    try {
      const { data = [] } = await createComponent({
        variables: {
          workout,
        },
      });

      console.log("Mutation response:", data);

      if (data && data.createComponent) {
        console.log("Created component:", data.createComponent);
      } else {
        console.error("Failed to create component. No data returned.");
      }
    } catch (error: any) {
      console.error("Error creating component:", error.message);
    }
  };

  const handleSubmitExercise = ({
    Sets,
    Repetitions,
    Exercise,
  }: FieldValues) => {
    const exerciseSelected = exercises.find(
      (exercise) => exercise.name === Exercise
    );
    const sets = Number(Sets);
    const repetitions = Number(Repetitions);

    setWorkout([
      ...workout,
      { sets, repetitions, exerciseID: exerciseSelected?.id },
    ]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitExercise)}>
        <input
          {...register("Repetitions")}
          type="number"
          placeholder="Repetitions"
        />
        <input {...register("Sets")} type="number" placeholder="Sets" />

        <select {...register("Exercise", { required: true })}>
          {exercises?.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <input type="submit" />
      </form>
    </>
  );
}
