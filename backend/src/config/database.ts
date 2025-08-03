import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../db/schema";

// Create MySQL connection
const connection = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "journal_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create Drizzle instance
export const db = drizzle(connection, { schema });

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

export default db;
