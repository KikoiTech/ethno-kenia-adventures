// TypeScript interfaces for Safari Packages system

export interface SafariPackage {
  id: string | number
  slug?: string
  title: string | MultiLanguageText
  shortTitle?: string | MultiLanguageText
  description: string | MultiLanguageText
  snippet?: string | MultiLanguageText
  duration: string
  difficulty?: string
  category: string
  country?: string[]
  countryCode?: string
  type?: string
  tags?: string[]
  location?: string
  pace?: string
  popular?: number
  featured?: number
  price: number | PackagePricing
  image?: string
  featuredImage?: string
  gallery?: string[]
  itinerary?: any[]
  includes?: string[]
  excludes?: string[]
  highlights?: MultiLanguageText[]
  included?: MultiLanguageText[]
  excluded?: MultiLanguageText[]
  availability: {
    yearRound: boolean
    bestTime: string[]
    minGroupSize: number
    maxGroupSize: number
  }
  requirements: {
    minAge: number
    fitnessLevel: string
    medical: {
      vaccinations: string[]
      recommendations: string[]
    }
  }
  bookingInfo: {
    deposit: number
    cancellationPolicy: string
    paymentMethods: string[]
    contact: {
      email: string
      phone: string
      whatsapp: string
    }
  }
}

export interface MultiLanguageText {
  en: string
  es?: string
  fr?: string
  de?: string
  zh?: string
  ja?: string
  sw?: string
}

export interface PackagePricing {
  USD: number
  EUR?: number
  GBP?: number
  KES?: number
  seasonal?: {
    peak?: number
    offPeak?: number
  }
}

export interface ItineraryDay {
  day: number
  title: MultiLanguageText
  description: MultiLanguageText
  activities: MultiLanguageText[]
  meals: ('breakfast' | 'lunch' | 'dinner')[]
  accommodation: MultiLanguageText
  location?: string
  notes?: MultiLanguageText
}

export interface PackageAvailability {
  seats: number
  booked: number
  availableDates: string[]
  nextAvailableDate?: string
}

export interface BookingFormData {
  packageId: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    nationality: string
    dateOfBirth?: string
    passportNumber?: string
  }
  travelPreferences: {
    preferredDates: string[]
    flexibleDates: boolean
    groupSize: number
    ages: number[]
    specialRequirements: string
  }
  accommodation: {
    preference: 'standard' | 'comfort' | 'luxury'
    dietaryRestrictions: string
    additionalActivities: string[]
  }
  submitDate: string
  status: 'pending' | 'contacted' | 'confirmed' | 'cancelled'
}

export interface CurrencyRates {
  [currency: string]: number
}

export interface TranslationCache {
  [key: string]: {
    [language: string]: string
  }
}

export interface PackageFilterOptions {
  category?: string[]
  difficulty?: string[]
  duration?: string[]
  priceRange?: {
    min: number
    max: number
  }
  groupSize?: number
}

// Utility types for component props
export interface PackageCardProps {
  package: SafariPackage
  currency?: string
  language?: string
  showPrice?: boolean
  compact?: boolean
}

export interface ItineraryTimelineProps {
  itinerary: ItineraryDay[]
  language?: string
  showAccommodation?: boolean
  showActivities?: boolean
}

export interface BookingFormProps {
  packageId: string
  packageData: SafariPackage
  language?: string
  currency?: string
}

export interface CurrencyConverterProps {
  amount: number
  fromCurrency: string
  toCurrency: string
  showSymbol?: boolean
}

export interface LanguageSelectorProps {
  currentLanguage: string
  availableLanguages: string[]
  onLanguageChange: (language: string) => void
}

// API Response types
export interface CurrencyApiResponse {
  rates: CurrencyRates
  base: string
  date: string
}

export interface TranslationApiResponse {
  translatedText: string
  sourceLanguage: string
  targetLanguage: string
}

// Error types
export interface SafariPackageError {
  code: string
  message: string
  details?: any
}

// Component state types
export interface PackageCardState {
  isHovered: boolean
  imageLoaded: boolean
  priceLoading: boolean
}

export interface BookingFormState {
  isSubmitting: boolean
  submitted: boolean
  errors: Record<string, string>
  currentStep: number
}

// Navigation types
export interface BreadcrumbItem {
  label: string
  href: string
  active?: boolean
}

export interface PackageNavigationState {
  currentPackage?: string
  previousPage?: string
  breadcrumbs: BreadcrumbItem[]
}
