<template>
  <!-- 
    AFRICAN HERITAGE SYMPHONY: "Modern Heritage" Awwards-Worthy Hero
    CONCEPT: Tribal patterns woven through every element for authentic cultural tapestry
    VISION: Earthy, sophisticated, immersive, and deeply connected to African artistry
  -->
  <div class="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    
    <!-- 
      HORIZON PATTERN: Animated tribal border that draws itself on load
      - Represents the journey beginning, inspired by Maasai beadwork
    -->
    <div class="absolute top-0 left-0 right-0 z-50 horizon-pattern" ref="horizonPattern">
      <svg class="w-full h-8" viewBox="0 0 1200 32" preserveAspectRatio="none">
        <pattern id="horizonPattern" x="0" y="0" width="40" height="32" patternUnits="userSpaceOnUse">
          <path d="M20 0 L25 8 L30 0 L35 8 L40 0" stroke="currentColor" class="text-brand-terracotta" stroke-width="2" fill="none" opacity="0.3"/>
          <circle cx="20" cy="16" r="2" fill="currentColor" class="text-brand-terracotta" opacity="0.2"/>
          <circle cx="30" cy="16" r="2" fill="currentColor" class="text-brand-terracotta" opacity="0.2"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#horizonPattern)"/>
      </svg>
    </div>
    
    <!-- 
      LAYER 1: Atmospheric foundation with tribal texture
      - Creates depth with subtle parallax and cultural patterns
    -->
    <div class="absolute inset-0 layer-atmosphere" ref="atmosphereLayer">
      <!-- Tribal texture overlay -->
      <div class="absolute inset-0 tribal-texture opacity-5"></div>
      <div class="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-stone-200/30 to-transparent"></div>
    </div>
    
    <!-- 
      LAYER 2: Mid-ground with acacia silhouettes and pattern edges
      - Medium parallax speed with tribal border integration
    -->
    <div class="absolute inset-0 layer-midground" ref="midgroundLayer">
      <!-- Left tribal edge -->
      <div class="absolute left-0 top-0 bottom-0 w-12 tribal-edge-left" ref="leftEdge">
        <svg class="w-full h-full" viewBox="0 0 48 800" preserveAspectRatio="none">
          <pattern id="leftEdgePattern" x="0" y="0" width="48" height="80" patternUnits="userSpaceOnUse">
            <path d="M24 0 L30 20 L24 40 L18 20 L24 0" stroke="currentColor" class="text-brand-terracotta" stroke-width="1.5" fill="none" opacity="0.2"/>
            <circle cx="24" cy="40" r="3" fill="currentColor" class="text-brand-terracotta" opacity="0.15"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#leftEdgePattern)"/>
        </svg>
      </div>
      
      <!-- Right tribal edge -->
      <div class="absolute right-0 top-0 bottom-0 w-12 tribal-edge-right" ref="rightEdge">
        <svg class="w-full h-full" viewBox="0 0 48 800" preserveAspectRatio="none">
          <pattern id="rightEdgePattern" x="0" y="0" width="48" height="80" patternUnits="userSpaceOnUse">
            <path d="M24 0 L18 20 L24 40 L30 20 L24 0" stroke="currentColor" class="text-brand-terracotta" stroke-width="1.5" fill="none" opacity="0.2"/>
            <circle cx="24" cy="40" r="3" fill="currentColor" class="text-brand-terracotta" opacity="0.15"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#rightEdgePattern)"/>
        </svg>
      </div>
      
      <!-- Acacia tree silhouettes -->
      <div class="absolute bottom-0 left-1/6 w-32 h-48 bg-stone-300/20 rounded-t-full blur-sm"></div>
      <div class="absolute bottom-0 right-1/4 w-24 h-32 bg-stone-300/20 rounded-t-full blur-sm"></div>
    </div>
    
    <!-- 
      LAYER 3: Main hero content with tribal light rays
      - Fastest parallax with African-inspired light patterns
    -->
    <div class="absolute inset-0 layer-content" ref="contentLayer">
      <!-- Slideshow Container -->
      <TransitionGroup name="hero-fade">
        <div 
          v-for="(slide, index) in slides" 
          :key="slide.id"
          v-show="currentSlideIndex === index"
          class="absolute inset-0"
        >
          <img 
            :src="slide.image"
            :alt="slide.alt"
            class="w-full h-full object-cover ken-burns-active"
          >
        </div>
      </TransitionGroup>
      
      <!-- Gradient overlay for text readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      
      <!-- Tribal light rays that follow mouse -->
      <div class="absolute inset-0 tribal-light-rays" ref="lightRays">
        <div 
          v-for="i in 8" 
          :key="i"
          class="tribal-light-ray"
          :style="getTribalRayStyle(i)"
        >
          <svg class="w-full h-full" viewBox="0 0 100 200" preserveAspectRatio="none">
            <path :d="getRayPath(i)" stroke="rgba(251, 191, 36, 0.1)" stroke-width="2" fill="none"/>
          </svg>
        </div>
      </div>
      
      <!-- Floating tribal particles -->
      <div class="absolute inset-0 tribal-particles-container" ref="particlesContainer"></div>
      
    </div>
    
    <!-- 
      LAYER 4: Interactive wildlife with tribal frames
      - Cursor-reactive animals with pattern-based hover frames
    -->
    <div class="absolute inset-0 layer-wildlife z-40 pointer-events-none">
      
      <!-- Animated birds with tribal frames -->
      <div 
        v-for="bird in birds" 
        :key="bird.id"
        class="wildlife-bird"
        :ref="bird.ref"
        :style="bird.style"
        @click="handleBirdClick(bird)"
      >
        <!-- Tribal frame that appears on hover -->
        <div class="tribal-frame" :class="{ 'tribal-frame-active': bird.hovered }">
          <svg class="w-full h-full" viewBox="0 0 60 60">
            <rect x="2" y="2" width="56" height="56" stroke="#92400e" stroke-width="1" fill="none" opacity="0.3"/>
            <circle cx="8" cy="8" r="2" fill="#92400e" opacity="0.2"/>
            <circle cx="52" cy="8" r="2" fill="#92400e" opacity="0.2"/>
            <circle cx="8" cy="52" r="2" fill="#92400e" opacity="0.2"/>
            <circle cx="52" cy="52" r="2" fill="#92400e" opacity="0.2"/>
          </svg>
        </div>
        
        <!-- Bird icon -->
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-amber-700/40">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8 8 8 3.59 8 8-3.59 8-8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 1.79 4 4-1.79 4-4z"/>
        </svg>
      </div>
    </div>
    
    <!-- 
      LAYER 5: Pure hero content - no navigation (handled by TheHeader component)
      - Focus on immersive visual experience
    -->
    
    <!-- 
      LAYER 6: Typography with tribal pattern integration
      - Progressive reveal with cultural design elements
    -->
    <div class="absolute inset-0 z-30 flex items-center justify-center px-8">
      <div class="text-center max-w-5xl typography-container" ref="typography">
        
        <!-- Main headline with tribal word frames -->
        <h1 class="hero-headline" ref="headline">
          <span 
            v-for="(word, index) in headlineWords" 
            :key="index"
            class="headline-word"
            :style="word.style"
          >
            {{ word.text }}
            <!-- Tribal accent for each word -->
            <div class="word-tribal-accent" :style="word.accentStyle"></div>
          </span>
        </h1>
        
        <!-- Subtext with tribal phrase separators -->
        <ClientOnly>
          <p class="hero-subtext" ref="subtext">
            <span 
              v-for="(phrase, index) in subtextPhrases" 
              :key="index"
              class="subtext-phrase"
              :style="phrase.style"
            >
              {{ phrase.text }}
              <!-- Tribal separator between phrases -->
              <div v-if="index < subtextPhrases.length - 1" class="phrase-separator">
                <svg class="w-8 h-4" viewBox="0 0 32 16" preserveAspectRatio="none">
                  <path d="M0 8 L8 0 L16 8 L24 0 L32 8" stroke="#92400e" stroke-width="1" fill="none" opacity="0.3"/>
                  <circle cx="8" cy="8" r="1.5" fill="#92400e" opacity="0.2"/>
                  <circle cx="24" cy="8" r="1.5" fill="#92400e" opacity="0.2"/>
                </svg>
              </div>
            </span>
          </p>
        </ClientOnly>
        
        <!-- Premium CTA with tribal frame -->
        <div class="cta-container" ref="ctaContainer">
          <!-- CHANGE 1: Tag changed from button to NuxtLink -->
          <!-- CHANGE 2: Added 'to="/tours"' (Replace with your actual path) -->
          <NuxtLink 
            to="/safari-packages?ref=hero" 
            class="premium-cta" 
            ref="ctaButton" 
            @click="handleCTAClick"
          >
            <span class="cta-text">Begin Your Journey</span>
            
            <!-- Tribal glow effect (Kept exactly the same) -->
            <div class="cta-tribal-glow" ref="ctaGlow">
              <svg class="w-full h-full" viewBox="0 0 300 60" preserveAspectRatio="none">
                <pattern id="ctaPattern" x="0" y="0" width="30" height="60" patternUnits="userSpaceOnUse">
                  <path d="M15 0 L20 15 L15 30 L10 15 L15 0" stroke="rgba(251, 191, 36, 0.2)" stroke-width="1" fill="none"/>
                  <circle cx="15" cy="30" r="2" fill="rgba(251, 191, 36, 0.1)"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#ctaPattern)"/>
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- 
      LAYER 7: Scroll progress with tribal indicators
      - Elegant visual feedback with cultural patterns
    -->
    <div class="absolute right-8 top-1/2 transform -translate-y-1/2 z-40 scroll-indicator">
      <div class="flex flex-col space-y-3">
        <div 
          v-for="i in 3" 
          :key="i"
          class="scroll-dot"
          :class="{ active: currentSection >= i }"
          @click="scrollToSection(i)"
        >
          <!-- Tribal pattern for active dots -->
          <div v-if="currentSection >= i" class="scroll-dot-tribal">
            <svg class="w-full h-full" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="8" stroke="#92400e" stroke-width="1" fill="none"/>
              <circle cx="10" cy="10" r="2" fill="#92400e"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 
      FOUNDATION PATTERN: Bottom tribal border grounding the design
      - Inspired by Ndebele art, represents stability and heritage
    -->
    <div class="absolute bottom-0 left-0 right-0 z-50 foundation-pattern" ref="foundationPattern">
      <svg class="w-full h-12" viewBox="0 0 1200 48" preserveAspectRatio="none">
        <pattern id="foundationPattern" x="0" y="0" width="60" height="48" patternUnits="userSpaceOnUse">
          <rect x="5" y="5" width="50" height="38" stroke="currentColor" class="text-brand-terracotta" stroke-width="2" fill="none" opacity="0.4"/>
          <path d="M5 24 L30 10 L55 24 L30 38 L5 24" stroke="currentColor" class="text-brand-terracotta" stroke-width="1" fill="none" opacity="0.3"/>
          <circle cx="30" cy="24" r="4" fill="currentColor" class="text-brand-terracotta" opacity="0.2"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#foundationPattern)"/>
      </svg>
    </div>
    
  </div>
  
  <!-- Hero Section -->
  <div class="relative z-10">
    <Hero />
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

