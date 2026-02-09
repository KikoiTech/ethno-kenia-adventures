<template>
  <!-- 
    SECTION: The Adventurous Field Guide
    PURPOSE: Interactive animal migration map + business tourism invitation
    AESTHETIC: Brand-off-white with papyrus texture, vintage explorer feel
  -->
  <section 
    ref="fieldGuideSection"
    class="relative bg-brand-off-white py-20 md:py-32 overflow-hidden field-guide-section"
  >
    <!-- Papyrus texture overlay -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
         style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9InBhcHlydXMiPgogICAgICA8ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii45IiBudW1PY3RhdmVzPSI0IiBzZWVkPSI1Ii8+CiAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjcGFweXJ1cyIgb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg==');">
    </div>

    <div class="container mx-auto px-6 relative">
      
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-4 text-brand-charcoal">
          Animal Migration Routes
        </h2>
        <p class="text-lg md:text-xl font-sans font-light text-brand-charcoal/80 max-w-2xl mx-auto">
          Follow the ancient paths where wildlife roams free across Kenya's protected territories
        </p>
      </div>

      <!-- Map Container -->
      <div class="relative max-w-6xl mx-auto h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
        <!-- Mapbox GL JS Map -->
        <div id="field-guide-map" class="w-full h-full"></div>
        
        <!-- Animal Migration Routes Overlay -->
        <div class="absolute inset-0 pointer-events-none">
          <!-- Migration Route Lines -->
          <svg class="w-full h-full" viewBox="0 0 1000 600">
            <!-- Elephant Migration Route -->
            <path d="M200,300 Q350,200 500,250 T800,200" 
                  stroke="#92400e" stroke-width="3" fill="none" opacity="0.6"
                  stroke-dasharray="10,5" class="migration-route"/>
            
            <!-- Wildebeest Migration Route -->
            <path d="M150,400 Q400,350 600,300 T850,350" 
                  stroke="#92400e" stroke-width="3" fill="none" opacity="0.6"
                  stroke-dasharray="10,5" class="migration-route"/>
            
            <!-- Zebra Migration Route -->
            <path d="M100,200 Q300,150 500,180 T900,250" 
                  stroke="#92400e" stroke-width="3" fill="none" opacity="0.6"
                  stroke-dasharray="10,5" class="migration-route"/>
          </svg>
        </div>

        <!-- Wildlife Hotspot Markers -->
        <div class="absolute inset-0 pointer-events-auto">
          <!-- Maasai Mara - Elephant Hotspot -->
          <div 
            class="location-marker absolute transform -translate-x-1/2 -translate-y-1/2"
            style="left: 45%; top: 40%;"
            @mouseenter="showInfo('maasai-mara')"
            @mouseleave="hideInfo"
          >
            <div class="marker-icon elephant-marker">
              <svg viewBox="0 0 40 40" class="w-8 h-8 md:w-10 md:h-10">
                <path d="M20,5 C15,5 10,10 10,15 C10,18 15,20 20,20 C25,20 30,18 30,15 C30,10 25,5 20,5 Z" 
                      fill="#92400e" opacity="0.8"/>
                <circle cx="20" cy="15" r="2" fill="#36454f"/>
              </svg>
            </div>
            <div class="marker-label">Maasai Mara</div>
          </div>

          <!-- Amboseli - Giraffe Hotspot -->
          <div 
            class="location-marker absolute transform -translate-x-1/2 -translate-y-1/2"
            style="left: 65%; top: 25%;"
            @mouseenter="showInfo('amboseli')"
            @mouseleave="hideInfo"
          >
            <div class="marker-icon giraffe-marker">
              <svg viewBox="0 0 40 40" class="w-8 h-8 md:w-10 md:h-10">
                <rect x="15" y="5" width="10" height="25" fill="#92400e" opacity="0.8" rx="2"/>
                <circle cx="20" cy="10" r="3" fill="#36454f"/>
              </svg>
            </div>
            <div class="marker-label">Amboseli</div>
          </div>

          <!-- Samburu - Rhino Hotspot -->
          <div 
            class="location-marker absolute transform -translate-x-1/2 -translate-y-1/2"
            style="left: 30%; top: 30%;"
            @mouseenter="showInfo('samburu')"
            @mouseleave="hideInfo"
          >
            <div class="marker-icon rhino-marker">
              <svg viewBox="0 0 40 40" class="w-8 h-8 md:w-10 md:h-10">
                <path d="M20,10 C15,10 10,15 10,20 L10,30 L30,30 L30,20 C30,15 25,10 20,10 Z" 
                      fill="#92400e" opacity="0.8"/>
                <circle cx="20" cy="18" r="2" fill="#36454f"/>
              </svg>
            </div>
            <div class="marker-label">Samburu</div>
          </div>

          <!-- Laikipia - Lion Hotspot -->
          <div 
            class="location-marker absolute transform -translate-x-1/2 -translate-y-1/2"
            style="left: 50%; top: 35%;"
            @mouseenter="showInfo('laikipia')"
            @mouseleave="hideInfo"
          >
            <div class="marker-icon lion-marker">
              <svg viewBox="0 0 40 40" class="w-8 h-8 md:w-10 md:h-10">
                <path d="M20,15 C15,15 10,18 10,22 C10,25 12,28 20,28 C28,28 30,25 30,22 C30,18 25,15 20,15 Z" 
                      fill="#92400e" opacity="0.8"/>
                <circle cx="20" cy="20" r="2" fill="#36454f"/>
              </svg>
            </div>
            <div class="marker-label">Laikipia</div>
          </div>

          <!-- Tsavo - Leopard Hotspot -->
          <div 
            class="location-marker absolute transform -translate-x-1/2 -translate-y-1/2"
            style="left: 60%; top: 55%;"
            @mouseenter="showInfo('tsavo')"
            @mouseleave="hideInfo"
          >
            <div class="marker-icon leopard-marker">
              <svg viewBox="0 0 40 40" class="w-8 h-8 md:w-10 md:h-10">
                <path d="M20,18 C15,18 10,20 10,25 C10,28 15,30 20,30 C25,30 30,28 30,25 C30,20 25,18 20,18 Z" 
                      fill="#92400e" opacity="0.8"/>
                <circle cx="20" cy="22" r="2" fill="#36454f"/>
              </svg>
            </div>
            <div class="marker-label">Tsavo</div>
          </div>
        </div>

        <!-- Animal Info Panel -->
        <div v-if="activeInfo" class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl z-20 max-w-xs">
          <div class="flex items-center space-x-3 mb-3">
            <div class="marker-icon" :class="getMarkerClass(activeInfo)"></div>
            <h3 class="text-lg font-serif text-brand-charcoal">{{ getAnimalName(activeInfo) }}</h3>
          </div>
          <p class="text-sm font-sans text-brand-charcoal/80 mb-3">{{ getAnimalDescription(activeInfo) }}</p>
          <div class="space-y-2">
            <p class="text-xs font-sans text-brand-terracotta font-medium">
              <span class="uppercase tracking-wider">Best Season:</span> {{ getBestSeason(activeInfo) }}
            </p>
            <p class="text-xs font-sans text-brand-terracotta font-medium">
              <span class="uppercase tracking-wider">Conservation Status:</span> {{ getConservationStatus(activeInfo) }}
            </p>
          </div>
        </div>

        <!-- Map Attribution -->
        <div class="absolute bottom-2 right-2 text-xs text-brand-charcoal/60 font-sans">
          &copy; Ethno Kenia Adventures - Animal Migration Routes
        </div>
      </div>

      <!-- Business Owner Tourism Invitation -->
      <div class="mt-16 text-center">
        <div class="bg-brand-charcoal/5 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 class="text-2xl md:text-3xl font-serif mb-4 text-brand-charcoal">
            Welcome to Our Wildlife Sanctuary
          </h3>
          <p class="text-lg font-sans text-brand-charcoal/80 mb-6">
            As a proud Kenyan business, we invite both local and international tourists to experience these magnificent animal migrations. Witness elephants, wildebeest, zebras, and more in their natural habitats across our protected conservation areas.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              class="inline-flex items-center justify-center px-6 py-3 bg-brand-terracotta text-brand-off-white font-sans font-medium rounded-full transition-all duration-300 hover:bg-brand-terracotta/90 hover:scale-105"
            >
              <span>Plan Your Safari</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5 5-5M13 17l5 5-5"/>
              </svg>
            </a>
            
            <a 
              href="#" 
              class="inline-flex items-center justify-center px-6 py-3 border border-brand-charcoal/30 text-brand-charcoal font-sans font-medium rounded-full transition-all duration-300 hover:border-brand-charcoal/50 hover:bg-brand-charcoal/5"
            >
              <span>Learn Conservation</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeInfo = ref<string | null>(null)
