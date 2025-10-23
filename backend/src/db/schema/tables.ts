import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  bigint,
  text,
  date,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial().primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  passwordHash: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().onUpdateNow().notNull(),
});

export const journalEntries = mysqlTable("journal_entries", {
  id: serial().primaryKey(),
  userId: bigint({ mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text().notNull(),
  date: date().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().onUpdateNow().notNull(),
});

export const llmCache = mysqlTable("llm_cache", {
  id: serial().primaryKey(),
  userId: bigint({ mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fromDate: date().notNull(),
  toDate: date().notNull(),
  summaryText: text().notNull(),
  cachedAt: timestamp().defaultNow().notNull(),
});

export const professionalFramework = mysqlTable("professional_framework", {
  id: serial().primaryKey(),
  topic: text().notNull(),
  goal: text().notNull(),
  description: text().notNull(),
  behaviours: text().notNull(),
});

// export const professionalGradeExpectations = mysqlTable(
//   "professional_grade_expectations",
//   {}
// );

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type JournalEntry = typeof journalEntries.$inferSelect;
export type NewJournalEntry = typeof journalEntries.$inferInsert;

export type LLMCache = typeof llmCache.$inferSelect;
export type NewLLMCache = typeof llmCache.$inferInsert;
