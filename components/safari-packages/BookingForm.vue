<template>
  <div class="booking-form bg-white rounded-2xl shadow-lg p-8">
    <!-- Form Header -->
    <div class="text-center mb-10">
      <h2 class="text-3xl font-serif text-brand-charcoal mb-4">
        Inquire About This Safari
      </h2>
      <p class="text-brand-charcoal/80">
        Fill in your details and we'll get back to you within 24 hours
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- First & Last Name -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <input
            v-model="formData.personalInfo.firstName"
            type="text"
            class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
            :class="{ 'border-red-500': errors.firstName }"
            placeholder="First Name"
          >
        </div>
        <div>
          <input
            v-model="formData.personalInfo.lastName"
            type="text"
            class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
            :class="{ 'border-red-500': errors.lastName }"
            placeholder="Last Name"
          >
        </div>
      </div>

      <!-- Phone -->
      <div>
        <input
          v-model="formData.personalInfo.phone"
          type="tel"
          class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
          :class="{ 'border-red-500': errors.phone }"
          placeholder="Phone"
        >
      </div>

      <!-- Email -->
      <div>
        <input
          v-model="formData.personalInfo.email"
          type="email"
          class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
          :class="{ 'border-red-500': errors.email }"
          placeholder="Email"
        >
      </div>

      <!-- Country -->
      <div>
        <select
          v-model="formData.personalInfo.nationality"
          class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg appearance-none bg-no-repeat bg-[right_1rem_center] bg-[length:1em_1em] focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
          :class="{ 'border-red-500': errors.nationality }"
          style="background-image: url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%22%236b7280%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22%2F%3E%3C%2Fsvg%3E');"
        >
          <option value="">Country</option>
          <option value="Kenya">Kenya</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Germany">Germany</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <!-- Tour Start Date (Calendar Picker) -->
      <div class="space-y-2">
        <label for="travelDate" class="block text-sm font-semibold text-brand-charcoal mb-1">
          When would you like to travel? *
        </label>
        <input 
          id="travelDate"
          v-model="bookingDate"
          type="date"
          required
          class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
        >
      </div>

      <!-- Adults & Children -->
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <label for="adults" class="block text-xs font-semibold text-brand-charcoal/60 uppercase tracking-wider ml-1">
            Number of Adults
          </label>
          <input
            id="adults"
            v-model.number="formData.travelPreferences.groupSize"
            type="number"
            min="1"
            class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
            placeholder="e.g. 2"
          >
        </div>
        <div class="space-y-1">
          <label for="children" class="block text-xs font-semibold text-brand-charcoal/60 uppercase tracking-wider ml-1">
            Number of Children
          </label>
          <input
            id="children"
            v-model.number="numChildren"
            type="number"
            min="0"
            class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
            placeholder="e.g. 1"
          >
        </div>
      </div>

      <!-- Extra Details -->
      <div>
        <textarea
          v-model="formData.travelPreferences.specialRequirements"
          rows="4"
          class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
          placeholder="Extra Details"
        ></textarea>
      </div>

      <!-- Terms & Newsletter (Optional but good to keep) -->
      <div class="flex items-start gap-2">
        <input v-model="additionalInfo.termsAccepted" type="checkbox" id="terms" class="mt-1">
        <label for="terms" class="text-xs text-brand-charcoal/60 leading-tight">I agree to the terms and understand this is a subject to availability.</label>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full py-4 bg-[#016DAA] text-white font-bold rounded-md transition-all duration-300 hover:bg-[#015a8d] disabled:opacity-50"
      >
        {{ isSubmitting ? 'Processing...' : 'Submit Booking' }}
      </button>
    </form>

    <!-- Success/Error Messages (Minimized) -->
    <div v-if="showSuccess" class="mt-4 text-center text-sm text-green-600 font-medium">
      Thank you! Inquiry sent.
    </div>
    <div v-if="showError" class="mt-4 text-center text-sm text-red-600 font-medium">
      Failed to send. Please try again.
    </div>
  </div>

</template>

<script setup lang="ts">
import type { BookingFormData, SafariPackage } from '~/types/safari-package'
import { getText } from '~/utils/translation-api'
import { validateBookingForm, createBookingSubmission } from '~/utils/package-data'

interface Props {
  package?: SafariPackage
  language?: string
  showPackageSelection?: boolean
  availablePackages?: SafariPackage[]
}

const props = withDefaults(defineProps<Props>(), {
  language: 'en',
  showPackageSelection: true,
  availablePackages: undefined
})

const emit = defineEmits<{
  submit: [bookingData: BookingFormData]
  success: [bookingData: BookingFormData]
  error: [error: string]
}>()

// Reactive state
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')

// Form data
const formData = ref<BookingFormData>({
  packageId: props.package?.id !== undefined ? String(props.package.id) : '',
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: '',
    passportNumber: ''
  },
  travelPreferences: {
    preferredDates: [''],
    flexibleDates: false,
    groupSize: 1,
    ages: [],
    specialRequirements: ''
  },
  accommodation: {
    preference: 'standard',
    dietaryRestrictions: '',
    additionalActivities: []
  },
  submitDate: new Date().toISOString(),
  status: 'pending'
})

