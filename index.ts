import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import pool from "./db";

const resolvers = {
  Query: {
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
  },
  Mutation: {
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
