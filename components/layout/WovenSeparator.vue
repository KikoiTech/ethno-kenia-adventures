<template>
  <!-- 
    COMPONENT: Woven Separator
    PRINCIPLE: African-inspired pattern that guides the user's journey
    AESTHETIC: Delicate, animated line pattern that "draws" itself across the screen
              as the user scrolls between sections
  -->
  <div class="relative w-full py-8 md:py-12 overflow-hidden">
    <!-- 
      Animated SVG Pattern
      - Creates the woven effect with geometric lines
      - Subtle animation on scroll/hover for engagement
    -->
    <svg 
      class="w-full h-12 md:h-16 opacity-60 transition-opacity duration-700 hover:opacity-100"
      viewBox="0 0 1200 64" 
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Define the pattern -->
      <defs>
        <pattern id="wovenPattern" x="0" y="0" width="120" height="32" patternUnits="userSpaceOnUse">
          <!-- Horizontal lines -->
          <line x1="0" y1="8" x2="120" y2="8" stroke="currentColor" stroke-width="1" opacity="0.6"/>
          <line x1="0" y1="24" x2="120" y2="24" stroke="currentColor" stroke-width="1" opacity="0.6"/>
          
          <!-- Diagonal weaving lines -->
          <line x1="0" y1="0" x2="30" y2="16" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>
          <line x1="30" y1="16" x2="60" y2="0" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>
          <line x1="60" y1="0" x2="90" y2="16" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>
          <line x1="90" y1="16" x2="120" y2="0" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>
          
          <line x1="0" y1="32" x2="30" y2="16" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>
          <line x1="30" y1="16" x2="60" y2="32" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>
          <line x1="60" y1="16" x2="90" y2="32" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>
          <line x1="90" y1="16" x2="120" y2="32" stroke="currentColor" stroke-width="1.5" opacity="0.8"/>
        </pattern>
      </defs>
      
      <!-- Apply the pattern -->
      <rect width="100%" height="100%" fill="url(#wovenPattern)" class="text-brand-terracotta/40"/>
    </svg>
    
    <!-- 
      Subtle decorative dots at the ends
      - Adds elegance and frames the pattern
    -->
    <div class="absolute left-8 top-1/2 -translate-y-1/2">
      <div class="flex space-x-2">
        <div class="w-2 h-2 rounded-full bg-brand-terracotta/60"></div>
        <div class="w-1 h-1 rounded-full bg-brand-terracotta/40"></div>
      </div>
    </div>
    
    <div class="absolute right-8 top-1/2 -translate-y-1/2">
      <div class="flex space-x-2">
        <div class="w-1 h-1 rounded-full bg-brand-terracotta/40"></div>
        <div class="w-2 h-2 rounded-full bg-brand-terracotta/60"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This component is purely presentational and decorative
</script>
