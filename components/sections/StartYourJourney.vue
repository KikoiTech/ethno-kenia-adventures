<template>
  <!--
    SECTION: Start Your Journey
    PURPOSE: Closing call-to-action — full-bleed split screen (photo + contact prompt)
  -->
  <section class="relative min-h-screen">
    <div class="grid grid-cols-1 lg:grid-cols-2 lg:min-h-screen">

      <!-- Image half -->
      <div class="relative h-72 sm:h-96 lg:h-auto">
        <NuxtImg
          provider="cloudinary"
          src="v1770903539/DSC_0519_cjrhjf.jpg"
          alt="Giraffes on the savanna at sunrise, Kenya"
          format="webp"
          quality="80"
          loading="lazy"
          sizes="sm:100vw md:100vw lg:50vw"
          width="1200"
          height="1600"
          class="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <!-- Content half -->
      <div class="relative bg-brand-sand flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-16 lg:py-24 xl:py-32">
        <div class="w-full max-w-xl text-left">
          <p class="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-brand-terracotta mb-4">
            Let's Begin
          </p>
          <h2 class="text-4xl md:text-5xl font-serif leading-tight text-brand-charcoal mb-6">
            Where Will Your Journey Start?
          </h2>
          <p class="font-sans text-base md:text-lg text-brand-charcoal/70 leading-relaxed mb-8 max-w-md">
            Tell us a little about the safari you're imagining — the season, the pace, the wildlife
            you hope to see. A safari designer will reply personally, usually within a day, with the
            first outline of a journey built entirely around you.
          </p>

          <div class="flex flex-wrap items-center gap-6 mb-8">
            <Button as-child variant="brand" class="px-8 py-4 h-auto text-xs">
              <NuxtLink to="/contact-us">Start The Conversation</NuxtLink>
            </Button>
            <a
              href="mailto:info@ethnokeniaadventure.com"
              class="inline-block text-xs md:text-sm font-bold uppercase tracking-wider text-brand-charcoal border-b border-brand-charcoal pb-1 hover:text-brand-terracotta hover:border-brand-terracotta transition-colors"
            >
              Or Email Us Directly
            </a>
          </div>

          <!-- Placeholder trust line — swap for the client's real review stats once provided -->
          <p class="text-xs font-sans uppercase tracking-wider text-brand-charcoal/50">
            5.0/5 on SafariBookings · 5.0/5 on TripAdvisor · 1,590 independent reviews
          </p>
        </div>
      </div>

    </div>
  </section>
</template>
