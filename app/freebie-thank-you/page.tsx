import type { Metadata } from 'next';
import { BlurFadeRuntime, ScrollProgress } from '../edge-activation-welcome/Effects';
import { WelcomeDays, WelcomeNote, WelcomePortal } from '../edge-activation-welcome/Welcome';
import { days, daysIntro, note, noteLead, portalBody } from './content';
import VersionSwitcher from '../edge-activation-handoff/VersionSwitcher';
import { Hero } from './Hero';
import { PortalVersion } from './PortalVersion';
import { Bonuses, BuyButton, Offer, SocialsFooter, Testimonial, WhyNow } from './Sections';
import '../edge-activation-handoff/handoff.css';
import '../edge-activation-handoff/mobile.css';
import '../edge-activation-welcome/welcome.css';
import '../edge-activation-welcome/hero.css';
import '../edge-activation-welcome/effects.css';
import './freebie.css';
import './portal.css';
import './why-rows.css';
import './why-waves.css';
import './days.css';
import './bonus.css';
import './home.css';
import './note-versions.css';
import './order.css';

export const metadata: Metadata = {
  title: 'Your free activation is on its way',
  description: 'Your Creative Intuition Activation is on its way. Here’s what comes next: The Edge Activation.',
  robots: { index: false, follow: false },
};

// Freebie thank-you page: confirms the opt-in, then offers The Edge Activation ($27 tripwire).
// Running order and copy from "Tripwire update.pdf". V1 is the brand-style page (the five days,
// Soul Portal and note reuse the welcome page's sections); V2 is the same copy in the dark
// "portal access" style the client liked. The floating menu switches between them.
function BrandVersion() {
  return (
    <main className="hb hb-hide-notes hw ft">
      <Hero />
      <WhyNow />
      <WelcomeDays items={days} intro={daysIntro} after={<BuyButton microcopy="One payment. No subscription. Day One is waiting the moment you’re in." />} />
      <Testimonial />
      <Bonuses />
      <WelcomePortal action={null} body={portalBody} />
      <WelcomeNote lead={noteLead} paragraphs={note} home="Welcome home," />
      <Offer />
      <SocialsFooter />
      <BlurFadeRuntime />
    </main>
  );
}

export default function FreebieThankYouPage() {
  return (
    <>
      <ScrollProgress />
      <VersionSwitcher
        label="Page style"
        initial={1}
        versions={[
          { name: 'V1 · brand', node: <BrandVersion /> },
          { name: 'V2 · portal', node: <PortalVersion /> },
        ]}
      />
    </>
  );
}


















