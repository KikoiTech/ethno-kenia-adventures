<template>
  <!-- 
    SECTION: Featured Packages
    PURPOSE: To entice users with visually rich, interactive preview of core offerings
    VISUALS: Brand-off-white section with interactive cards
    FUNCTIONALITY: Layered cards with hover effects and African geometric borders
  -->
  <section 
    ref="featuredPackagesSection"
    class="relative bg-brand-off-white py-20 md:py-32 overflow-hidden featured-packages-section"
  >
    <!-- Papyrus texture overlay for consistency -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
         style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sZz4KICA8ZGVmcz4KICAgIDxmZmlsdGVyIGlkPSJwYXB5cnVzIgogICAgICA8ZmVUdXJidWxlbmNlIHR5cGU9Ii45IiBudW1PY3RlPSI0IiBzZWVkPSI1Ii8+CiAgICA8L2RlZz4KICAgICAgIDxmZVRidWxlbmNlIHR5cGU9Ii45IiBudW1PY3RlPSI0IiBzZWVkPSI1Ii8+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjQwMCIgZmlsdGVyPSJodHR0cDovL3N2Zy9dmV3LzIwMCIgZmlsdGVyPSJodHR0cDovL3N2Zy9dmV3LzIwMCIgb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg==');">
    </div>

    <div class="container mx-auto px-6 relative">
      
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-serif leading-tight mb-4 text-brand-charcoal">
          Featured Journeys
        </h2>
        <p class="text-lg md:text-xl font-sans font-light text-brand-charcoal/80 max-w-2xl mx-auto">
          Discover our carefully crafted safari experiences, each designed to connect you deeply with Kenya's wild soul
        </p>
      </div>

      <!-- Packages Container -->
      <div class="relative">
        <!-- Horizontal Scroll Container -->
        <div class="flex overflow-x-auto scrollbar-hide space-x-6 pb-4" ref="packagesContainer">
          
          <!-- Package 1: Maasai Mara Explorer -->
          <div 
            class="flex-shrink-0 w-80 md:w-96 relative group cursor-pointer"
            @mouseenter="hoverPackage('maasai-mara')"
            @mouseleave="unhoverPackage"
          >
            <!-- Package Card -->
            <div class="relative h-96 md:h-[450px] rounded-lg overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl">
              
              <!-- Background Image with Zoom Effect -->
              <div class="absolute inset-0">
                <img 
                  src="https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                  alt="Maasai Mara safari experience"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                <!-- Dark Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <!-- African Geometric Border -->
              <div 
                class="absolute inset-0 border-4 border-brand-terracotta/0 group-hover:border-brand-terracotta transition-all duration-500 rounded-lg"
                :class="{ 'border-opacity-100': hoveredPackage === 'maasai-mara' }"
              >
                <!-- Corner Decorations -->
                <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-terracotta"></div>
                <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-terracotta"></div>
                <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-terracotta"></div>
                <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-terracotta"></div>
              </div>

              <!-- Package Content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-brand-off-white z-10">
                <div class="transform transition-transform duration-500 group-hover:translate-y-2">
                  <h3 class="text-xl md:text-2xl font-serif mb-2">Maasai Mara Explorer</h3>
                  <p class="text-sm md:text-base font-sans opacity-90 mb-4">7 days of unparalleled wildlife encounters</p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs md:text-sm font-sans opacity-75">From $3,500</span>
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4H6a2 2 0 100 4h2a1 1 0 100 2 2 2 0 002-2V5a2 2 0 00-2-2H6z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-xs font-medium">Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Package 2: Amboseli Luxury -->
          <div 
            class="flex-shrink-0 w-80 md:w-96 relative group cursor-pointer"
            @mouseenter="hoverPackage('amboseli')"
            @mouseleave="unhoverPackage"
          >
            <!-- Package Card -->
            <div class="relative h-96 md:h-[450px] rounded-lg overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl">
              
              <!-- Background Image with Zoom Effect -->
              <div class="absolute inset-0">
                <img 
                  src="https://images.pexels.com/photos/15286/pexels-photo-15286.jpg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                  alt="Amboseli luxury safari with Kilimanjaro"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                <!-- Dark Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <!-- African Geometric Border -->
              <div 
                class="absolute inset-0 border-4 border-brand-terracotta/0 group-hover:border-brand-terracotta transition-all duration-500 rounded-lg"
                :class="{ 'border-opacity-100': hoveredPackage === 'amboseli' }"
              >
                <!-- Corner Decorations -->
                <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-terracotta"></div>
                <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-terracotta"></div>
                <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-terracotta"></div>
                <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-terracotta"></div>
              </div>

              <!-- Package Content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-brand-off-white z-10">
                <div class="transform transition-transform duration-500 group-hover:translate-y-2">
                  <h3 class="text-xl md:text-2xl font-serif mb-2">Amboseli Luxury</h3>
                  <p class="text-sm md:text-base font-sans opacity-90 mb-4">5 days of elegance with Kilimanjaro views</p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs md:text-sm font-sans opacity-75">From $5,200</span>
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4H6a2 2 0 100 4h2a1 1 0 100 2 2 2 0 002-2V5a2 2 0 00-2-2H6z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-xs font-medium">Luxury</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Package 3: Samburu Adventure -->
          <div 
            class="flex-shrink-0 w-80 md:w-96 relative group cursor-pointer"
            @mouseenter="hoverPackage('samburu')"
            @mouseleave="unhoverPackage"
          >
            <!-- Package Card -->
            <div class="relative h-96 md:h-[450px] rounded-lg overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl">
              
              <!-- Background Image with Zoom Effect -->
              <div class="absolute inset-0">
                <img 
                  src="https://images.pexels.com/photos/1442368/pexels-photo-1442368.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                  alt="Samburu adventure safari experience"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                <!-- Dark Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <!-- African Geometric Border -->
              <div 
                class="absolute inset-0 border-4 border-brand-terracotta/0 group-hover:border-brand-terracotta transition-all duration-500 rounded-lg"
                :class="{ 'border-opacity-100': hoveredPackage === 'samburu' }"
              >
                <!-- Corner Decorations -->
                <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-terracotta"></div>
                <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-terracotta"></div>
                <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-terracotta"></div>
                <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-terracotta"></div>
              </div>

              <!-- Package Content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-brand-off-white z-10">
                <div class="transform transition-transform duration-500 group-hover:translate-y-2">
                  <h3 class="text-xl md:text-2xl font-serif mb-2">Samburu Adventure</h3>
                  <p class="text-sm md:text-base font-sans opacity-90 mb-4">4 days of rugged northern frontier exploration</p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs md:text-sm font-sans opacity-75">From $2,800</span>
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4H6a2 2 0 100 4h2a1 1 0 100 2 2 2 0 002-2V5a2 2 0 00-2-2H6z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-xs font-medium">Adventure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Package 4: Conservation Experience -->
          <div 
            class="flex-shrink-0 w-80 md:w-96 relative group cursor-pointer"
            @mouseenter="hoverPackage('conservation')"
            @mouseleave="unhoverPackage"
          >
            <!-- Package Card -->
            <div class="relative h-96 md:h-[450px] rounded-lg overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-2xl">
              
              <!-- Background Image with Zoom Effect -->
              <div class="absolute inset-0">
                <img 
                  src="https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                  alt="Conservation experience with rhinos"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                <!-- Dark Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/70 via-brand-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <!-- African Geometric Border -->
              <div 
                class="absolute inset-0 border-4 border-brand-terracotta/0 group-hover:border-brand-terracotta transition-all duration-500 rounded-lg"
                :class="{ 'border-opacity-100': hoveredPackage === 'conservation' }"
              >
                <!-- Corner Decorations -->
                <div class="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brand-terracotta"></div>
                <div class="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brand-terracotta"></div>
                <div class="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brand-terracotta"></div>
                <div class="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brand-terracotta"></div>
              </div>

              <!-- Package Content -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-brand-off-white z-10">
                <div class="transform transition-transform duration-500 group-hover:translate-y-2">
                  <h3 class="text-xl md:text-2xl font-serif mb-2">Conservation Experience</h3>
                  <p class="text-sm md:text-base font-sans opacity-90 mb-4">3 days supporting Kenya's wildlife protection</p>
                  <div class="flex items-center justify-between">
                    <span class="text-xs md:text-sm font-sans opacity-75">From $4,100</span>
                    <div class="flex items-center space-x-1">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4H6a2 2 0 100 4h2a1 1 0 100 2 2 2 0 002-2V5a2 2 0 00-2-2H6z" clip-rule="evenodd"/>
                      </svg>
                      <span class="text-xs font-medium">Impact</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Scroll Indicator -->
        <div class="flex justify-center mt-6 space-x-2">
          <div 
            v-for="i in 4" 
            :key="i"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="i === 0 ? 'bg-brand-terracotta' : 'bg-brand-charcoal/30'"
          ></div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="mt-16 text-center">
        <a 
          href="#" 
          class="inline-flex items-center justify-center px-8 py-4 bg-brand-terracotta text-brand-off-white font-sans font-medium rounded-full transition-all duration-300 hover:bg-brand-terracotta/90 hover:scale-105"
        >
          <span>View All Safari Packages</span>
          <svg class="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5 5-5M13 17l5 5-5"/>
          </svg>
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const featuredPackagesSection = ref<HTMLElement>()
const hoveredPackage = ref<string | null>(null)

