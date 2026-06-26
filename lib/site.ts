/**
 * Canonical site origin. Set NEXT_PUBLIC_SITE_URL in the production
 * environment (e.g. https://auraclub.app). Falls back to the Vercel-
 * provided URL on previews, then localhost in dev.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
  'http://localhost:3000'
).replace(/\/$/, '');

export const SITE_NAME = 'AURA CLUB';
