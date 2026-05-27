import type {
  DiagnosticAnswers,
  PrescriptionCard,
  ScoreResult,
} from './types';
import { computeLeak, formatCAD } from './leakCalc';

/**
 * Builds the three personalised "what's hurting your café most" cards on Screen 8.
 *
 *   Card 1: based on the lowest sub-score — name the gap + what it costs.
 *   Card 2: their biggest cash leak (from Screen 4 math).
 *   Card 3: a quick-win they can do *without* Aura — builds trust, lowers the
 *           sell-y feel of the moment before the email gate.
 */
export function generatePrescription(
  a: DiagnosticAnswers,
  score: ScoreResult,
): PrescriptionCard[] {
  return [
    cardFromWeakestArea(a, score),
    cardFromBiggestLeak(a),
    cardWithQuickWin(a),
  ];
}

function cardFromWeakestArea(
  a: DiagnosticAnswers,
  score: ScoreResult,
): PrescriptionCard {
  const entries = Object.entries(score.sub) as [keyof ScoreResult['sub'], number][];
  entries.sort((x, y) => x[1] - y[1]);
  const weakest = entries[0][0];

  switch (weakest) {
    case 'retention':
      return {
        slot: 'card-1',
        eyebrow: 'Biggest gap',
        title: 'You’re forgetting who your regulars are.',
        body:
          'Right now you have no system to recognise repeat customers or notice when one disappears. Every silent goodbye is a customer that won’t come back.',
        metric: a.recognitionPct != null
          ? `${a.recognitionPct}% recognition today`
          : undefined,
      };
    case 'marketing':
      return {
        slot: 'card-1',
        eyebrow: 'Biggest gap',
        title: 'Your marketing isn’t compounding.',
        body:
          'Without a consistent way to bring people back, every dollar you spend acquiring a customer leaks back out the door.',
      };
    case 'directOrdering':
      return {
        slot: 'card-1',
        eyebrow: 'Biggest gap',
        title: 'Delivery apps own your margin.',
        body:
          'Every order through UberEats / DoorDash costs you 25–30% in commission. That money should be staying in your pocket, not theirs.',
        metric: a.deliveryAppPct != null
          ? `${a.deliveryAppPct}% of orders going through apps`
          : undefined,
      };
    case 'onlinePresence':
    default:
      return {
        slot: 'card-1',
        eyebrow: 'Biggest gap',
        title: 'You’re invisible online.',
        body:
          'Most new customers find a café through Google or Instagram. Without a presence, you’re hoping they walk by.',
      };
  }
}

function cardFromBiggestLeak(a: DiagnosticAnswers): PrescriptionCard {
  const leak = computeLeak(a);
  return {
    slot: 'card-2',
    eyebrow: 'The math',
    title: 'This is the leak we can plug first.',
    body: `Based on your numbers, roughly ${leak.atRiskPerMonth} customers slip away each month. That’s ${formatCAD(leak.revenuePerYear)} of revenue we estimate is walking out the door every year.`,
    metric: formatCAD(leak.revenuePerMonth) + ' / month',
  };
}

function cardWithQuickWin(a: DiagnosticAnswers): PrescriptionCard {
  // Pick a quick-win they can actually act on this week, no Aura required.
  const hasInsta = Boolean(a.instagramHandle?.trim());
  const hasGoogle = Boolean(a.googleUrl?.trim());

  if (!hasGoogle) {
    return {
      slot: 'card-3',
      eyebrow: 'Free quick-win',
      title: 'Claim your Google Business Profile this week.',
      body:
        'It’s free, takes 30 minutes, and most cafés that do it see a 15–25% lift in walk-ins within 60 days. Even if you never work with Aura, do this.',
    };
  }
  if (!hasInsta) {
    return {
      slot: 'card-3',
      eyebrow: 'Free quick-win',
      title: 'Post one customer story a week on Instagram.',
      body:
        'Not your food — your *people*. Regulars sharing why they come back is the single highest-converting content for cafés. No budget required.',
    };
  }
  return {
    slot: 'card-3',
    eyebrow: 'Free quick-win',
    title: 'Ask three regulars this week: “why us?”',
    body:
      'Write down the exact words they use. Those are the words you should put on your storefront, menu, and Google profile. Costs nothing, changes everything.',
  };
}
