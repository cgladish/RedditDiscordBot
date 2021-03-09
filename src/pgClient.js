import { Client } from "pg";

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV !== "development",
});

pgClient.connect();

export default pgClient;
