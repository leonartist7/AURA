'use client';

import { useId, type TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hideLabel?: boolean;
  helper?: string;
}

export function TextArea({
  label,
  hideLabel,
  helper,
  className = '',
  id,
  ...rest
}: TextAreaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

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
      <textarea
        id={inputId}
        rows={3}
        {...rest}
        aria-describedby={helper ? `${inputId}-help` : undefined}
        className="w-full resize-none rounded-btn bg-white/70 px-4 py-3.5 text-base text-aura-espresso placeholder:text-aura-mute/70 shadow-aura-inset focus:outline-none"
      />
      {helper && (
        <p id={`${inputId}-help`} className="mt-1.5 text-xs text-aura-mute">
          {helper}
        </p>
      )}
    </div>
  );
}
