<template>
  <!-- 
    SECTION: The Manifesto
    PRINCIPLE: "A Deeper Connection" - Our brand's soul revealed
    AESTHETIC: First brand-off-white "page" emerging from the hero's darkness
              with subtle papyrus texture and asymmetrical, overlapping layout
  -->
  <section 
    ref="manifestoSection"
    class="relative bg-brand-off-white py-20 md:py-32 overflow-x-hidden manifesto-section"
  >
    <!-- 
      Papyrus Texture Overlay
      Creates tactile, organic feel on the brand-off-white canvas
    -->
    <div class="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
         style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9InBhcHlydXMiPgogICAgICA8ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii45IiBudW1PY3RhdmVzPSI0IiBzZWVkPSI1Ii8+CiAgICAgIDxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjcGFweXJ1cyIgb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg==');">
    </div>

    <div class="container mx-auto px-6 relative">
      
      <!-- 
        Dual-Column Layout: Left (Text) + Right (Vintage Explorer TV)
        - Business owner content on left
        - Animal lover experience on right
      -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        <!-- Left Column: Business Owner Content -->
        <div class="relative z-10">
          <h2 class="text-3xl md:text-4xl lg:text-6xl font-serif leading-tight mb-6 md:mb-8 text-brand-charcoal">
            A Deeper Connection
          </h2>
          
          <div class="space-y-4 md:space-y-6 text-brand-charcoal/80">
            <p class="font-sans text-base md:text-lg lg:text-xl leading-relaxed font-light">
              We believe a safari is more than a holiday; it's a reconnection with the wild soul that resides within each of us. It's the moment when the modern world fades away and ancient rhythms of the earth take over.
            </p>
            
            <p class="font-sans text-base md:text-lg lg:text-xl leading-relaxed font-light">
              Our journeys are crafted to honor this sacred connection, creating spaces where luxury meets wilderness, where comfort meets adventure, where you meet your truest self.
            </p>
            
            <p class="font-sans text-base md:text-lg lg:text-xl leading-relaxed font-light">
              This is where stories are born, not just told. Where silence speaks louder than words, and every sunset becomes a memory etched into your soul forever.
            </p>
          </div>
        </div>
        
        <!-- Right Column: Vintage Explorer TV -->
        <div class="relative">
          <!-- Vintage TV Frame -->
          <div class="relative bg-brand-charcoal rounded-lg shadow-2xl overflow-hidden">
            <!-- TV Screen Bezel -->
            <div class="absolute inset-0 border-8 border-brand-charcoal rounded-lg pointer-events-none z-10">
              <!-- TV Control Panel -->
              <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-brand-terracotta rounded-full animate-pulse"></div>
                  <div class="w-2 h-2 bg-brand-terracotta/60 rounded-full"></div>
                  <div class="w-2 h-2 bg-brand-terracotta/60 rounded-full"></div>
                </div>
                <div class="text-xs font-sans text-brand-off-white/60 uppercase tracking-wider">
                  Safari Channel
                </div>
              </div>
            </div>
            
            <!-- TV Screen Content -->
            <div class="relative w-full h-80 md:h-96 lg:h-[400px] overflow-hidden tv-screen">
              <!-- Wildlife Video Background -->
              <div class="absolute inset-0">
                <video 
                  :src="channels.find(c => c.id === currentChannel)?.video"
                  :key="currentChannel"
                  autoplay
                  loop
                  muted
                  playsinline
                  class="w-full h-full object-cover tv-video"
                ></video>
              </div>
              
              <!-- Glitch Layers -->
              <div class="glitch-layer glitch-red"></div>
              <div class="glitch-layer glitch-green"></div>
              <div class="glitch-layer glitch-blue"></div>
              
              <!-- Static Noise Overlay for Vintage Effect -->
              <div class="absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none"
                   style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgICAgPGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIuOSIgbnVtT2N0YXZlcz0iNCIgc2VlZD0iNSIvPgogICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4zIi8+Cjwvc3ZnPg==');">
              </div>
              
              <!-- Scan Lines Animation -->
              <div class="absolute inset-0 pointer-events-none">
                <div class="scanline"></div>
                <div class="scanline" style="animation-delay: 2s;"></div>
                <div class="scanline" style="animation-delay: 4s;"></div>
              </div>
              
              <!-- Random Glitch Overlays -->
              <div class="glitch-overlay"></div>
              <div class="static-burst"></div>
              
              <!-- Channel Controls -->
              <div class="absolute top-4 right-4 flex flex-col space-y-2 z-20">
                <button 
                  @click="prevChannel"
                  class="w-8 h-8 bg-brand-charcoal/80 hover:bg-brand-charcoal text-brand-off-white rounded-full flex items-center justify-center text-xs font-sans transition-all duration-200 hover:scale-110"
                >
                  ▲
                </button>
                <div class="text-center">
                  <div class="text-xs font-sans text-brand-off-white/80 mb-1">CH</div>
                  <div class="text-lg font-serif text-brand-off-white">{{ currentChannel }}</div>
                </div>
                <button 
                  @click="nextChannel"
                  class="w-8 h-8 bg-brand-charcoal/80 hover:bg-brand-charcoal text-brand-off-white rounded-full flex items-center justify-center text-xs font-sans transition-all duration-200 hover:scale-110"
                >
                  ▼
                </button>
              </div>
              
              <!-- Wildlife Content Overlay -->
              <div class="absolute inset-0 flex items-center justify-center p-8">
                <div class="text-center text-brand-off-white">
                  <!-- Animal Icon -->
                  <div class="mb-4">
                    <svg viewBox="0 0 80 80" class="w-16 h-16 md:w-20 md:h-20 animate-pulse">
                      <path d="M40,20 C30,20 20,30 20,40 C20,45 25,50 30,50 L50,50 C55,50 60,45 60,40 C60,30 50,20 40,20 Z" 
                            fill="#92400e" opacity="0.8"/>
                      <circle cx="40" cy="35" r="3" fill="#36454f"/>
                    </svg>
                  </div>
                  
                  <!-- Wildlife Message -->
                  <h3 class="text-lg md:text-xl font-serif mb-2">{{ channels.find(c => c.id === currentChannel)?.name }}</h3>
                  <p class="text-sm md:text-base font-sans font-light opacity-90">
                    Where ancient rhythms still echo across the savanna
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- TV Stand/Base -->
          <div class="mt-4 bg-brand-charcoal/80 h-4 rounded-lg"></div>
        </div>
        
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const manifestoSection = ref<HTMLElement>()

