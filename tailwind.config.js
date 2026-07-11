/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <-- Ye line add karo
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          600: '#7c3aed', // Main purple
          700: '#6d28d9',
        }
      }
    },
  },
  plugins: [],
}
