import type { TranslationCache, TranslationApiResponse, SafariPackageError, MultiLanguageText } from '~/types/safari-package'

// Translation API configuration
const TRANSLATION_API_BASE = 'https://translation.googleapis.com/language/translate/v2'
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

// Supported languages
export const SUPPORTED_LANGUAGES = {
  en: { name: 'English', code: 'en', locale: 'en-US' },
  es: { name: 'Español', code: 'es', locale: 'es-ES' },
  fr: { name: 'Français', code: 'fr', locale: 'fr-FR' },
  de: { name: 'Deutsch', code: 'de', locale: 'de-DE' },
  zh: { name: '中文', code: 'zh', locale: 'zh-CN' },
  ja: { name: '日本語', code: 'ja', locale: 'ja-JP' }
} as const

type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

// Translation cache
let translationCache: TranslationCache = {}

/**
 * Gets text in the specified language from MultiLanguageText object
 */
export function getText(
  text: string | MultiLanguageText | undefined,
  language: string = 'en'
): string {
  if (!text) return ''
  if (typeof text === 'string') return text
  
  // Return text in requested language if available
  const translatedText = (text as any)[language as SupportedLanguage]
  if (translatedText) {
    return translatedText
  }
  
  // Fallback to English
  const englishText = text.en
  if (englishText) {
    return englishText
  }
  
  // Fallback to first available language
  const availableLanguages = Object.keys(text)
  if (availableLanguages.length > 0) {
    const firstLanguage = availableLanguages[0] as SupportedLanguage
    const firstText = text[firstLanguage]
    if (firstText) {
      return firstText
    }
  }
  
  // Last resort
  return 'Text not available'
}

/**
 * Translates text using Google Translate API or cache
 */
export async function translateText(
  text: string,
  targetLanguage: string = 'en',
  sourceLanguage: string = 'auto'
): Promise<{ translatedText: string; error?: SafariPackageError }> {
  try {
    // Check if translation is needed
    if (sourceLanguage === targetLanguage) {
      return { translatedText: text }
    }

    // Generate cache key
    const cacheKey = `${sourceLanguage}:${targetLanguage}:${text.substring(0, 100)}`
    
    // Check cache first
    if (translationCache[cacheKey]) {
      const cachedTranslation = translationCache[cacheKey][targetLanguage]
      if (cachedTranslation) {
        return { translatedText: cachedTranslation }
      }
    }

    // For demo purposes, we'll use a mock translation service
    // In production, you'd integrate with Google Translate API
    const translatedText = await mockTranslate(text, targetLanguage, sourceLanguage)
    
    // Update cache
    translationCache[cacheKey] = {
      [targetLanguage]: translatedText
    }
    
    return { translatedText }
  } catch (error) {
    return {
      translatedText: text,
      error: {
        code: 'TRANSLATION_ERROR',
        message: 'Translation failed',
        details: error
      }
    }
  }
}

/**
 * Mock translation function for development
 * In production, replace with actual Google Translate API call
 */
async function mockTranslate(
  text: string,
  targetLanguage: string,
  sourceLanguage: string
): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  // Mock translations for common safari-related terms
  const mockTranslations: Record<string, Record<string, string>> = {
    'The Great Migration': {
      es: 'La Gran Migración',
      fr: 'La Grande Migration',
      de: 'Die Große Migration',
      zh: '大迁徙',
      ja: '大移動'
    },
    'Mountain Climbing': {
      es: 'Escalada de Montaña',
      fr: 'Escalade de Montagne',
      de: 'Bergsteigen',
      zh: '登山',
      ja: '登山'
    },
    'Savannah & Sky': {
      es: 'Sabana y Cielo',
      fr: 'Savane et Ciel',
      de: 'Savanne und Himmel',
      zh: '稀树草原与天空',
      ja: 'サバンナと空'
    },
    'Primate Encounter': {
      es: 'Encuentro con Primates',
      fr: 'Rencontre avec les Primates',
      de: 'Begegnung mit Primaten',
      zh: '灵长类动物邂逅',
      ja: '霊長類との遭遇'
    },
    'Beach Safari': {
      es: 'Safari de Playa',
      fr: 'Safari de Plage',
      de: 'Strand-Safari',
      zh: '海滩游猎',
      ja: 'ビーチサファリ'
    },
    'Duration': {
      es: 'Duración',
      fr: 'Durée',
      de: 'Dauer',
      zh: '持续时间',
      ja: '期間'
    },
    'Price': {
      es: 'Precio',
      fr: 'Prix',
      de: 'Preis',
      zh: '价格',
      ja: '価格'
    },
    'Book Now': {
      es: 'Reservar Ahora',
      fr: 'Réserver Maintenant',
      de: 'Jetzt Buchen',
      zh: '立即预订',
      ja: '今すぐ予約'
    }
  }
  
  // Check if we have a mock translation
  if (mockTranslations[text] && mockTranslations[text][targetLanguage]) {
    return mockTranslations[text][targetLanguage]
  }
  
  // Return original text if no mock translation available
  return text
}

