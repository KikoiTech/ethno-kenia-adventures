<template>
  <div class="relative hero-shell w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    
    
    
    <div class="absolute inset-0 z-30">
      <div class="relative h-full max-w-[1400px] mx-auto flex flex-col px-6 sm:px-10 lg:px-16">

      <!-- Headline + subtext: biased toward the lower part of the space left over above the bottom row (bigger top spacer than bottom), so it can never grow into it -->
      <div class="flex-1 flex flex-col max-w-xl text-left typography-container" ref="typography">
        <div class="flex-1" aria-hidden="true"></div>

        <h1 class="hero-headline opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-500" ref="headline">
          Where Nature becomes <span class="italic text-brand-terracotta">Adventure</span>
        </h1>

        <!-- Divider Line -->
        <div class="w-24 h-px bg-white/30 my-3 opacity-0 transition-opacity duration-1000 ease-out delay-700" ref="divider"></div>

        <!-- Subtext -->
        <p class="hero-subtext opacity-0 transition-opacity duration-1000 ease-out delay-700" ref="subtext">
          Journeys that connect you to the timeless rhythm of the African wilderness.
        </p>

        <div class="flex-1" aria-hidden="true"></div>
      </div>

      <!-- Bottom row: sell-copy badge (left) / CTA + link (right), reserved space at the bottom (same 94/110px buffer above the TripFilter card's -75px overlap as before) -->
      <div class="shrink-0 pb-[94px] sm:pb-[110px] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">

        <!-- Bottom-left: sell-copy badge -->
        <div class="max-w-sm">
          <p class="font-sans text-xs uppercase tracking-[0.2em] text-brand-terracotta mb-2">Private Safaris · Kenya</p>
          <p class="font-sans text-[13px] sm:text-sm md:text-base text-white/85 leading-relaxed">
            Expert local guides, handpicked camps, and the freedom to explore Kenya's wild heart, entirely on your terms.
          </p>
        </div>

        <!-- Bottom-right: CTA + link, side by side -->
        <div class="flex flex-row items-center gap-4 sm:gap-6 cta-container opacity-0 scale-90 transition-all duration-1000 ease-out delay-1000" ref="ctaContainer">
          <Button as-child variant="brand" class="h-12 sm:h-14 lg:h-[62px] px-6 sm:px-7 lg:px-8 text-[11px] sm:text-xs">
            <NuxtLink to="/safari-packages?ref=hero" ref="ctaButton" @click="handleCTAClick">Begin Your Journey</NuxtLink>
          </Button>
          <NuxtLink to="/safari-packages" class="font-sans text-xs uppercase tracking-[0.15em] text-white border-b border-white/40 hover:border-brand-terracotta hover:text-brand-terracotta transition-colors duration-300 pb-0.5">
            Explore Safaris
          </NuxtLink>
        </div>
      </div>
      </div>
    </div>

    <div class="absolute inset-0">
      <!-- Slideshow Container -->
      <TransitionGroup name="hero-fade">
        <div 
          v-for="(slide, index) in slides" 
          :key="slide.id"
          v-show="currentSlideIndex === index"
          class="absolute inset-0"
        >
          <NuxtImg 
            provider="cloudinary"
            :src="slide.image"
            :alt="slide.alt"
            
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
            :preload="index === 0"
            
            sizes="sm:100vw md:100vw lg:100vw"
            format="webp"
            quality="80"
            
            width="1920"
            height="1080"
            
            class="w-full h-full object-cover ken-burns-active"
          />
        </div>
      </TransitionGroup>
      
      <!-- Gradient overlay for text readability - Editorial Style -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none"></div>

      <!-- Corner overlay: darkest at the bottom-left/bottom-right corners, lightening toward center - improves readability behind the terracotta badge and CTA link -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.65)_0%,transparent_55%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.65)_0%,transparent_55%)] pointer-events-none"></div>
    </div>
    
  </div>

  <!-- Trip Filter Section -->
  <SectionsTripFilter class="relative z-20" />

  <!-- Manifesto Section -->
  <SectionsIntroSection class="relative z-20" />
  
  <!-- Featured Packages Section -->
  <SectionsFeaturedPackages class="relative z-20" />
  
  <!-- Journey Showcase Section -->
  <SectionsJourneyShowcase class="relative z-20" />

  <!-- Gallery Preview Section -->
  <SectionsGalleryPreview class="relative z-20" />

  <!-- Start Your Journey Section -->
  <SectionsStartYourJourney class="relative z-20" />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'

definePageMeta({
  layout: 'home'
})

