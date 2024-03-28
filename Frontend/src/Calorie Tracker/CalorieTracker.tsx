import React from "react";
import { GET_GOALS } from "../Queries/Queries";
import { useGQLQuery } from "../Queries/queryHooks";

enum Goal {
  Lose = "Lose",
  Gain = "Gain",
  Maintain = "Maintain",
}

export default function CalorieTracker() {
  const { data: { getGoals: goals = [] } = {} } = useGQLQuery<{
    getGoals: { goal_id: string; goal: Goal }[];
  }>(GET_GOALS);

  return (
    <>
      <select>
        {goals.map((option) => (
          <option key={option.goal_id} value={option.goal}>
            {`${option.goal} Weight`}
          </option>
        ))}
      </select>
      <input type="number" placeholder="Weight in Kg" />
    </>
  );
}
