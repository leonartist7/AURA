import type { Metadata } from 'next';
import '../../aura-landing.css';
import LabMorph from '@/components/lab/LabMorph';
export const metadata: Metadata = { title: 'Lab A — Living 3D', robots: { index: false } };
export default function Page() { return <LabMorph />; }
