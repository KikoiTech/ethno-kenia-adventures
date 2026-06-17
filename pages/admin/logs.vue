<script setup lang="ts">
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  ChevronRight,
  Clock,
  User,
  Zap,
  Eye
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const { isSuperAdmin } = useAdmin()
const supabase = useSupabase()

onMounted(() => {
  if (!isSuperAdmin.value) {
    navigateTo('/admin/dashboard')
  }
})

const logs = ref<any[]>([])
const isLoading = ref(true)

async function fetchLogs() {
  isLoading.value = true
  try {
    // Assuming an 'audit_logs' table exists or we join with profiles
    const { data, error } = await supabase
      .from('audit_logs')
      .select(`
        *,
        profiles (full_name, role)
      `)
      .order('created_at', { ascending: false })
      .limit(50)
    
    if (error) throw error
    logs.value = data
  } catch (err) {
    console.error('Audit logs fetch failed:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchLogs)

function getActionColor(action: string) {
  if (action.includes('Delete')) return 'text-red-400'
  if (action.includes('Create') || action.includes('Add')) return 'text-emerald-400'
  if (action.includes('Update') || action.includes('Edit')) return 'text-blue-400'
  return 'text-orange-400'
}
</script>

<template>
  <div class="logs-page" v-if="isSuperAdmin">
    <header class="page-header">
      <div class="title-wrap">
        <h1 class="text-2xl font-bold">Audit Logs</h1>
        <p class="text-muted text-sm">Monitor system changes and administrative actions.</p>
      </div>
      <div class="header-actions">
        <button class="refresh-btn" @click="fetchLogs">
          <Zap class="w-4 h-4" />
          <span>Live Feed</span>
        </button>
      </div>
    </header>

    <div class="logs-feed">
      <div v-if="isLoading" v-for="i in 5" :key="i" class="log-skeleton" />
      
      <div v-else-if="logs.length === 0" class="empty-logs">
        <ShieldCheck class="w-12 h-12 opacity-10 mb-4" />
        <p>No audit logs recorded yet.</p>
      </div>

      <div v-else class="logs-list">
        <div v-for="log in logs" :key="log.id" class="log-item">
          <div class="log-time">
            <Clock class="w-3.5 h-3.5" />
            <span>{{ new Date(log.created_at).toLocaleTimeString() }}</span>
            <span class="date">{{ new Date(log.created_at).toLocaleDateString() }}</span>
          </div>

          <div class="log-main">
            <div class="log-user">
              <User class="w-4 h-4 opacity-40" />
              <span class="font-semibold">{{ log.profiles?.full_name || 'System' }}</span>
              <span class="user-role">{{ log.profiles?.role }}</span>
            </div>

            <div class="log-action">
              <span :class="getActionColor(log.action)">{{ log.action }}</span>
              <ChevronRight class="w-3 h-3 opacity-20" />
              <span class="target">{{ log.target_name || 'Object #' + log.target_id?.slice(0, 8) }}</span>
            </div>
          </div>

          <button class="view-diff-btn">
            <Eye class="w-4 h-4" />
            <span>View Changes</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.text-muted {
  color: rgba(240, 232, 220, 0.4);
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #10b981;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.logs-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.log-item {
  display: flex;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  gap: 2rem;
  transition: all 0.2s;
}

.log-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.log-time {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: #e8e2d9;
  min-width: 100px;
}

.log-time .date {
  font-size: 0.7rem;
  color: rgba(240, 232, 220, 0.3);
}

.log-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.log-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.user-role {
  font-size: 0.65rem;
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  color: rgba(240, 232, 220, 0.4);
}

.log-action {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.target {
  color: rgba(240, 232, 220, 0.5);
}

.view-diff-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(240, 232, 220, 0.6);
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
}

.view-diff-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #e8e2d9;
}

.log-skeleton {
  height: 80px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  margin-bottom: 0.75rem;
  animation: pulse 1.5s infinite;
}

.empty-logs {
  text-align: center;
  padding: 5rem;
  color: rgba(240, 232, 220, 0.2);
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}
</style>
