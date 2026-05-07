<script setup lang="ts">
import { Eye, EyeOff, Leaf, AlertCircle, LogIn } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({ layout: false })

useSeoMeta({
  title: 'Admin Login | Ethno Kenya Adventures',
  description: 'Secure admin portal for Ethno Kenya Adventures staff.',
})

const supabase = useSupabase()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter your email and password.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) {
      errorMessage.value = error.message || 'Invalid credentials. Please try again.'
      return
    }

    const role = data.user?.user_metadata?.role
    if (role !== 'admin' && role !== 'super_admin') {
      await supabase.auth.signOut()
      errorMessage.value = 'Access denied. You do not have administrator privileges.'
      return
    }

    toast.success('Welcome back!', { description: 'Signed in successfully.' })
    await navigateTo('/admin/dashboard')
  } catch {
    errorMessage.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="wrapper">
    <!-- ── Animated background ── -->
    <div class="bg-layer">
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />
    </div>

    <!-- ── Split layout ── -->
    <div class="split">

      <!-- Left decorative panel (desktop only) -->
      <aside class="left-panel">
        <div class="left-inner">
          <!-- Brand -->
          <div class="brand">
            <div class="brand-icon">
              <Leaf class="w-7 h-7 text-white" />
            </div>
            <span class="brand-name">Ethno Kenya</span>
          </div>

          <h1 class="tagline">
            Where Africa's<br />
            <span class="tagline-accent">Stories Unfold</span>
          </h1>
          <p class="sub-tagline">
            Manage your safari experiences, bookings, and content from one powerful dashboard.
          </p>

          <!-- Stats -->
          <div class="stats-card">
            <div class="stat">
              <span class="stat-num">250+</span>
              <span class="stat-lbl">Safari Packages</span>
            </div>
            <div class="stat-sep" />
            <div class="stat">
              <span class="stat-num">12K+</span>
              <span class="stat-lbl">Happy Guests</span>
            </div>
            <div class="stat-sep" />
            <div class="stat">
              <span class="stat-num">15+</span>
              <span class="stat-lbl">Years of Trust</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Right form panel -->
      <main class="right-panel">
        <div class="card">
          <!-- Mobile brand -->
          <div class="mobile-brand">
            <div class="brand-icon brand-icon--sm">
              <Leaf class="w-5 h-5 text-white" />
            </div>
          </div>

          <div class="card-header">
            <h2 class="card-title">Admin Portal</h2>
            <p class="card-desc">Sign in to manage Ethno Kenya Adventures</p>
          </div>

          <!-- Role pills -->
          <div class="role-pills">
            <span class="pill pill--green">Admin</span>
            <span class="pill pill--terra">Super Admin</span>
          </div>

          <!-- Error -->
          <Transition name="fade">
            <div v-if="errorMessage" class="error-box">
              <AlertCircle class="w-4 h-4 shrink-0 mt-0.5" />
              <p>{{ errorMessage }}</p>
            </div>
          </Transition>

          <!-- Form -->
          <form class="form" @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="field">
              <label for="login-email" class="field-label">Email Address</label>
              <input
                id="login-email"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="admin@ethnokenya.com"
                class="field-input"
                :disabled="isLoading"
              />
            </div>

            <!-- Password -->
            <div class="field">
              <div class="field-row">
                <label for="login-password" class="field-label">Password</label>
                <a href="#" class="forgot">Forgot password?</a>
              </div>
              <div class="input-wrap">
                <input
                  id="login-password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  placeholder="••••••••••"
                  class="field-input field-input--pr"
                  :disabled="isLoading"
                />
                <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                  <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Submit -->
            <button id="admin-login-submit" type="submit" class="submit-btn" :disabled="isLoading">
              <span v-if="isLoading" class="spinner" />
              <template v-else>
                <LogIn class="w-4 h-4" />
                Sign In to Dashboard
              </template>
            </button>
          </form>

          <!-- Footer -->
          <p class="card-footer">
            Protected by Supabase Auth &nbsp;·&nbsp;
            <NuxtLink to="/" class="footer-link">Return to site</NuxtLink>
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* ── Reset & base ───────────────────────────────────── */
* { box-sizing: border-box; }

/* ── Wrapper ────────────────────────────────────────── */
.wrapper {
  position: relative;
  min-height: 100vh;
  display: flex;
  overflow: hidden;
  background: #0d1610;
  font-family: 'Inter', sans-serif;
}

/* ── Background orbs ────────────────────────────────── */
.bg-layer {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 15% 50%, rgba(61,74,61,.2) 0%, transparent 55%),
              radial-gradient(ellipse at 85% 20%, rgba(162,80,53,.12) 0%, transparent 45%),
              radial-gradient(ellipse at 50% 90%, rgba(61,74,61,.1) 0%, transparent 50%);
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  animation: drift 14s ease-in-out infinite alternate;
}
.orb-1 { width: 500px; height: 500px; background: rgba(61,74,61,.22); top: -140px; left: -120px; }
.orb-2 { width: 320px; height: 320px; background: rgba(162,80,53,.12); bottom: -60px; left: 35%; animation-delay: 5s; }
.orb-3 { width: 280px; height: 280px; background: rgba(61,74,61,.14); top: 35%; right: -70px; animation-delay: 9s; }
@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(28px, -18px) scale(1.08); }
}

