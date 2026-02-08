<template>
  <!-- 
    SECTION: The Testimonials
    PURPOSE: Build trust through authentic social proof with magazine-style features
    VISUALS: Brand-off-white with papyrus texture, sophisticated slider
    LAYOUT: Large emotive portraits with elegant overlay typography
  -->
  <section class="relative bg-brand-off-white py-20 md:py-32 overflow-hidden">
    <!-- Papyrus texture overlay -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
         style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9InBhcHlydXMiPgogICAgICA8ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii45IiBudW1PY3RhdmVzPSI0IiBzZWVkPSI1Ii8+CiAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjcGFweXJ1cyIgb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg==');">
    </div>

    <div class="container mx-auto px-6 relative">
      
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight mb-4 text-brand-charcoal">
          Voices of the Wild
        </h2>
        <p class="text-lg md:text-xl font-sans font-light text-brand-charcoal/80 max-w-2xl mx-auto">
          Stories from those who have walked the ancient paths and felt the spirit of Kenya
        </p>
      </div>

      <!-- Testimonials Slider -->
      <div class="relative max-w-5xl mx-auto">
        <!-- Main Testimonial Display -->
        <div class="relative h-96 md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl">
          
          <!-- Testimonial Background Image -->
          <div class="absolute inset-0">
            <img 
              :src="testimonials[currentTestimonial].image"
              :alt="testimonials[currentTestimonial].name"
              class="w-full h-full object-cover"
            >
            <!-- Dark overlay for text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-brand-charcoal/30 to-transparent"></div>
          </div>

          <!-- Testimonial Content Overlay -->
          <div class="absolute inset-0 flex items-center justify-center p-8 md:p-12">
            <div class="text-center text-brand-off-white max-w-4xl mx-auto">
              
              <!-- Quote Icon -->
              <div class="mb-8">
                <svg viewBox="0 0 60 60" class="w-12 h-12 md:w-16 md:h-16 mx-auto opacity-60">
                  <path d="M30,10 C20,10 10,20 10,30 C10,35 15,40 20,40 C25,40 30,35 30,30 C30,25 25,20 20,20 C15,20 10,25 10,30 M50,10 C40,10 30,20 30,30 C30,35 35,40 40,40 C45,40 50,35 50,30 C50,25 45,20 40,20 C35,20 30,25 30,30" 
                        stroke="currentColor" stroke-width="2" fill="none" opacity="0.8"/>
                </svg>
              </div>

              <!-- Large Quote Text -->
              <blockquote class="text-2xl md:text-3xl lg:text-4xl font-serif leading-relaxed mb-8">
                "{{ testimonials[currentTestimonial].quote }}"
              </blockquote>

              <!-- Author Information -->
              <div class="space-y-2">
                <p class="text-lg md:text-xl font-sans font-medium">
                  {{ testimonials[currentTestimonial].name }}
                </p>
                <p class="text-sm md:text-base font-sans opacity-80">
                  {{ testimonials[currentTestimonial].location }}
                </p>
              </div>

              <!-- Safari Details -->
              <div class="mt-6 inline-flex items-center space-x-2 text-sm font-sans opacity-70">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4H6a2 2 0 100 4h2a1 1 0 100 2 2 2 0 002-2V5a2 2 0 00-2-2H6z" clip-rule="evenodd"/>
                </svg>
                <span>{{ testimonials[currentTestimonial].safari }}</span>
              </div>
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button 
            @click="previousTestimonial"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-brand-charcoal/80 hover:bg-brand-charcoal text-brand-off-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <button 
            @click="nextTestimonial"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-brand-charcoal/80 hover:bg-brand-charcoal text-brand-off-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        <!-- Testimonial Indicators -->
        <div class="flex justify-center space-x-2 mt-8">
          <button 
            v-for="(testimonial, index) in testimonials"
            :key="index"
            @click="currentTestimonial = index"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="currentTestimonial === index 
              ? 'bg-brand-terracotta w-8' 
              : 'bg-brand-charcoal/30 hover:bg-brand-charcoal/50'"
          >
          </button>
        </div>

        <!-- Thumbnail Navigation -->
        <div class="grid grid-cols-3 md:grid-cols-5 gap-4 mt-8">
          <button 
            v-for="(testimonial, index) in testimonials"
            :key="index"
            @click="currentTestimonial = index"
            class="relative group overflow-hidden rounded-lg transition-all duration-300 hover:scale-105"
            :class="currentTestimonial === index ? 'ring-2 ring-brand-terracotta' : ''"
          >
            <img 
              :src="testimonial.thumbnail"
              :alt="testimonial.name"
              class="w-full h-20 md:h-24 object-cover transition-all duration-300 group-hover:scale-110"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="mt-16 text-center">
        <div class="bg-brand-charcoal/5 rounded-lg p-8 max-w-4xl mx-auto">
          <h3 class="text-2xl md:text-3xl font-serif mb-4 text-brand-charcoal">
            Your Story Awaits
          </h3>
          <p class="text-lg font-sans text-brand-charcoal/80 mb-6">
            Join the adventurers who have discovered the magic of Kenya's wilderness. Create memories that will last a lifetime.
          </p>
          <a 
            href="#" 
            class="inline-flex items-center justify-center px-8 py-4 bg-brand-terracotta text-brand-off-white font-sans font-medium rounded-full transition-all duration-300 hover:bg-brand-terracotta/90 hover:scale-105"
          >
            <span>Begin Your Journey</span>
            <svg class="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5 5-5M13 17l5 5-5"/>
            </svg>
          </a>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTestimonial = ref(0)

