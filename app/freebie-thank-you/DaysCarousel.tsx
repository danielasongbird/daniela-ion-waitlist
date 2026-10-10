'use client';

import { useEffect, useRef, useState } from 'react';
import { days } from './content';
import { DayIcon } from './DaysIcons';

// Five days (layout round, version 3): a full-width swipeable row of tall cards with arrows and a
// position bar. The row fades out at both screen edges; each edge fade shows only while there are
// more cards past it. Styles in days.css.
export function DayCarousel() {
  const track = useRef<HTMLOListElement>(null);
  const move = useRef<(direction: number) => void>(() => {});
  const [index, setIndex] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const metrics = () => {
      const card = el.querySelector<HTMLLIElement>(':scope > li');
      const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || '0') : 1;
      return { step, max: el.scrollWidth - el.clientWidth };
    };
    // Where the row rests for each card (the last ones stop at the end of the row)
    const stops = () => {
      const { step, max } = metrics();
      return days.map((_, i) => Math.min(i * step, max));
    };
    const nearest = (left: number) => {
      const all = stops();
      return all.reduce((best, stop, i) => (Math.abs(stop - left) < Math.abs(all[best] - left) ? i : best), 0);
    };

    let frame = 0;
    const read = () => {
      frame = 0;
      const { max } = metrics();
      const start = el.scrollLeft <= 4;
      const end = el.scrollLeft >= max - 4;
      setIndex(end ? days.length - 1 : nearest(el.scrollLeft));
      setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    // Motion engine: the row eases toward a target every frame instead of jumping to it. While
    // dragging it follows the pointer with a slight soft lag; on release (or an arrow click) it glides
    // to a card and settles. Snapping is off while it moves (data-free; data attributes because React owns the class list) and comes back once it has settled.
    let current = el.scrollLeft;
    let target = current;
    let mode: 'idle' | 'drag' | 'glide' = 'idle';
    let raf = 0;
    let last = 0;
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      mode = 'idle';
      delete el.dataset.free;
    };
    const tick = (now: number) => {
      const dt = Math.min(64, now - (last || now - 16.7));
      last = now;
      // Per-frame easing, scaled so it feels the same at 60Hz and 120Hz
      const ease = 1 - Math.pow(1 - (mode === 'drag' ? 0.3 : 0.1), dt / 16.7);
      current += (target - current) * ease;
      if (mode === 'glide' && Math.abs(target - current) < 0.5) {
        el.scrollLeft = target;
        stop();
        return;
      }
      el.scrollLeft = current;
      raf = requestAnimationFrame(tick);
    };
    const run = () => {
      el.dataset.free = '';
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    const glideTo = (card: number) => {
      const all = stops();
      if (mode === 'idle') current = el.scrollLeft;
      target = all[Math.max(0, Math.min(all.length - 1, card))];
      if (reduced.matches) {
        el.scrollLeft = target;
        stop();
        return;
      }
      mode = 'glide';
      run();
    };
    move.current = (direction) => glideTo(nearest(mode === 'idle' ? el.scrollLeft : target) + direction);

    // Mouse drag (touch swipes natively; a touch or trackpad scroll cancels a glide in progress)
    let drag: { x: number; left: number; lastX: number; lastT: number; v: number; moved: boolean } | null = null;
    const stopClick = (event: MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
    };
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) {
        if (mode !== 'idle') stop();
        return;
      }
      if (mode === 'idle') current = el.scrollLeft;
      target = current;
      mode = 'drag';
      drag = { x: event.clientX, left: current, lastX: event.clientX, lastT: event.timeStamp, v: 0, moved: false };
      el.setPointerCapture(event.pointerId);
      el.dataset.dragging = '';
      run();
    };
    const onMove = (event: PointerEvent) => {
      if (!drag) return;
      const dx = event.clientX - drag.x;
      if (Math.abs(dx) > 4) drag.moved = true;
      target = Math.max(0, Math.min(metrics().max, drag.left - dx));
      const dt = event.timeStamp - drag.lastT;
      // Smoothed pointer speed in px/ms, used to carry a flick on release
      if (dt > 0) drag.v = drag.v * 0.6 + ((event.clientX - drag.lastX) / dt) * 0.4;
      drag.lastX = event.clientX;
      drag.lastT = event.timeStamp;
    };
    const onUp = (event: PointerEvent) => {
      if (!drag) return;
      const { moved, lastT } = drag;
      // A pause before letting go means no flick
      const v = event.timeStamp - lastT > 80 ? 0 : drag.v;
      drag = null;
      delete el.dataset.dragging;
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
      if (moved) el.addEventListener('click', stopClick, { capture: true, once: true });
      // A flick carries the row on, but never more than one extra card
      const { step } = metrics();
      glideTo(nearest(target - Math.max(-step, Math.min(step, v * 320))));
    };
    const onWheel = () => {
      if (mode === 'glide') stop();
    };
    const noDrag = (event: DragEvent) => event.preventDefault();

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('dragstart', noDrag);
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('dragstart', noDrag);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pv-dcar pv-rv">
      <ol ref={track} className={`pv-dcar-track${edges.start ? ' is-start' : ''}${edges.end ? ' is-end' : ''}`}>
        {days.map((day, i) => (
          <li key={day.name} className="pv-card">
            <DayIcon index={i} className="is-large" />
            <p className="pv-dcar-day"><span>{day.day}</span><span>{i + 1} / 5</span></p>
            <h3>{day.name}</h3>
            <p>{day.body}</p>
          </li>
        ))}
      </ol>
      <div className="pv-dcar-controls">
        <button type="button" aria-label="Previous day" onClick={() => move.current(-1)} disabled={edges.start}>←</button>
        <div className="pv-dcar-bar" aria-hidden="true">{days.map((day, i) => <span key={day.name} className={i <= index ? 'is-on' : undefined} />)}</div>
        <button type="button" aria-label="Next day" onClick={() => move.current(1)} disabled={edges.end}>→</button>
      </div>
    </div>
  );
}



