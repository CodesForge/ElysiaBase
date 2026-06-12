// ============================================
// DATABASE CONFIGURATION
// PostgreSQL connection pool with Drizzle ORM
// ============================================

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "#/config";
import * as usersSchema from "#/lib/db/schemas";

/**
 * PostgreSQL connection pool with production-ready settings.
 * Uses environment variables via config object.
 */
const pool = new Pool({
    connectionString: config.DATABASE_URL,
    max: config.DB_POOL_MAX,                      // Maximum number of clients in pool
    idleTimeoutMillis: config.DB_POOL_IDLE_TIMEOUT, // Close idle clients after ms
    connectionTimeoutMillis: config.DB_POOL_CONNECTION_TIMEOUT, // Wait for connection
})

/**
 * Combine all schemas into a single object for Drizzle.
 * This enables typed `db.query.users.findMany()` and relations.
 */
const schema = {
    ...usersSchema,
}

/**
 * Drizzle ORM instance with full type safety.
 * `{ schema }` enables relational queries (e.g., `db.query.users.findMany({ with: { posts: true } })`)
 */
export const db = drizzle(pool, { schema });

/**
 * Export schema type for use in repositories.
 * Example: `type DbSchema = typeof db._.schema`
 */
export type DbSchema = typeof schema;