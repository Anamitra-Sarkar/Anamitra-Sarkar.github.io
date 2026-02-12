/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        warm: {
          50: '#FFFCF8',
          100: '#FDF6E3',
        },
        stone: {
          850: '#1f1c1a', // Custom soothing dark
          950: '#0c0a09',
        },
        accent: {
          purple: '#8B5CF6',
          pink: '#EC4899',
          orange: '#F97316',
          teal: '#14B8A6',
          blue: '#3B82F6',
        }
      }
    }
  },
  plugins: [],
}