const fieldGuideSection = ref<HTMLElement>()

// Animal information data
const animalData = {
  'maasai-mara': {
    name: 'African Elephant',
    description: 'The largest land mammals, elephants migrate between Maasai Mara and Serengeti following ancient routes passed down through generations.',
    season: 'July - October',
    conservation: 'Vulnerable'
  },
  'amboseli': {
    name: 'Masai Giraffe',
    description: 'Towering giants of the savanna, giraffes can be seen year-round in Amboseli with Mount Kilimanjaro as their backdrop.',
    season: 'Year-round',
    conservation: 'Vulnerable'
  },
  'samburu': {
    name: 'Black Rhino',
    description: 'Critically endangered black rhinos find refuge in Samburu\'s protected areas, a testament to Kenya\'s conservation success.',
    season: 'December - March',
    conservation: 'Critically Endangered'
  },
  'laikipia': {
    name: 'African Lion',
    description: 'The apex predators of the savanna, lions hunt in prides across Laikipia\'s vast conservancies.',
    season: 'Year-round',
    conservation: 'Vulnerable'
  },
  'tsavo': {
    name: 'Leopard',
    description: 'Elusive and solitary, leopards thrive in Tsavo\'s diverse ecosystems from mountains to plains.',
    season: 'May - September',
    conservation: 'Vulnerable'
  }
}

