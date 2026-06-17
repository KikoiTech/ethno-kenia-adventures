// middleware/admin-auth.ts
// Protects all /admin/* routes (except /admin/login)
export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') return

  const supabase = useSupabase()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return navigateTo('/admin/login')
  }

  // Check the profiles table for admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
    await supabase.auth.signOut()
    return navigateTo('/admin/login')
  }
})
