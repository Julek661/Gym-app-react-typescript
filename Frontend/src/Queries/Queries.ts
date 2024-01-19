import { gql } from "@apollo/client";

export const GET_EXERCISES = gql`
  query {
    exercises {
      id
      name
      muscletrained
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
