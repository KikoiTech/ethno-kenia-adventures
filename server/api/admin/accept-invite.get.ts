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

  const { data: invitation, error } = await supabaseAdmin
    .from('admin_invitations')
    .select('email, role, expires_at, used_at')
    .eq('token_hash', tokenHash)
    .maybeSingle()

  if (error || !invitation) {
    throw createError({ statusCode: 404, statusMessage: 'Invitation not found' })
  }

  if (invitation.used_at) {
    throw createError({ statusCode: 410, statusMessage: 'Invitation has already been used' })
  }

  if (new Date(invitation.expires_at) < new Date()) {
    throw createError({ statusCode: 410, statusMessage: 'Invitation has expired' })
  }

  return { email: invitation.email, role: invitation.role }
})