/* ── Split layout ───────────────────────────────────── */
.split {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  min-height: 100vh;
}

/* ── Left panel ─────────────────────────────────────── */
.left-panel {
  display: none;
  flex: 1;
  padding: 3rem;
  border-right: 1px solid rgba(255,255,255,.05);
  align-items: center;
  justify-content: center;
}
@media (min-width: 1024px) {
  .left-panel { display: flex; }
}
.left-inner { max-width: 420px; }

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
}
.brand-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background: linear-gradient(135deg, #3d4a3d, #263326);
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,.1);
  box-shadow: 0 8px 32px rgba(0,0,0,.35);
}
.brand-icon--sm {
  width: 40px;
  height: 40px;
  border-radius: 11px;
}
.brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #e8e2d9;
  letter-spacing: -0.01em;
}

.tagline {
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  line-height: 1.18;
  font-weight: 700;
  color: #f0e8dc;
  margin-bottom: 1.25rem;
}
.tagline-accent { color: #c4714e; }

.sub-tagline {
  font-size: .975rem;
  line-height: 1.72;
  color: rgba(240,232,220,.48);
  margin-bottom: 2.75rem;
}

.stats-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.4rem 1.6rem;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}
.stat { display: flex; flex-direction: column; align-items: center; gap: .2rem; flex: 1; }
.stat-num { font-size: 1.45rem; font-weight: 700; color: #f0e8dc; }
.stat-lbl { font-size: .72rem; color: rgba(240,232,220,.42); text-align: center; }
.stat-sep { width: 1px; height: 38px; background: rgba(255,255,255,.07); }

/* ── Right panel ────────────────────────────────────── */
.right-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.25rem;
}
@media (min-width: 1024px) {
  .right-panel { max-width: 500px; padding: 3rem 2.5rem; }
}

/* ── Card ───────────────────────────────────────────── */
.card {
  width: 100%;
  max-width: 430px;
  padding: 2.25rem;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.09);
  border-radius: 22px;
  backdrop-filter: blur(22px);
  box-shadow:
    0 0 0 1px rgba(255,255,255,.035),
    0 28px 60px rgba(0,0,0,.45),
    inset 0 1px 0 rgba(255,255,255,.07);
}

.mobile-brand {
  margin-bottom: 1.25rem;
}
@media (min-width: 1024px) {
  .mobile-brand { display: none; }
}

.card-header { margin-bottom: 1.5rem; }
.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.7rem;
  font-weight: 700;
  color: #f0e8dc;
  margin-bottom: .35rem;
}
.card-desc {
  font-size: .875rem;
  color: rgba(240,232,220,.48);
}

