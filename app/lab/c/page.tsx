import type { Metadata } from 'next';
import '../../aura-landing.css';
import LabCinematic from '@/components/lab/LabCinematic';
export const metadata: Metadata = { title: 'Lab C — Cinematic', robots: { index: false } };
export default function Page() { return <LabCinematic />; }
