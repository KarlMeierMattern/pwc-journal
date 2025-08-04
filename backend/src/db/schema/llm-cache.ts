import {
  mysqlTable,
  serial,
  bigint,
  text,
  date,
  timestamp,
} from "drizzle-orm/mysql-core";
import { users } from "./users";

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

export type LLMCache = typeof llmCache.$inferSelect;
export type NewLLMCache = typeof llmCache.$inferInsert;
