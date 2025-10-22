// Create database connection

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import {
  users,
  journalEntries,
  llmCache,
  professionalFramework,
} from "../db/schema/tables.js";
import dotenv from "dotenv";

dotenv.config();

const connection = await mysql.createConnection(process.env.DB_URL!);

// Create Drizzle instance
export const db = drizzle(connection, {
  schema: { users, journalEntries, llmCache, professionalFramework },
  mode: "default",
});

// Test database connection
export const testConnection = async () => {
  try {
    const result = await connection.execute("SELECT 1");
    console.log("✅ Database connected successfully");
    return result;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};
