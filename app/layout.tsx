import type { Metadata } from 'next';
import './globals.css';


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
      <body>{children}</body>
    </html>
  );
}
