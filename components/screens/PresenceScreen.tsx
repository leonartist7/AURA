'use client';

import { motion } from 'framer-motion';
import type { DiagnosticAnswers } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface PresenceScreenProps {
  answers: DiagnosticAnswers;
  update: (patch: Partial<DiagnosticAnswers>) => void;
  onNext: () => void;
}

export function PresenceScreen({ answers, update, onNext }: PresenceScreenProps) {
  return (
    <div className="flex min-h-dvh flex-col px-6 pt-6 pb-8">
      <ProgressDots total={8} current={6} />
      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-aura-mute">
        Reviews &amp; online presence
      </p>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mx-auto mt-4 flex w-full max-w-screen flex-col gap-5"
      >
        <motion.div variants={staggerItem} className="rounded-card bg-white/70 p-6 shadow-aura">
          <h2 className="font-display text-2xl leading-snug">
            What’s your Google Business Profile?
          </h2>
          <p className="mt-1 text-sm text-aura-mute">
            URL works best, but your café name is fine too.
          </p>
          <div className="mt-4">
            <TextInput
              label="Google Business Profile URL or café name"
              hideLabel
              type="url"
              inputMode="url"
              placeholder="e.g. https://g.page/yourcafe"
              value={answers.googleUrl ?? ''}
              isValid={Boolean(answers.googleUrl?.trim())}
              onChange={(e) => update({ googleUrl: e.target.value })}
            />
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="rounded-card bg-white/70 p-6 shadow-aura">
          <h2 className="font-display text-2xl leading-snug">Instagram handle?</h2>
          <p className="mt-1 text-sm text-aura-mute">Optional, but encouraged.</p>
          <div className="mt-4">
            <TextInput
              label="Instagram handle"
              hideLabel
              prefix="@"
              placeholder="yourcafe"
              value={answers.instagramHandle ?? ''}
              isValid={Boolean(answers.instagramHandle?.trim())}
              onChange={(e) =>
                update({ instagramHandle: e.target.value.replace(/^@/, '') })
              }
            />
          </div>
        </motion.div>

        <motion.p variants={staggerItem} className="text-center text-xs text-aura-mute">
          I’ll use these to build your full audit. No spam, ever.
        </motion.p>
      </motion.div>

      <div className="mt-auto pt-8">
        <Button fullWidth onClick={onNext}>
          See my score
          <span aria-hidden="true">→</span>
        </Button>
      </div>
    </div>
  );
}
