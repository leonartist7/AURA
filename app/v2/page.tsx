import type { Metadata } from 'next';
import '../aura-landing.css';
import AroLanding from '@/components/aura/AroLanding';

export const metadata: Metadata = {
  title: 'aro — Keep your circle close',
  description:
    'The regulars club for cafés & restaurants. aro turns first visits into rituals and keeps your regulars coming back — so you stay in the moment, not the admin.',
  robots: { index: false },
};

export default function V2Page() {
  return <AroLanding />;
}
