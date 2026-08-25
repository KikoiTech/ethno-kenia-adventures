<script setup lang="ts">
import { Eye, EyeOff, User, Mail, Lock, Monitor, CheckCircle2, AlertCircle } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const { profile, fetchProfile } = useAdmin()
const supabase = useSupabase()

// ── Profile: Display Name ────────────────────────────────────────────────
const displayName    = ref('')
const isSavingName   = ref(false)

// ── Profile: Email ───────────────────────────────────────────────────────
const showEmailForm  = ref(false)
const newEmail       = ref('')
const isSavingEmail  = ref(false)
const emailInfoMsg   = ref('')

// ── Security: Password ───────────────────────────────────────────────────
const currentPassword  = ref('')
const newPassword      = ref('')
const confirmPassword  = ref('')
const showCurrent      = ref(false)
const showNew          = ref(false)
const showConfirm      = ref(false)
const isSavingPassword = ref(false)
const passwordError    = ref('')

// ── Security: Sessions ───────────────────────────────────────────────────
const isSigningOut = ref(false)

// Sync display name from profile once loaded
watch(() => profile.value?.full_name, (val) => {
  if (val && !displayName.value) displayName.value = val
}, { immediate: true })

async function saveDisplayName() {
  const name = displayName.value.trim()
  if (!name) return

  isSavingName.value = true
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: name })
      .eq('id', profile.value!.id)

    if (error) throw error

    await fetchProfile()
    toast.success('Name updated', { description: 'Your display name has been saved.' })
  } catch (err: any) {
    toast.error('Failed to update name', { description: err.message })
  } finally {
    isSavingName.value = false
  }
}

async function saveEmail() {
  const email = newEmail.value.trim()
  if (!email) return

  isSavingEmail.value = true
  emailInfoMsg.value  = ''
  try {
    const { error } = await supabase.auth.updateUser({ email })
    if (error) throw error

    emailInfoMsg.value = `A confirmation link has been sent to ${email}. Check your inbox.`
    newEmail.value     = ''
    showEmailForm.value = false
  } catch (err: any) {
    toast.error('Failed to update email', { description: err.message })
  } finally {
    isSavingEmail.value = false
  }
}

async function savePassword() {
  passwordError.value = ''

  if (!currentPassword.value) {
    passwordError.value = 'Current password is required.'
    return
  }
  if (newPassword.value.length < 8) {
    passwordError.value = 'New password must be at least 8 characters.'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'New passwords do not match.'
    return
  }

  isSavingPassword.value = true
  try {
    // Verify current password by attempting to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email:    profile.value!.email,
      password: currentPassword.value,
    })

    if (signInError) {
      passwordError.value = 'Current password is incorrect.'
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword.value })
    if (updateError) throw updateError

    toast.success('Password updated', { description: 'Your password has been changed successfully.' })
    currentPassword.value = ''
    newPassword.value     = ''
    confirmPassword.value = ''
  } catch (err: any) {
    toast.error('Failed to update password', { description: err.message })
  } finally {
    isSavingPassword.value = false
  }
}

async function signOutOtherDevices() {
  isSigningOut.value = true
  try {
    const { error } = await supabase.auth.signOut({ scope: 'others' })
    if (error) throw error
    toast.success('Done', { description: 'All other sessions have been signed out.' })
  } catch (err: any) {
    toast.error('Failed', { description: err.message })
  } finally {
    isSigningOut.value = false
  }
}
</script>

