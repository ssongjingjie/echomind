/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a84ff',
        'primary-light': '#409CFF',
        'primary-dark': '#0055CC',
        surface: '#f5f5f7',
        'surface-card': '#ffffff',
        'surface-dark': '#1c1c1e',
        ink: '#1d1d1f',
        'ink-secondary': '#86868b',
        'ink-tertiary': '#c7c7cc',
        rule: '#d2d2d7',
        'apple-green': '#34c759',
        'apple-orange': '#ff9500',
        'apple-red': '#ff3b30',
        'apple-purple': '#af52de',
        'apple-teal': '#5ac8fa',
        'apple-yellow': '#ffcc00',
        'apple-indigo': '#5856d6',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.08)',
        'glow': '0 0 40px rgba(10,132,255,0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'scale-in': 'scaleIn 0.35s ease-out both',
        'pulse-dot': 'pulseDot 1.2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
