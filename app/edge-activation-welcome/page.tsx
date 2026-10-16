import type { Metadata } from 'next';
import { BlurFadeRuntime, ScrollProgress } from './Effects';
import { Hero } from './Hero';
import {
  WelcomeDays,
  WelcomeFaq,
  WelcomeNote,
  WelcomePortal,
  WelcomeSteps,
} from './Welcome';
import '../edge-activation-handoff/handoff.css';
import '../edge-activation-handoff/mobile.css';
import './welcome.css';
import './hero.css';
import './effects.css';

export const metadata: Metadata = {
  title: 'Welcome to The Edge Activation',
  description: 'You’re in. Here’s how to start Day One of The Edge Activation.',
  robots: { index: false, follow: false },
};

// Post-purchase thank-you page for The Edge Activation ($27).
export default function EdgeActivationWelcomePage() {
  return (
    <main className="hb hb-hide-notes hw">
      <ScrollProgress />
      <Hero />
      <WelcomeSteps />
      <WelcomeDays />
      <WelcomeNote />
      <WelcomePortal />
      <WelcomeFaq />

      <footer className="hb-footer">
        <span className="hb-logo">Daniela<span>✦</span></span>
        <p>Soul Portal · Splendour of Unique Love</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
      <BlurFadeRuntime />
    </main>
  );
}
