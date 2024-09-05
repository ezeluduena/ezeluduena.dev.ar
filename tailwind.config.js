/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './data/**/*.{js,jsx,ts,tsx}', // Adjust the path to match your project structure
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './hooks/*.{js,jsx,ts,tsx}',
    './public/**/*.{js,jsx,ts,tsx}',
    './utils/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: []
};
