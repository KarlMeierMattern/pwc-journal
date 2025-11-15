import { Request, Response } from "express";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import {
  journalEntries,
  type NewJournalEntry,
  type JournalEntry,
} from "../db/schema/tables.js";
import { eq, gte, lte } from "drizzle-orm";
import {
  createJournalEntry,
  findJournalEntries,
  findJournalById,
  updateJournalById,
  deleteJournal,
} from "../db/queries.js";

export const addJournalEntry = async (
  req: Request<{}, {}, { content: string; date: string }, {}>,
  res: Response<{ message: string; newEntry?: NewJournalEntry }>,
  next: NextFunction
) => {
  try {
    const { userId } = req.user;
    const { content, date } = req.body;

    if (!content || !date) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Content and date are required" });
    }

    const parsedDate = new Date(date);
    const formattedDate = parsedDate.toISOString().split("T")[0];

    const newEntry: NewJournalEntry = {
      userId,
      content,
      date: new Date(formattedDate),
    };

    const [createdEntry] = await createJournalEntry(newEntry);

    return res.status(StatusCodes.CREATED).json({
      message: "Entry created successfully",
      newEntry: newEntry,
    });
  } catch (error) {
    next(error);
  }
};

export const getJournalEntries = async (
  req: Request<
    {},
    {},
    {},
    { from?: string; to?: string; limit?: string; page?: string }
  >,
  res: Response<JournalEntry[] | { message: string }>,
  next: NextFunction
) => {
  try {
    const { userId } = req.user;
    const { from, to, limit = "10", page = "1" } = req.query;

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
    const entries = await findJournalEntries(conditions, limit, page);

    return res.status(StatusCodes.OK).json(entries);
  } catch (error) {
    next(error);
  }
};

export const getJournalEntryById = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response<JournalEntry | { message: string }>,
  next: NextFunction
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const [entry] = await findJournalById(id, userId);

    if (!entry) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Entry not found" });
    }

    return res.status(StatusCodes.OK).json(entry);
  } catch (error) {
    next(error);
  }
};

export const updateJournalEntry = async (
  req: Request<{ id: string }, {}, { content: string; date: string }, {}>,
  res: Response<{ message: string; entry: JournalEntry } | { message: string }>,
  next: NextFunction
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { content, date } = req.body;

    if (!content) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Content is required" });
    }

    // First check if entry exists
    const [existingEntry] = await findJournalById(id, userId);

    if (!existingEntry) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Entry not found" });
    }

    await updateJournalById(id, userId, content, date);

    // Return the updated entry
    const [updatedEntry] = await findJournalById(id, userId);

    return res.status(StatusCodes.OK).json({
      message: "Entry updated successfully",
      entry: updatedEntry,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJournalEntry = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response<{ message: string }>,
  next: NextFunction
) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;

    const [entry] = await findJournalById(id, userId);

    if (!entry) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Entry not found" });
    }

    await deleteJournal(id, userId);

    return res.status(StatusCodes.OK).json({
      message: "Entry deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
