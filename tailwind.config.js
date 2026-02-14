/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'brand-off-white': '#F8F5F1',
        'brand-sand': '#E4DFD5 ',
        'brand-green': '#3D4A3D',
        'brand-terracotta': '#A25035',
        'brand-charcoal': '#2A2B2A',
      },
  fontFamily: {
          sans: ['Inter', 'sans-serif'],
  serif: ['"Playfair Display"', 'serif'],
},
    },
  },
  plugins: [],
}