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
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        warm: {
          50: '#F4F3EF', // Elegant paper cream
          100: '#EBE9E1',
        },
        stone: {
          850: '#1a1a1a', 
          950: '#0A0A0A', // Ink black
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
