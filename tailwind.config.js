// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'r-4': '1rem',
        'r-8': '2rem'
      },
      margin: {
        'r-auto': '0 0 0 auto'
      }
    }
  },
  plugins: [
    // פלאגין להוספת תמיכה ב-RTL
    function({ addUtilities }) {
      const newUtilities = {
        '.text-right-rtl': {
          'text-align': 'right',
          'direction': 'rtl'
        },
        '.text-left-rtl': {
          'text-align': 'left',
          'direction': 'rtl'
        }
      }
      addUtilities(newUtilities)
    }
  ]
}