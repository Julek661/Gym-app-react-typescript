export const typeDefs = `#graphql

type exercise {
    id: ID!
    name: String!
    muscletrained: String
    user_id: String!
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
type User{
  user_id: ID!
  email: String!
  password: String!
  first_name: String!
  last_name: String!
}

  type Query {
    exerciseComponents: [WorkoutComponent!]!
    userExercises(user_id: String!): [exercise]!
    exercises: [exercise!]!
    exercise(id: ID!): exercise
    login(email: String!, password: String!): User
  }

  type Mutation {
    createUser(email: String!, password: String!, first_name: String!, last_name: String!): User!
    createExercise(name: String!, muscletrained: String!, user_id: String!): exercise!
    deleteExercise(id: ID!): ID
    deleteComponent(component_id: ID!): ID
    createComponent(repetitions: Int!, sets: Int!, exercise_id: ID!): component!
  }

`;
