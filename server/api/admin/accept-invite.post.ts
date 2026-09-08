import { createClient } from '@supabase/supabase-js'
import { createHash } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const { token: rawToken, full_name, password } = body

  if (!rawToken || !full_name || !password) {
    throw createError({ statusCode: 400, statusMessage: 'token, full_name, and password are required' })
  }

  if (String(full_name).trim().length < 2) {
    throw createError({ statusCode: 400, statusMessage: 'Full name is too short' })
  }

  if (String(password).length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'Password must be at least 8 characters' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  // ── 1. Validate token ────────────────────────────────────────────────────
  const tokenHash = createHash('sha256').update(rawToken).digest('hex')

  const { data: invitation } = await supabaseAdmin
    .from('admin_invitations')
    .select('id, email, role, expires_at, used_at')
    .eq('token_hash', tokenHash)
    .maybeSingle()

  if (!invitation) {
    throw createError({ statusCode: 404, statusMessage: 'Invitation not found' })
  }

  if (invitation.used_at) {
    throw createError({ statusCode: 410, statusMessage: 'Invitation has already been used' })
  }

  if (new Date(invitation.expires_at) < new Date()) {
    throw createError({ statusCode: 410, statusMessage: 'Invitation has expired' })
  }

  // ── 2. Create Supabase Auth user ─────────────────────────────────────────
  const { data: authData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
    email:         invitation.email,
    password,
    email_confirm: true,
  })

  if (createUserError) {
    if (createUserError.message?.includes('already been registered')) {
      throw createError({ statusCode: 409, statusMessage: 'An account with this email already exists. Contact a super admin.' })
    }
    throw createError({ statusCode: 400, statusMessage: createUserError.message })
  }

  const newUserId = authData.user.id

  // ── 3. Insert / update profiles row ─────────────────────────────────────
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert({
      id:        newUserId,
      email:     invitation.email,
      full_name: String(full_name).trim(),
      role:      invitation.role,
    }, { onConflict: 'id' })

  if (profileError) {
    console.error('[accept-invite] profiles upsert failed:', profileError)
    throw createError({ statusCode: 500, statusMessage: 'Account created but profile setup failed. Contact a super admin.' })
  }

  // ── 4. Mark invitation as used ───────────────────────────────────────────
  await supabaseAdmin
    .from('admin_invitations')
    .update({ used_at: new Date().toISOString() })
    .eq('id', invitation.id)

  return { success: true }
})
