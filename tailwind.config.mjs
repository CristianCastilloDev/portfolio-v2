/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cyber: {
          black: 'rgb(var(--bg-dark-rgb) / <alpha-value>)',
          dark: 'rgb(var(--bg-color-rgb) / <alpha-value>)',
          card: 'rgb(var(--card-bg-rgb) / <alpha-value>)',
          border: 'rgb(var(--border-color-rgb) / <alpha-value>)',
          blue: '#3b82f6',
          cyan: '#06b6d4',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s infinite alternate',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(6,182,212,0.2), 0 0 10px rgba(6,182,212,0.1)' },
          '100%': { boxShadow: '0 0 20px rgba(6,182,212,0.5), 0 0 30px rgba(6,182,212,0.2)' }
        }
      }
    },
  },
  plugins: [typography],
};
