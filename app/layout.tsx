import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://waitlist.danielaion.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Soul Portal | Splendour of Unique Love',
  description: 'A private invitation for creative women ready to lead with their soul story and their truest expression.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Soul Portal | Splendour of Unique Love',
    description: 'A private invitation for creative women ready to lead with their soul story and their truest expression.',
    type: 'website',
    url: siteUrl,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Soul Portal — Splendour of Unique Love' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soul Portal | Splendour of Unique Love',
    description: 'A private invitation for creative women ready to lead with their soul story and their truest expression.',
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
