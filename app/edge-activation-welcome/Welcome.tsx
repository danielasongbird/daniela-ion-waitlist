'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Todo } from '../edge-activation-handoff/Shared';
import { days, faqs, firstSteps, note, portalBody, portalHref, rhythm } from './content';
import { TextGenerate } from './Effects';
import { Fireworks, type Burst } from './Fireworks';

// #01 Shimmer Button: a light spins around the button's edge.
function PortalButton() {
  return (
    <a className="hw-btn hw-shimmer" href={portalHref}>
      <span>Go to Soul Portal</span>
      <svg viewBox="0 0 78 42" aria-hidden="true">
        <path d="M4 29 C17 9 37 8 50 18 C58 24 57 33 50 34 C42 35 38 27 45 21 C53 14 65 17 73 23" />
        <path d="M66 15 C69 19 71 21 74 23 C70 25 67 28 64 31" />
      </svg>
    </a>
  );
}

// First steps: full-width arrow panels, lilac to plum, blur-fading in one after another.
export function WelcomeSteps() {
  return (
    <section className="hw-steps">
      <div className="hb-inner bf">
        <p className="hb-kicker">before tomorrow morning</p>
        <h2>Here’s how <em>to begin.</em></h2>
      </div>
      <ol>
        {firstSteps.map((step, index) => (
          <li key={step.title} className="bf" style={{ '--delay': `${0.12 * (index + 1)}s` } as CSSProperties}>
            <div>
              <small>Step {index + 1} · {step.when}</small>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// The five days as a journey (#13 Tracing Beam): the heading stays pinned, a glowing beam fills the
// timeline as you scroll, and each morning lights up when the beam reaches it.
export function WelcomeDays({ after, items = days, intro = rhythm }: { after?: ReactNode; items?: typeof days; intro?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    const dot = dotRef.current;
    if (!wrap || !fill || !dot) return;
    const items = Array.from(wrap.querySelectorAll<HTMLLIElement>('li'));
    const nodes = Array.from(wrap.querySelectorAll<HTMLSpanElement>('.hw-dy2-node'));
    const centres = () => nodes.map((node) => node.offsetTop + node.offsetHeight / 2);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const c = centres();
      fill.style.top = `${c[0]}px`;
      fill.style.height = `${c[c.length - 1] - c[0]}px`;
      items.forEach((item) => item.classList.add('is-lit'));
      return;
    }

    let current = 0;
    let velocity = 0;
    let raf = 0;
    let visible = false;

    const loop = () => {
      const c = centres();
      const max = c[c.length - 1] - c[0];
      const top = wrap.getBoundingClientRect().top + window.scrollY + c[0];
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const start = top - window.innerHeight * 0.6;
      const end = Math.min(start + max, maxScroll);
      const target = end > start ? Math.max(0, Math.min(1, (window.scrollY - start) / (end - start))) * max : max;
      velocity = (velocity + (target - current) * 0.08) * 0.72;
      current += velocity;
      fill.style.top = `${c[0]}px`;
      fill.style.height = `${Math.max(0, current)}px`;
      dot.style.top = `${c[0] + current}px`;
      items.forEach((item, index) => item.classList.toggle('is-lit', c[index] - c[0] <= current + 2));
      raf = visible || Math.abs(target - current) > 0.5 ? requestAnimationFrame(loop) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    observer.observe(wrap);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hb-band hb-cream hw-dy2">
      <div className="hb-inner hw-dy2-grid">
        <div className="hw-dy2-side bf">
          <p className="hb-kicker">your five days</p>
          <h2>One level of your soul <em>each morning, for five days</em></h2>
          <p className="hw-days-rhythm">{intro}</p>
          {after}
        </div>
        <div ref={wrapRef} className="hw-tb">
          <span className="hw-tb-fill" ref={fillRef} aria-hidden="true" />
          <span className="hw-tb-dot" ref={dotRef} aria-hidden="true" />
          <ol className="hw-dy2-list">
            {items.map((day, index) => (
              <li key={day.name} style={{ '--i': index } as CSSProperties}>
                <span className="hw-dy2-node" aria-hidden="true">
                  <svg viewBox="0 0 40 24"><path d="M6 22a14 14 0 0 1 28 0" /><path d="M20 2v3M8 7l2 2M32 7l-2 2M2 16h3M35 16h3" /></svg>
                </span>
                <div>
                  <small>{day.day}</small>
                  <h3>{day.name}</h3>
                  <p>{day.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// A note from Daniela: a large portrait beside the letter; the first line writes itself in (#09).
export function WelcomeNote({ lead = note[0], paragraphs = note.slice(1), home = 'Welcome home.' }: { lead?: string; paragraphs?: string[]; home?: string }) {
  return (
    <section className="hb-band hb-plum hw-note">
      <div className="hb-inner hw-note-grid">
        <span className="hw-note-photo bf" role="img" aria-label="Daniela Ion" />
        <div className="hw-note-letter">
          <p className="hw-note-label">A note from Daniela</p>
          <TextGenerate className="hw-note-lead" text={lead} />
          {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <p className="hw-note-home">{home}</p>
          <p className="hw-note-sign">Daniela</p>
        </div>
      </div>
    </section>
  );
}

// Fireworks around the edges of "your home", clear of the centred text.
const portalBursts: Burst[] = [
  { x: 14, y: 18, delay: 0, colour: '#f48bb3', m: [18, 9] },
  { x: 86, y: 22, delay: 1.2, colour: '#cbb0ed', m: [82, 13] },
  { x: 9, y: 66, delay: 2.1, colour: '#9b4d86', m: [16, 88] },
  { x: 91, y: 72, delay: 0.7, colour: '#e987aa', m: [84, 90] },
  { x: 28, y: 90, delay: 2.7, colour: '#cbb0ed', m: [50, 96] },
  { x: 72, y: 10, delay: 1.7, colour: '#f48bb3', m: [50, 4] },
];

const orbitIcons: Array<[string, ReactNode]> = [
  ['Audio transmissions', <svg key="a" viewBox="0 0 32 32"><path d="M5 20v-4a11 11 0 0 1 22 0v4" /><rect x="4" y="19" width="6" height="9" rx="2" /><rect x="22" y="19" width="6" height="9" rx="2" /></svg>],
  ['Soul love letters', <svg key="b" viewBox="0 0 32 32"><rect x="4" y="8" width="24" height="17" rx="2" /><path d="M4 10l12 9 12-9" /></svg>],
  ['Five mornings', <svg key="c" viewBox="0 0 40 24"><path d="M6 22a14 14 0 0 1 28 0" /><path d="M20 2v3M8 7l2 2M32 7l-2 2M2 16h3M35 16h3" /><path d="M2 22h36" /></svg>],
  ['Live sessions', <svg key="d" viewBox="0 0 32 32"><rect x="11" y="3" width="10" height="17" rx="5" /><path d="M6 15a10 10 0 0 0 20 0M16 25v4M11 29h10" /></svg>],
  ['Community', <svg key="e" viewBox="0 0 32 32"><circle cx="11" cy="11" r="4" /><circle cx="22" cy="12" r="3.5" /><path d="M3 26c1-5 4-8 8-8s7 3 8 8M18 25c.7-3.6 2.6-6 5.5-6 2.8 0 4.6 2.3 5.5 6" /></svg>],
];

// Soul Portal: your home. Fills the screen; what lives inside orbits the text (#18) with the hero's fireworks.
export function WelcomePortal({ action = <PortalButton />, body = portalBody }: { action?: ReactNode; body?: string }) {
  return (
    <section className="hb-band hw-portal">
      <span className="hw-portal-ring is-1" aria-hidden="true" />
      <span className="hw-portal-ring is-2" aria-hidden="true" />
      <Fireworks bursts={portalBursts} />
      <div className="hw-orbit" aria-label="What lives inside Soul Portal">
        {orbitIcons.map(([label, icon], index) => (
          <span key={label} className="hw-orbit-item" role="img" aria-label={label} style={{ '--angle': `${index * 72}deg` } as CSSProperties}>
            {icon}
          </span>
        ))}
      </div>
      <div className="hb-inner hw-portal-inner bf">
        <p className="hb-kicker">your home</p>
        <h2>The Edge Activation lives <em>inside Soul Portal</em></h2>
        <p className="hw-portal-body">{body}</p>
        {action}
      </div>
    </section>
  );
}

// FAQ: smooth numbered accordion, plus a help line; rows blur-fade in.
const faqHelp = <>Can’t find something inside Soul Portal? Email <Todo>support address</Todo> and we’ll sort it out.</>;

export function WelcomeFaq({ items = faqs, help = faqHelp }: { items?: Array<{ q: string; a: string }>; help?: ReactNode }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="hb-band hb-cream hw-faq" id="faq">
      <div className="hb-inner hw-faq-grid">
        <div className="bf">
          <p className="hb-kicker">good to know</p>
          <h2>Questions <em>before Day One</em></h2>
          {help && <p className="hw-faq-help">{help}</p>}
        </div>
        <ol className="hw-faq-list">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.q} className="bf" data-open={isOpen} style={{ '--delay': `${0.08 * index}s` } as CSSProperties}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : index)}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <span>{item.q}</span>
                  <i aria-hidden="true" />
                </button>
                <div className="hw-faq-answer"><div><p>{item.a}</p></div></div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

