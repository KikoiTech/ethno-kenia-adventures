<script setup lang="ts">
import { 
  Users, 
  UserPlus, 
  Shield, 
  ShieldAlert, 
  Mail, 
  Trash2,
  MoreVertical
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin'
})

const { isSuperAdmin } = useAdmin()
const supabase = useSupabase()

// Redirect if not super admin
onMounted(() => {
  if (!isSuperAdmin.value) {
    navigateTo('/admin/dashboard')
  }
})

const admins = ref([])
const isLoading = ref(true)
const showInviteModal = ref(false)
const inviteEmail = ref('')
const inviteRole = ref('admin')

async function fetchAdmins() {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .in('role', ['admin', 'super_admin'])
      .order('created_at', { ascending: false })
    
    if (error) throw error
    admins.value = data
  } catch (err) {
    toast.error('Failed to load team', { description: err.message })
  } finally {
    isLoading.value = false
  }
}

async function handleInvite() {
  if (!inviteEmail.value) return
  
  toast.info('Sending invitation...', { description: `Inviting ${inviteEmail.value} as ${inviteRole.value}` })
  
  try {
    // In a real app, this would call a server-side route that uses the service role key
    // For now, we'll simulate or use a custom function if defined in Supabase
    const { error } = await supabase.rpc('invite_admin', { 
      email: inviteEmail.value, 
      role: inviteRole.value 
    })

    if (error) throw error

    toast.success('Invitation sent!', { description: 'The user will receive an email to join.' })
    showInviteModal.value = false
    inviteEmail.value = ''
  } catch (err) {
    toast.error('Invitation failed', { description: 'This feature requires a server-side helper. Ensure the invite_admin RPC or edge function is set up.' })
  }
}

onMounted(fetchAdmins)
</script>

<template>
  <div class="team-page" v-if="isSuperAdmin">
    <header class="page-header">
      <div class="title-wrap">
        <h1 class="text-2xl font-bold">Team Management</h1>
        <p class="text-muted text-sm">Manage administrator access and permissions.</p>
      </div>
      <button class="add-btn" @click="showInviteModal = true">
        <UserPlus class="w-4 h-4" />
        <span>Invite Admin</span>
      </button>
    </header>

    <div class="data-card">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Admin Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" v-for="i in 3" :key="i">
              <td colspan="5"><div class="skeleton-row" /></td>
            </tr>
            <tr v-for="admin in admins" :key="admin.id">
              <td>
                <div class="admin-user">
                  <div class="admin-avatar">{{ admin.full_name?.charAt(0) }}</div>
                  <span class="font-semibold">{{ admin.full_name }}</span>
                </div>
              </td>
              <td>
                <div class="cell-icon-text">
                  <Mail class="w-3.5 h-3.5 opacity-40" />
                  <span>{{ admin.email || 'N/A' }}</span>
                </div>
              </td>
              <td>
                <div :class="['role-badge', admin.role === 'super_admin' ? 'role--super' : 'role--admin']">
                  <component :is="admin.role === 'super_admin' ? ShieldAlert : Shield" class="w-3 h-3" />
                  <span>{{ admin.role?.replace('_', ' ') }}</span>
                </div>
              </td>
              <td class="text-muted text-sm">
                {{ new Date(admin.created_at).toLocaleDateString() }}
              </td>
              <td class="text-right">
                <button class="icon-btn">
                  <MoreVertical class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Invite Modal -->
    <Transition name="fade">
      <div v-if="showInviteModal" class="modal-overlay" @click.self="showInviteModal = false">
        <div class="modal-card">
          <h2 class="modal-title">Invite New Administrator</h2>
          <p class="modal-desc">Send an email invitation to a new team member.</p>
          
          <div class="modal-form">
            <div class="input-group">
              <label class="form-label">Email Address</label>
              <input v-model="inviteEmail" type="email" placeholder="colleague@ethnokenya.com" class="form-input" />
            </div>

            <div class="input-group">
              <label class="form-label">System Role</label>
              <select v-model="inviteRole" class="form-select">
                <option value="admin">Admin (Tours, Bookings, Inquiries)</option>
                <option value="super_admin">Super Admin (Full System Access)</option>
              </select>
            </div>

            <div class="modal-actions">
              <button class="cancel-btn" @click="showInviteModal = false">Cancel</button>
              <button class="confirm-btn" @click="handleInvite">Send Invitation</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
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

.add-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.5rem;
  background: #c4714e;
  color: white;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}

.data-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

.table-wrap { width: 100%; overflow-x: auto; }

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  color: rgba(240, 232, 220, 0.4);
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.data-table td {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.admin-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-avatar {
  width: 32px;
  height: 32px;
  background: rgba(196, 113, 78, 0.2);
  color: #c4714e;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.cell-icon-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.role--super { background: rgba(162, 80, 53, 0.2); color: #dfab90; border: 1px solid rgba(162, 80, 53, 0.3); }
.role--admin { background: rgba(61, 74, 61, 0.2); color: #9ec89e; border: 1px solid rgba(61, 74, 61, 0.3); }

.icon-btn {
  background: none;
  border: none;
  color: rgba(240, 232, 220, 0.3);
  cursor: pointer;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-card {
  width: 100%;
  max-width: 450px;
  background: #0d1610;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.5);
}

.modal-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
.modal-desc { font-size: 0.85rem; color: rgba(240, 232, 220, 0.4); margin-bottom: 2rem; }

.modal-form { display: flex; flex-direction: column; gap: 1.5rem; }

.input-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-label { font-size: 0.8rem; font-weight: 600; color: rgba(240, 232, 220, 0.6); }

.form-input, .form-select {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #e8e2d9;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  outline: none;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.cancel-btn {
  padding: 0.75rem 1.25rem;
  background: transparent;
  border: none;
  color: rgba(240, 232, 220, 0.4);
  font-weight: 600;
  cursor: pointer;
}

.confirm-btn {
  padding: 0.75rem 1.5rem;
  background: #c4714e;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
