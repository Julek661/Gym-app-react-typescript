import { gql } from "@apollo/client";

export const CREATE_EXERCISE = gql`
  mutation CreateExercise($name: String!, $muscletrained: String!) {
    createExercise(name: $name, muscletrained: $muscletrained) {
      id
      name
      muscletrained
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation DeleteExercise($id: ID!) {
    deleteExercise(id: $id)
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
