'use client';

import { useEffect } from 'react';

const panelSelector = [
  '.v11-stage-hero',
  '.v11-questions',
  '.v11-about',
  '.v11-renaissance',
  '.v11-science',
  '.v11-invitation',
  '.v11-final',
  '.v11-bio',
].join(',');

export default function V11ScrollEffects() {
  // Panels taller than the viewport stick once their bottom edge is reached,
  // so the next panel never covers content that hasn't been scrolled into view.
  useEffect(() => {
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(panelSelector),
    );

    const updateStickyOffsets = () => {
      panels.forEach((panel) => {
        panel.style.removeProperty('top');
        if (getComputedStyle(panel).position !== 'sticky') return;
        panel.style.top = `${Math.min(0, window.innerHeight - panel.offsetHeight)}px`;
      });
    };

    const resizeObserver = new ResizeObserver(updateStickyOffsets);
    panels.forEach((panel) => resizeObserver.observe(panel));
    window.addEventListener('resize', updateStickyOffsets);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateStickyOffsets);
      panels.forEach((panel) => panel.style.removeProperty('top'));
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileViewport = window.matchMedia('(max-width: 820px)');
    if (reducedMotion.matches || mobileViewport.matches) return;

    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(panelSelector),
    );
    let frame = 0;

    const update = () => {
      const viewportHeight = Math.max(window.innerHeight, 1);

      panels.forEach((panel, index) => {
        const nextPanel = panels[index + 1];

        if (!nextPanel) {
          panel.style.setProperty('--v11-panel-blur', '0px');
          panel.style.setProperty('--v11-panel-brightness', '1');
          panel.style.setProperty('--v11-panel-saturation', '1');
          return;
        }

        const nextTop = nextPanel.getBoundingClientRect().top;
        const progress = Math.min(
          1,
          Math.max(0, (viewportHeight - nextTop) / (viewportHeight * 0.9)),
        );

        const proximity = Math.pow(progress, 2.2);

        panel.style.setProperty('--v11-panel-blur', `${(proximity * 6).toFixed(2)}px`);
        panel.style.setProperty('--v11-panel-brightness', (1 - proximity * 0.045).toFixed(3));
        panel.style.setProperty('--v11-panel-saturation', (1 - proximity * 0.075).toFixed(3));
      });

      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      panels.forEach((panel) => {
        panel.style.removeProperty('--v11-panel-blur');
        panel.style.removeProperty('--v11-panel-brightness');
        panel.style.removeProperty('--v11-panel-saturation');
      });
    };
  }, []);

  return null;
}
