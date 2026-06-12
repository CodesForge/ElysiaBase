// ============================================
// USERS TABLE SCHEMA (Drizzle ORM)
// Defines database structure, validation schemas, and TypeScript types
// ============================================

import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-typebox";
import { t } from "elysia";

/**
 * Users table definition.
 * 
 * - user_id: Primary key (UUID v4 from domain layer, not auto-generated)
 * - username: Unique, max 20 chars
 * - password: Hashed password (max 30 chars for argon2 hash)
 * - createdAt: Auto-set on insert
 * - updatedAt: Auto-updated on each update
 */
export const users = pgTable('users', {
    user_id: varchar('user_id').primaryKey().notNull(),
    username: varchar('username', { length: 20 }).unique().notNull(),
    password: varchar('password', { length: 30 }).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date),
});

/**
 * Additional validation rules for TypeBox schemas.
 * Applied on top of database constraints.
 */
const fieldRefinements = {
    username: t.String({ minLength: 3, maxLength: 30, examples: ['User Name'] }),
    password: t.String({ minLength: 8, maxLength: 100, examples: ['Password'] }),
};

/**
 * TypeBox validation schemas for:
 * - Insert (new user creation)
 * - Select (query results)
 * - Update (partial updates)
 */
const _userCreate = createInsertSchema(users, fieldRefinements);
const _userSelect = createSelectSchema(users, fieldRefinements);
const _userUpdate = createUpdateSchema(users, fieldRefinements);

export const userCreate = _userCreate;
export const userSelect = _userSelect;
export const userUpdate = _userUpdate;

/**
 * TypeScript types inferred from the table schema.
 * - DBUser: Complete user object as stored in DB
 * - NewDBUser: User object for insertion (without auto-generated fields)
 */
export type DBUser = typeof users.$inferSelect;
export type NewDBUser = typeof users.$inferInsert;