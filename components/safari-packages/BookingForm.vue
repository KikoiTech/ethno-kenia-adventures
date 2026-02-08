<template>
  <div class="booking-form bg-white rounded-2xl shadow-lg p-8">
    <!-- Form Header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-serif text-brand-charcoal mb-4">
        Book Your Safari Adventure
      </h2>
      <p class="text-brand-charcoal/80">
        Fill in your details and we'll get back to you within 24 hours
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Package Selection -->
      <div v-if="showPackageSelection" class="bg-brand-off-white/50 rounded-xl p-6">
        <h3 class="text-xl font-serif text-brand-charcoal mb-4">Select Package</h3>
        <select 
          v-model="formData.packageId"
          class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
          :class="{ 'border-red-500': errors.packageId }"
        >
          <option value="">Choose a safari package...</option>
          <option 
            v-for="pkg in availablePackages" 
            :key="pkg.id"
            :value="pkg.id"
          >
            {{ getText(pkg.title, language) }} - {{ pkg.duration }}
          </option>
        </select>
        <p v-if="errors.packageId" class="text-red-500 text-sm mt-1">{{ errors.packageId }}</p>
      </div>

      <!-- Personal Information -->
      <div>
        <h3 class="text-xl font-serif text-brand-charcoal mb-6">Personal Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">First Name *</label>
            <input
              v-model="formData.personalInfo.firstName"
              type="text"
              class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
              :class="{ 'border-red-500': errors.firstName }"
              placeholder="John"
            >
            <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>
          </div>

          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">Last Name *</label>
            <input
              v-model="formData.personalInfo.lastName"
              type="text"
              class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
              :class="{ 'border-red-500': errors.lastName }"
              placeholder="Doe"
            >
            <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</p>
          </div>

          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">Email Address *</label>
            <input
              v-model="formData.personalInfo.email"
              type="email"
              class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
              :class="{ 'border-red-500': errors.email }"
              placeholder="john.doe@example.com"
            >
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">Phone Number *</label>
            <input
              v-model="formData.personalInfo.phone"
              type="tel"
              class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
              :class="{ 'border-red-500': errors.phone }"
              placeholder="+254 123 456 789"
            >
            <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
          </div>

          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">Nationality *</label>
            <select
              v-model="formData.personalInfo.nationality"
              class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
              :class="{ 'border-red-500': errors.nationality }"
            >
              <option value="">Select nationality...</option>
              <option value="Kenyan">Kenyan</option>
              <option value="American">American</option>
              <option value="British">British</option>
              <option value="Canadian">Canadian</option>
              <option value="Australian">Australian</option>
              <option value="German">German</option>
              <option value="French">French</option>
              <option value="Other">Other</option>
            </select>
            <p v-if="errors.nationality" class="text-red-500 text-sm mt-1">{{ errors.nationality }}</p>
          </div>

          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">Date of Birth</label>
            <input
              v-model="formData.personalInfo.dateOfBirth"
              type="date"
              class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
            >
          </div>

          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">Passport Number</label>
            <input
              v-model="formData.personalInfo.passportNumber"
              type="text"
              class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
              placeholder="A12345678"
            >
          </div>
        </div>
      </div>

      <!-- Travel Preferences -->
      <div>
        <h3 class="text-xl font-serif text-brand-charcoal mb-6">Travel Preferences</h3>
        <div class="space-y-6">
          <!-- Preferred Dates -->
          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">Preferred Travel Dates *</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div v-for="(date, index) in formData.travelPreferences.preferredDates" :key="index" class="flex items-center gap-2">
                <input
                  v-model="formData.travelPreferences.preferredDates[index]"
                  type="date"
                  class="flex-1 px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
                >
                <button
                  v-if="formData.travelPreferences.preferredDates.length > 1"
                  type="button"
                  @click="removeDate(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
            <button
              v-if="formData.travelPreferences.preferredDates.length < 3"
              type="button"
              @click="addDate"
              class="text-brand-terracotta hover:text-brand-terracotta/80 font-medium"
            >
              + Add another date
            </button>
            <p v-if="errors.preferredDates" class="text-red-500 text-sm mt-1">{{ errors.preferredDates }}</p>
          </div>

          <!-- Group Size -->
          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">Group Size *</label>
            <div class="flex items-center gap-4">
              <input
                v-model.number="formData.travelPreferences.groupSize"
                type="number"
                min="1"
                max="20"
                class="w-32 px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
                :class="{ 'border-red-500': errors.groupSize }"
              >
              <span class="text-brand-charcoal/60">people</span>
            </div>
            <p v-if="errors.groupSize" class="text-red-500 text-sm mt-1">{{ errors.groupSize }}</p>
          </div>

          <!-- Ages of Travelers -->
          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">Ages of Travelers *</label>
            <p class="text-sm text-brand-charcoal/60 mb-3">Please provide ages for all travelers (including children)</p>
            <div class="space-y-2">
              <div v-for="(age, index) in formData.travelPreferences.ages" :key="index" class="flex items-center gap-2">
                <span class="text-brand-charcoal/80 w-20">Traveler {{ index + 1 }}:</span>
                <input
                  v-model.number="formData.travelPreferences.ages[index]"
                  type="number"
                  min="0"
                  max="120"
                  class="w-24 px-3 py-2 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
                  placeholder="Age"
                >
                <span class="text-brand-charcoal/60">years</span>
                <button
                  v-if="formData.travelPreferences.ages.length > 1"
                  type="button"
                  @click="removeAge(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
            <button
              v-if="formData.travelPreferences.ages.length < formData.travelPreferences.groupSize"
              type="button"
              @click="addAge"
              class="text-brand-terracotta hover:text-brand-terracotta/80 font-medium text-sm mt-2"
            >
              + Add traveler age
            </button>
            <p v-if="errors.ages" class="text-red-500 text-sm mt-1">{{ errors.ages }}</p>
          </div>

          <!-- Special Requirements -->
          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">Special Requirements</label>
            <textarea
              v-model="formData.travelPreferences.specialRequirements"
              rows="4"
              class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
              placeholder="Any dietary restrictions, mobility needs, or special requests..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div>
        <h3 class="text-xl font-serif text-brand-charcoal mb-6">Additional Information</h3>
        <div class="space-y-6">
          <!-- How did you hear about us? -->
          <div>
            <label class="block text-brand-charcoal/80 font-medium mb-2">How did you hear about us?</label>
            <select
              v-model="additionalInfo.hearAboutUs"
              class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50"
            >
              <option value="">Please select...</option>
              <option value="Google">Google Search</option>
              <option value="Social Media">Social Media</option>
              <option value="Friend">Friend/Referral</option>
              <option value="Travel Agent">Travel Agent</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <!-- Newsletter -->
          <div class="flex items-center">
            <input
              v-model="additionalInfo.newsletter"
              type="checkbox"
              id="newsletter"
              class="w-4 h-4 text-brand-terracotta border-brand-charcoal/20 rounded focus:ring-brand-terracotta/50"
            >
            <label for="newsletter" class="ml-2 text-brand-charcoal/80">
              I'd like to receive travel tips and special offers via email
            </label>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-start">
            <input
              v-model="additionalInfo.termsAccepted"
              type="checkbox"
              id="terms"
              class="w-4 h-4 text-brand-terracotta border-brand-charcoal/20 rounded focus:ring-brand-terracotta/50 mt-1"
            >
            <label for="terms" class="ml-2 text-brand-charcoal/80 text-sm">
              I agree to the terms and conditions and understand that this is a booking request subject to availability and confirmation
            </label>
          </div>
          <p v-if="errors.termsAccepted" class="text-red-500 text-sm mt-1">{{ errors.termsAccepted }}</p>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="text-center">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="inline-flex items-center px-8 py-4 bg-brand-terracotta text-brand-off-white font-sans font-medium rounded-full transition-all duration-300 hover:bg-brand-terracotta/90 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isSubmitting ? 'Submitting...' : 'Submit Booking Request' }}
        </button>
      </div>
    </form>

    <!-- Success Message -->
    <div v-if="showSuccess" class="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-lg font-semibold text-green-800">Booking Request Submitted!</h3>
          <p class="text-green-700 mt-1">We'll contact you within 24 hours to confirm your safari adventure.</p>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="showError" class="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex items-center">
        <svg class="w-6 h-6 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <div>
          <h3 class="text-lg font-semibold text-red-800">Submission Failed</h3>
          <p class="text-red-700 mt-1">{{ errorMessage }}</p>
        </div>
      </div>
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
  packageId: props.package?.id || '',
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
    // Create booking submission
    const submission = createBookingSubmission(formData.value)
    
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
    packageId: props.package?.id || '',
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
  formData.value.packageId = props.package.id
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