// Reactive data
const atmosphereLayer = ref<HTMLElement | null>(null)
const midgroundLayer = ref<HTMLElement | null>(null)
const contentLayer = ref<HTMLElement | null>(null)
const lightRays = ref<HTMLElement | null>(null)
const particlesContainer = ref<HTMLElement | null>(null)
const typography = ref<HTMLElement | null>(null)
const headline = ref<HTMLElement | null>(null)
const subtext = ref<HTMLElement | null>(null)
const ctaContainer = ref<HTMLElement | null>(null)
const ctaButton = ref<HTMLElement | null>(null)
const ctaGlow = ref<HTMLElement | null>(null)
const horizonPattern = ref<HTMLElement | null>(null)
const leftEdge = ref<HTMLElement | null>(null)
const rightEdge = ref<HTMLElement | null>(null)
const foundationPattern = ref<HTMLElement | null>(null)

// Animation data with tribal styling
const headlineWords = ref([
  { text: 'Where', style: {}, accentStyle: {} },
  { text: 'the', style: {}, accentStyle: {} },
  { text: 'Earth', style: {}, accentStyle: {} },
  { text: 'Still', style: {}, accentStyle: {} },
  { text: 'Speaks', style: {}, accentStyle: {} }
])

const subtextPhrases = ref([
  { text: 'Journeys that connect you', style: {} },
  { text: 'to timeless rhythm', style: {} },
  { text: 'of African wilderness', style: {} }
])

