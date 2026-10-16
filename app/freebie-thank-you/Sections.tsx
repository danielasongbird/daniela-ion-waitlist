import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import { checkoutHref, Todo } from '../edge-activation-handoff/Shared';
import { TextGenerate } from '../edge-activation-welcome/Effects';
import { portalHref } from '../edge-activation-welcome/content';
import { bonuses, offer, pullQuote, socials, surprise, testimonial, whyNow } from './content';

function CtaArrow() {
  return (
    <svg viewBox="0 0 78 42">
      <path d="M4 29 C17 9 37 8 50 18 C58 24 57 33 50 34 C42 35 38 27 45 21 C53 14 65 17 73 23" />
      <path d="M66 15 C69 19 71 21 74 23 C70 25 67 28 64 31" />
    </svg>
  );
}

// The $27 button with the PDF's subtext; microcopy is passed in because it differs per section.
export function BuyButton({ microcopy }: { microcopy: string }) {
  return (
    <div className="hb-cta v11-hero-cta-wrap ft-buy">
      <a className="v11-hero-cta-final hw-shimmer-cta" href={checkoutHref}>
        <span className="v11-hero-cta-copy">
          <strong>YES, I WANT THE EDGE ACTIVATION FOR $27</strong>
          <small>ONE PAYMENT · NO SUBSCRIPTION</small>
        </span>
        <span className="v11-hero-cta-arrow" aria-hidden="true"><CtaArrow /></span>
      </a>
      <p>{microcopy}</p>
    </div>
  );
}

