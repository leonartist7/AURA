import type { Metadata } from 'next';
import '../../aura-landing.css';
import LabParallax from '@/components/lab/LabParallax';
export const metadata: Metadata = { title: 'Lab B — Parallax depth', robots: { index: false } };
export default function Page() { return <LabParallax />; }
