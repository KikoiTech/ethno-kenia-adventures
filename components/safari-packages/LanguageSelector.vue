<template>
  <div class="language-selector" :class="{ 'compact': compact }">
    <!-- Dropdown Mode -->
    <div v-if="mode === 'dropdown'" class="relative">
      <button
        @click="toggleDropdown"
        class="flex items-center space-x-2 px-4 py-2 bg-white border border-brand-charcoal/20 rounded-lg hover:border-brand-terracotta/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
        :class="{ 'bg-brand-terracotta text-white': isOpen }"
      >
        <!-- Language Icon -->
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.414 18H15a1 1 0 001-1v-3.586l4-4a1 1 0 00.293-.707V4.414L13.707 3.707A1 1 0 0013 2H7zm2 14v-2h2v2H9zm2-4V8h2v4h-2zm-2-4H7V8h2v4zm-2 4v2H5v-2h2z" clip-rule="evenodd"/>
        </svg>
        
        <!-- Current Language Name -->
        <span class="font-medium">{{ currentLanguage.name }}</span>
        
        <!-- Dropdown Arrow -->
        <svg 
          class="w-4 h-4 transition-transform" 
          :class="{ 'rotate-180': isOpen }"
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="isOpen"
        class="absolute top-full left-0 mt-2 w-64 bg-white border border-brand-charcoal/20 rounded-lg shadow-lg z-50"
        @click.stop
      >
        <div class="max-h-96 overflow-y-auto">
          <div
            v-for="language in supportedLanguages"
            :key="language.code"
            @click="selectLanguage(language.code)"
            class="flex items-center space-x-3 px-4 py-3 hover:bg-brand-off-white/50 cursor-pointer transition-colors"
            :class="{ 'bg-brand-terracotta/10 text-brand-terracotta': language.code === currentLanguage.code }"
          >
            <!-- Language Flag/Icon -->
            <div class="text-2xl">
              {{ language.flag }}
            </div>
            
            <!-- Language Info -->
            <div class="flex-1">
              <div class="font-medium text-brand-charcoal">{{ language.name }}</div>
              <div class="text-sm text-brand-charcoal/60">{{ language.nativeName }}</div>
            </div>
            
            <!-- Checkmark for selected language -->
            <svg
              v-if="language.code === currentLanguage.code"
              class="w-5 h-5 text-brand-terracotta"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Button Mode -->
    <div v-else-if="mode === 'buttons'" class="flex flex-wrap gap-2">
      <button
        v-for="language in supportedLanguages"
        :key="language.code"
        @click="selectLanguage(language.code)"
        class="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors"
        :class="{
          'bg-brand-terracotta text-white': language.code === currentLanguage.code,
          'bg-brand-off-white/50 text-brand-charcoal hover:bg-brand-off-white': language.code !== currentLanguage.code
        }"
      >
        <span class="text-lg">{{ language.flag }}</span>
        <span class="font-medium text-sm">{{ language.code.toUpperCase() }}</span>
      </button>
    </div>

    <!-- Compact Mode -->
    <div v-else-if="mode === 'compact'" class="flex items-center space-x-2">
      <button
        v-for="language in supportedLanguages.slice(0, 3)"
        :key="language.code"
        @click="selectLanguage(language.code)"
        class="text-2xl hover:opacity-75 transition-opacity"
        :class="{ 'opacity-100': language.code === currentLanguage.code, 'opacity-50': language.code !== currentLanguage.code }"
        :title="language.name"
      >
        {{ language.flag }}
      </button>
      
      <!-- More languages indicator -->
      <button
        @click="toggleDropdown"
        class="text-lg text-brand-charcoal/60 hover:text-brand-charcoal transition-colors"
        title="More languages"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
      </button>
      
      <!-- Dropdown for compact mode -->
      <div
        v-if="isOpen"
        class="absolute top-full right-0 mt-2 w-64 bg-white border border-brand-charcoal/20 rounded-lg shadow-lg z-50"
        @click.stop
      >
        <div class="max-h-96 overflow-y-auto">
          <div
            v-for="language in supportedLanguages"
            :key="language.code"
            @click="selectLanguage(language.code)"
            class="flex items-center space-x-3 px-4 py-3 hover:bg-brand-off-white/50 cursor-pointer transition-colors"
            :class="{ 'bg-brand-terracotta/10 text-brand-terracotta': language.code === currentLanguage.code }"
          >
            <div class="text-2xl">{{ language.flag }}</div>
            <div class="flex-1">
              <div class="font-medium text-brand-charcoal">{{ language.name }}</div>
              <div class="text-sm text-brand-charcoal/60">{{ language.nativeName }}</div>
            </div>
            <svg
              v-if="language.code === currentLanguage.code"
              class="w-5 h-5 text-brand-terracotta"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Toggle Switch Mode -->
    <div v-else-if="mode === 'toggle'" class="flex items-center space-x-3">
      <span class="text-sm text-brand-charcoal/60">Language:</span>
      <div class="relative">
        <select
          :value="currentLanguage.code"
          @change="selectLanguage(($event.target as HTMLSelectElement).value)"
          class="appearance-none bg-white border border-brand-charcoal/20 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50 cursor-pointer"
        >
          <option v-for="language in supportedLanguages" :key="language.code" :value="language.code">
            {{ language.flag }} {{ language.name }}
          </option>
        </select>
        <svg class="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-charcoal/60 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getLanguageName, isValidLanguage, getUserLanguage } from '~/utils/translation-api'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

