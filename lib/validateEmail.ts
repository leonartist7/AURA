/**
 * Intentionally permissive email check — we'd rather accept a slightly weird
 * address and follow up than block a real owner because of a hyphen.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface EmailValidation {
  ok: boolean;
  message?: string;
}

export function validateEmail(raw: string | undefined): EmailValidation {
  const value = (raw ?? '').trim();
  if (!value) {
    return { ok: false, message: 'Pop your email in so I know where to send it.' };
  }
  if (!EMAIL_RE.test(value)) {
    return {
      ok: false,
      message: 'That doesn’t look quite right — mind checking?',
    };
  }
  return { ok: true };
}
