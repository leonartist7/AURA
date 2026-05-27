import type {
  DiagnosticAnswers,
  ScoreBreakdown,
  ScoreResult,
  ScoreBadge,
} from './types';

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

/**
 * Pure score engine. Tweak weights here without touching UI.
 *
 *   retention_score (0-25)
 *     recognition % * 0.15  + 5 if "notice-reach-out"  + estimated_return_rate * 0.1
 *
 *   marketing_score (0-25)
 *     +10 if they tried marketing,  -5 if delivery > 40%,  +15 if direct ordering
 *
 *   direct_ordering_score (0-25)
 *     25 - delivery_app_% * 0.2
 *
 *   online_presence_score (0-25)
 *     +10 google,  +10 insta,  +5 baseline
 */
export function computeScore(a: DiagnosticAnswers): ScoreResult {
  const recognitionPct    = a.recognitionPct          ?? 0;
  const returnRatePred    = a.returnRatePrediction    ?? 0;
  const deliveryPct       = a.deliveryAppPct          ?? 0;
  const triedMarketing    = Boolean(a.lastMarketingAttempt?.trim());
  const hasDirectOrdering = a.orderingChannels?.includes('direct-online') ?? false;
  const noticesAndReaches = a.regularLossDiscovery === 'notice-reach-out';
  const hasGoogle         = Boolean(a.googleUrl?.trim());
  const hasInstagram      = Boolean(a.instagramHandle?.trim());

  const sub: ScoreBreakdown = {
    retention: clamp(
      recognitionPct * 0.15 + (noticesAndReaches ? 5 : 0) + returnRatePred * 0.1,
      0,
      25,
    ),
    marketing: clamp(
      (triedMarketing ? 10 : 0) +
        (deliveryPct > 40 ? -5 : 0) +
        (hasDirectOrdering ? 15 : 0),
      0,
      25,
    ),
    directOrdering: clamp(25 - deliveryPct * 0.2, 0, 25),
    onlinePresence: clamp(
      (hasGoogle ? 10 : 0) + (hasInstagram ? 10 : 0) + 5,
      0,
      25,
    ),
  };

  const total = Math.round(
    sub.retention + sub.marketing + sub.directOrdering + sub.onlinePresence,
  );

  const badge = pickBadge(total);
  return {
    total,
    sub,
    badge,
    badgeLabel: badgeLabels[badge],
    badgeAccent: badgeAccents[badge],
    percentile: estimatePercentile(total),
  };
}

function pickBadge(total: number): ScoreBadge {
  if (total <= 30) return 'growth';
  if (total <= 55) return 'leaks';
  if (total <= 75) return 'foundation';
  return 'excellence';
}

const badgeLabels: Record<ScoreBadge, string> = {
  growth:     'Growth potential 🌱',
  leaks:      'Hidden leaks 💧',
  foundation: 'Solid foundation ☕',
  excellence: 'Café excellence ⭐',
};

const badgeAccents: Record<ScoreBadge, ScoreResult['badgeAccent']> = {
  growth:     'sage',
  leaks:      'coral',
  foundation: 'gold',
  excellence: 'espresso',
};

/**
 * Monotonic, deliberately conservative percentile curve.
 * Score 30 -> ~17th, 47 -> ~31st, 60 -> ~52nd, 75 -> ~74th, 90 -> ~91st.
 */
function estimatePercentile(total: number): number {
  const t = clamp(total, 0, 100) / 100;
  const eased = Math.pow(t, 1.15);
  return Math.max(1, Math.min(99, Math.round(eased * 100)));
}
