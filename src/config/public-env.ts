/**
 * Browser-safe configuration. Only NEXT_PUBLIC_* variables, inlined at build.
 * Invalid values switch the feature off rather than breaking the page.
 */
const gtm = process.env.NEXT_PUBLIC_GTM_ID?.trim()
const clarity = process.env.NEXT_PUBLIC_CLARITY_ID?.trim()

export const publicEnv = {
  gtmId: gtm && /^GTM-[A-Z0-9]+$/.test(gtm) ? gtm : null,
  clarityId: clarity && /^[a-z0-9]+$/i.test(clarity) ? clarity : null,
} as const
