import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import V11Page from './v11/page';

export default async function HomePage() {
  const hostname = (await headers()).get('host')?.split(':')[0].toLowerCase();
  if (hostname === 'waitlist.danielaion.com') redirect('/waitlist');

  return <V11Page />;
}