/* ── Role pills ─────────────────────────────────────── */
.role-pills { display: flex; gap: .5rem; margin-bottom: 1.6rem; }
.pill {
  font-size: .68rem;
  font-weight: 600;
  letter-spacing: .055em;
  text-transform: uppercase;
  padding: .22rem .6rem;
  border-radius: 99px;
}
.pill--green  { background: rgba(61,74,61,.38); color: #9ec89e; border: 1px solid rgba(61,74,61,.55); }
.pill--terra  { background: rgba(162,80,53,.22); color: #dfab90; border: 1px solid rgba(162,80,53,.4); }

/* ── Error box ──────────────────────────────────────── */
.error-box {
  display: flex;
  align-items: flex-start;
  gap: .6rem;
  padding: .8rem 1rem;
  margin-bottom: 1.4rem;
  background: rgba(239,68,68,.12);
  border: 1px solid rgba(239,68,68,.28);
  border-radius: 10px;
  color: #fca5a5;
  font-size: .86rem;
  animation: shake .3s ease;
}
@keyframes shake {
  0%,100% { transform: translateX(0); }
  30%      { transform: translateX(-5px); }
  70%      { transform: translateX(5px); }
}

/* ── Form ───────────────────────────────────────────── */
.form { display: flex; flex-direction: column; gap: 1.2rem; }
.field { display: flex; flex-direction: column; gap: .45rem; }
.field-row { display: flex; align-items: center; justify-content: space-between; }
.field-label { font-size: .83rem; font-weight: 500; color: rgba(240,232,220,.72); }
.forgot { font-size: .78rem; color: rgba(196,107,74,.75); text-decoration: none; transition: color .2s; }
.forgot:hover { color: #c4714e; }

.input-wrap { position: relative; }
.field-input {
  width: 100%;
  padding: .68rem .88rem;
  background: rgba(255,255,255,.055);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 10px;
  color: #f0e8dc;
  font-size: .9rem;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color .2s, background .2s, box-shadow .2s;
}
.field-input::placeholder { color: rgba(240,232,220,.24); }
.field-input:focus {
  border-color: rgba(61,74,61,.7);
  background: rgba(255,255,255,.075);
  box-shadow: 0 0 0 3px rgba(61,74,61,.18);
}
.field-input:disabled { opacity: .5; cursor: not-allowed; }
.field-input--pr { padding-right: 2.7rem; }

.eye-btn {
  position: absolute;
  top: 50%; right: .75rem;
  transform: translateY(-50%);
  background: none; border: none;
  color: rgba(240,232,220,.38);
  cursor: pointer; padding: .2rem;
  display: flex; align-items: center;
  transition: color .2s;
}
.eye-btn:hover { color: rgba(240,232,220,.78); }

/* ── Submit button ──────────────────────────────────── */
.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .6rem;
  padding: .78rem 1.2rem;
  margin-top: .4rem;
  background: linear-gradient(135deg, #3d4a3d 0%, #2b392b 100%);
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 10px;
  color: #f0e8dc;
  font-size: .9rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(0,0,0,.32);
  position: relative;
  overflow: hidden;
  transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
}
.submit-btn::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.07), transparent);
  opacity: 0;
  transition: opacity .22s;
}
.submit-btn:hover:not(:disabled)::after { opacity: 1; }
.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(0,0,0,.42);
  border-color: rgba(255,255,255,.16);
}
.submit-btn:active:not(:disabled) { transform: translateY(0); }
.submit-btn:disabled { opacity: .55; cursor: not-allowed; }

.spinner {
  display: inline-block;
  width: 15px; height: 15px;
  border: 2px solid rgba(240,232,220,.3);
  border-top-color: #f0e8dc;
  border-radius: 50%;
  animation: spin .65s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Footer ─────────────────────────────────────────── */
.card-footer {
  margin-top: 1.6rem;
  text-align: center;
  font-size: .77rem;
  color: rgba(240,232,220,.28);
}
.footer-link { color: rgba(196,107,74,.65); text-decoration: none; transition: color .2s; }
.footer-link:hover { color: #c4714e; }

/* ── Transitions ────────────────────────────────────── */
.fade-enter-active, .fade-leave-active { transition: opacity .25s, transform .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
