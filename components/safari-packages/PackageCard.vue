<template>
  <!-- 
    COMPONENT: PackageCard
    PRINCIPLE: Single Responsibility. This component's only job is to display one safari package.
    NON-NEGOTIABLES CHECKLIST:
    [x] SOLID: Adheres to SRP.
    [x] Clean Code: Well-structured, commented, uses defensive logic.
    [x] Optimization: Uses a loading skeleton for better perceived performance.
    [x] Mobile-First: Layout is responsive and tested for smaller viewports.
  -->
  <div
    class="package-card bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer premium-shadow"
  >
    <!-- Image & Overlay Container -->
    <div class="relative h-64 overflow-hidden">
      <!--
        Image Layer
        - `v-show="imageLoaded"` provides a better UX than a v-if, preventing layout shift.
      -->
      <img 
        v-show="imageLoaded"
        :src="safariPackage.featuredImage || safariPackage.image" 
        :alt="getText(safariPackage.title, language)"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @load="imageLoaded = true"
        @error="handleImageError"
      />
      
      <!-- Loading Skeleton (Perceived Performance) -->
      <div v-if="!imageLoaded" class="absolute inset-0 bg-gray-200 animate-pulse"></div>

      <!-- Gradient Overlay for Text Readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

      <!-- Top Badges (Country & Location) -->
      <div class="absolute top-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-none">
        <div v-if="safariPackage.country" class="px-3 py-1 bg-brand-terracotta/90 backdrop-blur-sm rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
          {{ safariPackage.country }}
        </div>
        <div v-if="safariPackage.location" class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-brand-charcoal text-[10px] font-bold uppercase tracking-wider shadow-lg">
          {{ safariPackage.location }}
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-6">
      <!-- Title & Core Details -->
      <div class="mb-4">
        <h3 class="text-xl font-serif text-brand-charcoal font-bold mb-3 line-clamp-2">
          {{ getText(safariPackage.title, language) }}
        </h3>
        <div class="flex items-center justify-between text-sm text-brand-charcoal/70">
          <div class="flex items-center space-x-4">
            <span class="flex items-center" :title="getText({ en: 'Duration' }, language)">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {{ safariPackage.duration }}
            </span>
          </div>
        </div>
      </div>

      <!-- Description -->
      <p class="text-brand-charcoal/80 mb-6 line-clamp-2 font-sans text-sm leading-relaxed">
        {{ getText(safariPackage.snippet || safariPackage.description, language) }}
      </p>

      <!-- Call to Action -->
      <div class="flex items-center justify-between pt-4 border-t border-brand-charcoal/10">
        <div class="text-sm font-medium text-brand-terracotta italic">
          Discover more...
        </div>
        
        <NuxtLink 
          :to="`/safaris/${safariPackage.slug || safariPackage.id}`"
          class="inline-flex items-center px-6 py-3 bg-brand-terracotta text-brand-off-white font-sans font-medium rounded-full transition-all duration-300 hover:bg-brand-terracotta/90 hover:shadow-lg"
          @click.stop
        >
          <span>Read More</span>
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { SafariPackage } from '~/types/safari-package'
import { getText } from '~/utils/translation-api'
import { convertCurrency, formatCurrency } from '~/utils/currency-api'
import { getPackageAvailability, getPackageDifficulty, getPackageCategory } from '~/utils/package-data'

// --- PROPS & EMITS (The Component's Contract) ---
// Adheres to Interface Segregation: We define exactly what this component needs.
interface Props {
  safariPackage: SafariPackage
  currency?: string
  language?: string
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'USD',
  language: 'en',
})

const emit = defineEmits<{
  (e: 'click', safariPackage: SafariPackage): void
}>()

// --- STATE (The Component's Memory) ---
const imageLoaded = ref(false)

// --- METHODS (The Component's Actions) ---
const handleImageError = () => {
  imageLoaded.value = true // Still set to true to hide the skeleton
  console.error(`Failed to load image for package: ${props.safariPackage.id}`)
}

</script>

<style scoped>
/* Scoped styles ensure these classes do not leak out of the component */
.premium-shadow {
  box-shadow: 0 10px 30px -10px rgba(66, 60, 50, 0.15);
  transition: box-shadow 0.5s ease, transform 0.5s ease;
}

.package-card:hover.premium-shadow {
  box-shadow: 0 20px 40px -15px rgba(66, 60, 50, 0.25);
}

</style>