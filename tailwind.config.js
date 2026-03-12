/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        dark: {
          50: '#c9cdd6',
          100: '#a0a6b4',
          200: '#6b7385',
          300: '#454d5e',
          400: '#252b38',
          500: '#111318',
          600: '#0d0f14',
          700: '#090b0f',
          800: '#06070b',
          900: '#030407',
        },
        accent: {
          // Primary — cool indigo, not electric
          indigo: '#6366f1',
          // Supporting
          violet: '#7c3aed',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          sky: '#38bdf8',
          // Aliases kept for backwards compat with existing components
          cyan: '#10b981',
          blue: '#6366f1',
          purple: '#7c3aed',
          pink: '#f43f5e',
          orange: '#f59e0b',
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
      },
    },
  },
  plugins: [],
}
