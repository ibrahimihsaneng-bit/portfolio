/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./resume.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        navy: {
          950: '#06080E',
          900: '#0C101A',
          850: '#121724',
          800: '#182030',
          700: '#222D42',
          600: '#33415C',
        },
        brand: {
          blue: '#2563EB',
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          copper: '#C2410C'
        }
      }
    },
  },
  plugins: [],
}
