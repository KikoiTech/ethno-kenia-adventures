<script setup lang="ts">
import {
  TrendingUp,
  Users,
  MapPin,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  FileCode,
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const supabase = useSupabase()
const { profile } = useAdmin()

// ── Stats ──────────────────────────────────────────────────────────────────
const stats = ref([
  { name: 'Total Revenue', value: '$0', change: '+0%', icon: DollarSign, color: 'text-emerald-400' },
  { name: 'Active Bookings', value: '0', change: '+0%', icon: MapPin, color: 'text-blue-400' },
  { name: 'Total Inquiries', value: '0', change: '+0%', icon: Users, color: 'text-orange-400' },
  { name: 'Conversion Rate', value: '0%', change: '+0%', icon: Activity, color: 'text-purple-400' },
])

const recentBookings = ref<any[]>([])
const isLoading = ref(true)

// ── Data Fetch ──────────────────────────────────────────────────────────────
async function fetchDashboardData() {
  isLoading.value = true
  try {
    // 1. Total active trips (replaces revenue — no total_paid in schema)
    const { count: tripsCount } = await supabase
      .from('trips')
      .select('*', { count: 'exact', head: true })
      .is('deleted_at', null)
      .eq('is_active', true)

    stats.value[0]!.value = (tripsCount || 0).toString()
    stats.value[0]!.name = 'Active Trips'

    // 2. Active Bookings count
    const { count: bookingsCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .in('status', ['pending', 'confirmed'])

    stats.value[1]!.value = (bookingsCount || 0).toString()
    stats.value[1]!.name = 'Active Bookings'

    // 3. Inquiries count
    const { count: inquiriesCount } = await supabase
      .from('inquiries')
      .select('*', { count: 'exact', head: true })

    stats.value[2]!.value = (inquiriesCount || 0).toString()

    // 4. Conversion Rate
    const { count: totalBookings } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })

    if (inquiriesCount && inquiriesCount > 0) {
      const rate = ((totalBookings || 0) / inquiriesCount) * 100
      stats.value[3]!.value = `${rate.toFixed(1)}%`
    }

    // 5. Recent Bookings — try join with trips, fallback to plain query if FK not set up yet
    let bookings: any[] = []
    const { data: bookingsJoined, error: joinError } = await supabase
      .from('bookings')
      .select(`*, trips (title)`)
      .order('created_at', { ascending: false })
      .limit(8)

    if (joinError) {
      // FK relationship not set up yet — fetch bookings without the join
      const { data: bookingsPlain } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(8)
      bookings = bookingsPlain ?? []
    } else {
      bookings = bookingsJoined ?? []
    }

    recentBookings.value = bookings

  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
  } finally {
    isLoading.value = false
  }
}

// ── Real-time subscription ──────────────────────────────────────────────────
let bookingsChannel: ReturnType<typeof supabase.channel> | null = null

onMounted(async () => {
  await fetchDashboardData()

  bookingsChannel = supabase
    .channel('dashboard:bookings')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, (payload: any) => {
      toast.info('🎉 New Booking Received!', {
        description: `A new booking just came in.`,
      })
      fetchDashboardData()
    })
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'bookings' }, () => {
      fetchDashboardData()
    })
    .subscribe()
})

onUnmounted(() => {
  if (bookingsChannel) {
    supabase.removeChannel(bookingsChannel)
  }
})

function getStatusClass(status: string) {
  switch (status?.toLowerCase()) {
    case 'confirmed': return 'status--confirmed'
    case 'pending': return 'status--pending'
    case 'cancelled': return 'status--cancelled'
    default: return 'status--pending'
  }
}
</script>

