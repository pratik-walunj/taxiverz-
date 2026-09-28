import { defineConfig } from 'drizzle-kit'

/** `npm run db:generate` writes SQL migrations to drizzle/; `npm run db:migrate` applies them to DATABASE_URL. */
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/server/db/schema.ts',
  out: './drizzle',
  dbCredentials: { url: process.env.DATABASE_URL ?? '' },
})
