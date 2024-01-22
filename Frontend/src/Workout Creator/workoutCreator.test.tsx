import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import WorkoutCreator from "./WorkoutCreator";
import userEvent from "@testing-library/user-event";

jest.mock("@apollo/client", () => {
  const useQuery = jest.fn();
  const useMutation = jest.fn(() => [jest.fn(), {}]);
  //When the mock useMutation is called, it returns an array with two elements: another mock function and an empty object. This mirrors the real useMutation hook, which returns an array with a mutate function and an object containing the mutation result.
  const gql = jest.fn();

  return {
    useQuery: useQuery,
    useMutation: useMutation,
    gql: gql,
  };
});

describe("Workout Creator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
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
  it("should call mutation when component is deleted", async () => {
    const { useQuery, useMutation } = require("@apollo/client");
    const deleteComponent = jest.fn();
    useQuery.mockReturnValue({
      loading: false,
      data: {
        exerciseComponents: [
          { component_id: "1", name: "name1", repetitions: "14", sets: "2" },
        ],
      },
    });
    useMutation.mockReturnValue([deleteComponent, {}]);
    render(<WorkoutCreator />);
    const deleteButton = screen.getByText("Delete");

    userEvent.click(deleteButton);
    expect(deleteComponent).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(deleteComponent).toHaveBeenCalledWith({
        variables: { component_id: "1" },
      });
    });
  });
});