// TV Channel Management
const currentChannel = ref(1)
const channels = [
  { id: 1, name: 'Safari Channel', video: '/videos/hero-background.mp4' },
  { id: 2, name: 'Sunrise Channel', video: '/videos/sunrise.mp4' },
  { id: 3, name: 'Explorer Channel', video: '/videos/tourist.mp4' }
]

// Channel switching functions
const changeChannel = (channelId: number) => {
  currentChannel.value = channelId
  const video = document.querySelector('.tv-video') as HTMLVideoElement
  if (video) {
    video.src = channels.find(c => c.id === channelId)?.video || ''
    video.load()
    video.play()
  }
}

const nextChannel = () => {
  const nextId = currentChannel.value === 3 ? 1 : currentChannel.value + 1
  changeChannel(nextId)
}

const prevChannel = () => {
  const prevId = currentChannel.value === 1 ? 3 : currentChannel.value - 1
  changeChannel(prevId)
}

// Scroll-triggered animations for manifesto section - FIXED for smooth transition
const handleScroll = () => {
  if (!manifestoSection.value) return
  
  const scrolled = window.pageYOffset
  const sectionTop = manifestoSection.value.offsetTop
  const windowHeight = window.innerHeight
  
  // Calculate emergence based on when manifesto section enters viewport
  const scrollProgress = Math.max(0, Math.min(1, (scrolled - sectionTop + windowHeight * 0.8) / (windowHeight * 0.8)))
  
  // Apply emergence animation - more subtle now
  const translateY = (1 - scrollProgress) * 30 // Reduced from 50px
  const opacity = scrollProgress
  
  manifestoSection.value.style.transform = `translateY(${translateY}px)`
  manifestoSection.value.style.opacity = opacity.toString()
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  // Initial call to set starting state
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.manifesto-section {
  will-change: transform, opacity;
  transition: transform 0.3s ease-out, opacity 0.5s ease-out;
}

/* Vintage TV Scan Lines */
.scanline {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(146, 64, 14, 0.3), transparent);
  animation: scan 8s linear infinite;
}

