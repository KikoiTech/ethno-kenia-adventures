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
        'brand-green': '#3D4A3D',
        'brand-terracotta': '#C06C58',
        'brand-charcoal': '#2A2B2A',
      },
  fontFamily: {
  sans: ['Poppins', 'sans-serif'],
  serif: ['"Playfair Display"', 'serif'],
},
    },
  },
  plugins: [],
}