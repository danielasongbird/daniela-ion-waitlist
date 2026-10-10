'use client';

// Effects adapted from the approved tutorial tricks (projectpractice/tutorialtricks/approved),
// recoloured to the V11 brand (plum, pink, lilac, peach).

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useInView } from '../edge-activation-handoff/useInView';

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// #31 Scroll Progress: a thin glowing bar across the top, filling as the page scrolls.
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const reduce = reducedMotion();
    let current = 0;
    let target = 0;
    let frame = 0;
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    const paint = () => {
      current += reduce ? target - current : (target - current) * 0.18;
      el.style.width = `${(current * 100).toFixed(2)}%`;
      el.style.setProperty('--tip', current > 0.005 && current < 0.995 ? '1' : '0');
      el.setAttribute('aria-valuenow', String(Math.round(current * 100)));
      frame = Math.abs(target - current) > 0.0005 ? requestAnimationFrame(paint) : 0;
    };
    const onScroll = () => {
      read();
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={bar}
      className="hw-progress"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    />
  );
}

// #12 Blur Fade (replay version): any element with .bf slides up into focus each time it enters the screen.
export function BlurFadeRuntime() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.bf');
    document.documentElement.classList.add('hw-bf-ready');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle('in', entry.isIntersecting)),
      { rootMargin: '0px 0px -50px 0px' },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}

// #02 Hero Highlight: a highlighter sweep behind one key word, shortly after it appears.
export function Highlight({ children, delay = 400 }: { children: ReactNode; delay?: number }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOn(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return <span className={`hw-highlight${on ? ' on' : ''}`}>{children}</span>;
}

// #09 Text Generate: words fade from blurry to sharp one after another when the line scrolls in.
export function TextGenerate({ text, className }: { text: string; className?: string }) {
  const [ref, inView] = useInView<HTMLParagraphElement>(0.5);
  const words = text.trim().split(/\s+/);

  return (
    <p ref={ref} className={`${className ?? ''} hw-tg${inView ? ' is-in' : ''}`} aria-label={text}>
      {words.map((word, index) => (
        <span key={index} aria-hidden="true" style={{ '--i': index } as CSSProperties}>{word}{index < words.length - 1 ? ' ' : ''}</span>
      ))}
    </p>
  );
}

