'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { DiagnosticAnswers } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { Slider } from '@/components/ui/Slider';
import { NeighborhoodSelect } from '@/components/ui/NeighborhoodSelect';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { spring } from '@/lib/motion';

interface BasicsScreenProps {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
  onNext: () => void;
}

type Step = 0 | 1 | 2 | 3;

export function BasicsScreen({ answers, update, onNext }: BasicsScreenProps) {
  // 4 mini-cards inside Screen 2, slide in one at a time.
  const [step, setStep] = useState<Step>(0);

  const next = () => (step === 3 ? onNext() : setStep((step + 1) as Step));
  const canAdvance = (() => {
    switch (step) {
      case 0:
        return Boolean(answers.cafeName?.trim());
      case 1:
        return Boolean(answers.neighborhood?.trim());
      case 2:
        return answers.yearsOpen != null;
      case 3:
        return answers.customersPerDay != null;
    }
  })();

  return (
    <div className="flex min-h-dvh flex-col px-6 pt-6 pb-8">
      <ProgressDots total={8} current={2} />
      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-aura-mute">
        About your café
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
            {step === 0 && (
              <Card title="What’s the name of your café?">
                <TextInput
                  label="Café name"
                  hideLabel
                  placeholder="e.g. Bridgeland Coffee"
                  autoFocus
                  value={answers.cafeName ?? ''}
                  isValid={Boolean(answers.cafeName?.trim())}
                  onChange={(e) => update({ cafeName: e.target.value })}
                />
              </Card>
            )}

            {step === 1 && (
              <Card title="Which neighbourhood are you in?">
                <NeighborhoodSelect
                  value={answers.neighborhood}
                  onChange={(v) => update({ neighborhood: v })}
                />
              </Card>
            )}

            {step === 2 && (
              <Card title="How many years have you been open?">
                <Slider
                  label="Years open"
                  hideLabel
                  min={0}
                  max={10}
                  value={answers.yearsOpen ?? 0}
                  onChange={(v) => update({ yearsOpen: v })}
                  display={
                    answers.yearsOpen === 0
                      ? 'Just opened'
                      : answers.yearsOpen === 10
                      ? '10+ years'
                      : `${answers.yearsOpen} year${answers.yearsOpen === 1 ? '' : 's'}`
                  }
                />
              </Card>
            )}

            {step === 3 && (
              <Card title="How many customers a day, on average?">
                <Slider
                  label="Customers per day"
                  hideLabel
                  min={20}
                  max={500}
                  step={10}
                  value={answers.customersPerDay ?? 150}
                  onChange={(v) => update({ customersPerDay: v })}
                  display={`${answers.customersPerDay ?? 150} / day`}
                  reactiveCopy={
                    answers.customersPerDay != null && answers.customersPerDay < 60
                      ? 'A quieter spot — every regular matters.'
                      : answers.customersPerDay != null && answers.customersPerDay > 250
                      ? 'A busy room — easy to lose track of who’s who.'
                      : 'Steady traffic — the perfect size for loyalty to compound.'
                  }
                />
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Button fullWidth onClick={next} disabled={!canAdvance}>
        {step === 3 ? 'Next' : 'Next'}
        <span aria-hidden="true">→</span>
      </Button>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-card bg-white/70 p-6 shadow-aura">
      <h2 className="font-display text-2xl leading-snug text-aura-espresso">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}
