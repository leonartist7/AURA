'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { DiagnosticAnswers } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { ScoreRingAnimation } from '@/components/ui/ScoreRingAnimation';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { computeScore } from '@/lib/scoreEngine';
import { spring } from '@/lib/motion';

interface ScoreScreenProps {
  answers: DiagnosticAnswers;
  onNext: () => void;
}

/**
 * 3-second cinematic reveal:
 *   0–1s : cup outline draws (handled inside ScoreRingAnimation)
 *   1–2s : ring fills + number counts up
 *   2–2.4s : badge appears
 *   2.4–3s : sub-score bars stagger in
 *   3s+ : CTA appears
 */
export function ScoreScreen({ answers, onNext }: ScoreScreenProps) {
  const reduced = useReducedMotion();
  const score = computeScore(answers);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(reduced ? 3 : 0);

  useEffect(() => {
    if (reduced) return;
    const t1 = setTimeout(() => setPhase(1), 1000);  // ring fill starts
    const t2 = setTimeout(() => setPhase(2), 2000);  // badge
    const t3 = setTimeout(() => setPhase(3), 2400);  // sub-scores
    const t4 = setTimeout(() => setPhase(3), 3000);  // CTA — set via phase >= 3 + delay
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [reduced]);

  const badgeBg: Record<typeof score.badgeAccent, string> = {
    sage:     'bg-aura-sage/30 text-aura-forest',
    coral:    'bg-aura-coral/25 text-[#7B3F1F]',
    gold:     'bg-aura-gold/30 text-aura-espresso',
    espresso: 'bg-aura-espresso text-aura-cream',
  };

  const subs: { label: string; value: number }[] = [
    { label: 'Customer retention',    value: score.sub.retention },
    { label: 'Marketing & reach',     value: score.sub.marketing },
    { label: 'Direct ordering & margin', value: score.sub.directOrdering },
    { label: 'Online presence',       value: score.sub.onlinePresence },
  ];

  return (
    <div className="flex min-h-dvh flex-col px-6 pt-6 pb-8">
      <ProgressDots total={8} current={7} />

      <div className="mx-auto mt-8 flex w-full max-w-screen flex-col items-center">
        <ScoreRingAnimation score={score.total} />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={spring}
          className="mt-6"
        >
          <span
            className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium ${badgeBg[score.badgeAccent]}`}
          >
            {score.badgeLabel}
          </span>
        </motion.div>

        {/* Sub-scores */}
        <div className="mt-8 w-full space-y-3">
          {subs.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: reduced ? 0 : i * 0.2, ...spring }}
              className="rounded-btn bg-white/70 px-4 py-3 shadow-aura"
            >
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-sm text-aura-mute">{s.label}</span>
                <span className="font-display tabular text-sm text-aura-espresso">
                  {Math.round(s.value)}/25
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-aura-line">
                <motion.div
                  initial={{ width: 0 }}
                  animate={phase >= 3 ? { width: `${(s.value / 25) * 100}%` } : { width: 0 }}
                  transition={{ delay: reduced ? 0 : i * 0.2 + 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-aura-gold"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: reduced ? 0 : 0.8, duration: 0.5 }}
          className="mt-6 text-center text-sm text-aura-mute"
        >
          You scored better than{' '}
          <strong className="text-aura-espresso">{score.percentile}%</strong> of cafés
          we’ve benchmarked.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ delay: reduced ? 0 : 1, duration: 0.4 }}
        className="mt-auto pt-8"
      >
        <Button fullWidth onClick={onNext} disabled={phase < 3}>
          See what this means for your café
          <span aria-hidden="true">→</span>
        </Button>
      </motion.div>
    </div>
  );
}
