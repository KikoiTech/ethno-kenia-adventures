<script setup lang="ts">
import {
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Info,
  Layers,
  CheckCircle2,
  Trash2,
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const supabase = useSupabase()
const { logAction } = useAdmin()
const router = useRouter()
const route = useRoute()

const tourId = route.params.id as string
const isSaving = ref(false)
const isLoading = ref(true)
const activeTab = ref('basic')

const tourData = ref({
  title: '',
  slug: '',
  description: '',
  snippet: '',
  price: null as number | null,
  duration: '',
  location: '',
  featured_image: '',
  gallery: [] as string[],
  is_active: false,
  is_featured: false,
  itinerary: [] as any[],
  includes: [] as string[],
  excludes: [] as string[],
  category: '',
  tags: [] as string[],
})

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: Info },
  { id: 'itinerary', label: 'Itinerary', icon: Layers },
  { id: 'extras', label: 'Includes/Excludes', icon: CheckCircle2 },
]

// ── Load existing trip ──────────────────────────────────────────────────────
async function fetchTour() {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', tourId)
      .single()

    if (error) throw error
    if (!data) throw new Error('Tour not found')

    // Populate form with existing data
    tourData.value = {
      title: data.title ?? '',
      slug: data.slug ?? '',
      description: data.description ?? '',
      snippet: data.snippet ?? '',
      price: data.price ?? null,
      duration: data.duration ?? '',
      location: data.location ?? '',
      featured_image: data.featured_image ?? '',
      gallery: data.gallery ?? [],
      is_active: data.is_active ?? false,
      is_featured: data.is_featured ?? false,
      itinerary: data.itinerary ?? [],
      includes: data.includes ?? [],
      excludes: data.excludes ?? [],
      category: data.category ?? '',
      tags: data.tags ?? [],
    }
  } catch (err: any) {
    toast.error('Failed to load tour', { description: err.message })
    router.push('/admin/tours')
  } finally {
    isLoading.value = false
  }
}

// ── Save changes ────────────────────────────────────────────────────────────
async function handleSave() {
  if (!tourData.value.title || !tourData.value.price) {
    toast.error('Missing Information', { description: 'Please fill in the title and price.' })
    return
  }

  isSaving.value = true
  try {
    const { error } = await supabase
      .from('trips')
      .update(tourData.value)
      .eq('id', tourId)

    if (error) throw error

    await logAction('UPDATE_TOUR', tourId, { name: tourData.value.title })
    toast.success('Tour updated successfully!')
    router.push('/admin/tours')
  } catch (err: any) {
    toast.error('Failed to update tour', { description: err.message })
  } finally {
    isSaving.value = false
  }
}

// ── Helpers for tag fields ──────────────────────────────────────────────────
const newInclude = ref('')
const newExclude = ref('')

function addInclude() {
  if (newInclude.value.trim()) {
    tourData.value.includes.push(newInclude.value.trim())
    newInclude.value = ''
  }
}

function addExclude() {
  if (newExclude.value.trim()) {
    tourData.value.excludes.push(newExclude.value.trim())
    newExclude.value = ''
  }
}

onMounted(fetchTour)
</script>

