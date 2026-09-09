<template>
  <!-- 
    FOOTER: Part of revamped vision - African Heritage Symphony
    CONCEPT: Tribal patterns woven through modern footer design
    VISION: Earthy, sophisticated, immersive, and deeply connected to African artistry
  -->
  <footer
    class="relative bg-brand-charcoal text-brand-off-white overflow-hidden min-h-[70vh] flex flex-col"
  >
    <!-- Tribal Pattern Background -->
    <div class="absolute inset-0 opacity-5">
      <div
        class="absolute inset-0"
        style="
          background-image: url(&quot;data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZD0iTTIwIDAgTDI1IDEwIEwzMCAwIEwzNSAxMCBMNDAgMEw0MCA0MEwwIDQwTDQwIDBMMzUgMTBMMzAgMEwyNSAxMEwyMCAwWiIgZmlsbD0iI2Y5ZmFlYiIgb3BhY2l0eT0iMC4zIi8+CiAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMyIgZmlsbD0iI2Y5ZmFlYiIgb3BhY2l0eT0iMC4yIi8+Cjwvc3ZnPg==&quot;);
          background-repeat: repeat;
        "
      ></div>
    </div>

    <div class="relative container mx-auto px-6 py-12 flex-1 flex flex-col">
      <!-- Main Footer Content -->
      <div class="flex-1 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-16 mb-8">

        <!-- LEFT: Wordmark, tagline, social/badge row, newsletter (commented out) -->
        <div class="lg:max-w-sm text-left">
          <div class="font-serif mb-6">
            <div class="text-2xl md:text-3xl text-brand-off-white leading-tight">Ethno Kenia</div>
            <div class="text-xs font-sans uppercase tracking-[0.3em] text-brand-terracotta mt-1">Adventure</div>
          </div>

          <p class="font-sans text-sm text-brand-off-white/70 leading-relaxed mb-6 max-w-xs">
            Ethno Kenia Adventure is a professional safari and tours company based in Kenya, offering unforgettable wildlife safaris, beach holidays, and cultural experiences across Kenya and East Africa. We believe every safari should be more than a trip it should be a meaningful journey.
          </p>

          <!-- Social / Review Badges -->
          <div class="space-y-3">
            <!-- Row 1: Review badges -->
            <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
              <LayoutSafariBookingsWidget />
              <a
                href="https://www.tripadvisor.com/Attraction_Review-g294207-d34257797-Reviews-Ethno_Kenia_Adventure-Nairobi.html"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-brand-off-white/90 hover:text-brand-terracotta transition-colors duration-300"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 -96 512.2 512.2">
                  <path d="M128.2 127.9C92.7 127.9 64 156.6 64 192c0 35.4 28.7 64.1 64.1 64.1 35.4 0 64.1-28.7 64.1-64.1.1-35.4-28.6-64.1-64-64.1zm0 110c-25.3 0-45.9-20.5-45.9-45.9s20.5-45.9 45.9-45.9S174 166.7 174 192s-20.5 45.9-45.8 45.9z"/>
                  <circle cx="128.4" cy="191.9" r="31.9"/>
                  <path d="M384.2 127.9c-35.4 0-64.1 28.7-64.1 64.1 0 35.4 28.7 64.1 64.1 64.1 35.4 0 64.1-28.7 64.1-64.1 0-35.4-28.7-64.1-64.1-64.1zm0 110c-25.3 0-45.9-20.5-45.9-45.9s20.5-45.9 45.9-45.9S430 166.7 430 192s-20.5 45.9-45.8 45.9z"/>
                  <circle cx="384.4" cy="191.9" r="31.9"/>
                  <path d="M474.4 101.2l37.7-37.4h-76.4C392.9 29 321.8 0 255.9 0c-66 0-136.5 29-179.3 63.8H0l37.7 37.4C14.4 124.4 0 156.5 0 192c0 70.8 57.4 128.2 128.2 128.2 32.5 0 62.2-12.1 84.8-32.1l43.4 31.9 42.9-31.2-.5-1.2c22.7 20.2 52.5 32.5 85.3 32.5 70.8 0 128.2-57.4 128.2-128.2-.1-35.4-14.6-67.5-37.9-90.7zM368 64.8c-60.7 7.6-108.3 57.6-111.9 119.5-3.7-62-51.4-112.1-112.3-119.5 30.6-22 69.6-32.8 112.1-32.8S337.4 42.8 368 64.8zM128.2 288.2C75 288.2 32 245.1 32 192s43.1-96.2 96.2-96.2 96.2 43.1 96.2 96.2c-.1 53.1-43.1 96.2-96.2 96.2zm256 0c-53.1 0-96.2-43.1-96.2-96.2s43.1-96.2 96.2-96.2 96.2 43.1 96.2 96.2c-.1 53.1-43.1 96.2-96.2 96.2z"/>
                </svg>
                <span class="text-xs font-bold uppercase tracking-wider">TripAdvisor</span>
              </a>
            </div>

            <!-- Row 2: Social links -->
            <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="https://www.instagram.com/ethnokenia_adventure?igsh=MW1iZDZjM28yNGNxeg=="
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-brand-off-white/90 hover:text-brand-terracotta transition-colors duration-300"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"
                  />
                </svg>
                <span class="text-xs font-bold uppercase tracking-wider">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/share/1HZLjEm1ov/"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-brand-off-white/90 hover:text-brand-terracotta transition-colors duration-300"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                  />
                </svg>
                <span class="text-xs font-bold uppercase tracking-wider">Facebook</span>
              </a>
            </div>
          </div>

          <!-- Pesapal Payment Badge -->
          <div class="mt-8">
            <a href="#" class="inline-block bg-brand-off-white rounded-md p-2">
              <img
                src="/badges/Pesapal_Footer_logo.png"
                alt="Pesapal"
                class="w-32 h-[60px] object-contain"
              />
            </a>
            <p class="text-xs font-sans uppercase tracking-wider text-brand-off-white/50 mt-2">
              Payments Secured By Pesapal
            </p>
          </div>

          <!-- Newsletter Signup: kept commented out until a newsletter backend exists -->
          <!--
          <div class="mt-6">
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-brand-terracotta mb-3">
              Join Our Tribe
            </p>
            <form @submit.prevent class="relative max-w-xs">
              <input
                type="email"
                placeholder="Email address"
                class="w-full bg-white/5 border border-brand-off-white/20 rounded-full py-2 px-4 text-xs font-sans focus:outline-none focus:border-brand-terracotta transition-colors"
              />
              <button
                type="submit"
                class="absolute right-1 top-1 bottom-1 px-4 bg-brand-terracotta text-brand-off-white rounded-full text-[10px] font-sans font-bold hover:bg-brand-terracotta/90 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
          -->
        </div>

        <!-- RIGHT: Quick Links / Safari Experiences / Get in Touch, single row -->
        <div class="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-20">

          <!-- Quick Links -->
          <div class="space-y-4">
            <h4 class="text-lg font-serif text-brand-terracotta">Quick Links</h4>
            <nav class="space-y-2">
              <a
                href="/safari-packages"
                class="block text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
              >
                Safari Packages
              </a>
              <a
                href="/about-us"
                class="block text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
              >
                About Us
              </a>
              <a
                href="/services"
                class="block text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
              >
                Services
              </a>
              <a
                href="/journal"
                class="block text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
              >
                Travel Journal
              </a>
              <a
                href="/contact-us"
                class="block text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
              >
                Contact Us
              </a>
            </nav>
          </div>

          <!-- Safari Experiences -->
          <div class="space-y-4">
            <h4 class="text-lg font-serif text-brand-terracotta">
              Safari Experiences
            </h4>
            <nav class="space-y-2">
              <a
                href="/safari-packages/masai-mara-group-tour-3-days"
                class="block text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
              >
                Maasai Mara Explorer
              </a>
              <a
                href="/safari-packages/3-days-amboseli-national-park-safari"
                class="block text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
              >
                Amboseli Luxury
              </a>
              <a
                href="/safari-packages/samburu"
                class="block text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
              >
                Samburu Adventure
              </a>
              <a
                href="/safari-packages/mt-kenya-bird-watching"
                class="block text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
              >
                Conservation Experience
              </a>
            </nav>
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <h4 class="text-lg font-serif text-brand-terracotta">Get in Touch</h4>
            <div class="space-y-3">
              <div class="flex items-start space-x-3">
                <svg
                  class="w-5 h-5 text-brand-terracotta mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div>
                  <p class="text-brand-off-white/80 font-sans text-sm">
                    Pension Towers, Loita street, 3rd Floor, Nairobi Kenya
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <svg
                  class="w-5 h-5 text-brand-terracotta flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
                <a
                  href="mailto:info@ethnokeniaadventure.com"
                  class="text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
                >
                  info@ethnokeniaadventure.com
                </a>
              </div>
              <div class="flex items-center space-x-3">
                <svg
                  class="w-5 h-5 text-brand-terracotta flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                  />
                  <path
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                  />
                </svg>
                <a
                  href="mailto:ethnokeniaadventure@gmail.com"
                  class="text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
                >
                  ethnokeniaadventure@gmail.com
                </a>
              </div>
              <div class="flex items-center space-x-3">
                <svg
                  class="w-5 h-5 text-brand-terracotta flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                  />
                </svg>
                <a
                  href="tel:+254702373008"
                  class="text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
                >
                  +254 702 373 008
                </a>
              </div>
              <!-- WeChat QR: anchor target for the header's WeChat icon link -->
              <div id="wechat-qr" class="pt-2 scroll-mt-32">
                <div class="inline-block bg-brand-off-white rounded-md p-2">
                  <img
                    src="/badges/we_chat_qr.jpeg"
                    alt="Scan to connect with Ethno Kenia Adventure on WeChat"
                    class="w-[140px] h-[140px] object-contain"
                  />
                </div>
                <p class="text-brand-off-white/80 font-sans text-sm mt-2">
                  Scan To Connect On WeChat
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-brand-off-white/20 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p class="text-brand-off-white/60 font-sans text-sm">
            © {{ currentYear }} Ethno Kenia Adventure. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a
              href="#"
              class="text-brand-off-white/60 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              class="text-brand-off-white/60 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              class="text-brand-off-white/60 hover:text-brand-terracotta transition-colors duration-300 font-sans text-sm"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
/* Additional styles if needed */
</style>
