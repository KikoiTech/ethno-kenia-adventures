<template>
  <header 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500"
    :class="[(isScrolled || isMenuOpen) ? 'bg-brand-charcoal shadow-lg' : 'bg-gradient-to-b from-black/50 to-transparent']"
  >
    <!-- Top Bar: Contact & Socials -->
    <div class="bg-brand-charcoal py-2 px-6 hidden min-[940px]:block">
      <div class="container mx-auto flex justify-between items-center text-brand-off-white text-xs md:text-[13px] font-sans">
        <!-- Contact Info -->
        <div class="flex items-center space-x-6">
          <a href="mailto:info@ethnokeniaadventure.com" class="flex items-center hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>info@ethnokeniaadventure.com</span>
          </a>
          <a href="mailto:ethnokeniaadventure@gmail.com" class="flex items-center hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>ethnokeniaadventure@gmail.com</span>
          </a>
          <a href="tel:+254702373008" class="flex items-center hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>+254 702 373 008</span>
          </a>
          <!-- WeChat: scrolls down to the QR code in the footer -->
          <a href="#wechat-qr" title="WeChat" class="hover:text-brand-terracotta transition-colors duration-300 flex items-center">
            <MessageCircle class="w-4 h-4 mr-2" :stroke-width="2" />
            <span>connect on WeChat</span>
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
          <a href="https://wa.me/254702373008" target="_blank" class="flex hover:text-green-500 transition-colors duration-300" title="Chat on WhatsApp">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.886.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.438-9.889 9.886-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.982zm11.387-5.464c-.301-.15-1.774-.874-2.046-.972-.272-.098-.47-.147-.668.147-.197.294-.766.972-.938 1.169-.172.196-.344.221-.645.071-.301-.15-1.27-.469-2.42-1.493-.895-.798-1.498-1.783-1.673-2.083-.176-.3-.018-.462.132-.611.135-.134.301-.351.452-.526.15-.175.2-.299.3-.499.1-.199.05-.374-.025-.524-.075-.15-.668-1.611-.916-2.206-.241-.58-.487-.5-.668-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.774-.726 2.022-1.429.247-.704.247-1.306.173-1.43-.074-.124-.272-.198-.57-.348z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <nav
      :class="[
        'w-full flex items-stretch text-white transition-all duration-300',
        !isMounted ? 'h-20' : (isScrolled ? 'h-16' : 'h-20')
      ]"
    >
      <div class="container mx-auto px-6 flex items-stretch justify-between w-full">
        <!-- Logo -->
        <div class="flex items-center flex-shrink-0">
          <NuxtLink to="/">
            <img
              src="/logo.png"
              alt="Ethno Kenia Adventure"
              class="h-14 w-auto"
              width="120"
              height="56"
            />
          </NuxtLink>
        </div>

        <!-- Desktop Navigation: centered between logo and CTA -->
        <div class="hidden lg:flex items-center justify-center flex-1 gap-8 font-sans text-[13px] font-medium">
          <template v-for="link in navigationLinks" :key="link.name">
            <!-- Regular Link -->
            <NuxtLink
              v-if="!link.children"
              :to="link.path"
              class="relative group hover:text-brand-terracotta transition-colors duration-300"
            >
              {{ link.name }}
              <span class="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-brand-terracotta transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
            </NuxtLink>
            <!-- Dropdown Link -->
            <div v-else class="relative group">
              <button class="hover:text-brand-terracotta transition-colors duration-300 flex items-center">
                {{ link.name }}
                <svg class="w-3 h-3 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <!-- Dropdown Panel -->
              <div class="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-brand-charcoal text-white shadow-xl rounded-sm p-4
                          opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 border-t-2 border-brand-terracotta">
                <NuxtLink v-for="child in link.children" :key="child.name" :to="child.path"
                   class="block px-4 py-3 hover:text-brand-terracotta hover:bg-white/5 rounded-sm text-xs tracking-wider transition-colors">
                  {{ child.name }}
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>

        <!-- Right: Desktop CTA + Mobile Menu Button -->
        <div class="flex items-center flex-shrink-0 gap-6">
          <!-- Desktop CTA Button -->
          <Button
            as-child
            variant="brand"
            class="hidden lg:inline-flex h-auto items-center justify-center px-5 xl:px-6 py-2 my-3 flex-shrink-0 text-xs"
          >
            <NuxtLink to="/contact-us">Begin Your Journey</NuxtLink>
          </Button>

          <!-- Mobile Menu Button -->
          <div class="lg:hidden">
            <button @click="isMenuOpen = !isMenuOpen" class="relative h-6 w-6 focus:outline-none">
              <span
                class="absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out"
                :class="isMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[5px] rotate-0'"
              ></span>
              <span
                class="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded-full bg-current transition-opacity duration-300 ease-in-out"
                :class="isMenuOpen ? 'opacity-0' : 'opacity-100'"
              ></span>
              <span
                class="absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out"
                :class="isMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'top-[17px] rotate-0'"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu Panel -->
    <div v-if="isMenuOpen" class="lg:hidden bg-brand-charcoal text-brand-off-white shadow-xl">
      <div class="flex flex-col py-4 font-sans">
        <template v-for="link in navigationLinks" :key="link.name">
          <!-- Mobile Regular Link -->
          <div v-if="!link.children" class="flex flex-col">
            <NuxtLink
              :to="link.path"
              @click="isMenuOpen = false"
              class="block py-3 pl-6 pr-8 font-serif text-lg text-brand-off-white hover:text-brand-terracotta transition-colors duration-300"
            >
              {{ link.name }}
            </NuxtLink>
            <div class="ml-6 mr-8 border-b border-brand-off-white/20"></div>
          </div>
          <!-- Mobile Dropdown Section: non-clickable heading + always-visible children -->
          <div v-else class="flex flex-col">
            <span class="block py-3 pl-6 pr-8 font-serif text-lg font-semibold text-brand-off-white cursor-default select-none">
              {{ link.name }}
            </span>
            <div v-for="(child, index) in link.children" :key="child.name" class="flex flex-col">
              <NuxtLink
                :to="child.path"
                @click="isMenuOpen = false"
                class="block py-2.5 pl-10 pr-8 font-sans text-xs uppercase tracking-wider text-brand-off-white hover:text-brand-terracotta transition-colors duration-300"
              >
                {{ child.name }}
              </NuxtLink>
              <div
                :class="[
                  index === link.children.length - 1 ? 'ml-6' : 'ml-10',
                  'mr-8 border-b border-brand-off-white/20'
                ]"
              ></div>
            </div>
          </div>
        </template>

        <!-- CTA -->
        <div class="px-6 pt-4">
          <Button as-child variant="brand" class="w-full h-auto justify-center py-3 text-sm">
            <NuxtLink to="/contact-us" @click="isMenuOpen = false">Start Your Journey</NuxtLink>
          </Button>
        </div>

        <!-- Contact Info -->
        <div class="flex flex-col gap-3 px-6 pt-6 font-sans text-sm">
          <a href="tel:+254702373008" class="flex items-center text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span>+254 702 373 008</span>
          </a>
          <a href="mailto:info@ethnokeniaadventure.com" class="flex items-center text-brand-off-white/80 hover:text-brand-terracotta transition-colors duration-300">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>info@ethnokeniaadventure.com</span>
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-vue-next'

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const isMounted = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  isMounted.value = true
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// *** THE CRITICAL FIX IS HERE ***
const navigationLinks = ref([
  // { name: 'Home', path: '/' },
  { name: 'Safari Packages', path: '/safari-packages' },
  {
    name: 'KENYA HOLIDAYS',
    children: [
      { name: 'Bush Safaris', path: '/safari-packages?type=wildlife&country=Kenya' },
      { name: 'Beach Holidays', path: '/safari-packages?type=beach&country=Kenya' },
      { name: 'Bush and Beach', path: '/safari-packages?type=beach&country=Kenya' },
    ]
  },
  {
    name: 'EAST AFRICA',
    children: [
      { name: 'Tanzania Safaris', path: '/safari-packages?country=tanzania' },
      { name: 'Uganda Safaris', path: '/safari-packages?country=uganda' },
      { name: 'Rwanda Safaris', path: '/safari-packages?country=rwanda' },
    ]
  },
  { name: 'Mt Climbing', path: '/safari-packages?category=mountain-climbing' },
  { name: 'International Tours', path: '/safari-packages?category=international' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Contact Us', path: '/contact-us' },
])
</script>