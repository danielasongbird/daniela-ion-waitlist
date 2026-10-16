'use client';

import { Fragment, useState, type ReactNode } from 'react';

type Version = { name: string; node: ReactNode };

// Floating menu for comparing design versions of one section. Remove once a version is picked.
// `side` lets multiple section menus share the bottom overlay without colliding.
export default function VersionSwitcher({ label, versions, initial = 0, side }: { label: string; versions: Version[]; initial?: number; side?: 'left' | 'right' }) {
  const [active, setActive] = useState(initial);

  return (
    <>
      {/* Keyed so each switch remounts the section instead of React reusing matching elements */}
      <Fragment key={active}>{versions[active].node}</Fragment>
      <nav className={`vs-menu${side ? ` vs-${side}` : ''}`} aria-label={`${label} design versions`}>
        <span className="vs-label">{label}</span>
        {versions.map((version, index) => (
          <button
            aria-pressed={index === active}
            className={index === active ? 'is-active' : undefined}
            key={version.name}
            onClick={() => setActive(index)}
            type="button"
          >
            {version.name}
          </button>
        ))}
      </nav>
    </>
  );
}


