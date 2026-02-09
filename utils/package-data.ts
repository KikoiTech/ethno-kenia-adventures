import type { 
  SafariPackage, 
  PackageFilterOptions, 
  MultiLanguageText,
  BookingFormData,
  PackageAvailability 
} from '~/types/safari-package'
import { getText } from '~/utils/translation-api'

/**
 * Loads all safari packages from data files
 */
export async function loadAllPackages(): Promise<SafariPackage[]> {
  try {
    // In a real implementation, this would load from JSON files
    // For now, we'll return the package data structure
    const packages: SafariPackage[] = []
    
    // Load each package file
    const packageIds = [
      'great-migration',
      'mountain-climbing', 
      'savannah-sky',
      'primate-encounter',
      'beach-safari'
    ]
    
    for (const packageId of packageIds) {
      try {
        const packageData = await import(`~/data/safari-packages/${packageId}.json`)
        packages.push(packageData.default)
      } catch (error) {
        console.warn(`Failed to load package: ${packageId}`, error)
      }
    }
    
    return packages
  } catch (error) {
    console.error('Error loading packages:', error)
    return []
  }
}

/**
 * Loads a single safari package by ID
 */
export async function loadPackageById(id: string): Promise<SafariPackage | null> {
  try {
    const packageData = await import(`~/data/safari-packages/${id}.json`)
    return packageData.default
  } catch (error) {
    console.error(`Failed to load package: ${id}`, error)
    return null
  }
}

/**
 * Filters packages based on provided criteria
 */
export function filterPackages(
  packages: SafariPackage[],
  filters: PackageFilterOptions
): SafariPackage[] {
  return packages.filter(safariPackage => {
    // Category filter
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(safariPackage.category)) {
        return false
      }
    }
    
    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
      if (!filters.difficulty.includes(safariPackage.difficulty)) {
        return false
      }
    }
    
    // Duration filter (simple string matching for now)
    if (filters.duration && filters.duration.length > 0) {
      const durationMatch = filters.duration.some(duration => 
        safariPackage.duration.toLowerCase().includes(duration.toLowerCase())
      )
      if (!durationMatch) {
        return false
      }
    }
    
    // Price range filter
    if (filters.priceRange) {
      const basePrice = safariPackage.price.USD
      if (basePrice < filters.priceRange.min || basePrice > filters.priceRange.max) {
        return false
      }
    }
    
    // Group size filter
    if (filters.groupSize) {
      if (filters.groupSize < safariPackage.availability.minGroupSize || filters.groupSize > safariPackage.availability.maxGroupSize) {
        return false
      }
    }
    
    return true
  })
}

/**
 * Sorts packages by various criteria
 */
export function sortPackages(
  packages: SafariPackage[],
  sortBy: 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc' | 'name' | 'popularity'
): SafariPackage[] {
  const sorted = [...packages]
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price.USD - b.price.USD)
    
    case 'price-desc':
      return sorted.sort((a, b) => b.price.USD - a.price.USD)
    
    case 'duration-asc':
      return sorted.sort((a, b) => {
        const aDays = extractDurationDays(a.duration)
        const bDays = extractDurationDays(b.duration)
        return aDays - bDays
      })
    
    case 'duration-desc':
      return sorted.sort((a, b) => {
        const aDays = extractDurationDays(a.duration)
        const bDays = extractDurationDays(b.duration)
        return bDays - aDays
      })
    
    case 'name':
      return sorted.sort((a, b) => {
        const aName = getText(a.title, 'en').toLowerCase()
        const bName = getText(b.title, 'en').toLowerCase()
        return aName.localeCompare(bName)
      })
    
    case 'popularity':
      // For now, sort by availability (fewer max group size = more exclusive)
      return sorted.sort((a, b) => {
        const aAvailability = a.availability.maxGroupSize
        const bAvailability = b.availability.maxGroupSize
        return aAvailability - bAvailability
      })
    
    default:
      return sorted
  }
}

/**
 * Extracts numeric duration from duration string
 */
function extractDurationDays(duration: string): number {
  const match = duration?.match(/(\d+)/)
  return match && match[1] ? parseInt(match[1]) : 0
}

/**
 * Gets package availability status
 */
export function getPackageAvailability(safariPackage: SafariPackage): {
  status: 'available' | 'limited' | 'sold-out'
  availableSeats: number
  percentageBooked: number
} {
  // Since we don't have actual booking data, we'll simulate availability
  const maxGroupSize = safariPackage.availability.maxGroupSize
  const minGroupSize = safariPackage.availability.minGroupSize
  
  // Simulate some availability logic
  const availableSeats = maxGroupSize
  const percentageBooked = 0 // No actual booking data available
  
  let status: 'available' | 'limited' | 'sold-out'
  
  if (availableSeats === 0) {
    status = 'sold-out'
  } else if (percentageBooked > 80) {
    status = 'limited'
  } else {
    status = 'available'
  }
  
  return {
    status,
    availableSeats,
    percentageBooked
  }
}

