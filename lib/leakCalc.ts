import type { DiagnosticAnswers, LeakResult } from './types';

/**
 * Conservative "leaky bucket" model used on Screen 4 and inside the
 * prescription cards. Default ticket = $8 (typical Calgary café drink+pastry).
 */
export function computeLeak(
  a: DiagnosticAnswers,
  avgTicket = 8,
): LeakResult {
  const customers     = a.customersPerDay ?? 0;
  const recognition   = (a.recognitionPct ?? 0) / 100;
  const visitsPerLost = 1.5; // assumed visits / month a "lost" regular would have made

  const atRiskPerMonth  = Math.max(0, Math.round(customers * 30 * (1 - recognition) * 0.15));
  const revenuePerMonth = Math.max(0, Math.round(atRiskPerMonth * avgTicket * visitsPerLost));
  const revenuePerYear  = revenuePerMonth * 12;

  return { atRiskPerMonth, revenuePerMonth, revenuePerYear };
}

/** Currency formatter shared across the UI — Canadian $, no decimals. */
export const formatCAD = (n: number) =>
  new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
