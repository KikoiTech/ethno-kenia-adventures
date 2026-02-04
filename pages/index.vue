<template>
  <!-- 
    SECTION: Hero
    ASSET: /videos/sunrise.mp4
    
    TECHNIQUE: "The Zero-Gravity Stack"
    
    1. Grid Layout: Locks both layers to the same coordinate space.
    2. Layer 1 (Mask): Dark Gray background with Multiply blend. 
       - H1 is pure white (transparent window).
    3. Layer 2 (Content): 
       - Contains a "Ghost H1" that is the exact same size as the real one.
       - Subtext & Button are positioned ABSOLUTELY below the Ghost.
       - This prevents the Flexbox centering logic from shifting the text up.
  -->
  <section class="relative h-screen w-full overflow-hidden bg-black grid place-items-center">
    
    <!-- 
      LAYER 0: The Source Video
      - Plays behind everything.
    -->
    <video 
      autoplay 
      loop 
      muted 
      playsinline 
      class="absolute inset-0 w-full h-full object-cover z-0"
    >
      <source src="/videos/hero-background.mp4" type="video/mp4">
    </video>

    <!-- 
      LAYER 1: The Atmosphere & Mask (Z-10)
      - bg-neutral-900: Dark enough to hide the video, but lets it shine through faintly (Atmosphere).
      - mix-blend-multiply: The key to the effect.
    -->
    <div class="z-10 w-full h-full bg-neutral-900 mix-blend-multiply flex flex-col items-center justify-center px-4 col-start-1 row-start-1">
      <h1 class="text-white text-6xl md:text-8xl lg:text-9xl font-serif font-bold uppercase tracking-wider text-center leading-tight">
        HERITAGE
      </h1>
    </div>

    <!-- 
      LAYER 2: The Solid Content (Z-20)
      - Sits on top. 
      - Logic: "Center the Ghost H1, then hang the rest below it."
    -->
    <div class="z-20 w-full h-full flex flex-col items-center justify-center px-4 pointer-events-none col-start-1 row-start-1">
      
      <!-- 
        The Anchor (Ghost Headline)
        - We wrap this in a relative div.
        - Flexbox centers THIS wrapper perfectly in the middle of the screen.
        - Because it has no other flow content, it aligns 1:1 with Layer 1.
      -->
      <div class="relative">
        <!-- Invisible H1 creates the correct width/height -->
        <h1 class="text-transparent text-6xl md:text-8xl lg:text-9xl font-serif font-bold uppercase tracking-wider text-center leading-tight select-none">
          HERITAGE
        </h1>

        <!-- 
          The "Hanging" Content
          - Positioned absolute `top-full`. 
          - This means "start exactly at the bottom of the H1".
          - `left-0 w-full`: Ensures it stays centered horizontally relative to the H1.
        -->
        <div class="absolute top-full left-0 w-full flex flex-col items-center pt-2 md:pt-4">
          
          <!-- Subtext -->
          <p class="text-brand-off-white text-lg md:text-xl font-sans max-w-lg mx-auto text-center pointer-events-auto font-light tracking-wide whitespace-nowrap md:whitespace-normal">
            Bespoke journeys into the heart of the wild.
          </p>

          <!-- Button -->
          <a 
            href="/safari-packages" 
            class="inline-block mt-8 bg-brand-terracotta text-white font-sans font-medium py-3 px-10 rounded-full 
                   hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg pointer-events-auto"
          >
            Explore Our Safaris
          </a>
        </div>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">
// Logic is visual only.
</script>