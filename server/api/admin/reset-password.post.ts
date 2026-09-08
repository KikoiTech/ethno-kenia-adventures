import { createClient } from '@supabase/supabase-js'
import { createHash } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { token: rawToken, password } = body

  if (!rawToken || !password) {
    throw createError({ statusCode: 400, statusMessage: 'token and password are required' })
  }

  if (String(password).length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'Password must be at least 8 characters' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  const tokenHash = createHash('sha256').update(rawToken).digest('hex')

  const { data: reset } = await supabaseAdmin
    .from('admin_password_resets')
    .select('id, user_id, expires_at, used_at')
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

  // ── Update password via admin API ────────────────────────────────────────
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
    reset.user_id,
    { password: String(password) }
  )

  if (updateError) {
    throw createError({ statusCode: 400, statusMessage: updateError.message })
  }

  // ── Mark token as used ───────────────────────────────────────────────────
  await supabaseAdmin
    .from('admin_password_resets')
    .update({ used_at: new Date().toISOString() })
    .eq('id', reset.id)

  return { success: true }
})
