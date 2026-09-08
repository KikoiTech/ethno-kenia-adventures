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
    throw createError({ statusCode: 403, statusMessage: 'Only super admins can change roles' })
  }

  // ── 2. Validate ──────────────────────────────────────────────────────────
  const targetId = getRouterParam(event, 'id')
  const body = await readBody(event)
  const { role } = body

  if (!['admin', 'super_admin'].includes(role)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid role' })
  }

  if (targetId === user.id) {
    throw createError({ statusCode: 400, statusMessage: 'You cannot change your own role' })
  }

  // ── 3. Update role ───────────────────────────────────────────────────────
  const { error: updateError } = await supabaseAdmin
    .from('profiles').update({ role }).eq('id', targetId)

  if (updateError) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to update role' })
  }

  // ── 4. Audit log ─────────────────────────────────────────────────────────
  await supabaseAdmin.from('audit_logs').insert({
    admin_id: user.id, action: 'CHANGE_ROLE', target_id: targetId,
    details: { new_role: role },
  })

  return { success: true }
})
