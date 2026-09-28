import { z } from 'zod'

/**
 * Environment variables, validated once. Everything is optional: a variable
 * that is unset switches its feature off instead of breaking the build.
 * Empty strings (as in a copied .env.example) count as unset.
 */
const optional = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined))

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_GTM_ID: optional.pipe(
    z
      .string()
      .regex(/^GTM-[A-Z0-9]+$/, 'NEXT_PUBLIC_GTM_ID must look like GTM-XXXXXXX')
      .optional(),
  ),
  NEXT_PUBLIC_CLARITY_ID: optional,
  DATABASE_URL: optional.pipe(
    z
      .string()
      .regex(/^postgres(ql)?:\/\//, 'DATABASE_URL must be a postgres:// URL')
      .optional(),
  ),
  LEADS_RETRY_TOKEN: optional.pipe(
    z.string().min(24, 'LEADS_RETRY_TOKEN must be at least 24 characters').optional(),
  ),
  GOOGLE_MAPS_API_KEY: optional,
})

export type Env = z.infer<typeof schema>

export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = schema.safeParse(source)
  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('\n')
    throw new Error(`Invalid environment variables:\n${issues}`)
  }
  return result.data
}

export const env = parseEnv({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
  DATABASE_URL: process.env.DATABASE_URL,
  LEADS_RETRY_TOKEN: process.env.LEADS_RETRY_TOKEN,
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
})
