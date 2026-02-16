<template>
  <header 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
    :class="[isScrolled ? 'bg-brand-charcoal shadow-lg' : 'bg-gradient-to-b from-black/50 to-transparent']"
  >
    <!-- Top Bar: Contact & Socials -->
    <div class="bg-brand-charcoal py-2 px-6 hidden sm:block">
      <div class="container mx-auto flex justify-between items-center text-brand-off-white text-xs md:text-sm font-sans">
        <!-- Contact Info -->
        <div class="flex items-center space-x-6">
          <a href="mailto:info@ethnokeniaadventures.com" class="flex items-center hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>info@ethnokeniaadventures.com</span>
          </a>
          <a href="mailto:ethnokeniaadventures@gmail.com" class="flex items-center hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>ethnokeniaadventures@gmail.com</span>
          </a>
          <a href="tel:+254702373008" class="flex items-center hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>+254 702 373 008</span>
          </a>
        </div>
        <!-- Socials -->
        <div class="flex items-center space-x-4">
          <a href="https://www.instagram.com/ethnokenia_adventure?igsh=MW1iZDZjM28yNGNxeg==" class="hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.335 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.335 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.335-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.335-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="https://www.facebook.com/share/1HZLjEm1ov/" class="hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
          </a>
          <a href="#" class="hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
          </a>
        </div>
      </div>
    </div>
    
    <nav class="w-full py-2 flex justify-between items-center text-white transition-all duration-300">
      <div class="container mx-auto px-6 flex justify-between items-center">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/">
            <img 
              src="/logo.png" 
              alt="Ethnos Kenia Adventures" 
              class="h-14 w-auto" 
            />
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-10 font-sans uppercase tracking-[0.15em] text-xs font-medium">
          <template v-for="link in navigationLinks" :key="link.name">
            <!-- Regular Link -->
            <NuxtLink 
              v-if="!link.children" 
              :to="link.path" 
              class="relative group hover:text-[#A25035] transition-colors duration-300"
            >
              {{ link.name }}
              <span class="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-[#A25035] transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
            </NuxtLink>
            <!-- Dropdown Link -->
            <div v-else class="relative group">
              <button class="hover:text-[#A25035] transition-colors duration-300 flex items-center">
                {{ link.name }}
                <svg class="w-3 h-3 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <!-- Dropdown Panel -->
              <div class="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-brand-charcoal text-white shadow-xl rounded-sm p-4
                          opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 border-t-2 border-[#A25035]">
                <NuxtLink v-for="child in link.children" :key="child.name" :to="child.path"
                   class="block px-4 py-3 hover:text-[#A25035] hover:bg-white/5 rounded-sm text-xs tracking-wider transition-colors">
                  {{ child.name }}
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <div class="lg:hidden">
          <button @click="isMenuOpen = !isMenuOpen" class="focus:outline-none">
             <!-- CORRECTED SVG ICON: Using stroke instead of fill for visibility -->
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Desktop CTA Button -->
        <div class="hidden lg:block flex-shrink-0">
          <NuxtLink 
            to="/contact-us" 
            class="bg-brand-terracotta text-brand-off-white font-sans font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300 h-auto min-h-[44px] flex items-center justify-center text-center leading-tight max-w-[200px]"
          >
            Start Your Journey
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu Panel -->
    <div v-if="isMenuOpen" class="lg:hidden bg-brand-off-white shadow-xl">
      <div class="flex flex-col items-center py-8 font-serif text-lg">
        <template v-for="link in navigationLinks" :key="link.name">
          <!-- Mobile Regular Link -->
          <NuxtLink v-if="!link.children" :to="link.path" @click="isMenuOpen = false" class="py-3 hover:text-brand-terracotta">{{ link.name }}</NuxtLink>
          <!-- Mobile Dropdown Section -->
          <div v-else class="w-full text-center">
            <button @click="isMobileDropdownOpen = !isMobileDropdownOpen" class="py-3 w-full flex justify-center items-center hover:text-brand-terracotta">
              {{ link.name }}
              <svg class="w-4 h-4 ml-1 transition-transform duration-300" :class="{'rotate-180': isMobileDropdownOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div v-if="isMobileDropdownOpen" class="bg-gray-100 pb-4">
              <NuxtLink v-for="child in link.children" :key="child.name" :to="child.path" @click="isMenuOpen = false"
                 class="block py-3 text-brand-charcoal hover:text-brand-terracotta text-base">
                {{ child.name }}
              </NuxtLink>
            </div>
          </div>
        </template>
        <NuxtLink to="/contact-us" @click="isMenuOpen = false" class="bg-brand-terracotta text-brand-off-white font-sans font-bold py-3 px-8 rounded-full mt-6">
          Start Your Journey
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)
const isMobileDropdownOpen = ref(false)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// *** THE CRITICAL FIX IS HERE ***
const navigationLinks = ref([
  { name: 'Home', path: '/' },
  {
    name: 'Safari Packages',
    children: [
      { name: 'All Packages', path: '/safari-packages' },
    ]
  },
  { name: 'About Us', path: '/about-us' },
  { name: 'Services', path: '/services' },
  { name: 'Journal', path: '/journal' },
  { name: 'Contact Us', path: '/contact-us' },
])
</script>