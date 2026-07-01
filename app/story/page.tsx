import type { Metadata } from 'next';
import '../aura-landing.css';
import RingStoryHybrid from '@/components/aura/RingStoryHybrid';

export const metadata: Metadata = {
  title: 'aro — the regulars club',
  description:
    "Coffee gets them in the door. This gets them back — a scroll-driven story of how aro turns first visits into a circle of regulars.",
  robots: { index: false },
};

export default function StoryPage() {
  return <RingStoryHybrid />;
}
