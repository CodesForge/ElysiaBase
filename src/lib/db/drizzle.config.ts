// ============================================
// DRIZZLE KIT CONFIGURATION
// For migrations generation (drizzle-kit generate/migrate)
// ============================================

import { config } from '#/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    // Path to all schema files
    schema: './src/libs/schemas/*.ts',
    
    // Output directory for migration files
    out: './src/libs/db/migrations',
    
    dialect: 'postgresql',
    dbCredentials: {
        url: config.DATABASE_URL,
    },
    
    // Verbose output for debugging
    verbose: true,
    
    // Strict mode for type safety
    strict: true,
});