// Testimonials data with authentic safari experiences
const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'London, United Kingdom',
    safari: '7-Day Maasai Mara Adventure',
    quote: 'Watching the sunrise over the savanna, with elephants moving silently in the distance, I felt connected to something ancient and profound. Kenya doesn\'t just show you wildlife; it reminds you of your place in the natural world.',
    image: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    thumbnail: 'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
  },
  {
    name: 'James Chen',
    location: 'San Francisco, USA',
    safari: '10-Day Kenya Explorer',
    quote: 'The guides\' knowledge of the land and its creatures is extraordinary. We tracked lions on foot and sat around the campfire under stars so bright they felt close enough to touch. This wasn\'t just a vacation; it was an education in wonder.',
    image: 'https://images.pexels.com/photos/2387416/pexels-photo-2387416.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    thumbnail: 'https://images.pexels.com/photos/2387416/pexels-photo-2387416.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
  },
  {
    name: 'Amara Okonkwo',
    location: 'Lagos, Nigeria',
    safari: '5-Day Amboseli Luxury Safari',
    quote: 'As an African visiting another African country, I was moved by the warmth of the Kenyan people and the majesty of Mount Kilimanjaro backdrop. The giraffes walking against that sunrise - that image stays with me always.',
    image: 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    thumbnail: 'https://images.pexels.com/photos/15286/pexels-photo-15286.jpg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
  },
  {
    name: 'Michael & Emma Thompson',
    location: 'Sydney, Australia',
    safari: '14-Day Honeymoon Safari',
    quote: 'We chose Kenya for our honeymoon, seeking adventure beyond beaches. What we found was magic - hot air balloons over wildebeest migrations, private bush dinners, and the sound of lions calling at night. Perfect doesn\'t begin to describe it.',
    image: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    thumbnail: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
  },
  {
    name: 'David Rodriguez',
    location: 'Madrid, Spain',
    safari: 'Conservation Experience Safari',
    quote: 'Working alongside rangers to track rhinos, learning about conservation efforts, and seeing black rhinos in their natural habitat - this trip changed how I see our responsibility to protect these magnificent creatures.',
    image: 'https://images.pexels.com/photos/1442368/pexels-photo-1442368.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=2',
    thumbnail: 'https://images.pexels.com/photos/1442368/pexels-photo-1442368.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
  }
]

// Navigation functions
const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length
}

const previousTestimonial = () => {
  currentTestimonial.value = currentTestimonial.value === 0 
    ? testimonials.length - 1 
    : currentTestimonial.value - 1
}

// Auto-rotate testimonials
let interval: NodeJS.Timeout | null = null

onMounted(() => {
  // Auto-rotate every 8 seconds
  interval = setInterval(nextTestimonial, 8000)
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>

<style scoped>
/* Testimonial slider transitions */
.testimonial-transition {
  transition: all 0.6s ease-in-out;
}

/* Indicator animation */
.testimonial-indicator {
  transition: all 0.3s ease;
}

/* Thumbnail hover effects */
.thumbnail-hover {
  transition: all 0.3s ease;
}

/* Custom quote icon styling */
blockquote {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Button hover effects */
.nav-button {
  transition: all 0.3s ease;
}

.nav-button:hover {
  transform: scale(1.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  blockquote {
    font-size: 1.5rem;
    line-height: 1.6;
  }
  
  .testimonial-image {
    height: 24rem;
  }
}

/* Smooth image transitions */
img {
  transition: transform 0.3s ease;
}

/* Focus states for accessibility */
button:focus {
  outline: 2px solid #92400e;
  outline-offset: 2px;
}
</style>
