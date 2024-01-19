export const typeDefs = `#graphql

type exercise {
    id: ID!
    name: String!
    muscletrained: String
  }

  type component {
  component_id: ID!
  repetitions: Int!
  sets: Int!
  exercise_id: ID!
 }

 type WorkoutComponent {
  component_id: ID!
  repetitions: Int!
  sets: Int!
  name: String!
}

  type Query {
    exerciseComponents: [WorkoutComponent!]!
    exercises: [exercise!]!
    exercise(id: ID!): exercise
  }

  type Mutation {
    createExercise(name: String!, muscletrained: String!): exercise!
    deleteExercise(id: ID!): ID
    createComponent(repetitions: Int!, sets: Int!, exercise_id: ID!): component!
  }

`;
