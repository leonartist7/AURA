'use client';

import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Checkmark } from './Checkmark';

interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label: string;
  hideLabel?: boolean;
  prefix?: ReactNode;        // e.g. "@" for Instagram
  helper?: string;
  errorMessage?: string;
  isValid?: boolean;         // controlled "show ✓" state
}

/**
 * Aura text input. Gold underline animates in on focus, ✓ appears when
 * isValid flips true. Real <label> is always present — only visually hidden
 * when hideLabel is true (skill mandate: never use placeholder as sole label).
 */
export function TextInput({
  label,
  hideLabel,
  prefix,
  helper,
  errorMessage,
  isValid,
  className = '',
  id,
  ...rest
}: TextInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [focused, setFocused] = useState(false);
  const hasError = Boolean(errorMessage);

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={inputId}
        className={
          hideLabel
            ? 'sr-only'
            : 'mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-aura-mute'
        }
      >
        {label}
      </label>
      <div
        className={[
          'group relative flex items-center gap-2 rounded-btn bg-white/70 px-4 py-3.5',
          'shadow-aura-inset transition-colors duration-200',
          hasError ? 'ring-1 ring-aura-coral' : 'hover:bg-white/90',
        ].join(' ')}
      >
        {prefix && (
          <span className="text-base text-aura-mute" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={inputId}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? `${inputId}-err` : helper ? `${inputId}-help` : undefined}
          className="flex-1 bg-transparent text-base text-aura-espresso placeholder:text-aura-mute/70 focus:outline-none"
        />
        <AnimatePresence>
          {isValid && !hasError && (
            <motion.span
              key="check"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="text-aura-forest"
            >
              <Checkmark />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Animated gold underline on focus */}
        <motion.span
          className="pointer-events-none absolute inset-x-3 bottom-1 h-px origin-left bg-aura-gold"
          initial={false}
          animate={{ scaleX: focused || isValid ? 1 : 0, opacity: focused || isValid ? 1 : 0 }}
          transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
        />
      </div>
      {hasError ? (
        <p
          id={`${inputId}-err`}
          role="alert"
          aria-live="polite"
          className="mt-1.5 text-xs text-aura-coral"
        >
          {errorMessage}
        </p>
      ) : helper ? (
        <p id={`${inputId}-help`} className="mt-1.5 text-xs text-aura-mute">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
