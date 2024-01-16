export const typeDefs = `#graphql

type exercise {
    id: ID!
    name: String!
    muscletrained: String
  }

  type Query {
    exercises: [exercise!]!
    exercise(id: ID!): exercise
  }

  type Mutation {
    createExercise(name: String!, muscletrained: String!): exercise!
    deleteExercise(id: ID!): ID
  }

`;
