<script setup lang="ts">
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Eye,
  MapPin,
  Clock,
  DollarSign
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin'
})

const supabase = useSupabase()
const tours = ref([])
const isLoading = ref(true)
const searchQuery = ref('')

async function fetchTours() {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    tours.value = data
  } catch (err) {
    toast.error('Failed to fetch tours', { description: err.message })
  } finally {
    isLoading.value = false
  }
}

async function deleteTour(id: string) {
  if (!confirm('Are you sure you want to delete this tour? This action cannot be undone.')) return

  try {
    const { error } = await supabase
      .from('tours')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    toast.success('Tour deleted successfully')
    fetchTours()
  } catch (err) {
    toast.error('Delete failed', { description: err.message })
  }
}

const filteredTours = computed(() => {
  if (!searchQuery.value) return tours.value
  const q = searchQuery.value.toLowerCase()
  return tours.value.filter(t => 
    t.title.toLowerCase().includes(q) || 
    t.location?.toLowerCase().includes(q)
  )
})

onMounted(fetchTours)
</script>

<template>
  <div class="tours-page">
    <header class="page-header">
      <div class="title-wrap">
        <h1 class="text-2xl font-bold">Tours & Safari Packages</h1>
        <p class="text-muted text-sm">Manage your available experiences and itineraries.</p>
      </div>
      <NuxtLink to="/admin/tours/add" class="add-btn">
        <Plus class="w-4 h-4" />
        <span>Create New Tour</span>
      </NuxtLink>
    </header>

    <!-- Filters & Search -->
    <div class="table-controls">
      <div class="search-wrap">
        <Search class="search-icon" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by title or location..." 
          class="search-input"
        />
      </div>
      <button class="filter-btn">
        <Filter class="w-4 h-4" />
        <span>Filter</span>
      </button>
    </div>

    <!-- Tours Table -->
    <div class="data-card">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Tour Details</th>
              <th>Location</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" v-for="i in 5" :key="i">
              <td colspan="6"><div class="skeleton-row" /></td>
            </tr>
            <tr v-else-if="filteredTours.length === 0">
              <td colspan="6" class="empty-state">No tours found.</td>
            </tr>
            <tr v-for="tour in filteredTours" :key="tour.id" class="tour-row">
              <td>
                <div class="tour-info">
                  <div class="tour-image">
                    <img v-if="tour.image_url" :src="tour.image_url" :alt="tour.title" />
                    <div v-else class="image-placeholder"><MapPin class="w-4 h-4" /></div>
                  </div>
                  <div class="tour-meta">
                    <span class="tour-title">{{ tour.title }}</span>
                    <span class="tour-id">ID: {{ tour.id.slice(0, 8) }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="cell-icon-text">
                  <MapPin class="w-3.5 h-3.5 text-orange-400" />
                  <span>{{ tour.location }}</span>
                </div>
              </td>
              <td>
                <div class="cell-icon-text">
                  <Clock class="w-3.5 h-3.5 text-blue-400" />
                  <span>{{ tour.duration_days }} Days</span>
                </div>
              </td>
              <td>
                <div class="price-tag">
                  <DollarSign class="w-3 h-3" />
                  <span>{{ tour.price?.toLocaleString() }}</span>
                </div>
              </td>
              <td>
                <span :class="['status-pill', tour.is_active ? 'status--active' : 'status--draft']">
                  {{ tour.is_active ? 'Published' : 'Draft' }}
                </span>
              </td>
              <td class="text-right">
                <div class="action-btns">
                  <NuxtLink :to="`/admin/tours/edit/${tour.id}`" class="icon-btn edit" title="Edit">
                    <Edit2 class="w-4 h-4" />
                  </NuxtLink>
                  <button class="icon-btn delete" title="Delete" @click="deleteTour(tour.id)">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.text-muted {
  color: rgba(240, 232, 220, 0.4);
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #c4714e;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(196, 113, 78, 0.2);
  transition: all 0.2s;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(196, 113, 78, 0.3);
  background: #d4815e;
}

.table-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-wrap {
  flex: 1;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1rem;
  height: 1rem;
  color: rgba(240, 232, 220, 0.3);
}

.search-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  color: #e8e2d9;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  border-color: rgba(61, 74, 61, 0.5);
  background: rgba(255, 255, 255, 0.05);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  color: #e8e2d9;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
}

.data-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

.table-wrap {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  color: rgba(240, 232, 220, 0.4);
  font-weight: 600;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.data-table td {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.tour-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tour-image {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.tour-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.1);
}

.tour-meta {
  display: flex;
  flex-direction: column;
}

.tour-title {
  font-weight: 600;
  color: #e8e2d9;
  font-size: 0.95rem;
}

.tour-id {
  font-size: 0.7rem;
  color: rgba(240, 232, 220, 0.3);
  font-family: monospace;
}

.cell-icon-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: rgba(232, 226, 217, 0.8);
}

.price-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
}

.status-pill {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 99px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status--active { background: rgba(61, 74, 61, 0.3); color: #9ec89e; border: 1px solid rgba(61, 74, 61, 0.5); }
.status--draft { background: rgba(255, 255, 255, 0.05); color: rgba(255, 255, 255, 0.4); border: 1px solid rgba(255, 255, 255, 0.1); }

.action-btns {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.icon-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(240, 232, 220, 0.4);
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover.edit { background: rgba(59, 130, 246, 0.1); color: #60a5fa; border-color: rgba(59, 130, 246, 0.2); }
.icon-btn:hover.delete { background: rgba(239, 68, 68, 0.1); color: #f87171; border-color: rgba(239, 68, 68, 0.2); }

.empty-state {
  text-align: center;
  padding: 4rem !important;
  color: rgba(240, 232, 220, 0.2);
}

.skeleton-row {
  height: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}
</style>
