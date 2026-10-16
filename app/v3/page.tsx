import type { Metadata } from 'next';
import { VersionThree } from '../waitlist/WaitlistConcepts';
import '../waitlist/waitlist.css';

export const metadata: Metadata = {
  alternates: { canonical: '/waitlist' },
  robots: { index: false, follow: false },
};

export default function V3Page() {
  return <VersionThree />;
}
