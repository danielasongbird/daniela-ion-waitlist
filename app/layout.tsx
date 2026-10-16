import type { Metadata } from 'next';
import './globals.css';
import { siteUrl } from './site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Soul Portal | Splendour of Unique Love',
  description: 'The Creative Intuition Activation: a free 11-minute guided audio for creative women whose work keeps getting stuck behind perfectionism.',
  openGraph: {
    title: 'Soul Portal | Splendour of Unique Love',
    description: 'Your overthinking is the doorway back to your creative flow. This free 11-minute audio walks you through it.',
    type: 'website',
    url: siteUrl,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Soul Portal — Splendour of Unique Love' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soul Portal | Splendour of Unique Love',
    description: 'Your overthinking is the doorway back to your creative flow. This free 11-minute audio walks you through it.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
