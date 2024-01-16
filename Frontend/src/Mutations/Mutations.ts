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

