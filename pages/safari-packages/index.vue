<template>
  <div class="safari-packages-page min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    
    <!-- National Geographic Hero Section -->
    <section class="relative h-screen overflow-hidden">
      <!-- Hero Background with Parallax -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-orange-900/60 to-yellow-900/40"></div>
        <img 
          src="https://images.unsplash.com/photo-1544735724-1dff02b6c614?ixlib=rb-4&auto=format&fit=crop&w=1920&q=80"
          alt="Kenyan Safari Landscape"
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent"></div>
      </div>
      
      <!-- National Geographic Style Hero Content -->
      <div class="relative z-20 h-full flex items-center justify-center text-center text-white">
        <div class="max-w-6xl mx-auto px-6">
          <!-- National Geographic Yellow Frame -->
          <div class="relative inline-block mb-8">
            <div class="absolute inset-0 bg-yellow-400 opacity-20 blur-xl"></div>
            <div class="relative border-8 border-yellow-400/30 px-12 py-8">
              <!-- NG Logo Style -->
              <div class="flex items-center justify-center mb-6">
                <div class="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg class="w-10 h-10 text-amber-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.75.21-1.46.44-2.07.83l1.23 1.67c.39-.28.8-.49 1.23-.67.93-.48 1.62-1.37 1.62-2.93 0-1.56-.69-2.93-1.62-2.93-.18-.39-.39-.8-.67-1.23l1.67-1.23c.39.61.83 1.32 1.23 2.07 4.08.49 7.44 3.85 7.93 7.93z"/>
                  </svg>
                </div>
              </div>
              
              <h1 class="text-6xl md:text-7xl font-serif tracking-wider mb-4 text-yellow-100">
                {{ getText({ en: "SAFARI PACKAGES", es: "PAQUETES SAFARI", fr: "PAQUETS SAFARI", de: "SAFARI-PAKETE", zh: "野生动物园套餐", ja: "サファリパッケージ", sw: "PAKETI ZA SAFARI" }, currentLanguage) }}
              </h1>
              <div class="w-32 h-1 bg-yellow-400 mx-auto mb-6"></div>
              <p class="text-xl md:text-2xl font-light text-yellow-50 max-w-3xl mx-auto leading-relaxed">
                {{ getText({ en: "Journey into the heart of Africa's wilderness", es: "Viaja al corazón de la naturaleza africana", fr: "Voyage au cœur de la nature africaine", de: "Reise ins Herz der afrikanischen Wildnis", zh: "深入非洲荒野之心", ja: "アフリカの荒野の中心へ", sw: "Safiri kwa moyoni wa pori la Afrika" }, currentLanguage) }}
              </p>
            </div>
          </div>
          
          <!-- Currency & Language Controls -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
            <div class="bg-white/10 backdrop-blur-md border border-yellow-400/30 rounded-full px-6 py-3">
              <div class="flex items-center gap-3">
                <span class="text-yellow-100 font-medium">{{ getText({ en: "Currency:", es: "Moneda:", fr: "Devise:", de: "Währung:", zh: "货币:", ja: "通貨:", sw: "Fedha:" }, currentLanguage) }}</span>
                <select 
                  v-model="selectedCurrency"
                  class="bg-transparent text-yellow-100 border border-yellow-400/50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
                >
                  <option value="KSH">KSH 🇰🇰</option>
                  <option value="USD">USD 🇺🇸</option>
                  <option value="EUR">EUR 🇪🇺</option>
                  <option value="GBP">GBP 🇬🇧</option>
                </select>
              </div>
            </div>
            
            <LanguageSelector 
              v-model="currentLanguage" 
              mode="dropdown"
              class="bg-white/10 backdrop-blur-md border border-yellow-400/30"
            />
          </div>
        </div>
      </div>
      
      <!-- Geographic Grid Pattern Overlay -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(251, 191, 36, 0.3)" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </section>

    <!-- Filter Section - National Geographic Style -->
    <section class="py-16 px-6 bg-gradient-to-r from-amber-100 to-orange-100 border-y-2 border-yellow-400/30">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-serif text-amber-900 mb-2">{{ getText({ en: "Explore Our Adventures", sw: "Chunguza Safari Zetu" }, currentLanguage) }}</h2>
          <div class="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </div>
        
        <div class="flex flex-wrap justify-center items-center gap-6">
          <div class="flex items-center gap-4">
            <label class="text-amber-900 font-serif font-medium">{{ getText({ en: "Sort by:", sw: "Panga kwa:" }, currentLanguage) }}</label>
            <select 
              v-model="sortBy"
              class="bg-white/80 border-2 border-yellow-400/50 rounded-full px-6 py-3 text-amber-900 font-serif focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            >
              <option value="default">{{ getText({ en: "Featured", sw: "Imeangaziwa" }, currentLanguage) }}</option>
              <option value="duration">{{ getText({ en: "Duration", sw: "Muda" }, currentLanguage) }}</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="py-32 text-center">
      <div class="inline-block">
        <div class="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-6 text-amber-900 font-serif text-lg">{{ getText({ en: "Discovering amazing safaris...", sw: "Kugundua safari za ajabu..." }, currentLanguage) }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="loadError" class="py-32 text-center">
      <div class="inline-block bg-red-100 border-2 border-red-300 rounded-full p-8">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/>
        </svg>
        <h3 class="text-xl font-serif text-red-800 mb-2">{{ getText({ en: "Unable to load packages", sw: "Haiwezi kupakua paketi" }, currentLanguage) }}</h3>
        <p class="text-red-600 mb-6">{{ loadError }}</p>
        <button 
          @click="loadPackages"
          class="px-8 py-3 bg-amber-900 text-yellow-100 rounded-full hover:bg-amber-800 transition-colors font-serif"
        >
          {{ getText({ en: "Try Again", sw: "Jaribu Tena" }, currentLanguage) }}
        </button>
      </div>
    </div>

    <!-- Packages Grid -->
    <div v-else-if="filteredPackages.length > 0" class="py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          <PackageCard
            v-for="pkg in filteredPackages"
            :key="pkg.id"
            :safariPackage="pkg"
            :language="currentLanguage"
            class="transform transition-all duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="py-32 text-center">
      <div class="inline-block bg-amber-100 border-2 border-yellow-300 rounded-full p-8">
        <svg class="w-16 h-16 text-amber-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <h3 class="text-xl font-serif text-amber-900 mb-2">{{ getText({ en: "No packages found", sw: "Hakuna paketi ilipatwa" }, currentLanguage) }}</h3>
      </div>
    </div>

    <!-- Success Modal placeholder (removed for now as per simplicity focus) -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { SafariPackage } from '~/types/safari-package'
import { getText } from '~/utils/translation-api'
import { getSafaris } from '~/utils/package-loader'

// Components
import PackageCard from '~/components/safari-packages/PackageCard.vue'
import LanguageSelector from '~/components/safari-packages/LanguageSelector.vue'

// Reactive state
const currentLanguage = ref('en')
const selectedCurrency = ref('KES')
const sortBy = ref('default')
const loading = ref(true)
const loadError = ref('')
const packages = ref<SafariPackage[]>([])

// Load packages data
const loadPackages = async () => {
  loading.value = true
  loadError.value = ''
  try {
    const data = await getSafaris()
    packages.value = data
    if (!data || data.length === 0) {
      loadError.value = 'No safari packages found.'
    }
  } catch (error) {
    console.error('Error loading packages:', error)
    loadError.value = 'Unable to load safari packages. Please try again later.'
  } finally {
    loading.value = false
  }
}

// Initial load
onMounted(() => {
  loadPackages()
})

// Computed properties for filtering and sorting
const filteredPackages = computed(() => {
  let filtered = [...packages.value]

  // Sort packages
  filtered = filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration)
      case 'default':
      default:
        // Featured/Popular first
        const aFeatured = a.featured ?? 0
        const bFeatured = b.featured ?? 0
        const aPopular = a.popular ?? 0
        const bPopular = b.popular ?? 0
        
        if (aFeatured !== bFeatured) return bFeatured - aFeatured
        if (aPopular !== bPopular) return bPopular - aPopular
        return 0
    }
  })

  return filtered
})

