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
    'nuxt-gtag',
    'shadcn-nuxt'
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  gtag: {
    // No ID here! It will read from .env automatically if named correctly
  },

  runtimeConfig: {
    public: {
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID, // Fallback
      supabaseUrl: process.env.SUPERBASE_URL,
      supabaseKey: process.env.SUPERBASE_KEY,
    },
    // Private (server-only) — never sent to the browser
    supabaseServiceKey: process.env.SUPERBASE_KEY,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
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