<template>
  <div class="settings-page">
    <header class="page-header">
      <div>
        <h1 class="page-title">Settings</h1>
        <p class="page-desc">Manage your account profile and security.</p>
      </div>
    </header>

    <div class="sections">

      <!-- ── Profile Card ── -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-icon"><User class="w-4 h-4" /></div>
          <div>
            <h2 class="section-title">Profile</h2>
            <p class="section-desc">Update your name and email address.</p>
          </div>
        </div>

        <!-- Display Name -->
        <div class="field-row">
          <div class="field-info">
            <span class="field-label">Display Name</span>
            <span class="field-hint">Shown in the sidebar and team page</span>
          </div>
          <div class="field-control">
            <input
              v-model="displayName"
              type="text"
              class="setting-input"
              placeholder="Your full name"
              :disabled="isSavingName"
            />
            <button class="save-btn" :disabled="isSavingName || !displayName.trim()" @click="saveDisplayName">
              <span v-if="isSavingName" class="btn-spinner" />
              <template v-else><CheckCircle2 class="w-3.5 h-3.5" /> Save</template>
            </button>
          </div>
        </div>

        <div class="divider" />

        <!-- Email -->
        <div class="field-row">
          <div class="field-info">
            <span class="field-label">Email Address</span>
            <span class="field-hint">{{ profile?.email }}</span>
          </div>
          <div class="field-control">
            <button v-if="!showEmailForm" class="ghost-btn" @click="showEmailForm = true; emailInfoMsg = ''">
              <Mail class="w-3.5 h-3.5" /> Change Email
            </button>
            <template v-else>
              <input
                v-model="newEmail"
                type="email"
                class="setting-input"
                placeholder="new@email.com"
                :disabled="isSavingEmail"
              />
              <div style="display:flex;gap:.5rem;">
                <button class="save-btn" :disabled="isSavingEmail || !newEmail.trim()" @click="saveEmail">
                  <span v-if="isSavingEmail" class="btn-spinner" />
                  <template v-else><CheckCircle2 class="w-3.5 h-3.5" /> Send Confirmation</template>
                </button>
                <button class="cancel-ghost" @click="showEmailForm = false">Cancel</button>
              </div>
            </template>
          </div>
        </div>

        <!-- Email info message -->
        <Transition name="fade">
          <div v-if="emailInfoMsg" class="info-box">
            <CheckCircle2 class="w-4 h-4 shrink-0" />
            <p>{{ emailInfoMsg }}</p>
          </div>
        </Transition>
      </div>

      <!-- ── Security Card ── -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-icon"><Lock class="w-4 h-4" /></div>
          <div>
            <h2 class="section-title">Security</h2>
            <p class="section-desc">Manage your password and active sessions.</p>
          </div>
        </div>

        <!-- Change Password -->
        <h3 class="sub-heading">Change Password</h3>

        <Transition name="fade">
          <div v-if="passwordError" class="error-box">
            <AlertCircle class="w-4 h-4 shrink-0" />
            <p>{{ passwordError }}</p>
          </div>
        </Transition>

        <div class="password-fields">
          <div class="field">
            <label class="field-label">Current Password</label>
            <div class="input-wrap">
              <input
                v-model="currentPassword"
                :type="showCurrent ? 'text' : 'password'"
                class="setting-input setting-input--pr"
                placeholder="Your current password"
                :disabled="isSavingPassword"
              />
              <button type="button" class="eye-btn" @click="showCurrent = !showCurrent">
                <component :is="showCurrent ? EyeOff : Eye" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="field">
            <label class="field-label">New Password</label>
            <div class="input-wrap">
              <input
                v-model="newPassword"
                :type="showNew ? 'text' : 'password'"
                class="setting-input setting-input--pr"
                placeholder="At least 8 characters"
                :disabled="isSavingPassword"
              />
              <button type="button" class="eye-btn" @click="showNew = !showNew">
                <component :is="showNew ? EyeOff : Eye" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="field">
            <label class="field-label">Confirm New Password</label>
            <div class="input-wrap">
              <input
                v-model="confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                class="setting-input setting-input--pr"
                placeholder="Repeat new password"
                :disabled="isSavingPassword"
              />
              <button type="button" class="eye-btn" @click="showConfirm = !showConfirm">
                <component :is="showConfirm ? EyeOff : Eye" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            class="primary-btn"
            :disabled="isSavingPassword || !currentPassword || !newPassword || !confirmPassword"
            @click="savePassword"
          >
            <span v-if="isSavingPassword" class="btn-spinner" />
            <template v-else><Lock class="w-3.5 h-3.5" /> Update Password</template>
          </button>
        </div>

        <div class="divider" />

        <!-- Active Sessions -->
        <div class="field-row">
          <div class="field-info">
            <span class="field-label">Active Sessions</span>
            <span class="field-hint">Sign out all other devices while keeping this session active.</span>
          </div>
          <div class="field-control">
            <button class="danger-btn" :disabled="isSigningOut" @click="signOutOtherDevices">
              <span v-if="isSigningOut" class="btn-spinner" />
              <template v-else><Monitor class="w-3.5 h-3.5" /> Sign Out Other Devices</template>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.settings-page { max-width: 740px; }

