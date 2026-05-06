import type { SafariPackage } from '~/types/safari-package'
import { useSupabase } from './supabase'

/**
 * Helper to map snake_case DB fields to camelCase frontend fields
 */
function mapSafari(item: any): SafariPackage {
  if (!item) return item
  
  return {
    ...item,
    shortTitle: item.short_title || item.shortTitle,
    countryCode: item.country_code || item.countryCode,
    featuredImage: item.featured_image || item.featuredImage,
    featured: item.is_featured,
    popular: item.is_popular,
  } as SafariPackage
}

/**
 * Load all safaris from Supabase
 */
export async function getSafaris(): Promise<SafariPackage[]> {
  const supabase = useSupabase()
  
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .order('is_featured', { ascending: false })
      .order('is_popular', { ascending: false })

    if (error) throw error
    
    console.log('Supabase Fetch:', { count: data?.length, firstItem: data?.[0] })
    
    return (data || []).map(mapSafari)
  } catch (error) {
    console.error('Error fetching safaris from Supabase:', error)
    return []
  }
}

/**
 * Get a single safari by slug from Supabase
 */
export async function getSafariBySlug(slug: string): Promise<SafariPackage | null> {
  const supabase = useSupabase()
  
  try {
    // Try to find by slug first
    let { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    // If not found by slug and slug looks like an ID, try by ID
    if (!data && !error && !isNaN(Number(slug))) {
      const { data: idData, error: idError } = await supabase
        .from('trips')
        .select('*')
        .eq('id', Number(slug))
        .maybeSingle()
      
      data = idData
      error = idError
    }

    if (error) throw error
    
    return data ? mapSafari(data) : null
  } catch (error) {
    console.error(`Error fetching safari by slug (${slug}):`, error)
    return null
  }
}

export async function getPackageBySlug(slug: string): Promise<SafariPackage | null> {
  return getSafariBySlug(slug)
}

export async function getAllPackages(): Promise<SafariPackage[]> {
  return getSafaris()
}

export async function getPackageSlugs(): Promise<string[]> {
  const safaris = await getSafaris()
  return safaris.map(s => s.slug || String(s.id))
}