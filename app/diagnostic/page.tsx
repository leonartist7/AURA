import type { Metadata } from 'next';
import { DiagnosticFlow } from '@/components/DiagnosticFlow';

export const metadata: Metadata = {
  title: 'Aura — Café Health Diagnostic',
  description:
    'A 5-minute, in-person diagnostic for café owners. See your Café Health Score and uncover what is quietly slipping out the door.',
};

export default function DiagnosticPage() {
  return <DiagnosticFlow />;
}