@keyframes scan {
  0% { top: 0%; }
  100% { top: 100%; }
}

/* TV Screen Flicker Effect */
.tv-screen {
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0% { opacity: 0.97; }
  50% { opacity: 1; }
  100% { opacity: 0.98; }
}

/* Glitch Layers */
.glitch-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  mix-blend-mode: screen;
  opacity: 0;
  animation: glitch 3s infinite;
}

.glitch-red {
  animation-delay: 0s;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 0, 0, 0.1) 50%, transparent 70%);
}

.glitch-green {
  animation-delay: 1s;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 255, 0, 0.1) 50%, transparent 70%);
}

.glitch-blue {
  animation-delay: 2s;
  background: linear-gradient(45deg, transparent 30%, rgba(0, 0, 255, 0.1) 50%, transparent 70%);
}

@keyframes glitch {
  0%, 90%, 100% {
    opacity: 0;
    transform: translate(0, 0);
  }
  92% {
    opacity: 0.8;
    transform: translate(-2px, 2px);
  }
  94% {
    opacity: 0.6;
    transform: translate(2px, -2px);
  }
  96% {
    opacity: 0.4;
    transform: translate(-1px, 1px);
  }
}

/* Random Glitch Overlay */
.glitch-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(146, 64, 14, 0.03) 20%,
    transparent 40%,
    rgba(146, 64, 14, 0.03) 60%,
    transparent 80%,
    rgba(146, 64, 14, 0.03) 100%
  );
  animation: glitch-move 4s infinite;
  pointer-events: none;
}

@keyframes glitch-move {
  0%, 100% {
    transform: translateX(0);
    opacity: 0;
  }
  10% {
    transform: translateX(-5px);
    opacity: 1;
  }
  20% {
    transform: translateX(5px);
    opacity: 0.8;
  }
  30% {
    transform: translateX(-3px);
    opacity: 0.6;
  }
  40% {
    transform: translateX(3px);
    opacity: 0.4;
  }
  50% {
    transform: translateX(0);
    opacity: 0;
  }
}

/* Static Burst Effect */
.static-burst {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(146, 64, 14, 0.1) 2px,
      rgba(146, 64, 14, 0.1) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(146, 64, 14, 0.1) 2px,
      rgba(146, 64, 14, 0.1) 4px
    );
  opacity: 0;
  animation: static-burst 8s infinite;
  pointer-events: none;
}

@keyframes static-burst {
  0%, 85%, 100% {
    opacity: 0;
  }
  87% {
    opacity: 0.8;
  }
  89% {
    opacity: 0.6;
  }
  91% {
    opacity: 0.4;
  }
  93% {
    opacity: 0.2;
  }
}

/* Vintage TV Glow */
.tv-glow {
  box-shadow: 
    0 0 20px rgba(146, 64, 14, 0.3),
    0 0 40px rgba(146, 64, 14, 0.1),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
}

/* Responsive TV Sizing */
@media (max-width: 768px) {
  .tv-screen {
    height: 20rem;
  }
}

@media (min-width: 1024px) {
  .tv-screen {
    height: 25rem;
  }
}
</style>