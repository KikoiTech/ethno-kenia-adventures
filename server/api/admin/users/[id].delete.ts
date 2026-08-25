import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  if (!config.public.supabaseUrl || !config.supabaseServiceKey) {
    throw createError({ statusCode: 500, statusMessage: 'Server configuration error' })
  }

  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  // ── 1. Verify Bearer token + super_admin ────────────────────────────────
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  const sessionToken = authHeader.slice(7)
  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(sessionToken)
  if (authError || !user) throw createError({ statusCode: 401, statusMessage: 'Invalid session' })

  const { data: callerProfile } = await supabaseAdmin
    .from('profiles').select('role').eq('id', user.id).single()
  if (callerProfile?.role !== 'super_admin') {
    throw createError({ statusCode: 403, statusMessage: 'Only super admins can remove team members' })
  }

  // ── 2. Guard: cannot remove yourself ────────────────────────────────────
  const targetId = getRouterParam(event, 'id')

  if (targetId === user.id) {
    throw createError({ statusCode: 400, statusMessage: 'You cannot remove yourself from the team' })
  }

  // ── 3. Delete from profiles (revokes admin access, preserves auth user) ─
  const { error: deleteError } = await supabaseAdmin
    .from('profiles').delete().eq('id', targetId)

  if (deleteError) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to remove admin' })
  }

  // ── 4. Audit log ─────────────────────────────────────────────────────────
  await supabaseAdmin.from('audit_logs').insert({
    admin_id: user.id, action: 'REMOVE_ADMIN', target_id: targetId,
  })

  return { success: true }
})
