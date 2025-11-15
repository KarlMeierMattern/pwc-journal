import { Request, Response } from "express";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { run } from "@openai/agents";
import { journalAgent, JournalAgentOutput } from "../agent/journal-agent.js";

export const getJournalSummary = async (
  req: Request<{}, {}, {}, { from?: string; to?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("🤖 Agent controller reached");
    console.log("User:", req.user);
    console.log("Query params:", req.query);

    const { userId } = req.user;
    const { from, to } = req.query;

    const dateRange =
      from && to ? `from ${from} to ${to}` : "for all available dates";
    const input = `Please analyze journal entries for userId: ${userId} ${dateRange} and provide a comprehensive summary. Use the getJournalEntries tool with userId: ${userId}${
      from ? `, from: "${from}"` : ""
    }${to ? `, to: "${to}"` : ""}.`;

    const result = await run(journalAgent, input);

    const cleanOutput = result.finalOutput as JournalAgentOutput;

    res.status(StatusCodes.OK).json(cleanOutput);
  } catch (error) {
    next(error);
  }
};
