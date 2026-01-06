import { Agent } from "@openai/agents";
import { z } from "zod";
import { professionalGradeExpectationsPrompt } from "./professional-grade-expectations.js";
import {
  journalAgentTool,
  professionalFrameworkTool,
  gradeExpectationsTool,
} from "./tools.js";

const journalAgentSchema = z.object({
  summary: z
    .string()
    .describe("A comprehensive summary of the journal entries"),
  keyThemes: z.array(z.string()).describe("Main themes or topics discussed"),
  insights: z.array(z.string()).describe("Key insights or patterns identified"),
  framework: z.object({
    inspire: z
      .string()
      .describe(
        "How the user met the inspire objective of the Evolved PwC Professional. Be specific and detailed write about the actions taken and the impact observed."
      ),
    empower: z
      .string()
      .describe(
        "How the user met the inspire empower of the Evolved PwC Professional. Be specific and detailed write about the actions taken and the impact observed."
      ),
    evolve: z
      .string()
      .describe(
        "How the user met the inspire evolve of the Evolved PwC Professional. Be specific and detailed write about the actions taken and the impact observed."
      ),
    champion: z
      .string()
      .describe(
        "How the user met the inspire champion of the Evolved PwC Professional. Be specific and detailed write about the actions taken and the impact observed."
      ),
    build: z
      .string()
      .describe(
        "How the user met the inspire build of the Evolved PwC Professional. Be specific and detailed write about the actions taken and the impact observed."
      ),
    deliver: z
      .string()
      .describe(
        "How the user met the inspire deliver of the Evolved PwC Professional. Be specific and detailed write about the actions taken and the impact observed."
      ),
  }),
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
  tools: [professionalFrameworkTool, gradeExpectationsTool, journalAgentTool],
  model: process.env.OPENAI_MODEL,
});
