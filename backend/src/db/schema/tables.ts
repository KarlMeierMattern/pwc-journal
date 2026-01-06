import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
  bigint,
  text,
  date,
  index,
  int,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar({ length: 255 }).notNull().unique(),
    passwordHash: varchar({ length: 255 }).notNull(),
    grade: varchar({ length: 100 }),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().onUpdateNow().notNull(),
  },
  (table) => [index("idx_user_email").on(table.email)]
);

export const journalEntries = mysqlTable(
  "journal_entries",
  {
    id: serial("id").primaryKey(),
    userId: bigint({ mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    content: text().notNull(),
    date: date().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    index("index_journal_entries_date").on(table.date),
    index("index_journal_entries_user_id").on(table.userId),
  ]
);

export const llmCache = mysqlTable("llm_cache", {
  id: serial("id").primaryKey(),
  userId: bigint({ mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fromDate: date().notNull(),
  toDate: date().notNull(),
  summaryText: text().notNull(),
  cachedAt: timestamp().defaultNow().notNull(),
});

export const professionalFramework = mysqlTable("professional_framework", {
  id: serial("id").primaryKey(),
  topic: text().notNull(),
  goal: text().notNull(),
  description: text().notNull(),
  behaviours: text().notNull(),
});

export const gradeExpectations = mysqlTable("grade_expectations", {
  id: serial("id").primaryKey(),
  grade: varchar({ length: 100 }).notNull().unique(),
  expectation: text().notNull(), // JSON string of expectation object
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type JournalEntry = typeof journalEntries.$inferSelect;
export type NewJournalEntry = typeof journalEntries.$inferInsert;

export type LLMCache = typeof llmCache.$inferSelect;
export type NewLLMCache = typeof llmCache.$inferInsert;

export type GradeExpectation = typeof gradeExpectations.$inferSelect;
export type NewGradeExpectation = typeof gradeExpectations.$inferInsert;
