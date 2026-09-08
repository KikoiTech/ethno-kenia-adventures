<template>
  <div class="relative bottom-[75px] px-6">
    <div class="max-w-[1400px] mx-auto bg-brand-off-white shadow-2xl grid grid-cols-1 lg:grid-cols-[minmax(0,460px)_minmax(0,279px)_minmax(0,279px)_minmax(0,279px)] min-[1315px]:grid-cols-[minmax(0,614px)_minmax(0,279px)_minmax(0,279px)_1fr] lg:grid-rows-[140px_95px] min-[1315px]:grid-rows-none items-stretch min-[1315px]:h-[180px]">

      <!-- Editorial label + heading -->
      <div class="px-6 py-8 lg:p-[34px] lg:col-start-1 lg:row-start-1 lg:col-span-2 min-[1315px]:col-auto min-[1315px]:row-auto flex flex-col justify-center">
        <p class="text-[11px] uppercase tracking-[0.2em] text-brand-terracotta font-sans mb-[18px]">Tell Us Your Mood</p>
        <p class="font-serif text-[36px] md:text-[43px] text-brand-charcoal">Craft Your Safari</p>
      </div>

      <!-- Where -->
      <div class="py-[26px] px-[24px] border-t lg:border-t-0 lg:border-l border-brand-charcoal/10 lg:col-start-3 lg:row-start-1 min-[1315px]:col-auto min-[1315px]:row-auto flex flex-col justify-center">
        <label class="block text-[11px] uppercase tracking-[0.15em] text-brand-charcoal/60 font-sans mb-[18px]">Where</label>
        <div class="relative">
          <select
            v-model="selectedCountry"
            class="w-full bg-transparent font-serif text-lg text-brand-charcoal pr-8 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="Kenya">Kenya</option>
            <option value="tanzania">Tanzania</option>
            <option value="uganda">Uganda</option>
            <option value="rwanda">Rwanda</option>
          </select>
          <svg class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/60 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>

      <!-- How Long -->
      <div class="py-[26px] px-[24px] border-t lg:border-t-0 lg:border-l border-brand-charcoal/10 lg:col-start-4 lg:row-start-1 min-[1315px]:col-auto min-[1315px]:row-auto flex flex-col justify-center">
        <label class="block text-[11px] uppercase tracking-[0.15em] text-brand-charcoal/60 font-sans mb-[18px]">How Long</label>
        <div class="relative">
          <select
            v-model="selectedDuration"
            class="w-full bg-transparent font-serif text-lg text-brand-charcoal pr-8 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="3-5">3–5 Days</option>
            <option value="6-8">6–8 Days</option>
            <option value="9-12">9–12 Days</option>
            <option value="13-99">13+ Days</option>
          </select>
          <svg class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-charcoal/60 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>

      <!-- Submit -->
      <Button
        variant="brand"
        class="h-auto rounded-none px-10 py-6 min-[1315px]:py-0 text-[11px] w-full min-[1315px]:w-auto lg:col-start-1 lg:row-start-2 min-[1315px]:col-auto min-[1315px]:row-auto"
        @click="handleSubmit"
      >
        Reveal My Safari
      </Button>
    </div>

    <!-- Trust Signals -->
    <div class="max-w-[1400px] mx-auto sm:w-fit grid grid-cols-1 sm:grid-cols-[auto_auto_auto] divide-y sm:divide-y-0 sm:divide-x divide-brand-charcoal/10 mt-10">
      <div class="py-6 sm:pr-8 flex flex-col justify-center">
        <p class="text-[9px] uppercase tracking-[0.2em] text-brand-terracotta font-sans mb-2">Independent Reviews</p>
        <p class="font-sans text-[13px] text-brand-charcoal/60 leading-relaxed">Trusted by thousands of travellers who came to Africa with us.</p>
      </div>

      <a
        href="https://www.safaribookings.com/reviews/p7970"
        target="_blank"
        rel="nofollow"
        class="py-6 sm:px-8 sm:border-t sm:border-brand-charcoal/10 flex items-center gap-4 hover:opacity-80 transition-opacity"
      >
        <PawPrint class="w-8 h-8 text-brand-charcoal/70 flex-shrink-0" :stroke-width="1.5" />
        <div class="flex items-baseline gap-1">
          <span class="font-serif text-3xl text-brand-terracotta">5.0</span>
          <span class="font-serif text-lg text-brand-charcoal/40">/5</span>
        </div>
        <div class="flex flex-col">
          <span class="text-[9px] uppercase tracking-[0.1em] text-brand-charcoal font-sans font-semibold">SafariBookings</span>
          <span class="text-[9px] uppercase tracking-[0.1em] text-brand-charcoal/50 font-sans">669 Reviews</span>
        </div>
      </a>

      <a
        href="https://www.tripadvisor.com/Attraction_Review-g294207-d34257797-Reviews-Ethno_Kenia_Adventure-Nairobi.html"
        target="_blank"
        rel="noopener noreferrer"
        class="py-6 sm:pl-8 sm:border-t sm:border-brand-charcoal/10 flex items-center gap-4 hover:opacity-80 transition-opacity"
      >
        <Binoculars class="w-8 h-8 text-brand-charcoal/70 flex-shrink-0" :stroke-width="1.5" />
        <div class="flex items-baseline gap-1">
          <span class="font-serif text-3xl text-brand-terracotta">5.0</span>
          <span class="font-serif text-lg text-brand-charcoal/40">/5</span>
        </div>
        <div class="flex flex-col">
          <span class="text-[9px] uppercase tracking-[0.1em] text-brand-charcoal font-sans font-semibold">TripAdvisor</span>
          <span class="text-[9px] uppercase tracking-[0.1em] text-brand-charcoal/50 font-sans">921 Reviews</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { PawPrint, Binoculars } from 'lucide-vue-next'

const router = useRouter()

const selectedCountry = ref('Kenya')
const selectedDuration = ref('3-5')

const handleSubmit = () => {
  const query: Record<string, string> = {}
  if (selectedCountry.value) query.country = selectedCountry.value
  if (selectedDuration.value) query.duration = selectedDuration.value

  router.push({ path: '/safari-packages', query })
}
</script>
