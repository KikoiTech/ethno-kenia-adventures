<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    
    
    
    <div class="absolute inset-0 z-30 flex items-center justify-center px-8">
      <div class="text-center max-w-[800px] typography-container" ref="typography">
        
        <!-- Main headline -->
        <h1 class="hero-headline opacity-0 translate-y-8 transition-all duration-1000 ease-out delay-500" ref="headline">
          Where Nature becomes <span class="italic text-brand-terracotta">Adventure</span>
        </h1>
        
        <!-- Divider Line -->
        <div class="w-24 h-px bg-white/30 mx-auto my-8 opacity-0 transition-opacity duration-1000 ease-out delay-700" ref="divider"></div>
        
        <!-- Subtext -->
        <p class="hero-subtext opacity-0 transition-opacity duration-1000 ease-out delay-700" ref="subtext">
          Journeys that connect you to the timeless rhythm of the African wilderness.
        </p>
        
        <!-- Premium CTA -->
        <div class="cta-container opacity-0 scale-90 transition-all duration-1000 ease-out delay-1000" ref="ctaContainer">
          <NuxtLink 
            to="/safari-packages?ref=hero" 
            class="premium-cta group" 
            ref="ctaButton" 
            @click="handleCTAClick"
          >
            <span class="relative z-10">Begin Your Journey</span>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <div class="absolute right-8 top-1/2 transform -translate-y-1/2 z-40 scroll-indicator">
      <div class="flex flex-col space-y-3">
        <div 
          v-for="i in 3" 
          :key="i"
          class="scroll-dot"
          :class="{ active: currentSection >= i }"
          @click="scrollToSection(i)"
        >
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
const currentSection = ref(0)
const heroLoaded = ref(false)
const scrolledValue = ref(0)


// Advanced scroll-based animations with tribal patterns
const handleScroll = () => {
  const scrolled = window.pageYOffset
  scrolledValue.value = scrolled
  const windowHeight = window.innerHeight
  
  // Update current section
  currentSection.value = Math.min(2, Math.floor((scrolled / windowHeight) * 3))
}


// CTA click handler
const handleCTAClick = () => {
  // Editorial style click effect is handled by CSS (:active scale etc)
  console.log('CTA Clicked')
}

// Scroll to section
const scrollToSection = (sectionIndex: number) => {
  const targetY = sectionIndex * window.innerHeight
  window.scrollTo({ top: targetY, behavior: 'smooth' })
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

/* CTA with editorial style */
.cta-container {
  display: inline-block;
}

.premium-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  background-color: #A25035; /* Brand Terracotta */
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.premium-cta:hover {
  transform: scale(1.05);
  background-color: #8a422b; /* Darker Terracotta */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}


.scroll-indicator {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  padding: 1rem;
  border-radius: 9999px;
}

.scroll-dot {
  width: 0.75rem;
  height: 0.75rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.scroll-dot.active {
  background: #A25035;
  transform: scale(1.2);
}


/* Responsive excellence */
@media (max-width: 768px) {
  .hero-headline {
    font-size: clamp(2rem, 4vw, 3rem);
  }
  
  .premium-cta {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
  
  .tribal-edge-left,
  .tribal-edge-right {
    width: 2rem;
  }
}
</style>