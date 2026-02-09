<template>
  <div class="safari-booking-page bg-brand-off-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-80 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-brand-charcoal/80 to-brand-terracotta/80 z-10"></div>
      <img 
        :src="safariPackage?.image || '/images/hero-safari.jpg'" 
        :alt="getText(safariPackage?.title || { en: 'Safari Package' }, currentLanguage)"
        class="w-full h-full object-cover"
      >
      <div class="relative z-20 h-full flex items-center justify-center text-center text-white">
        <div class="max-w-4xl mx-auto px-6">
          <h1 class="text-4xl md:text-5xl font-serif mb-4">
            {{ getText(safariPackage?.title || { en: 'Safari Package' }, currentLanguage) }}
          </h1>
          <p class="text-xl font-light">
            {{ getText(safariPackage?.description || { en: 'Safari adventure experience' }, currentLanguage) }}
          </p>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="py-16 text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-terracotta"></div>
      <p class="mt-4 text-brand-charcoal/80">Loading safari package...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-16 text-center">
      <div class="text-red-500 text-xl mb-4">Package not found</div>
      <p class="text-brand-charcoal/80 mb-8">{{ error }}</p>
      <NuxtLink 
        to="/safari-packages" 
        class="px-6 py-3 bg-brand-terracotta text-white rounded-full hover:bg-brand-terracotta/90 transition-colors"
      >
        Back to Safari Packages
      </NuxtLink>
    </div>

    <!-- Package Content -->
    <div v-else-if="safariPackage" class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Package Details -->
          <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 class="text-2xl font-serif text-brand-charcoal mb-6">Package Details</h2>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div class="text-center">
                <div class="text-3xl font-bold text-brand-terracotta">{{ safariPackage.duration }}</div>
                <div class="text-brand-charcoal/60 text-sm">Duration</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-brand-terracotta">{{ safariPackage.difficulty }}</div>
                <div class="text-brand-charcoal/60 text-sm">Difficulty</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-brand-terracotta">{{ safariPackage.availability.minGroupSize }}-{{ safariPackage.availability.maxGroupSize }}</div>
                <div class="text-brand-charcoal/60 text-sm">Group Size</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-brand-terracotta">${{ safariPackage.price.USD }}</div>
                <div class="text-brand-charcoal/60 text-sm">Starting Price</div>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-8">
              <h3 class="text-xl font-serif text-brand-charcoal mb-4">About This Safari</h3>
              <p class="text-brand-charcoal/80 leading-relaxed">
                {{ getText(safariPackage.description, currentLanguage) }}
              </p>
            </div>

            <!-- Highlights -->
            <div class="mb-8">
              <h3 class="text-xl font-serif text-brand-charcoal mb-4">Highlights</h3>
              <ul class="space-y-2">
                <li v-for="(highlight, index) in safariPackage.highlights" :key="index" class="flex items-start">
                  <svg class="w-5 h-5 text-brand-terracotta mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-brand-charcoal/80">{{ getText(highlight, currentLanguage) }}</span>
                </li>
              </ul>
            </div>

            <!-- Gallery -->
            <div v-if="safariPackage.gallery && safariPackage.gallery.length > 0" class="mb-8">
              <h3 class="text-xl font-serif text-brand-charcoal mb-4">Gallery</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <img 
                  v-for="(image, index) in safariPackage.gallery" 
                  :key="index"
                  :src="image" 
                  :alt="`Gallery image ${index + 1}`"
                  class="w-full h-32 object-cover rounded-lg"
                >
              </div>
            </div>
          </div>

          <!-- What's Included/Excluded -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Included -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h3 class="text-xl font-serif text-brand-charcoal mb-4">What's Included</h3>
              <ul class="space-y-2">
                <li v-for="(item, index) in safariPackage.included" :key="index" class="flex items-start">
                  <svg class="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-brand-charcoal/80">{{ getText(item, currentLanguage) }}</span>
                </li>
              </ul>
            </div>

            <!-- Excluded -->
            <div class="bg-white rounded-2xl shadow-lg p-8">
              <h3 class="text-xl font-serif text-brand-charcoal mb-4">What's Not Included</h3>
              <ul class="space-y-2">
                <li v-for="(item, index) in safariPackage.excluded" :key="index" class="flex items-start">
                  <svg class="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-brand-charcoal/80">{{ getText(item, currentLanguage) }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Booking Card -->
          <div class="bg-white rounded-2xl shadow-lg p-8 sticky top-8">
            <div class="text-center mb-6">
              <div class="text-3xl font-bold text-brand-terracotta mb-2">
                ${{ safariPackage.price.USD }}
              </div>
              <div class="text-brand-charcoal/60">Starting from USD</div>
            </div>

            <div class="space-y-4 mb-6">
              <div class="flex justify-between">
                <span class="text-brand-charcoal/80">Duration:</span>
                <span class="font-medium">{{ safariPackage.duration }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-brand-charcoal/80">Difficulty:</span>
                <span class="font-medium">{{ safariPackage.difficulty }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-brand-charcoal/80">Group Size:</span>
                <span class="font-medium">{{ safariPackage.availability.minGroupSize }}-{{ safariPackage.availability.maxGroupSize }} people</span>
              </div>
            </div>

            <button
              @click="openBookingModal"
              class="w-full py-4 bg-brand-terracotta text-white rounded-full hover:bg-brand-terracotta/90 transition-colors font-medium mb-4"
            >
              Book This Safari
            </button>

            <div class="text-center text-brand-charcoal/60 text-sm">
              <p>Deposit: {{ safariPackage.bookingInfo.deposit }}%</p>
              <p>Free cancellation up to {{ safariPackage.bookingInfo.cancellationPolicy }}</p>
            </div>
          </div>

          <!-- Contact Info -->
          <div class="bg-white rounded-2xl shadow-lg p-8 mt-8">
            <h3 class="text-xl font-serif text-brand-charcoal mb-4">Need Help?</h3>
            <div class="space-y-3">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-brand-terracotta mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span class="text-brand-charcoal/80">{{ safariPackage.bookingInfo.contact.email }}</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-brand-terracotta mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span class="text-brand-charcoal/80">{{ safariPackage.bookingInfo.contact.phone }}</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-brand-terracotta mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
                </svg>
                <span class="text-brand-charcoal/80">WhatsApp Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Modal -->
    <div v-if="showBookingModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-black/50" @click="closeBookingModal"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <button
            @click="closeBookingModal"
            class="absolute top-4 right-4 text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="p-8">
            <div class="text-center mb-8">
              <h2 class="text-3xl font-serif text-brand-charcoal mb-4">Book Your Safari Adventure</h2>
              <p class="text-brand-charcoal/80">Fill in your details and we'll get back to you within 24 hours</p>
            </div>
            
            <BookingForm
              v-if="safariPackage"
              :package="safariPackage"
              :language="currentLanguage"
              :show-package-selection="false"
              @submit="handleBookingSubmit"
              @success="handleBookingSuccess"
              @error="handleBookingError"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-black/50" @click="closeSuccessModal"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-2xl font-serif text-brand-charcoal mb-4">Booking Request Submitted!</h3>
            <p class="text-brand-charcoal/80 mb-6">
              Thank you for choosing Ethno Kenia Adventures. We'll contact you within 24 hours to confirm your safari adventure.
            </p>
            <div class="flex gap-4 justify-center">
              <button
                @click="closeSuccessModal"
                class="px-8 py-3 bg-brand-terracotta text-white rounded-full hover:bg-brand-terracotta/90 transition-colors"
              >
                Continue Browsing
              </button>
              <button
                @click="closeSuccessModal; $router.push('/safari-packages')"
                class="px-8 py-3 border border-brand-terracotta text-brand-terracotta rounded-full hover:bg-brand-terracotta/10 transition-colors"
              >
                Back to Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SafariPackage } from '~/types/safari-package'
import { getText } from '~/utils/translation-api'
import { getPackageBySlug } from '~/utils/package-loader'

// Components
import BookingForm from '~/components/safari-packages/BookingForm.vue'

// Page meta
definePageMeta({
  title: 'Safari Package Booking - Ethno Kenia Adventures',
  description: 'Book your dream African safari adventure with Ethno Kenia Adventures'
})

// Reactive state
const route = useRoute()
const currentLanguage = ref('en')
const showBookingModal = ref(false)
const showSuccessModal = ref(false)

// Load package data using useAsyncData for SSR compatibility
const { data: safariPackage, pending: loading, error } = await useAsyncData(
  `safari-package-${route.params.slug}`,
  () => getPackageBySlug(route.params.slug as string)
)

// Handle 404 if package not found
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Safari package not found'
  })
}

// SEO meta
useHead({
  title: () => safariPackage.value ? 
    `${getText(safariPackage.value.title, currentLanguage.value)} - Ethno Kenia Adventures` : 
    'Safari Package - Ethno Kenia Adventures',
  meta: [
    {
      name: 'description',
      content: () => safariPackage.value ? 
        getText(safariPackage.value.description, currentLanguage.value) : 
        'Book your dream African safari adventure with Ethno Kenia Adventures'
    }
  ]
})

// Methods
const openBookingModal = () => {
  showBookingModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeBookingModal = () => {
  showBookingModal.value = false
  document.body.style.overflow = 'auto'
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  document.body.style.overflow = 'auto'
}

const handleBookingSubmit = (bookingData: any) => {
  console.log('Booking submitted:', bookingData)
  closeBookingModal()
}

const handleBookingSuccess = (bookingData: any) => {
  console.log('Booking successful:', bookingData)
  closeBookingModal()
  showSuccessModal.value = true
}

const handleBookingError = (error: string) => {
  console.error('Booking error:', error)
  // You could show an error toast here
}
</script>

<style scoped>
/* Custom animations and styles */
.sticky {
  position: sticky;
  top: 2rem;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #ea580c;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #d97706;
}
</style>