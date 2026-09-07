<template>
  <!-- Optional Maasai Mara Balloon Safari Banner -->
  <div class="relative overflow-hidden flex items-center min-h-screen min-[1441px]:min-h-0 min-[1441px]:h-[85vh]">
    <!-- Background Container -->
    <div class="absolute inset-0 z-0">
      <NuxtImg
        provider="cloudinary"
        src="v1770903461/DSC_0036_dgo8e1.jpg"
        alt="Hot air balloon safari over the Maasai Mara at sunrise"
        format="webp"
        quality="80"
        loading="lazy"
        sizes="sm:100vw md:100vw lg:100vw"
        width="1920"
        height="1080"
        class="w-full h-full object-cover object-center"
      />
      <!-- Light overlay so the photo stays visible -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/50 pointer-events-none"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full">
      <div class="max-w-xl px-6 sm:px-10 lg:px-16 text-left">
        <p class="font-sans text-xs uppercase tracking-[0.2em] text-brand-off-white mb-3">
          The Maasai Mara Experience
        </p>

        <h3 class="banner-headline text-4xl md:text-6xl font-serif text-brand-off-white leading-tight mb-6">
          See the Mara<br />from all angles.
        </h3>

        <p class="banner-subtext font-sans text-base md:text-lg text-brand-off-white/85 leading-relaxed mb-8">
          Endless golden plains, the Great Migration, and big cats at every turn — few places on earth match the raw, untamed spirit of the Maasai Mara.
        </p>

        <NuxtLink
          to="/contact-us"
          class="inline-flex items-center justify-center px-8 py-4 border border-white text-white text-xs font-bold uppercase tracking-[0.15em] bg-transparent transition-colors duration-300 hover:bg-white hover:text-black"
        >
          Ask About Mara Safaris
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-headline {
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.banner-subtext {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
</style>
