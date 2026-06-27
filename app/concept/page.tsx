import type { Metadata } from 'next';
import '../aura-landing.css';
import ConceptHero from '@/components/aura/ConceptHero';

export const metadata: Metadata = {
  title: 'AURA — Keep your circle close (concept)',
  description:
    'Visual direction B: the café at the centre of its own living circle of regulars. A calmer, more emotional hero concept.',
  robots: { index: false },
};

export default function ConceptPage() {
  return (
    <div className="aura-landing-root">
      <ConceptHero />
    </div>
  );
}
