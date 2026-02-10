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
  lastMonthEntries,
} from "../db/queries.js";
import { z } from "zod";

const dateStringSchema = z
  .string()
  .min(1, "Date is required")
  .refine(
    (s) => {
      const d = new Date(s);
      return !Number.isNaN(d.getTime());
    },
    { message: "Invalid date" },
  );

const addJournalEntrySchema = z.object({
  content: z.string().min(1, "Content is required"),
  date: dateStringSchema,
});

const updateJournalEntrySchema = z.object({
  content: z.string().min(1, "Content is required"),
  date: dateStringSchema,
});

const journalQuerySchema = z.object({
  from: dateStringSchema.optional(),
  to: dateStringSchema.optional(),
  limit: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
});

function validationErrorResponse(parsed: z.SafeParseError<unknown>) {
  const fieldErrors = parsed.error.flatten().fieldErrors;
  const message =
    typeof fieldErrors === "object" && Object.keys(fieldErrors).length > 0
      ? Object.values(fieldErrors).flat().join("; ") || "Validation failed"
      : "Validation failed";
  return { message };
}

export const addJournalEntry = async (
  req: Request<{}, {}, { content: string; date: string }, {}>,
  res: Response<{ message: string; newEntry?: NewJournalEntry }>,
  next: NextFunction,
) => {
  try {
    const parsed = addJournalEntrySchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(validationErrorResponse(parsed));
    }
    const { userId } = req.user;
    const { content, date } = parsed.data;

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
  next: NextFunction,
) => {
  try {
    const parsed = journalQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(validationErrorResponse(parsed));
    }
    const { userId } = req.user;
    const { from, to } = parsed.data;

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
    const entries = await findJournalEntries(conditions);

    return res.status(StatusCodes.OK).json(entries);
  } catch (error) {
    next(error);
  }
};

export const getJournalEntryById = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: Response<JournalEntry | { message: string }>,
  next: NextFunction,
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
  next: NextFunction,
) => {
  try {
    const parsed = updateJournalEntrySchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(validationErrorResponse(parsed));
    }
    const { userId } = req.user;
    const { id } = req.params;
    const { content, date } = parsed.data;

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
  next: NextFunction,
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

export const getLastMonthEntries = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const entries = await lastMonthEntries(req.user.userId);
    if (!entries || entries.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No entries found" });
    }
    return res.status(StatusCodes.OK).json(entries);
  } catch (error) {
    next(error);
  }
};
