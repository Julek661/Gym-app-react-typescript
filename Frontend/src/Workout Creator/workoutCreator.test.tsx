import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import WorkoutCreator from "./WorkoutCreator";

jest.mock("@apollo/client", () => {
  const useQuery = jest.fn();
  const gql = jest.fn();
  return {
    useQuery: useQuery,
    gql: gql,
  };
});

describe("Workout Creator", () => {
  it("should render data when loaded", () => {
    const data = [
      { id: "1", name: "name1", repetitions: "14", sets: "2" },
      { id: "2", name: "name2", repetitions: "8", sets: "3" },
    ];
    const { useQuery } = require("@apollo/client");
    useQuery.mockReturnValue({
      loading: false,
      data: {
        exerciseComponents: data,
      },
    });
    render(<WorkoutCreator />);
    data.forEach((exercise) => {
      expect(screen.getByText(exercise.name)).toBeInTheDocument();
      expect(screen.getByText(exercise.repetitions)).toBeInTheDocument();
      expect(screen.getByText(exercise.sets)).toBeInTheDocument();
    });
  });
});
