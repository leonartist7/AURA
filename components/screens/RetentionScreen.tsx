'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { DiagnosticAnswers, RegularLossDiscovery } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { ChoiceCard } from '@/components/ui/ChoiceCard';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { spring } from '@/lib/motion';

interface RetentionScreenProps {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
  onNext: () => void;
}

type Step = 0 | 1 | 2;

const lossOptions: { value: RegularLossDiscovery; title: string; worry?: boolean }[] = [
  { value: 'notice-reach-out',     title: 'I notice and reach out' },
  { value: 'notice-no-action',     title: 'I notice but don’t reach out' },
  { value: 'usually-dont-notice',  title: 'I usually don’t notice',  worry: true },
  { value: 'no-system',            title: 'I have no system for this', worry: true },
];

export function RetentionScreen({ answers, update, onNext }: RetentionScreenProps) {
  const [step, setStep] = useState<Step>(0);
  const next = () => (step === 2 ? onNext() : setStep((step + 1) as Step));

  const canAdvance = (() => {
    switch (step) {
      case 0:
        return answers.recognitionPct != null;
      case 1:
        return answers.regularLossDiscovery != null;
      case 2:
        return answers.returnRatePrediction != null;
    }
  })();

  return (
    <div className="flex min-h-dvh flex-col px-6 pt-6 pb-8">
      <ProgressDots total={8} current={3} />
      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-aura-mute">
        How well do you know your regulars?
      </p>

      <div className="relative mt-4 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: spring }}
            exit={{ x: -24, opacity: 0, transition: { duration: 0.2 } }}
            className="mx-auto w-full max-w-screen"
          >
            {step === 0 && <RecognitionStep answers={answers} update={update} />}
            {step === 1 && <LossStep answers={answers} update={update} />}
            {step === 2 && <ReturnRateStep answers={answers} update={update} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <Button fullWidth onClick={next} disabled={!canAdvance}>
        {step === 2 ? 'Continue' : 'Next'}
        <span aria-hidden="true">→</span>
      </Button>
    </div>
  );
}

/* ─── Sub-steps ───────────────────────────────────────────────────────── */

function RecognitionStep({ answers, update }: { answers: DiagnosticAnswers; update: RetentionScreenProps['update'] }) {
  const v = answers.recognitionPct ?? 30;
  const copy =
    v < 30
      ? 'Most cafés are here. Aura changes that.'
      : v < 60
      ? 'Better than most. Imagine if it were 90%.'
      : 'Impressive. Let’s protect that.';
  return (
    <div className="rounded-card bg-white/70 p-6 shadow-aura">
      <h2 className="font-display text-2xl leading-snug">
        What % of your customers do you recognise when they walk in?
      </h2>
      <div className="mt-6 flex justify-center">
        <FaceIcon pct={v} />
      </div>
      <div className="mt-6">
        <Slider
          label="Recognition %"
          hideLabel
          min={0}
          max={100}
          value={v}
          onChange={(n) => update({ recognitionPct: n })}
          display={`${v}%`}
          reactiveCopy={copy}
        />
      </div>
    </div>
  );
}

function LossStep({ answers, update }: { answers: DiagnosticAnswers; update: RetentionScreenProps['update'] }) {
  return (
    <div className="rounded-card bg-white/70 p-6 shadow-aura">
      <h2 className="font-display text-2xl leading-snug">
        When a regular stops coming in, how do you usually find out?
      </h2>
      <div className="mt-6 flex flex-col gap-3">
        {lossOptions.map((opt) => (
          <ChoiceCard
            key={opt.value}
            title={opt.title}
            selected={answers.regularLossDiscovery === opt.value}
            onSelect={() => update({ regularLossDiscovery: opt.value })}
            worry={opt.worry}
          />
        ))}
      </div>
    </div>
  );
}

function ReturnRateStep({ answers, update }: { answers: DiagnosticAnswers; update: RetentionScreenProps['update'] }) {
  const v = answers.returnRatePrediction ?? 30;
  // Show the benchmark once they've moved off the default.
  const showBenchmark = answers.returnRatePrediction != null;
  return (
    <div className="rounded-card bg-white/70 p-6 shadow-aura">
      <h2 className="font-display text-2xl leading-snug">
        What % of first-time customers do you think come back a second time?
      </h2>
      <div className="mt-6">
        <Slider
          label="Estimated return rate"
          hideLabel
          min={0}
          max={100}
          value={v}
          onChange={(n) => update({ returnRatePrediction: n })}
          display={`${v}%`}
          reactiveCopy={
            showBenchmark ? (
              <span>
                Industry average: <strong className="text-aura-espresso">27%</strong>.
                Top cafés: <strong className="text-aura-espresso">65%</strong>.
              </span>
            ) : null
          }
        />
      </div>
    </div>
  );
}

/** Friendly face that smiles more as recognition goes up. SVG, not emoji. */
function FaceIcon({ pct }: { pct: number }) {
  // Smile curve depth driven by pct
  const depth = 4 + (pct / 100) * 14;
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
      <circle cx="42" cy="42" r="38" fill="#FBEFE2" stroke="#C9A961" strokeWidth="2" />
      <circle cx="30" cy="36" r="3" fill="#2A1F1A" />
      <circle cx="54" cy="36" r="3" fill="#2A1F1A" />
      <path
        d={`M28 ${52 - depth / 2} Q42 ${52 + depth} 56 ${52 - depth / 2}`}
        fill="none"
        stroke="#2A1F1A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
