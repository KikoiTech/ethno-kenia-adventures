<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    
    
    
    <div class="absolute inset-0 z-30">
      <div class="relative h-full max-w-[1400px] mx-auto">

      <!-- Headline + subtext: pinned to the vertical center, independent of the bottom row -->
      <div class="absolute top-1/2 -translate-y-1/2 left-6 right-6 sm:left-10 sm:right-auto lg:left-16 max-w-xl text-left typography-container" ref="typography">
        <h1 class="hero-headline opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-500" ref="headline">
          Where Nature becomes <span class="italic text-brand-terracotta">Adventure</span>
        </h1>

        <!-- Divider Line -->
        <div class="w-24 h-px bg-white/30 my-6 opacity-0 transition-opacity duration-1000 ease-out delay-700" ref="divider"></div>

        <!-- Subtext -->
        <p class="hero-subtext opacity-0 transition-opacity duration-1000 ease-out delay-700" ref="subtext">
          Journeys that connect you to the timeless rhythm of the African wilderness.
        </p>
      </div>

      <!-- Bottom row: sell-copy badge (left) / CTA + link (right), pinned to the bottom -->
      <div class="absolute bottom-16 sm:bottom-20 left-6 right-6 sm:left-10 sm:right-10 lg:left-16 lg:right-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">

        <!-- Bottom-left: sell-copy badge -->
        <div class="max-w-sm">
          <p class="font-sans text-xs uppercase tracking-[0.2em] text-brand-terracotta mb-2">Private Safaris · Kenya</p>
          <p class="font-sans text-sm sm:text-base text-white/85 leading-relaxed">
            Expert local guides, handpicked camps, and the freedom to explore Kenya's wild heart, entirely on your terms.
          </p>
        </div>

        <!-- Bottom-right: CTA + link, side by side -->
        <div class="flex flex-row items-center gap-6 cta-container opacity-0 scale-90 transition-all duration-1000 ease-out delay-1000" ref="ctaContainer">
          <Button as-child variant="brand" class="h-auto px-8 py-3 text-sm">
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
    </div>
    
  </div>
  

  <!-- Manifesto Section -->
  <SectionsIntroSection class="relative z-20" />
  
  <!-- Featured Packages Section -->
  <SectionsFeaturedPackages class="relative z-20" />
  
  <!-- Field Guide Section -->
  <SectionsFieldGuide class="relative z-20" />
  
  <!-- Testimonials Section -->
  <SectionsTestimonials class="relative z-20" />
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
  font-size: clamp(3rem, 6vw, 5rem); /* Increased size */
  line-height: 1.1;
  margin-bottom: 0;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.hero-subtext {
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.02em;
}

/* Responsive excellence */
@media (max-width: 768px) {
  .hero-headline {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  .tribal-edge-left,
  .tribal-edge-right {
    width: 2rem;
  }
}
</style>