import { createClient } from '@supabase/supabase-js'
import { createHash } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const rawToken = query.token as string

  if (!rawToken) {
    throw createError({ statusCode: 400, statusMessage: 'Token is required' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  const tokenHash = createHash('sha256').update(rawToken).digest('hex')

  const { data: reset } = await supabaseAdmin
    .from('admin_password_resets')
    .select('user_id, expires_at, used_at')
    .eq('token_hash', tokenHash)
    .maybeSingle()

  if (!reset) {
    throw createError({ statusCode: 404, statusMessage: 'Reset link not found' })
  }

  if (reset.used_at) {
    throw createError({ statusCode: 410, statusMessage: 'This reset link has already been used' })
  }

  if (new Date(reset.expires_at) < new Date()) {
    throw createError({ statusCode: 410, statusMessage: 'This reset link has expired' })
  }

  // Return the email for display on the reset form
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('email')
    .eq('id', reset.user_id)
    .maybeSingle()

  return { email: profile?.email ?? '' }
})
