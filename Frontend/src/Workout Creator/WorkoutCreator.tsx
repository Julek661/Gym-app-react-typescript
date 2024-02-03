import React, { useContext } from "react";
import WorkoutForm from "./WorkoutForm";
import {
  GET_USER_WORKOUT_COMPONENTS,
  GET_WORKOUT_COMPONENTS,
} from "../Queries/Queries";
import { OperationVariables, useMutation, useQuery } from "@apollo/client";
import { DELETE_COMPONENT } from "../Mutations/Mutations";
import { UserContext } from "../App";

interface Exercise {
  component_id: string;
  repetitions: number;
  sets: number;
  name: string;
}
export interface GetExerciseData {
  exerciseComponentsUser: Exercise[];
}
interface GetUserWorkoutComponentsInput {
  user_id: string;
}

export default function WorkoutCreator() {
  const loggedIn = useContext<string>(UserContext);
  // sets form open state
  const [isFormOpen, setIsFormOpen] = React.useState<Boolean>(false);
  // gets gets user workout data
  const { data: exerciseData = { exerciseComponentsUser: [] }, refetch } = useQuery<
    GetExerciseData,
    GetUserWorkoutComponentsInput
  >(GET_USER_WORKOUT_COMPONENTS, {
    variables: { user_id: loggedIn },
  });
 
  // Delete Workout Component
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
  const exercisesTable = exerciseData?.exerciseComponentsUser.map(
    (exercise, index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            <td>{exercise.name}</td>
            <td>{exercise.sets}</td>
            <td>{exercise.repetitions}</td>
          </tr>
          <button
            id={(index + 1).toString()}
            onClick={() => {
              handleDeleteComponent(exercise.component_id);
            }}
          >
            Delete
          </button>
        </React.Fragment>
      );
    }
  );

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
