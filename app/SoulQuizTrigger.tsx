'use client';

import type { ReactNode } from 'react';

type SoulQuizTriggerProps = {
  children: ReactNode;
  className?: string;
};

export default function SoulQuizTrigger({ children, className }: SoulQuizTriggerProps) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new Event('open-soul-quiz'))}
      type="button"
    >
      {children}
    </button>
  );
}
