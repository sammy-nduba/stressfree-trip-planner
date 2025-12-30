/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: '#FFFFFF',
        teal: '#26A69A',
        sand: '#FFF8E1',
        coral: '#FF8A65',
        ocean: '#006064',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      scrollBehavior: {
        smooth: 'smooth',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};