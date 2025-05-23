/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, 
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}