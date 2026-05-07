<script setup lang="ts">
const { profile, loading, fetchProfile, isAdmin } = useAdmin()
const supabase = useSupabase()

// Handle authentication and profile fetching
onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return navigateTo('/admin/login')
  }
  
  if (!profile.value) {
    await fetchProfile()
  }
  
  // Final check: if logged in but not an admin, kick them out
  if (!loading.value && !isAdmin.value) {
    await supabase.auth.signOut()
    return navigateTo('/admin/login')
  }
})

// Watch auth state changes
onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT' || !session) {
      navigateTo('/admin/login')
    }
  })
})
</script>

<template>
  <div class="admin-layout">
    <div v-if="loading" class="loading-overlay">
      <div class="spinner" />
      <p>Initializing Secure Dashboard...</p>
    </div>

    <template v-else-if="isAdmin">
      <AdminSidebar />
      <main class="admin-main">
        <header class="admin-header">
          <div class="header-breadcrumb">
            <span class="text-muted">Admin</span>
            <span class="mx-2 text-muted">/</span>
            <span class="capitalize">{{ $route.path.split('/').pop()?.replace('-', ' ') }}</span>
          </div>
          
          <div class="header-actions">
            <!-- Global search or notifications could go here -->
          </div>
        </header>
        
        <div class="admin-content">
          <slot />
        </div>
      </main>
    </template>
    
    <div v-else class="denied-state">
      <!-- This will briefly show if navigateTo hasn't finished -->
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #090e0a; /* Slightly darker than sidebar */
  color: #e8e2d9;
  font-family: 'Inter', sans-serif;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.admin-header {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background: rgba(13, 22, 16, 0.5);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-breadcrumb {
  font-size: 0.85rem;
  font-weight: 500;
}

.text-muted {
  color: rgba(240, 232, 220, 0.4);
}

.admin-content {
  padding: 2rem;
  flex: 1;
}

.loading-overlay {
  position: fixed;
  inset: 0;
  background: #0d1610;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: 100;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(240, 232, 220, 0.1);
  border-top-color: #c4714e;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.denied-state {
  flex: 1;
  background: #0d1610;
}
</style>
