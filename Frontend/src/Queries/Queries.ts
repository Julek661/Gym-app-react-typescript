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