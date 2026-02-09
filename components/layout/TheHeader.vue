<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-brand-off-white shadow-md text-brand-charcoal">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="font-sans font-bold text-2xl">
        <NuxtLink to="/">HERITAGE</NuxtLink>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8 font-serif">
        <template v-for="link in navigationLinks" :key="link.name">
          <!-- Regular Link -->
          <NuxtLink v-if="!link.children" :to="link.path" class="hover:text-brand-terracotta transition-colors duration-300">
            {{ link.name }}
          </NuxtLink>
          <!-- Dropdown Link -->
          <div v-else class="relative group">
            <button class="hover:text-brand-terracotta transition-colors duration-300 flex items-center">
              {{ link.name }}
              <!-- CORRECTED SVG ICON -->
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <!-- Dropdown Panel -->
            <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-brand-off-white shadow-lg rounded-md p-2
                        opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
              <NuxtLink v-for="child in link.children" :key="child.name" :to="child.path"
                 class="block px-4 py-2 text-brand-charcoal hover:bg-gray-100 rounded-md text-sm">
                {{ child.name }}
              </NuxtLink>
            </div>
          </div>
        </template>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button @click="isMenuOpen = !isMenuOpen" class="focus:outline-none">
           <!-- CORRECTED SVG ICON -->
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      <!-- Desktop CTA Button -->
      <div class="hidden md:block">
        <NuxtLink to="/contact-us" class="bg-brand-terracotta text-brand-off-white font-sans font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300">
          Start Your Journey
        </NuxtLink>
      </div>
    </nav>

    <!-- Mobile Menu Panel -->
    <div v-if="isMenuOpen" class="md:hidden bg-brand-off-white shadow-xl">
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

// *** THE CRITICAL FIX IS HERE ***
const navigationLinks = ref([
  { name: 'Home', path: '/' },
  {
    name: 'Safari Packages',
    children: [
      { name: 'All Packages', path: '/safari-packages' },
      // CORRECTED PATHS: Point to booking pages
      { name: 'Savannah Sky', path: '/safari-packages/booking/savannah-sky' },
      { name: 'Beach Safari', path: '/safari-packages/booking/beach-safari' },
      { name: 'Great Migration', path: '/safari-packages/booking/great-migration' },
      { name: 'Mountain Climbing', path: '/safari-packages/booking/mountain-climbing' },
      { name: 'Primate Encounter', path: '/safari-packages/booking/primate-encounter' },
    ]
  },
  { name: 'About Us', path: '/about-us' },
  { name: 'Services', path: '/services' },
  { name: 'Journal', path: '/journal' },
  { name: 'Contact Us', path: '/contact-us' },
])
</script>