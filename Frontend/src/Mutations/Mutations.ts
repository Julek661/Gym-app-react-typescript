import { gql } from "@apollo/client";
export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $first_name: String!
    $last_name: String!
  ) {
    createUser(
      email: $email
      password: $password
      first_name: $first_name
      last_name: $last_name
    ) {
      user_id
      email
      password
      first_name
      last_name
    }
  }
`;
export const CREATE_EXERCISE = gql`
  mutation CreateExercise(
    $name: String!
    $muscletrained: String!
    $user_id: String!
  ) {
    createExercise(
      name: $name
      muscletrained: $muscletrained
      user_id: $user_id
    ) {
      id
      name
      muscletrained
      user_id
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation DeleteExercise($id: ID!) {
    deleteExercise(id: $id)
  }
`;

export const DELETE_COMPONENT = gql`
  mutation DeleteComponent($component_id: ID!) {
    deleteComponent(component_id: $component_id)
  }
`;

export const CREATE_COMPONENT = gql`
  mutation CreateComponent($repetitions: Int!, $sets: Int!, $exercise_id: ID!) {
    createComponent(
      repetitions: $repetitions
      sets: $sets
      exercise_id: $exercise_id
    ) {
      component_id
      repetitions
      sets
      exercise_id
    }
  }
`;
