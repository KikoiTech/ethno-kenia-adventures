<template>
  <!-- 
    CONTACT US PAGE: Ethno Kenia Adventures
    CONCEPT: Fun, engaging contact page with 60/30/10 rule
    VISION: African Heritage Symphony - Visual storytelling with GIF showcase
  -->
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    
    <!-- Hero Section with GIF -->
    <section class="relative py-20 md:py-32 overflow-hidden">
  <!-- Geographic Pattern Background -->
  <div class="absolute inset-0 opacity-[0.06]">
    <div class="absolute inset-0" 
         style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJtYXAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIi8+CiAgICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNtYXAiIG9wYWNpdHk9IjAuMyIvPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNtYXAiIG9wYWNpdHk9IjAuMyIvPgo8L3N2Zz4='); background-repeat: repeat; background-size: 100px 100px;">
    </div>
  </div>

  <div class="container mx-auto px-6 relative z-10">
    <div class="text-center max-w-5xl mx-auto">
      <h1 class="text-6xl md:text-8xl font-serif text-brand-charcoal mb-6 leading-tight">
        Let's Start Your
        <span class="text-brand-terracotta"> African Adventure</span>
      </h1>
      <div class="text-2xl md:text-3xl font-serif text-brand-charcoal/90 mb-8">
        Your Journey Begins Here
      </div>
      
      <!-- GIF Showcase -->
      <div class="relative mb-12">
        <div class="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc2M2NwY3p0MHhvYmY4a2FqZ3dpc2p6aW5qcGdub3JlY2xlYSZlcD12MV9pbnRlcm5hdGlvbl9naWZmaWlmYm9lbnw/3DqW5Qb3h3/giphy.gif"
            alt="Ethno Kenia Adventures - Wildlife and adventure showcase"
            class="w-full h-auto"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/20 to-transparent rounded-3xl"></div>
        </div>
        <p class="mt-4 text-lg text-brand-charcoal/80 font-serif italic">
          "From savanna sunrises to mountain peaks, your adventure awaits"
        </p>
      </div>
    </div>
  </div>
</section>

