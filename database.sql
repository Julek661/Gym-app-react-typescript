CREATE DATABASE gym_app;

CREATE TABLE exercise (
  id serial PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  muscleTrained VARCHAR (255) NOT NULL
);

CREATE TABLE workout_component (
  component_id serial PRIMARY KEY,
  repetitions INT NOT NULL,
  sets INT NOT NULL,
  exercise_id INT REFERENCES exercise(id)
);