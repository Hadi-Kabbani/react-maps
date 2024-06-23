/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {

      },
      colors: {
        'primary': '#393280',
        'secondary': '#ed553b',
        'paragraph': '#898989',
        'lightgray': '#a9a9aa',
        'heading': '#393280',
        'gold': '#d6a302',
      },
    },
    plugins: [],
  }
}
