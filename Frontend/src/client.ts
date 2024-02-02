import { ApolloClient, InMemoryCache } from "@apollo/client";
import { persistCache } from "apollo3-cache-persist";

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage,
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default client;
