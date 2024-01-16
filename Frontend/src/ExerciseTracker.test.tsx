import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ExerciseTracker from "./ExerciseTracker";
import React from "react";

jest.mock("@apollo/client", () => {
  const useQuery = jest.fn();
  const useMutation = jest.fn(() => [jest.fn(), {}]);
  const gql = jest.fn();

  return {
    useQuery: useQuery,
    useMutation: useMutation,
    gql: gql,
  };
});

describe("ExerciseTracker", () => {
  it("should render without error", () => {
    const { useQuery } = require("@apollo/client");
    useQuery.mockReturnValue({ loading: true });
    render(<ExerciseTracker />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render data when loaded", () => {
    const { useQuery } = require("@apollo/client");
    useQuery.mockReturnValue({
      loading: false,
      data: {
        exercises: [
          { id: "1", name: "Exercise 1" },
          { id: "2", name: "Exercise 2" },
        ],
      },
    });
    render(<ExerciseTracker />);
    expect(screen.getByText("Exercise 1")).toBeInTheDocument();
    expect(screen.getByText("Exercise 2")).toBeInTheDocument();
  });
  it("should call mutation when exercise is created", () => {
    const { useQuery, useMutation } = require("@apollo/client");
    const createExercise = jest.fn();
    useQuery.mockReturnValue({
      loading: false,
      data: {
        exercises: [
          { id: "1", name: "Exercise 1" },
          { id: "2", name: "Exercise 2" },
        ],
      },
    });
    useMutation.mockReturnValue([createExercise, {}]);
    render(<ExerciseTracker />);
    expect(screen.getByText("Exercise 1")).toBeInTheDocument();
    expect(screen.getByText("Exercise 2")).toBeInTheDocument();
    const createExerciseButton = screen.getByText("Create Exercise");
    expect(createExerciseButton).toBeInTheDocument();
    createExerciseButton.click();
    expect(createExercise).toHaveBeenCalled();
  });

  it("should call mutation when exercise is deleted", () => {
    const { useQuery, useMutation } = require("@apollo/client");
    const deleteExercise = jest.fn();
    useQuery.mockReturnValue({
      loading: false,
      data: {
        exercises: [
          { id: "1", name: "Exercise 1" },
          { id: "2", name: "Exercise 2" },
        ],
      },
    });
    useMutation.mockReturnValue([deleteExercise, {}]);
    render(<ExerciseTracker />);
    expect(screen.getByText("Exercise 1")).toBeInTheDocument();
    expect(screen.getByText("Exercise 2")).toBeInTheDocument();
    const deleteExerciseButton = screen.getByText("Delete Exercise");
    expect(deleteExerciseButton).toBeInTheDocument();
    deleteExerciseButton.click();
    expect(deleteExercise).toHaveBeenCalled();
  });
});
