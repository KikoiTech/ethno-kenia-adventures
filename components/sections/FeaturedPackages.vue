<template>
  <!--
    SECTION: Featured Packages
    PURPOSE: To entice users with visually rich, interactive preview of core offerings
    VISUALS: Dark brand-charcoal section with a static row of destination cards
    FUNCTIONALITY: Simple hover-float cards linking to real trips
  -->
  <section
    ref="featuredPackagesSection"
    class="relative bg-brand-charcoal py-24 md:py-32 overflow-hidden featured-packages-section"
  >
    <!-- Texture overlay -->
    <div class="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/textures/papyrus.svg')]"></div>

    <div class="container mx-auto px-6 max-w-[1400px] relative">

      <!-- Section Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 mb-[58px]">
        <div>
          <p class="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand-terracotta mb-4">
            Start With A Place
          </p>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-brand-off-white">
            Five Ways Into<br>
            <span class="italic text-brand-terracotta">Our Africa.</span>
          </h2>
        </div>
        <p class="font-sans text-base md:text-lg font-light leading-relaxed text-brand-off-white/70 max-w-sm">
          Choose a place, and we'll connect it to real trips, trusted guides and the small details that turn a destination into a story you'll tell for years.
        </p>
      </div>

      <!-- Destination Cards -->
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 min-[1025px]:grid-cols-5 min-[1025px]:gap-4 lg:min-[1025px]:gap-6 max-[425px]:flex max-[425px]:grid-cols-none max-[425px]:gap-4 max-[425px]:overflow-x-auto max-[425px]:snap-x max-[425px]:snap-mandatory max-[425px]:scrollbar-hide pt-4">
        <NuxtLink
          v-for="(dest, index) in destinationCards"
          :key="dest.slug"
          :to="`/safari-packages/${dest.slug}`"
          class="group relative w-full aspect-[301/480] sm:max-w-[301px] sm:mx-auto min-[1025px]:max-w-none min-[1025px]:mx-0 min-[1025px]:aspect-[259/550] max-[425px]:w-[85%] max-[425px]:max-w-none max-[425px]:mx-0 max-[425px]:flex-shrink-0 max-[425px]:snap-start origin-bottom shadow-lg transition-all duration-300 hover:scale-[1.06] hover:shadow-2xl hover:z-10"
        >
          <div class="absolute inset-0 overflow-hidden bg-brand-charcoal">
            <!-- Background Image -->
            <NuxtImg
              provider="cloudinary"
              :src="dest.image"
              :alt="dest.name"
              sizes="sm:190px md:220px lg:259px"
              format="webp"
              quality="75"
              width="259"
              height="550"
              loading="lazy"
              class="absolute inset-0 w-full h-full object-cover"
            />

            <!-- Legibility Scrim -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

            <!-- Card Content -->
            <div class="absolute bottom-0 left-0 right-0 p-5 z-10">
              <p class="text-[10px] font-bold uppercase tracking-wider text-brand-off-white/70 mb-2">
                {{ String(index + 1).padStart(2, '0') }} · {{ dest.eyebrow }}
              </p>
              <h3 class="text-2xl md:text-3xl font-serif text-brand-off-white mb-3">{{ dest.name }}</h3>
              <span class="text-[10px] font-bold uppercase tracking-wider text-brand-off-white border-b border-brand-off-white/50 pb-0.5">
                Explore
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Call to Action -->
      <!-- <div class="mt-16 text-center">
        <a
          href="#"
          class="inline-flex items-center justify-center px-8 py-4 bg-brand-terracotta text-brand-off-white font-sans font-medium rounded-full transition-all duration-300 hover:bg-brand-terracotta/90 hover:scale-105"
        >
          <span>View All Safari Packages</span>
          <svg class="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
          </svg>
        </a>
      </div> -->

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getSafariBySlug } from '~/utils/package-loader'

const featuredPackagesSection = ref<HTMLElement>()

const FALLBACK_IMAGE = 'v1770905930/DSC_0247_dkzytn.jpg'

interface Destination {
  slug: string;
  name: string;
  eyebrow: string;
}

const destinations: Destination[] = [
  { slug: 'masai-mara-group-tour-3-days', name: 'Mara', eyebrow: 'Endless Plains · Migration' },
  { slug: '3-days-amboseli-national-park-safari', name: 'Amboseli', eyebrow: 'Elephants · Kilimanjaro' },
  { slug: '3-days-serengeti-ngorongoro-crater-safari', name: 'Tanzania', eyebrow: 'Serengeti · Ngorongoro' },
  { slug: '12-days-uganda-rare-parks', name: 'Uganda', eyebrow: 'Gorillas · Rare Parks' },
  { slug: '10-days-luxury-private-honeymoon-safari', name: 'Diani', eyebrow: 'Barefoot Days · Indian Ocean' },
]

// Fetch each destination's real trip data (for its image) from Supabase
const { data: destinationTrips } = await useAsyncData('featured-destinations', () =>
  Promise.all(destinations.map(d => getSafariBySlug(d.slug)))
)

const destinationCards = computed(() =>
  destinations.map((dest, index) => {
    const trip = destinationTrips.value?.[index]
    return {
      ...dest,
      image: trip?.image || trip?.featuredImage || FALLBACK_IMAGE,
    }
  })
)

// Parallax scrolling effect
const handleScroll = () => {
  if (!featuredPackagesSection.value) return

  const scrolled = window.pageYOffset
  const sectionTop = featuredPackagesSection.value?.offsetTop || 0
  const windowHeight = window.innerHeight

  // Calculate parallax progress for featured packages section
  const sectionProgress = Math.max(0, Math.min(1, (scrolled - sectionTop + windowHeight * 0.5) / (windowHeight * 1.5)))

  // Apply parallax transformation
  const translateY = sectionProgress * -30 // Subtle upward movement

  if (featuredPackagesSection.value) {
    featuredPackagesSection.value.style.transform = `translateY(${translateY}px)`
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
/* Hide scrollbar for the sub-425px single-card horizontal scroll */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