/**
 * Gets package difficulty level with description
 */
export function getPackageDifficulty(safariPackage: SafariPackage): {
  level: string
  description: MultiLanguageText
  color: string
} {
  const difficulties = {
    easy: {
      level: 'Easy',
      description: {
        en: 'Suitable for all fitness levels',
        es: 'Adecuado para todos los niveles de condición física',
        fr: 'Adapté à tous les niveaux de forme physique'
      },
      color: 'green'
    },
    moderate: {
      level: 'Moderate',
      description: {
        en: 'Requires moderate fitness level',
        es: 'Requiere un nivel de condición física moderado',
        fr: 'Nécessite un niveau de forme physique modéré'
      },
      color: 'yellow'
    },
    challenging: {
      level: 'Challenging',
      description: {
        en: 'Requires excellent fitness level',
        es: 'Requiere un excelente nivel de condición física',
        fr: 'Nécessite un excellent niveau de forme physique'
      },
      color: 'red'
    }
  }
  
  return difficulties[safariPackage.difficulty as keyof typeof difficulties] || {
    level: 'Moderate',
    description: {
      en: 'Requires moderate fitness level',
      es: 'Requiere un nivel de condición física moderado',
      fr: 'Nécessite un niveau de forme physique modéré'
    },
    color: 'yellow'
  }
}

/**
 * Gets package category with icon and description
 */
export function getPackageCategory(safariPackage: SafariPackage): {
  name: string
  icon: string
  description: MultiLanguageText
} {
  const categories = {
    'great-migration': {
      name: 'Great Migration',
      icon: '🦁',
      description: {
        en: 'Witness the world\'s greatest wildlife spectacle',
        es: 'Presenciar el mayor espectáculo de vida silvestre del mundo',
        fr: 'Assistez au plus grand spectacle animalier du monde'
      }
    },
    'mountain-climbing': {
      name: 'Mountain Climbing',
      icon: '⛰️',
      description: {
        en: 'Conquer Africa\'s highest peaks',
        es: 'Conquista las cimas más altas de África',
        fr: 'Conquise les plus hauts sommets d\'Afrique'
      }
    },
    'savannah-sky': {
      name: 'Savannah & Sky',
      icon: '🎈',
      description: {
        en: 'Experience the magic of hot air ballooning',
        es: 'Experimenta la magia del globo aerostático',
        fr: 'Découvrez la magie de la montgolfière'
      }
    },
    'primate-encounter': {
      name: 'Primate Encounter',
      icon: '🐒',
      description: {
        en: 'Get up close with our closest relatives',
        es: 'Acércate a nuestros parientes más cercanos',
        fr: 'Approchez nos plus proches parents'
      }
    },
    'beach-safari': {
      name: 'Beach Safari',
      icon: '🏖️',
      description: {
        en: 'Combine wildlife with coastal relaxation',
        es: 'Combina vida silvestre con relajación costera',
        fr: 'Alliez faune sauvage et détente côtière'
      }
    }
  }
  
  return categories[safariPackage.id as keyof typeof categories] || {
    name: 'Safari Package',
    icon: '🦁',
    description: {
      en: 'Experience the magic of African wildlife',
      es: 'Experimenta la magia de la vida silvestre africana',
      fr: 'Découvrez la magie de la faune africaine'
    }
  }
}

/**
 * Validates booking form data
 */
