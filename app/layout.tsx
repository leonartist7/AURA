import type { Metadata, Viewport } from 'next';
import {
  Fraunces,
  Inter,
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono,
} from 'next/font/google';
import './globals.css';

// Diagnostic flow fonts
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

// AURA CLUB landing fonts — self-hosted via next/font (no render-blocking @import)
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
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
  // no maximumScale/userScalable lock — allow pinch-zoom (WCAG 1.4.4)
  themeColor: '#FAF6F0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${bricolage.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="aura-atmosphere min-h-dvh text-aura-espresso">
        {children}
      </body>
    </html>
  );
}