<template>
  <div class="dashboard-page">
    <header class="page-header">
      <div class="welcome">
        <h1 class="text-2xl font-bold">Welcome back, {{ profile?.full_name?.split(' ')[0] || 'Admin' }}</h1>
        <p class="text-muted text-sm">Here's what's happening with Ethno Kenia today.</p>
      </div>
      <button class="refresh-btn" @click="fetchDashboardData" :disabled="isLoading">
        <Activity class="w-4 h-4" :class="{ 'animate-spin': isLoading }" />
        <span>Refresh Stats</span>
      </button>
    </header>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.name" class="stat-card">
        <div class="stat-header">
          <div class="stat-icon-wrap" :class="stat.color">
            <component :is="stat.icon" class="w-5 h-5" />
          </div>
          <div class="stat-trend">
            <span class="trend-val">{{ stat.change }}</span>
            <ArrowUpRight class="w-3 h-3" />
          </div>
        </div>
        <div class="stat-body">
          <span class="stat-label">{{ stat.name }}</span>
          <h3 class="stat-value">{{ stat.value }}</h3>
        </div>
        <div class="stat-footer">
          <div class="progress-bg">
            <div class="progress-bar" :style="{ width: '70%' }" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="content-grid mt-8">
      <!-- Recent Bookings Table -->
      <section class="content-section col-span-2">
        <div class="section-header">
          <h2 class="section-title">Recent Bookings</h2>
          <NuxtLink to="/admin/bookings" class="view-all">View All</NuxtLink>
        </div>
        <div class="data-card overflow-hidden">
          <div class="table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Trip</th>
                  <th>Travel Date</th>
                  <th>Guests</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="isLoading" v-for="i in 5" :key="i">
                  <td colspan="5"><div class="skeleton-row" /></td>
                </tr>
                <tr v-else-if="recentBookings.length === 0">
                  <td colspan="5" class="empty-state">No bookings yet. New bookings will appear here in real-time.</td>
                </tr>
                <tr v-for="booking in recentBookings" :key="booking.id" class="booking-row">
                  <td>
                    <div class="guest-cell">
                      <div class="guest-avatar">{{ booking.first_name?.charAt(0) || '?' }}</div>
                      <span>{{ booking.first_name }} {{ booking.last_name }}</span>
                    </div>
                  </td>
                  <td>{{ booking.trips?.title || 'Unknown Trip' }}</td>
                  <td>{{ booking.travel_date ? new Date(booking.travel_date).toLocaleDateString() : '—' }}</td>
                  <td>{{ (booking.adults_count || 1) + (booking.children_count || 0) }} pax</td>
                  <td>
                    <span :class="['status-pill', getStatusClass(booking.status)]">
                      {{ booking.status || 'pending' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- System Health / Quick Actions -->
      <section class="content-section">
        <div class="section-header">
          <h2 class="section-title">Quick Actions</h2>
        </div>
        <div class="actions-stack">
          <NuxtLink to="/admin/tours/add" class="action-card">
            <div class="action-icon bg-emerald-500/10 text-emerald-500">
              <MapPin class="w-5 h-5" />
            </div>
            <div class="action-info">
              <span class="action-label">Create New Tour</span>
              <span class="action-desc">Add a new safari experience</span>
            </div>
          </NuxtLink>

          <NuxtLink to="/admin/team" class="action-card">
            <div class="action-icon bg-blue-500/10 text-blue-500">
              <Users class="w-5 h-5" />
            </div>
            <div class="action-info">
              <span class="action-label">Team Access</span>
              <span class="action-desc">Manage admin permissions</span>
            </div>
          </NuxtLink>

          <NuxtLink to="/admin/templates" class="action-card">
            <div class="action-icon bg-orange-500/10 text-orange-500">
              <FileCode class="w-5 h-5" />
            </div>
            <div class="action-info">
              <span class="action-label">Email Templates</span>
              <span class="action-desc">Edit automated responses</span>
            </div>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard-page {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
}

.text-muted {
  color: rgba(240, 232, 220, 0.4);
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #e8e2d9;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: transform 0.2s, border-color 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.12);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.stat-icon-wrap {
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(240, 232, 220, 0.4);
  margin-bottom: 0.25rem;
  display: block;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: #e8e2d9;
}

.stat-footer {
  margin-top: 1.5rem;
}

.progress-bg {
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #c4714e, #dfab90);
  border-radius: 2px;
}

/* Content Sections */
.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .content-grid { grid-template-columns: 1fr; }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e8e2d9;
}

.view-all {
  font-size: 0.85rem;
  color: #c4714e;
  text-decoration: none;
  font-weight: 500;
}

.data-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
}

.table-wrap {
  width: 100%;
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.data-table th {
  text-align: left;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.02);
  color: rgba(240, 232, 220, 0.4);
  font-weight: 500;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.data-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  color: rgba(232, 226, 217, 0.8);
}

.empty-state {
  text-align: center;
  padding: 3rem !important;
  color: rgba(240, 232, 220, 0.3);
}

.skeleton-row {
  height: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

/* Quick Actions */
.actions-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s;
}

.action-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}

.action-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-info {
  display: flex;
  flex-direction: column;
}

.action-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e8e2d9;
}

.action-desc {
  font-size: 0.75rem;
  color: rgba(240, 232, 220, 0.4);
}
</style>