export function validateBookingForm(data: Partial<BookingFormData>): {
  isValid: boolean
  errors: Record<string, string>
} {
  const errors: Record<string, string> = {}
  
  // Personal info validation
  if (!data.personalInfo?.firstName?.trim()) {
    errors.firstName = 'First name is required'
  }
  
  if (!data.personalInfo?.lastName?.trim()) {
    errors.lastName = 'Last name is required'
  }
  
  if (!data.personalInfo?.email?.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(data.personalInfo.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!data.personalInfo?.phone?.trim()) {
    errors.phone = 'Phone number is required'
  }
  
  if (!data.personalInfo?.nationality?.trim()) {
    errors.nationality = 'Nationality is required'
  }
  
  // Travel preferences validation
  if (!data.travelPreferences?.preferredDates || data.travelPreferences.preferredDates.length === 0) {
    errors.preferredDates = 'At least one preferred date is required'
  }
  
  if (!data.travelPreferences?.groupSize || data.travelPreferences.groupSize < 1) {
    errors.groupSize = 'Group size must be at least 1'
  }
  
  // Package validation
  if (!data.packageId?.trim()) {
    errors.packageId = 'Package selection is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

/**
 * Validates email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Creates booking submission data
 */
export function createBookingSubmission(data: BookingFormData): {
  id: string
  timestamp: string
  data: BookingFormData
} {
  return {
    id: generateBookingId(),
    timestamp: new Date().toISOString(),
    data
  }
}

/**
 * Generates unique booking ID
 */
function generateBookingId(): string {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2, 8)
  return `KS${timestamp}${random}`.toUpperCase()
}

/**
 * Calculates package price with seasonal adjustments
 */
export function calculatePackagePrice(
  safariPackage: SafariPackage,
  travelDate: string,
  groupSize: number = 1
): {
  basePrice: number
  totalPrice: number
  perPersonPrice: number
  seasonalAdjustment: number
  groupDiscount: number
} {
  const basePrice = safariPackage.price.USD
  let seasonalAdjustment = 0
  let groupDiscount = 0
  
  // Check for seasonal pricing
  if (safariPackage.price.seasonal) {
    const date = new Date(travelDate)
    const month = date.getMonth() + 1 // 1-12
    
    // Peak season (June-September for most safaris)
    if (month >= 6 && month <= 9) {
      if (safariPackage.price.seasonal.peak) {
        seasonalAdjustment = safariPackage.price.seasonal.peak - basePrice
      }
    }
    // Off-peak season (March-May, October-November)
    else if ((month >= 3 && month <= 5) || (month >= 10 && month <= 11)) {
      if (safariPackage.price.seasonal.offPeak) {
        seasonalAdjustment = safariPackage.price.seasonal.offPeak - basePrice
      }
    }
  }
  
  // Group discount (5% for 4+ people, 10% for 8+ people)
  if (groupSize >= 8) {
    groupDiscount = 0.1
  } else if (groupSize >= 4) {
    groupDiscount = 0.05
  }
  
  const adjustedPrice = basePrice + seasonalAdjustment
  const discountedPrice = adjustedPrice * (1 - groupDiscount)
  const totalPrice = discountedPrice * groupSize
  
  return {
    basePrice,
    totalPrice,
    perPersonPrice: discountedPrice,
    seasonalAdjustment,
    groupDiscount
  }
}

/**
 * Gets package highlights as formatted list
 */
export function getPackageHighlights(safariPackage: SafariPackage, language: string = 'en'): string[] {
  return safariPackage.highlights.map(highlight => getText(highlight, language))
}

/**
 * Gets package inclusions/exclusions as formatted lists
 */
export function getPackageIncludes(safariPackage: SafariPackage, language: string = 'en'): string[] {
  return safariPackage.included.map((item: MultiLanguageText) => getText(item, language))
}

export function getPackageExcludes(safariPackage: SafariPackage, language: string = 'en'): string[] {
  return safariPackage.excluded.map((item: MultiLanguageText) => getText(item, language))
}

/**
 * Searches packages by text query
 */
export function searchPackages(packages: SafariPackage[], query: string): SafariPackage[] {
  if (!query.trim()) {
    return packages
  }
  
  const searchTerm = query.toLowerCase().trim()
  
  return packages.filter(safariPackage => {
    // Search in title
    const title = getText(safariPackage.title, 'en').toLowerCase()
    if (title.includes(searchTerm)) {
      return true
    }
    
    // Search in description
    const description = getText(safariPackage.description, 'en').toLowerCase()
    if (description.includes(searchTerm)) {
      return true
    }
    
    // Search in highlights
    const highlights = safariPackage.highlights.map(h => getText(h, 'en')).join(' ').toLowerCase()
    if (highlights.includes(searchTerm)) {
      return true
    }
    
    // Search in category
    const category = getPackageCategory(safariPackage).name.toLowerCase()
    if (category.includes(searchTerm)) {
      return true
    }
    
    return false
  })
}

/**
 * Gets related packages based on category and price
 */
export function getRelatedPackages(
  currentSafariPackage: SafariPackage,
  allPackages: SafariPackage[],
  limit: number = 3
): SafariPackage[] {
  // Exclude current package
  const otherPackages = allPackages.filter(p => p.id !== currentSafariPackage.id)
  
  // Sort by relevance (same category first, then similar price)
  const sorted = otherPackages.sort((a, b) => {
    // Same category gets priority
    if (a.category === currentSafariPackage.category && b.category !== currentSafariPackage.category) {
      return -1
    }
    if (b.category === currentSafariPackage.category && a.category !== currentSafariPackage.category) {
      return 1
    }
    
    // Then by price similarity
    const aPriceDiff = Math.abs(a.price.USD - currentSafariPackage.price.USD)
    const bPriceDiff = Math.abs(b.price.USD - currentSafariPackage.price.USD)
    
    return aPriceDiff - bPriceDiff
  })
  
  return sorted.slice(0, limit)
}