interface HeroSlide {
  id: string;
  image: string; // This is the path/filename from Cloudinary
  alt: string;
}

// Reactive data
const typography = ref<HTMLElement | null>(null)
const headline = ref<HTMLElement | null>(null)
const subtext = ref<HTMLElement | null>(null)
const ctaContainer = ref<HTMLElement | null>(null)
const ctaButton = ref<HTMLElement | null>(null)
const divider = ref<HTMLElement | null>(null)

// Animation data with tribal styling - REMOVED for Editorial Style

// Slideshow data for Ken Burns Hero
const currentSlideIndex = ref(0)
// updated the slides array to support the new cloudinary auto compression
const slides: HeroSlide[] = [
  { 
    id: 'elephants',
    image: 'v1770903538/DSC_0513_ajzrvb.jpg',
    alt: 'Golden savanna with elephants at dawn'
  },
  {
    id: 'lion',
    image: 'v1771134154/1001261550_vb8n99.jpg',
    alt: 'A lion roaring'
  },
  {
    id: 'gazelle',
    image: 'v1770903488/DSC_0169_lowu5p.jpg',
    alt: 'The savannah with a herd of gazelles'
  },
  {
    id: 'gazelle',
    image: 'v1770903503/DSC_0232_mhvplm.jpg',
    alt: 'The savannah with a herd of gazelles'
  },
  {
    id: 'hippos',
    image: 'v1770903491/DSC_0184_ofqwcn.jpg',
    alt: 'Hippos in the water'
  },
  {
    id: 'giraffes',
    image: 'v1770903539/DSC_0519_cjrhjf.jpg',
    alt: 'A heard od giraffes'
  }
]

let slideInterval: any = null

const startSlideshow = () => {
  slideInterval = setInterval(() => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.length
  }, 8000) // 8 seconds per slide
}


// State
const heroLoaded = ref(false)
const scrolledValue = ref(0)


// Advanced scroll-based animations with tribal patterns
const handleScroll = () => {
  scrolledValue.value = window.pageYOffset
}


// CTA click handler
const handleCTAClick = () => {
  // Editorial style click effect is handled by CSS (:active scale etc)
  console.log('CTA Clicked')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Trigger entry animation
  setTimeout(() => {
    heroLoaded.value = true
  }, 200)

  // Set initial state
  handleScroll()
  
  // Trigger animations
  setTimeout(() => {
    if (headline.value) {
      headline.value.classList.remove('opacity-0', 'translate-y-8')
    }
    if (divider.value) {
      divider.value.classList.remove('opacity-0')
    }
    if (subtext.value) {
      subtext.value.classList.remove('opacity-0')
    }
    if (ctaContainer.value) {
      ctaContainer.value.classList.remove('opacity-0', 'scale-90')
    }
  }, 100)
  
  // Start Hero slideshow
  startSlideshow()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (slideInterval) clearInterval(slideInterval)
})
</script>

<style scoped>

.hero-shell {
  min-height: 100vh;
  min-height: 100dvh; /* better handling of mobile browser chrome */
}

/* Short, wide viewports only (small-height laptops, landscape tablets/phones —
   NOT portrait phones, excluded by the min-width gate, which already get a
   comfortable single-screen hero from the rule above). Give the hero a fixed,
   content-appropriate height instead of compressing everything into the short
   viewport. Because 820px exceeds the viewport in this range, the page shows
   ~60-65% of the hero on load and the rest is a normal scroll — no JS needed. */
@media (max-height: 800px) and (min-width: 640px) {
  .hero-shell {
    min-height: 820px;
  }
}

/* Ken Burns Effect: Smooth slow zoom and pan */
.ken-burns-active {
  animation: kenburns 20s ease-out infinite alternate;
  transform-origin: center;
  will-change: transform;
}

@keyframes kenburns {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); } /* Smaller scale (1.1 instead of 1.15) is easier on the GPU */
}

/* Hero Slide Transitions: Smooth crossfade */
.hero-fade-enter-active,
.hero-fade-leave-active {
  transition: opacity 2s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-fade-enter-from,
.hero-fade-leave-to {
  opacity: 0;
}

.hero-fade-enter-to,
.hero-fade-leave-from {
  opacity: 1;
}



/* Typography with editorial accents */
.hero-headline {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 6vw, 5rem); /* Continuous scaling — no breakpoint jumps */
  line-height: 1.1;
  margin-bottom: 0;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.hero-subtext {
  font-family: 'Inter', sans-serif;
  font-size: clamp(0.875rem, 1.8vw, 1rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 10px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.02em;
}
</style>