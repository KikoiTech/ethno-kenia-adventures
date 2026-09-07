<template>
  <div class="safari-packages-page min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    
    <!-- Hero Section -->
    <section class="relative h-screen overflow-hidden">
      <!-- Hero Background -->
      <div class="absolute inset-0">
        <NuxtImg
          provider="cloudinary"
          src="v1770905930/DSC_0247_dkzytn.jpg"
          alt="Kenyan Safari Landscape"
          class="w-full h-full object-cover"

          loading="eager"
          fetchpriority="high"
          preload

          format="webp"
          quality="80"
          sizes="sm:100vw md:100vw lg:100vw"
          width="1920"
          height="1080"
        />
        <!-- Dark left panel fading to a clear view of the photo by the midpoint + 20px -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#2A2B2A_0%,#2A2B2A_50%,transparent_calc(50%_+_400px),transparent_100%)]"></div>
        <!-- Short scrim so the fixed nav stays readable over the photo -->
        <div class="absolute top-0 inset-x-0 h-28 md:h-32 bg-gradient-to-b from-brand-charcoal/90 to-transparent pointer-events-none"></div>
      </div>

      <!-- Hero Content: left-aligned -->
      <div class="relative z-20 h-full flex items-center">
        <div class="container mx-auto px-6">
          <div class="max-w-xl text-left text-brand-off-white">
            <p class="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand-terracotta mb-4">
              Private Safaris · Kenya And Beyond
            </p>
            <h1 class="text-4xl md:text-6xl font-serif leading-tight mb-6">
              Tell Us Your Dream Safari.<br>
              <span class="italic text-brand-terracotta">We'll Build The Rest.</span>
            </h1>
            <p class="text-lg md:text-xl font-sans font-light text-brand-off-white/80 max-w-lg leading-relaxed">
              {{ getText({ en: "Journey into the heart of Africa's wilderness", es: "Viaja al corazón de la naturaleza africana", fr: "Voyage au cœur de la nature africaine", de: "Reise ins Herz der afrikanischen Wildnis", zh: "深入非洲荒野之心", ja: "アフリカの荒野の中心へ", sw: "Safiri kwa moyoni wa pori la Afrika" }, currentLanguage) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Scroll cue -->
      <div class="absolute bottom-8 left-6 md:left-10 z-20">
        <span class="text-xs font-sans uppercase tracking-[0.2em] text-brand-off-white/70">Scroll To Explore</span>
      </div>
    </section>

    <!-- Filter Section -->
    <section class="bg-brand-off-white">
      <div class="container mx-auto px-6 py-16">

        <!-- Header row: heading left, blurb right -->
        <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-10 border-b border-brand-charcoal/10">
          <div>
            <p class="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand-terracotta mb-4">
              Refine Your Search
            </p>
            <h2 class="text-4xl md:text-5xl font-serif leading-tight text-brand-charcoal">
              Find Where Your Story Begins.
            </h2>
          </div>
          <p class="font-sans text-base text-brand-charcoal/60 leading-relaxed max-w-sm">
            Sort by destination or trip length — or skip the filters entirely and let our team suggest a route worth taking.
          </p>
        </div>

        <!-- Filter row: two country groups + duration -->
        <div class="flex flex-col lg:flex-row lg:items-start divide-y lg:divide-y-0 lg:divide-x divide-brand-charcoal/10 py-10 border-b border-brand-charcoal/10 gap-8 lg:gap-0">

          <!-- Core Destinations -->
          <div class="lg:pr-10 pb-8 lg:pb-0">
            <p class="text-[11px] uppercase tracking-[0.15em] text-brand-charcoal/50 font-sans mb-4">Core Destinations</p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                v-for="c in coreDestinations"
                :key="c.value ?? 'all'"
                :to="countryLink(c.value)"
                class="px-5 py-2 text-xs font-bold uppercase tracking-wider border transition-colors"
                :class="isActiveCountry(c.value) ? 'bg-brand-charcoal text-brand-off-white border-brand-charcoal' : 'bg-transparent text-brand-charcoal border-brand-charcoal/20 hover:border-brand-charcoal'"
              >{{ c.label }}</NuxtLink>
            </div>
          </div>

          <!-- Extend Your Journey -->
          <div class="lg:px-10 pb-8 lg:pb-0">
            <p class="text-[11px] uppercase tracking-[0.15em] text-brand-charcoal/50 font-sans mb-4">Extend Your Journey, With Trusted Partners</p>
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                v-for="c in extendedDestinations"
                :key="c.value"
                :to="countryLink(c.value)"
                class="px-5 py-2 text-xs font-bold uppercase tracking-wider border transition-colors"
                :class="isActiveCountry(c.value) ? 'bg-brand-charcoal text-brand-off-white border-brand-charcoal' : 'bg-transparent text-brand-charcoal border-brand-charcoal/20 hover:border-brand-charcoal'"
              >{{ c.label }}</NuxtLink>
            </div>
          </div>

          <!-- Trip length -->
          <div class="lg:pl-10">
            <p class="text-[11px] uppercase tracking-[0.15em] text-brand-charcoal/50 font-sans mb-4">Trip Length</p>
            <div class="relative w-40">
              <select
                :value="route.query.duration ?? ''"
                @change="handleDurationChange"
                class="w-full bg-transparent font-serif text-lg text-brand-charcoal border-b border-brand-charcoal/30 pb-1 pr-6 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">Any length</option>
                <option value="3-5">3–5 Days</option>
                <option value="6-8">6–8 Days</option>
                <option value="9-12">9–12 Days</option>
                <option value="13-99">13+ Days</option>
              </select>
              <svg class="absolute right-0 bottom-2 w-4 h-4 text-brand-charcoal/60 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Results count -->
        <p class="pt-8 font-sans text-sm text-brand-charcoal/70">
          <span class="text-brand-terracotta font-bold">{{ filteredPackages.length }}</span>
          Safaris, Each One Ready To Be Reshaped Around You.
        </p>
      </div>
    </section>

    <!-- Loading State -->
    <!-- <div v-if="loading" class="py-32 text-center">
      <div class="inline-block">
        <div class="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-6 text-amber-900 font-serif text-lg">{{ getText({ en: "Discovering amazing safaris...", sw: "Kugundua safari za ajabu..." }, currentLanguage) }}</p>
      </div>
    </div> -->

    <!-- Error State -->
    <!-- <div v-else-if="loadError" class="py-32 text-center">
      <div class="inline-block bg-red-100 border-2 border-red-300 rounded-full p-8">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/>
        </svg>
        <h3 class="text-xl font-serif text-red-800 mb-2">{{ getText({ en: "Unable to load packages", sw: "Haiwezi kupakua paketi" }, currentLanguage) }}</h3>
        <p class="text-red-600 mb-6">{{ loadError }}</p>
        <button 
          @click="loadPackages"
          class="px-8 py-3 bg-amber-900 text-yellow-100 rounded-full hover:bg-amber-800 transition-colors font-serif"
        >
          {{ getText({ en: "Try Again", sw: "Jaribu Tena" }, currentLanguage) }}
        </button>
      </div>
    </div> -->

    <!-- Packages Grid -->
    <div v-if="filteredPackages.length > 0" class="py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <NuxtLink
            v-for="pkg in filteredPackages"
            :key="pkg.id"
            :to="`/safari-packages/${pkg.slug || pkg.id}`"
            class="group relative bg-brand-off-white overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl"
          >
            <!-- Image -->
            <div class="relative overflow-hidden aspect-[449/381]">
              <NuxtImg
                provider="cloudinary"
                :src="pkg.featuredImage || pkg.image || FALLBACK_IMAGE"
                :alt="getText(pkg.title)"
                sizes="sm:400px md:600px lg:449px"
                format="webp"
                quality="75"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute top-4 left-4 flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-charcoal text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  {{ getDurationBadge(pkg) }}
                </span>
                <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-brand-charcoal text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  {{ getPaceBadge(pkg) }}
                </span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="pt-7 px-7 pb-6">
              <h3 class="text-2xl md:text-3xl font-serif text-brand-charcoal">
                {{ getText(pkg.title) }}
              </h3>
              <p v-if="getLocationsLine(pkg)" class="text-sm text-brand-terracotta/80 font-sans mt-2">
                {{ getLocationsLine(pkg) }}
              </p>
              <div class="flex items-center justify-between border-t border-brand-charcoal/10 mt-4 pt-4">
                <span class="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">
                  {{ getCountryBadge(pkg) }}
                </span>
                <span class="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                  View Journey
                </span>
              </div>
              <span class="mt-4 inline-flex items-center gap-2 border border-brand-terracotta text-brand-terracotta text-xs font-bold uppercase tracking-wider px-5 py-3 hover:bg-brand-terracotta hover:text-white transition-colors">
                Request This Journey <span aria-hidden="true">→</span>
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="py-32 text-center">
      <div class="inline-block bg-amber-100 border-2 border-yellow-300 rounded-full p-8">
        <svg class="w-16 h-16 text-amber-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <h3 class="text-xl font-serif text-amber-900 mb-2">{{ getText({ en: "No packages found", sw: "Hakuna paketi ilipatwa" }, currentLanguage) }}</h3>
      </div>
    </div>

    <!-- Success Modal placeholder (removed for now as per simplicity focus) -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue' 
import { useRoute } from 'vue-router'
import type { SafariPackage } from '~/types/safari-package'
import { getText } from '~/utils/translation-api'
import { getSafaris } from '~/utils/package-loader'
import { extractDurationDays } from '~/utils/package-data'

// Components
import LanguageSelector from '~/components/safari-packages/LanguageSelector.vue'

definePageMeta({
  layout: 'home'
})

const route = useRoute()

// 1. DATA FETCHING
const { data: rawPackages, error: loadError } = await useAsyncData(
  'all-safaris-list', 
  () => getSafaris()
)

// 2. REACTIVE STATE
const currentLanguage = ref('en')
const selectedCurrency = ref('KES')
const sortBy = ref('default')

// Filter Section: country buttons + trip-length select
const coreDestinations = [
  { value: null as string | null, label: 'All' },
  { value: 'kenya', label: 'Kenya' },
  { value: 'tanzania', label: 'Tanzania' },
]
const extendedDestinations = [
  { value: 'uganda', label: 'Uganda' },
  { value: 'rwanda', label: 'Rwanda' },
]

const countryLink = (country: string | null) => {
  const query: Record<string, string> = {}
  if (route.query.duration) query.duration = String(route.query.duration)
  if (country) query.country = country
  return { path: '/safari-packages', query }
}

const isActiveCountry = (value: string | null) => {
  const current = route.query.country ? String(route.query.country).toLowerCase() : null
  return current === value
}

const handleDurationChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value
  const query: Record<string, string> = {}
  if (route.query.country) query.country = String(route.query.country)
  if (value) query.duration = value
  navigateTo({ path: '/safari-packages', query })
}

// Package card badges/labels (matches components/sections/JourneyShowcase.vue)
const FALLBACK_IMAGE = 'v1770905959/DSC_0443_jozfk3.jpg'

const getDurationBadge = (pkg: SafariPackage) => {
  const duration = pkg.duration || ''
  const match = duration.match(/(\d+)/)
  if (match) {
    const n = parseInt(match[1]!, 10)
    return `${n} DAY${n === 1 ? '' : 'S'}`
  }
  return duration.toUpperCase()
}

const getPaceBadge = (pkg: SafariPackage) => {
  const title = getText(pkg.title) || ''
  const isGroup = pkg.tags?.includes('Group Tour') || /group/i.test(title)
  return isGroup ? 'GROUP' : 'PRIVATE'
}

const getLocationsLine = (pkg: SafariPackage) => {
  let title = getText(pkg.title) || ''
  title = title.replace(/^\d+\s*Days?\s*/i, '')
  title = title.replace(/\s*(Private|Group)?\s*(Safari|Tour|Holiday)s?$/i, '')
  const parts = title.split(/,|&|\band\b/i).map(p => p.trim()).filter(Boolean)
  return parts.join(' · ')
}

const getCountryBadge = (pkg: SafariPackage) => {
  return pkg.country?.join(' / ') || ''
}

// 3. COMPUTED LOGIC (Filtering and Sorting)
const heroTitle = computed(() => {
  const { category, type, country } = route.query
  
  if (category === 'mountain-climbing') return getText({ en: 'Mount Climbing', sw: 'Kupanda Milima' }, currentLanguage.value)
  if (category === 'international') return getText({ en: 'International Tours', sw: 'Ziara za Kimataifa' }, currentLanguage.value)
  if (type === 'bush') return getText({ en: 'Kenya Bush Safaris', sw: 'Safari za Nyika Kenya' }, currentLanguage.value)
  if (type === 'beach') return getText({ en: 'Kenya Beach Holidays', sw: 'Likizo za Pwani Kenya' }, currentLanguage.value)
  if (type === 'bush-and-beach') return getText({ en: 'Bush and Beach', sw: 'Nyika na Pwani' }, currentLanguage.value)
  
  if (country) {
    const c = String(country)
    const name = c.charAt(0).toUpperCase() + c.slice(1)
    return getText({ en: `${name} Safaris`, sw: `Safari za ${name}` }, currentLanguage.value)
  }
  
  return getText({ en: 'Safari Packages', sw: 'Paketi za Safari' }, currentLanguage.value)
})

const filteredPackages = computed(() => {
  if (!rawPackages.value) return []
  
  const { category, type, country } = route.query
  let list = [...rawPackages.value]

  // Apply filters based on query parameters
  if (category === 'mountain-climbing') {
    list = list.filter(pkg => pkg.type === 'Trekking')
  } else {
    // Exclusively show Trekking in mountain-climbing section
    list = list.filter(pkg => pkg.type !== 'Trekking')

    if (category === 'international') {
      list = list.filter(pkg => pkg.category === 'International')
    } else if (type === 'bush') {
      // Kenya Bush = Kenya + Wildlife tag
      list = list.filter(pkg => pkg.country?.includes('Kenya') && (pkg.tags || []).includes('Wildlife'))
    } else if (type === 'beach') {
      // Kenya Beach = Kenya + Beach type
      list = list.filter(pkg => pkg.country?.includes('Kenya') && pkg.type === 'Beach')
    } else if (type === 'bush-and-beach') {
      // Bush and Beach = contains both Beach and Wildlife markers
      list = list.filter(pkg => 
        (pkg.type === 'Beach' || (pkg.tags || []).includes('Beach') || (pkg.tags || []).includes('Relaxation')) && 
        (pkg.type === 'Wildlife' || (pkg.tags || []).includes('Wildlife'))
      )
    } else if (country) {
      // East Africa countries filter - support multi-country packages
      const filterCountry = String(country).toLowerCase()
      list = list.filter(pkg =>
        pkg.country?.some(c => c.toLowerCase() === filterCountry)
      )
    }
  }

  // Duration bucket filter (e.g. "3-5", "6-8") - applies on top of the filters above
  const { duration } = route.query
  if (duration) {
    const [minStr, maxStr] = String(duration).split('-')
    const min = parseInt(minStr!, 10)
    const max = maxStr ? parseInt(maxStr, 10) : Infinity
    list = list.filter(pkg => {
      const days = extractDurationDays(pkg.duration)
      return days >= min && days <= max
    })
  }

  // Sort logic
  return list.sort((a, b) => {
    if (sortBy.value === 'duration') {
      return parseInt(a.duration) - parseInt(b.duration)
    }
    const aFeatured = a.featured ?? 0
    const bFeatured = b.featured ?? 0
    const aPopular = a.popular ?? 0
    const bPopular = b.popular ?? 0
    
    if (aFeatured !== bFeatured) return bFeatured - aFeatured
    if (aPopular !== bPopular) return bPopular - aPopular
    return 0
  })
})

// 4. SEO
useHead({
  title: () => `${getText({ en: 'Safari Packages - Ethno Kenia Adventure', sw: 'Paketi za Safari - Urithi wa Safari Kenya' }, currentLanguage.value)}`,
  meta: [
    {
      name: 'description',
      content: () => getText({ en: 'Discover amazing safari packages in Kenya...', sw: 'Gundua paketi za safari za ajabu...' }, currentLanguage.value)
    }
  ]
})
</script>

<style scoped>
/* National Geographic inspired animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delayed {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delayed-2 {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-delayed {
  animation: fade-in-delayed 1.2s ease-out forwards;
}

.animate-fade-in-delayed-2 {
  animation: fade-in-delayed-2 1.4s ease-out forwards;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(251, 191, 36, 0.1);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(251, 191, 36, 0.5);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(251, 191, 36, 0.7);
}

/* National Geographic style hover effects */
.package-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.package-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Yellow frame glow effect */
.yellow-frame {
  box-shadow: 0 0 40px rgba(251, 191, 36, 0.3);
}
</style>
