// import {
//   mysqlTable,
//   serial,
//   bigint,
//   text,
//   timestamp,
// } from "drizzle-orm/mysql-core";
// import { users } from "./users.js";

// export const journalEntries = mysqlTable("journal_entries", {
//   id: serial().primaryKey(),
//   userId: bigint({ mode: "number", unsigned: true })
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   content: text().notNull(),
//   createdAt: timestamp().defaultNow().notNull(),
//   updatedAt: timestamp().defaultNow().onUpdateNow().notNull(),
// });

// export type JournalEntry = typeof journalEntries.$inferSelect;
// export type NewJournalEntry = typeof journalEntries.$inferInsert;
