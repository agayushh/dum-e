import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const sessions = pgTable(
  "Session",
  {
    id: text("id").primaryKey().$defaultFn(() => createId()),
    userId: text("userId").notNull(),
    title: text("title").notNull(),
    createdAt: timestamp("createdAt", { precision: 3, mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { precision: 3, mode: "date" })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    messages: jsonb("messages").$type<unknown[]>().notNull().default(sql`'[]'::jsonb`),
  },
  (table) => [index("Session_userId_idx").on(table.userId)],
);

export type Session = typeof sessions.$inferSelect;
