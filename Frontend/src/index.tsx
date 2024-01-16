import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./client";
import App from "./App";
import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from "@tanstack/react-router";
import ExerciseTracker from "./ExerciseTracker";

const RootRouter = new RootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

const landingPageRoute = new Route({
  getParentRoute: () => RootRouter,
  path: "/",
  component: () => <App />,
});

const exerciseTrackerRoute = new Route({
  getParentRoute: () => RootRouter,
  path: "/exercise",
  component: () => <ExerciseTracker />,
});

const routeTree = RootRouter.addChildren([
  landingPageRoute,
  exerciseTrackerRoute,
]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Router {
    router: typeof router;
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>,
  document.getElementById("root")
);
