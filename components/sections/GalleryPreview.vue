<template>
  <!--
    SECTION: Gallery Preview
    PURPOSE: Teaser row of real trip photography with a link to the full gallery
  -->
  <section class="relative bg-brand-charcoal pt-[140px] px-6 pb-16 overflow-hidden">
    <div class="container mx-auto relative">

      <!-- Header row: heading left, link right -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12 md:mb-16">
        <div>
          <p class="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-terracotta mb-4">
            As We Saw It
          </p>
          <h2 class="text-4xl md:text-5xl font-serif leading-tight text-brand-off-white">
            This Isn't A Brochure.<br>
            <span class="italic text-brand-terracotta">It's Our Kenya.</span>
          </h2>
        </div>
        <NuxtLink
          to="/gallery"
          class="inline-block text-xs md:text-sm font-bold uppercase tracking-wider text-brand-off-white border-b border-brand-off-white/50 pb-1 hover:text-brand-terracotta hover:border-brand-terracotta transition-colors whitespace-nowrap"
        >
          View Full Gallery
        </NuxtLink>
      </div>

      <!-- Image grid: single row, first item spans 2 of 4 columns -->
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div class="relative h-64 sm:h-80 lg:h-96 sm:col-span-2 overflow-hidden">
          <NuxtImg
            provider="cloudinary"
            src="v1770903538/DSC_0513_ajzrvb.jpg"
            alt="Elephants on the golden savanna at dawn"
            format="webp"
            quality="80"
            loading="lazy"
            sizes="sm:100vw md:50vw lg:600px"
            width="900"
            height="500"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div class="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
          <NuxtImg
            provider="cloudinary"
            src="v1770903539/DSC_0519_cjrhjf.jpg"
            alt="Giraffes on the savanna"
            format="webp"
            quality="80"
            loading="lazy"
            sizes="sm:100vw md:25vw lg:340px"
            width="450"
            height="500"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div class="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
          <NuxtImg
            provider="cloudinary"
            src="v1770903503/DSC_0232_mhvplm.jpg"
            alt="A herd of gazelles on the savanna"
            format="webp"
            quality="80"
            loading="lazy"
            sizes="sm:100vw md:25vw lg:340px"
            width="450"
            height="500"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  </section>
</template>
