<template>
  <!-- Special Offer Modal with Newsletter Subscription -->
  <div 
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    @click="closeModal"
  >
    <div 
      class="relative bg-brand-off-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-500"
      :class="modalAnimation"
      @click.stop
    >
      <!-- Close Button -->
      <button 
        @click="closeModal"
        class="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-brand-charcoal/10 hover:bg-brand-charcoal/20 transition-colors"
      >
        <svg class="w-5 h-5 text-brand-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Modal Content -->
      <div class="p-8">
        <!-- Hero Image -->
        <div class="relative h-48 mb-6 rounded-lg overflow-hidden">
          <img 
            src="https://res.cloudinary.com/ddfa67uba/image/upload/v1770492736/cheetah_on_car_ck0qre.jpg"
            alt="Cheetah on safari vehicle - Ethno Kenia Adventure"
            class="w-full h-full object-cover"
          >
          <!-- Overlay with Offer Badge -->
          <div class="absolute top-4 left-4 bg-brand-terracotta text-brand-off-white px-3 py-1 rounded-full text-sm font-bold">
            LIMITED TIME
          </div>
        </div>

        <!-- Offer Content -->
        <div class="text-center mb-6">
          <h3 class="text-2xl font-serif text-brand-charcoal mb-2">
            Exclusive Safari Adventure!
          </h3>
          <div class="text-4xl font-bold text-brand-terracotta mb-3">
            25% OFF
          </div>
          <p class="text-brand-charcoal/80 font-sans">
            Your gateway to unforgettable Kenyan wildlife experiences
          </p>
        </div>

        <!-- Newsletter Form -->
        <form @submit.prevent="subscribe" class="space-y-4">
          <div>
            <input 
              v-model="email"
              type="email"
              placeholder="Enter your email address"
              required
              class="w-full px-4 py-3 border border-brand-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-terracotta/50 focus:border-brand-terracotta transition-all"
            >
          </div>
          
          <button 
            type="submit"
            :disabled="isSubscribing"
            class="w-full bg-brand-terracotta text-brand-off-white py-3 px-6 rounded-lg font-sans font-medium transition-all duration-300 hover:bg-brand-terracotta/90 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isSubscribing">Get Your Discount</span>
            <span v-else>Subscribing...</span>
          </button>
        </form>

        <!-- Trust Indicators -->
        <div class="mt-6 pt-6 border-t border-brand-charcoal/10">
          <div class="flex items-center justify-center space-x-4 text-xs text-brand-charcoal/60">
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
              </svg>
              <span>Secure</span>
            </div>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <span>No Spam</span>
            </div>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              <span>Instant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showModal = ref(false)
const email = ref('')
const isSubscribing = ref(false)
const modalAnimation = ref('scale-95 opacity-0')

const closeModal = () => {
  modalAnimation.value = 'scale-95 opacity-0'
  setTimeout(() => {
    showModal.value = false
  }, 300)
}

const subscribe = async () => {
  isSubscribing.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Here you would normally send to your newsletter service
  console.log('Subscribed:', email.value)
  
  isSubscribing.value = false
  closeModal()
  
  // Store that user has subscribed
  localStorage.setItem('newsletter_subscribed', 'true')
}

onMounted(() => {
  // Show modal after 10 seconds if not previously shown
  const lastShown = localStorage.getItem('modal_last_shown')
  const hasSubscribed = localStorage.getItem('newsletter_subscribed')
  const now = new Date().getTime()
  
  console.log('OfferModal Debug:', { lastShown, hasSubscribed, now })
  
  // Don't show if user already subscribed or shown within last 7 days
  const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  
  if (!hasSubscribed && (!lastShown || (now - parseInt(lastShown)) > sevenDaysInMs)) {
    console.log('OfferModal: Should show modal')
    setTimeout(() => {
      console.log('OfferModal: Showing modal now')
      showModal.value = true
      setTimeout(() => {
        modalAnimation.value = 'scale-100 opacity-100'
      }, 100)
      
      // Record when modal was shown
      localStorage.setItem('modal_last_shown', now.toString())
    }, 3000) // Reduced to 3 seconds for testing
  } else {
    console.log('OfferModal: Not showing modal - conditions not met')
  }
})
</script>

<style scoped>
/* Modal animations */
.scale-95 {
  transform: scale(0.95);
}

.scale-100 {
  transform: scale(1);
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}
</style>
