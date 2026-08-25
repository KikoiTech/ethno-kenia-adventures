<script setup lang="ts">
import {
  Users,
  UserPlus,
  Shield,
  ShieldAlert,
  Mail,
  X,
  Lock,
  ChevronDown,
  AlertTriangle,
  Activity,
  RotateCcw,
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const { isSuperAdmin, profile } = useAdmin()
const supabase = useSupabase()

onMounted(() => {
  if (!isSuperAdmin.value) navigateTo('/admin/dashboard')
})

// ── Admin list ───────────────────────────────────────────────────────────
const admins      = ref<any[]>([])
const isLoading   = ref(true)
const isSubmitting = ref(false)

async function fetchAdmins() {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, role, updated_at')
      .in('role', ['admin', 'super_admin'])
      .order('updated_at', { ascending: false })

    if (error) throw error
    admins.value = data
  } catch (err: any) {
    toast.error('Failed to load team', { description: err.message })
  } finally {
    isLoading.value = false
  }
}

// ── Invite modal ─────────────────────────────────────────────────────────
const showInviteModal = ref(false)
const inviteEmail     = ref('')
const inviteRole      = ref('admin')

async function handleInvite() {
  if (!inviteEmail.value) return

  const { data: sessionData } = await supabase.auth.getSession()
  const accessToken = sessionData?.session?.access_token

  if (!accessToken) {
    toast.error('Session expired', { description: 'Please log in again.' })
    return
  }

  isSubmitting.value = true
  try {
    await $fetch('/api/admin/invite', {
      method:  'POST',
      body:    { email: inviteEmail.value, role: inviteRole.value },
      headers: { authorization: `Bearer ${accessToken}` },
    })
    toast.success('Invitation sent!', { description: `Email sent to ${inviteEmail.value}.` })
    showInviteModal.value = false
    inviteEmail.value     = ''
  } catch (err: any) {
    toast.error('Invitation failed', { description: err?.data?.message ?? 'Unknown error' })
  } finally {
    isSubmitting.value = false
  }
}

// ── Manage panel ─────────────────────────────────────────────────────────
const managedUser      = ref<any>(null)
const showManagePanel  = ref(false)
const panelActivity    = ref<any[]>([])
const panelLoading     = ref(false)
const selectedRole     = ref('')
const isChangingRole   = ref(false)
const isSendingReset   = ref(false)
const showRemoveConfirm = ref(false)
const isRemoving       = ref(false)

async function getToken() {
  const { data } = await supabase.auth.getSession()
  return data?.session?.access_token ?? null
}

async function openManage(admin: any) {
  managedUser.value     = admin
  selectedRole.value    = admin.role
  showManagePanel.value = true
  showRemoveConfirm.value = false
  panelActivity.value   = []
  panelLoading.value    = true

  const token = await getToken()
  if (!token) { panelLoading.value = false; return }

  try {
    const result = await $fetch<{ activity: any[] }>(
      `/api/admin/users/${admin.id}/activity`,
      { headers: { authorization: `Bearer ${token}` } }
    )
    panelActivity.value = result.activity ?? []
  } catch {
    panelActivity.value = []
  } finally {
    panelLoading.value = false
  }
}

async function handleSendReset() {
  const token = await getToken()
  if (!token) return

  isSendingReset.value = true
  try {
    await $fetch(`/api/admin/users/${managedUser.value.id}/send-password-reset`, {
      method:  'POST',
      headers: { authorization: `Bearer ${token}` },
    })
    toast.success('Reset link sent', {
      description: `Password reset email sent to ${managedUser.value.email}.`,
    })
  } catch (err: any) {
    toast.error('Failed', { description: err?.data?.message ?? 'Unknown error' })
  } finally {
    isSendingReset.value = false
  }
}

