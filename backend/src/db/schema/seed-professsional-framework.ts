// run in /backend
// npx tsx src/db/schema/seed-professsional-framework.ts

import dotenv from "dotenv";
dotenv.config();
console.log("DB URL in seed script:", process.env.DB_URL);

import { db } from "../../config/database";
import { professionalFrameworkData } from "./professional-framework-data";
import { professionalFramework } from "./tables";

export const seedProfessionalFramework = async () => {
  console.log("🔍 Environment check:");
  console.log("  DB_URL:", process.env.DB_URL ? "✅ Set" : "❌ Missing");
  console.log("  DB_HOST:", process.env.DB_HOST || "N/A");
  console.log("  DB_PORT:", process.env.DB_PORT || "N/A");
  console.log("  DB_USER:", process.env.DB_USER || "N/A");
  console.log("  DB_NAME:", process.env.DB_NAME || "N/A");

  try {
    const rows = professionalFrameworkData.map((item) => ({
      topic: item.topic!,
      goal: item.goal!,
      description: item.description!,
      behaviours: item.behaviours!,
    }));

    console.log(`\n📊 Preparing to seed ${rows.length} framework entries...`);

    // Check current count
    const beforeCount = await db.select().from(professionalFramework);
    console.log(`  Current entries in DB: ${beforeCount.length}`);

    // Clear and insert
    await db.delete(professionalFramework).execute();
    console.log("✅ Cleared existing entries");

    await db.insert(professionalFramework).values(rows);
    console.log(`✅ Successfully inserted ${rows.length} framework entries`);

    // Verify insertion
    const afterCount = await db.select().from(professionalFramework);
    console.log(`✅ Verification: ${afterCount.length} entries now in DB`);

    if (afterCount.length !== rows.length) {
      console.warn(
        `⚠️  WARNING: Expected ${rows.length} entries, found ${afterCount.length}`
      );
    }
  } catch (error) {
    console.error(
      "❌ Unsuccessful db insertion of professional framework data",
      error
    );
    throw error;
  }
};

(async () => {
  await seedProfessionalFramework();
  process.exit(0);
})();