// Slideshow data for Ken Burns Hero
const currentSlideIndex = ref(0)
const slides = [
  { 
    id: 'elephants',
    image: 'https://res.cloudinary.com/dmdihuyvn/image/upload/v1770903538/DSC_0513_ajzrvb.jpg',
    alt: 'Golden savanna with elephants at dawn'
  },
  {
    id: 'lion',
    image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&q=80&w=1920',
    alt: 'Majestic lion in the tall grass'
  },
  {
    id: 'gazelle',
    image: 'https://res.cloudinary.com/dmdihuyvn/image/upload/v1770903488/DSC_0169_lowu5p.jpg',
    alt: 'The savannah with a herd of gazelles'
  },
  {
    id: 'gazelle',
    image: 'https://res.cloudinary.com/dmdihuyvn/image/upload/v1770903503/DSC_0232_mhvplm.jpg',
    alt: 'The savannah with a herd of gazelles'
  },
  {
    id: 'hippos',
    image: 'https://res.cloudinary.com/dmdihuyvn/image/upload/v1770903491/DSC_0184_ofqwcn.jpg',
    alt: 'Hippos in the water'
  },
  {
    id: 'giraffes',
    image: 'https://res.cloudinary.com/dmdihuyvn/image/upload/v1770903539/DSC_0519_cjrhjf.jpg',
    alt: 'A heard od giraffes'
  }
]

