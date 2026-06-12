import type { Metadata } from 'next';
import './aura-landing.css';
import AuraLanding from '@/components/aura/AuraLanding';

export const metadata: Metadata = {
  title: "AURA CLUB — Your neighborhood's favorite. On purpose.",
  description:
    'The club for cafés & restaurants that turns first visits into rituals — loyalty, offers, and direct ordering your regulars actually love. A few partners per neighborhood. First month free.',
  openGraph: {
    title: "AURA CLUB — Your neighborhood's favorite. On purpose.",
    description:
      'The club that turns first visits into rituals. A few partners per neighborhood. First month free.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div className="aura-landing-root">
      <AuraLanding />
    </div>
  );
}
