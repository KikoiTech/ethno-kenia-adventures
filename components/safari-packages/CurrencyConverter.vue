<template>
  <div class="currency-converter bg-white rounded-2xl shadow-lg p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h3 class="text-xl font-serif text-brand-charcoal mb-2">Currency Converter</h3>
      <p class="text-brand-charcoal/70 text-sm">Convert prices to your preferred currency</p>
    </div>

    <!-- Converter Form -->
    <div class="space-y-4">
      <!-- Amount Input -->
      <div>
        <label class="block text-brand-charcoal/80 font-medium mb-2">Amount</label>
        <div class="relative">
          <input
            v-model.number="amount"
            type="number"
            step="0.01"
            min="0"
            class="w-full px-4 py-3 pr-12 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
            placeholder="0.00"
            @input="handleAmountChange"
          >
          <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-brand-charcoal/60">
            {{ fromCurrencySymbol }}
          </span>
        </div>
      </div>

      <!-- From Currency -->
      <div>
        <label class="block text-brand-charcoal/80 font-medium mb-2">From</label>
        <div class="relative">
          <select
            v-model="fromCurrency"
            class="w-full px-4 py-3 pr-10 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50 appearance-none"
            @change="handleFromCurrencyChange"
          >
            <option v-for="currency in popularCurrencies" :key="currency.code" :value="currency.code">
              {{ currency.code }} - {{ currency.name }}
            </option>
          </select>
          <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-charcoal/60 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>

      <!-- Swap Button -->
      <div class="flex justify-center">
        <button
          @click="swapCurrencies"
          class="p-2 bg-brand-terracotta/10 rounded-full hover:bg-brand-terracotta/20 transition-colors"
          title="Swap currencies"
        >
          <svg class="w-5 h-5 text-brand-terracotta" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>

      <!-- To Currency -->
      <div>
        <label class="block text-brand-charcoal/80 font-medium mb-2">To</label>
        <div class="relative">
          <select
            v-model="toCurrency"
            class="w-full px-4 py-3 pr-10 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50 appearance-none"
            @change="handleToCurrencyChange"
          >
            <option v-for="currency in popularCurrencies" :key="currency.code" :value="currency.code">
              {{ currency.code }} - {{ currency.name }}
            </option>
          </select>
          <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-charcoal/60 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </div>
      </div>

      <!-- Converted Amount -->
      <div class="bg-brand-off-white/50 rounded-lg p-4">
        <div class="text-center">
          <div class="text-3xl font-serif font-bold text-brand-charcoal mb-2">
            {{ formattedConvertedAmount }}
          </div>
          <div class="text-sm text-brand-charcoal/70">
            {{ toCurrencySymbol }} {{ toCurrency }}
          </div>
        </div>
      </div>

      <!-- Exchange Rate Info -->
      <div v-if="exchangeRate && !isLoading" class="text-center">
        <div class="text-sm text-brand-charcoal/70">
          1 {{ fromCurrency }} = {{ exchangeRate.toFixed(4) }} {{ toCurrency }}
        </div>
        <div class="text-xs text-brand-charcoal/60 mt-1">
          Last updated: {{ lastUpdated }}
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-4">
        <svg class="animate-spin w-6 h-6 text-brand-terracotta mx-auto" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-brand-charcoal/60 text-sm mt-2">Converting...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="text-center py-4">
        <svg class="w-6 h-6 text-red-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <p class="text-red-600 text-sm mt-2">{{ error }}</p>
        <button
          @click="retryConversion"
          class="mt-2 text-brand-terracotta hover:text-brand-terracotta/80 text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    </div>

    <!-- Popular Currencies Quick Access -->
    <div v-if="showQuickAccess" class="mt-6 pt-6 border-t border-brand-charcoal/10">
      <h4 class="text-sm font-semibold text-brand-charcoal/70 mb-3">Quick Access</h4>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="currency in quickAccessCurrencies"
          :key="currency.code"
          @click="setToCurrency(currency.code)"
          class="px-3 py-1 bg-brand-off-white rounded-full text-xs text-brand-charcoal/70 hover:bg-brand-terracotta hover:text-white transition-colors"
        >
          {{ currency.code }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertCurrency, formatCurrency, getCurrencySymbol, getSupportedCurrencies } from '~/utils/currency-api'

