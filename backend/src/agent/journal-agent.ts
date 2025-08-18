import { Agent, tool } from "@openai/agents";
import { z } from "zod";
import { db } from "../config/database.js";
import { journalEntries } from "../db/schema/journal-entries.js";
import { and, eq, gte, lte } from "drizzle-orm";

const journalAgentSchema = z.object({
  summary: z
    .string()
    .describe("A comprehensive summary of the journal entries"),
  keyThemes: z.array(z.string()).describe("Main themes or topics discussed"),
  moodAnalysis: z.string().describe("Overall mood/emotional tone"),
  insights: z.array(z.string()).describe("Key insights or patterns identified"),
  entryCount: z.number().describe("Number of entries analyzed"),
  dateRange: z
    .object({
      from: z.string(),
      to: z.string(),
    })
    .describe("Date range of analyzed entries"),
});

export type JournalAgentOutput = z.infer<typeof journalAgentSchema>;

const journalAgentPrompt = `
You are a journal analysis assistant. Your task is to:

1. Use the getJournalEntries tool to fetch the user's journal entries
2. Analyze the entries thoroughly 
3. Return a structured analysis with these components:
   - summary: A comprehensive overview of the entries
   - keyThemes: Array of main topics/themes discussed
   - moodAnalysis: Overall emotional tone and mood
   - insights: Array of key patterns or insights discovered
   - entryCount: Total number of entries analyzed
   - dateRange: The actual date range of the entries found

Be thorough in your analysis and provide meaningful insights about the user's journaling patterns and emotional state.
`;

const journalAgentTool = tool({
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

export const journalAgent = new Agent({
  name: "JournalAgent",
  instructions: journalAgentPrompt,
  outputType: journalAgentSchema,
  modelSettings: { toolChoice: "required" },
  tools: [journalAgentTool],
  model: process.env.OPENAI_MODEL,
});
