// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',      // Add this
    '@nuxtjs/google-fonts' // Add this
  ],

  // Optimization 1: Localize Fonts (Removes render-blocking)
  googleFonts: {
    families: {
      Inter: [400, 500, 600],
      'Playfair Display': {
        wght: [400, 700],
        ital: [400]
      }
    },
    display: 'swap',
    download: true
  },

  // Optimization 2: Cloudinary Auto-Compression
  image: {
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/dmdihuyvn/image/upload/'
    }
  },

  css: ['~/assets/css/tailwind.css'],

  // REMOVE the app.head.link section entirely! 
  // It is now handled by @nuxtjs/google-fonts more efficiently.
})