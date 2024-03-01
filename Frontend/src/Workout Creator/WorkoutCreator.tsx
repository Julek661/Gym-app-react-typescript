import React, { useContext } from "react";
import WorkoutForm from "./WorkoutForm";
import { GET_USER_WORKOUT_COMPONENTS } from "../Queries/Queries";
import { useQuery } from "@apollo/client";
import { DELETE_COMPONENT } from "../Mutations/Mutations";
import { UserContext } from "../App";
import { useGQLMutation } from "../Mutations/Hooks/mutationsHooks";

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
  const [isFormOpen, setIsFormOpen] = React.useState<boolean>(false);
  // gets gets user workout data
  const { data: exerciseData = { exerciseComponentsUser: [] }, refetch } =
    useQuery<GetExerciseData, GetUserWorkoutComponentsInput>(
      GET_USER_WORKOUT_COMPONENTS,
      {
        variables: { user_id: loggedIn },
      }
    );

  const { executeMutation } = useGQLMutation<null, { component_id: string }>(
    DELETE_COMPONENT,
    {
      refetchQueries: [
        {
          query: GET_USER_WORKOUT_COMPONENTS,
          variables: { user_id: loggedIn },
        },
      ],
    }
  );

  const handleDeleteComponent = async (component_id: string) => {
    await executeMutation({ component_id });
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
