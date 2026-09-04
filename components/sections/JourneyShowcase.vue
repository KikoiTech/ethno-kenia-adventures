<template>
  <!--
    SECTION: Journey Showcase
    PURPOSE: Present a curated grid of trip cards (1 popular + 4 featured)
    AESTHETIC: Brand-off-white, editorial card grid
  -->
  <section
    ref="journeyShowcaseSection"
    class="relative bg-brand-off-white py-24 md:py-32 overflow-hidden journey-showcase-section"
  >
    <div class="container mx-auto px-6 relative">

      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-16">
        <div>
          <p class="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand-terracotta mb-4">
            Journeys Worth Crossing The World For
          </p>
          <h2 class="text-4xl md:text-5xl font-serif leading-tight text-brand-charcoal">
            Africa, beautifully composed.
          </h2>
        </div>
        <NuxtLink
          to="/safari-packages"
          class="inline-block text-xs md:text-sm font-bold uppercase tracking-wider text-brand-charcoal border-b border-brand-charcoal pb-1 hover:text-brand-terracotta hover:border-brand-terracotta transition-colors whitespace-nowrap"
        >
          See All Journeys
        </NuxtLink>
      </div>

      <!-- Journey Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
        <NuxtLink
          v-for="(pkg, index) in showcaseCards"
          :key="pkg.id"
          :to="`/safari-packages/${pkg.slug || pkg.id}`"
          class="group relative bg-brand-off-white overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl"
          :class="index === 0 ? 'sm:col-span-2 lg:col-span-2' : ''"
        >
          <!-- Image -->
          <div
            class="relative overflow-hidden"
            :class="index === 0 ? 'aspect-[924/560]' : 'aspect-[449/381]'"
          >
            <NuxtImg
              provider="cloudinary"
              :src="pkg.featuredImage || pkg.image || FALLBACK_IMAGE"
              :alt="getText(pkg.title)"
              sizes="sm:400px md:600px lg:924px"
              format="webp"
              quality="75"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <!-- Top Badges -->
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

    <!-- Business Owner Tourism Invitation (Wildlife Sanctuary Parallax) -->
    <div class="mt-24 relative overflow-hidden h-[500px] flex items-center justify-center group">
  <!-- Background Container -->
      <div class="absolute inset-0 z-0">
        <NuxtImg
          provider="cloudinary"
          src="v1770903461/DSC_0036_dgo8e1.jpg"
          alt="Wildlife Sanctuary"

          fit="fill"

          :modifiers="{
            gravity: 'auto',
            aspectRatio: '21:9'
          }"

          format="webp"
          quality="80"
          loading="lazy" 
          sizes="sm:100vw md:100vw lg:1600px"
          width="1600"
          height="686"
          class="w-full h-[120%] object-cover object-center transition-transform duration-700"
        />
        <!-- Darker overlay for better text contrast -->
        <div class="absolute inset-0 bg-gradient-to-b from-brand-charcoal/70 via-brand-charcoal/40 to-brand-charcoal/70 backdrop-blur-[1px]"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <!-- Optional: Small Tribal Icon above Title -->
        <div class="mb-4 opacity-80">
          <svg class="w-8 h-8 mx-auto text-brand-terracotta" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8L12 2Z" />
          </svg>
        </div>

        <h3 class="text-4xl md:text-6xl font-serif mb-6 text-brand-off-white leading-tight">
          Welcome to Our <span class="italic text-brand-terracotta">Wildlife</span> Sanctuary
        </h3>

        <p class="text-lg md:text-xl font-sans text-brand-off-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
          Experience the raw rhythm of the Great Migration. Witness nature’s greatest spectacle within our protected conservation corridors.
        </p>

        <NuxtLink
          to="/safari-packages?category=migration"
          class="inline-flex items-center justify-center px-10 py-4 bg-brand-terracotta text-brand-off-white font-sans font-bold rounded-full transition-all duration-300 hover:bg-white hover:text-brand-terracotta shadow-2xl"
        >
          <span>Explore Migration Safaris</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getSafaris } from '~/utils/package-loader'
import { getText } from '~/utils/translation-api'
import type { SafariPackage } from '~/types/safari-package'

const journeyShowcaseSection = ref<HTMLElement>()

const FALLBACK_IMAGE = 'v1770905959/DSC_0443_jozfk3.jpg'

// Data Fetching
const { data: allPackages } = await useAsyncData('journey-showcase-safaris', () => getSafaris())

const popularTrip = computed(() => {
  const packages = allPackages.value || []
  return packages.find(p => p.popular) || packages[0] || null
})

const featuredTrips = computed(() => {
  const packages = allPackages.value || []
  const popularId = popularTrip.value?.id
  const remaining = packages.filter(p => p.id !== popularId)

  const featured = remaining.filter(p => p.featured).slice(0, 4)
  if (featured.length >= 4) return featured

  const usedIds = new Set(featured.map(p => p.id))
  const backfill = remaining.filter(p => !usedIds.has(p.id)).slice(0, 4 - featured.length)
  return [...featured, ...backfill]
})

const showcaseCards = computed(() => {
  if (!popularTrip.value) return []
  return [popularTrip.value, ...featuredTrips.value]
})

// Duration pill, e.g. "9 DAYS"
const getDurationBadge = (pkg: SafariPackage) => {
  const duration = pkg.duration || ''
  const match = duration.match(/(\d+)/)
  if (match) {
    const n = parseInt(match[1]!, 10)
    return `${n} DAY${n === 1 ? '' : 'S'}`
  }
  return duration.toUpperCase()
}

// Private/Group pill
const getPaceBadge = (pkg: SafariPackage) => {
  const title = getText(pkg.title) || ''
  const isGroup = pkg.tags?.includes('Group Tour') || /group/i.test(title)
  return isGroup ? 'GROUP' : 'PRIVATE'
}

// Locations line parsed from the trip title
const getLocationsLine = (pkg: SafariPackage) => {
  let title = getText(pkg.title) || ''
  title = title.replace(/^\d+\s*Days?\s*/i, '')
  title = title.replace(/\s*(Private|Group)?\s*(Safari|Tour|Holiday)s?$/i, '')

  const parts = title
    .split(/,|&|\band\b/i)
    .map(p => p.trim())
    .filter(Boolean)

  return parts.join(' · ')
}

// Country badge, e.g. "KENYA / TANZANIA"
const getCountryBadge = (pkg: SafariPackage) => {
  return pkg.country?.join(' / ') || ''
}

// Parallax scrolling effect
const handleScroll = () => {
  if (!journeyShowcaseSection.value) return

  const scrolled = window.pageYOffset
  const sectionTop = journeyShowcaseSection.value.offsetTop
  const windowHeight = window.innerHeight

  // Calculate parallax progress for journey showcase section
  if (scrolled + windowHeight > sectionTop && scrolled < sectionTop + journeyShowcaseSection.value.offsetHeight) {
    const sectionProgress = (scrolled - sectionTop + windowHeight * 0.5) / (windowHeight * 1.5)

  // Apply parallax transformation
    const translateY = Math.max(-50, Math.min(50, sectionProgress * -40))
    journeyShowcaseSection.value.style.transform = `translateY(${translateY}px)`
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.journey-showcase-section {
  transition: transform 0.3s ease-out, opacity 0.5s ease-out;
}

img[data-nuxt-img] {
  will-change: transform;
}
</style>
