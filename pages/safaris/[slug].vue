<template>
  <div v-if="safari" class="safari-detail-page bg-brand-off-white min-h-screen">
    <!-- HERO SECTION: Cinematic Banner -->
    <section class="relative h-[65vh] w-full overflow-hidden">
      <img 
        :src="safari.featuredImage || safari.image" 
        :alt="getText(safari.title)"
        class="w-full h-full object-cover"
      />
      <!-- Soft Charcoal Overlay for Text Readability -->
      <div class="absolute inset-0 bg-brand-charcoal/30"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent"></div>
      
      <div class="absolute bottom-12 left-0 right-0">
        <div class="max-w-7xl mx-auto px-6">
          <div class="flex flex-col gap-4">
            <span class="inline-block px-4 py-1 bg-brand-terracotta text-white text-xs font-bold uppercase tracking-widest self-start rounded-sm">
              {{ safari.category }}
            </span>
            <h1 class="text-5xl md:text-7xl font-serif text-white max-w-4xl leading-[1.1]">
              {{ getText(safari.title) }}
            </h1>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN GRID: 70/30 Layout -->
    <main class="max-w-7xl mx-auto px-6 py-16">
      <div class="flex flex-col lg:flex-row gap-16">
        
        <!-- LEFT COLUMN (70%) -->
        <article class="lg:w-2/3">
          
          <!-- QUICK FACTS BOARD -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-brand-charcoal/10 mb-16">
            <div class="fact-item flex flex-col gap-2">
              <div class="flex items-center gap-2 text-brand-terracotta">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">Duration</span>
              </div>
              <span class="text-xl font-serif text-brand-charcoal font-bold">{{ safari.duration }}</span>
            </div>
            
            <div class="fact-item flex flex-col gap-2">
              <div class="flex items-center gap-2 text-brand-terracotta">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">Location</span>
              </div>
              <span class="text-xl font-serif text-brand-charcoal font-bold">{{ safari.location }}</span>
            </div>

            <div class="fact-item flex flex-col gap-2">
              <div class="flex items-center gap-2 text-brand-terracotta">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">Max Guests</span>
              </div>
              <span class="text-xl font-serif text-brand-charcoal font-bold">Flexible</span>
            </div>

            <div class="fact-item flex flex-col gap-2">
              <div class="flex items-center gap-2 text-brand-terracotta">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.143-5.714L5 12l5.714-2.143L13 3z" /></svg>
                <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-charcoal/40">Pace</span>
              </div>
              <span class="text-xl font-serif text-brand-charcoal font-bold">Balanced</span>
            </div>
          </div>

          <!-- OVERVIEW SECTION -->
          <section class="mb-20">
            <h2 class="text-3xl font-serif text-brand-charcoal mb-8 tracking-tight">Overview</h2>
            <p class="text-lg text-brand-charcoal/80 leading-relaxed font-sans max-w-3xl">
              {{ getText(safari.description) }}
            </p>
          </section>

          <!-- ITINERARY SECTION -->
          <section class="mb-20">
            <div class="flex items-center justify-between mb-10">
              <h2 class="text-3xl font-serif text-brand-charcoal tracking-tight">Your Journey</h2>
              <div class="h-px flex-1 bg-brand-charcoal/10 mx-8 hidden md:block"></div>
            </div>
            <ItineraryAccordion v-if="safari.itinerary && safari.itinerary.length" :itinerary="safari.itinerary" />
            <div v-else class="p-8 bg-brand-off-white rounded-xl border border-dashed border-brand-charcoal/20 text-center text-brand-charcoal/40">
              Complete itinerary details coming soon.
            </div>
          </section>

          <!-- INCLUDES / EXCLUDES -->
          <section class="grid md:grid-cols-2 gap-16 py-16 border-t border-brand-charcoal/10">
            <div class="inclusions">
              <h3 class="text-xl font-serif text-brand-charcoal mb-8">What's Included</h3>
              <ul class="space-y-4">
                <li v-for="item in safari.includes" :key="item" class="flex items-start gap-4 group">
                  <div class="mt-1 p-1 bg-green-100 text-green-700 rounded-full transition-colors group-hover:bg-green-200">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                  </div>
                  <span class="text-brand-charcoal/80 font-sans text-sm">{{ item }}</span>
                </li>
              </ul>
            </div>
            <div class="exclusions">
              <h3 class="text-xl font-serif text-brand-charcoal mb-8">Not Included</h3>
              <ul class="space-y-4">
                <li v-for="item in safari.excludes" :key="item" class="flex items-start gap-4 group">
                  <div class="mt-1 p-1 bg-gray-100 text-brand-charcoal/30 rounded-full transition-colors group-hover:bg-gray-200">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <span class="text-brand-charcoal/60 font-sans text-sm">{{ item }}</span>
                </li>
              </ul>
            </div>
          </section>
        </article>

        <!-- RIGHT COLUMN (30% Sticky Side Bar) -->
        <aside class="lg:w-1/3">
          <div class="sticky top-32">
            <div class="sidebar-card bg-white rounded-2xl p-10 premium-shadow relative overflow-hidden border border-brand-charcoal/5">
              
              <!-- HERITAGE TEXTURE: Papyrus SVG -->
              <div class="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style="background-image: url('/textures/papyrus.svg')"></div>
              
              <div class="relative z-10">
                <div class="mb-10 text-center">
                  <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-charcoal/30 block mb-2">Package Investment</span>
                  <div class="text-5xl font-serif text-brand-terracotta font-bold flex items-center justify-center gap-2">
                    <span class="text-2xl font-sans font-medium text-brand-charcoal/20">USD</span>
                    {{ safari.price || 'Ask' }}
                  </div>
                  <div v-if="safari.price" class="text-xs text-brand-charcoal/40 mt-3 italic">Per person sharing</div>
                </div>
                
                <BookingForm :package="safari" :showPackageSelection="false" />
                
                <div class="mt-8 pt-8 border-t border-brand-charcoal/5 flex flex-col gap-4">
                  <div class="flex items-center gap-3 text-brand-charcoal/60">
                    <svg class="w-5 h-5 text-brand-terracotta/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    <span class="text-xs">Secure Inquiry Process</span>
                  </div>
                  <div class="flex items-center gap-3 text-brand-charcoal/60">
                    <svg class="w-5 h-5 text-brand-terracotta/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span class="text-xs">Expert Local Guides</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Quick Help -->
            <!-- <div class="mt-8 px-6 text-center">
              <p class="text-sm text-brand-charcoal/60 mb-2">Prefer speaking to an expert?</p>
              <a href="tel:+254702373008" class="text-brand-terracotta font-bold hover:underline">+254 702 373 008</a>
            </div> -->
          </div>
        </aside>

      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getSafariBySlug } from '~/utils/package-loader'
