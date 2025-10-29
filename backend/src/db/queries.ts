import { db } from "../config/database.js";
import {
  users,
  journalEntries,
  type NewJournalEntry,
} from "../db/schema/tables.js";
import { eq, and, desc, type SQL } from "drizzle-orm";

// prod test
(async () => {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, "karlmeiermattern@gmail.com"));
    console.log("Result:", result);
  } catch (e) {
    console.error("Query failed:", e);
  }
})();

export const findUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};

export const createUser = async (email: string, hashedPassword: string) => {
  return await db.insert(users).values({ email, passwordHash: hashedPassword });
};

export const findByUserId = async (userId: number) => {
  return await db.select().from(users).where(eq(users.id, userId));
};

export const createJournalEntry = async (newEntry: NewJournalEntry) => {
  return await db.insert(journalEntries).values(newEntry);
};

export const findJournalEntries = async (
  conditions: SQL<unknown>[],
  limit: string,
  page: string
) => {
  return await db
    .select()
    .from(journalEntries)
    .where(and(...conditions))
    .orderBy(desc(journalEntries.date))
    .limit(parseInt(limit))
    .offset((parseInt(page) - 1) * parseInt(limit));
};

export const findJournalById = async (id: string, userId: any) => {
  return await db
    .select()
    .from(journalEntries)
    .where(
      and(
        eq(journalEntries.userId, userId),
        eq(journalEntries.id, parseInt(id))
      )
    )
    .limit(1);
};

export const updateJournalById = async (
  id: string,
  userId: any,
  content: string
) => {
  return await db
    .update(journalEntries)
    .set({ content })
    .where(
      and(
        eq(journalEntries.userId, userId),
        eq(journalEntries.id, parseInt(id))
      )
    );
};

export const deleteJournal = async (id: string, userId: any) => {
  return await db
    .delete(journalEntries)
    .where(
      and(
        eq(journalEntries.userId, userId),
        eq(journalEntries.id, parseInt(id))
      )
    );
};
