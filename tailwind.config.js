/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Baloo 2"', 'sans-serif'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      colors: {
        cream: '#FCF7EC',
        ink: '#4A3F35',
        inkLight: '#8A7C6E',
        teal: {
          50: '#EFF9F7',
          100: '#DDF1EC',
          200: '#BEE5DC',
          300: '#93D4C6',
          400: '#66C0AD',
          500: '#47A794',
          600: '#358A79',
          700: '#2C6F62'
        },
        pink: {
          50: '#FDF1F5',
          100: '#FBE1EA',
          200: '#F6C4D8',
          300: '#F0A0C0',
          400: '#E87CA5',
          500: '#DB5A8A'
        },
        sun: {
          50: '#FDF8E9',
          100: '#FBEECB',
          200: '#F7DE9B',
          300: '#F2C765',
          400: '#EBAE38',
          500: '#DD9620'
        },
      },
    },
  },
  plugins: [],
};