interface Props {
  defaultAmount?: number
  defaultFromCurrency?: string
  defaultToCurrency?: string
  showQuickAccess?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultAmount: 100,
  defaultFromCurrency: 'USD',
  defaultToCurrency: 'KES',
  showQuickAccess: true,
  compact: false
})

const emit = defineEmits<{
  conversion: [from: string, to: string, amount: number, result: number]
  currencyChange: [from: string, to: string]
}>()

// Reactive state
const amount = ref(props.defaultAmount)
const fromCurrency = ref(props.defaultFromCurrency)
const toCurrency = ref(props.defaultToCurrency)
const convertedAmount = ref(0)
const exchangeRate = ref(0)
const isLoading = ref(false)
const error = ref('')
const lastUpdated = ref('')

// Computed properties
const popularCurrencies = computed(() => {
  return getSupportedCurrencies()
})

const quickAccessCurrencies = computed(() => {
  return [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
  ]
})

const fromCurrencySymbol = computed(() => {
  return getCurrencySymbol(fromCurrency.value)
})

const toCurrencySymbol = computed(() => {
  return getCurrencySymbol(toCurrency.value)
})

const formattedConvertedAmount = computed(() => {
  return formatCurrency(convertedAmount.value, toCurrency.value)
})

// Methods
const performConversion = async () => {
  if (!amount.value || amount.value <= 0) {
    convertedAmount.value = 0
    exchangeRate.value = 0
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    const result = await convertCurrency(amount.value, fromCurrency.value, toCurrency.value)
    
    if (result.error) {
      error.value = result.error.message
      convertedAmount.value = 0
      exchangeRate.value = 0
    } else {
      convertedAmount.value = result.amount
      exchangeRate.value = result.rate
      lastUpdated.value = new Date().toLocaleTimeString()
      
      emit('conversion', fromCurrency.value, toCurrency.value, amount.value, result.amount)
    }
  } catch (err) {
    error.value = 'Conversion failed. Please try again.'
    convertedAmount.value = 0
    exchangeRate.value = 0
  } finally {
    isLoading.value = false
  }
}

const handleAmountChange = () => {
  performConversion()
}

const handleFromCurrencyChange = () => {
  performConversion()
  emit('currencyChange', fromCurrency.value, toCurrency.value)
}

const handleToCurrencyChange = () => {
  performConversion()
  emit('currencyChange', fromCurrency.value, toCurrency.value)
}

const swapCurrencies = () => {
  const temp = fromCurrency.value
  fromCurrency.value = toCurrency.value
  toCurrency.value = temp
  performConversion()
  emit('currencyChange', fromCurrency.value, toCurrency.value)
}

const setToCurrency = (currency: string) => {
  toCurrency.value = currency
  performConversion()
  emit('currencyChange', fromCurrency.value, toCurrency.value)
}

const retryConversion = () => {
  error.value = ''
  performConversion()
}

// Watch for prop changes
watch(() => props.defaultAmount, (newAmount) => {
  amount.value = newAmount
  performConversion()
})

watch(() => props.defaultFromCurrency, (newCurrency) => {
  fromCurrency.value = newCurrency
  performConversion()
})

watch(() => props.defaultToCurrency, (newCurrency) => {
  toCurrency.value = newCurrency
  performConversion()
})

// Initial conversion
onMounted(() => {
  performConversion()
})
</script>

<style scoped>
.currency-converter {
  max-width: 400px;
}

/* Custom select styling */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Hover effects */
button:hover {
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}

/* Focus states */
input:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .currency-converter {
    padding: 1rem;
  }
}

/* Compact mode */
.currency-converter.compact {
  padding: 1rem;
}

.currency-converter.compact .text-3xl {
  font-size: 1.5rem;
}

.currency-converter.compact .space-y-4 > * + * {
  margin-top: 0.75rem;
}
</style>