'use client';

import { motion } from 'framer-motion';
import type { DiagnosticAnswers } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { CoffeeLeakAnimation } from '@/components/ui/CoffeeLeakAnimation';
import { CountUpNumber } from '@/components/ui/CountUpNumber';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { computeLeak, formatCAD } from '@/lib/leakCalc';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface LeakScreenProps {
  answers: DiagnosticAnswers;
  onNext: () => void;
}

export function LeakScreen({ answers, onNext }: LeakScreenProps) {
  const leak = computeLeak(answers);

  return (
    <div className="flex min-h-dvh flex-col px-6 pt-6 pb-8">
      <ProgressDots total={8} current={4} />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mx-auto mt-6 flex w-full max-w-screen flex-col items-center"
      >
        <motion.p
          variants={staggerItem}
          className="text-xs uppercase tracking-[0.18em] text-aura-mute"
        >
          The math
        </motion.p>
        <motion.h2
          variants={staggerItem}
          className="mt-2 text-center font-display text-3xl leading-tight text-aura-espresso"
        >
          Here’s what’s quietly slipping out the door.
        </motion.h2>

        <motion.div variants={staggerItem} className="mt-8">
          <CoffeeLeakAnimation intensity={leak.atRiskPerMonth} />
        </motion.div>

        <motion.div variants={staggerItem} className="mt-2 w-full">
          <Metric
            label="At-risk customers / month"
            value={<CountUpNumber to={leak.atRiskPerMonth} />}
          />
          <div className="my-3 h-px bg-aura-line" />
          <Metric
            label="Revenue leaking / month"
            value={<CountUpNumber to={leak.revenuePerMonth} format={(n) => formatCAD(n)} />}
          />
          <div className="my-3 h-px bg-aura-line" />
          <Metric
            label="Revenue leaking / year"
            value={
              <CountUpNumber
                to={leak.revenuePerYear}
                duration={1.6}
                format={(n) => formatCAD(n)}
              />
            }
            big
          />
        </motion.div>

        <motion.p
          variants={staggerItem}
          className="mt-6 max-w-xs text-center text-sm italic text-aura-mute"
        >
          This is conservative. Most cafés lose more than they think.
        </motion.p>
      </motion.div>

      <div className="mt-8">
        <Button fullWidth onClick={onNext}>
          Show me the rest
          <span aria-hidden="true">→</span>
        </Button>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  big,
}: {
  label: string;
  value: React.ReactNode;
  big?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-sm text-aura-mute">{label}</span>
      <span
        className={`font-display tabular text-aura-espresso ${
          big ? 'text-4xl font-semibold' : 'text-2xl'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
