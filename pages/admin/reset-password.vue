<script setup lang="ts">
import { Eye, EyeOff, Leaf, AlertCircle, KeyRound } from 'lucide-vue-next'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'Reset Password | Ethno Kenia Adventures',
})

const route = useRoute()
const rawToken = route.query.token as string

type PageState = 'loading' | 'valid' | 'expired' | 'used' | 'error'
const pageState  = ref<PageState>('loading')
const resetEmail = ref('')

const password        = ref('')
const confirmPassword = ref('')
const showPassword    = ref(false)
const showConfirm     = ref(false)
const isSubmitting    = ref(false)
const errorMessage    = ref('')

onMounted(async () => {
  if (!rawToken) { pageState.value = 'error'; return }

  try {
    const data = await $fetch<{ email: string }>(`/api/admin/reset-password?token=${rawToken}`)
    resetEmail.value = data.email
    pageState.value  = 'valid'
  } catch (err: any) {
    const msg = err?.data?.message ?? ''
    if (msg.includes('expired'))   pageState.value = 'expired'
    else if (msg.includes('used')) pageState.value = 'used'
    else                           pageState.value = 'error'
  }
})

async function handleSubmit() {
  errorMessage.value = ''

  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters.'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  isSubmitting.value = true
  try {
    await $fetch('/api/admin/reset-password', {
      method: 'POST',
      body:   { token: rawToken, password: password.value },
    })
    await navigateTo('/admin/login?reset=1')
  } catch (err: any) {
    errorMessage.value = err?.data?.message ?? 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="bg-layer">
      <div class="orb orb-1" /><div class="orb orb-2" /><div class="orb orb-3" />
    </div>

    <main class="center">
      <!-- Loading -->
      <div v-if="pageState === 'loading'" class="card state-card">
        <div class="spinner-lg" />
        <p class="state-text">Verifying reset link&hellip;</p>
      </div>

      <!-- Expired -->
      <div v-else-if="pageState === 'expired'" class="card state-card">
        <div class="state-icon state-icon--warn"><AlertCircle class="w-7 h-7" /></div>
        <h2 class="state-title">Link Expired</h2>
        <p class="state-desc">This password reset link has expired. Request a new one from the login page.</p>
        <NuxtLink to="/admin/login" class="back-link">Back to Login</NuxtLink>
      </div>

      <!-- Already used -->
      <div v-else-if="pageState === 'used'" class="card state-card">
        <div class="state-icon state-icon--warn"><AlertCircle class="w-7 h-7" /></div>
        <h2 class="state-title">Link Already Used</h2>
        <p class="state-desc">This reset link has already been used. Try signing in or request a new reset link.</p>
        <NuxtLink to="/admin/login" class="back-link">Back to Login</NuxtLink>
      </div>

      <!-- Error -->
      <div v-else-if="pageState === 'error'" class="card state-card">
        <div class="state-icon state-icon--warn"><AlertCircle class="w-7 h-7" /></div>
        <h2 class="state-title">Invalid Link</h2>
        <p class="state-desc">This reset link is invalid or missing. Check your email for the correct link.</p>
        <NuxtLink to="/admin/login" class="back-link">Back to Login</NuxtLink>
      </div>

      <!-- Reset form -->
      <div v-else class="card">
        <div class="brand">
          <div class="brand-icon"><Leaf class="w-5 h-5 text-white" /></div>
          <span class="brand-name">Ethno Kenia</span>
        </div>

        <div class="card-header">
          <h2 class="card-title">Set New Password</h2>
          <p class="card-desc">Choose a strong password for <strong>{{ resetEmail }}</strong></p>
        </div>

        <Transition name="fade">
          <div v-if="errorMessage" class="error-box">
            <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" />
            <p>{{ errorMessage }}</p>
          </div>
        </Transition>

        <form class="form" @submit.prevent="handleSubmit">
          <div class="field">
            <label for="new-password" class="field-label">New Password</label>
            <div class="input-wrap">
              <input
                id="new-password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="At least 8 characters"
                class="field-input field-input--pr"
                :disabled="isSubmitting"
              />
              <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <div class="field">
            <label for="confirm-password" class="field-label">Confirm Password</label>
            <div class="input-wrap">
              <input
                id="confirm-password"
                v-model="confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="Repeat your password"
                class="field-input field-input--pr"
                :disabled="isSubmitting"
              />
              <button type="button" class="eye-btn" @click="showConfirm = !showConfirm">
                <component :is="showConfirm ? EyeOff : Eye" class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner" />
            <template v-else>
              <KeyRound class="w-4 h-4" />
              Update Password
            </template>
          </button>
        </form>

        <p class="card-footer">
          Remember your password?
          <NuxtLink to="/admin/login" class="footer-link">Sign in</NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; }

.wrapper {
  position: relative; min-height: 100vh; display: flex; align-items: center;
  justify-content: center; overflow: hidden; background: #0d1610;
  font-family: 'Inter', sans-serif; padding: 2rem 1.25rem;
}

.bg-layer {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 15% 50%, rgba(61,74,61,.2) 0%, transparent 55%),
              radial-gradient(ellipse at 85% 20%, rgba(162,80,53,.12) 0%, transparent 45%),
              radial-gradient(ellipse at 50% 90%, rgba(61,74,61,.1) 0%, transparent 50%);
}
.orb { position: absolute; border-radius: 50%; filter: blur(90px); animation: drift 14s ease-in-out infinite alternate; }
.orb-1 { width: 500px; height: 500px; background: rgba(61,74,61,.22); top: -140px; left: -120px; }
.orb-2 { width: 320px; height: 320px; background: rgba(162,80,53,.12); bottom: -60px; left: 35%; animation-delay: 5s; }
.orb-3 { width: 280px; height: 280px; background: rgba(61,74,61,.14); top: 35%; right: -70px; animation-delay: 9s; }
@keyframes drift { from { transform: translate(0,0) scale(1); } to { transform: translate(28px,-18px) scale(1.08); } }

