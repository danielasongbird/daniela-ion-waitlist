import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://soul-portal.p-burmesterm.workers.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Soul Portal | Splendour of Unique Love',
  description: 'A private seven-minute audio experience for women ready to hear their own voice and unlock what is already within them.',
  openGraph: {
    title: 'Soul Portal | Splendour of Unique Love',
    description: 'Seven minutes to quiet the noise, hear what is yours, and return to your truest expression.',
    type: 'website',
    url: siteUrl,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Soul Portal — Splendour of Unique Love' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soul Portal | Splendour of Unique Love',
    description: 'Seven minutes to quiet the noise, hear what is yours, and return to your truest expression.',
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
