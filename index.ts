import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefsWorkout } from "./Schema/schema";
import { resolvers } from "./Resolvers/resolversExercises";
import fetch from "node-fetch";

async function getFoodId(foodName) {
  const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&api_key=bmBHDYK3A8wNXfCgEgHV6xZKnCLPdsDvqLcQU5Cl`);
  const data: any = await response.json();
  return data.foods[0].fdcId; 
}

async function getFoodData(foodId) {
  const response = await fetch(`https://api.nal.usda.gov/fdc/v1/food/${foodId}?api_key=bmBHDYK3A8wNXfCgEgHV6xZKnCLPdsDvqLcQU5Cl`);
  const data = await response.json();
  console.log(data);
}

const main = async () => {
  const server = new ApolloServer({
    typeDefs: typeDefsWorkout,
    resolvers,
  });
  getFoodId("apple").then(getFoodData);
  console.log("Starting server");
  
  await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
};

main();
