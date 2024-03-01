import React from "react";

export default function CalorieTracker() {
  const goalSelector: Readonly<{ label: string; value: string }>[] = [
    { value: "Lose", label: "Lose Weight" },
    { value: "Gain", label: "Gain Weight" },
    { value: "Maintain", label: "Maintain Weight" },
  ];
  return (
    <>
      <select>
        {goalSelector?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <input type="number" placeholder="Weight in Kg" />
    </>
  );
}
