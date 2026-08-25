'use client';

import { FormEvent, useState } from 'react';

export default function Home() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="page-shell">
      <aside className="fomo-bar" aria-label="Free meditation announcement">
        <p><strong>Before your next scroll:</strong> hear what you have been trying to tell yourself.</p>
        <a href="#freebie-form">Listen free</a>
      </aside>

      <nav className="navigation" aria-label="Primary navigation">
        <a className="wordmark" href="#" aria-label="Daniela home">Daniela<span>.</span></a>
        <div className="nav-actions">
          <a className="email-link" href="mailto:hello@daniela.com">Email</a>
          <a className="nav-button" href="#freebie-form">Get the meditation</a>
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-card">
          <div className="hero-copy">
            <p className="eyebrow">A free creative authority reset</p>
            <h1 id="hero-title">You&apos;ve heard everyone else.<em>Now hear yourself.</em></h1>
            <p className="subheadline">
              A short guided meditation for women entrepreneurs who are tired of
              overthinking, second-guessing, and creating from everybody else&apos;s rules.
            </p>
            <ul className="benefits">
              <li>Turn down the noise of AI, algorithms, and endless advice.</li>
              <li>Bring one question and reconnect with your own signal.</li>
              <li>Leave with one grounded next step that feels like yours.</li>
            </ul>
          </div>

          <form id="freebie-form" className="optin-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label>Name<input name="name" type="text" autoComplete="name" placeholder="First name" required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
            </div>
            <button type="submit">Send me the free meditation</button>
            <p className="form-note">Free guided audio. No noise, no spam. Unsubscribe anytime.</p>
            {submitted && <p className="form-status" role="status">Your place is reserved. Email delivery will be connected before launch.</p>}
          </form>

          <p className="card-mark" aria-hidden="true">listen inward</p>
        </div>
      </section>

      <footer className="footer">
        <a className="wordmark footer-mark" href="#" aria-label="Daniela home">Daniela<span>.</span></a>
        <p>Creative authority for women who lead.</p>
        <p>&copy; {new Date().getFullYear()} Daniela</p>
      </footer>
    </main>
  );
}
