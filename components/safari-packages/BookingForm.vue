<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Error banner -->
    <div v-if="showError" class="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
      Failed to send. Please try again or email us directly.
    </div>

    <!-- Success state replaces form fields -->
    <div v-if="showSuccess" class="p-4 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100 text-center">
      <svg class="w-8 h-8 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="font-bold">Thank you for your inquiry!</p>
      <p class="mt-1 text-green-600/80">We have received your booking request and will contact you within 24 hours.</p>
    </div>

    <template v-else>
      <!-- First & Last Name -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <input
            v-model="firstName"
            type="text"
            placeholder="First Name *"
            :class="['form-input', errors.firstName ? 'border-red-400' : '']"
          />
          <p v-if="errors.firstName" class="mt-1 text-xs text-red-500">{{ errors.firstName }}</p>
        </div>
        <div>
          <input
            v-model="lastName"
            type="text"
            placeholder="Last Name *"
            :class="['form-input', errors.lastName ? 'border-red-400' : '']"
          />
          <p v-if="errors.lastName" class="mt-1 text-xs text-red-500">{{ errors.lastName }}</p>
        </div>
      </div>

      <!-- Phone -->
      <input v-model="phone" type="tel" placeholder="Phone" class="form-input" />

      <!-- Email -->
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Email *"
          :class="['form-input', errors.email ? 'border-red-400' : '']"
        />
        <p v-if="errors.email" class="mt-1 text-xs text-red-500">{{ errors.email }}</p>
      </div>

      <!-- Country -->
      <select v-model="nationality" class="form-input">
        <option value="">Country (optional)</option>
        <option value="US">United States</option>
        <option value="UK">United Kingdom</option>
        <option value="KE">Kenya</option>
        <option value="DE">Germany</option>
        <option value="Other">Other</option>
      </select>

      <!-- Travel Date -->
      <div>
        <label class="text-[10px] uppercase tracking-wider font-bold mb-1 block">When would you like to travel? *</label>
        <input
          v-model="bookingDate"
          type="date"
          :class="['form-input', errors.bookingDate ? 'border-red-400' : '']"
        />
        <p v-if="errors.bookingDate" class="mt-1 text-xs text-red-500">{{ errors.bookingDate }}</p>
      </div>

      <!-- Adults & Children -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-[8px] uppercase tracking-wider font-bold mb-1 block">Number of Adults</label>
          <input v-model.number="adults" type="number" min="1" class="form-input" />
        </div>
        <div>
          <label class="text-[8px] uppercase tracking-wider font-bold mb-1 block">Number of Children</label>
          <input v-model.number="children" type="number" min="0" class="form-input" />
        </div>
      </div>

      <!-- Extra Details -->
      <textarea v-model="message" placeholder="Extra Details (optional)" rows="3" class="form-input"></textarea>

      <!-- Terms -->
      <div class="flex items-start gap-3 py-4">
        <input v-model="termsAccepted" type="checkbox" id="bf-terms" class="mt-1" />
        <label for="bf-terms" class="text-[9px] text-gray-500 leading-tight">
          I agree to the terms and understand this is subject to availability.
        </label>
      </div>
      <p v-if="errors.terms" class="text-xs text-red-500 -mt-3">{{ errors.terms }}</p>

      <!-- Submit -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full py-4 bg-[#006699] text-white rounded-lg font-bold hover:bg-brand-charcoal transition-all shadow-md uppercase tracking-wider text-sm disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
      >
        <span v-if="isSubmitting" class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
        {{ isSubmitting ? 'Sending...' : 'Submit Booking' }}
      </button>
    </template>
  </form>
</template>

<script setup lang="ts">
import type { SafariPackage } from '~/types/safari-package'

interface Props {
  package?: SafariPackage
}

const props = defineProps<Props>()

const emit = defineEmits<{
  success: []
  error: [error: string]
}>()

const isSubmitting  = ref(false)
const showSuccess   = ref(false)
const showError     = ref(false)

const firstName     = ref('')
const lastName      = ref('')
const email         = ref('')
const phone         = ref('')
const nationality   = ref('')
const bookingDate   = ref('')
const adults        = ref(1)
const children      = ref(0)
const message       = ref('')
const termsAccepted = ref(false)

const errors = ref<Record<string, string>>({})

function validate(): boolean {
  const e: Record<string, string> = {}
  if (!firstName.value.trim())  e.firstName   = 'First name is required'
  if (!lastName.value.trim())   e.lastName    = 'Last name is required'
  if (!email.value.trim())      e.email       = 'Email is required'
  if (!bookingDate.value)       e.bookingDate = 'Travel date is required'
  if (!termsAccepted.value)     e.terms       = 'You must accept the terms'
  errors.value = e
  return Object.keys(e).length === 0
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  showError.value    = false

  try {
    await $fetch('/api/inquiries', {
      method: 'POST',
      body: {
        trip_id:        props.package?.id ?? null,
        first_name:     firstName.value.trim(),
        last_name:      lastName.value.trim(),
        email:          email.value.trim(),
        phone:          phone.value || null,
        travel_date:    bookingDate.value || null,
        adults_count:   adults.value,
        children_count: children.value,
        message:        message.value || null,
      },
    })

    showSuccess.value = true
    emit('success')

  } catch (err: any) {
    console.error('Booking submission error:', err)
    showError.value = true
    emit('error', err.message ?? 'Submission failed')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-terracotta focus:outline-none transition-all text-sm;
}
</style>
