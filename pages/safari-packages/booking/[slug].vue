<template>
  <div class="safari-booking-page bg-brand-off-white min-h-screen">
    
    <!-- OPTIMIZED HERO SECTION -->
    <section class="relative h-[60vh] overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-brand-charcoal/80 to-brand-terracotta/40 z-10"></div>
      
      <NuxtImg 
        provider="cloudinary"
        :src="safariPackage?.image" 
        :alt="getText(safariPackage?.title || { en: '' }, currentLanguage)"
        
        loading="eager"
        fetchpriority="high"
        preload
        
        format="webp"
        quality="80"
        sizes="sm:100vw md:100vw lg:100vw"
        class="w-full h-full object-cover"
      />

      <div class="relative z-20 h-full flex items-center justify-center text-center text-white">
        <div class="max-w-4xl mx-auto px-6">
          <h1 class="text-4xl md:text-6xl font-serif mb-4 drop-shadow-lg">
            {{ getText(safariPackage?.title || { en: '' }, currentLanguage) }}
          </h1>
          <div class="w-24 h-1 bg-brand-terracotta mx-auto mb-4"></div>
          <p class="text-xl font-light opacity-90 max-w-2xl mx-auto">
            {{ getText(safariPackage?.shortTitle || { en: '' }, currentLanguage) }}
          </p>
        </div>
      </div>
    </section>

    <!-- CONTENT SECTION (With defensive checks) -->
    <div v-if="safariPackage" class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <!-- QUICK FACTS BAR -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-gray-100 mb-8">
               <div class="text-center">
                  <span class="block text-brand-terracotta font-bold text-2xl">{{ safariPackage.duration }}</span>
                  <span class="text-xs uppercase tracking-widest opacity-50">Duration</span>
               </div>
               <!-- Add others (Price, Group Size, etc.) -->
            </div>

            <!-- DESCRIPTION -->
            <div class="prose max-w-none text-brand-charcoal/80">
              <h2 class="font-serif text-2xl mb-4 text-brand-charcoal">Expedition Overview</h2>
              <p class="leading-relaxed">{{ getText(safariPackage.description, currentLanguage) }}</p>
            </div>
            
            <!-- OPTIMIZED GALLERY -->
            <div v-if="safariPackage.gallery?.length" class="mt-12">
              <h3 class="font-serif text-xl mb-6">Gallery</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <NuxtImg 
                  v-for="(img, idx) in safariPackage.gallery" 
                  :key="idx"
                  provider="cloudinary"
                  :src="img"
                  loading="lazy"
                  width="300"
                  height="200"
                  format="webp"
                  class="rounded-lg object-cover w-full h-40 hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- STICKY SIDEBAR -->
        <aside class="lg:col-span-1">
          <div class="sticky top-28 bg-white rounded-2xl shadow-xl p-8 border-t-4 border-brand-terracotta">
             <!-- Price & Booking Button -->
             <div class="mb-6">
                <span class="text-sm text-gray-500 uppercase tracking-tighter">Starting from</span>
                <div class="text-4xl font-serif font-bold text-brand-charcoal">${{ safariPackage.price?.USD || safariPackage.price }}</div>
             </div>
             
             <!-- Add a Guard for availability -->
             <div v-if="safariPackage.availability" class="space-y-4 mb-8 text-sm">
                <div class="flex justify-between">
                   <span>Group Size:</span>
                   <span class="font-bold">{{ safariPackage.availability.minGroupSize }}-{{ safariPackage.availability.maxGroupSize }} People</span>
                </div>
             </div>

             <button @click="openBookingModal" class="w-full py-4 bg-brand-terracotta text-white rounded-full font-bold hover:bg-brand-charcoal transition-colors shadow-lg">
                Inquire About This Safari
             </button>
          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SafariPackage } from '~/types/safari-package'
import { getText } from '~/utils/translation-api'
import { getSafariBySlug } from '~/utils/package-loader'

const route = useRoute()
const currentLanguage = ref('en')
const showBookingModal = ref(false)
const showSuccessModal = ref(false)

// 1. DATA FETCHING (Using the unique slug from URL)
const { data: safariPackage, pending: loading, error: fetchError } = await useAsyncData(
  `safari-package-${route.params.slug}`,
  () => getSafariBySlug(route.params.slug as string)
)

// 2. ERROR HANDLING
// If the package is not found in the JSON list, throw a 404
if (!loading.value && !safariPackage.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Safari package '${route.params.slug}' not found in our records.`
  })
}

// 3. SEO (Lighthouse Optimization)
useHead({
  title: () => safariPackage.value ? 
    `${getText(safariPackage.value.title, currentLanguage.value)} | Ethno Kenia Adventure` : 
    'Safari Package',
  meta: [
    {
      name: 'description',
      content: () => safariPackage.value ? 
        getText(safariPackage.value.description, currentLanguage.value) : 
        'Discover Africa with us.'
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