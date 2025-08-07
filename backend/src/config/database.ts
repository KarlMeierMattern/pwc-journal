// Create database connection

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../db/schema";
import dotenv from "dotenv";

dotenv.config();

// Create MySQL connection pool
const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create Drizzle instance
export const db = drizzle(connection, { schema, mode: "default" });

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