let slideInterval: any = null

const startSlideshow = () => {
  slideInterval = setInterval(() => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.length
  }, 8000) // 8 seconds per slide
}

// Wildlife elements with tribal interactions
const birds = reactive([
  { 
    id: 'bird1', 
    ref: ref(null) as any, 
    style: { top: '20%', left: '15%' },
    hovered: false,
    clicked: false
  },
  { 
    id: 'bird2', 
    ref: ref(null) as any, 
    style: { top: '30%', left: '70%' },
    hovered: false,
    clicked: false
  },
  { 
    id: 'bird3', 
    ref: ref(null) as any, 
    style: { top: '25%', left: '85%' },
    hovered: false,
    clicked: false
  }
])

// State
const currentSection = ref(0)
let mouseX = 0
let mouseY = 0
let horizonDrawn = false
const heroLoaded = ref(false)
const scrolledValue = ref(0)

// Tribal ray path generation
const getRayPath = (index: number) => {
  const patterns = [
    'M50 0 L45 50 L50 100 L55 50 L50 200',
    'M50 0 L55 50 L50 100 L45 50 L50 200',
    'M50 0 L50 50 L40 100 L50 150 L60 100 L50 200',
    'M50 0 L50 50 L60 100 L50 150 L40 100 L50 200'
  ]
  return patterns[index % patterns.length]
}

