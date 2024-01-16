import * as pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "gym_app",
  password: "pass",
  port: 5432,
});

export default pool;
