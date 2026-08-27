import Link from 'next/link';

import ConceptSwitcher from '../ConceptSwitcher';
import SoulQuizModal from '../SoulQuizModal';
import SoulQuizTrigger from '../SoulQuizTrigger';
import { landingContent as copy } from '../landingContent';

export default function V9Page() {
  return (
    <main className="concept-page concept-v9">
      <ConceptSwitcher current="V9" />
      <aside className="v9-fomo" aria-label="Free audio announcement"><p>{copy.noticeLead} <strong>{copy.notice}</strong></p><SoulQuizTrigger>Listen inward</SoulQuizTrigger></aside>
      <header className="v9-nav"><Link className="v9-logo" href="/">DANIELA /</Link><p>Spiritual direction for the life in front of you.</p><div><a href="#">Soul Portal</a><SoulQuizTrigger>{copy.navCta}</SoulQuizTrigger></div></header>
      <section className="v9-hero" aria-labelledby="v9-title">
        <div className="v9-heading">
          <p className="v9-eyebrow">A seven-minute love directive</p>
          <h1 id="v9-title">{copy.title}</h1>
          <p className="v9-accent">{copy.accent}</p>
        </div>
        <div className="v9-lower">
          <div className="v9-offer">
            <span className="v9-index">01 / PRESS PLAY</span>
            <p className="v9-deck">{copy.deck}</p>
            <blockquote>Not another answer. A clearer relationship with your own.</blockquote>
            <SoulQuizTrigger>{copy.cta} <span aria-hidden="true">&rarr;</span></SoulQuizTrigger>
            <small>{copy.note}</small>
          </div>
          <div className="v9-photo" role="img" aria-label="Cinematic close portrait of Daniela"><span>07</span><small>MINUTES TO YOURSELF</small></div>
        </div>
      </section>
      <footer className="v9-footer"><Link className="v9-logo" href="/">DANIELA /</Link><p>{copy.footer}</p><p>&copy; {new Date().getFullYear()}</p></footer>
      <SoulQuizModal />
    </main>
  );
}
