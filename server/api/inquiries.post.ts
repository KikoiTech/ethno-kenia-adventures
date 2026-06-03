import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

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

  // Send admin alert email
  try {
    const smtpPort = Number(config.smtpPort || 465)
    const transporter = nodemailer.createTransport({
      host: config.smtpHost as string,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: config.smtpUser as string,
        pass: config.smtpPass as string,
      },
    })

    const tripInfo = payload.trip_id ? ` – ${payload.trip_id}` : ''
    const adminHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #eee;">
        <h2 style="color:#c4714e;">New Inquiry Received</h2>
        <p><strong>Name:</strong> ${payload.first_name} ${payload.last_name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Phone:</strong> ${payload.phone ?? 'N/A'}</p>
        ${payload.travel_date ? `<p><strong>Travel date:</strong> ${payload.travel_date}</p>` : ''}
        ${payload.adults_count ? `<p><strong>Guests:</strong> ${payload.adults_count} adult(s), ${payload.children_count ?? 0} child(ren)</p>` : ''}
        ${payload.message ? `<p><strong>Message:</strong></p><p>${String(payload.message).replace(/\n/g, '<br>')}</p>` : ''}
      </div>
    `

    await transporter.sendMail({
      from: `"Ethno Kenia Website" <${config.smtpUser}>`,
      to: config.adminEmail,
      subject: `New inquiry received${tripInfo}`,
      html: adminHtml,
    })
  } catch (emailErr) {
    console.error('[POST /api/inquiries] Email send error:', emailErr)
    // Don't throw - inquiry was saved successfully, email failure shouldn't block the response
  }

  return { success: true, id: data.id }
})
