import type { CurrencyRates, CurrencyApiResponse, SafariPackageError } from '~/types/safari-package'

// Currency API configuration
const CURRENCY_API_BASE = 'https://api.exchangerate-api.com/v4/latest'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// Comprehensive global currency support - All world currencies
const GLOBAL_CURRENCIES: CurrencyRates = {
  // Major Global Currencies
  USD: 1, // US Dollar
  EUR: 0.85, // Euro
  GBP: 0.73, // British Pound
  JPY: 110.2, // Japanese Yen
  CNY: 6.45, // Chinese Yuan
  INR: 83.12, // Indian Rupee
  AUD: 1.35, // Australian Dollar
  CAD: 1.25, // Canadian Dollar
  CHF: 0.92, // Swiss Franc
  SEK: 10.45, // Swedish Krona
  NOK: 10.23, // Norwegian Krone
  DKK: 6.87, // Danish Krone
  NZD: 1.62, // New Zealand Dollar
  SGD: 1.35, // Singapore Dollar
  HKD: 7.83, // Hong Kong Dollar
  KRW: 1321.45, // South Korean Won
  MXN: 17.85, // Mexican Peso
  BRL: 5.25, // Brazilian Real
  ZAR: 18.75, // South African Rand
  RUB: 91.23, // Russian Ruble
  TRY: 27.85, // Turkish Lira
  
  // African Currencies
  KES: 115.5, // Kenyan Shilling
  NGN: 461.25, // Nigerian Naira
  GHS: 12.15, // Ghanaian Cedi
  EGP: 30.85, // Egyptian Pound
  MAD: 9.85, // Moroccan Dirham
  TZS: 2330.45, // Tanzanian Shilling
  UGX: 3725.15, // Ugandan Shilling
  RWF: 1285.35, // Rwandan Franc
  BWP: 13.45, // Botswana Pula
  ZMW: 24.85, // Zambian Kwacha
  MZN: 64.15, // Mozambican Metical
  NAD: 18.75, // Namibian Dollar
  SZL: 18.75, // Swazi Lilangeni
  LSL: 18.75, // Lesotho Loti
  SCR: 13.45, // Seychelles Rupee
  CDF: 2750.85, // Congolese Franc
  BIF: 2845.25, // Burundian Franc
  DJF: 177.85, // Djiboutian Franc
  ERN: 15.25, // Eritrean Nakfa
  SOS: 585.15, // Somali Shilling
  SDG: 45.25, // Sudanese Pound
  LYD: 4.85, // Libyan Dinar
  TND: 3.15, // Tunisian Dinar
  DZD: 135.25, // Algerian Dinar
  MRU: 37.85, // Mauritanian Ouguiya
  MRO: 3.75, // Mauritanian Ouguiya
  
  // Middle Eastern Currencies
  ILS: 3.65, // Israeli New Shekel
  JOD: 0.71, // Jordanian Dinar
  SAR: 3.75, // Saudi Riyal
  QAR: 3.64, // Qatari Riyal
  BHD: 0.38, // Bahraini Dinar
  KWD: 0.31, // Kuwaiti Dinar
  OMR: 0.38, // Omani Rial
  AED: 3.67, // UAE Dirham
  YER: 250.35, // Yemeni Rial
  IQD: 1309.85, // Iraqi Dinar
  AFN: 88.45, // Afghan Afghani
  PKR: 285.15, // Pakistani Rupee
  LBP: 15075.25, // Lebanese Pound
  SYP: 2512.85, // Syrian Pound
  
  // Asian Currencies
  THB: 35.65, // Thai Baht
  VND: 23425.35, // Vietnamese Dong
  MYR: 4.65, // Malaysian Ringgit
  IDR: 15675.25, // Indonesian Rupiah
  PHP: 56.45, // Philippine Peso
  LKR: 325.85, // Sri Lankan Rupee
  NPR: 132.85, // Nepalese Rupee
  BTN: 88.45, // Bhutanese Ngultrum
  MVR: 15.45, // Maldivian Rufiyaa
  BDT: 117.25, // Bangladeshi Taka
  MMK: 2100.85, // Myanmar Kyat
  KHR: 4105.25, // Cambodian Riel
  LAK: 21545.25, // Laotian Kip
  MNT: 3385.25, // Mongolian Tugrik
  KZT: 425.15, // Kazakhstani Tenge
  KGS: 89.45, // Kyrgyzstani Som
  UZS: 10985.25, // Uzbekistani Som
  TJS: 10.95, // Tajikistani Somoni
  AMD: 395.25, // Armenian Dram
  GEL: 2.75, // Georgian Lari
  AZN: 1.70, // Azerbaijani Manat
  
  // European Currencies
  PLN: 4.15, // Polish Zloty
  CZK: 22.85, // Czech Koruna
  HUF: 355.25, // Hungarian Forint
  RON: 4.65, // Romanian Leu
  BGN: 1.85, // Bulgarian Lev
  HRK: 7.25, // Croatian Kuna
  RSD: 105.25, // Serbian Dinar
  BAM: 1.85, // Bosnia Mark
  MKD: 61.25, // Macedonian Denar
  ALL: 92.25, // Albanian Lek
  ISK: 137.25, // Icelandic Krona
  BYN: 2.65, // Belarusian Ruble
  
  // American Currencies
  ARS: 365.25, // Argentine Peso
  CLP: 875.25, // Chilean Peso
  COP: 4250.25, // Colombian Peso
  PEN: 3.85, // Peruvian Sol
  BOB: 6.95, // Bolivian Boliviano
  PYG: 7350.25, // Paraguayan Guarani
  UYU: 39.25, // Uruguayan Peso
  VEF: 4.45, // Venezuelan Bolívar
  CRC: 545.25, // Costa Rican Colón
  GTQ: 7.85, // Guatemalan Quetzal
  HNL: 24.85, // Honduran Lempira
  NIO: 36.85, // Nicaraguan Córdoba
  SVC: 8.75, // Salvadoran Colón
  XCD: 2.70, // East Caribbean Dollar
  BBD: 2.00, // Barbadian Dollar
  BSD: 1.00, // Bahamian Dollar
  BZD: 2.00, // Belize Dollar
  JMD: 155.25, // Jamaican Dollar
  KYD: 0.83, // Cayman Islands Dollar
  TTD: 6.75, // Trinidad and Tobago Dollar
  XPF: 110.25, // CFP Franc
  
  // Oceanian Currencies
  FJD: 2.25, // Fijian Dollar
  PGK: 3.85, // Papua New Guinean Kina
  VUV: 120.25, // Vanuatu Vatu
  WST: 2.75, // Samoan Tala
  TOP: 2.35, // Tongan Paʻanga
  SBD: 8.45, // Solomon Islands Dollar
  NRU: 1.35, // Nauru Australian Dollar
  KIR: 1.35, // Kiribati Australian Dollar
  TVD: 1.35, // Tuvalu Australian Dollar
  FKP: 0.80, // Falkland Islands Pound
  SHP: 0.80, // Saint Helena Pound
  
  // Special and Historical Currencies
  BTC: 0.000023, // Bitcoin
  ETH: 0.00032, // Ethereum
  XAU: 0.00053, // Gold Ounce
  XAG: 0.021, // Silver Ounce
  XPT: 0.00095, // Platinum Ounce
  XPD: 0.00045, // Palladium Ounce
}