async function handleRoleChange() {
  if (selectedRole.value === managedUser.value.role) return
  const token = await getToken()
  if (!token) return

  isChangingRole.value = true
  try {
    await $fetch(`/api/admin/users/${managedUser.value.id}/role`, {
      method:  'PATCH',
      body:    { role: selectedRole.value },
      headers: { authorization: `Bearer ${token}` },
    })
    // Update local list
    const idx = admins.value.findIndex(a => a.id === managedUser.value.id)
    if (idx !== -1) admins.value[idx].role = selectedRole.value
    managedUser.value = { ...managedUser.value, role: selectedRole.value }

    toast.success('Role updated', { description: `${managedUser.value.full_name} is now a ${selectedRole.value.replace('_', ' ')}.` })
  } catch (err: any) {
    toast.error('Failed to update role', { description: err?.data?.message ?? 'Unknown error' })
    selectedRole.value = managedUser.value.role // revert
  } finally {
    isChangingRole.value = false
  }
}

async function handleRemove() {
  const token = await getToken()
  if (!token) return

  isRemoving.value = true
  try {
    await $fetch(`/api/admin/users/${managedUser.value.id}`, {
      method:  'DELETE',
      headers: { authorization: `Bearer ${token}` },
    })
    admins.value      = admins.value.filter(a => a.id !== managedUser.value.id)
    showManagePanel.value = false
    toast.success('Admin removed', { description: `${managedUser.value.full_name} has been removed from the team.` })
  } catch (err: any) {
    toast.error('Failed to remove', { description: err?.data?.message ?? 'Unknown error' })
  } finally {
    isRemoving.value = false
    showRemoveConfirm.value = false
  }
}

