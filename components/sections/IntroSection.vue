<template>
  <section 
    ref="manifestoSection"
    class="relative bg-brand-off-white py-24 md:py-32 overflow-x-hidden transition-all duration-700 ease-out"
    :style="sectionStyle"
  >
    <!-- Papyrus Texture Overlay (Optimized SVG) -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
         style="background-image: url('data:image/svg+xml;base64,...');">
    </div>

    <div class="container mx-auto px-6 relative">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        <!-- Left Column: Content -->
        <div class="relative z-10">
          <h2 class="text-4xl md:text-5xl lg:text-7xl font-serif leading-tight mb-8 text-brand-charcoal">
            A Deeper <span class="italic text-brand-terracotta">Connection</span>
          </h2>
          
          <div class="space-y-6 text-brand-charcoal/80 max-w-xl">
            <p class="font-sans text-lg lg:text-xl leading-relaxed font-light">
              We believe a safari is more than a holiday; it's a reconnection with the wild soul that resides within each of us.
            </p>
            <p class="font-sans text-lg lg:text-xl leading-relaxed font-light">
              Our journeys are crafted where luxury meets wilderness, where you meet your truest self.
            </p>
          </div>
        </div>
        
        <!-- Right Column: Optimized Vintage TV -->
        <div class="relative">
          <div class="relative bg-brand-charcoal rounded-lg shadow-2xl overflow-hidden group">
            
            <!-- TV Screen Content -->
            <div class="relative w-full h-80 md:h-96 lg:h-[400px] overflow-hidden">
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

              <!-- Glitch & Static Overlays (Only active when section is visible) -->
              <div v-if="isVisible" class="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen bg-[url('/images/static-noise.png')]"></div>
              
              <!-- Channel Controls -->
              <div class="absolute top-4 right-4 flex flex-col space-y-2 z-20">
                <button @click="nextChannel" class="tv-btn">▲</button>
                <div class="text-center text-white">
                  <div class="text-[10px] uppercase opacity-60">CH</div>
                  <div class="text-lg font-serif">{{ currentChannel }}</div>
                </div>
                <button @click="prevChannel" class="tv-btn">▼</button>
              </div>
            </div>
          </div>
          <!-- TV Base -->
          <div class="mt-4 bg-brand-charcoal/20 h-2 w-3/4 mx-auto rounded-full blur-sm"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Channel {
  id: number;
  name: string;
  video: string;
  poster: string;
}

const manifestoSection = ref<HTMLElement | null>(null)
const videoPlayer = ref<HTMLVideoElement | null>(null)
const isVisible = ref(false)
const scrollProgress = ref(0)

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

const currentChannel = ref(1)
const currentChannelData = computed((): Channel => {
  const found = channels.find(c => c.id === currentChannel.value)
  // If not found, return the first channel as a default
  return found || channels[0]! 
})

const nextChannel = () => currentChannel.value = currentChannel.value === channels.length ? 1 : currentChannel.value + 1
const prevChannel = () => currentChannel.value = currentChannel.value === 1 ? channels.length : currentChannel.value - 1

// Optimized Scroll Logic
const sectionStyle = computed(() => ({
  opacity: scrollProgress.value,
  transform: `translateY(${(1 - scrollProgress.value) * 30}px)`
}))

const handleScroll = () => {
  const section = manifestoSection.value
  if (!section) return
  
  const rect = section.getBoundingClientRect()
  const windowHeight = window.innerHeight
  
  // Calculate progress only when section is in view
  if (rect.top < windowHeight && rect.bottom > 0) {
    const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.8)))
    scrollProgress.value = progress
    isVisible.value = true
    
    // Auto-pause video if user scrolls past to save CPU
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
.tv-btn {
  @apply w-8 h-8 bg-brand-charcoal/80 text-white rounded-full flex items-center justify-center text-xs transition-transform hover:scale-110 active:scale-95;
}

/* Optimize Video Rendering */
video {
  will-change: opacity;
  background: #1a1a1a; /* TV screen background while loading */
}
</style>