import type { Metadata } from 'next';
import { Caveat, Crimson_Text, Mozilla_Text } from 'next/font/google';
import './globals.css';

const caveat = Caveat({ variable: '--font-caveat', subsets: ['latin'], display: 'swap' });
const crimson = Crimson_Text({
  variable: '--font-crimson-text',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const mozilla = Mozilla_Text({ variable: '--font-mozilla-text', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://daniela-hear-yourself.hearty-shark-4784.chatgpt.site'),
  title: 'Hear Yourself | A Free Creative Authority Reset',
  description: 'A free guided meditation for women entrepreneurs ready to turn down the noise and reconnect with their own creative signal.',
  openGraph: {
    title: 'You have heard everyone else. Now hear yourself.',
    description: 'A free creative authority reset for women entrepreneurs.',
    type: 'website',
    url: 'https://daniela-hear-yourself.hearty-shark-4784.chatgpt.site',
    images: [{ url: 'https://daniela-hear-yourself.hearty-shark-4784.chatgpt.site/og.png', width: 1200, height: 630, alt: 'Hear Yourself - a free creative authority reset' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'You have heard everyone else. Now hear yourself.',
    description: 'A free creative authority reset for women entrepreneurs.',
    images: ['https://daniela-hear-yourself.hearty-shark-4784.chatgpt.site/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${caveat.variable} ${crimson.variable} ${mozilla.variable}`}>{children}</body>
    </html>
  );
}
