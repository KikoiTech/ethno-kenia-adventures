<template>
  <div class="container mx-auto px-6 py-12">
    <div class="text-center">
      <h1 class="text-4xl font-serif text-brand-charcoal mb-4">
        {{ safariPackage?.title?.en || 'Safari Package' }}
      </h1>
      <p class="text-brand-charcoal/80 mb-8">
        Loading package details...
      </p>
      <div class="flex justify-center">
        <NuxtLink 
          to="/safari-packages" 
          class="px-6 py-3 bg-brand-terracotta text-white rounded-full hover:bg-brand-terracotta/90 transition-colors"
        >
          Back to All Packages
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SafariPackage } from '~/types/safari-package'
import { getPackageBySlug } from '~/utils/package-loader'

// Get the slug from the route
const route = useRoute()
const slug = route.params.slug as string

// Load package data
const { data: safariPackage, error } = await useAsyncData(
  `safari-package-${slug}`,
  () => getPackageBySlug(slug)
)

// Handle 404 if package not found
if (error.value || !safariPackage.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Safari package not found'
  })
}

// SEO
useHead({
  title: () => `${safariPackage.value?.title?.en || 'Safari Package'} - Kenya Safari Heritage`,
  meta: [
    {
      name: 'description',
      content: () => safariPackage.value?.description?.en || 'Kenya Safari Heritage package details'
    }
  ]
})
</script>
