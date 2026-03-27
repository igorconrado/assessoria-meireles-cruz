import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0D1B2A',
        slate: '#1B2838',
        ivory: '#F5F3EE',
        gold: '#C9A84C',
        'gold-muted': 'rgba(201,168,76,0.15)',
        sage: '#7A8B6F',
        coral: '#C4725A',
        'gray-muted': '#94A3B8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      boxShadow: {
        'card-dark':
          '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(148,163,184,0.08)',
        'card-hover':
          '0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(201,168,76,0.2)',
        'card-light':
          '0 1px 4px rgba(13,27,42,0.08), 0 0 0 1px rgba(13,27,42,0.06)',
      },
      animation: {
        'fade-up':
          'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'count-up':
          'countUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
