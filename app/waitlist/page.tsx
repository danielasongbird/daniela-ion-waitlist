import type { Metadata } from 'next';
import WaitlistConcepts from './WaitlistConcepts';
import './waitlist.css';

export const metadata: Metadata = { alternates: { canonical: '/waitlist' } };

export default function WaitlistPage() {
  return <WaitlistConcepts />;
}
