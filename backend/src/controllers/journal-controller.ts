import { Request, Response } from "express";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../config/database.js";
import {
  journalEntries,
  type NewJournalEntry,
  type JournalEntry,
} from "../db/schema/journal-entries.js";
import { and, desc, eq, gte, lte } from "drizzle-orm";

export const addJournalEntry = async (
  req: Request<{}, {}, { content: string }>,
  res: Response<{ message: string }>,
  next: NextFunction
) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ message: "Content is required" });
    }

    const newEntry: NewJournalEntry = {
      userId: req.user.userId,
      content,
    };

    const [createdEntry] = await db.insert(journalEntries).values(newEntry);
    return res.status(StatusCodes.CREATED).json({
      message: "Entry created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// // Get last 10 entries
// GET /api/v1/journal?limit=10

// Get entries from last week
// GET /api/v1/journal?from=2024-01-01&to=2024-01-07

// Get page 2 with 20 entries
// GET /api/v1/journal?page=2&limit=20
export const getJournalEntries = async (
  req: Request,
  res: Response<JournalEntry[] | { message: string }>,
  next: NextFunction
) => {
  try {
    const { userId } = req.user;
    const { from, to, limit = "10", page = "1" } = req.query;

    const conditions = [eq(journalEntries.userId, userId)];
    if (from)
      conditions.push(gte(journalEntries.createdAt, new Date(from as string)));
    if (to)
      conditions.push(lte(journalEntries.createdAt, new Date(to as string)));

    const entries = await db
      .select()
      .from(journalEntries)
      .where(and(...conditions))
      .orderBy(desc(journalEntries.createdAt))
      .limit(parseInt(limit as string))
      .offset((parseInt(page as string) - 1) * parseInt(limit as string));

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

    const [entry] = await db
      .select()
      .from(journalEntries)
      .where(
        and(
          eq(journalEntries.userId, userId),
          eq(journalEntries.id, parseInt(id))
        )
      )
      .limit(1);

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
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const deleteJournalEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
