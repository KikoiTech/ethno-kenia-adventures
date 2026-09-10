import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!config.public.supabaseUrl || !config.supabaseServiceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error: missing Supabase credentials' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  // Verify the caller is an authenticated admin
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const token = authHeader.slice(7)
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
  if (authError || !user) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid session' })
  }

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

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
    activity_type:  String(body.activityType ?? ''),
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

  const { data, error } = await supabaseAdmin
    .from('trips')
    .insert([payload])
    .select('id')
    .single()

  if (error) {
    throw createError({ statusCode: 400, statusMessage: `${error.message} | details: ${error.details} | hint: ${error.hint}` })
  }

  return { success: true, id: data.id }
})
