export const typeDefs = `#graphql

type exercise {
    id: ID!
    name: String!
    muscletrained: String
  }

  type component {
  id: ID!
  repetitions: Int!
  sets: Int!
  exercise_id: ID!
 }

  type Query {
    exercises: [exercise!]!
    exercise(id: ID!): exercise
  }

  type Mutation {
    createExercise(name: String!, muscletrained: String!): exercise!
    deleteExercise(id: ID!): ID
    createComponent(repetitions: Int!, sets: Int!, exercise_id: ID!): component!
  }

`;
