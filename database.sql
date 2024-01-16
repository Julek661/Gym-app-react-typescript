CREATE DATABASE gym_app;

CREATE TABLE exercise (
  id serial PRIMARY KEY,
  name VARCHAR (255) NOT NULL,
  muscleTrained VARCHAR (255) NOT NULL
);
