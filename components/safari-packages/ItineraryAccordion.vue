<template>
  <div class="itinerary-accordion space-y-4">
    <div 
      v-for="(item, index) in itinerary" 
      :key="index" 
      class="border border-brand-charcoal/10 rounded-xl overflow-hidden bg-white"
    >
      <button 
        @click="toggle(index)"
        class="w-full flex items-center justify-between p-6 text-left hover:bg-brand-off-white transition-colors"
      >
        <div class="flex items-center gap-6">
          <!-- Timeline Dot & Vertical Line Connection (Conceptual) -->
          <div class="relative flex flex-col items-center">
            <div class="w-4 h-4 rounded-full bg-brand-terracotta z-10"></div>
            <div v-if="index !== itinerary.length - 1" class="absolute top-4 w-px h-24 border-l border-dashed border-brand-terracotta opacity-30"></div>
          </div>
          
          <div class="flex flex-col">
            <span class="text-xs font-bold uppercase tracking-widest text-brand-terracotta">
              {{ item.time || `Day ${index + 1}` }}
            </span>
            <h4 class="text-xl font-serif text-brand-charcoal">{{ item.title }}</h4>
          </div>
        </div>
        
        <span 
          class="transform transition-transform duration-300"
          :class="{ 'rotate-180': openItems.includes(index) }"
        >
          <svg class="w-6 h-6 text-brand-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div 
        v-show="openItems.includes(index)"
        class="px-6 pb-6 pl-16 animate-fade-down"
      >
        <p class="text-brand-charcoal/80 leading-relaxed font-sans mb-4">
          {{ item.details }}
        </p>
        
        <div v-if="item.activities && item.activities.length" class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="act in item.activities" 
            :key="act"
            class="px-3 py-1 bg-brand-terracotta/5 text-brand-terracotta text-xs font-medium rounded-full"
          >
            {{ act }}
          </span>
        </div>

        <div v-if="item.wildlife && item.wildlife.length" class="bg-brand-off-white/50 p-4 rounded-lg">
          <span class="text-xs font-bold uppercase tracking-widest text-brand-charcoal/40 block mb-2">Wildlife to Spot</span>
          <div class="flex flex-wrap gap-4 text-sm text-brand-charcoal/70">
            <span v-for="w in item.wildlife" :key="w" class="flex items-center gap-1">
              • {{ w }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ItineraryItem {
  time?: string
  title: string
  details: string
  activities?: string[]
  wildlife?: string[]
  icon?: string
}

interface Props {
  itinerary: ItineraryItem[]
}

const props = defineProps<Props>()

// Default the first item to "Open"
const openItems = ref<number[]>([0])

const toggle = (index: number) => {
  if (openItems.value.includes(index)) {
    openItems.value = openItems.value.filter(i => i !== index)
  } else {
    openItems.value.push(index)
  }
}
</script>

<style scoped>
@keyframes fade-down {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-down {
  animation: fade-down 0.3s ease-out forwards;
}
</style>
