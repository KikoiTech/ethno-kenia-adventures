import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')
  const body = await readBody(event)

  if (!slug) throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
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

  const payload: Record<string, any> = {
    slug,
    subject:   String(body.subject   ?? ''),
    body_html: String(body.body_html  ?? ''),
  }

  if (body.name !== undefined)  payload.name  = String(body.name)

  const { error } = await supabaseAdmin
    .from('email_templates')
    .upsert(payload, { onConflict: 'slug' })

  if (error) {
    console.error('[PUT /api/admin/templates/:slug]', error)
    throw createError({ statusCode: 400, statusMessage: error.message })
  }

  return { success: true }
})