/**
 * Translates an entire MultiLanguageText object
 */
export async function translateMultiLanguageText(
  text: MultiLanguageText,
  targetLanguage: string
): Promise<MultiLanguageText> {
  const translatedText: MultiLanguageText = { ...text }
  
  // Find a source language that has text
  const sourceLanguage = Object.keys(text).find(lang => text[lang as SupportedLanguage]) || 'en'
  const sourceText = text[sourceLanguage as SupportedLanguage]
  
  if (sourceText && !text[targetLanguage as SupportedLanguage]) {
    const result = await translateText(sourceText, targetLanguage, sourceLanguage)
    if (!result.error) {
      translatedText[targetLanguage as SupportedLanguage] = result.translatedText
    }
  }
  
  return translatedText
}

/**
 * Gets the user's preferred language from browser or localStorage
 */
export function getUserLanguage(): string {
  // Check localStorage first
  if (typeof window !== 'undefined') {
    const storedLanguage = localStorage.getItem('preferred-language')
    if (storedLanguage && isValidLanguage(storedLanguage)) {
      return storedLanguage
    }
    
    // Check browser language
    const browserLanguage = navigator.language.split('-')[0]
    if (browserLanguage && isValidLanguage(browserLanguage)) {
      return browserLanguage
    }
  }
  
  // Default to English
  return 'en'
}

/**
 * Sets the user's preferred language
 */
export function setUserLanguage(language: string): void {
  if (typeof window !== 'undefined' && isValidLanguage(language)) {
    localStorage.setItem('preferred-language', language)
  }
}

/**
 * Validates if a language code is supported
 */
export function isValidLanguage(language: string): boolean {
  return Object.keys(SUPPORTED_LANGUAGES).includes(language)
}

/**
 * Gets language display name
 */
export function getLanguageName(language: string): string {
  const langConfig = SUPPORTED_LANGUAGES[language as SupportedLanguage]
  return langConfig ? langConfig.name : language
}

/**
 * Gets language locale for formatting
 */
export function getLanguageLocale(language: string): string {
  const langConfig = SUPPORTED_LANGUAGES[language as SupportedLanguage]
  return langConfig ? langConfig.locale : 'en-US'
}

/**
 * Clears translation cache
 */
export function clearTranslationCache(): void {
  translationCache = {}
}

/**
 * Gets translation cache information for debugging
 */
export function getTranslationCacheInfo(): {
  cacheSize: number
  cachedKeys: string[]
} {
  return {
    cacheSize: Object.keys(translationCache).length,
    cachedKeys: Object.keys(translationCache)
  }
}

/**
 * Formats date according to language
 */
export function formatDate(
  date: Date | string,
  language: string = 'en'
): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const locale = getLanguageLocale(language)
    
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return String(date)
  }
}

/**
 * Formats number according to language
 */
export function formatNumber(
  number: number,
  language: string = 'en'
): string {
  try {
    const locale = getLanguageLocale(language)
    return number.toLocaleString(locale)
  } catch (error) {
    return String(number)
  }
}

/**
 * Gets all supported languages for display
 */
export function getSupportedLanguages(): Array<{
  code: string
  name: string
  locale: string
}> {
  return Object.entries(SUPPORTED_LANGUAGES).map(([code, config]) => ({
    code,
    name: config.name,
    locale: config.locale
  }))
}

/**
 * Translates array of texts in batch
 */
export async function translateBatch(
  texts: string[],
  targetLanguage: string,
  sourceLanguage: string = 'en'
): Promise<Array<{ original: string; translated: string; error?: SafariPackageError }>> {
  const results = await Promise.all(
    texts.map(async (text) => {
      const result = await translateText(text, targetLanguage, sourceLanguage)
      return {
        original: text,
        translated: result.translatedText,
        error: result.error
      }
    })
  )
  
  return results
}

/**
 * Creates a translation key for caching
 */
export function createTranslationKey(
  sourceLanguage: string,
  targetLanguage: string,
  text: string
): string {
  return `${sourceLanguage}:${targetLanguage}:${text.substring(0, 100)}`
}