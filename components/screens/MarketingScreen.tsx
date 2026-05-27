'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { DiagnosticAnswers, OrderingChannel } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { ChoiceCard } from '@/components/ui/ChoiceCard';
import { Slider } from '@/components/ui/Slider';
import { TextArea } from '@/components/ui/TextArea';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { formatCAD } from '@/lib/leakCalc';
import { spring } from '@/lib/motion';

interface MarketingScreenProps {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
  onNext: () => void;
}

type Step = 0 | 1 | 2;

const channels: { value: OrderingChannel; title: string; icon: string }[] = [
  { value: 'in-store',      title: 'In-store',           icon: '☕' },
  { value: 'phone',         title: 'Phone',              icon: '📞' },
  { value: 'ubereats',      title: 'UberEats',           icon: '🥡' },
  { value: 'doordash',      title: 'DoorDash',           icon: '🥡' },
  { value: 'direct-online', title: 'Direct online',      icon: '🌐' },
  { value: 'other',         title: 'Other',              icon: '✶' },
];

const hasDelivery = (ch?: OrderingChannel[]) =>
  ch?.some((c) => c === 'ubereats' || c === 'doordash') ?? false;

export function MarketingScreen({ answers, update, onNext }: MarketingScreenProps) {
  const [step, setStep] = useState<Step>(0);
  const showDelivery = hasDelivery(answers.orderingChannels);

  const canAdvance = (() => {
    switch (step) {
      case 0:
        return (answers.orderingChannels?.length ?? 0) > 0;
      case 1:
        // Q9 only matters if delivery selected, otherwise auto-advance is fine
        return !showDelivery || answers.deliveryAppPct != null;
      case 2:
        return true; // Q10 is optional
    }
  })();

  const advance = () => {
    if (step === 0 && !showDelivery) {
      setStep(2); // skip Q9
      return;
    }
    if (step === 2) {
      onNext();
      return;
    }
    setStep((step + 1) as Step);
  };

  const toggleChannel = (c: OrderingChannel) => {
    const existing = answers.orderingChannels ?? [];
    const next = existing.includes(c)
      ? existing.filter((x) => x !== c)
      : [...existing, c];
    update({ orderingChannels: next });
  };

  return (
    <div className="flex min-h-dvh flex-col px-6 pt-6 pb-8">
      <ProgressDots total={8} current={5} />
      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-aura-mute">
        Marketing &amp; ordering
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
              <div className="rounded-card bg-white/70 p-6 shadow-aura">
                <h2 className="font-display text-2xl leading-snug">
                  How do customers usually order from you?
                </h2>
                <p className="mt-1 text-sm text-aura-mute">Pick all that apply.</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {channels.map((c) => (
                    <ChoiceCard
                      key={c.value}
                      title={c.title}
                      icon={<span>{c.icon}</span>}
                      selected={answers.orderingChannels?.includes(c.value) ?? false}
                      onSelect={() => toggleChannel(c.value)}
                    />
                  ))}
                </div>
              </div>
            )}

            {step === 1 && showDelivery && (
              <DeliveryPctStep answers={answers} update={update} />
            )}

            {step === 2 && (
              <div className="rounded-card bg-white/70 p-6 shadow-aura">
                <h2 className="font-display text-2xl leading-snug">
                  Last marketing thing you tried — and did it work?
                </h2>
                <p className="mt-1 text-sm text-aura-mute">
                  No wrong answer. Skip if you’d rather tell me in person.
                </p>
                <div className="mt-5">
                  <TextArea
                    label="Last marketing attempt"
                    hideLabel
                    placeholder="Skip if you’d rather tell me in person."
                    value={answers.lastMarketingAttempt ?? ''}
                    onChange={(e) =>
                      update({ lastMarketingAttempt: e.target.value })
                    }
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <Button fullWidth onClick={advance} disabled={!canAdvance}>
        {step === 2 ? 'Continue' : 'Next'}
        <span aria-hidden="true">→</span>
      </Button>
    </div>
  );
}

function DeliveryPctStep({
  answers,
  update,
}: {
  answers: DiagnosticAnswers;
  update: MarketingScreenProps['update'];
}) {
  const pct = answers.deliveryAppPct ?? 20;
  // Rough commission cost: customers/day * 30 * pct/100 * $8 avg * 25% commission
  const customers = answers.customersPerDay ?? 0;
  const monthlyCommission = Math.round(
    customers * 30 * (pct / 100) * 8 * 0.25,
  );

  return (
    <div className="rounded-card bg-white/70 p-6 shadow-aura">
      <h2 className="font-display text-2xl leading-snug">
        What % goes through delivery apps?
      </h2>
      <div className="mt-6">
        <Slider
          label="Delivery app %"
          hideLabel
          min={0}
          max={100}
          value={pct}
          onChange={(v) => update({ deliveryAppPct: v })}
          display={`${pct}%`}
          reactiveCopy={
            customers > 0 && pct > 0 ? (
              <span>
                You’re paying roughly{' '}
                <strong className="text-aura-espresso">
                  {formatCAD(monthlyCommission)}
                </strong>{' '}
                in commission per month. Aura’s direct ordering saves most of that.
              </span>
            ) : (
              'Move the slider to see what those apps are costing you.'
            )
          }
        />
      </div>
    </div>
  );
}
