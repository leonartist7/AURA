import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          cream: '#FAF6F0',
          espresso: '#2A1F1A',
          gold: '#C9A961',
          coral: '#E89B6C',
          sage: '#A8B5A0',
          forest: '#5C7C50',
          mute: '#7A6B5D',
          line: '#EDE4D6',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Fraunces', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
      },
      boxShadow: {
        aura: '0 2px 20px rgba(42, 31, 26, 0.06)',
        'aura-lg': '0 8px 40px rgba(42, 31, 26, 0.10)',
        'aura-inset': 'inset 0 0 0 1px rgba(42, 31, 26, 0.06)',
      },
      maxWidth: {
        screen: '420px',
      },
      transitionTimingFunction: {
        'out-cubic': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.4)', opacity: '0.3' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 1.6s ease-in-out infinite',
        'drift': 'drift 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
