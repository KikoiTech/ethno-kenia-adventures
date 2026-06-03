import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  if (!id) throw createError({ statusCode: 400, statusMessage: 'Inquiry ID is required' })
  if (!body.template_slug) throw createError({ statusCode: 400, statusMessage: 'template_slug is required' })
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

  // Fetch inquiry with trip details
  const { data: inquiry, error: inqError } = await supabaseAdmin
    .from('inquiries')
    .select('*, trips(title)')
    .eq('id', id)
    .single()

  if (inqError || !inquiry) throw createError({ statusCode: 404, statusMessage: 'Inquiry not found' })

  // Fetch template
  const { data: template, error: tplError } = await supabaseAdmin
    .from('email_templates')
    .select('subject, body_html')
    .eq('slug', body.template_slug)
    .single()

  if (tplError || !template) throw createError({ statusCode: 404, statusMessage: `Template "${body.template_slug}" not found` })

  // Replace placeholders
  const tripTitle = inquiry.trips?.title ?? ''
  const replace = (str: string) => str
    .replace(/\{\{first_name\}\}/g, inquiry.first_name ?? '')
    .replace(/\{\{last_name\}\}/g,  inquiry.last_name  ?? '')
    .replace(/\{\{trip_title\}\}/g, tripTitle)
    .replace(/\{\{message\}\}/g,    inquiry.message    ?? '')

  const subject  = replace(template.subject)
  const bodyHtml = replace(template.body_html)

  if (!config.smtpHost || !config.smtpUser || !config.smtpPass) {
    console.warn('[send-email] SMTP not configured — email not sent')
    return { success: true, simulated: true }
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost as string,
    port: Number(config.smtpPort || 465),
    secure: Number(config.smtpPort) === 465,
    auth: { user: config.smtpUser as string, pass: config.smtpPass as string },
    tls: { rejectUnauthorized: false },
  })

  await transporter.sendMail({
    from: `"Ethno Kenia Adventures" <${config.smtpUser}>`,
    to: inquiry.email,
    subject,
    html: bodyHtml,
  })

  return { success: true }
})