interface Props {
  defaultLanguage?: string
  mode?: 'dropdown' | 'buttons' | 'compact' | 'toggle'
  compact?: boolean
  showFlags?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultLanguage: 'en',
  mode: 'dropdown',
  compact: false,
  showFlags: true
})

const emit = defineEmits<{
  languageChange: [language: string]
}>()

// Reactive state
const isOpen = ref(false)
const currentLanguage = ref<Language>({
  code: props.defaultLanguage,
  name: 'English',
  nativeName: 'English',
  flag: '🇺🇸'
})

// Supported languages
const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦' }
]

// Methods
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (languageCode: string) => {
  if (!isValidLanguage(languageCode)) {
    console.warn(`Invalid language code: ${languageCode}`)
    return
  }

  const language = supportedLanguages.find(lang => lang.code === languageCode)
  if (language) {
    currentLanguage.value = language
    emit('languageChange', languageCode)
    
    // Store preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', languageCode)
      document.documentElement.lang = languageCode
    }
  }

  isOpen.value = false
}

const closeDropdown = () => {
  isOpen.value = false
}

const initializeLanguage = () => {
  // Try to get saved preference first
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && isValidLanguage(savedLanguage)) {
      selectLanguage(savedLanguage)
      return
    }
  }

  // Fall back to browser language or default
  const browserLanguage = getUserLanguage()
  const initialLanguage = browserLanguage || props.defaultLanguage
  selectLanguage(initialLanguage)
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.language-selector')) {
    closeDropdown()
  }
}

// Lifecycle
onMounted(() => {
  initializeLanguage()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Watch for prop changes
watch(() => props.defaultLanguage, (newLanguage) => {
  if (isValidLanguage(newLanguage)) {
    selectLanguage(newLanguage)
  }
})
</script>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
}

/* Dropdown animations */
.language-selector .absolute {
  animation: dropdownFadeIn 0.2s ease-out;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button hover effects */
.language-selector button {
  transition: all 0.2s ease;
}

.language-selector button:hover {
  transform: translateY(-1px);
}

.language-selector button:active {
  transform: translateY(0);
}

/* Compact mode adjustments */
.language-selector.compact {
  position: relative;
}

.language-selector.compact .absolute {
  right: 0;
  left: auto;
}

/* Focus styles for accessibility */
.language-selector button:focus-visible {
  outline: 2px solid #ea580c;
  outline-offset: 2px;
}

/* Custom select styling for toggle mode */
.language-selector select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .language-selector .absolute {
    width: 100%;
    min-width: auto;
  }
}

/* Compact mode mobile adjustments */
@media (max-width: 640px) {
  .language-selector.compact .absolute {
    right: 0;
    left: auto;
    width: 280px;
  }
}

/* Button mode responsive */
@media (max-width: 480px) {
  .language-selector .flex.flex-wrap.gap-2 {
    justify-content: center;
  }
  
  .language-selector .flex.flex-wrap.gap-2 button {
    flex: 1;
    min-width: 0;
  }
}
</style>