import 'server-only'
import { z } from 'zod'

/**
 * Server environment variables, validated once. Everything is optional: a
 * variable that is unset switches its feature off instead of breaking the build.
 * Empty strings (as in a copied .env.example) count as unset.
 * Browser-safe NEXT_PUBLIC_* variables live in config/public-env.ts.
 */
const optional = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined))

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
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
  // Email sink (SMTP)
  SMTP_HOST: optional,
  SMTP_PORT: optional.pipe(
    z.string().regex(/^\d+$/, 'SMTP_PORT must be a number').transform(Number).optional(),
  ),
  SMTP_USER: optional,
  SMTP_PASS: optional,
  LEAD_EMAIL_TO: optional.pipe(
    z.string().email('LEAD_EMAIL_TO must be an email address').optional(),
  ),
  LEAD_EMAIL_FROM: optional,
  // Telegram sink
  TELEGRAM_BOT_TOKEN: optional,
  TELEGRAM_CHAT_ID: optional,
  // Webhook sink (Google Sheets Apps Script, n8n, TravelCRM …)
  LEAD_WEBHOOK_URL: optional.pipe(z.string().url('LEAD_WEBHOOK_URL must be a URL').optional()),
  LEAD_WEBHOOK_SECRET: optional,
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

export const env = parseEnv(process.env)
