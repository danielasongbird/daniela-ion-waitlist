import Link from 'next/link';

import ConceptSwitcher from '../ConceptSwitcher';
import SoulQuizModal from '../SoulQuizModal';
import SoulQuizTrigger from '../SoulQuizTrigger';
import { landingContent as copy } from '../landingContent';

export default function V6Page() {
  return (
    <main className="concept-page concept-v6">
      <ConceptSwitcher current="V6" />
      <aside className="v6-fomo" aria-label="Free audio announcement">
        <p><strong>{copy.noticeLead}</strong> {copy.notice}</p>
        <SoulQuizTrigger>Receive the ritual</SoulQuizTrigger>
      </aside>
      <header className="v6-nav">
        <Link className="v6-logo" href="/">daniela</Link>
        <p>Mindset &middot; Growth &middot; Expansion</p>
        <div><a href="#">Soul Portal</a><SoulQuizTrigger>{copy.navCta}</SoulQuizTrigger></div>
      </header>
      <section className="v6-hero" aria-labelledby="v6-title">
        <div className="v6-portrait" role="img" aria-label="Close portrait of Daniela"><span>come home to yourself</span></div>
        <div className="v6-story">
          <span className="v6-sun" aria-hidden="true" />
          <p className="v6-eyebrow">A private seven-minute ritual</p>
          <h1 id="v6-title">{copy.title}</h1>
          <p className="v6-accent">{copy.accent}</p>
          <p className="v6-deck">{copy.deck}</p>
          <div className="v6-ritual"><span>01</span><p>Pause. Press play. Let your own signal become louder than the noise.</p></div>
          <SoulQuizTrigger className="v6-primary">{copy.cta}</SoulQuizTrigger>
          <small>{copy.note}</small>
        </div>
      </section>
      <div className="v6-whisper"><span>Nothing to fix.</span><em>Something to remember.</em></div>
      <footer className="v6-footer">
        <Link className="v6-logo" href="/">daniela</Link><p>{copy.footer}</p><p>&copy; {new Date().getFullYear()}</p>
      </footer>
      <SoulQuizModal />
    </main>
  );
}
