import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  console.log('[PUT /api/admin/tours/:id] hit — id:', id)
  console.log('[PUT /api/admin/tours/:id] supabaseUrl defined:', !!config.public.supabaseUrl)
  console.log('[PUT /api/admin/tours/:id] supabaseServiceKey defined:', !!config.supabaseServiceKey)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Tour ID is required' })
  }

  if (!config.public.supabaseUrl || !config.supabaseServiceKey) {
    console.error('[PUT /api/admin/tours/:id] Missing Supabase credentials in runtimeConfig')
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error: missing Supabase credentials' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  const payload = {
    title:          String(body.title ?? ''),
    short_title:    String(body.short_title ?? ''),
    slug:           String(body.slug ?? ''),
    snippet:        String(body.snippet ?? ''),
    description:    String(body.description ?? ''),
    price:          body.price !== null && body.price !== undefined && body.price !== '' ? Number(body.price) : null,
    duration:       String(body.duration ?? ''),
    location:       String(body.location ?? ''),
    country:        Array.isArray(body.country) ? body.country : (body.country ? [String(body.country)] : []),
    country_code:   String(body.country_code ?? ''),
    type:           String(body.type ?? ''),
    category:       String(body.category ?? ''),
    featured_image: String(body.featured_image ?? ''),
    gallery:        Array.isArray(body.gallery)   ? body.gallery   : [],
    itinerary:      Array.isArray(body.itinerary) ? body.itinerary : [],
    includes:       Array.isArray(body.includes)  ? body.includes  : [],
    excludes:       Array.isArray(body.excludes)  ? body.excludes  : [],
    tags:           Array.isArray(body.tags)      ? body.tags      : [],
    is_active:      Boolean(body.is_active),
    is_featured:    Boolean(body.is_featured),
    is_popular:     Boolean(body.is_popular),
  }

  console.log('[PUT /api/admin/tours/:id] payload:', payload)

  const { error } = await supabaseAdmin
    .from('trips')
    .update(payload)
    .eq('id', id)

  if (error) {
    console.error('[PUT /api/admin/tours/:id] Supabase error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    })
    throw createError({ statusCode: 400, statusMessage: `${error.message} | details: ${error.details} | hint: ${error.hint}` })
  }

  console.log('[PUT /api/admin/tours/:id] update successful for id:', id)
  return { success: true }
})
