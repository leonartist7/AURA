import type { Metadata } from 'next';
import '../aura-landing.css';
import RingStory from '@/components/aura/RingStory';

export const metadata: Metadata = {
  title: 'aro — scroll story',
  description:
    'A scroll-driven story: the ring becomes the aura, travels with your regulars, and lays down into the circle they belong to.',
  robots: { index: false },
};

export default function StoryPage() {
  return <RingStory />;
}
