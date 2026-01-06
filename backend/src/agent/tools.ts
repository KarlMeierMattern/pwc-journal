import { tool } from "@openai/agents";
import { z } from "zod";
import { db } from "../config/database.js";
import { journalEntries, professionalFramework } from "../db/schema/tables.js";
import { and, eq, gte, lte, asc } from "drizzle-orm";

export const journalAgentTool = tool({
  name: "getJournalEntries",
  description: "Get journal entries for analysis within a date range",
  parameters: z.object({
    userId: z.number().describe("User ID to get entries for"),
    from: z.string().nullable().describe("Start date (YYYY-MM-DD)"),
    to: z.string().nullable().describe("End date (YYYY-MM-DD)"),
  }),
  strict: true,
  execute: async ({ userId, from, to }) => {
    const conditions = [eq(journalEntries.userId, userId)];

    if (from) {
      const formattedFrom = new Date(from);
      formattedFrom.setHours(0, 0, 0, 0);
      conditions.push(gte(journalEntries.date, formattedFrom));
    }

    if (to) {
      const formattedTo = new Date(to);
      conditions.push(lte(journalEntries.date, formattedTo));
    }

    const entries = await db
      .select()
      .from(journalEntries)
      .where(and(...conditions))
      .orderBy(asc(journalEntries.date));

    return entries;
  },
});

export const professionalFrameworkTool = tool({
  name: "getProfessionalFramework",
  description: "Get the professional framework from the database",
  parameters: z.object({}),
  strict: true,
  execute: async () => {
    console.log(
      "[professionalFrameworkTool] Fetching framework data from DB..."
    );
    const entries = await db
      .select()
      .from(professionalFramework)
      .orderBy(asc(professionalFramework.id));

    console.log(
      `[professionalFrameworkTool] Found ${entries.length} framework entries`
    );
    if (entries.length === 0) {
      console.warn(
        "[professionalFrameworkTool] ⚠️ WARNING: Framework table is empty!"
      );
    } else {
      console.log("[professionalFrameworkTool] Sample entry:", entries[0]);
    }

    return entries;
  },
});
