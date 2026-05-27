import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Aura — Café Health Diagnostic',
  description:
    'A 5-minute, in-person diagnostic for café owners. See your Café Health Score and uncover what is quietly slipping out the door.',
  applicationName: 'Aura Diagnostic',
  authors: [{ name: 'Aura' }],
  openGraph: {
    title: 'Aura — Café Health Diagnostic',
    description:
      'See your Café Health Score in 5 minutes. Built for café owners.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FAF6F0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="aura-atmosphere min-h-dvh text-aura-espresso">
        {children}
      </body>
    </html>
  );
}
