import React from "react";
import WorkoutForm from "./WorkoutForm";
import { GET_WORKOUT_COMPONENTS } from "../Queries/Queries";
import { OperationVariables, useMutation, useQuery } from "@apollo/client";
import { DELETE_COMPONENT } from "../Mutations/Mutations";

interface Exercise {
  component_id: string;
  repetitions: number;
  sets: number;
  name: string;
}
export interface GetExerciseData {
  exerciseComponents: Exercise[];
}

export default function WorkoutCreator() {
  const [isFormOpen, setIsFormOpen] = React.useState<Boolean>(false);
  const { data: exerciseData = { exerciseComponents: [] }, refetch } = useQuery<
    GetExerciseData,
    OperationVariables
  >(GET_WORKOUT_COMPONENTS);

  const [deleteComponent] = useMutation(DELETE_COMPONENT);

  const handleDeleteComponent = async (component_id: string) => {
    try {
      const { data } = await deleteComponent({
        variables: {
          component_id,
        },
      });
      if (data && data.deleteComponent) {
        refetch();
      }
    } catch (error: any) {
      console.error("Error deleting component:", error.message);
    }
  };
  const exercisesTable = exerciseData?.exerciseComponents.map((exercise, index) => {
    return (
      <React.Fragment key={index}>

        <tr>
          <td>{exercise.name}</td>
          <td>{exercise.sets}</td>
          <td>{exercise.repetitions}</td>
        </tr>
        <button
          onClick={() => {
            handleDeleteComponent(exercise.component_id);
          }}
        >
          Delete
        </button>
      </React.Fragment>
    );
  });

  return (
    <div>
      <button
        onClick={() => {
          setIsFormOpen(!isFormOpen);
        }}
      >
        Create Workout
      </button>
      {isFormOpen && <WorkoutForm refetch={refetch} />}
      <table>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Sets</th>
            <th>Repetitions</th>
          </tr>
        </thead>
        <tbody>{exercisesTable}</tbody>
      </table>
    </div>
  );
}