// Tribal ray styling
const getTribalRayStyle = (index: number) => {
  const angle = (index / 8) * Math.PI * 2
  const x = 50 + Math.cos(angle) * 30
  const y = 50 + Math.sin(angle) * 30
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: `rotate(${angle}rad)`,
    opacity: '0.3'
  }
}

// Advanced scroll-based animations with tribal patterns
const handleScroll = () => {
  const scrolled = window.pageYOffset
  scrolledValue.value = scrolled
  const windowHeight = window.innerHeight
  
  // Update current section
  currentSection.value = Math.min(2, Math.floor((scrolled / windowHeight) * 3))
  
  // Layer parallax effects
  if (atmosphereLayer.value) {
    atmosphereLayer.value.style.transform = `translateY(${scrolled * 0.05}px)`
  }
  
  if (midgroundLayer.value) {
    midgroundLayer.value.style.transform = `translateY(${scrolled * 0.15}px)`
  }
  
  if (contentLayer.value) {
    contentLayer.value.style.transform = `translateY(${scrolled * 0.25}px)`
  }
  
  // Tribal edge animations
  if (leftEdge.value && rightEdge.value) {
    const opacity = Math.max(0.1, 0.3 - scrolled * 0.0005)
    leftEdge.value.style.opacity = opacity.toString()
    rightEdge.value.style.opacity = opacity.toString()
  }
  
  
  // Horizon pattern animation on load
  if (!horizonDrawn && scrolled < 50) {
    drawHorizonPattern()
    horizonDrawn = true
  }
  
  // Typography reveal with tribal accents
  updateTypography(scrolled)
  
  // Tribal light rays animation
  updateTribalLightRays(scrolled)
  
  // Tribal particle animation
  updateTribalParticles(scrolled)
  
  
  // Foundation pattern fade
  if (foundationPattern.value) {
    const opacity = Math.max(0.2, 0.6 - scrolled * 0.0008)
    foundationPattern.value.style.opacity = opacity.toString()
  }
}

// Draw horizon pattern on load
const drawHorizonPattern = () => {
  if (horizonPattern.value) {
    horizonPattern.value.classList.add('horizon-drawn')
  }
}

// Tribal light rays that follow mouse
const updateTribalLightRays = (scrolled: number) => {
  if (!lightRays.value) return
  
  const centerX = window.innerWidth / 2
  const centerY = window.innerHeight / 2
  
  for (let i = 0; i < 8; i++) {
    const ray = lightRays.value.children[i] as HTMLElement
    if (ray) {
      const angle = (i / 8) * Math.PI * 2 - Math.PI / 2 + scrolled * 0.001
      const targetX = centerX + Math.cos(angle) * 250
      const targetY = centerY + Math.sin(angle) * 250
      
      const currentX = parseFloat(ray.style.left as string) || centerX
      const currentY = parseFloat(ray.style.top as string) || centerY
      
      const newX = currentX + (targetX - currentX) * 0.08
      const newY = currentY + (targetY - currentY) * 0.08
      
      ray.style.left = `${newX}px`
      ray.style.top = `${newY}px`
      ray.style.opacity = (0.2 + Math.sin(scrolled * 0.001 + i) * 0.1).toString()
    }
  }
}

