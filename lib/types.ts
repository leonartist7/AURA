/**
 * Shared domain types for the Aura Café Diagnostic.
 * Kept deliberately flat — every screen reads/writes through this single shape.
 */

export type OrderingChannel =
  | 'in-store'
  | 'phone'
  | 'ubereats'
  | 'doordash'
  | 'direct-online'
  | 'other';

export type RegularLossDiscovery =
  | 'notice-reach-out'
  | 'notice-no-action'
  | 'usually-dont-notice'
  | 'no-system';

export interface DiagnosticAnswers {
  // Screen 2 — basics
  cafeName?: string;
  neighborhood?: string;
  yearsOpen?: number;          // 0 = just opened, 10 = "10+ years"
  customersPerDay?: number;    // 20–500

  // Screen 3 — retention
  recognitionPct?: number;          // 0–100
  regularLossDiscovery?: RegularLossDiscovery;
  returnRatePrediction?: number;    // 0–100

  // Screen 5 — marketing & ordering
  orderingChannels?: OrderingChannel[];
  deliveryAppPct?: number;          // 0–100, only meaningful if delivery channel selected
  lastMarketingAttempt?: string;

  // Screen 6 — presence
  googleUrl?: string;
  instagramHandle?: string;

  // Screen 8 — contact (only captured at the close)
  email?: string;
  phone?: string;
}

export interface ScoreBreakdown {
  retention: number;
  marketing: number;
  directOrdering: number;
  onlinePresence: number;
}

export type ScoreBadge = 'growth' | 'leaks' | 'foundation' | 'excellence';

export interface ScoreResult {
  total: number;                  // 0–100, rounded
  sub: ScoreBreakdown;            // each 0–25
  badge: ScoreBadge;
  badgeLabel: string;             // human label e.g. "Hidden leaks 💧"
  badgeAccent: 'sage' | 'coral' | 'gold' | 'espresso';
  percentile: number;             // 0–99, "better than X% of cafés"
}

export interface LeakResult {
  atRiskPerMonth: number;
  revenuePerMonth: number;
  revenuePerYear: number;
}

export interface PrescriptionCard {
  slot: 'card-1' | 'card-2' | 'card-3';
  eyebrow: string;
  title: string;
  body: string;
  metric?: string;     // optional dollar figure or stat to highlight
}

export type ScreenIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
