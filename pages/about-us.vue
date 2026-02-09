<template>
  <!-- 
    ABOUT US PAGE: Ethno Kenia Adventures
    CONCEPT: Natural, geographic style connecting to Kenya's landscapes and heritage
    VISION: African Heritage Symphony - Rooted in Kenyan geography and culture
  -->
  <div class="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
    
    <!-- Hero Section with Geographic Elements -->
    <section class="relative py-20 md:py-32 overflow-hidden">
      <!-- Geographic Pattern Background -->
      <div class="absolute inset-0 opacity-[0.06]">
        <div class="absolute inset-0" 
             style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJtYXAiIHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIi8+CiAgICAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgibWFwIiBvcGFjaXR5PSIwLjMiIvPgogICAgPC9kZWZzPgogICAgPHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9InVybCgibWFwIiBvcGFjaXR5PSIwLjMiIvPgogIDwvc3ZnPg=='); background-repeat: repeat; background-size: 100px 100px;">
        </div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <!-- Left Side - Hero Image -->
          <div class="relative h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
            <img 
              src="https://images.pexels.com/photos/15250/pexels-photo-15250.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=2"
              alt="Kenyan geographic landscape with Mount Kenya silhouette"
              class="w-full h-full object-cover"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent"></div>
          </div>
          
          <!-- Right Side - Hero Content -->
          <div class="text-center lg:text-left order-1 lg:order-2">
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-charcoal mb-6 leading-tight">
              About
              <span class="text-brand-terracotta"> Ethno Kenia Adventures</span>
            </h1>
            <div class="text-xl md:text-2xl lg:text-3xl font-serif text-brand-charcoal/90 mb-8">
              Rooted in the Heart of Africa
            </div>
            <p class="text-lg md:text-xl font-light text-brand-charcoal/80 leading-relaxed">
              Born from the vast savannas and ancient mountains of Kenya, 
              we are custodians of authentic African experiences, 
              connecting travelers to the soul of our magnificent land.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="py-16 md:py-24 bg-brand-off-white/50">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Story Content -->
          <div class="space-y-6">
            <h2 class="text-4xl font-serif text-brand-charcoal mb-6">
              Our Geographic Heritage
            </h2>
            <div class="space-y-4 text-brand-charcoal/80 font-sans leading-relaxed">
              <p>
                From the snow-capped peaks of Mount Kenya to the golden plains of the Maasai Mara, 
                our story is woven into the very fabric of this land. We are not just tour operators; 
                we are storytellers, guardians, and passionate advocates for Kenya's natural treasures.
              </p>
              <p>
                Founded by Kenyan guides who have spent decades tracking wildlife through acacia-dotted landscapes, 
                we understand every contour, every seasonal migration, every hidden waterhole that makes 
                this ecosystem extraordinary.
              </p>
              <p>
                Our heritage is your guarantee of authentic experiences that honor both the land and its people, 
                creating journeys that resonate with the rhythm of Africa itself.
              </p>
            </div>
          </div>
          
          <!-- Geographic Image -->
          <div class="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
              alt="Kenyan landscape with Mount Kenya and savanna"
              class="w-full h-full object-cover"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- National Geographic Style Guide Section -->
    <section class="relative py-20 md:py-32 overflow-hidden">
      <!-- Geographic Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-orange-900/5 to-yellow-900/10">
        <div class="absolute inset-0 opacity-[0.03]" 
             style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJtYXAiIHg9IjAiIHk9IjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIi8+CiAgICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNtYXAiIG9wYWNpdHk9IjAuMSIvPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNtYXApIG9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4='); background-repeat: repeat; background-size: 200px 200px;">
        </div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <!-- Nat Geo Style Header -->
        <div class="text-center mb-20">
          <div class="inline-block">
            <div class="border-t-8 border-brand-terracotta w-32 mx-auto mb-4"></div>
            <h1 class="text-5xl md:text-6xl font-serif text-brand-charcoal font-bold tracking-wide">
              EXPLORERS OF THE
              <span class="text-brand-terracotta"> WILD</span>
            </h1>
            <div class="border-b-8 border-brand-terracotta w-32 mx-auto mt-4"></div>
          </div>
          <p class="mt-8 text-xl md:text-2xl font-serif text-brand-charcoal/90 italic max-w-4xl mx-auto">
            "In the heart of Africa, some souls speak the language of the wild"
          </p>
        </div>

        <!-- Feature Story - James Kiprop -->
        <div class="mb-32">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <!-- Story Content -->
            <div class="lg:order-2">
              <div class="mb-6">
                <div class="flex items-center space-x-4 mb-4">
                  <div class="w-16 h-16 rounded-full overflow-hidden border-4 border-brand-terracotta">
                    <img 
                      src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
                      alt="James Kiprop - Lion Whisperer"
                      class="w-full h-full object-cover"
                    >
                  </div>
                  <div>
                    <h3 class="text-2xl font-serif text-brand-charcoal font-bold">James Kiprop</h3>
                    <p class="text-brand-terracotta font-serif">Lion Whisperer • 15 Years</p>
                  </div>
                </div>
              </div>
              
              <h2 class="text-4xl font-serif text-brand-charcoal font-bold mb-6">
                The Lion's
                <span class="text-brand-terracotta"> Legacy</span>
              </h2>
              
              <div class="space-y-6 text-brand-charcoal/80 font-serif text-lg leading-relaxed">
                <p class="first-letter:text-6xl first-letter:font-bold first-letter:text-brand-terracotta first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                  "At age seven, I watched a lioness teach her cubs to hunt. That single moment rewired my understanding of family, patience, and survival. Today, I track the same bloodlines across the Maasai Mara, knowing every scar, every hunting ground, every secret waterhole."
                </p>
                
                <div class="bg-brand-terracotta/10 border-l-4 border-brand-terracotta p-6 italic">
                  "When you hear a lion roar at dawn, you're not just hearing an animal - you're hearing the heartbeat of Africa itself."
                </div>
                
                <p>
                  James has guided over 3,000 safaris, tracked 127 different lion prides, and can identify individual big cats by their unique whisker patterns. His childhood dream of protecting lions has become his life's mission.
                </p>
              </div>
            </div>
            
            <!-- Dramatic Image -->
            <div class="lg:order-1 relative h-96 lg:h-full min-h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/33098/leopard-africa-wildlife-big-cat.jpg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                alt="Lion in Maasai Mara at sunset"
                class="w-full h-full object-cover"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-6 left-6 text-brand-off-white">
                <div class="text-sm font-serif mb-2">PHOTOGRAPH BY JAMES KIPROP</div>
                <div class="text-xs">MAASAI MARA RESERVE • 2024</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature Story - Grace Wanjiru -->
        <div class="mb-32">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <!-- Story Content -->
            <div class="lg:order-1">
              <div class="mb-6">
                <div class="flex items-center space-x-4 mb-4">
                  <div class="w-16 h-16 rounded-full overflow-hidden border-4 border-brand-terracotta">
                    <img 
                      src="https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
                      alt="Grace Wanjiru - Cultural Keeper"
                      class="w-full h-full object-cover"
                    >
                  </div>
                  <div>
                    <h3 class="text-2xl font-serif text-brand-charcoal font-bold">Grace Wanjiru</h3>
                    <p class="text-brand-terracotta font-serif">Cultural Keeper • Heritage Guardian</p>
                  </div>
                </div>
              </div>
              
              <h2 class="text-4xl font-serif text-brand-charcoal font-bold mb-6">
                Voices of the
                <span class="text-brand-terracotta"> Earth</span>
              </h2>
              
              <div class="space-y-6 text-brand-charcoal/80 font-serif text-lg leading-relaxed">
                <p class="first-letter:text-6xl first-letter:font-bold first-letter:text-brand-terracotta first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                  "My grandmother was a traditional healer who spoke to elephants. She taught me that every plant has a spirit, every animal carries wisdom, and every sunrise brings healing. Today, I bridge ancient knowledge with modern conservation."
                </p>
                
                <div class="bg-brand-terracotta/10 border-l-4 border-brand-terracotta p-6 italic">
                  "When tourists learn our tribal dances, they're not just learning steps - they're absorbing centuries of survival, celebration, and connection to this land."
                </div>
                
                <p>
                  Grace has preserved 47 traditional ceremonies, documented 234 medicinal plants, and teaches Maasai warrior traditions to the next generation. Her work ensures Kenya's cultural heritage thrives alongside its wildlife.
                </p>
              </div>
            </div>
            
            <!-- Dramatic Image -->
            <div class="lg:order-2 relative h-96 lg:h-full min-h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/36762/elephant-african-wildlife-animal.jpg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                alt="Elephant herd at watering hole"
                class="w-full h-full object-cover"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-6 left-6 text-brand-off-white">
                <div class="text-sm font-serif mb-2">PHOTOGRAPH BY GRACE WANJIRU</div>
                <div class="text-xs">AMBOSELI NATIONAL PARK • 2024</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature Story - Samuel Kirubi -->
        <div class="mb-32">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <!-- Story Content -->
            <div class="lg:order-2">
              <div class="mb-6">
                <div class="flex items-center space-x-4 mb-4">
                  <div class="w-16 h-16 rounded-full overflow-hidden border-4 border-brand-terracotta">
                    <img 
                      src="https://images.pexels.com/photos/2182972/pexels-photo-2182972.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
                      alt="Samuel Kirubi - Mountain Guardian"
                      class="w-full h-full object-cover"
                    >
                  </div>
                  <div>
                    <h3 class="text-2xl font-serif text-brand-charcoal font-bold">Samuel Kirubi</h3>
                    <p class="text-brand-terracotta font-serif">Mountain Guardian • Forest Protector</p>
                  </div>
                </div>
              </div>
              
              <h2 class="text-4xl font-serif text-brand-charcoal font-bold mb-6">
                Above the
                <span class="text-brand-terracotta"> Clouds</span>
              </h2>
              
              <div class="space-y-6 text-brand-charcoal/80 font-serif text-lg leading-relaxed">
                <p class="first-letter:text-6xl first-letter:font-bold first-letter:text-brand-terracotta first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                  "My first climb up Mount Kenya at age 12 changed everything. At 16,000 feet, breathing thin air, I understood why our ancestors called this mountain 'the place of light.' Every summit since has been a conversation with the divine."
                </p>
                
                <div class="bg-brand-terracotta/10 border-l-4 border-brand-terracotta p-6 italic">
                  "When you stand on Africa's roof, you don't just see Kenya - you feel the continent breathe beneath your feet."
                </div>
                
                <p>
                  Samuel has summited Mount Kenya 47 times, rescued 23 lost hikers, and planted over 10,000 indigenous trees. He knows every trail, every weather pattern, every secret cave in the Aberdare Range.
                </p>
              </div>
            </div>
            
            <!-- Dramatic Image -->
            <div class="lg:order-1 relative h-96 lg:h-full min-h-[500px] rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                alt="Mount Kenya summit at sunrise"
                class="w-full h-full object-cover"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div class="absolute bottom-6 left-6 text-brand-off-white">
                <div class="text-sm font-serif mb-2">PHOTOGRAPH BY SAMUEL KIRUBI</div>
                <div class="text-xs">MOUNT KENYA • BATIAN PEAK • 2024</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Nat Geo Style Stats -->
        <div class="bg-brand-charcoal text-brand-off-white py-16 px-8 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-4xl font-serif font-bold text-brand-terracotta mb-2">15,000+</div>
              <div class="font-serif">Guests Guided</div>
            </div>
            <div>
              <div class="text-4xl font-serif font-bold text-brand-terracotta mb-2">47</div>
              <div class="font-serif">Years Combined Experience</div>
            </div>
            <div>
              <div class="text-4xl font-serif font-bold text-brand-terracotta mb-2">234</div>
              <div class="font-serif">Species Documented</div>
            </div>
            <div>
              <div class="text-4xl font-serif font-bold text-brand-terracotta mb-2">100%</div>
              <div class="font-serif">Kenyan Born & Raised</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section with Geographic Elements -->
    <section class="py-16 md:py-24">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-serif text-brand-charcoal mb-6">
            Guided by Geography, Driven by Passion
          </h2>
          <p class="text-xl text-brand-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            Our values are shaped by the landscapes we call home
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Value 1: Mountain Wisdom -->
          <div class="text-center group">
            <div class="w-20 h-20 mx-auto mb-6 bg-brand-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-brand-terracotta/20 transition-colors duration-300">
              <svg class="w-10 h-10 text-brand-terracotta" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 2.28 6.88L12 22l-7.28-1.58L2.72 14.14l-5-4.87 6.91-6.26L12 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif text-brand-charcoal mb-3">Mountain Wisdom</h3>
            <p class="text-brand-charcoal/80 font-sans leading-relaxed">
              Like Mount Kenya's eternal peaks, we stand tall in our commitment to excellence and unwavering in our dedication to authentic experiences.
            </p>
          </div>

          <!-- Value 2: River Flow -->
          <div class="text-center group">
            <div class="w-20 h-20 mx-auto mb-6 bg-brand-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-brand-terracotta/20 transition-colors duration-300">
              <svg class="w-10 h-10 text-brand-terracotta" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2m0 0l2-2m-2 2l2-2"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif text-brand-charcoal mb-3">River Flow</h3>
            <p class="text-brand-charcoal/80 font-sans leading-relaxed">
              Like Kenya's life-giving rivers, we adapt, we flow, we nourish every journey with continuous care and attention to detail.
            </p>
          </div>

          <!-- Value 3: Savannah Strength -->
          <div class="text-center group">
            <div class="w-20 h-20 mx-auto mb-6 bg-brand-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-brand-terracotta/20 transition-colors duration-300">
              <svg class="w-10 h-10 text-brand-terracotta" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif text-brand-charcoal mb-3">Savannah Strength</h3>
            <p class="text-brand-charcoal/80 font-sans leading-relaxed">
              Like the endless plains, we provide expansive horizons of possibility, grounded in strength and reliability that spans generations.
            </p>
          </div>

          <!-- Value 4: Forest Wisdom -->
          <div class="text-center group">
            <div class="w-20 h-20 mx-auto mb-6 bg-brand-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-brand-terracotta/20 transition-colors duration-300">
              <svg class="w-10 h-10 text-brand-terracotta" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 2.28 6.88L12 22l-7.28-1.58L2.72 14.14l-5-4.87 6.91-6.26L12 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-serif text-brand-charcoal mb-3">Forest Wisdom</h3>
            <p class="text-brand-charcoal/80 font-sans leading-relaxed">
              Like Kenya's ancient forests, we preserve traditions, protect ecosystems, and share deep knowledge of our natural heritage.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 md:py-24 bg-brand-off-white/50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-serif text-brand-charcoal mb-6">
            Meet Your Local Guides
          </h2>
          <p class="text-xl text-brand-charcoal/80 max-w-3xl mx-auto leading-relaxed">
            Born and raised in Kenya, our team carries generations of geographic knowledge
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Guide 1 -->
          <div class="text-center">
            <div class="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-terracotta/20">
              <img 
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
                alt="Kenyan safari guide with geographic expertise"
                class="w-full h-full object-cover"
              >
            </div>
            <h3 class="text-xl font-serif text-brand-charcoal mb-2">James Kiprop</h3>
            <p class="text-brand-charcoal/80 font-sans mb-2">Lead Guide - Maasai Mara Specialist</p>
            <p class="text-brand-charcoal/70 font-sans text-sm">
              15+ years tracking the Great Migration across the savanna
            </p>
          </div>

          <!-- Guide 2 -->
          <div class="text-center">
            <div class="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-terracotta/20">
              <img 
                src="https://images.pexels.com/photos/2182971/pexels-photo-2182971.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
                alt="Kenyan cultural guide with local knowledge"
                class="w-full h-full object-cover"
              >
            </div>
            <h3 class="text-xl font-serif text-brand-charcoal mb-2">Grace Wanjiru</h3>
            <p class="text-brand-charcoal/80 font-sans mb-2">Cultural Heritage Expert</p>
            <p class="text-brand-charcoal/70 font-sans text-sm">
              Deep knowledge of tribal traditions and ancient geographic wisdom
            </p>
          </div>

          <!-- Guide 3 -->
          <div class="text-center">
            <div class="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-brand-terracotta/20">
              <img 
                src="https://images.pexels.com/photos/2182972/pexels-photo-2182972.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
                alt="Kenyan mountain guide with climbing expertise"
                class="w-full h-full object-cover"
              >
            </div>
            <h3 class="text-xl font-serif text-brand-charcoal mb-2">Samuel Kirubi</h3>
            <p class="text-brand-charcoal/80 font-sans mb-2">Mountain & Forest Specialist</p>
            <p class="text-brand-charcoal/70 font-sans text-sm">
              Expert navigator of Mount Kenya and Aberdare ranges
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Geographic Call to Action -->
    <section class="py-20 md:py-32 bg-gradient-to-br from-brand-charcoal via-brand-terracotta to-brand-charcoal text-brand-off-white">
      <div class="container mx-auto px-6">
        <div class="text-center max-w-5xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-serif mb-6">
            Journey Through Kenya's Living Geography
          </h2>
          <div class="w-32 h-1 bg-brand-off-white mx-auto mb-8"></div>
          <p class="text-2xl font-light text-brand-off-white/95 max-w-3xl mx-auto leading-relaxed font-serif italic mb-12">
            "Every path tells a story, every landscape holds a memory"
          </p>
          
          <div class="flex flex-col sm:flex-row gap-8 justify-center">
            <a 
              href="/contact-us"
              class="inline-flex items-center justify-center px-10 py-4 bg-brand-off-white text-brand-charcoal font-sans font-medium rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <span>Start Your Geographic Journey</span>
              <svg class="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </a>
            <a 
              href="/safari-packages"
              class="inline-flex items-center justify-center px-10 py-4 border-2 border-brand-off-white text-brand-off-white font-sans font-medium rounded-full transition-all duration-500 hover:bg-brand-off-white hover:text-brand-charcoal"
            >
              <span>Explore Our Land</span>
              <svg class="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
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
  title: 'About Us - Ethno Kenia Adventures',
  meta: [
    { name: 'description', content: 'Learn about Ethno Kenia Adventures - our story rooted in Kenyan geography, our local guides, and our commitment to authentic African experiences shaped by the land itself.' },
    { name: 'keywords', content: 'Ethno Kenia Adventures, about us, Kenyan guides, geographic heritage, African travel, local expertise, Mount Kenya, Maasai Mara, sustainable tourism' }
  ]
})
</script>

<style scoped>
/* Geographic hover effects */
.group:hover .group-hover\:bg-brand-terracotta\/20 {
  background-color: rgb(146 64 14 / 0.2);
}
</style>