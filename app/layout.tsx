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
  title: 'AURA: Loyalty, ordering & marketing for cafés',
  description:
    'AI-powered loyalty, marketing, and ordering systems for cafés and restaurants. Turn first-time visitors into regulars.',
  applicationName: 'Aura',
  authors: [{ name: 'Aura' }],
  openGraph: {
    title: 'AURA: Loyalty, ordering & marketing for cafés',
    description:
      'Turn first-time visitors into regulars. Book a free growth demo.',
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
