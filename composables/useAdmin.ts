import { ref, onMounted } from 'vue'

export const useAdmin = () => {
  const supabase = useSupabase()
  const profile = useState('admin_profile', () => null)
  const loading = ref(false)
  const error = ref(null)

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
    } catch (err) {
      console.error('Error fetching admin profile:', err)
      error.value = err.message
    } finally {
      loading.value = false
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
    signOut,
    isAdmin: computed(() => profile.value?.role === 'admin' || profile.value?.role === 'super_admin'),
    isSuperAdmin: computed(() => profile.value?.role === 'super_admin')
  }
}
