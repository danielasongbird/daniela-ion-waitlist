'use client';

import { useEffect, useRef, type ReactNode } from 'react';

// Pinned card stack. The heading block and the card deck freeze together: once the view reaches the
// point where they both fit, scrolling stops moving the page and instead brings the next cards up from
// below to land on top one by one (covered cards shrink and peek out above). Once the last card has
// landed the page carries on. If the block is taller than the screen it pins with the deck in full view
// and the heading partly above. Phones, short screens and reduced motion keep normal flow instead.
export function StackRows({ head, children }: { head: ReactNode; children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const stage = el?.querySelector<HTMLElement>('.pv-why-stage');
    if (!el || !stage) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('.pv-why-card'));
    const flow = window.matchMedia('(max-width: 600px), (max-height: 820px), (prefers-reduced-motion: reduce)');
    const travel = () => window.innerHeight * 0.8;
    let pinned = false;
    let stickyTop = 0;
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (!pinned) return;
      const progress = Math.min(cards.length - 1, Math.max(0, -(el.getBoundingClientRect().top - stickyTop) / travel()));
      cards.forEach((card, index) => {
        const enter = index === 0 ? 1 : Math.min(1, Math.max(0, progress - (index - 1)));
        const depth = Math.min(cards.length - 1 - index, Math.max(0, progress - index));
        const y = (1 - enter) * window.innerHeight * 1.05 - depth * 24;
        card.style.transform = `translateY(${y.toFixed(1)}px) scale(${(1 - depth * 0.05).toFixed(4)})`;
        card.style.filter = `brightness(${(1 - depth * 0.06).toFixed(3)})`;
      });
    };

    const layout = () => {
      pinned = !flow.matches;
      el.classList.toggle('is-pinned', pinned);
      cards.forEach((card) => {
        card.style.transform = '';
        card.style.filter = '';
        card.style.minHeight = '';
      });
      if (!pinned) {
        el.style.height = '';
        stage.style.top = '';
        return;
      }
      // Every card takes the tallest card's height so the deck stacks cleanly.
      const cardHeight = Math.max(...cards.map((card) => card.offsetHeight));
      cards.forEach((card) => {
        card.style.minHeight = `${cardHeight}px`;
      });
      const total = stage.offsetHeight;
      const room = window.innerHeight;
      // Centre the whole block if it fits; otherwise keep the deck in view with a gap at the bottom.
      stickyTop = total <= room - 64 ? (room - total) / 2 : room - total - 32;
      stage.style.top = `${stickyTop}px`;
      el.style.height = `${total + (cards.length - 1) * travel()}px`;
      paint();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    layout();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', layout);
    flow.addEventListener('change', layout);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', layout);
      flow.removeEventListener('change', layout);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrap} className="pv-why-stack">
      <div className="pv-why-stage">
        <div className="pv-why-head">{head}</div>
        <div className="pv-why-deck">{children}</div>
      </div>
    </div>
  );
}

