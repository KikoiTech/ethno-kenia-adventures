<template>
  <!--
    SECTION: Journey Showcase
    PURPOSE: Present a curated grid of trip cards (1 popular + 4 featured)
    AESTHETIC: Brand-off-white, editorial card grid
  -->
  <section
    class="relative bg-brand-off-white pt-24 md:pt-32 overflow-hidden"
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

    <SectionsWildlifeSanctuaryBanner />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getSafaris } from '~/utils/package-loader'
import { getText } from '~/utils/translation-api'
import type { SafariPackage } from '~/types/safari-package'

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
</script>
