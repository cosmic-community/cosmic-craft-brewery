/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D97706',
          dark: '#B45309',
          light: '#F59E0B',
        },
        secondary: {
          DEFAULT: '#78350F',
          dark: '#451A03',
          light: '#92400E',
        },
        accent: {
          DEFAULT: '#FCD34D',
          dark: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}