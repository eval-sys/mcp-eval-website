import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const customerSubmissions = pgTable('customer_submissions', {
  id: serial('id').primaryKey(),
  custname: varchar('custname', { length: 255 }).notNull(),
  custtel: varchar('custtel', { length: 50 }).notNull(),
  custemail: varchar('custemail', { length: 255 }).notNull(),
  size: varchar('size', { length: 20 }).notNull(), // small, medium, large
  delivery: varchar('delivery', { length: 20 }).notNull(), // morning, afternoon, evening
  comments: text('comments'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type CustomerSubmission = typeof customerSubmissions.$inferSelect;
export type NewCustomerSubmission = typeof customerSubmissions.$inferInsert;