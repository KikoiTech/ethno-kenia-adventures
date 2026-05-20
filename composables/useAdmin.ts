import { ref, computed } from 'vue'

export const useAdmin = () => {
  const supabase = useSupabase()
  const profile = useState('admin_profile', () => null as any)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAdmin = computed(() => profile.value?.role === 'admin' || profile.value?.role === 'super_admin')
  const isSuperAdmin = computed(() => profile.value?.role === 'super_admin')

  async function fetchProfile() {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      profile.value = null
      return
    }

    loading.value = true
    try {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileError) throw profileError
      profile.value = data
    } catch (err: any) {
      console.error('Error fetching admin profile:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  /**
   * Write an entry to the audit_logs table.
   * Call this after any significant DB mutation (create/update/delete).
   * @param action - e.g. 'CREATE_TOUR', 'DELETE_BOOKING', 'UPDATE_STATUS'
   * @param targetId - UUID of the affected row
   * @param details - Optional JSON payload with before/after context
   */
  async function logAction(action: string, targetId: string, details?: Record<string, any>) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      await supabase.from('audit_logs').insert({
        admin_id: user.id,
        action,
        target_id: targetId,
        details: details ?? {},
      })
    } catch (err) {
      // Silently fail — audit failures should never block the primary action
      console.warn('Audit log failed:', err)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    profile.value = null
    navigateTo('/admin/login')
  }

  return {
    profile,
    loading,
    error,
    fetchProfile,
    logAction,
    signOut,
    isAdmin,
    isSuperAdmin,
  }
}
