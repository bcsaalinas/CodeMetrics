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
          50: '#e6e8ed',
          100: '#ccd1db',
          200: '#99a3b7',
          300: '#667593',
          400: '#33476f',
          500: '#0a0f1a',
          600: '#080c15',
          700: '#060910',
          800: '#04060b',
          900: '#020306',
        },
        accent: {
          cyan: '#06d6a0',
          blue: '#118ab2',
          purple: '#7b2ff7',
          pink: '#ef476f',
          orange: '#ffd166',
        },
      },
    },
  },
  plugins: [],
}
