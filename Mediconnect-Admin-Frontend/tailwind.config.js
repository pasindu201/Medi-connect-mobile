/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'], // Include Roboto as the primary sans-serif
        sansmat:['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}  