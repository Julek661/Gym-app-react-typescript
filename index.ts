import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import pool from "./db";

const resolvers = {
  Query: {
    login: async (_, { email, password }) => {
      try {
        const result = await pool.query(
          "SELECT * FROM users WHERE email = $1 AND password = $2",
          [email, password]
        );
        return result.rows[0];
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Unable to fetch user");
      }
    },
    exercises: async () => {
      try {
        const result = await pool.query("SELECT * FROM exercise");
        return result.rows;
      } catch (error) {
        console.error("Error fetching exercises:", error);
        throw new Error("Unable to fetch exercises");
      }
    },
    exercise: async (_, { id }) => {
      try {
        const result = await pool.query(
          "SELECT * FROM exercise WHERE id = $1",
          [id]
        );
        return result.rows[0];
      } catch (error) {
        console.error("Error fetching exercise:", error);
        throw new Error("Unable to fetch exercise");
      }
    },
    exerciseComponents: async () => {
      try {
        const result = await pool.query(
          "SELECT workout_component.*, exercise.name FROM workout_component INNER JOIN exercise ON exercise.id = workout_component.exercise_id"
        );
        return result.rows;
      } catch (error) {
        console.error("Error fetching exercise components:", error);
        throw new Error("Unable to fetch exercise components");
      }
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { email, password, first_name, last_name }: any
    ) => {
      try {
        const result = await pool.query(
          "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
          [email, password, first_name, last_name]
        );
        return result.rows[0];
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Unable to create user");
      }
    },
    deleteComponent: async (_: any, { component_id }: any) => {
      try {
        const result = await pool.query(
          "DELETE FROM workout_component WHERE component_id = $1 RETURNING component_id",
          [component_id]
        );

        return result.rows[0] ? result.rows[0].component_id : null;
      } catch (error) {
        console.error("Error deleting component:", error);
        throw new Error("Unable to delete component");
      }
    },
    createExercise: async (_: any, { name, muscletrained }: any) => {
      try {
        const result = await pool.query(
          "INSERT INTO exercise (name, muscletrained) VALUES ($1, $2) RETURNING *",
          [name, muscletrained]
        );
        return result.rows[0];
      } catch (error) {
        console.error("Error creating exercise:", error);
        throw new Error("Unable to create exercise");
      }
    },
    deleteExercise: async (_: any, { id }: any) => {
      try {
        const result = await pool.query(
          "DELETE FROM exercise WHERE id = $1 RETURNING id",
          [id]
        );

        return result.rows[0] ? result.rows[0].id : null;
      } catch (error) {
        console.error("Error deleting exercise:", error);
        throw new Error("Unable to delete exercise");
      }
    },
  },
};

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  console.log("Starting server");
  await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
};

main();