// Section 4: why now. Heading pinned beside the argument; the pull quote writes itself in (#09).
export function WhyNow() {
  return (
    <section className="hb-band hb-cream ft-what">
      <span className="ft-what-mark" aria-hidden="true">Edge</span>
      <div className="hb-inner ft-what-grid">
        <div className="ft-what-head bf">
          <p className="hb-kicker">why now</p>
          <h2>The Human Renaissance is asking for <em>your Edge</em></h2>
        </div>
        <div className="ft-what-body">
          {whyNow.map((paragraph, index) => (
            <p key={index} className="bf" style={{ '--delay': `${0.08 * index}s` } as CSSProperties}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="hb-inner">
        <TextGenerate className="ft-what-closing" text={pullQuote} />
      </div>
    </section>
  );
}

// Section 6: social proof. The pull line leads large; the full quote and attribution sit beneath.
export function Testimonial() {
  return (
    <section className="hb-band hb-plum ft-proof">
      <div className="hb-inner ft-proof-inner">
        <p className="hb-kicker bf">{testimonial.eyebrow}</p>
        <p className="ft-proof-pull bf" style={{ '--delay': '.1s' } as CSSProperties}>{testimonial.pull}</p>
        <figure className="bf" style={{ '--delay': '.2s' } as CSSProperties}>
          <blockquote>{testimonial.quote}</blockquote>
          <figcaption>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

const bonusIcons: ReactNode[] = [
  <svg key="a" viewBox="0 0 32 32"><path d="M4 16h4l3-7 5 14 4-10 3 3h5" /></svg>,
  <svg key="b" viewBox="0 0 32 32"><path d="M16 3l3.5 8.5L28 13l-6.5 5.5L23.5 28 16 23l-7.5 5 2-9.5L4 13l8.5-1.5z" /></svg>,
  <svg key="c" viewBox="0 0 32 32"><rect x="7" y="5" width="18" height="23" rx="2" /><path d="M12 5V3h8v2M11 13l2 2 4-4M11 21h10" /></svg>,
  <svg key="d" viewBox="0 0 32 32"><rect x="11" y="3" width="10" height="17" rx="5" /><path d="M6 15a10 10 0 0 0 20 0M16 25v4M11 29h10" /></svg>,
];

// Section 7: four bonus cards blur-fading in turn, then the Day Five surprise, still sealed.
export function Bonuses() {
  return (
    <section className="hb-band ft-bonus">
      <div className="hb-inner">
        <div className="ft-bonus-head bf">
          <p className="hb-kicker">your bonuses</p>
          <h2>Also waiting for you <em>inside Soul Portal</em></h2>
        </div>
        <ol className="ft-bonus-grid">
          {bonuses.map((bonus, index) => (
            <li key={bonus.name} className="bf" style={{ '--delay': `${0.1 * index}s` } as CSSProperties}>
              <span className="ft-bonus-icon" aria-hidden="true">{bonusIcons[index]}</span>
              <small>Bonus 0{index + 1}</small>
              <h3>{bonus.name}</h3>
              <p>{bonus.text}</p>
            </li>
          ))}
        </ol>
        <div className="ft-surprise bf">
          <span className="ft-surprise-seal" aria-hidden="true">✦</span>
          <p>{surprise}</p>
        </div>
      </div>
    </section>
  );
}

// Section 10: the final offer stack. The $27 buttons elsewhere scroll here (#checkout) until checkout is live.
export function Offer() {
  return (
    <section className="hb-band hb-peach ft-offer">
      <span className="ft-offer-ring is-1" aria-hidden="true" />
      <span className="ft-offer-ring is-2" aria-hidden="true" />
      <div className="hb-inner">
        <div className="ft-offer-card bf" id="checkout">
          <p className="ft-offer-name">{offer.eyebrow}</p>
          <h2>{offer.heading}</h2>
          <ul>
            {offer.items.map((item) => {
              const [label, rest] = item.startsWith('Bonus: ') ? ['Bonus', item.slice(7)] : [null, item];
              return <li key={item}>{label && <b>{label}</b>}{rest}</li>;
            })}
          </ul>
          <p className="ft-offer-price"><span>$27</span>{offer.underPrice}</p>
          <p className="ft-offer-proof">{testimonial.pull} <span>{testimonial.name}</span></p>
          <p className="ft-offer-line">{offer.lineAbove}</p>
          <BuyButton microcopy={offer.microcopy} />
          <a className="ft-offer-decline" href={portalHref}>{offer.decline}</a>
        </div>
      </div>
    </section>
  );
}

const icons = {
  substack: <svg viewBox="0 0 24 24"><path d="M5 4h14M5 8h14M5 12h14v9l-7-4-7 4z" /></svg>,
  instagram: <svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17 7v.1" /></svg>,
  linkedin: <svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 10v7M8 7.2v.1M11.5 17v-7M11.5 13.1c.8-2.1 4.5-2.2 4.5 1V17" /></svg>,
};

// Instagram and LinkedIn are the links already used on the home page; the Substack link is still to come.
export const socialLinks = [
  { network: 'Substack', handle: 'Soul Transmissions', href: '#soul-transmissions', icon: icons.substack },
  { network: 'Instagram', handle: '@thedaniela.ion', href: 'https://www.instagram.com/thedaniela.ion', icon: icons.instagram },
  { network: 'LinkedIn', handle: 'Daniela Ion', href: 'https://www.linkedin.com/in/danielaion', icon: icons.linkedin },
];

// Section 11: footer + socials. Every link opens in a new tab.
export function SocialsFooter() {
  return (
    <footer className="ft-footer">
      <div className="hb-inner ft-footer-inner">
        <Link className="hb-logo" href="/">Daniela<span>✦</span></Link>
        <p className="hb-kicker">{socials.eyebrow}</p>
        <h2>{socials.heading}</h2>
        <p className="ft-footer-body">{socials.body}</p>
        <ul className="ft-socials">
          {socialLinks.map((link) => (
            <li key={link.network}>
              <a href={link.href} target="_blank" rel="noreferrer">
                <span className="ft-social-icon" aria-hidden="true">{link.icon}</span>
                <span><small>{link.network}</small>{link.handle}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="hw-hero-todo"><Todo>Substack link for Soul Transmissions. Add any other platforms Daniela wants listed.</Todo></p>
        <p className="ft-footer-legal">&copy; Daniela Ion · Soul Portal</p>
      </div>
    </footer>
  );
}








