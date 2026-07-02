import type { Metadata } from 'next';
import '../aura-landing.css';
import AroLandingUltimate from '@/components/aura/AroLandingUltimate';

export const metadata: Metadata = {
  title: 'aro — Keep your circle close',
  description:
    'The regulars club for independent cafés & restaurants. aro remembers your regulars, welcomes them back, and keeps them yours — live in 14 days, first month free.',
  robots: { index: false },
};

export default function UltimatePage() {
  return <AroLandingUltimate />;
}
