<template>
  <section
    ref="manifestoSection"
    class="relative -mt-[75px] bg-brand-sand py-[125px] px-12 overflow-x-hidden"
  >
    <!-- Papyrus Texture Overlay (Optimized SVG) -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
         style="background-image: url('data:image/svg+xml;base64,...');">
    </div>

    <div class="container mx-auto max-w-[1400px] relative">
      <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,485px)_1fr] gap-10 lg:gap-16 xl:gap-20 items-start">

        <!-- Left Column: Portrait Media -->
        <div class="relative">
          <div class="relative w-full max-w-[420px] sm:max-w-[485px] mx-auto lg:mx-0 lg:max-w-none">

            <!-- Decorative Rectangle -->
            <div class="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-2/5 h-[42%] bg-brand-terracotta -z-10"></div>

            <!-- Portrait Media Box -->
            <div class="relative z-10 aspect-[3/4] overflow-hidden shadow-2xl bg-brand-charcoal">
              <video
                ref="videoPlayer"
                :src="currentChannelData.video"
                :poster="currentChannelData.poster"
                autoplay
                loop
                muted
                playsinline
                class="w-full h-full object-cover opacity-80"
              >
                <source :src="currentChannelData.video" type="video/mp4">
              </video>

              <!-- Caption Box -->
              <div class="absolute bottom-0 right-0 z-20 max-w-[75%] bg-brand-charcoal/90 px-4 py-3">
                <p class="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-brand-off-white">
                  {{ currentChannelData.name }}
                </p>
                <p class="text-[10px] font-sans text-brand-off-white/70 mt-0.5">
                  Kenya, filmed by Ethno Kenia
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Content -->
        <div class="relative z-10">
          <p class="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand-terracotta mb-4">
            The Ethno Kenia Difference
          </p>

          <h2 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight mb-8 text-brand-charcoal">
            A Deeper<br>
            <span class="italic text-brand-terracotta">Connection.</span>
          </h2>

          <div class="max-w-xl">
            <p class="font-sans text-lg lg:text-xl leading-relaxed font-light text-brand-charcoal/80 mb-6">
              We believe a safari is more than a holiday it's a reconnection with the wild soul that resides within each of us. It's an unhurried encounter with the wild, measured in moments rather than miles, that stays with you long after you're home.
            </p>
            <p class="font-sans text-sm md:text-base leading-relaxed text-brand-charcoal/60 mb-8">
              Our journeys are crafted where luxury meets wilderness, where you meet your truest self. We design each itinerary around your pace, your curiosity and the small discoveries that make a place feel like it was made for you.
            </p>

            <NuxtLink
              to="/about-us"
              class="inline-block text-xs md:text-sm font-bold uppercase tracking-wider text-brand-charcoal border-b border-brand-charcoal pb-1 hover:text-brand-terracotta hover:border-brand-terracotta transition-colors"
            >
              Meet The People Behind Your Journey
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Channel {
  id: number;
  name: string;
  video: string;
  poster: string;
}

const manifestoSection = ref<HTMLElement | null>(null)
const videoPlayer = ref<HTMLVideoElement | null>(null)
const isVisible = ref(false)

// TV Channels with Poster Images (CRITICAL FOR PERFORMANCE)
const channels: Channel[] = [
  { 
    id: 1, 
    name: 'Safari Channel', 
    // ADDED: q_auto,vc_auto for massive compression
    video: 'https://res.cloudinary.com/dmdihuyvn/video/upload/q_auto,vc_auto/v1771296955/hero-background_nzw28u.mp4', 
    // FIXED: Cleaned up the double 'image/upload' path
    poster: 'https://res.cloudinary.com/dmdihuyvn/image/upload/q_auto,f_auto,w_800/v1771297374/Screenshot_2026-02-17_060223_ynbxn7.png' 
  },
  { 
    id: 2, 
    name: 'Sunrise Channel', 
    // WARNING: Move this to Cloudinary too if it's large!
    video: 'https://res.cloudinary.com/dmdihuyvn/video/upload/q_auto,vc_auto/v1771296953/sunrise_wwlenj.mp4', 
    // FIXED: Removed leading / and cleaned URL
    poster: 'https://res.cloudinary.com/dmdihuyvn/image/upload/q_auto,f_auto,w_800/v1771297374/Screenshot_2026-02-17_060503_bvtxuo.png' 
  },
  { 
    id: 3, 
    name: 'Explorer Channel', 
    // WARNING: Local videos contribute to your 83MB problem
    video: 'https://res.cloudinary.com/dmdihuyvn/video/upload/q_auto,vc_auto/v1771296952/tourist_r317jl.mp4', 
    poster: 'https://res.cloudinary.com/dmdihuyvn/image/upload/q_auto,f_auto,w_800/v1771297374/Screenshot_2026-02-17_060559_vdhodj.png' 
  },
]

const currentChannelData = channels[0]!

const handleScroll = () => {
  const section = manifestoSection.value
  if (!section) return

  const rect = section.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // Play the video only while the section is in view, to save CPU
  if (rect.top < windowHeight && rect.bottom > 0) {
    isVisible.value = true
    if (videoPlayer.value) videoPlayer.value.play()
  } else {
    if (videoPlayer.value) videoPlayer.value.pause()
    isVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Optimize Video Rendering */
video {
  will-change: opacity;
  background: #1a1a1a; /* TV screen background while loading */
}
</style>