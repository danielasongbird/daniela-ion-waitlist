'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { submitLead } from '../lib/submitLead';

const waitlistQuestions = [
  'Why does everything have to be perfect before I’ll let anyone see it?',
  'Why can’t I turn my brain off long enough to just create something?',
  'Why don’t I trust myself the way I used to—when I was in my creative flow?',
  'Why does wanting more—more money, more visibility, more life—feel like too much to ask for?',
] as const;

type WaitlistEvent = 'waitlist_nav_click' | 'waitlist_form_start' | 'waitlist_submit_attempt' | 'waitlist_submit_success' | 'waitlist_submit_error';

function trackWaitlistEvent(event: WaitlistEvent, detail: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;

  const payload = { event, waitlist_version: 'v1b', ...detail };
  const analyticsWindow = window as typeof window & { dataLayer?: Array<Record<string, string>> };
  analyticsWindow.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent(`soulportal:${event}`, { detail: payload }));
}

function getWaitlistAttribution() {
  if (typeof window === 'undefined') return { source: '', medium: '', campaign: '' };

  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') ?? '',
    medium: params.get('utm_medium') ?? '',
    campaign: params.get('utm_campaign') ?? '',
  };
}

function WaitlistForm({ dark = false }: { dark?: boolean }) {
  return (
    <form className={`waitlist-form${dark ? ' waitlist-form-dark' : ''}`} onSubmit={(event) => event.preventDefault()}>
      <label className="waitlist-visually-hidden" htmlFor={`waitlist-email-${dark ? 'dark' : 'light'}`}>
        Email address
      </label>
      <input id={`waitlist-email-${dark ? 'dark' : 'light'}`} type="email" inputMode="email" placeholder="Your email address" />
      <button type="submit">
        <span>Join the Soul Portal waitlist</span>
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}

function BoldArrow() {
  return (
    <svg className="waitlist-bold-arrow" aria-hidden="true" viewBox="0 0 26 24" fill="none">
      <path d="M2 12h21M16 5l7 7-7 7" />
    </svg>
  );
}

function SocialIcon({ network }: { network: 'instagram' | 'linkedin' }) {
  if (network === 'instagram') {
    return (
      <svg className="waitlist-social-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle className="waitlist-social-icon-dot" cx="17.4" cy="6.7" r="1" />
      </svg>
    );
  }

  return (
    <svg className="waitlist-social-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7.2v.1M11.5 17v-7M11.5 13.1c.8-2.1 4.5-2.2 4.5 1V17" />
    </svg>
  );
}

export function VersionOne() {
  return (
    <div className="waitlist-concept waitlist-concept-v1">
      <nav className="waitlist-nav waitlist-nav-v1" aria-label="Waitlist navigation">
        <a className="waitlist-wordmark" href="#top">Daniela<span>✦</span></a>
        <p>Mindset · Growth · Expansion</p>
        <a className="waitlist-nav-cta" href="#join">Join the waitlist</a>
      </nav>

      <main className="waitlist-hero waitlist-hero-v1" id="top">
        <section className="waitlist-v1-copy" aria-labelledby="waitlist-v1-title">
          <p className="waitlist-script">The questions beneath the noise</p>
          <h1 id="waitlist-v1-title">{waitlistQuestions[0]}</h1>
          <ol className="waitlist-v1-questions">
            {waitlistQuestions.slice(1).map((question, index) => (
              <li key={question}><span>0{index + 2}</span><p>{question}</p></li>
            ))}
          </ol>
        </section>

        <aside className="waitlist-v1-response" aria-labelledby="waitlist-v1-response-title">
          <p className="waitlist-v1-response-kicker">One signal. Different outfits.</p>
          <h2 id="waitlist-v1-response-title">I don’t think these are random thoughts.</h2>
          <div className="waitlist-v1-response-copy">
            <p>I think they’re the same question wearing different outfits. And I think the answer isn’t more strategy or more hustle. <strong>It’s your frequency, your vibration.</strong> It’s remembering what your soul voice actually sounds like before the noise got so loud.</p>
            <p>That is why I am building something for women who are done performing and ready to be their truest expression of themselves.</p>
          </div>
          <div id="join"><WaitlistForm /></div>
          <small>First one in gets access to something I’m not posting publicly yet.</small>
        </aside>

        <span className="waitlist-v1-orbit" aria-hidden="true" />
      </main>

      <footer className="waitlist-footer waitlist-footer-v1">
        <p>Soul Portal</p>
        <p>Splendour of Unique Love</p>
        <p>© Daniela</p>
      </footer>
    </div>
  );
}

export function VersionTwo() {
  return (
    <div className="waitlist-concept waitlist-concept-v2 concept-v11">
      <nav className="waitlist-nav-v2-final" aria-label="Waitlist navigation">
        <a className="waitlist-wordmark" href="#top-v2">Daniela<span>✦</span></a>
        <p>Soul Portal · Waitlist</p>
        <a href="#join-v2">Private invitation</a>
      </nav>

      <section className="v11-final waitlist-v2-final" id="top-v2" aria-labelledby="waitlist-v2-title">
        <ol className="waitlist-v2-questions" aria-label="The questions beneath the noise">
          {waitlistQuestions.map((question, index) => (
            <li key={question}><span>0{index + 1}</span><p>{question}</p></li>
          ))}
        </ol>

        <div className="v11-final-portal">
          <div className="v11-final-ring v11-final-ring-one" aria-hidden="true" />
          <div className="v11-final-ring v11-final-ring-two" aria-hidden="true" />
          <svg className="v11-final-wave" aria-hidden="true" viewBox="0 0 1200 260" preserveAspectRatio="none">
            <path d="M0 132 C95 132 106 54 190 54 C274 54 276 208 362 208 C448 208 445 76 532 76 C619 76 616 184 704 184 C792 184 786 66 874 66 C962 66 962 196 1048 196 C1134 196 1124 132 1200 132" />
            <path d="M0 150 C98 150 105 82 186 82 C267 82 279 188 358 188 C437 188 447 98 526 98 C605 98 618 166 696 166 C774 166 794 92 870 92 C946 92 966 178 1043 178 C1120 178 1136 150 1200 150" />
          </svg>
          <span className="v11-final-dot v11-final-dot-one" aria-hidden="true" />
          <span className="v11-final-dot v11-final-dot-two" aria-hidden="true" />

          <div className="v11-final-content">
            <p>the portal is open</p>
            <h2 id="waitlist-v2-title">I don’t think these are <em>random thoughts.</em></h2>
            <div className="waitlist-v2-thesis">
              <p>I think they’re the same question wearing different outfits.</p>
              <p>And I think the answer isn’t more strategy or more hustle. <strong>It’s your frequency, your vibration.</strong> It’s remembering what your soul voice actually sounds like before the noise got so loud.</p>
            </div>
            <div className="waitlist-v2-build">That is why I am building something for women who are done performing and ready to be their truest expression of themselves.</div>
            <button className="v11-supporting-cta v11-supporting-cta-final" id="join-v2" type="button">
              <span className="v11-supporting-cta-copy">
                <strong>JOIN THE SOUL PORTAL WAITLIST</strong>
                <small>RESERVE MY PLACE</small>
              </span>
              <span className="v11-supporting-cta-arrow" aria-hidden="true">
                <svg viewBox="0 0 78 42">
                  <path d="M4 29 C17 9 37 8 50 18 C58 24 57 33 50 34 C42 35 38 27 45 21 C53 14 65 17 73 23" />
                  <path d="M66 15 C69 19 71 21 74 23 C70 25 67 28 64 31" />
                </svg>
              </span>
            </button>
            <small className="waitlist-v2-private">First one in gets access to something I’m not posting publicly yet.</small>
          </div>
        </div>
      </section>

      <footer className="waitlist-footer waitlist-footer-v2">
        <p>Daniela ✦</p>
        <p>Soul Portal — Splendour of Unique Love</p>
        <p>Private access · 2026</p>
      </footer>
    </div>
  );
}

export function VersionThree() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const isSubmitting = submissionState === 'submitting';

  function openJoinModal() {
    setSubmissionState('idle');
    setIsJoinModalOpen(true);
  }

  async function handleVersionThreeSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (isSubmitting || !form.reportValidity()) return;

    const formData = new FormData(form);
    setSubmissionState('submitting');
    try {
      await submitLead({
        company: String(formData.get('company') ?? ''),
        consent: formData.get('consent') === 'on',
        email: String(formData.get('email') ?? ''),
        firstName: String(formData.get('name') ?? ''),
        flow: 'waitlist',
        waitlistVersion: 'v3',
      });
      form.reset();
      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
    }
  }

  return (
    <div className="waitlist-concept waitlist-concept-v3 waitlist-v3-palette-v1">
      <nav className="waitlist-nav-v1b" aria-label="Waitlist navigation">
        <a className="waitlist-v1b-program" href="#top-v3">Soul Portal <em>Splendour of Unique Love</em></a>
        <a className="waitlist-v1b-nav-cta" href="#join-v3">Join the Soul Portal waitlist</a>
      </nav>

      <main>
        <section className="waitlist-v3-hero" id="top-v3" aria-labelledby="waitlist-v3-title">
          <div className="waitlist-v3-ring waitlist-v3-ring-one" aria-hidden="true" />
          <div className="waitlist-v3-ring waitlist-v3-ring-two" aria-hidden="true" />
          <svg className="waitlist-v3-wave" aria-hidden="true" viewBox="0 0 1200 260" preserveAspectRatio="none">
            <path d="M0 132 C95 132 106 54 190 54 C274 54 276 208 362 208 C448 208 445 76 532 76 C619 76 616 184 704 184 C792 184 786 66 874 66 C962 66 962 196 1048 196 C1134 196 1124 132 1200 132" />
            <path d="M0 150 C98 150 105 82 186 82 C267 82 279 188 358 188 C437 188 447 98 526 98 C605 98 618 166 696 166 C774 166 794 92 870 92 C946 92 966 178 1043 178 C1120 178 1136 150 1200 150" />
          </svg>
          <span className="waitlist-v3-dot waitlist-v3-dot-one" aria-hidden="true" />
          <span className="waitlist-v3-dot waitlist-v3-dot-two" aria-hidden="true" />
          <p className="waitlist-v1b-kicker">For women who are done performing</p>
          <h1 id="waitlist-v3-title">You don’t need more <span className="waitlist-v3-headline-join">strategy. <span className="waitlist-v3-headline-accent">You need to</span></span><span className="waitlist-v3-headline-accent"> lead with your frequency.</span></h1>
          <p className="waitlist-v3-subheadline">Soul portal is a private invitation for the creative woman. The woman ready to lead with her soul story. The woman ready to finally write her book, record her song, launch her business &amp; create her content - knowing she is more than enough and totally worth more.</p>
          <button className="waitlist-v3-modal-trigger waitlist-v3-hero-trigger" id="join-v3" type="button" onClick={openJoinModal}>
            <span>Enter The Portal</span>
            <BoldArrow />
          </button>
        </section>

        <section className="waitlist-v3-insight" aria-labelledby="waitlist-v3-insight-title">
          <div className="waitlist-v3-questions">
            <p className="waitlist-v1b-kicker">The questions beneath the noise</p>
            <h2 id="waitlist-v3-insight-title">Maybe they aren’t random thoughts.</h2>
            <ol>
              {[
                'Why does everything have to be perfect before I post it, before I put anything out there?',
                'Why do I overthink, overanalyze, and go around in the same loop of perfectionism over and over again?',
                'Why does wanting more money, more visibility, more out of life feel like I’m asking for too much?',
              ].map((question, index) => (
                <li key={question}><span>0{index + 1}</span><p>“{question}”</p></li>
              ))}
            </ol>
          </div>

          <div className="waitlist-v3-answer">
            <p>I think they’re the same question wearing different outfits.</p>
            <p>The answer isn’t more strategy or more hustle.</p>
            <p><strong>It’s your frequency, your vibration.</strong> It’s remembering what your soul voice actually sounds like before the noise got so loud.</p>
            <p className="waitlist-v3-build">That is why I am building something for women who are done performing and ready to be their truest expression of themselves.</p>
            <button className="waitlist-v3-modal-trigger" type="button" onClick={openJoinModal}>
              <span>Join the Soul Portal waitlist</span>
              <BoldArrow />
            </button>
          </div>
        </section>
      </main>

      {isJoinModalOpen && (
        <div className="waitlist-v3-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsJoinModalOpen(false);
        }}>
          <section className="waitlist-v3-modal" role="dialog" aria-modal="true" aria-labelledby="waitlist-v3-modal-title">
            <button className="waitlist-v3-modal-close" type="button" aria-label="Close waitlist form" onClick={() => setIsJoinModalOpen(false)}>×</button>
            {submissionState === 'success' ? (
              <div className="waitlist-v3-success" role="status" aria-live="polite">
                <div className="waitlist-v3-success-mark" aria-hidden="true">
                  <span className="waitlist-v3-success-orbit waitlist-v3-success-orbit-one" />
                  <span className="waitlist-v3-success-orbit waitlist-v3-success-orbit-two" />
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="44" />
                    <path d="M38 61.5 53.5 77 83 43.5" />
                  </svg>
                </div>
                <p className="waitlist-v1b-kicker">The portal remembers you</p>
                <h2 id="waitlist-v3-modal-title">You’re in. Your place is saved.</h2>
                <p>Thank you for saying yes to what is already calling you. Your private invitation is now on its way to your inbox.</p>
                <p className="waitlist-v3-success-script">This is your frequency meeting the moment.</p>
                <button type="button" onClick={() => setIsJoinModalOpen(false)}>Return to the page <BoldArrow /></button>
              </div>
            ) : (
              <>
                <p className="waitlist-v1b-kicker">Your private invitation</p>
                <h2 id="waitlist-v3-modal-title">Join the Soul Portal waitlist.</h2>
                <p>Be first to receive the private reveal and early-access details before they are shared publicly.</p>
                <form aria-busy={isSubmitting} className="waitlist-v3-modal-form" onSubmit={handleVersionThreeSubmit}>
                  <label htmlFor="waitlist-v3-name">First name</label>
                  <input id="waitlist-v3-name" name="name" type="text" autoComplete="given-name" placeholder="Your first name" required />
                  <label htmlFor="waitlist-v3-email">Email address</label>
                  <input id="waitlist-v3-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="Your best email" required />
                  <label className="waitlist-v3-modal-consent">
                    <input name="consent" type="checkbox" required />
                    <span>I agree to receive Soul Portal emails. I can unsubscribe at any time.</span>
                  </label>
                  <input className="waitlist-v1b-honeypot" name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  {submissionState === 'error' && <p className="waitlist-v3-modal-error" role="alert">The portal paused for a moment. Please try again.</p>}
                  <button disabled={isSubmitting} type="submit">{isSubmitting ? 'Saving your place…' : 'Join the Soul Portal waitlist'} <BoldArrow /></button>
                </form>
                <small>Private by design. No spam. Your details are never sold.</small>
              </>
            )}
          </section>
        </div>
      )}

      <section className="waitlist-v1b-founder" aria-labelledby="waitlist-v3-founder-title">
        <div className="waitlist-v1b-founder-image">
          <Image src="/images/daniela2.jpeg" alt="Daniela smiling beside a studio microphone" fill sizes="(max-width: 820px) 100vw, 42vw" />
        </div>
        <div className="waitlist-v1b-founder-copy">
          <p>Hi. I’m Daniela.</p>
          <h2 id="waitlist-v3-founder-title">This is my soul speaking to yours.</h2>
          <p>I know what it’s like to have so much bubbling up inside of you, but to still be playing small. The perfectionism loop is real, and I’ve lived every part of it. Overthinking every word so it doesn’t sound cringey. Wondering what people would think if they saw the real you.</p>
          <p>And this is exactly why a new era has come. A total human renaissance, where women stop performing and start creating from their soul. I built Soul Portal for the woman ready to be part of it, for such a time as this.</p>
          <div className="waitlist-v3-socials" aria-label="Follow Daniela">
            <a href="https://www.instagram.com/thedaniela.ion?igsi=eHNtdm1wcG8ydGZv&amp;utm_source=qr" target="_blank" rel="noreferrer">Instagram <SocialIcon network="instagram" /></a>
            <a href="https://www.linkedin.com/in/danielaion" target="_blank" rel="noreferrer">LinkedIn <SocialIcon network="linkedin" /></a>
          </div>
        </div>
      </section>

      <section className="waitlist-v1b-faq" aria-labelledby="waitlist-v3-faq-title">
        <header>
          <p>Before you join</p>
          <h2 id="waitlist-v3-faq-title">A few honest answers.</h2>
        </header>
        <div className="waitlist-v1b-faq-list">
          <details>
            <summary>What is Soul Portal?</summary>
            <p>Soul Portal: Splendour of Unique Love is a high frequency community. A home, where creative entrepreneurial women are ready to express their full soul story through their products and services in this era of the human renaissance.</p>
          </details>
          <details>
            <summary>Who is it for?</summary>
            <p>It’s for the woman caught between creative desire and the perfectionism spiral, ready to stop overthinking, stop overriding her intuition, and step into her fullest expression. She’s ready to go back into her creative flow, trust her own intuition. Whether it’s publishing the book, recording the song, launching the business, or launching the digital products, she’s ready to do all of it. She’s ready to take on whatever’s held her back from playing small, and meet the highest soul version of herself inside the Soul Portal.</p>
          </details>
          <details>
            <summary>What happens after I join?</summary>
            <p>You will receive Soul Portal updates at the email you provide, including the private first reveal and early-access details when they are ready.</p>
          </details>
          <details>
            <summary>Is joining the waitlist free?</summary>
            <p>Yes. Joining the waitlist is free, and you can unsubscribe from Soul Portal emails at any time.</p>
          </details>
          <details>
            <summary>When will it open?</summary>
            <p>A public opening date has not been announced. Waitlist members will be told first when verified launch details are available.</p>
          </details>
        </div>
        <button className="waitlist-v3-modal-trigger waitlist-v3-faq-trigger" type="button" onClick={openJoinModal}>
          <span>Join the Soul Portal waitlist</span>
          <BoldArrow />
        </button>
      </section>

      <footer className="waitlist-footer waitlist-footer-v1b">
        <p>Soul Portal</p>
        <p>Splendour of Unique Love</p>
        <p>© Daniela</p>
      </footer>
    </div>
  );
}

