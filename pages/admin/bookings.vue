<script setup lang="ts">
import { 
  Briefcase, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  MoreHorizontal,
  Eye
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const supabase = useSupabase()
const { logAction } = useAdmin()
const bookings = ref<any[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const statusFilter = ref('all')

async function fetchBookings() {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        trips (title)
      `)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    bookings.value = data ?? []
  } catch (err: any) {
    toast.error('Failed to load bookings', { description: err.message })
  } finally {
    isLoading.value = false
  }
}

async function updateStatus(id: string, status: string) {
  try {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id)

    if (error) throw error

    await logAction(`UPDATE_BOOKING_STATUS`, id, { name: `Booking #${id.slice(0,8)}`, status })
    toast.success(`Booking ${status} successfully`)
    fetchBookings()
  } catch (err: any) {
    toast.error('Update failed', { description: err.message })
  }
}

const filteredBookings = computed(() => {
  let result = bookings.value

  if (statusFilter.value !== 'all') {
    result = result.filter((b: any) => b.status === statusFilter.value)
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter((b: any) =>
      b.first_name?.toLowerCase().includes(q) ||
      b.last_name?.toLowerCase().includes(q) ||
      b.trips?.title?.toLowerCase().includes(q) ||
      b.email?.toLowerCase().includes(q)
    )
  }

  return result
})

onMounted(fetchBookings)

function getStatusClass(status: string) {
  switch (status?.toLowerCase()) {
    case 'confirmed': return 'status--confirmed'
    case 'pending': return 'status--pending'
    case 'cancelled': return 'status--cancelled'
    default: return 'status--default'
  }
}

function getStatusIcon(status: string) {
  switch (status?.toLowerCase()) {
    case 'confirmed': return CheckCircle2
    case 'pending': return Clock
    case 'cancelled': return XCircle
    default: return Clock
  }
}
</script>

<template>
  <div class="bookings-page">
    <header class="page-header">
      <div class="title-wrap">
        <h1 class="text-2xl font-bold">Bookings Management</h1>
        <p class="text-muted text-sm">Track and manage guest reservations and payments.</p>
      </div>
    </header>

    <!-- Controls -->
    <div class="table-controls">
      <div class="search-wrap">
        <Search class="search-icon" />
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Search by guest or trip..." 
          class="search-input"
        />
      </div>
      <div class="filter-group">
        <select v-model="statusFilter" class="status-select">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>

    <!-- Bookings Table -->
    <div class="data-card">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Guest &amp; Trip</th>
              <th>Travel Date</th>
              <th>Guests</th>
              <th>Contact</th>
              <th>Status</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoading" v-for="i in 5" :key="i">
              <td colspan="5"><div class="skeleton-row" /></td>
            </tr>
            <tr v-else-if="filteredBookings.length === 0">
              <td colspan="5" class="empty-state">No bookings found matching your criteria.</td>
            </tr>
            <tr v-for="booking in filteredBookings" :key="booking.id" class="booking-row">
              <td>
                <div class="guest-info">
                  <div class="avatar">{{ booking.first_name?.charAt(0) }}</div>
                  <div class="meta">
                    <span class="name">{{ booking.first_name }} {{ booking.last_name }}</span>
                    <span class="trip">{{ booking.trips?.title || 'No Trip' }}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="cell-icon-text">
                  <Calendar class="w-3.5 h-3.5 opacity-40" />
                  <span>{{ booking.travel_date ? new Date(booking.travel_date).toLocaleDateString() : '—' }}</span>
                </div>
              </td>
              <td>
                <span class="pax-badge">
                  {{ (booking.adults_count || 1) + (booking.children_count || 0) }} pax
                </span>
              </td>
              <td>
                <a :href="`mailto:${booking.email}`" class="email-link">{{ booking.email }}</a>
              </td>
              <td>
                <div :class="['status-badge', getStatusClass(booking.status)]">
                  <component :is="getStatusIcon(booking.status)" class="w-3 h-3" />
                  <span>{{ booking.status }}</span>
                </div>
              </td>
              <td class="text-right">
                <div class="action-btns">
                  <button v-if="booking.status === 'pending'" class="confirm-btn" @click="updateStatus(booking.id, 'confirmed')">
                    Confirm
                  </button>
                  <button class="icon-btn" title="View Details">
                    <Eye class="w-4 h-4" />
                  </button>
                  <button class="icon-btn" title="Options">
                    <MoreHorizontal class="w-4 h-4" />
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
.page-header { margin-bottom: 2.5rem; }
.text-muted { color: rgba(240, 232, 220, 0.4); }

.table-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.search-wrap { flex: 1; position: relative; }
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
}

.status-select {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  padding: 0.75rem 1.25rem;
  color: #e8e2d9;
  font-size: 0.9rem;
  outline: none;
}

.data-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

.table-wrap { width: 100%; overflow-x: auto; }

.data-table { width: 100%; border-collapse: collapse; }

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

.guest-info { display: flex; align-items: center; gap: 1rem; }
.avatar {
  width: 36px;
  height: 36px;
  background: rgba(196, 113, 78, 0.15);
  color: #c4714e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.meta { display: flex; flex-direction: column; }
.name { font-weight: 600; color: #e8e2d9; font-size: 0.95rem; }
.trip { font-size: 0.75rem; color: rgba(240, 232, 220, 0.4); }

.cell-icon-text { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; }

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.7rem;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status--confirmed  { background: rgba(16, 185, 129, 0.1); color: #6ee7b7; border: 1px solid rgba(16, 185, 129, 0.2); }
.status--pending    { background: rgba(245, 158, 11, 0.1); color: #fcd34d; border: 1px solid rgba(245, 158, 11, 0.2); }
.status--cancelled  { background: rgba(239, 68, 68, 0.1); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.2); }
.status--completed  { background: rgba(99, 102, 241, 0.1); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.2); }

.pax-badge {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(232, 226, 217, 0.7);
}

.email-link {
  font-size: 0.82rem;
  color: #dfab90;
  text-decoration: none;
}
.email-link:hover { text-decoration: underline; }

.action-btns { display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; }

.confirm-btn {
  padding: 0.4rem 0.8rem;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.confirm-btn:hover { background: rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.4); }

.icon-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  color: rgba(240, 232, 220, 0.4);
  cursor: pointer;
}

.icon-btn:hover { color: #e8e2d9; background: rgba(255, 255, 255, 0.08); }

.skeleton-row {
  height: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }

.empty-state {
  text-align: center;
  padding: 4rem !important;
  color: rgba(240, 232, 220, 0.3);
}
</style>
