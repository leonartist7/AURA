import { NextResponse } from 'next/server';

/**
 * Placeholder endpoint for diagnostic submissions.
 *
 * Wire-up later (one of):
 *   1. Resend  — `npm i resend`, set RESEND_API_KEY, send a notification email
 *      to the founder + a confirmation to the owner.
 *   2. Webhook — POST `payload` to a Zapier / Make / n8n URL stored in
 *      DIAGNOSTIC_WEBHOOK_URL env var.
 *   3. DB     — write to Supabase / Postgres / Airtable.
 *
 * For now: log + return 200 so the front-end flow completes during
 * in-café demos and on Vercel preview deploys.
 */
export async function POST(req: Request) {
  let payload: unknown = null;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'invalid-json' },
      { status: 400 },
    );
  }

  // eslint-disable-next-line no-console
  console.log(
    '[aura-diagnostic] submission received',
    JSON.stringify(payload, null, 2),
  );

  return NextResponse.json({ ok: true });
}

export const runtime = 'nodejs';