// Info panel functions
const showInfo = (location: string) => {
  activeInfo.value = location
}

const hideInfo = () => {
  activeInfo.value = null
}

const getAnimalName = (location: string) => {
  return animalData[location as keyof typeof animalData]?.name || ''
}

const getAnimalDescription = (location: string) => {
  return animalData[location as keyof typeof animalData]?.description || ''
}

const getBestSeason = (location: string) => {
  return animalData[location as keyof typeof animalData]?.season || ''
}

const getConservationStatus = (location: string) => {
  return animalData[location as keyof typeof animalData]?.conservation || ''
}

const getMarkerClass = (location: string) => {
  const classes = {
    'maasai-mara': 'elephant-marker',
    'amboseli': 'giraffe-marker',
    'samburu': 'rhino-marker',
    'laikipia': 'lion-marker',
    'tsavo': 'leopard-marker'
  }
  return classes[location as keyof typeof classes] || ''
}

// Mapbox GL JS initialization
let map: any = null

// Parallax scrolling effect
const handleScroll = () => {
  if (!fieldGuideSection.value) return
  
  const scrolled = window.pageYOffset
  const sectionTop = fieldGuideSection.value.offsetTop
  const windowHeight = window.innerHeight
  
  // Calculate parallax progress for field guide section
  const sectionProgress = Math.max(0, Math.min(1, (scrolled - sectionTop + windowHeight * 0.5) / (windowHeight * 1.5)))
  
  // Apply parallax transformation
  const translateY = sectionProgress * -40 // Subtle upward movement
  const opacity = Math.max(0.4, 1 - sectionProgress * 0.2) // Gentle fade as user scrolls
  
  fieldGuideSection.value.style.transform = `translateY(${translateY}px)`
  fieldGuideSection.value.style.opacity = opacity.toString()
}

onMounted(() => {
  // Add scroll listener for parallax
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Initialize Mapbox map with animal migration styling
  if (typeof window !== 'undefined' && (window as any).mapboxgl) {
    const mapboxgl = (window as any).mapboxgl
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2VueeS1zYWZhcmlfaGVyaXRhZ2UiLCJhIjoiY2w4dGZjNzVhMjBkNjJsbzJqbnQ4aDZ0aSJ9.abc123def456ghi789jkl'
    
    map = new mapboxgl.Map({
      container: 'field-guide-map',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [37.9062, -0.0236],
      zoom: 6.5,
      interactive: true,
      attributionControl: false
    })

    // Custom styling for animal migration map
    map.on('load', () => {
      map.setPaintProperty('water', 'fill-color', '#f0f8e8')
      map.setPaintProperty('landcover', 'fill-color', '#f8f8f2')
      map.setPaintProperty('national-park', 'fill-color', '#e8f5e8')
      map.setPaintProperty('national-park', 'fill-opacity', 0.4)
      map.setPaintProperty('boundary', 'line-color', '#92400e')
      map.setPaintProperty('boundary', 'line-opacity', 0.3)
      
      // Remove modern UI for vintage explorer feel
      map.setLayoutProperty('road-label', 'visibility', 'none')
      map.setLayoutProperty('place-label', 'visibility', 'none')
      map.setLayoutProperty('poi-label', 'visibility', 'none')
      map.setLayoutProperty('road', 'visibility', 'none')
      map.setLayoutProperty('building', 'visibility', 'none')
    })
  }
  
  // Initial call to set starting state
  handleScroll()
})

onUnmounted(() => {
  // Clean up
  window.removeEventListener('scroll', handleScroll)
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
/* Parallax section styling */
.field-guide-section {
  will-change: transform, opacity;
  transition: transform 0.3s ease-out, opacity 0.5s ease-out;
}

/* Location marker styles */
.location-marker {
  transition: all 0.3s ease;
  cursor: pointer;
}

.marker-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
}

.location-marker:hover .marker-icon {
  transform: scale(1.2);
  filter: drop-shadow(0 4px 8px rgba(146, 64, 14, 0.4));
}

.marker-label {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-family: 'Poppins', sans-serif;
  color: #36454f;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(4px);
}

.location-marker:hover .marker-label {
  opacity: 1;
}

/* Migration route animation */
.migration-route {
  animation: migrate 15s ease-in-out infinite;
  stroke-dashoffset: 0;
}

@keyframes migrate {
  0% {
    stroke-dashoffset: 0;
    opacity: 0.3;
  }
  50% {
    stroke-dashoffset: -100;
    opacity: 0.8;
  }
  100% {
    stroke-dashoffset: -200;
    opacity: 0.3;
  }
}

/* Animal marker colors */
.elephant-marker { color: #92400e; }
.giraffe-marker { color: #f4a460; }
.rhino-marker { color: #6b7280; }
.lion-marker { color: #dc2626; }
.leopard-marker { color: #fbbf24; }

/* Info panel styling */
.bg-white\/95 {
  background: rgba(255, 255, 255, 0.95);
}

.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .marker-icon {
    width: 2rem;
    height: 2rem;
  }
  
  .marker-label {
    font-size: 8px;
  }
}
</style>
