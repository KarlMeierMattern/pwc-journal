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
      conditions.push(gte(journalEntries.createdAt, new Date(from as string)));
    }
    if (to) {
      const toDate = new Date(to as string);
      toDate.setDate(toDate.getDate() + 1);
      conditions.push(lte(journalEntries.createdAt, toDate));
    }

    const entries = await db
      .select()
      .from(journalEntries)
      .where(and(...conditions));

    return entries;
  },
});
