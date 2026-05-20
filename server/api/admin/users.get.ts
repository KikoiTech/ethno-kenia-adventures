// server/api/admin/users.get.ts
// Lists all users with admin/super_admin roles.
// Uses the service_role key (never exposed to the browser).

import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  // Build a server-side Supabase client using the service_role key
  const supabaseAdmin = createClient(
    config.public.supabaseUrl as string,
    config.supabaseServiceKey as string, // Set SUPERBASE_SERVICE_KEY in .env
  )

  try {
    // Fetch all profiles with admin roles
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, email, role, created_at')
      .in('role', ['admin', 'super_admin'])
      .order('created_at', { ascending: false })

    if (error) throw error

    return { users: data }
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: err.message || 'Failed to fetch admin users',
    })
  }
})