.page-header { margin-bottom: 2.5rem; }
.page-title { font-size: 1.5rem; font-weight: 700; color: #f0e8dc; margin-bottom: .3rem; }
.page-desc  { font-size: 0.875rem; color: rgba(240,232,220,.4); }

.sections { display: flex; flex-direction: column; gap: 1.5rem; }

.section-card {
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px;
  padding: 1.75rem;
}

.section-header {
  display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.75rem;
}
.section-icon {
  width: 36px; height: 36px; background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.08); border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: rgba(240,232,220,.6); flex-shrink: 0;
}
.section-title { font-size: 1rem; font-weight: 700; color: #f0e8dc; margin-bottom: .2rem; }
.section-desc  { font-size: 0.8rem; color: rgba(240,232,220,.4); }

.sub-heading { font-size: 0.85rem; font-weight: 600; color: rgba(240,232,220,.6); margin-bottom: 1rem; }

.field-row {
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 1.5rem; flex-wrap: wrap;
}
.field-info { flex: 1; min-width: 160px; }
.field-label { display: block; font-size: 0.85rem; font-weight: 600; color: #f0e8dc; margin-bottom: .2rem; }
.field-hint  { display: block; font-size: 0.78rem; color: rgba(240,232,220,.4); }
.field-control { display: flex; align-items: center; gap: .6rem; flex-wrap: wrap; }

.setting-input {
  background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1);
  border-radius: 8px; color: #f0e8dc; padding: .55rem .85rem;
  font-size: 0.875rem; font-family: 'Inter', sans-serif; outline: none;
  transition: border-color .2s, box-shadow .2s; min-width: 200px;
}
.setting-input::placeholder { color: rgba(240,232,220,.24); }
.setting-input:focus { border-color: rgba(61,74,61,.7); box-shadow: 0 0 0 3px rgba(61,74,61,.18); }
.setting-input:disabled { opacity: .5; cursor: not-allowed; }
.setting-input--pr { padding-right: 2.7rem; }

.input-wrap { position: relative; }
.eye-btn {
  position: absolute; top: 50%; right: .65rem; transform: translateY(-50%);
  background: none; border: none; color: rgba(240,232,220,.38); cursor: pointer;
  padding: .2rem; display: flex; align-items: center; transition: color .2s;
}
.eye-btn:hover { color: rgba(240,232,220,.78); }

.save-btn {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .5rem 1rem; background: rgba(61,74,61,.3);
  border: 1px solid rgba(61,74,61,.5); border-radius: 8px;
  color: #9ec89e; font-size: 0.8rem; font-weight: 600; cursor: pointer;
  transition: all .2s; white-space: nowrap;
}
.save-btn:hover:not(:disabled) { background: rgba(61,74,61,.5); }
.save-btn:disabled { opacity: .5; cursor: not-allowed; }

.ghost-btn {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .5rem 1rem; background: transparent;
  border: 1px solid rgba(255,255,255,.12); border-radius: 8px;
  color: rgba(240,232,220,.6); font-size: 0.8rem; font-weight: 500;
  cursor: pointer; transition: all .2s; white-space: nowrap;
}
.ghost-btn:hover { background: rgba(255,255,255,.05); color: #f0e8dc; }

.cancel-ghost {
  padding: .5rem .75rem; background: none; border: none;
  color: rgba(240,232,220,.4); font-size: 0.8rem; cursor: pointer;
}

.primary-btn {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .65rem 1.25rem;
  background: linear-gradient(135deg, #3d4a3d 0%, #2b392b 100%);
  border: 1px solid rgba(255,255,255,.1); border-radius: 8px;
  color: #f0e8dc; font-size: 0.875rem; font-weight: 600;
  cursor: pointer; transition: all .2s;
}
.primary-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 14px rgba(0,0,0,.3); }
.primary-btn:disabled { opacity: .5; cursor: not-allowed; }

.danger-btn {
  display: inline-flex; align-items: center; gap: .4rem;
  padding: .55rem 1rem; background: rgba(239,68,68,.08);
  border: 1px solid rgba(239,68,68,.2); border-radius: 8px;
  color: #fca5a5; font-size: 0.8rem; font-weight: 600;
  cursor: pointer; transition: all .2s; white-space: nowrap;
}
.danger-btn:hover:not(:disabled) { background: rgba(239,68,68,.15); }
.danger-btn:disabled { opacity: .5; cursor: not-allowed; }

.password-fields { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; gap: .4rem; }

.divider { height: 1px; background: rgba(255,255,255,.05); margin: 1.5rem 0; }

.info-box {
  display: flex; align-items: flex-start; gap: .6rem; padding: .8rem 1rem;
  margin-top: 1rem; background: rgba(61,74,61,.2); border: 1px solid rgba(61,74,61,.4);
  border-radius: 10px; color: #9ec89e; font-size: .86rem;
}
.error-box {
  display: flex; align-items: flex-start; gap: .6rem; padding: .8rem 1rem;
  margin-bottom: 1rem; background: rgba(239,68,68,.12); border: 1px solid rgba(239,68,68,.28);
  border-radius: 10px; color: #fca5a5; font-size: .86rem;
}

.btn-spinner {
  display: inline-block; width: 12px; height: 12px;
  border: 2px solid rgba(240,232,220,.3); border-top-color: #f0e8dc;
  border-radius: 50%; animation: spin .65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.fade-enter-active, .fade-leave-active { transition: opacity .2s, transform .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
