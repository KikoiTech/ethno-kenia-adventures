// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      meta: [
        {
          name: 'google-site-verification',
          content: 'myaRGVFl4hCinAdgbkxkeHMQYikcMRYfW5YfXg1dDEE"'
        }
      ]
    }
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',      // Add this
    '@nuxtjs/google-fonts', // Add this
    'nuxt-gtag'
  ],

  gtag: {
    // No ID here! It will read from .env automatically if named correctly
  },

  runtimeConfig: {
    public: {
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID // Fallback
    }
  },

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