<!-- 60/30/10 Rule Section -->
<section class="py-16 md:py-24 bg-brand-off-white/50">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-serif text-brand-charcoal mb-6">
        Why Choose Ethno Kenia Adventures?
      </h2>
      <p class="text-xl text-brand-charcoal/80 max-w-3xl mx-auto leading-relaxed">
        Our 60/30/10 promise ensures your adventure exceeds expectations
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <!-- 60% - Experience -->
      <div class="text-center group">
        <div class="w-24 h-24 mx-auto mb-6 bg-brand-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-brand-terracotta/20 transition-colors duration-300">
          <div class="text-3xl font-bold text-brand-terracotta">60%</div>
        </div>
        <h3 class="text-2xl font-serif text-brand-charcoal mb-4">Local Experience</h3>
        <p class="text-brand-charcoal/80 font-sans leading-relaxed">
          60% of our guides are born and raised in Kenya, bringing authentic local knowledge and deep cultural connections to every safari.
        </p>
      </div>

      <!-- 30% - Conservation -->
      <div class="text-center group">
        <div class="w-24 h-24 mx-auto mb-6 bg-brand-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-brand-terracotta/20 transition-colors duration-300">
          <div class="text-3xl font-bold text-brand-terracotta">30%</div>
        </div>
        <h3 class="text-2xl font-serif text-brand-charcoal mb-4">Conservation Focus</h3>
        <p class="text-brand-charcoal/80 font-sans leading-relaxed">
          30% of all profits go directly to wildlife conservation and community development projects across Kenya.
        </p>
      </div>

      <!-- 10% - Adventure -->
      <div class="text-center group">
        <div class="w-24 h-24 mx-auto mb-6 bg-brand-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-brand-terracotta/20 transition-colors duration-300">
          <div class="text-3xl font-bold text-brand-terracotta">10%</div>
        </div>
        <h3 class="text-2xl font-serif text-brand-charcoal mb-4">Adventure Guarantee</h3>
        <p class="text-brand-charcoal/80 font-sans leading-relaxed">
          10% adventure guarantee - if you don't see the Big 5, we'll extend your safari for free!
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Contact Form Section -->
<section class="py-16 md:py-24">
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
      <!-- Contact Form -->
      <div>
        <h2 class="text-4xl font-serif text-brand-charcoal mb-8">
          Start Planning Your Safari
        </h2>
        
        <form class="space-y-6">
          <!-- Name Input -->
          <div>
            <label class="block text-brand-charcoal font-serif font-semibold mb-2">
              Your Name *
            </label>
            <input 
              type="text" 
              required
              class="w-full px-4 py-3 border-2 border-brand-charcoal/20 rounded-lg focus:border-brand-terracotta focus:outline-none transition-colors duration-300"
              placeholder="John Doe"
            >
          </div>

          <!-- Email Input -->
          <div>
            <label class="block text-brand-charcoal font-serif font-semibold mb-2">
              Email Address *
            </label>
            <input 
              type="email" 
              required
              class="w-full px-4 py-3 border-2 border-brand-charcoal/20 rounded-lg focus:border-brand-terracotta focus:outline-none transition-colors duration-300"
              placeholder="john@example.com"
            >
          </div>

          <!-- Phone Input -->
          <div>
            <label class="block text-brand-charcoal font-serif font-semibold mb-2">
              Phone Number
            </label>
            <input 
              type="tel" 
              class="w-full px-4 py-3 border-2 border-brand-charcoal/20 rounded-lg focus:border-brand-terracotta focus:outline-none transition-colors duration-300"
              placeholder="+254 702 373 008"
            >
          </div>

          <!-- Safari Type -->
          <div>
            <label class="block text-brand-charcoal font-serif font-semibold mb-2">
              Safari Type *
            </label>
            <select 
              required
              class="w-full px-4 py-3 border-2 border-brand-charcoal/20 rounded-lg focus:border-brand-terracotta focus:outline-none transition-colors duration-300"
            >
              <option value="">Select your safari type</option>
              <option value="luxury">Luxury Safari</option>
              <option value="family">Family Safari</option>
              <option value="adventure">Adventure Safari</option>
              <option value="photography">Photography Safari</option>
              <option value="cultural">Cultural Safari</option>
              <option value="honeymoon">Honeymoon Safari</option>
            </select>
          </div>

          <!-- Message -->
          <div>
            <label class="block text-brand-charcoal font-serif font-semibold mb-2">
              Tell us about your dream safari *
            </label>
            <textarea 
              required
              rows="4"
              class="w-full px-4 py-3 border-2 border-brand-charcoal/20 rounded-lg focus:border-brand-terracotta focus:outline-none transition-colors duration-300"
              placeholder="I've always dreamed of seeing the Great Migration..."
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            class="w-full px-8 py-4 bg-brand-terracotta text-brand-off-white font-serif font-semibold rounded-full transition-all duration-300 hover:bg-brand-terracotta/90 hover:scale-105 hover:shadow-lg"
          >
            Start My African Adventure
          </button>
        </form>
      </div>

      <!-- Contact Info & Visuals -->
      <div class="space-y-8">
        <!-- Quick Contact -->
        <div class="bg-brand-off-white rounded-2xl p-8 shadow-lg">
          <h3 class="text-2xl font-serif text-brand-charcoal mb-6">
            Quick Contact
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-brand-terracotta/10 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-brand-terracotta" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <div>
                <div class="font-serif text-brand-charcoal font-semibold">Phone</div>
                <div class="text-brand-charcoal/80">+254 702 373 008</div>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-brand-terracotta/10 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-brand-terracotta" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <div>
                <div class="font-serif text-brand-charcoal font-semibold">Email</div>
                <div class="text-brand-charcoal/80">info@ethnokeniaadventure.com</div>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-brand-terracotta/10 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-brand-terracotta" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l4.95-4.95a7 7 0 11-9.9-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <div class="font-serif text-brand-charcoal font-semibold">Office</div>
                <div class="text-brand-charcoal/80">Nairobi, Kenya</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Showcase -->
        <div class="bg-brand-off-white rounded-2xl p-8 shadow-lg">
          <h3 class="text-2xl font-serif text-brand-charcoal mb-6">
            Visual Adventures
          </h3>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="relative rounded-lg overflow-hidden h-32">
              <img 
                src="https://res.cloudinary.com/dmdihuyvn/image/upload/v1770905953/DSC_0360_uubkrj.jpg"
                alt="Wildlife safari experience"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              >
            </div>
            <div class="relative rounded-lg overflow-hidden h-32">
              <img 
                src="https://res.cloudinary.com/dmdihuyvn/image/upload/v1770977461/DSC_0090_udmgbc.jpg"
                alt="Big cat sighting"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              >
            </div>
            <div class="relative rounded-lg overflow-hidden h-32">
              <img 
                src="https://res.cloudinary.com/dmdihuyvn/image/upload/v1770905978/DSC_0559_tz9q2t.jpg"
                alt="Mountain landscape"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              >
            </div>
            <div class="relative rounded-lg overflow-hidden h-32">
              <img 
                src="https://res.cloudinary.com/dmdihuyvn/image/upload/v1770905930/DSC_0241_dt68u6.jpg"
                alt="Elephant herd"
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              >
            </div>
          </div>
          
          <p class="mt-4 text-sm text-brand-charcoal/80 font-serif italic">
            "Every safari tells a unique story - what will yours be?"
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Fun Call to Action -->
<section class="py-20 md:py-32 bg-gradient-to-br from-brand-charcoal via-brand-terracotta to-brand-charcoal text-brand-off-white">
  <div class="container mx-auto px-6">
    <div class="text-center max-w-5xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-serif mb-6">
        Ready for the Adventure of a Lifetime?
      </h2>
      <div class="w-32 h-1 bg-brand-off-white mx-auto mb-8"></div>
      <p class="text-2xl font-light text-brand-off-white/95 max-w-3xl mx-auto leading-relaxed font-serif italic mb-12">
        "The best time to start your African adventure was yesterday. The second best time is now!"
      </p>
      
      <div class="flex flex-col sm:flex-row gap-8 justify-center">
        <a 
          href="tel:+254123456789"
          class="inline-flex items-center justify-center px-10 py-4 bg-brand-off-white text-brand-charcoal font-sans font-medium rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
          </svg>
          <span>Call Now +254 702 373 008</span>
        </a>
        <a 
          href="mailto:info@ethnokeniaadventure.com"
          class="inline-flex items-center justify-center px-10 py-4 border-2 border-brand-off-white text-brand-off-white font-sans font-medium rounded-full transition-all duration-500 hover:bg-brand-off-white hover:text-brand-charcoal"
        >
          <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
          </svg>
          <span>Email Us</span>
        </a>
      </div>
    </div>
  </div>
</section>

  </div>
</template>

<script setup lang="ts">
// Page title and meta
useHead({
  title: 'Contact Us - Ethno Kenia Adventures',
  meta: [
    { name: 'description', content: 'Contact Ethno Kenia Adventures to start your African adventure. Our 60/30/10 promise ensures authentic local experience, conservation focus, and adventure guarantee.' },
    { name: 'keywords', content: 'Ethno Kenia Adventures, contact us, safari booking, African adventure, wildlife safari, Kenya tourism, 60/30/10 rule' }
  ]
})
</script>

<style scoped>
/* Fun hover effects */
.group:hover .group-hover\:bg-brand-terracotta\/20 {
  background-color: rgb(146 64 14 / 0.2);
}

/* Image hover effects */
.hover\:scale-110:hover {
  transform: scale(1.1);
}
</style>