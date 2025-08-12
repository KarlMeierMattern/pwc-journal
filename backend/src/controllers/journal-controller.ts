import { Request, Response } from "express";
import { NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../config/database.js";
import {
  journalEntries,
  type NewJournalEntry,
  type JournalEntry,
} from "../db/schema/journal-entries.js";
import { eq } from "drizzle-orm";

export const addJournalEntry = async (
  req: Request,
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
      userId: req.user.id,
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

export const getJournalEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getJournalEntryById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

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
