import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'apps/app/.env' });

export default defineConfig({
  dialect: 'postgresql',
  schema: './apps/app/src/lib/db/schema.ts',
  out: './apps/app/src/lib/db/migrations',
  dbCredentials: {
    url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PPORT}/${process.env.DB_DATABASE}`,
  },
});
