import dotenv from "dotenv";
import path from "path";
import { drizzle } from "drizzle-orm/bun-sql";
import * as schema from "./schema";

dotenv.config({
  path: path.resolve(import.meta.dirname, "../../../.env"),
});

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

export const db = drizzle(databaseUrl, { schema });
