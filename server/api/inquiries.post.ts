import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  if (!config.public.supabaseUrl || !config.supabaseServiceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  const payload = {
    trip_id:        body.trip_id   || null,
    first_name:     String(body.first_name  ?? '').trim(),
    last_name:      String(body.last_name   ?? '').trim(),
    email:          String(body.email       ?? '').trim(),
    phone:          body.phone     ? String(body.phone).trim() : null,
    travel_date:    body.travel_date || null,
    adults_count:   body.adults_count   != null ? Number(body.adults_count)   : 1,
    children_count: body.children_count != null ? Number(body.children_count) : 0,
    message:        body.message   ? String(body.message).trim() : null,
    status:         'new',
  }

  if (!payload.first_name || !payload.email) {
    throw createError({ statusCode: 400, statusMessage: 'first_name and email are required' })
  }

  const { data, error } = await supabaseAdmin
    .from('inquiries')
    .insert([payload])
    .select('id')
    .single()

  if (error) {
    console.error('[POST /api/inquiries] Supabase error:', error)
    throw createError({ statusCode: 400, statusMessage: error.message })
  }

  return { success: true, id: data.id }
})
