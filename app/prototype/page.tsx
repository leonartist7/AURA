import type { Metadata } from 'next';
import '../aura-landing.css';
import StoryPrototype from './StoryPrototype';

export const metadata: Metadata = {
  title: 'Aura — One Day (scroll prototype)',
  description:
    'A scroll-driven concept: one cinematic day inside one café. The light moves with the scroll, the café closes into night, and Aura keeps it alive in their pocket.',
};

export default function PrototypePage() {
  return <StoryPrototype />;
}