// Tribal particle system
const updateTribalParticles = (scrolled: number) => {
  if (!particlesContainer.value) return
  
  // Clear existing particles
  particlesContainer.value.innerHTML = ''
  
  // Create tribal particles based on scroll
  const particleCount = Math.floor(scrolled / 40)
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    particle.className = 'tribal-particle'
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: rgba(146, 64, 14, ${Math.random() * 0.15 + 0.05});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: tribal-float ${Math.random() * 10 + 5}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
    `
    particlesContainer.value.appendChild(particle)
  }
}


// Typography animations with tribal accents - IMPROVED for visibility
const updateTypography = (scrolled: number) => {
  // Base progress for entrance animation
  const entranceProgress = heroLoaded.value ? 1 : 0
  
  // Animate headline words with tribal accents
  headlineWords.value.forEach((word, index) => {
    const delay = index * 100
    // Scroll-based parallax/fade-out (only starts fading after scrolling down a bit)
    const scrollEffect = Math.max(0, 1 - (scrolled / 600))
    
    // Combine entrance and scroll
    const wordProgress = entranceProgress * scrollEffect
    
    word.style = {
      opacity: wordProgress.toString(),
      transform: `
        translateY(${(1 - wordProgress) * 20}px) 
        rotateX(${(1 - wordProgress) * 10}deg)
        scale(${0.95 + wordProgress * 0.05})
      `
    }
    
    word.accentStyle = {
      width: `${wordProgress * 100}%`,
      opacity: (wordProgress * 0.6).toString()
    }
  })
  
  // Animate subtext phrases with tribal separators
  subtextPhrases.value.forEach((phrase, index) => {
    const scrollEffect = Math.max(0, 1 - (scrolled / 500))
    const wordProgress = entranceProgress * scrollEffect
    
    phrase.style = {
      opacity: wordProgress.toString(),
      transform: `
        translateX(${(1 - wordProgress) * -20}px)
        translateY(${Math.sin(scrolled * 0.002 + index) * 5}px)
      `
    }
  })
}

// Bird click with tribal frame interaction
const handleBirdClick = (bird: any) => {
  bird.clicked = true
  bird.hovered = true
  
  setTimeout(() => {
    bird.clicked = false
    bird.hovered = false
  }, 1200)
}

// CTA click handler
const handleCTAClick = () => {
  if (ctaGlow.value) {
    ctaGlow.value.style.opacity = '1'
    setTimeout(() => {
      if (ctaGlow.value) {
        ctaGlow.value.style.opacity = '0'
      }
    }, 600)
  }
}

// Scroll to section
const scrollToSection = (sectionIndex: number) => {
  const targetY = sectionIndex * window.innerHeight
  window.scrollTo({ top: targetY, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Initialize tribal particles
  updateTribalParticles(0)
  
  // Trigger entry animation
  setTimeout(() => {
    heroLoaded.value = true
    updateTypography(window.pageYOffset)
  }, 200)

  // Draw horizon pattern after mount
  setTimeout(() => {
    drawHorizonPattern()
  }, 100)
  
  // Set initial state
  handleScroll()
  
  // Start Hero slideshow
  startSlideshow()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (slideInterval) clearInterval(slideInterval)
})
</script>

<style scoped>
/* Tribal texture overlay */
.tribal-texture {
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(146, 64, 14, 0.03) 10px, rgba(146, 64, 14, 0.03) 20px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(146, 64, 14, 0.02) 10px, rgba(146, 64, 14, 0.02) 20px);
}

/* Layer system */
.layer-atmosphere,
.layer-midground,
.layer-content {
  will-change: transform;
  transition: transform 0.1s ease-out;
}

/* Horizon pattern animation */
.horizon-pattern {
  opacity: 0;
  transform: scaleX(0);
  transform-origin: left center;
}

.horizon-pattern.horizon-drawn {
  animation: drawHorizon 2s ease-out forwards;
}

@keyframes drawHorizon {
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

/* Ken Burns Effect: Smooth slow zoom and pan */
.ken-burns-active {
  animation: kenburns 40s ease-in-out infinite alternate;
  transform-origin: center;
  will-change: transform;
}

@keyframes kenburns {
  0% {
    transform: scale(1) translate(0, 0);
  }
  25% {
    transform: scale(1.05) translate(-1%, -1%);
  }
  50% {
    transform: scale(1.1) translate(1%, 0);
  }
  75% {
    transform: scale(1.05) translate(-1%, 1%);
  }
  100% {
    transform: scale(1.15) translate(0, 0);
  }
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

/* Tribal edges */
.tribal-edge-left,
.tribal-edge-right {
  opacity: 0.3;
  transition: opacity 0.5s ease;
}

/* Tribal light rays */
.tribal-light-rays {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.tribal-light-ray {
  position: absolute;
  width: 100px;
  height: 200px;
  transform-origin: center center;
  transition: all 0.4s ease-out;
  will-change: transform, opacity;
}

/* Wildlife elements with tribal frames */
.wildlife-bird {
  position: absolute;
  width: 60px;
  height: 60px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  cursor: pointer;
}

.tribal-frame {
  position: absolute;
  inset: -10px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.tribal-frame-active {
  opacity: 1;
  transform: scale(1);
}

.wildlife-bird:hover .tribal-frame {
  opacity: 1;
  transform: scale(1);
}

/* Tribal particles */
.tribal-particle {
  will-change: transform, opacity;
}

@keyframes tribal-float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0;
  }
  50% { 
    transform: translateY(-25px) rotate(180deg); 
    opacity: 0.6;
  }
  100% { 
    transform: translateY(0px) rotate(360deg); 
    opacity: 0;
  }
}

/* Navigation with tribal elements */
.navigation-header {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.navigation-header.nav-minimal {
  backdrop-filter: blur(8px);
  background: rgba(251, 191, 36, 0.03);
}

.tribal-nav-accent {
  background: linear-gradient(90deg, #92400e 0%, #92400e 50%, #92400e 100%);
  transition: width 0.5s ease;
}

.nav-item {
  position: relative;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #92400e;
  background: none;
  border: none;
  transition: all 0.3s ease;
}

.nav-item:hover .nav-tribal-indicator {
  opacity: 1;
  transform: translateX(-50%) scaleX(1);
}

.nav-tribal-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 20px;
  height: 2px;
  background: #92400e;
  opacity: 0;
  transform: translateX(-50%) scaleX(0);
  transition: all 0.3s ease;
}

/* Typography with tribal accents */
.hero-headline {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  font-weight: 700;
  color: #36454f; /* brand-charcoal */
}

.headline-word {
  display: inline-block;
  position: relative;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.word-tribal-accent {
  position: absolute;
  bottom: -8px;
  left: 0;
  height: 2px;
  background-color: #92400e; /* brand-terracotta */
  transition: all 0.6s ease;
}

.hero-subtext {
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgba(54, 69, 79, 0.8); /* brand-charcoal/80 */
  margin-bottom: 2rem;
}

.subtext-phrase {
  display: inline-block;
  position: relative;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.phrase-separator {
  display: inline-block;
  margin: 0 1rem;
  vertical-align: middle;
}

/* CTA with tribal frame */
.cta-container {
  position: relative;
  display: inline-block;
}

.premium-cta {
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  background: linear-gradient(135deg, #92400e 0%, #78350f 100%);
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(146, 64, 14, 0.2);
}

.premium-cta:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(146, 64, 14, 0.3);
}

.cta-tribal-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: all 0.6s ease;
  will-change: transform, opacity;
}

.premium-cta:hover .cta-tribal-glow {
  opacity: 1;
}

/* Scroll indicator with tribal patterns */
.scroll-indicator {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  padding: 1rem;
  border-radius: 9999px;
}

.scroll-dot {
  width: 0.75rem;
  height: 0.75rem;
  background: rgba(146, 64, 14, 0.3);
  border-radius: 50%;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.scroll-dot.active {
  background: transparent;
  transform: scale(1.2);
}

.scroll-dot-tribal {
  position: absolute;
  inset: 0;
}

/* Foundation pattern */
.foundation-pattern {
  opacity: 0.6;
  transition: opacity 0.5s ease;
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