import { getText } from '~/utils/translation-api'
import type { SafariPackage } from '~/types/safari-package'

// Components
import ItineraryAccordion from '~/components/safari-packages/ItineraryAccordion.vue'
import BookingForm from '~/components/safari-packages/BookingForm.vue'

const route = useRoute()
const slug = route.params.slug as string
const safari = ref<SafariPackage | null>(null)

// Load data
onMounted(async () => {
  safari.value = await getSafariBySlug(slug)
  
  if (safari.value) {
    const titleText = getText(safari.value.title)
    const descText = getText(safari.value.snippet || safari.value.description)
    
    useSeoMeta({
      title: `${titleText} | Ethno Kenia Adventures`,
      ogTitle: titleText,
      description: descText,
      ogDescription: descText,
      twitterCard: 'summary_large_image',
    })
  } else {
    // Handle 404
    throw createError({ statusCode: 404, statusMessage: 'Safari not found' })
  }
})

// Currency / Language (Mocks for now as per template)
const currentLanguage = ref('en')
</script>

<style scoped>
.premium-shadow {
  box-shadow: 0 40px 100px -20px rgba(26, 26, 26, 0.08);
}

.fact-item {
  position: relative;
}

@media (min-width: 768px) {
  .fact-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -1rem;
    top: 20%;
    bottom: 20%;
    width: 1px;
    background-color: rgba(26, 26, 26, 0.05);
  }
}

.sidebar-card {
  transition: transform 0.3s ease-out;
}

.sidebar-card:hover {
  transform: translateY(-4px);
}
</style>
