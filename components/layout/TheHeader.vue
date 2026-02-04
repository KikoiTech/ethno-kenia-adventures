<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-brand-off-white shadow-md text-brand-charcoal">
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="font-sans font-bold text-2xl">
        <a href="/">HERITAGE</a>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-8 font-serif">
        <template v-for="link in navigationLinks" :key="link.name">
          <!-- Regular Link -->
          <a v-if="!link.children" :href="link.path" class="hover:text-brand-terracotta transition-colors duration-300">
            {{ link.name }}
          </a>
          <!-- Dropdown Link -->
          <div v-else class="relative group">
            <button class="hover:text-brand-terracotta transition-colors duration-300 flex items-center">
              {{ link.name }}
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <!-- Dropdown Panel -->
            <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-brand-off-white shadow-lg rounded-md p-2
                        opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
              <a v-for="child in link.children" :key="child.name" :href="child.path"
                 class="block px-4 py-2 text-brand-charcoal hover:bg-gray-100 rounded-md">
                {{ child.name }}
              </a>
            </div>
          </div>
        </template>
      </div>

      <!-- Mobile Menu Button -->
      <div class="md:hidden">
        <button @click="isMenuOpen = !isMenuOpen" class="focus:outline-none">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Desktop CTA Button -->
      <div class="hidden md:block">
        <a href="/contact-us" class="bg-brand-terracotta text-brand-off-white font-sans font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all duration-300">
          Start Your Journey
        </a>
      </div>
    </nav>

    <!-- Mobile Menu Panel -->
    <div v-if="isMenuOpen" class="md:hidden bg-brand-off-white shadow-xl">
      <div class="flex flex-col items-center py-8 font-serif text-lg">
        <template v-for="link in navigationLinks" :key="link.name">
          <!-- Mobile Regular Link -->
          <a v-if="!link.children" :href="link.path" class="py-3 hover:text-brand-terracotta">{{ link.name }}</a>
          <!-- Mobile Dropdown Section -->
          <div v-else class="w-full text-center">
            <button @click="isMobileDropdownOpen = !isMobileDropdownOpen" class="py-3 w-full flex justify-center items-center hover:text-brand-terracotta">
              {{ link.name }}
              <svg class="w-4 h-4 ml-1 transition-transform duration-300" :class="{'rotate-180': isMobileDropdownOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div v-if="isMobileDropdownOpen" class="bg-gray-100 pb-4">
              <a v-for="child in link.children" :key="child.name" :href="child.path"
                 class="block py-3 text-brand-charcoal hover:text-brand-terracotta text-base">
                {{ child.name }}
              </a>
            </div>
          </div>
        </template>
        <a href="/contact-us" class="bg-brand-terracotta text-brand-off-white font-sans font-bold py-3 px-8 rounded-full mt-6">
          Start Your Journey
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)
const isMobileDropdownOpen = ref(false)

const navigationLinks = ref([
  { name: 'Home', path: '/' },
  {
    name: 'Safari Packages',
    children: [
      { name: 'The Great Migration', path: '/safari-packages/great-migration' },
      { name: 'Primate Encounters', path: '/safari-packages/primate-encounters' },
      { name: 'Savannah & Sky', path: '/safari-packages/savannah-sky' },
    ]
  },
  { name: 'About Us', path: '/about-us' },
  { name: 'Services', path: '/services' },
  { name: 'Journal', path: '/journal' },
  { name: 'Contact Us', path: '/contact-us' },
])
</script>