function formatAction(action: string) {
  return action.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins < 1)   return 'just now'
  if (mins < 60)  return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
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
              <th>Manage</th>
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
                  <div>
                    <span class="font-semibold">{{ admin.full_name }}</span>
                    <span v-if="admin.id === profile?.id" class="you-badge">You</span>
                  </div>
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
                {{ admin.updated_at ? new Date(admin.updated_at).toLocaleDateString() : 'N/A' }}
              </td>
              <td>
                <button class="manage-btn" @click="openManage(admin)">Manage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ── Invite Modal ── -->
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
              <button class="confirm-btn" :disabled="isSubmitting" @click="handleInvite">
                <span v-if="isSubmitting">Sending…</span>
                <span v-else>Send Invitation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── Manage Panel Slide-over ── -->
    <Transition name="slide-right">
      <div v-if="showManagePanel" class="panel-overlay" @click.self="showManagePanel = false">
        <aside class="manage-panel">
          <!-- Panel Header -->
          <div class="panel-head">
            <div class="panel-user-info">
              <div class="panel-avatar">{{ managedUser?.full_name?.charAt(0) }}</div>
              <div>
                <p class="panel-name">{{ managedUser?.full_name }}</p>
                <p class="panel-email">{{ managedUser?.email }}</p>
              </div>
            </div>
            <button class="close-btn" @click="showManagePanel = false">
              <X class="w-4 h-4" />
            </button>
          </div>

          <div class="panel-role-row">
            <div :class="['role-badge', managedUser?.role === 'super_admin' ? 'role--super' : 'role--admin']">
              <component :is="managedUser?.role === 'super_admin' ? ShieldAlert : Shield" class="w-3 h-3" />
              <span>{{ managedUser?.role?.replace('_', ' ') }}</span>
            </div>
            <span v-if="managedUser?.id === profile?.id" class="you-badge">You</span>
          </div>

          <div class="panel-body">

            <!-- Security section -->
            <div class="panel-section">
              <h3 class="panel-section-title">
                <Lock class="w-3.5 h-3.5" /> Security
              </h3>
              <p class="panel-section-desc">Send a password reset link to this admin's email.</p>
              <button
                class="panel-action-btn"
                :disabled="isSendingReset"
                @click="handleSendReset"
              >
                <span v-if="isSendingReset" class="btn-spin" />
                <template v-else><RotateCcw class="w-3.5 h-3.5" /> Send Password Reset Link</template>
              </button>
            </div>

            <!-- Permissions section — hidden for yourself -->
            <div v-if="managedUser?.id !== profile?.id" class="panel-section">
              <h3 class="panel-section-title">
                <Shield class="w-3.5 h-3.5" /> Permissions
              </h3>
              <p class="panel-section-desc">Change this admin's system role.</p>
              <div class="role-select-row">
                <div class="select-wrap">
                  <select v-model="selectedRole" class="role-select">
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                  <ChevronDown class="select-chevron w-3.5 h-3.5" />
                </div>
                <button
                  class="save-role-btn"
                  :disabled="isChangingRole || selectedRole === managedUser?.role"
                  @click="handleRoleChange"
                >
                  <span v-if="isChangingRole" class="btn-spin" />
                  <template v-else>Save Role</template>
                </button>
              </div>
            </div>

            <!-- Recent Activity section -->
            <div class="panel-section">
              <h3 class="panel-section-title">
                <Activity class="w-3.5 h-3.5" /> Recent Activity
              </h3>
              <div v-if="panelLoading" class="activity-loading">
                <div class="btn-spin" style="width:16px;height:16px;" />
              </div>
              <div v-else-if="panelActivity.length === 0" class="activity-empty">
                No activity recorded yet.
              </div>
              <ul v-else class="activity-list">
                <li v-for="entry in panelActivity" :key="entry.id" class="activity-item">
                  <span class="activity-action">{{ formatAction(entry.action) }}</span>
                  <span class="activity-time">{{ timeAgo(entry.created_at) }}</span>
                </li>
              </ul>
            </div>

            <!-- Danger Zone — hidden for yourself -->
            <div v-if="managedUser?.id !== profile?.id" class="panel-section panel-section--danger">
              <h3 class="panel-section-title danger-title">
                <AlertTriangle class="w-3.5 h-3.5" /> Danger Zone
              </h3>
              <p class="panel-section-desc">Remove this admin's access to the dashboard. Their account is preserved but they will no longer be able to log in.</p>

              <div v-if="!showRemoveConfirm">
                <button class="danger-btn" @click="showRemoveConfirm = true">
                  Remove from Team
                </button>
              </div>
              <div v-else class="confirm-box">
                <p class="confirm-text">Are you sure you want to remove <strong>{{ managedUser?.full_name }}</strong>?</p>
                <div class="confirm-actions">
                  <button class="cancel-small" @click="showRemoveConfirm = false">Cancel</button>
                  <button class="confirm-danger-btn" :disabled="isRemoving" @click="handleRemove">
                    <span v-if="isRemoving" class="btn-spin" />
                    <template v-else>Yes, Remove</template>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </aside>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.page-header {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem;
}
.text-muted { color: rgba(240, 232, 220, 0.4); }

.add-btn {
  display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1.5rem;
  background: #c4714e; color: white; border-radius: 10px; font-weight: 600; cursor: pointer; border: none;
}

.data-card {
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px; overflow: hidden;
}
.table-wrap { width: 100%; overflow-x: auto; }

.data-table { width: 100%; border-collapse: collapse; }
.data-table th {
  text-align: left; padding: 1rem 1.5rem; background: rgba(255,255,255,.02);
  color: rgba(240,232,220,.4); font-weight: 600; font-size: 0.7rem;
  text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,.05);
}
.data-table td { padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,.03); }

.admin-user { display: flex; align-items: center; gap: .75rem; }
.admin-avatar {
  width: 32px; height: 32px; background: rgba(196,113,78,.2); color: #c4714e;
  border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700;
}
.you-badge {
  display: inline-block; margin-left: .5rem; font-size: 0.65rem; font-weight: 700;
  background: rgba(61,74,61,.3); color: #9ec89e; padding: .1rem .4rem;
  border-radius: 99px; border: 1px solid rgba(61,74,61,.4); vertical-align: middle;
}
.cell-icon-text { display: flex; align-items: center; gap: .5rem; font-size: .85rem; }