<template>
  <div class="edit-tour-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner" />
      <p>Loading tour data...</p>
    </div>

    <template v-else>
      <header class="page-header">
        <div class="header-left">
          <NuxtLink to="/admin/tours" class="back-link">
            <ArrowLeft class="w-4 h-4" />
          </NuxtLink>
          <div class="title-wrap">
            <h1 class="text-2xl font-bold">Edit Tour</h1>
            <p class="text-muted text-sm">{{ tourData.title }}</p>
          </div>
        </div>
        <div class="header-right">
          <button class="save-btn" @click="handleSave" :disabled="isSaving">
            <Save v-if="!isSaving" class="w-4 h-4" />
            <div v-else class="spinner-sm" />
            <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
          </button>
        </div>
      </header>

      <div class="form-layout">
        <!-- Tabs Sidebar -->
        <aside class="tabs-nav">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="['tab-btn', { 'tab-btn--active': activeTab === tab.id }]"
          >
            <component :is="tab.icon" class="w-4 h-4" />
            <span>{{ tab.label }}</span>
          </button>
        </aside>

        <!-- Form Content -->
        <main class="form-content">
          <!-- Basic Info Tab -->
          <div v-show="activeTab === 'basic'" class="tab-pane">
            <div class="form-section">
              <h3 class="section-title">Essential Details</h3>
              <div class="grid grid-cols-2 gap-6">
                <div class="input-group col-span-2">
                  <label class="form-label">Tour Title</label>
                  <input v-model="tourData.title" type="text" placeholder="e.g. 3 Days Masai Mara Safari" class="form-input" />
                </div>

                <div class="input-group col-span-2">
                  <label class="form-label">URL Slug</label>
                  <input v-model="tourData.slug" type="text" placeholder="e.g. 3-days-masai-mara" class="form-input" />
                </div>

                <div class="input-group">
                  <label class="form-label">Price (USD)</label>
                  <input v-model="tourData.price" type="number" placeholder="0.00" class="form-input" />
                </div>

                <div class="input-group">
                  <label class="form-label">Duration</label>
                  <input v-model="tourData.duration" type="text" placeholder="e.g. 3 Days / 2 Nights" class="form-input" />
                </div>

                <div class="input-group col-span-2">
                  <label class="form-label">Location / Destination</label>
                  <input v-model="tourData.location" type="text" placeholder="e.g. Narok, Kenya" class="form-input" />
                </div>

                <div class="input-group col-span-2">
                  <label class="form-label">Short Excerpt</label>
                  <input v-model="tourData.snippet" type="text" placeholder="One-line summary for cards..." class="form-input" />
                </div>

                <div class="input-group col-span-2">
                  <label class="form-label">Full Description</label>
                  <textarea v-model="tourData.description" rows="5" class="form-textarea" placeholder="Provide a compelling overview of the trip..." />
                </div>
              </div>
            </div>

            <div class="form-section mt-8">
              <h3 class="section-title">Media</h3>
              <div class="input-group">
                <label class="form-label">Featured Image URL</label>
                <div class="image-input-wrap">
                  <input v-model="tourData.featured_image" type="text" placeholder="https://..." class="form-input" />
                  <div class="image-preview" v-if="tourData.featured_image">
                    <img :src="tourData.featured_image" alt="Preview" />
                  </div>
                  <div class="image-placeholder" v-else>
                    <ImageIcon class="w-8 h-8 opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Itinerary Tab -->
          <div v-show="activeTab === 'itinerary'" class="tab-pane">
            <div class="form-section">
              <h3 class="section-title">Day-by-Day Schedule</h3>
              <p class="section-desc">Add detailed activities for each day of the tour.</p>
              <AdminItineraryEditor v-model="tourData.itinerary" />
            </div>
          </div>

          <!-- Extras Tab -->
          <div v-show="activeTab === 'extras'" class="tab-pane">
            <div class="grid grid-cols-2 gap-8">
              <div class="form-section">
                <h3 class="section-title text-emerald-400">Included</h3>
                <div class="tag-input-wrap">
                  <input v-model="newInclude" @keyup.enter="addInclude" placeholder="Add inclusion..." class="form-input" />
                  <button @click="addInclude" class="add-tag-btn">+</button>
                </div>
                <div class="tags-list">
                  <div v-for="(item, i) in tourData.includes" :key="i" class="tag tag--include">
                    <span>{{ item }}</span>
                    <button @click="tourData.includes.splice(i, 1)">&times;</button>
                  </div>
                </div>
              </div>

              <div class="form-section">
                <h3 class="section-title text-red-400">Excluded</h3>
                <div class="tag-input-wrap">
                  <input v-model="newExclude" @keyup.enter="addExclude" placeholder="Add exclusion..." class="form-input" />
                  <button @click="addExclude" class="add-tag-btn">+</button>
                </div>
                <div class="tags-list">
                  <div v-for="(item, i) in tourData.excludes" :key="i" class="tag tag--exclude">
                    <span>{{ item }}</span>
                    <button @click="tourData.excludes.splice(i, 1)">&times;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <!-- Settings Sidebar -->
        <aside class="form-sidebar">
          <div class="sidebar-card">
            <h3 class="card-title">Publishing</h3>
            <div class="switch-group">
              <label class="switch-label">Visible on Site</label>
              <div class="toggle" :class="{ 'toggle--on': tourData.is_active }" @click="tourData.is_active = !tourData.is_active">
                <div class="toggle-thumb" />
              </div>
            </div>
            <div class="switch-group mt-4">
              <label class="switch-label">Featured on Homepage</label>
              <div class="toggle" :class="{ 'toggle--on': tourData.is_featured }" @click="tourData.is_featured = !tourData.is_featured">
                <div class="toggle-thumb" />
              </div>
            </div>
            <p class="text-xs text-muted mt-4">Draft tours are only visible to administrators.</p>
          </div>

          <div class="sidebar-card mt-4">
            <h3 class="card-title">Category & Tags</h3>
            <div class="input-group mb-4">
              <label class="form-label">Category</label>
              <select v-model="tourData.category" class="form-select">
                <option value="">Select category...</option>
                <option value="safari">Safari</option>
                <option value="beach">Beach</option>
                <option value="cultural">Cultural</option>
                <option value="mountain">Mountain</option>
                <option value="adventure">Adventure</option>
              </select>
            </div>
            <div class="input-group">
              <label class="form-label">Tour ID</label>
              <code class="tour-id-display">{{ tourId.slice(0, 8) }}...</code>
            </div>
          </div>
        </aside>
      </div>
    </template>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.back-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e8e2d9;
  transition: all 0.2s;
}