// SEO
useHead({
  title: () => `${getText({ en: 'Safari Packages - Ethno Kenia Adventures', es: 'Paquetes Safari - Patrimonio Safari Kenya', fr: 'Paquets Safari - Patrimoine Safari Kenya', de: 'Safari-Pakete - Kenya Safari Erbe', zh: '野生动物园套餐 - 肯尼亚野生动物园遗产', ja: 'サファリパッケージ - ケニアサファリ遺産', sw: 'Paketi za Safari - Urithi wa Safari Kenya' }, currentLanguage.value)}`,
  meta: [
    {
      name: 'description',
      content: () => getText({ en: 'Discover amazing safari packages in Kenya. From luxury wildlife experiences to family-friendly adventures, explore Africa\'s incredible wilderness with Ethno Kenia Adventures.', es: 'Descubre paquetes de safari increíbles en Kenia. Desde experiencias de vida silvestre de lujo hasta aventuras familiares, explora la increíble naturaleza de África con Patrimonio Safari Kenya.', fr: 'Découvrez des paquets de safari incroyables au Kenya. Des expériences fauniques de luxe aux aventures familiales, explorez la nature incroyable de l\'Afrique avec Patrimoine Safari Kenya.', de: 'Entdecke unglaubliche Safari-Pakete in Kenia. Von Luxus-Wildtiererlebnissen bis familienfreundlichen Abenteuern, erkunden Sie die unglaubliche Wildnis Afrikas mit Kenya Safari Erbe.', zh: '在肯尼亚发现令人惊叹的野生动物园套餐。从豪华野生动物体验到家庭友好型冒险，与肯尼亚野生动物园遗产一起探索非洲令人难以置信的荒野。', ja: 'ケニアで素晴らしいサファリパッケージを発見。ラグジュアリーな野生動物体験から家族向けの冒険まで、ケニアサファリ遺産と一緒にアフリカの信じられないほどの荒野を探索してください。', sw: 'Gundua paketi za safari za ajabu katika Kenya. Kuanzia uzoefu wa wanyama wa kifahama hadi safari za familia, chunguza pori la ajabu la Afrika na Urithi wa Safari Kenya.' }, currentLanguage.value)
    }
  ]
})
</script>

<style scoped>
/* National Geographic inspired animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delayed {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delayed-2 {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-delayed {
  animation: fade-in-delayed 1.2s ease-out forwards;
}

.animate-fade-in-delayed-2 {
  animation: fade-in-delayed-2 1.4s ease-out forwards;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(251, 191, 36, 0.1);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(251, 191, 36, 0.5);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(251, 191, 36, 0.7);
}

/* National Geographic style hover effects */
.package-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.package-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Yellow frame glow effect */
.yellow-frame {
  box-shadow: 0 0 40px rgba(251, 191, 36, 0.3);
}
</style>
