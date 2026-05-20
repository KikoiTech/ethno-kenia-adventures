<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- Sonner is auto-imported from components/ui/sonner/Sonner.vue -->
  <!-- ClientOnly prevents SSR from trying to render it server-side -->
  <ClientOnly>
    <Sonner position="top-right" rich-colors />
  </ClientOnly>
</template>