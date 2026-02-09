<template>
  <div class="itinerary-timeline">
    <!-- Timeline Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-serif text-brand-charcoal mb-4">
        Day-by-Day Adventure
      </h2>
      <p class="text-brand-charcoal/80 max-w-2xl mx-auto">
        Follow your journey through Kenya's most spectacular landscapes and wildlife encounters
      </p>
    </div>

    <!-- Timeline Container -->
    <div class="relative">
      <!-- Timeline Line -->
      <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-terracotta/20 transform -translate-x-1/2"></div>
      
      <!-- Timeline Items -->
      <div class="space-y-12">
        <div 
          v-for="(day, index) in itinerary" 
          :key="day.day"
          class="relative timeline-item"
          :class="{ 'md:flex-row-reverse': index % 2 === 1 }"
        >
          <!-- Timeline Dot -->
          <div class="absolute left-8 md:left-1/2 top-8 w-4 h-4 bg-brand-terracotta rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10">
            <div class="absolute inset-0 bg-brand-terracotta rounded-full animate-ping"></div>
          </div>

          <!-- Day Content -->
          <div class="flex flex-col md:flex-row items-center gap-8">
            <!-- Day Number Card -->
            <div class="flex-shrink-0 w-16 h-16 bg-brand-terracotta text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
              {{ day.day }}
            </div>

            <!-- Content Card -->
            <div class="flex-1 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-brand-charcoal/10">
              <!-- Day Title -->
              <h3 class="text-xl font-serif text-brand-charcoal font-bold mb-3">
                {{ getText(day.title, language) }}
              </h3>

              <!-- Day Description -->
              <p class="text-brand-charcoal/80 mb-6 leading-relaxed">
                {{ getText(day.description, language) }}
              </p>

              <!-- Activities -->
              <div v-if="showActivities && day.activities.length > 0" class="mb-6">
                <h4 class="text-sm font-semibold text-brand-charcoal/70 mb-3 uppercase tracking-wide">Activities</h4>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="(activity, activityIndex) in day.activities" 
                    :key="`activity-${day.day}-${activityIndex}`"
                    class="px-3 py-1 bg-brand-off-white rounded-full text-sm text-brand-charcoal/80"
                  >
                    {{ getText(activity, language) }}
                  </span>
                </div>
              </div>

              <!-- Meals -->
              <div v-if="day.meals.length > 0" class="mb-6">
                <h4 class="text-sm font-semibold text-brand-charcoal/70 mb-3 uppercase tracking-wide">Meals</h4>
                <div class="flex items-center space-x-4">
                  <div 
                    v-for="meal in day.meals" 
                    :key="meal"
                    class="flex items-center text-brand-charcoal/70"
                  >
                    <component :is="getMealIconComponent(meal)" class="w-4 h-4 mr-1" />
                    <span class="text-sm capitalize">{{ meal }}</span>
                  </div>
                </div>
              </div>

              <!-- Accommodation -->
              <div v-if="showAccommodation && day.accommodation">
                <h4 class="text-sm font-semibold text-brand-charcoal/70 mb-3 uppercase tracking-wide">Accommodation</h4>
                <div class="flex items-center text-brand-charcoal/80">
                  <svg class="w-4 h-4 mr-2 text-brand-terracotta" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                  </svg>
                  <span>{{ getText(day.accommodation, language) }}</span>
                </div>
              </div>

              <!-- Location -->
              <div v-if="day.location" class="mt-4 pt-4 border-t border-brand-charcoal/10">
                <div class="flex items-center text-brand-charcoal/60 text-sm">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l4.95-4.95a7 7 0 11-9.9-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                  <span>{{ day.location }}</span>
                </div>
              </div>

              <!-- Notes -->
              <div v-if="day.notes" class="mt-4 p-4 bg-brand-off-white/50 rounded-lg">
                <div class="text-sm text-brand-charcoal/70">
                  <svg class="w-4 h-4 inline mr-1 text-brand-terracotta" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                  </svg>
                  {{ getText(day.notes, language) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline Summary -->
    <div class="mt-16 text-center">
      <div class="inline-flex items-center px-6 py-3 bg-brand-terracotta/10 rounded-full">
        <svg class="w-5 h-5 mr-2 text-brand-terracotta" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.5H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd"/>
        </svg>
        <span class="text-brand-charcoal font-medium">
          {{ itinerary.length }} days of unforgettable adventure
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ItineraryDay } from '~/types/safari-package'
import { getText } from '~/utils/translation-api'
import { h } from 'vue'

interface Props {
  itinerary: ItineraryDay[]
  language?: string
  showAccommodation?: boolean
  showActivities?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  language: 'en',
  showAccommodation: true,
  showActivities: true
})

// Meal icon components
const BreakfastIcon = () => h('svg', {
  class: 'w-4 h-4',
  fill: 'currentColor',
  viewBox: '0 0 20 20'
}, [
  h('path', { d: 'M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z' })
])

const LunchIcon = () => h('svg', {
  class: 'w-4 h-4',
  fill: 'currentColor',
  viewBox: '0 0 20 20'
}, [
  h('path', { d: 'M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM2 12a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2z' })
])

const DinnerIcon = () => h('svg', {
  class: 'w-4 h-4',
  fill: 'currentColor',
  viewBox: '0 0 20 20'
}, [
  h('path', { d: 'M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V3a1 1 0 011-1h0zM7.821 7.8l1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 016 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05L4.78 7.8l1.233-.616a1 1 0 01.894-1.79l-1.599.8L7.821 7.8z' })
])

// Methods
const getMealIconComponent = (meal: string) => {
  switch (meal) {
    case 'breakfast':
      return BreakfastIcon
    case 'lunch':
      return LunchIcon
    case 'dinner':
      return DinnerIcon
    default:
      return BreakfastIcon
  }
}
</script>

<style scoped>
.itinerary-timeline {
  position: relative;
}

.timeline-item {
  opacity: 0;
  animation: fadeInUp 0.6s ease-out forwards;
}

.timeline-item:nth-child(1) { animation-delay: 0.1s; }
.timeline-item:nth-child(2) { animation-delay: 0.2s; }
.timeline-item:nth-child(3) { animation-delay: 0.3s; }
.timeline-item:nth-child(4) { animation-delay: 0.4s; }
.timeline-item:nth-child(5) { animation-delay: 0.5s; }
.timeline-item:nth-child(6) { animation-delay: 0.6s; }
.timeline-item:nth-child(7) { animation-delay: 0.7s; }
.timeline-item:nth-child(n+8) { animation-delay: 0.8s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Timeline dot animation */
.timeline-item .absolute .animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Hover effects */
.timeline-item .bg-white {
  transition: all 0.3s ease;
}

.timeline-item:hover .bg-white {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .timeline-item {
    padding-left: 4rem;
  }
  
  .timeline-item .absolute {
    left: 2rem;
  }
}

/* Activity tags hover */
.timeline-item .bg-brand-off-white {
  transition: all 0.2s ease;
}

.timeline-item .bg-brand-off-white:hover {
  background-color: rgba(254, 243, 199, 0.8);
  transform: scale(1.05);
}

/* Smooth transitions for all interactive elements */
.itinerary-timeline * {
  transition-property: transform, box-shadow, background-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

/* Focus styles for accessibility */
.timeline-item:focus-within {
  outline: 2px solid #ea580c;
  outline-offset: 2px;
  border-radius: 0.5rem;
}

/* Loading skeleton for dynamic content */
.timeline-item.loading .bg-white {
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
