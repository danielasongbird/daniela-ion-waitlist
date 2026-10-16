'use client';

import { useEffect } from 'react';

// V2 reveals: anything with .pv-rv rises into focus the first time it scrolls into view,
// and step bars (.pv-steps) fill segment by segment. Mounted with V2, so it re-runs when the page
// version switches; a MutationObserver also picks up elements swapped in by a section's version menu.
export function PortalRuntime() {
  useEffect(() => {
    const root = document.querySelector('.pv');
    if (!root) return;
    root.classList.add('pv-ready');
    const selector = '.pv-rv, .pv-steps';
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }),
      { rootMargin: '0px 0px -60px 0px' },
    );
    const watch = (scope: Element) => scope.querySelectorAll<HTMLElement>(selector).forEach((el) => {
      if (!el.classList.contains('in')) observer.observe(el);
    });
    watch(root);
    const mutations = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches(selector)) observer.observe(node);
      watch(node);
    })));
    mutations.observe(root, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}