.role-badge {
  display: inline-flex; align-items: center; gap: .4rem; padding: .25rem .6rem;
  border-radius: 99px; font-size: .75rem; font-weight: 600; text-transform: capitalize;
}
.role--super { background: rgba(162,80,53,.2); color: #dfab90; border: 1px solid rgba(162,80,53,.3); }
.role--admin  { background: rgba(61,74,61,.2); color: #9ec89e; border: 1px solid rgba(61,74,61,.3); }

.manage-btn {
  padding: .4rem .9rem; background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.1); border-radius: 8px;
  color: rgba(240,232,220,.7); font-size: .8rem; font-weight: 600; cursor: pointer;
  transition: all .2s;
}
.manage-btn:hover { background: rgba(255,255,255,.08); color: #f0e8dc; }

.skeleton-row { height: 20px; background: rgba(255,255,255,.05); border-radius: 4px; }

/* ── Invite Modal ── */
.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.8);
  backdrop-filter: blur(8px); display: flex; align-items: center;
  justify-content: center; z-index: 100;
}
.modal-card {
  width: 100%; max-width: 450px; background: #0d1610;
  border: 1px solid rgba(255,255,255,.1); border-radius: 20px;
  padding: 2.5rem; box-shadow: 0 32px 64px rgba(0,0,0,.5);
}
.modal-title { font-size: 1.25rem; font-weight: 700; margin-bottom: .5rem; }
.modal-desc { font-size: .85rem; color: rgba(240,232,220,.4); margin-bottom: 2rem; }
.modal-form { display: flex; flex-direction: column; gap: 1.5rem; }
.input-group { display: flex; flex-direction: column; gap: .5rem; }
.form-label { font-size: .8rem; font-weight: 600; color: rgba(240,232,220,.6); }
.form-input, .form-select {
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.1);
  border-radius: 10px; color: #e8e2d9; padding: .75rem 1rem; font-size: .95rem; outline: none;
}
.modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 1rem; }
.cancel-btn { padding: .75rem 1.25rem; background: transparent; border: none; color: rgba(240,232,220,.4); font-weight: 600; cursor: pointer; }
.confirm-btn { padding: .75rem 1.5rem; background: #c4714e; color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; }
.confirm-btn:disabled { opacity: .6; cursor: not-allowed; }

/* ── Manage panel slide-over ── */
.panel-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.5);
  backdrop-filter: blur(4px); z-index: 200;
  display: flex; justify-content: flex-end;
}
.manage-panel {
  width: 100%; max-width: 400px; height: 100%; background: #0d1610;
  border-left: 1px solid rgba(255,255,255,.08);
  display: flex; flex-direction: column;
  box-shadow: -24px 0 64px rgba(0,0,0,.5);
  overflow-y: auto;
}

.panel-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,.06);
}
.panel-user-info { display: flex; align-items: center; gap: .75rem; }
.panel-avatar {
  width: 40px; height: 40px; background: rgba(196,113,78,.2); color: #c4714e;
  border-radius: 10px; display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: 1.1rem; flex-shrink: 0;
}
.panel-name  { font-size: .95rem; font-weight: 700; color: #f0e8dc; }
.panel-email { font-size: .78rem; color: rgba(240,232,220,.4); }

.panel-role-row {
  display: flex; align-items: center; gap: .5rem;
  padding: .75rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,.04);
}

.close-btn {
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08);
  border-radius: 8px; color: rgba(240,232,220,.5); cursor: pointer;
  padding: .4rem; display: flex; align-items: center; transition: all .2s;
}
.close-btn:hover { background: rgba(255,255,255,.1); color: #f0e8dc; }

.panel-body { display: flex; flex-direction: column; gap: 0; flex: 1; }

.panel-section {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,.04);
}
.panel-section--danger { border-bottom: none; }

.panel-section-title {
  display: flex; align-items: center; gap: .4rem;
  font-size: .75rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: .06em; color: rgba(240,232,220,.4);
  margin-bottom: .6rem;
}
.danger-title { color: rgba(239,68,68,.5); }

.panel-section-desc { font-size: .8rem; color: rgba(240,232,220,.4); margin-bottom: .9rem; line-height: 1.55; }

