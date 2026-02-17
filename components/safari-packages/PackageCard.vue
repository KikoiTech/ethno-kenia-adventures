<template>
  <div
    class="package-card group bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer premium-shadow"
  >
    <!-- Image Container -->
    <div class="relative h-64 overflow-hidden bg-gray-200">
      <!-- 
        OPTIMIZED IMAGE COMPONENT 
        This replaces the standard <img> tag and the manual loading logic.
      -->
      <NuxtImg 
        provider="cloudinary"
        :src="cleanImageId" 
        :alt="getText(safariPackage.title, language)"
        
        :loading="index === 0 ? 'eager' : 'lazy'"
        :fetchpriority="index === 0 ? 'high' : 'auto'"
        :preload="index === 0"

        sizes="sm:380px md:400px lg:400px" 
        
        format="webp"
        quality="70"
        
        width="400"
        height="300"
        
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <!-- Gradient Overlay for Text Readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

      <!-- Top Badges -->
      <div class="absolute top-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-none">
        <div v-if="safariPackage.country && safariPackage.country.length > 0" class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-brand-charcoal text-[10px] font-bold uppercase tracking-wider shadow-lg">
          {{ safariPackage.country.join(' / ') }}
        </div>
        <!-- <div v-if="safariPackage.location" class="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-brand-charcoal text-[10px] font-bold uppercase tracking-wider shadow-lg">
          {{ safariPackage.location }}
        </div> -->
      </div>
    </div>

    <!-- Content Section -->
    <div class="p-6">
      <div class="mb-4">
        <h3 class="text-xl font-serif text-brand-charcoal font-bold mb-3 line-clamp-2">
          {{ getText(safariPackage.title, language) }}
        </h3>
        <div class="flex items-center justify-between text-sm text-brand-charcoal/70">
          <div class="flex items-center space-x-4">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1.5 text-brand-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {{ safariPackage.duration }}
            </span>
          </div>
        </div>
      </div>

      <p class="text-brand-charcoal/80 mb-6 line-clamp-2 font-sans text-sm leading-relaxed">
        {{ getText(safariPackage.snippet || safariPackage.description, language) }}
      </p>

      <div class="flex items-center justify-between pt-4 border-t border-brand-charcoal/10">
        <!-- <div class="text-sm font-medium text-brand-terracotta italic">
          From {{ safariPackage.price }}
        </div> -->
        
        <NuxtLink 
          :to="`/safari-packages/${safariPackage.slug || safariPackage.id}`"
          class="inline-flex items-center px-6 py-2.5 bg-brand-terracotta text-brand-off-white font-sans font-medium rounded-full transition-all duration-300 hover:bg-brand-charcoal hover:shadow-lg"
        >
          <span>View Details</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SafariPackage } from '~/types/safari-package'
import { getText } from '~/utils/translation-api'

interface Props {
  safariPackage: SafariPackage
  language?: string
  index?: number // Essential for the LCP logic
}

const props = withDefaults(defineProps<Props>(), {
  language: 'en',
  index: 1 // Default to 1 so only the actual index 0 card is "Eager"
})

// --- DATA CLEANING ---
// This ensures that even if your JSON has the full URL, Nuxt Image only uses the ID
const cleanImageId = computed(() => {
  const img = props.safariPackage.featuredImage || props.safariPackage.image || ''
  // If it's a full URL, strip the Cloudinary parts to get just the ID
  return img.replace('https://res.cloudinary.com/dmdihuyvn/image/upload/', '')
})
</script>

<style scoped>
.premium-shadow {
  box-shadow: 0 10px 30px -10px rgba(66, 60, 50, 0.15);
}

.package-card:hover {
  box-shadow: 0 20px 40px -15px rgba(66, 60, 50, 0.25);
}
</style>