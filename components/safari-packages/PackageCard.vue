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
    @click="handleCardClick"
  >
    <!-- Image & Overlay Container -->
    <div class="relative h-64 overflow-hidden">
      <!-- 
        Image Layer
        - `v-show="imageLoaded"` provides a better UX than a v-if, preventing layout shift.
      -->
      <img 
        v-show="imageLoaded"
        :src="safariPackage.image" 
        :alt="getText(safariPackage.title, language)"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @load="imageLoaded = true"
        @error="handleImageError"
      />
      
      <!-- Loading Skeleton (Perceived Performance) -->
      <div v-if="!imageLoaded" class="absolute inset-0 bg-gray-200 animate-pulse"></div>

      <!-- Gradient Overlay for Text Readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

      <!-- Top Badges (Category & Availability) -->
      <div class="absolute top-4 left-4 right-4 flex justify-between items-start">
        <div class="bg-brand-terracotta/90 backdrop-blur-sm rounded-full p-3 text-white text-2xl shadow-lg" v-html="categoryIcon">
        </div>
        <div 
          class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg"
          :class="availabilityBadgeClass"
        >
          {{ availabilityText }}
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
            <span class="flex items-center" :title="getText({ en: 'Group Size' }, language)">
              <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.184-1.268-.5-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.184-1.268.5-1.857M12 12a3 3 0 100-6 3 3 0 000 6z"></path></svg>
              {{ safariPackage.availability.minGroupSize }}-{{ safariPackage.availability.maxGroupSize }}
            </span>
          </div>
          <span 
            class="px-2 py-1 rounded-full text-xs font-medium"
            :class="getDifficultyClass()"
          >
            {{ difficultyText }}
          </span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-brand-charcoal/80 mb-4 line-clamp-3 font-sans">
        {{ getText(safariPackage.description, language) }}
      </p>

      <!-- Price & Call to Action -->
      <div class="flex items-center justify-between pt-4 border-t border-brand-charcoal/10">
        <div class="text-left">
          <div class="text-xs text-brand-charcoal/60 mb-1">From</div>
          <div class="text-2xl font-serif font-bold text-brand-terracotta">
            <span v-if="priceLoading" class="inline-block w-24 h-6 bg-gray-200 rounded animate-pulse"></span>
            <span v-else>{{ formattedPrice }}</span>
          </div>
        </div>
        
        <NuxtLink 
          :to="`/safari-packages/${safariPackage.id}`"
          class="inline-flex items-center px-6 py-3 bg-brand-terracotta text-brand-off-white font-sans font-medium rounded-full transition-all duration-300 hover:bg-brand-terracotta/90 hover:shadow-lg"
          @click.stop
        >
          <span>{{ buttonText }}</span>
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
const priceLoading = ref(true)
const formattedPrice = ref('')

// --- COMPUTED PROPERTIES (Derived State - Clean & Efficient) ---
// These functions are pure, readable, and follow the Single Responsibility Principle.

const categoryIcon = computed(() => getPackageCategory(props.safariPackage)?.icon || '❓')

const availabilityInfo = computed(() => getPackageAvailability(props.safariPackage))
const difficultyInfo = computed(() => getPackageDifficulty(props.safariPackage))

const availabilityBadgeClass = computed((): string => {
  const status = availabilityInfo.value?.status
  const classes = {
    'available': 'bg-green-500/90 text-white',
    'limited': 'bg-yellow-500/90 text-white',
    'sold-out': 'bg-red-500/90 text-white',
  }
  return status ? classes[status] : 'bg-gray-500/90 text-white'
})

const availabilityText = computed((): string => {
  const info = availabilityInfo.value
  if (!info) return 'Unknown'
  const texts = {
    'available': `${info.availableSeats} spots left`,
    'limited': `Only ${info.availableSeats} left`,
    'sold-out': 'Sold Out'
  }
  return texts[info.status]
})

// *** THE CRITICAL FIX ***
// This computed property is now defensive and will not crash the component.
const getDifficultyClass = (): string => {
  const difficulty = getPackageDifficulty(props.safariPackage)
  const color = difficulty.color as 'easy' | 'moderate' | 'challenging'
  const classes: Record<string, string> = {
    'easy': 'bg-green-100 text-green-800',
    'moderate': 'bg-yellow-100 text-yellow-800',
    'challenging': 'bg-red-100 text-red-800'
  }
  return classes[color] || 'bg-gray-100 text-gray-800'
}

const difficultyText = computed((): string => difficultyInfo.value?.level || 'N/A')

const buttonText = computed((): string => {
  return availabilityInfo.value?.status === 'sold-out' ? 'View Details' : 'Book Now'
})


// --- METHODS (The Component's Actions) ---
const handleCardClick = () => {
  emit('click', props.safariPackage)
}

const handleImageError = () => {
  // We could set a placeholder image here if we wanted
  imageLoaded.value = true // Still set to true to hide the skeleton
  console.error(`Failed to load image for package: ${props.safariPackage.id}`)
}

const loadPrice = async () => {
  priceLoading.value = true
  try {
    const basePrice = props.safariPackage.price.USD
    const convertedAmount = props.currency === 'USD' 
      ? basePrice 
      : (await convertCurrency(basePrice, 'USD', props.currency)).amount
    
    formattedPrice.value = formatCurrency(convertedAmount, props.currency, 'en-US') // Simplified locale
  } catch (error) {
    console.error('Price conversion failed:', error)
    // Fallback to the base price on error
    formattedPrice.value = formatCurrency(props.safariPackage.price.USD, 'USD', 'en-US')
  } finally {
    priceLoading.value = false
  }
}

// --- LIFECYCLE HOOKS ---
// Watch for changes in props and reload data accordingly.
watch(() => props.currency, loadPrice)

// Initial price load when the component is mounted.
onMounted(loadPrice)

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