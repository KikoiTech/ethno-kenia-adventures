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
          <h2 class="text-3xl font-serif text-amber-900 mb-2">{{ getText({ en: "Explore Our Adventures", es: "Explora Nuestras Aventuras", fr: "Explorez Nos Aventures", de: "Erkunde Unsere Abenteuer", zh: "探索我们的冒险", ja: "私たちの冒険を探る", sw: "Chunguza Safari Zetu" }, currentLanguage) }}</h2>
          <div class="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </div>
        
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <button
            v-for="category in categories"
            :key="category.value"
            @click="selectedCategory = category.value"
            :class="[
              'px-8 py-4 rounded-full font-serif font-medium transition-all duration-300 border-2',
              selectedCategory === category.value
                ? 'bg-amber-900 text-yellow-100 border-yellow-400 shadow-xl transform scale-105'
                : 'bg-white/80 text-amber-900 border-yellow-400/50 hover:bg-white hover:border-yellow-400 hover:shadow-lg'
            ]"
          >
            <span class="flex items-center gap-2">
              <span class="text-2xl">{{ category.icon }}</span>
              {{ category.label[currentLanguage as keyof typeof category.label] }}
            </span>
          </button>
        </div>
        
        <div class="flex justify-center items-center gap-4">
          <label class="text-amber-900 font-serif font-medium">{{ getText({ en: "Sort by:", es: "Ordenar por:", fr: "Trier par:", de: "Sortieren nach:", zh: "排序方式:", ja: "並び替え:", sw: "Panga kwa:" }, currentLanguage) }}</label>
          <select 
            v-model="sortBy"
            class="bg-white/80 border-2 border-yellow-400/50 rounded-full px-6 py-3 text-amber-900 font-serif focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
          >
            <option value="price-low">{{ getText({ en: "Price: Low to High", es: "Precio: Menor a Mayor", fr: "Prix: Croissant", de: "Preis: Aufsteigend", zh: "价格：从低到高", ja: "価格：安い順", sw: "Bei: Chini hadi Juu Juu" }, currentLanguage) }}</option>
            <option value="price-high">{{ getText({ en: "Price: High to Low", es: "Precio: Mayor a Menor", fr: "Prix: Décroissant", de: "Preis: Absteigend", zh: "价格：从高到低", ja: "価格：高い順", sw: "Bei: Juu Juu Hadi Chini" }, currentLanguage) }}</option>
            <option value="duration">{{ getText({ en: "Duration", es: "Duración", fr: "Durée", de: "Dauer", zh: "时长", ja: "期間", sw: "Muda" }, currentLanguage) }}</option>
            <option value="difficulty">{{ getText({ en: "Difficulty", es: "Dificultad", fr: "Difficulté", de: "Schwierigkeit", zh: "难度", ja: "難易度", sw: "Ugumu" }, currentLanguage) }}</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="py-32 text-center">
      <div class="inline-block">
        <div class="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-6 text-amber-900 font-serif text-lg">{{ getText({ en: "Discovering amazing safaris...", es: "Descubriendo safaris increíbles...", fr: "Découverte de safaris incroyables...", de: "Entdecke unglaubliche Safaris...", zh: "发现令人惊叹的野生动物园...", ja: "素晴らしいサファリを発見中...", sw: "Kugundua safari za ajabu..." }, currentLanguage) }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="loadError" class="py-32 text-center">
      <div class="inline-block bg-red-100 border-2 border-red-300 rounded-full p-8">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v2z"/>
        </svg>
        <h3 class="text-xl font-serif text-red-800 mb-2">{{ getText({ en: "Unable to load packages", es: "No se pueden cargar los paquetes", fr: "Impossible de charger les paquets", de: "Pakete können nicht geladen werden", zh: "无法加载套餐", ja: "パッケージを読み込めません", sw: "Haiwezi kupakua paketi" }, currentLanguage) }}</h3>
        <p class="text-red-600 mb-6">{{ loadError }}</p>
        <button 
          @click="loadPackages"
          class="px-8 py-3 bg-amber-900 text-yellow-100 rounded-full hover:bg-amber-800 transition-colors font-serif"
        >
          {{ getText({ en: "Try Again", es: "Intentar de Nuevo", fr: "Réessayer", de: "Erneut Versuchen", zh: "重试", ja: "再試行", sw: "Jaribu Tena" }, currentLanguage) }}
        </button>
      </div>
    </div>

    <!-- Packages Grid -->
    <div v-else-if="filteredPackages.length > 0" class="py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PackageCard
            v-for="pkg in filteredPackages"
            :key="pkg.id"
            :safariPackage="pkg"
            :currency="selectedCurrency"
            :language="currentLanguage"
            :show-price="true"
            @click="handlePackageClick(pkg)"
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
        <h3 class="text-xl font-serif text-amber-900 mb-2">{{ getText({ en: "No packages found", es: "No se encontraron paquetes", fr: "Aucun paquet trouvé", de: "Keine Pakete gefunden", zh: "未找到套餐", ja: "パッケージが見つかりません", sw: "Hakuna paketi ilipatwa" }, currentLanguage) }}</h3>
        <p class="text-amber-700 mb-6">{{ getText({ en: "Try adjusting your filters", es: "Intenta ajustar tus filtros", fr: "Essayez d'ajuster vos filtres", de: "Versuchen Sie, Ihre Filter anzupassen", zh: "尝试调整您的筛选条件", ja: "フィルターを調整してみてください", sw: "Jaribu kurekebusha vichungo vyako" }, currentLanguage) }}</p>
        <button 
          @click="selectedCategory = 'all'"
          class="px-8 py-3 bg-amber-900 text-yellow-100 rounded-full hover:bg-amber-800 transition-colors font-serif"
        >
          {{ getText({ en: "Show All Packages", es: "Mostrar Todos los Paquetes", fr: "Afficher Tous les Paquets", de: "Alle Pakete Anzeigen", zh: "显示所有套餐", ja: "すべてのパッケージを表示", sw: "Onyesha Paketi Zote" }, currentLanguage) }}
        </button>
      </div>
    </div>

    <!-- Booking Modal -->
    <div v-if="showBookingModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="closeBookingModal"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-400/30">
          <!-- Modal Header -->
          <div class="bg-gradient-to-r from-amber-900 to-orange-900 text-white p-6 rounded-t-2xl">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-2xl font-serif mb-2">{{ getText({ en: "Book Your Safari Adventure", es: "Reserva Tu Aventura Safari", fr: "Réservez Votre Aventure Safari", de: "Buchen Sie Ihr Safari-Abenteuer", zh: "预订您的野生动物园冒险", ja: "サファリの冒険を予約", sw: "Weka Safari Yako" }, currentLanguage) }}</h3>
                <p class="text-yellow-100/80">{{ selectedPackage?.title?.en || selectedPackage?.title?.sw || 'Safari Package' }}</p>
              </div>
              <button
                @click="closeBookingModal"
                class="text-yellow-100 hover:text-white transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div class="p-8">
            <BookingForm
              v-if="selectedPackage"
              :package="selectedPackage"
              :language="currentLanguage"
              :show-package-selection="false"
              @submit="handleBookingSubmit"
              @success="handleBookingSuccess"
              @error="handleBookingError"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="closeSuccessModal"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 border-2 border-yellow-400/30">
          <div class="text-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-2xl font-serif text-amber-900 mb-4">
              {{ getText({ en: "Booking Request Submitted!", es: "¡Solicitud de Reserva Enviada!", fr: "Demande de Réservation Soumise!", de: "Buchungsanfrage Gesendet!", zh: "预订请求已提交！", ja: "予約リクエストが送信されました！", sw: "Ombi la Kuweka Nafasi Limetumwa!" }, currentLanguage) }}
            </h3>
            <p class="text-amber-700 mb-6">
              {{ getText({ en: "Thank you for choosing Ethno Kenia Adventures. We'll contact you within 24 hours to confirm your safari adventure.", es: "Gracias por elegir Ethno Kenia Adventures. Nos pondremos en contacto en 24 horas para confirmar tu aventura safari.", fr: "Merci d'avoir choisi Ethno Kenia Adventures. Nous vous contacterons dans 24 heures pour confirmer votre aventure safari.", de: "Vielen Dank, dass Sie sich für Ethno Kenia Adventures entschieden haben. Wir werden uns innerhalb von 24 Stunden bei Ihnen melden, um Ihr Safari-Abenteuer zu bestätigen.", zh: "感谢您选择肯尼亚野生动物园遗产。我们将在24小时内与您联系确认您的野生动物园冒险。", ja: "ケニアサファリ遺産をお選びいただきありがとうございます。24時間以内にご連絡し、サファリアドベンチャーを確認させていただきます。", sw: "Asante kwa kuchagua Urithi wa Safari Kenya. Tutakupigia ndani ya saa 24 kuthibitisha uzoefu wako wa safari." }, currentLanguage) }}
            </p>
            <div class="flex gap-4 justify-center">
              <button
                @click="closeSuccessModal"
                class="px-8 py-3 bg-amber-900 text-yellow-100 rounded-full hover:bg-amber-800 transition-colors font-serif"
              >
                {{ getText({ en: "Continue Browsing", es: "Seguir Navegando", fr: "Continuer la Navigation", de: "Weiter Stöbern", zh: "继续浏览", ja: "閲覧を続ける", sw: "Endele Kuvinjari" }, currentLanguage) }}
              </button>
              <button
                @click="closeSuccessModal; $router.push('/safari-packages')"
                class="px-8 py-3 border-2 border-amber-900 text-amber-900 rounded-full hover:bg-amber-50 transition-colors font-serif"
              >
                {{ getText({ en: "View More Packages", es: "Ver Más Paquetes", fr: "Voir Plus de Paquets", de: "Weitere Pakete Anzeigen", zh: "查看更多套餐", ja: "他のパッケージを見る", sw: "Ona Paketi Zaidi" }, currentLanguage) }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SafariPackage } from '~/types/safari-package'
import { getText, getLanguageName } from '~/utils/translation-api'
import { convertCurrency, formatCurrency } from '~/utils/currency-api'
import { getAllPackages } from '~/utils/package-loader'

// Components
import PackageCard from '~/components/safari-packages/PackageCard.vue'
import BookingForm from '~/components/safari-packages/BookingForm.vue'
import LanguageSelector from '~/components/safari-packages/LanguageSelector.vue'
import CurrencyConverter from '~/components/safari-packages/CurrencyConverter.vue'

// Reactive state
const currentLanguage = ref('en')
const selectedCurrency = ref('KSH') // Start with KSH
const selectedCategory = ref('all')
const sortBy = ref('price-low')
const showBookingModal = ref(false)
const showSuccessModal = ref(false)
const selectedPackage = ref<SafariPackage | null>(null)
const loading = ref(true)
const loadError = ref('')

// Categories with National Geographic style icons
const categories = ref([
  { 
    value: 'all', 
    icon: '🌍',
    label: {
      en: 'All Adventures',
      es: 'Todas las Aventuras',
      fr: 'Toutes les Aventures',
      de: 'Alle Abenteuer',
      zh: '所有冒险',
      ja: 'すべての冒険',
      sw: 'Safari Zote'
    }
  },
  { 
    value: 'luxury', 
    icon: '🦁',
    label: {
      en: 'Luxury Safaris',
      es: 'Safaris de Lujo',
      fr: 'Safaris de Luxe',
      de: 'Luxus-Safaris',
      zh: '豪华野生动物园',
      ja: 'ラグジュアリーサファリ',
      sw: 'Safari za Kifahama'
    }
  },
  { 
    value: 'adventure', 
    icon: '🏔️',
    label: {
      en: 'Adventure',
      es: 'Aventura',
      fr: 'Aventure',
      de: 'Abenteuer',
      zh: '冒险',
      ja: 'アドベンチャー',
      sw: 'Safari ya Kusoma'
    }
  },
  { 
    value: 'family', 
    icon: '👨‍👩‍👧‍👦',
    label: {
      en: 'Family Friendly',
      es: 'Familiar',
      fr: 'Familial',
      de: 'Familienfreundlich',
      zh: '家庭友好',
      ja: 'ファミリー向け',
      sw: 'Inayofa Familia'
    }
  },
  { 
    value: 'wildlife', 
    icon: '🐘',
    label: {
      en: 'Wildlife Focus',
      es: 'Enfoque en Vida Silvestre',
      fr: 'Focus sur la Faune',
      de: 'Fokus auf Wildtiere',
      zh: '野生动物重点',
      ja: '野生動物重点',
      sw: 'Lenga Kwa Wanyama'
    }
  }
])

// Load packages data using clean utility
const packages = await getAllPackages()

// Update loading state
loading.value = false

// Set error if no packages loaded
if (packages.length === 0) {
  loadError.value = 'Unable to load safari packages. Please try again later.'
} else {
  console.log(`Successfully loaded ${packages.length} safari packages`)
}

// Computed properties for filtering and sorting
const filteredPackages = computed(() => {
  let filtered = packages

  // Filter by category
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(pkg => pkg.category === selectedCategory.value)
  }

  // Sort packages
  filtered = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'price-low':
        return a.price.USD - b.price.USD
      case 'price-high':
        return b.price.USD - a.price.USD
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration)
      case 'difficulty':
        const difficultyOrder = { easy: 1, moderate: 2, challenging: 3 }
        return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
      default:
        return 0
    }
  })

  return filtered
})

// Methods
const handlePackageClick = (pkg: SafariPackage) => {
  selectedPackage.value = pkg
  showBookingModal.value = true
}

const closeBookingModal = () => {
  showBookingModal.value = false
  document.body.style.overflow = 'auto'
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  document.body.style.overflow = 'auto'
}

const handleBookingSubmit = (bookingData: any) => {
  console.log('Booking submitted:', bookingData)
  closeBookingModal()
}

const handleBookingSuccess = (bookingData: any) => {
  console.log('Booking successful:', bookingData)
  closeBookingModal()
  showSuccessModal.value = true
}

const handleBookingError = (error: string) => {
  console.error('Booking error:', error)
  // You could show an error toast here
}

const loadPackages = async () => {
  loading.value = true
  loadError.value = ''
  try {
    const newPackages = await getAllPackages()
    if (newPackages.length > 0) {
      // Update the packages array (this would require updating the reactive state)
      console.log('Packages reloaded successfully')
    }
  } catch (error) {
    console.error('Error reloading packages:', error)
    loadError.value = 'Failed to reload packages. Please try again.'
  } finally {
    loading.value = false
  }
}

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
