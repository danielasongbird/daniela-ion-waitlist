'use client';

import { useEffect, useRef } from 'react';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Why now (V2): a statement whose words light up one by one as it scrolls through the screen.
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>('span'));
    if (prefersReducedMotion()) {
      spans.forEach((span) => span.classList.add('is-lit'));
      return;
    }
    let frame = 0;
    const paint = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)));
      const lit = Math.round(progress * spans.length);
      spans.forEach((span, index) => span.classList.toggle('is-lit', index < lit));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={index} aria-hidden="true">{word}{index < words.length - 1 ? ' ' : ''}</span>
      ))}
    </p>
  );
}

