import { Agent } from "@openai/agents";
import { z } from "zod";
import { professionalGradeExpectationsPrompt } from "./professional-grade-expectations.js";
import { journalAgentTool, professionalFrameworkTool } from "./tools.js";

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

export const journalAgent = new Agent({
  name: "JournalAgent",
  instructions: professionalGradeExpectationsPrompt,
  outputType: journalAgentSchema,
  modelSettings: { toolChoice: "required" },
  tools: [professionalFrameworkTool, journalAgentTool],
  model: process.env.OPENAI_MODEL,
});