export function VersionOneB() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [formStarted, setFormStarted] = useState(false);

  async function handleWaitlistSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const attribution = getWaitlistAttribution();

    if (!form.reportValidity()) return;

    trackWaitlistEvent('waitlist_submit_attempt', attribution);

    const endpoint = process.env.NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT;
    if (!endpoint) {
      setFormState('error');
      setFormMessage('This preview still needs its email provider connection.');
      trackWaitlistEvent('waitlist_submit_error', { ...attribution, reason: 'endpoint_not_configured' });
      return;
    }

    setFormState('submitting');
    setFormMessage('');

    try {
      const formData = new FormData(form);
      formData.set('utm_source', attribution.source);
      formData.set('utm_medium', attribution.medium);
      formData.set('utm_campaign', attribution.campaign);
      formData.set('waitlist_version', 'v1b');

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Waitlist request failed');

      form.reset();
      setFormState('success');
      setFormMessage('You’re on the private list. Watch your inbox for what comes next.');
      trackWaitlistEvent('waitlist_submit_success', attribution);
    } catch {
      setFormState('error');
      setFormMessage('That didn’t go through. Please check your email and try again.');
      trackWaitlistEvent('waitlist_submit_error', { ...attribution, reason: 'provider_request_failed' });
    }
  }

  return (
    <div className="waitlist-concept waitlist-concept-v1b">
      <nav className="waitlist-nav-v1b" aria-label="Waitlist navigation">
        <a className="waitlist-v1b-program" href="#top-v1b">Soul Portal <em>Splendour of Unique Love</em></a>
        <a className="waitlist-v1b-nav-cta" href="#join-v1b" onClick={() => trackWaitlistEvent('waitlist_nav_click', getWaitlistAttribution())}>Join the Soul Portal waitlist</a>
      </nav>

      <main className="waitlist-hero-v1b" id="top-v1b">
        <section className="waitlist-v1b-story" aria-labelledby="waitlist-v1b-title">
          <p className="waitlist-v1b-kicker">For women who are done performing</p>
          <h1 id="waitlist-v1b-title">
            You don’t need more<br className="waitlist-v1b-headline-break" />
            <span className="waitlist-v1b-headline-bridge">strategy, <em>You need to</em></span><span className="waitlist-v1b-headline-accent"> hear your own voice again.</span>
          </h1>
          <p className="waitlist-v1b-deck">If you keep waiting until it’s perfect, overthinking every word, or wondering where your creative flow went—you’re not broken. You’re buried under the noise. <strong>Soul Portal is a private seven-minute audio experience designed to shift your frequency, quiet the noise, and help you hear what is already yours.</strong></p>

          <ul className="waitlist-v1b-signals" aria-label="Signs Soul Portal may be for you">
            <li><span aria-hidden="true">01</span> Waiting until it feels perfect</li>
            <li><span aria-hidden="true">02</span> Thinking instead of creating</li>
            <li><span aria-hidden="true">03</span> Wanting more, then making it wrong</li>
          </ul>

          <p className="waitlist-v1b-turn">These aren’t random thoughts. They’re the same question wearing different outfits.</p>
        </section>

        <aside className="waitlist-v1b-card" aria-labelledby="waitlist-v1b-card-title">
          <p className="waitlist-v1b-script">be first through the door</p>
          <h2 id="waitlist-v1b-card-title">Join the Soul Portal waitlist.</h2>
          <p className="waitlist-v1b-card-copy">Be first to receive the private Soul Portal reveal before I share it publicly—and hear when early access opens.</p>

          <div className="waitlist-v1b-value">
            <p>Joining the private list means:</p>
            <ul>
              <li><span>✦</span> The private first reveal before public launch</li>
              <li><span>✦</span> Early-access details delivered to your inbox</li>
            </ul>
          </div>

          <form className="waitlist-v1b-form" id="join-v1b" onSubmit={handleWaitlistSubmit} noValidate>
            <label htmlFor="waitlist-email-v1b">Where should I send your private invitation?</label>
            <input
              id="waitlist-email-v1b"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Enter your best email"
              aria-describedby="waitlist-v1b-consent waitlist-v1b-status"
              onFocus={() => {
                if (!formStarted) {
                  setFormStarted(true);
                  trackWaitlistEvent('waitlist_form_start', getWaitlistAttribution());
                }
              }}
              required
            />
            <input className="waitlist-v1b-honeypot" name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button type="submit" disabled={formState === 'submitting'}>
              <span>{formState === 'submitting' ? 'Joining the private list…' : 'Join the Soul Portal waitlist'}</span>
              <BoldArrow />
            </button>
          </form>

          <p className="waitlist-v1b-trust" id="waitlist-v1b-consent"><span aria-hidden="true">◌</span> Private by design. By joining, you agree to receive Soul Portal emails. No spam. Unsubscribe anytime. <a href="/privacy">Privacy</a>.</p>
          <p className={`waitlist-v1b-status waitlist-v1b-status-${formState}`} id="waitlist-v1b-status" role="status" aria-live="polite">{formMessage}</p>
        </aside>
      </main>

      <section className="waitlist-v1b-founder" aria-labelledby="waitlist-v1b-founder-title">
        <div className="waitlist-v1b-founder-image">
          <Image src="/images/daniela2.jpeg" alt="Daniela smiling beside a studio microphone" fill sizes="(max-width: 820px) 100vw, 42vw" />
        </div>
        <div className="waitlist-v1b-founder-copy">
          <p>A note from Daniela</p>
          <h2 id="waitlist-v1b-founder-title">This is my soul speaking to yours.</h2>
          <p>I know what it’s like to have so much bubbling up inside of you, but to play small in releasing it. To overthink every word so it doesn’t sound cringey. To wonder what everyone would think if they saw the real you.</p>
          <p>I created Soul Portal for the woman who is ready to stop creating for approval and start creating because it feels like coming home. Everything you need is already inside you.</p>
        </div>
      </section>

      <section className="waitlist-v1b-faq" aria-labelledby="waitlist-v1b-faq-title">
        <header>
          <p>Before you join</p>
          <h2 id="waitlist-v1b-faq-title">A few honest answers.</h2>
        </header>
        <div className="waitlist-v1b-faq-list">
          <details>
            <summary>What is Soul Portal?</summary>
            <p>Soul Portal: Splendour of Unique Love is a private seven-minute audio experience being created to help you quiet external noise, reconnect with your own voice, and hear the next honest move that already feels like yours.</p>
          </details>
          <details>
            <summary>Who is it for?</summary>
            <p>It is for women who feel caught between creative desire and perfectionism—especially when overthinking, visibility, or other people’s opinions make their own voice harder to hear.</p>
          </details>
          <details>
            <summary>What happens after I join?</summary>
            <p>You will receive Soul Portal updates at the email you provide, including the private first reveal and early-access details when they are ready.</p>
          </details>
          <details>
            <summary>Is joining the waitlist free?</summary>
            <p>Yes. Joining the waitlist is free, and you can unsubscribe from Soul Portal emails at any time.</p>
          </details>
          <details>
            <summary>When will it open?</summary>
            <p>A public opening date has not been announced. Waitlist members will be told first when verified launch details are available—without a fake countdown or manufactured deadline.</p>
          </details>
        </div>
        <a className="waitlist-v1b-faq-cta" href="#join-v1b">Join the Soul Portal waitlist <BoldArrow /></a>
      </section>

      <footer className="waitlist-footer waitlist-footer-v1b">
        <p>Soul Portal</p>
        <p>Splendour of Unique Love</p>
        <p><a href="/privacy">Privacy</a> · © Daniela</p>
      </footer>
    </div>
  );
}

export default function WaitlistConcepts() {
  return <VersionThree />;
}
