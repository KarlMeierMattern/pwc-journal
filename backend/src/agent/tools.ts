import { tool } from "@openai/agents";
import { z } from "zod";
import { db } from "../config/database.js";
import { journalEntries } from "../db/schema/tables.js";
import { and, eq, gte, lte } from "drizzle-orm";

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
      .where(and(...conditions));

    return entries;
  },
});
