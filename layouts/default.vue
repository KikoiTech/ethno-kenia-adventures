<template>
  <div>
    <LayoutTheHeader />

    <!-- 
      We add padding-top (pt-20) to the main element. 
      This pushes all page content down, ensuring it starts BELOW the fixed header.
      The value '20' in Tailwind is 5rem or 80px, which is a good starting height for a header.
    -->
    <main class="pt-20">
      <slot />
    </main>

    <!-- This is where our Footer will eventually go -->
  </div>
</template>