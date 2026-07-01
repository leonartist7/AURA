import type { Metadata } from 'next';
import '../aura-landing.css';
import AroLandingV3 from '@/components/aura/AroLandingV3';

export const metadata: Metadata = {
  title: 'aro — the regulars club',
  description:
    'Coffee gets them in the door. This gets them back — the loyalty, win-back, and direct-ordering system independent cafés run without hiring anyone.',
  robots: { index: false },
};

export default function V3Page() {
  return <AroLandingV3 />;
}
