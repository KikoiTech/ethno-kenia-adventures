import type { SafariPackage } from '~/types/safari-package'

/**
 * Package data loader utility
 * Centralizes all JSON loading logic for safari packages
 */

// Available package slugs
const PACKAGE_SLUGS = [
  'savannah-sky',
  'beach-safari', 
  'great-migration',
  'mountain-climbing',
  'primate-encounter'
] as const

/**
 * Load all safari packages using Nuxt's $fetch
 * @returns Promise<SafariPackage[]> - Array of all packages
 */
export async function getAllPackages(): Promise<SafariPackage[]> {
  try {
    const packagePromises = PACKAGE_SLUGS.map(async (slug) => {
      try {
        // Use $fetch to get JSON files from public directory
        const packageData = await $fetch<SafariPackage>(`/data/safari-packages/${slug}.json`)
        return packageData
      } catch (error) {
        console.warn(`Failed to load package ${slug}:`, error)
        return null
      }
    })

    const results = await Promise.allSettled(packagePromises)
    
    return results
      .map((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          return result.value
        } else {
          console.warn(`Package ${PACKAGE_SLUGS[index]} failed to load`)
          return null
        }
      })
      .filter((pkg): pkg is SafariPackage => pkg !== null)
      
  } catch (error) {
    console.error('Error loading packages:', error)
    return []
  }
}

/**
 * Load a single safari package by slug using Nuxt's $fetch
 * @param slug - Package slug (e.g., 'savannah-sky')
 * @returns Promise<SafariPackage | null> - Single package or null if not found
 */
export async function getPackageBySlug(slug: string): Promise<SafariPackage | null> {
  try {
    // Use $fetch to get JSON file from public directory
    const packageData = await $fetch<SafariPackage>(`/data/safari-packages/${slug}.json`)
    return packageData
  } catch (error) {
    console.error(`Failed to load package ${slug}:`, error)
    return null
  }
}

/**
 * Get available package slugs
 * @returns string[] - Array of available package slugs
 */
export function getPackageSlugs(): string[] {
  return [...PACKAGE_SLUGS]
}

/**
 * Load all safaris from the central safaris.json
 * @returns Promise<SafariPackage[]> - Array of all safaris
 */
export async function getSafaris(): Promise<SafariPackage[]> {
  try {
    const safaris = await $fetch<SafariPackage[]>('/data/safaris.json')
    return safaris || []
  } catch (error) {
    console.error('Error loading safaris:', error)
    return []
  }
}

/**
 * Get a single safari by slug from safaris.json
 */
export async function getSafariBySlug(slug: string): Promise<SafariPackage | null> {
  const safaris = await getSafaris()
  return safaris.find(s => s.slug === slug) || null
}

/**
 * Check if a package slug exists
 */
export function packageExists(slug: string): boolean {
  return PACKAGE_SLUGS.includes(slug as any)
}
