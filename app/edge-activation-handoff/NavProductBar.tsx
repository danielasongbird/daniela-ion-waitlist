'use client';

import { useEffect, useState } from 'react';

const checkoutHref = process.env.NEXT_PUBLIC_EDGE_CHECKOUT_URL || '#checkout';

// Sticky product bar with reading progress (picked in design round 2)
export function NavProductBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="hb-nv3">
      <div className="hb-nv3-inner">
        <div className="hb-nv3-brand">
          <span className="hb-logo">Daniela<span>✦</span></span>
          <span className="hb-nv3-divider" aria-hidden="true" />
          <span className="hb-nv3-product">The Edge Activation</span>
        </div>
        <div className="hb-nv3-buy">
          <span className="hb-nv3-price">$27 <small>one payment</small></span>
          <a href={checkoutHref}>Yes, I want it</a>
        </div>
      </div>
      <span className="hb-nv3-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}