// Cache for currency rates
let currencyCache: {
  rates: CurrencyRates
  timestamp: number
  base: string
} | null = null

/**
 * Fetches currency rates from API or returns cached data
 */
export async function getCurrencyRates(baseCurrency: string = 'USD'): Promise<CurrencyRates> {
  try {
    // Check cache first
    if (currencyCache && 
        currencyCache.base === baseCurrency && 
        Date.now() - currencyCache.timestamp < CACHE_DURATION) {
      return currencyCache.rates
    }

    // Fetch from API
    const response = await fetch(`${CURRENCY_API_BASE}/${baseCurrency}`)
    
    if (!response.ok) {
      throw new Error(`Currency API request failed: ${response.status}`)
    }

    const data: CurrencyApiResponse = await response.json()
    
    // Update cache
    currencyCache = {
      rates: data.rates,
      timestamp: Date.now(),
      base: data.base
    }

    return data.rates
  } catch (error) {
    console.warn('Currency API failed, using fallback rates:', error)
    
    // Return fallback rates with base currency adjustment
    if (baseCurrency === 'USD') {
      return GLOBAL_CURRENCIES
    }
    
    // Convert fallback rates to requested base currency
    const baseRate = GLOBAL_CURRENCIES[baseCurrency]
    if (!baseRate) {
      throw new Error(`Unsupported base currency: ${baseCurrency}`)
    }
    
    const adjustedRates: CurrencyRates = {}
    Object.entries(GLOBAL_CURRENCIES).forEach(([currency, rate]) => {
      adjustedRates[currency] = (rate as number) / baseRate
    })
    
    return adjustedRates
  }
}

