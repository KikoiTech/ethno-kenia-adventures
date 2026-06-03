import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id) throw createError({ statusCode: 400, statusMessage: 'Inquiry ID is required' })
  if (!config.public.supabaseUrl || !config.supabaseServiceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  // Verify admin session
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const token = authHeader.slice(7)
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
  if (authError || !user) throw createError({ statusCode: 401, statusMessage: 'Invalid session' })

  // Fetch the inquiry
  const { data: inquiry, error: fetchError } = await supabaseAdmin
    .from('inquiries')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !inquiry) throw createError({ statusCode: 404, statusMessage: 'Inquiry not found' })

  // trip_id comes from the inquiry itself, or from body for custom bookings
  const tripId = inquiry.trip_id ?? body.trip_id ?? null
  if (!tripId) throw createError({ statusCode: 400, statusMessage: 'A trip must be linked to create a booking' })

  // Insert booking
  const { data: booking, error: bookingError } = await supabaseAdmin
    .from('bookings')
    .insert([{
      trip_id:              tripId,
      first_name:           inquiry.first_name,
      last_name:            inquiry.last_name,
      email:                inquiry.email,
      phone:                inquiry.phone,
      travel_date:          inquiry.travel_date,
      adults_count:         inquiry.adults_count,
      children_count:       inquiry.children_count,
      message:              inquiry.message,
      original_inquiry_id:  inquiry.id,
      status:               'confirmed',
    }])
    .select('id')
    .single()

  if (bookingError) {
    console.error('[convert] booking insert error:', bookingError)
    throw createError({ statusCode: 400, statusMessage: bookingError.message })
  }

  // Mark inquiry as converted
  await supabaseAdmin
    .from('inquiries')
    .update({ status: 'converted_to_booking' })
    .eq('id', id)

  return { success: true, booking_id: booking.id }
})
