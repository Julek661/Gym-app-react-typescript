CREATE DATABASE gym_app;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  email VARCHAR (255) UNIQUE NOT NULL,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL,
);

CREATE TABLE exercise (
  id serial PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  muscleTrained VARCHAR (255) NOT NULL
  user_id VARCHAR (255) REFERENCES users(user_id)
);

CREATE TABLE workout_component (
  component_id serial PRIMARY KEY,
  repetitions INT NOT NULL,
  sets INT NOT NULL,
  exercise_id INT REFERENCES exercise(id)
);

CREATE TABLE goals (
  goal_id serial PRIMARY KEY,
  goal VARCHAR (255) NOT NULL,
);

CREATE TABLE calories (
  calories_id serial PRIMARY KEY,
  calories INT NOT NULL,
  user_id INT REFERENCES users(user_id)
  goal_id INT REFERENCES goals(goal_id)
  date_created DATE NOT NULL
);
```