/**
 * Converts amount from one currency to another
 */
export async function convertCurrency(
  amount: number,
  fromCurrency: string = 'USD',
  toCurrency: string = 'USD'
): Promise<{ amount: number; rate: number; error?: SafariPackageError }> {
  try {
    // Same currency, no conversion needed
    if (fromCurrency === toCurrency) {
      return {
        amount,
        rate: 1
      }
    }

    const rates = await getCurrencyRates(fromCurrency)
    const rate = rates[toCurrency]
    
    if (!rate) {
      return {
        amount,
        rate: 1,
        error: {
          code: 'UNSUPPORTED_CURRENCY',
          message: `Currency ${toCurrency} is not supported`
        }
      }
    }

    const convertedAmount = amount * rate
    
    return {
      amount: Math.round(convertedAmount * 100) / 100, // Round to 2 decimal places
      rate
    }
  } catch (error) {
    return {
      amount,
      rate: 1,
      error: {
        code: 'CONVERSION_ERROR',
        message: 'Currency conversion failed',
        details: error
      }
    }
  }
}

/**
 * Formats currency amount with proper symbol and decimal places
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  } catch (error) {
    // Fallback formatting if Intl.NumberFormat fails
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      KES: 'KSh',
      JPY: '¥',
      CNY: '¥',
      CAD: 'C$',
      AUD: 'A$'
    }
    
    const symbol = symbols[currency] || currency
    return `${symbol}${amount.toLocaleString()}`
  }
}

/**
 * Gets currency symbol for display
 */
export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    KES: 'KSh',
    JPY: '¥',
    CNY: '¥',
    CAD: 'C$',
    AUD: 'A$'
  }
  
  return symbols[currency] || currency
}

/**
 * Validates currency code
 */
export function isValidCurrency(currency: string): boolean {
  return Object.keys(GLOBAL_CURRENCIES).includes(currency.toUpperCase())
}

/**
 * Clears currency cache (useful for testing or manual refresh)
 */
export function clearCurrencyCache(): void {
  currencyCache = null
}

/**
 * Gets cache information for debugging
 */
export function getCurrencyCacheInfo(): {
  hasCachedData: boolean
  cacheAge: number | null
  baseCurrency: string | null
} {
  if (!currencyCache) {
    return {
      hasCachedData: false,
      cacheAge: null,
      baseCurrency: null
    }
  }
  
  return {
    hasCachedData: true,
    cacheAge: Date.now() - currencyCache.timestamp,
    baseCurrency: currencyCache.base
  }
}

/**
 * Converts package pricing to different currencies
 */
export async function convertPackagePricing(
  pricing: Record<string, number>,
  targetCurrency: string = 'USD'
): Promise<Record<string, number>> {
  const convertedPricing: Record<string, number> = {}
  
  for (const [currency, price] of Object.entries(pricing)) {
    const result = await convertCurrency(price, currency, targetCurrency)
    convertedPricing[currency] = result.amount
  }
  
  return convertedPricing
}

/**
 * Gets supported currencies list
 */
export function getSupportedCurrencies(): Array<{
  code: string
  name: string
  symbol: string
}> {
  return [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
  ]
}