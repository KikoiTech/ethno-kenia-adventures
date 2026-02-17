import type { SafariPackage } from '~/types/safari-package'
// 1. Ensure this path is correct. If it's in assets/data, use ~/assets/data/...
import safariPackages from '~/public/data/safaris.json'

/**
 * Load all safaris from the already imported safariPackages variable.
 * Because it is imported at the top, it is bundled with the app and
 * works perfectly on hard-refreshes.
 */
export async function getSafaris(): Promise<SafariPackage[]> {
  try {
    // We cast it as SafariPackage[] to ensure type safety
    return (safariPackages as unknown as SafariPackage[]) || []
  } catch (error) {
    console.error('Error returning safaris:', error)
    return []
  }
}

/**
 * Get a single safari by slug from the imported data
 */
export async function getSafariBySlug(slug: string): Promise<SafariPackage | null> {
  const safaris = await getSafaris()
  return safaris.find(s => s.slug === slug || s.id.toString() === slug) || null
}

/**
 * LEGACY/INDIVIDUAL FILE LOADING
 * If you still want to fetch individual .json files from the public folder,
 * you MUST use a full URL or keep them in assets. 
 * But for your refresh bug, using the 'safariPackages' import above is the fix.
 */
export async function getPackageBySlug(slug: string): Promise<SafariPackage | null> {
  // Instead of $fetch, use the already imported list
  return getSafariBySlug(slug)
}

export async function getAllPackages(): Promise<SafariPackage[]> {
  return getSafaris()
}

export function getPackageSlugs(): string[] {
  return safariPackages.map(s => s.slug)
}