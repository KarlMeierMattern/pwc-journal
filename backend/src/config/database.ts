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

const pool = mysql.createPool({
  uri: process.env.DB_URL!,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// drizzle instance
export const db = drizzle(pool, {
  schema: { users, journalEntries, llmCache, professionalFramework },
  mode: "default",
});

// test db connection
export const testConnection = async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("✅ Database connected successfully");
    return rows;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};

// optional: keepalive ping
setInterval(async () => {
  try {
    await pool.query("SELECT 1");
  } catch (err) {
    console.error("MySQL keepalive failed:", err);
  }
}, 1000 * 60 * 5);

// const connection = await mysql.createConnection(process.env.DB_URL!);

// // Create Drizzle instance
// export const db = drizzle(connection, {
//   schema: { users, journalEntries, llmCache, professionalFramework },
//   mode: "default",
// });

// // Test database connection
// export const testConnection = async () => {
//   try {
//     const result = await connection.execute("SELECT 1");
//     console.log("✅ Database connected successfully");
//     return result;
//   } catch (error) {
//     console.error("❌ Database connection failed:", error);
//     throw error;
//   }
// };