.center { position: relative; z-index: 1; width: 100%; max-width: 430px; }

.card {
  width: 100%; padding: 2.25rem;
  background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.09);
  border-radius: 22px; backdrop-filter: blur(22px);
  box-shadow: 0 0 0 1px rgba(255,255,255,.035), 0 28px 60px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.07);
}

.state-card { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1rem; padding: 3rem 2.25rem; }
.state-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
.state-icon--warn { background: rgba(239,68,68,.15); color: #fca5a5; border: 1px solid rgba(239,68,68,.25); }
.state-title { font-size: 1.25rem; font-weight: 700; color: #f0e8dc; margin: 0; }
.state-desc { font-size: 0.875rem; color: rgba(240,232,220,.5); line-height: 1.6; margin: 0; max-width: 300px; }
.state-text { font-size: 0.875rem; color: rgba(240,232,220,.5); margin: 0; }
.back-link { margin-top: .5rem; font-size: .85rem; color: rgba(196,107,74,.75); text-decoration: none; font-weight: 500; transition: color .2s; }
.back-link:hover { color: #c4714e; }

.brand { display: flex; align-items: center; gap: .65rem; margin-bottom: 1.5rem; }
.brand-icon { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: linear-gradient(135deg,#3d4a3d,#263326); border-radius: 11px; border: 1px solid rgba(255,255,255,.1); box-shadow: 0 8px 32px rgba(0,0,0,.35); }
.brand-name { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; color: #e8e2d9; }

.card-header { margin-bottom: 1.5rem; }
.card-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 700; color: #f0e8dc; margin-bottom: .3rem; }
.card-desc { font-size: .875rem; color: rgba(240,232,220,.48); }
.card-desc strong { color: rgba(240,232,220,.75); }

.error-box {
  display: flex; align-items: flex-start; gap: .6rem; padding: .8rem 1rem;
  margin-bottom: 1.2rem; background: rgba(239,68,68,.12); border: 1px solid rgba(239,68,68,.28);
  border-radius: 10px; color: #fca5a5; font-size: .86rem; animation: shake .3s ease;
}
@keyframes shake { 0%,100% { transform: translateX(0); } 30% { transform: translateX(-5px); } 70% { transform: translateX(5px); } }

.form { display: flex; flex-direction: column; gap: 1.2rem; }
.field { display: flex; flex-direction: column; gap: .45rem; }
.field-label { font-size: .83rem; font-weight: 500; color: rgba(240,232,220,.72); }
.input-wrap { position: relative; }
.field-input {
  width: 100%; padding: .68rem .88rem; background: rgba(255,255,255,.055);
  border: 1px solid rgba(255,255,255,.1); border-radius: 10px; color: #f0e8dc;
  font-size: .9rem; font-family: 'Inter', sans-serif; outline: none;
  transition: border-color .2s, background .2s, box-shadow .2s;
}
.field-input::placeholder { color: rgba(240,232,220,.24); }
.field-input:focus { border-color: rgba(61,74,61,.7); background: rgba(255,255,255,.075); box-shadow: 0 0 0 3px rgba(61,74,61,.18); }
.field-input:disabled { opacity: .5; cursor: not-allowed; }
.field-input--pr { padding-right: 2.7rem; }
.eye-btn { position: absolute; top: 50%; right: .75rem; transform: translateY(-50%); background: none; border: none; color: rgba(240,232,220,.38); cursor: pointer; padding: .2rem; display: flex; align-items: center; transition: color .2s; }
.eye-btn:hover { color: rgba(240,232,220,.78); }

.submit-btn {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: .6rem;
  padding: .78rem 1.2rem; margin-top: .4rem;
  background: linear-gradient(135deg, #3d4a3d 0%, #2b392b 100%);
  border: 1px solid rgba(255,255,255,.1); border-radius: 10px; color: #f0e8dc;
  font-size: .9rem; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer;
  box-shadow: 0 4px 18px rgba(0,0,0,.32); position: relative; overflow: hidden;
  transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
}
.submit-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(255,255,255,.07),transparent); opacity: 0; transition: opacity .22s; }
.submit-btn:hover:not(:disabled)::after { opacity: 1; }
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 26px rgba(0,0,0,.42); border-color: rgba(255,255,255,.16); }
.submit-btn:disabled { opacity: .55; cursor: not-allowed; }

.spinner { display: inline-block; width: 15px; height: 15px; border: 2px solid rgba(240,232,220,.3); border-top-color: #f0e8dc; border-radius: 50%; animation: spin .65s linear infinite; }
.spinner-lg { display: inline-block; width: 36px; height: 36px; border: 3px solid rgba(240,232,220,.15); border-top-color: #c4714e; border-radius: 50%; animation: spin .65s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.card-footer { margin-top: 1.6rem; text-align: center; font-size: .77rem; color: rgba(240,232,220,.28); }
.footer-link { color: rgba(196,107,74,.65); text-decoration: none; transition: color .2s; }
.footer-link:hover { color: #c4714e; }

.fade-enter-active, .fade-leave-active { transition: opacity .25s, transform .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
