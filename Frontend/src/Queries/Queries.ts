import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user_id
    }
  }
`;

export const GET_EXERCISES = gql`
  query {
    exercises {
      id
      name
      muscletrained
    }
  }
`;

export const GET_USER_EXERCISES = gql`
  query UserExercises($user_id: String!) {
    userExercises(user_id: $user_id) {
      id
      name
      muscletrained
      user_id
    }
  }
`;

export const GET_WORKOUT_COMPONENTS = gql`
  query {
    exerciseComponents {
      component_id
      repetitions
      sets
      name
    }
  }
`;
export const GET_USER_WORKOUT_COMPONENTS = gql`
  query ExerciseComponentsUser($user_id: String!) {
    exerciseComponentsUser(user_id: $user_id) {
      component_id
      repetitions
      sets
      name
    }
  }
`;
export const GET_GOALS = gql`
  query {
    getGoals{
      goal_id
      goal
    }
  }
`;
