import type { Metadata } from 'next';
import { Bullets } from './Bullets';
import { ConfirmBar } from './ConfirmBar';
import { Contrast } from './Contrast';
import { Demo } from './Demo';
import { Faq } from './Faq';
import { Final } from './Final';
import { Future } from './Future';
import { Guarantee } from './Guarantee';
import { Hero } from './Hero';
import { Intro } from './Intro';
import { MarketShift } from './MarketShift';
import { Mechanism } from './Mechanism';
import { NavProductBar } from './NavProductBar';
import { Objection } from './Objection';
import { Offer } from './Offer';
import { OldBelief } from './OldBelief';
import { Podcast } from './Podcast';
import { Problem } from './Problem';
import { Proof } from './Proof';
import { Reasons } from './Reasons';
import { Spiritual } from './Spiritual';
import './handoff.css';
import './demo.css';
import './intro.css';
import './bullets.css';
import './future.css';
import './objection.css';
import './spiritual.css';
import './podcast.css';
import './offer.css';
import './guarantee.css';
import './contrast.css';
import './final.css';
import './faq.css';
import './torn.css';
import './hero.css';
import './market-shift.css';
import './mechanism.css';
import './old-belief.css';
import './problem.css';
import './proof.css';
import './reasons.css';
import './mobile.css';

export const metadata: Metadata = {
  title: 'The Edge Activation Handoff',
  description: 'Working sales page copy for The Edge Activation, organised by the direct-response sales page SOP.',
  robots: { index: false, follow: false },
};

export default function EdgeActivationHandoffPage() {
  return (
    <main className="hb hb-hide-notes">
      {/* Section 1, part one: the opt-in confirmation bar */}
      <ConfirmBar />
      <NavProductBar />

      <div className="hb-doc-notes hb-note">
        <div className="hb-inner">
          <p><strong>Working copy.</strong> Sections follow Part 24 of the direct-response sales page SOP; each tag shows the section’s job. Product facts come from The-Edge-Activation-Handoff.docx, and from the September tripwire running order where the .docx is silent. <mark className="hb-todo">[Yellow]</mark> marks something only Daniela can supply or confirm. Nothing in yellow should go live as written.</p>
        </div>
      </div>

      {/* Sections 1 to 3: hero */}
      <Hero />

      {/* Section 4 */}
      <Proof />

      {/* Section 5 */}
      <Problem />

      {/* Section 6 */}
      <OldBelief />

      {/* Section 7 */}
      <MarketShift />

      {/* Section 8 */}
      <Mechanism />

      {/* Section 9 */}
      <Reasons />

      {/* Section 10 */}
      <Demo />

      {/* Section 11 */}
      <Intro />

      {/* Section 12 */}
      <Bullets />

      {/* Section 13 */}
      <Future />

      {/* Section 14 */}
      <Objection />

      {/* Section 15 (proof) removed for now: no testimonials yet */}

      {/* Section 16 */}
      <Spiritual />

      {/* Section 17 */}
      <Podcast />

      {/* Sections 18 and 19: value, price */}
      <Offer />

      {/* Sections 20 and 21: guarantee, next steps */}
      <Guarantee />

      {/* Section 23 */}
      <Contrast />

      {/* Section 24 */}
      <Final />

      {/* Section 22: FAQ, moved to sit last before the footer */}
      <Faq />

      <footer className="hb-footer">
        <span className="hb-logo">Daniela<span>✦</span></span>
        <p>Soul Portal · Splendour of Unique Love</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}











