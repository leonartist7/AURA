import type { Metadata } from 'next';
import './aura-landing.css';
import AuraLanding from '@/components/aura/AuraLanding';

export const metadata: Metadata = {
  title: 'AURA: Turn first-time visitors into regulars',
  description:
    'Aura gives your café or restaurant a branded loyalty system, smart promotions, direct ordering, and gamified rewards that bring customers back, without depending only on delivery apps or social media.',
  openGraph: {
    title: 'AURA: Turn first-time visitors into regulars',
    description:
      'AI loyalty, ordering & marketing for cafés and restaurants. Book a free growth demo.',
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