.panel-action-btn {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .55rem 1rem; background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.1); border-radius: 8px;
  color: rgba(240,232,220,.7); font-size: .82rem; font-weight: 600; cursor: pointer;
  transition: all .2s;
}
.panel-action-btn:hover:not(:disabled) { background: rgba(255,255,255,.08); color: #f0e8dc; }
.panel-action-btn:disabled { opacity: .5; cursor: not-allowed; }

.role-select-row { display: flex; align-items: center; gap: .6rem; }
.select-wrap { position: relative; display: inline-flex; align-items: center; }
.role-select {
  appearance: none; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);
  border-radius: 8px; color: #f0e8dc; padding: .5rem 2rem .5rem .8rem;
  font-size: .82rem; font-family: 'Inter', sans-serif; outline: none; cursor: pointer;
}
.select-chevron { position: absolute; right: .5rem; color: rgba(240,232,220,.4); pointer-events: none; }
.save-role-btn {
  padding: .5rem .9rem; background: rgba(61,74,61,.3); border: 1px solid rgba(61,74,61,.5);
  border-radius: 8px; color: #9ec89e; font-size: .82rem; font-weight: 600; cursor: pointer;
  transition: all .2s; display: inline-flex; align-items: center; gap: .3rem;
}
.save-role-btn:hover:not(:disabled) { background: rgba(61,74,61,.5); }
.save-role-btn:disabled { opacity: .4; cursor: not-allowed; }

.activity-loading { display: flex; justify-content: center; padding: .75rem 0; }
.activity-empty { font-size: .8rem; color: rgba(240,232,220,.3); font-style: italic; }
.activity-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: .5rem; }
.activity-item { display: flex; justify-content: space-between; align-items: center; }
.activity-action { font-size: .82rem; color: rgba(240,232,220,.7); }
.activity-time { font-size: .75rem; color: rgba(240,232,220,.3); }

.danger-btn {
  padding: .55rem 1rem; background: rgba(239,68,68,.08);
  border: 1px solid rgba(239,68,68,.2); border-radius: 8px;
  color: #fca5a5; font-size: .82rem; font-weight: 600; cursor: pointer; transition: all .2s;
}
.danger-btn:hover { background: rgba(239,68,68,.15); }

.confirm-box {
  background: rgba(239,68,68,.06); border: 1px solid rgba(239,68,68,.15);
  border-radius: 10px; padding: 1rem;
}
.confirm-text { font-size: .85rem; color: rgba(240,232,220,.7); margin-bottom: .75rem; }
.confirm-text strong { color: #f0e8dc; }
.confirm-actions { display: flex; gap: .6rem; }
.cancel-small {
  padding: .5rem .9rem; background: transparent; border: 1px solid rgba(255,255,255,.1);
  border-radius: 8px; color: rgba(240,232,220,.5); font-size: .8rem; cursor: pointer;
}
.confirm-danger-btn {
  padding: .5rem 1rem; background: rgba(239,68,68,.2);
  border: 1px solid rgba(239,68,68,.35); border-radius: 8px;
  color: #fca5a5; font-size: .8rem; font-weight: 700; cursor: pointer;
  display: inline-flex; align-items: center; gap: .3rem;
}
.confirm-danger-btn:disabled { opacity: .5; cursor: not-allowed; }

.btn-spin {
  display: inline-block; width: 12px; height: 12px;
  border: 2px solid rgba(240,232,220,.3); border-top-color: #f0e8dc;
  border-radius: 50%; animation: spin .65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.slide-right-enter-active, .slide-right-leave-active { transition: opacity .25s ease; }
.slide-right-enter-active .manage-panel, .slide-right-leave-active .manage-panel { transition: transform .3s cubic-bezier(.4,0,.2,1); }
.slide-right-enter-from { opacity: 0; }
.slide-right-enter-from .manage-panel { transform: translateX(100%); }
.slide-right-leave-to { opacity: 0; }
.slide-right-leave-to .manage-panel { transform: translateX(100%); }
</style>
