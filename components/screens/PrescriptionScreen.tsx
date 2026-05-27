'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import type { DiagnosticAnswers } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { CardIllustration } from '@/components/ui/CardIllustration';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { computeScore } from '@/lib/scoreEngine';
import { generatePrescription } from '@/lib/prescriptions';
import { validateEmail } from '@/lib/validateEmail';
import { staggerContainer, staggerItem, spring } from '@/lib/motion';

interface PrescriptionScreenProps {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
  onSubmitted: () => void;
}

const reportBullets = [
  'Full Google review sentiment analysis',
  'Competitor comparison (3 nearby cafés)',
  'Custom 90-day growth plan',
  'Specific revenue recovery projections',
  '10-minute follow-up call with me to walk you through it',
];

export function PrescriptionScreen({
  answers,
  update,
  onSubmitted,
}: PrescriptionScreenProps) {
  const score = computeScore(answers);
  const cards = generatePrescription(answers, score);

  const [emailError, setEmailError] = useState<string | undefined>();
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const v = validateEmail(answers.email);
    if (!v.ok) {
      setEmailError(v.message);
      return;
    }
    setEmailError(undefined);
    setSubmitError(undefined);
    setLoading(true);

    try {
      const res = await fetch('/api/submit-diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          score,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error('bad-status');
      onSubmitted();
    } catch {
      setSubmitError(
        'Hmm, that didn’t go through. Mind tapping send again?',
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col px-6 pt-6 pb-10">
      <ProgressDots total={8} current={8} />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mx-auto mt-6 w-full max-w-screen"
      >
        <motion.h2
          variants={staggerItem}
          className="font-display text-3xl leading-tight text-aura-espresso"
        >
          Here are the 3 things hurting your café most.
        </motion.h2>

        <div className="mt-6 space-y-4">
          {cards.map((card) => (
            <motion.article
              key={card.slot}
              variants={staggerItem}
              className="flex gap-4 rounded-card bg-white/75 p-4 shadow-aura"
            >
              <CardIllustration slot={card.slot} />
              <div className="flex-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-aura-gold">
                  {card.eyebrow}
                </p>
                <h3 className="mt-1 font-display text-lg leading-snug text-aura-espresso">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-aura-mute">
                  {card.body}
                </p>
                {card.metric && (
                  <p className="mt-2 inline-block rounded-full bg-aura-line/70 px-3 py-1 font-display text-sm text-aura-espresso">
                    {card.metric}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Email gate */}
        <motion.div
          variants={staggerItem}
          className="mt-10 rounded-card bg-aura-espresso p-6 text-aura-cream shadow-aura-lg"
        >
          <h3 className="font-display text-2xl leading-tight">
            Want the full picture?
          </h3>
          <p className="mt-2 text-sm text-aura-cream/80">
            Get your personalised <strong>$100 audit report</strong> — built by a
            real strategist, delivered in 24 hours.
          </p>

          <ul className="mt-5 space-y-2">
            {reportBullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-aura-cream/90">
                <span className="mt-1 text-aura-gold" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12.5l4.5 4.5L19 7"
                      stroke="currentColor"
                      strokeWidth={2.8}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-3">
            <TextInput
              label="Email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@yourcafe.com"
              value={answers.email ?? ''}
              isValid={Boolean(answers.email && validateEmail(answers.email).ok)}
              errorMessage={emailError}
              onChange={(e) => {
                update({ email: e.target.value });
                if (emailError) setEmailError(undefined);
              }}
              onBlur={() => {
                if (answers.email) {
                  const v = validateEmail(answers.email);
                  if (!v.ok) setEmailError(v.message);
                }
              }}
            />
            <TextInput
              label="Phone (optional)"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(403) 555-0188"
              value={answers.phone ?? ''}
              onChange={(e) => update({ phone: e.target.value })}
              helper="Optional — only if you want to text the report."
            />
          </div>

          <div className="mt-6">
            <Button
              fullWidth
              variant="secondary"
              loading={loading}
              onClick={onSubmit}
            >
              Send me my report
              <span aria-hidden="true">→</span>
            </Button>
            {submitError && (
              <p
                role="alert"
                aria-live="polite"
                className="mt-2 text-center text-xs text-aura-coral"
              >
                {submitError}
              </p>
            )}
            <p className="mt-3 text-center text-[11px] text-aura-cream/70">
              No spam. No newsletter. Just your report and one follow-up to walk
              you through it.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