// Package hover handlers
const hoverPackage = (packageId: string) => {
  hoveredPackage.value = packageId
}

const unhoverPackage = () => {
  hoveredPackage.value = null
}

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
  const opacity = Math.max(0.5, 1 - sectionProgress * 0.15) // Gentle fade as user scrolls
  
  if (featuredPackagesSection.value) {
    featuredPackagesSection.value.style.transform = `translateY(${translateY}px)`
    featuredPackagesSection.value.style.opacity = opacity.toString()
  }
}

onMounted(() => {
  // Add scroll listener for parallax
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Initial call to set starting state
  handleScroll()
})

onUnmounted(() => {
  // Clean up
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Parallax section styling */
.featured-packages-section {
  will-change: transform, opacity;
  transition: transform 0.3s ease-out, opacity 0.5s ease-out;
}

/* Hide scrollbar for clean horizontal scroll */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Border opacity transitions */
.border-opacity-100 {
  opacity: 1;
}

/* Group hover effects */
.group-hover\:scale-110:hover {
  transform: scale(1.1);
}

.group-hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.group-hover\:opacity-100:hover .absolute.inset-0 > div:last-child {
  opacity: 1;
}

.group-hover\:border-brand-terracotta:hover {
  border-color: #92400e;
}

.group-hover\:translate-y-2:hover .absolute.bottom-0 > div {
  transform: translateY(-0.5rem);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .flex-shrink-0 {
    width: 20rem;
  }
}
</style>
