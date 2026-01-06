// run in /backend
// npx tsx src/db/schema/seed-grade-expectations.ts

import dotenv from "dotenv";
dotenv.config();
console.log("DB URL in seed script:", process.env.DB_URL);

import { db } from "../../config/database";
import { dealsGradeExpectationsData } from "./deals-grade-expectations-data";
import { gradeExpectations } from "./tables";

export const seedGradeExpectations = async () => {
  console.log("🔍 Environment check:");
  console.log("  DB_URL:", process.env.DB_URL ? "✅ Set" : "❌ Missing");
  console.log("  DB_HOST:", process.env.DB_HOST || "N/A");
  console.log("  DB_PORT:", process.env.DB_PORT || "N/A");
  console.log("  DB_USER:", process.env.DB_USER || "N/A");
  console.log("  DB_NAME:", process.env.DB_NAME || "N/A");

  try {
    const rows = dealsGradeExpectationsData.map((item) => ({
      grade: item.grade,
      expectation: JSON.stringify(item.expectation),
    }));

    console.log(
      `\n📊 Preparing to seed ${rows.length} grade expectation entries...`
    );

    // Check current count
    const beforeCount = await db.select().from(gradeExpectations);
    console.log(`  Current entries in DB: ${beforeCount.length}`);

    // Clear and insert
    await db.delete(gradeExpectations).execute();
    console.log("✅ Cleared existing entries");

    await db.insert(gradeExpectations).values(rows);
    console.log(
      `✅ Successfully inserted ${rows.length} grade expectation entries`
    );

    // Verify insertion
    const afterCount = await db.select().from(gradeExpectations);
    console.log(`✅ Verification: ${afterCount.length} entries now in DB`);

    if (afterCount.length !== rows.length) {
      console.warn(
        `⚠️  WARNING: Expected ${rows.length} entries, found ${afterCount.length}`
      );
    }
  } catch (error) {
    console.error(
      "❌ Unsuccessful db insertion of grade expectations data",
      error
    );
    throw error;
  }
};

(async () => {
  await seedGradeExpectations();
  process.exit(0);
})();