.back-link:hover {
  background: rgba(255, 255, 255, 0.07);
  transform: translateX(-2px);
}

.text-muted { color: rgba(240, 232, 220, 0.4); }

.save-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.5rem;
  background: #c4714e;
  color: white;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.save-btn:hover:not(:disabled) { background: #d4815e; transform: translateY(-2px); }
.save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.form-layout {
  display: grid;
  grid-template-columns: 240px 1fr 280px;
  gap: 2rem;
  align-items: start;
}

.tabs-nav { display: flex; flex-direction: column; gap: 0.5rem; }

.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 10px;
  color: rgba(240, 232, 220, 0.4);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.tab-btn:hover { color: #e8e2d9; background: rgba(255, 255, 255, 0.03); }
.tab-btn--active { background: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.07); color: #c4714e; }

.form-content {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 2.5rem;
  min-height: 500px;
}

.form-section { margin-bottom: 2rem; }

.section-title { font-size: 1.1rem; font-weight: 700; margin-bottom: 1.25rem; }
.section-desc { font-size: 0.85rem; color: rgba(240, 232, 220, 0.4); margin-bottom: 1.5rem; }

.input-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-label { font-size: 0.8rem; font-weight: 600; color: rgba(240, 232, 220, 0.6); }

.form-input, .form-textarea, .form-select {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #e8e2d9;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s;
}

.form-input:focus, .form-textarea:focus, .form-select:focus {
  border-color: #c4714e;
  box-shadow: 0 0 0 3px rgba(196, 113, 78, 0.1);
}

.image-input-wrap { display: flex; flex-direction: column; gap: 1rem; }

.image-preview {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.image-preview img { width: 100%; height: 100%; object-fit: cover; }

.image-placeholder {
  width: 100%;
  aspect-ratio: 16/9;
  background: rgba(0, 0, 0, 0.2);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-input-wrap { display: flex; gap: 0.5rem; margin-bottom: 1rem; }

.add-tag-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e8e2d9;
  width: 42px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
}

.tags-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }

.tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
}

.tag--include { background: rgba(16, 185, 129, 0.1); color: #6ee7b7; }
.tag--exclude { background: rgba(239, 68, 68, 0.1); color: #fca5a5; }

.tag button { background: none; border: none; color: inherit; opacity: 0.5; cursor: pointer; padding: 0; font-size: 1.1rem; }

.sidebar-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 1.5rem;
}

.card-title { font-size: 0.9rem; font-weight: 700; margin-bottom: 1.25rem; color: rgba(240, 232, 220, 0.8); }

.switch-group { display: flex; justify-content: space-between; align-items: center; }
.switch-label { font-size: 0.85rem; font-weight: 500; }

.toggle {
  width: 44px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

.toggle--on { background: #10b981; }

.toggle-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s;
}

.toggle--on .toggle-thumb { transform: translateX(20px); }

.tour-id-display {
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  color: rgba(240, 232, 220, 0.5);
  font-family: monospace;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
  color: rgba(240, 232, 220, 0.4);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba(240, 232, 220, 0.1);
  border-top-color: #c4714e;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner-sm {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }
</style>
