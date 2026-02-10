import { Request, Response } from "express";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { run } from "@openai/agents";
import { journalAgent, JournalAgentOutput } from "../agent/journal-agent.js";
import { findByUserId } from "../db/queries.js";

export const getJournalSummary = async (
  req: Request<
    {},
    {},
    { customPrompt?: string },
    { from?: string; to?: string }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.user;
    const { from, to } = req.query;
    const { customPrompt } = req.body;

    // Fetch user's grade
    const [user] = await findByUserId(userId);
    const userGrade = user?.grade || null;

    const dateRange =
      from && to ? `from ${from} to ${to}` : "for all available dates";
    const gradeContext = userGrade
      ? ` The user's current grade is: ${userGrade}.`
      : " The user has not set their grade yet.";

    let input = `Please analyze journal entries for userId: ${userId} ${dateRange} and provide a comprehensive summary.${gradeContext} Use the getJournalEntries tool with userId: ${userId}${
      from ? `, from: "${from}"` : ""
    }${to ? `, to: "${to}"` : ""}.`;

    // Append custom prompt if provided
    if (customPrompt && customPrompt.trim()) {
      input += ` Additionally, please focus on the following specific request: ${customPrompt.trim()}`;
    }

    const result = await run(journalAgent, input);

    const cleanOutput = result.finalOutput as JournalAgentOutput;

    res.status(StatusCodes.OK).json(cleanOutput);
  } catch (error) {
    next(error);
  }
};