// Additional form state (not part of BookingFormData)
const additionalInfo = ref({
  hearAboutUs: '',
  newsletter: false,
  termsAccepted: false
})

// Validation errors
const errors = ref<Record<string, string>>({})

const bookingDate = ref('')

const numChildren = ref(0)

// Methods
const addDate = () => {
  if (formData.value.travelPreferences.preferredDates.length < 3) {
    formData.value.travelPreferences.preferredDates.push('')
  }
}

const removeDate = (index: number) => {
  formData.value.travelPreferences.preferredDates.splice(index, 1)
}

const addAge = () => {
  if (formData.value.travelPreferences.ages.length < formData.value.travelPreferences.groupSize) {
    formData.value.travelPreferences.ages.push(0)
  }
}

const removeAge = (index: number) => {
  formData.value.travelPreferences.ages.splice(index, 1)
}

const validateForm = (): boolean => {
  const validation = validateBookingForm(formData.value)
  errors.value = validation.errors
  return validation.isValid
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  if (!additionalInfo.value.termsAccepted) {
    errors.value.termsAccepted = 'You must accept the terms and conditions'
    return
  }

  isSubmitting.value = true
  showError.value = false
  showSuccess.value = false

  try {
    // Prepare submission data
    const submission = createBookingSubmission(formData.value)
    
    // Construct email payload
    const emailPayload = {
      name: `${formData.value.personalInfo.firstName} ${formData.value.personalInfo.lastName}`,
      email: formData.value.personalInfo.email,
      phone: formData.value.personalInfo.phone,
      nationality: formData.value.personalInfo.nationality,
      safariName: props.package?.title || 'Unknown Safari',
      preferredDate: bookingDate.value || 'Flexible',
      groupSize: formData.value.travelPreferences.groupSize + numChildren.value,
      message: formData.value.travelPreferences.specialRequirements,
      type: 'booking' // Differentiate on server
    }

    // Send to API
    await $fetch('/api/contact', {
      method: 'POST',
      body: emailPayload
    })
    
    // Emit events
    emit('submit', submission.data)
    emit('success', submission.data)
    
    // Show success message
    showSuccess.value = true
    
    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
    }, 3000)
    
  } catch (error) {
    console.error('Booking submission error:', error)
    errorMessage.value = 'Failed to submit booking request. Please try again.'
    showError.value = true
    emit('error', errorMessage.value)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formData.value = {
    packageId: props.package?.id ? String(props.package.id) : '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      nationality: '',
      passportNumber: ''
    },
    travelPreferences: {
      preferredDates: [''],
      flexibleDates: false,
      groupSize: 1,
      ages: [],
      specialRequirements: ''
    },
    accommodation: {
      preference: 'standard',
      dietaryRestrictions: '',
      additionalActivities: []
    },
    submitDate: new Date().toISOString(),
    status: 'pending'
  }
  additionalInfo.value = {
    hearAboutUs: '',
    newsletter: false,
    termsAccepted: false
  }
  errors.value = {}
  showSuccess.value = false
  showError.value = false
}

// Initialize with package if provided
if (props.package) {
  formData.value.packageId = String(props.package.id)
}
</script>

<style scoped>
.booking-form {
  max-width: 800px;
  margin: 0 auto;
}

/* Custom checkbox styling */
input[type="checkbox"]:checked {
  background-color: #ea580c;
  border-color: #ea580c;
}

/* Focus states */
input:focus,
select:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
}

/* Error states */
.border-red-500 {
  border-color: #ef4444;
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .booking-form {
    padding: 1.5rem;
  }
  
  .grid-cols-1.md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>