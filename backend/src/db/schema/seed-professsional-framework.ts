// run in /backend
// npx tsx src/db/schema/seed-professsional-framework.ts

import dotenv from "dotenv";
dotenv.config();
console.log("DB URL in seed script:", process.env.DB_URL);

import { db } from "../../config/database";
import { professionalFrameworkData } from "./professional-framework-data";
import { professionalFramework } from "./tables";

export const seedProfessionalFramework = async () => {
  console.log("✅ DB host set", process.env.DB_HOST);
  console.log("✅ DB port set", process.env.DB_PORT);
  console.log("✅ DB host", process.env.DB_USER);
  console.log("✅ DB name", process.env.DB_NAME);

  try {
    const rows = professionalFrameworkData.map((item) => ({
      topic: item.topic!,
      goal: item.goal!,
      description: item.description!,
      behaviours: item.behaviours!,
    }));

    await db.delete(professionalFramework).execute();
    console.log("✅ Successfully delete DB table");
    await db.insert(professionalFramework).values(rows);
    console.log("✅ Successfully inserted professional framework data");
  } catch (error) {
    console.error(
      "❌ Unsuccessful db insertion of professional framework data",
      error
    );
  }
};

(async () => {
  await seedProfessionalFramework();
  process.exit(0);
})();
