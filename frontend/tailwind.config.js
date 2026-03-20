/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#dfeeff',
          200: '#b8ddff',
          300: '#79c2ff',
          400: '#36a5ff',
          500: '#0c85f2',
          600: '#0068cf',
          700: '#0053a8',
          800: '#05478a',
          900: '#0a3c72',
          950: '#07254b',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fbe8ff',
          200: '#f6cfff',
          300: '#f0a8ff',
          400: '#e671ff',
          500: '#d63bfa',
          600: '#bb19de',
          700: '#9e12b8',
          800: '#831396',
          900: '#6c1579',
        },
        success: {
          50: '#f0fdf4',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          400: '#fbbf24',
          500: '#f59e0b',
        },
        fire: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(12, 133, 242, 0.15)',
        'glow-accent': '0 0 20px rgba(214, 59, 250, 0.15)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
