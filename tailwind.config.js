/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Bokgoni Tech dark-blue / black visual identity
        brand: {
          950: '#05080f', // near-black background
          900: '#0a1124', // deep navy
          800: '#0f1a38', // panel navy
          700: '#16264f', // raised panel
          600: '#1d3268',
          500: '#2a4790', // primary blue
          400: '#3d63c9',
          300: '#6f93e8',
          200: '#a9c1f3',
          100: '#d7e3fb',
        },
        accent: {
          DEFAULT: '#3d9bff', // bright accent for CTAs / highlights
          soft: '#7cc0ff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(61,155,255,0.15), 0 12px 40px -12px rgba(61,155,255,0.35)',
      },
    },
  },
  plugins: [],
}
