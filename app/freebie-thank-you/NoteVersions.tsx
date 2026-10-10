import type { ReactNode } from 'react';
import { note, noteLead } from './content';

// The selected stationery note, without the discarded design variations.

const photoLabel = 'Daniela smiling in a lilac blazer';
// The last paragraph of the note is its closing line
const body = note.slice(0, -1);
const closing = note[note.length - 1];

function SignOff({ className = '' }: { className?: string }) {
  return (
    <div className={`pv-nt-sign ${className}`}>
      <em>Welcome home,</em>
      <span>Daniela</span>
      <svg className="pv-nt-swash" viewBox="0 0 220 30" aria-hidden="true">
        <path pathLength="1" d="M4 20 Q40 4 80 16 T150 14 Q190 10 216 22" />
      </svg>
    </div>
  );
}

// Version 1: letter on stationery. A cream letter on blush with the spiral pattern, her round
// portrait overlapping the top like a seal, a swash drawing itself under the signature.
function Stationery() {
  return (
    <section className="pv-band pv-note pv-nt1">
      <div className="pv-inner">
        <article className="pv-nt1-paper pv-rv">
          <span className="pv-nt1-seal" role="img" aria-label={photoLabel} />
          <p className="pv-label">A note from Daniela</p>
          <p className="pv-nt-lead">{noteLead}</p>
          <p className="pv-nt1-mark" aria-hidden="true"><span />✦<span /></p>
          {body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="pv-nt-closing">{closing}</p>
          <SignOff />
        </article>
      </div>
    </section>
  );
}

export function NoteVersions(): ReactNode {
  return (
    <Stationery />
  );
}
