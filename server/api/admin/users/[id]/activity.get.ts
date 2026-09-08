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
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  // ── 2. Fetch last 5 audit log entries for the target user ────────────────
  const targetId = getRouterParam(event, 'id')

  const { data, error } = await supabaseAdmin
    .from('audit_logs')
    .select('id, action, target_id, details, created_at')
    .eq('admin_id', targetId)
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to load activity' })
  }

  return { activity: data ?? [] }
})
