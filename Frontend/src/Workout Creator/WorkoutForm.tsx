import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { GET_USER_EXERCISES } from "../Queries/Queries";
import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { CREATE_COMPONENT_USER } from "../Mutations/Mutations";
import { GetExerciseData } from "./WorkoutCreator";
import { UserContext } from "../App";

interface ExerciseData {
  userExercises: {
    id: string;
    name: string;
    muscletrained: string;
    user_id: string;
  }[];
}
interface workoutFormProps {
  refetch: () => Promise<ApolloQueryResult<GetExerciseData>>;
}
interface UserId {
  user_id: string;
}

interface CreateComponentData {
  createComponentUser: {
    id: string;
    repetitions: number;
    sets: number;
    user_id: string;
    exercise_id: string;
  };
}

interface CreateComponentVariables {
  repetitions: number;
  exercise_id: string;
  sets: number;
  user_id: string;
}

export default function WorkoutForm({ refetch }: Readonly<workoutFormProps>) {
  const loggedIn = React.useContext<string>(UserContext);
  const { data = { userExercises: [] } } = useQuery<ExerciseData, UserId>(
    GET_USER_EXERCISES,
    { variables: { user_id: loggedIn } }
  );
  const { userExercises } = data;
  const { register, handleSubmit } = useForm();

  const [createComponent] = useMutation<
    CreateComponentData,
    CreateComponentVariables
  >(CREATE_COMPONENT_USER);

  console.log("userExercises", userExercises);

  const handleSubmitExercise = ({
    Sets,
    Repetitions,
    Exercise,
  }: FieldValues) => {
    const exerciseSelected = userExercises.find(
      (userExercises) => userExercises.name === Exercise
    );
    const sets = Number(Sets);
    const repetitions = Number(Repetitions);

    const newWorkout = { sets, repetitions, exerciseID: exerciseSelected?.id };

    handleCreateComponent(newWorkout);
  };

  const handleCreateComponent = async (workout: FieldValues) => {
    const { sets, repetitions, exerciseID } = workout;
    try {
      const response = await createComponent({
        variables: {
          repetitions: repetitions,
          exercise_id: exerciseID,
          sets: sets,
          user_id: loggedIn,
        },
      });

      const data = response.data ?? undefined;

      if (data?.createComponentUser) {
        console.log("Created component:", data.createComponentUser);
        refetch();
      } else {
        console.error("Failed to create component. No data returned.");
      }
    } catch (error: any) {
      console.error("Error creating component:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitExercise)}>
        <input
          {...register("Repetitions")}
          type="number"
          placeholder="Repetitions"
        />
        <input {...register("Sets")} type="number" placeholder="Sets" />

        <select {...register("Exercise", { required: true })}>
          {userExercises?.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <input type="submit" />
      </form>
  );
}
