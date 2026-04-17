import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './apps/app/src/lib/db/schema.ts',
  out: './apps/app/src/lib/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PPORT}/${process.env.DB_DATABASE}`,
  },
});
