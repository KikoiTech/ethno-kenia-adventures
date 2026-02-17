<template>
  <div v-if="safariPackage" class="safari-booking-page bg-brand-off-white min-h-screen">
    
    <!-- 1. CINEMATIC HERO SECTION (Matching Screenshot) -->
    <section class="relative h-[65vh] md:h-[75vh] overflow-hidden">
      <!-- Image Layer -->
      <NuxtImg 
        provider="cloudinary"
        :src="cleanHeroImage" 
        :alt="getText(safariPackage.title, currentLanguage)"
        class="w-full h-full object-cover"
        loading="eager"
        fetchpriority="high"
        preload
        format="webp"
        quality="80"
      />
      
      <!-- Overlay Gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/90 via-brand-charcoal/20 to-transparent z-10"></div>

      <!-- Hero Text Overlay (Bottom Aligned) -->
      <div class="absolute bottom-0 left-0 w-full z-20 pb-16 md:pb-24">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl">
            <!-- Category Badge -->
            <span class="inline-block px-3 py-1 bg-brand-terracotta text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-4 rounded-sm">
              {{ safariPackage.category || 'Safari Experience' }}
            </span>
            <h1 class="text-4xl md:text-7xl font-serif text-white leading-tight mb-4 drop-shadow-lg">
              {{ getText(safariPackage.title, currentLanguage) }}
            </h1>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. MAIN CONTENT GRID -->
    <div class="container mx-auto px-6 py-12 md:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- LEFT: DETAILS & ITINERARY (Col-span 8) -->
        <div class="lg:col-span-8">
          
          <!-- QUICK FACTS BAR -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-brand-charcoal/10 mb-12">
            <div class="flex flex-col items-center md:items-start text-center md:text-left">
              <span class="text-[10px] uppercase tracking-widest text-brand-terracotta font-bold mb-1">Duration</span>
              <span class="text-xl font-serif font-bold text-brand-charcoal">{{ safariPackage.duration }}</span>
            </div>
            <div class="flex flex-col items-center md:items-start text-center md:text-left">
              <span class="text-[10px] uppercase tracking-widest text-brand-terracotta font-bold mb-1">Location</span>
              <span class="text-xl font-serif font-bold text-brand-charcoal">{{ safariPackage.location }}</span>
            </div>
            <div class="flex flex-col items-center md:items-start text-center md:text-left">
              <span class="text-[10px] uppercase tracking-widest text-brand-terracotta font-bold mb-1">Max Guests</span>
              <span class="text-xl font-serif font-bold text-brand-charcoal">{{ safariPackage.availability?.maxGroupSize || 'Flexible' }}</span>
            </div>
            <div class="flex flex-col items-center md:items-start text-center md:text-left">
              <span class="text-[10px] uppercase tracking-widest text-brand-terracotta font-bold mb-1">Pace</span>
              <span class="text-xl font-serif font-bold text-brand-charcoal">{{ safariPackage.pace || 'Balanced' }}</span>
            </div>
          </div>

          <!-- OVERVIEW section -->
          <div class="mb-20">
            <h2 class="text-3xl font-serif text-brand-charcoal mb-8">Overview</h2>
            <div class="prose max-w-none text-brand-charcoal/80 leading-relaxed text-lg font-light">
              {{ getText(safariPackage.description, currentLanguage) }}
            </div>
          </div>

          <!-- YOUR JOURNEY (ITINERARY) -->
          <div class="mb-20">
            <h2 class="text-3xl font-serif text-brand-charcoal mb-10">Your Journey</h2>
            
            <div class="relative space-y-4">
              <!-- Vertical Path Line (Behind circles) -->
              <div class="absolute left-4 top-0 bottom-0 w-px bg-brand-charcoal/10 z-0"></div>

              <div 
                v-for="(step, index) in safariPackage.itinerary" 
                :key="index"
                class="relative pl-12 z-10"
              >
                <!-- Timeline Circle -->
                <div class="absolute left-0 top-6 w-8 h-8 rounded-full border border-brand-charcoal/20 bg-brand-off-white flex items-center justify-center">
                   <div class="w-2 h-2 rounded-full bg-brand-terracotta"></div>
                </div>

                <!-- Accordion Content -->
                <div class="bg-white rounded-xl border border-gray-100 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                  <span class="text-[10px] uppercase tracking-widest text-brand-terracotta font-bold mb-2 block">
                    {{ step.time || `Day ${index + 1}` }}
                  </span>
                  <h3 class="text-xl font-serif font-bold text-brand-charcoal mb-4">{{ step.title }}</h3>
                  <p class="text-brand-charcoal/70 text-sm leading-relaxed">{{ step.details }}</p>
                  
                  <!-- Activity Tags (if exist) -->
                  <div v-if="step.activities" class="flex flex-wrap gap-2 mt-4">
                    <span v-for="(act, actIndex) in step.activities" :key="actIndex" class="text-[10px] bg-brand-sand px-2 py-1 rounded text-brand-charcoal/60 uppercase">
                      {{ getText(act, currentLanguage) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- INCLUSIONS / EXCLUSIONS -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 border-t pt-20">
            <div>
              <h3 class="text-xl font-serif mb-6">What's Included</h3>
              <ul class="space-y-4">
                <li v-for="(item, index) in safariPackage.includes" :key="index" class="flex items-start text-sm text-brand-charcoal/70">
                  <svg class="w-4 h-4 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  {{ getText(item, currentLanguage) }}
                </li>
              </ul>
            </div>
            <div>
              <h3 class="text-xl font-serif mb-6 text-gray-500">Not Included</h3>
              <ul class="space-y-4">
                <li v-for="(item, index) in safariPackage.excludes" :key="index" class="flex items-start text-sm text-gray-400">
                  <svg class="w-4 h-4 text-brand-terracotta/40 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  {{ getText(item, currentLanguage) }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- RIGHT: THE STICKY INQUIRY FORM (Col-span 4) -->
        <aside class="lg:col-span-4 h-full">
          <div class="sticky top-24">
            <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <!-- Sidebar Header -->
              <div class="bg-brand-charcoal/5 p-8 text-center border-b border-gray-100">
                <span class="text-[10px] uppercase tracking-widest text-brand-charcoal/40 font-bold block mb-2">Package Investment</span>
                <div class="flex items-baseline justify-center gap-2">
                  <span class="text-sm font-serif text-brand-charcoal/40">USD</span>
                  <span class="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal">
                    {{ (typeof safariPackage.price === 'object') ? (safariPackage.price.USD || 'Ask') : (safariPackage.price || 'Ask') }}
                  </span>
                </div>
              </div>

              <!-- Detailed Inquiry Form -->
              <div class="p-8">
                <h3 class="text-2xl font-serif text-center mb-2">Inquire About This Safari</h3>
                <p class="text-center text-xs text-brand-charcoal/40 mb-8">Fill in your details and we'll get back to you within 24 hours</p>

                <form @submit.prevent="handleInquiry" class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="First Name" class="form-input" required />
                    <input type="text" placeholder="Last Name" class="form-input" required />
                  </div>
                  <input type="tel" placeholder="Phone" class="form-input" required />
                  <input type="email" placeholder="Email" class="form-input" required />
                  <select class="form-input">
                    <option value="">Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="KE">Kenya</option>
                  </select>

                  <div>
                    <label class="text-[10px] uppercase tracking-wider font-bold mb-1 block">When would you like to travel?</label>
                    <input type="date" class="form-input" />
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="text-[8px] uppercase tracking-wider font-bold mb-1 block">Number of Adults</label>
                      <input type="number" value="1" class="form-input" />
                    </div>
                    <div>
                      <label class="text-[8px] uppercase tracking-wider font-bold mb-1 block">Number of Children</label>
                      <input type="number" value="0" class="form-input" />
                    </div>
                  </div>

                  <textarea placeholder="Extra Details" rows="3" class="form-input"></textarea>

                  <div class="flex items-start gap-3 py-4">
                    <input type="checkbox" class="mt-1" required />
                    <p class="text-[9px] text-gray-500 leading-tight">I agree to the terms and understand this is a subject to availability.</p>
                  </div>

                  <button class="w-full py-4 bg-[#006699] text-white rounded-lg font-bold hover:bg-brand-charcoal transition-all shadow-md uppercase tracking-wider text-sm">
                    Submit Booking
                  </button>
                </form>

                <!-- Trust Badges -->
                <div class="mt-8 space-y-3 pt-6 border-t border-gray-100">
                  <div class="flex items-center text-[10px] text-gray-400">
                    <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    Secure Inquiry Process
                  </div>
                  <div class="flex items-center text-[10px] text-gray-400">
                     <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                    Expert Local Guides
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { getText } from '~/utils/translation-api'
import { getSafariBySlug } from '~/utils/package-loader'

const route = useRoute()
const currentLanguage = ref('en')
const slug = route.params.slug as string

// DATA FETCHING: SSR-optimized
const { data: safariPackage, pending: loading, error } = await useAsyncData(
  `safari-pkg-${slug}`, 
  () => getSafariBySlug(slug)
)

// GUARD: If slug not found, throw Nuxt error
if (!loading.value && !safariPackage.value) {
  throw createError({ statusCode: 404, statusMessage: 'Package not found' })
}

// PERFORMANCE: Clean Cloudinary ID
const cleanHeroImage = computed(() => {
  if (!safariPackage.value) return ''
  const img = safariPackage.value.featuredImage || safariPackage.value.image || ''
  return img.replace('https://res.cloudinary.com/dmdihuyvn/image/upload/', '')
})

// FORM HANDLER
const handleInquiry = () => {
  alert('Thank you! Inquiry received.')
}

// SEO
useHead({
  title: () => safariPackage.value ? `${getText(safariPackage.value.title, currentLanguage.value)} | Ethno Kenia Adventure` : 'Safari Package',
})
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-terracotta focus:outline-none transition-all text-sm;
}
.prose p { margin-bottom: 1.5rem; }
</style>