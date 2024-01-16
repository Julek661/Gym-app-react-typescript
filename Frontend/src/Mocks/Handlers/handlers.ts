// @ts-nocheck

import { graphql } from "msw";

export const handlers = [
  graphql.mutation("CreateExercise", (_req, res, ctx) => {
    return res(
      ctx.data({
        createExercise: {
          id: "3",
          name: "New Exercise",
          muscletrained: "New Muscle",
        },
      })
    );
  }),
];


