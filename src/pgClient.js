import { Client } from "pg";

const pgClient = new Client({
  connectionString: `${process.env.DATABASE_URL}?sslmode=require?ssl=true`,
  ssl: process.env.NODE_ENV !== "development",
});

pgClient.connect();

export default pgClient;
