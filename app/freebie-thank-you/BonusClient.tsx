'use client';

import { useState } from 'react';
import { BonusIcon, GiftIcon } from './BonusIcons';
import { bonuses, surprise } from './content';

// V2 bonuses (bonuses round, version 2): an editorial index. Big numbered rows; opening one slides its description
// and hand-drawn icon out underneath. The surprise is the last row and stays sealed. The open row is
// marked with data-open, not a class, so re-renders keep the reveal runtime's .in class.
export function BonusIndex() {
  const [open, setOpen] = useState(0);

  return (
    <ol className="pv-bz2">
      {bonuses.map((bonus, index) => (
        <li key={bonus.name} className="pv-rv" data-open={open === index || undefined}>
          <h3>
            <button type="button" aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}>
              <span className="pv-bz2-num">0{index + 1}</span>
              <span className="pv-bz2-title">{bonus.name}</span>
              <span className="pv-bz2-toggle" aria-hidden="true" />
            </button>
          </h3>
          <div className="pv-bz2-panel">
            <div className="pv-bz2-panel-inner">
              <p>{bonus.text}</p>
              <BonusIcon index={index} className="is-large" />
            </div>
          </div>
        </li>
      ))}
      <li className="pv-bz2-surprise pv-rv">
        <span className="pv-bz2-num">✦</span>
        <p>{surprise}</p>
        <GiftIcon />
      </li>
    </ol>
  );
}

