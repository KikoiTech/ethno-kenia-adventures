<script setup lang="ts">
import {
  Mail, Search, MessageSquare, Calendar, CheckCircle2, Archive,
  Trash2, MapPin, Users, ArrowRight, RefreshCcw, X, ChevronDown
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] })

const supabase = useSupabase()
const { isSuperAdmin, fetchProfile } = useAdmin()

const inquiries      = ref<any[]>([])
const isLoading      = ref(true)
const searchQuery    = ref('')
const statusFilter   = ref('all')
const selectedInquiry = ref<any>(null)

// Custom booking dialog
const showTripDialog  = ref(false)
const availableTrips  = ref<any[]>([])
const selectedTripId  = ref('')
const isConverting    = ref(false)

const STATUS_TABS = [
  { key: 'all',                   label: 'All' },
  { key: 'new',                   label: 'New' },
  { key: 'replied',               label: 'Replied' },
  { key: 'converted_to_booking',  label: 'Converted' },
  { key: 'archived',              label: 'Archived' },
]

async function getAuthHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  return { Authorization: `Bearer ${session?.access_token}` }
}

async function fetchInquiries() {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*, trips(id, title, slug, featured_image)')
      .order('created_at', { ascending: false })
    if (error) throw error
    inquiries.value = data ?? []
  } catch (err: any) {
    toast.error('Failed to load inquiries', { description: err.message })
  } finally {
    isLoading.value = false
  }
}

async function fetchTrips() {
  const { data } = await supabase
    .from('trips')
    .select('id, title')
    .is('deleted_at', null)
    .eq('is_active', true)
    .order('title')
  availableTrips.value = data ?? []
}

async function updateStatus(id: string, status: string) {
  try {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id)
    if (error) throw error
    toast.success(`Marked as ${status}`)
    if (selectedInquiry.value?.id === id) selectedInquiry.value = { ...selectedInquiry.value, status }
    fetchInquiries()
  } catch (err: any) {
    toast.error('Update failed', { description: err.message })
  }
}

async function convertToBooking() {
  if (!selectedInquiry.value) return
  const tripId = selectedInquiry.value.trip_id ?? selectedTripId.value
  if (!tripId) { toast.error('Select a trip first'); return }

  isConverting.value = true
  try {
    const headers = await getAuthHeaders()
    await $fetch(`/api/admin/inquiries/${selectedInquiry.value.id}/convert`, {
      method: 'POST',
      headers,
      body: { trip_id: tripId },
    })
    toast.success('Booking created successfully')
    showTripDialog.value = false
    selectedInquiry.value = { ...selectedInquiry.value, status: 'converted_to_booking' }
    fetchInquiries()
  } catch (err: any) {
    toast.error('Conversion failed', { description: err.data?.statusMessage ?? err.message })
  } finally {
    isConverting.value = false
  }
}

function openTripDialog() {
  fetchTrips()
  selectedTripId.value = ''
  showTripDialog.value = true
}

const filteredInquiries = computed(() => {
  let list = inquiries.value
  if (statusFilter.value !== 'all') list = list.filter(i => i.status === statusFilter.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(i =>
      `${i.first_name} ${i.last_name}`.toLowerCase().includes(q) ||
      i.email?.toLowerCase().includes(q) ||
      i.trips?.title?.toLowerCase().includes(q)
    )
  }
  return list
})

function fullName(i: any) {
  return [i.first_name, i.last_name].filter(Boolean).join(' ') || i.full_name || '—'
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(async () => {
  await fetchProfile()
  fetchInquiries()
})
</script>

<template>
  <div class="inquiries-page">
    <header class="page-header">
      <div class="title-wrap">
        <h1 class="text-2xl font-bold">Inquiries & Leads</h1>
        <p class="text-muted text-sm">Manage incoming messages and trip requests.</p>
      </div>
    </header>

    <!-- Status filter tabs -->
    <div class="status-tabs">
      <button
        v-for="tab in STATUS_TABS"
        :key="tab.key"
        :class="['tab-btn', { 'tab-btn--active': statusFilter === tab.key }]"
        @click="statusFilter = tab.key"
      >
        {{ tab.label }}
        <span class="tab-count">
          {{ tab.key === 'all' ? inquiries.length : inquiries.filter(i => i.status === tab.key).length }}
        </span>
      </button>
    </div>

    <div class="inquiries-layout">
      <!-- List pane -->
      <aside class="inquiry-list-pane">
        <div class="pane-controls">
          <div class="search-wrap">
            <Search class="search-icon" />
            <input v-model="searchQuery" type="text" placeholder="Search leads..." class="search-input" />
          </div>
        </div>

        <div class="list-container">
          <div v-if="isLoading" v-for="n in 4" :key="n" class="skeleton-item" />
          <div v-else-if="filteredInquiries.length === 0" class="empty-list">No inquiries found.</div>
          <button
            v-for="inq in filteredInquiries"
            :key="inq.id"
            @click="selectedInquiry = inq"
            :class="['inquiry-card', { 'inquiry-card--active': selectedInquiry?.id === inq.id }]"
          >
            <div class="card-header">
              <span class="sender">{{ fullName(inq) }}</span>
              <span class="time">{{ formatDate(inq.created_at) }}</span>
            </div>
            <p class="subject">{{ inq.trips?.title ?? 'General Inquiry' }}</p>
            <div class="card-footer">
              <span :class="['status-dot', `status--${inq.status ?? 'new'}`]" />
              <span class="status-text">{{ inq.status ?? 'new' }}</span>
            </div>
          </button>
        </div>
      </aside>

      <!-- Detail pane -->
      <main class="inquiry-content-pane">
        <div v-if="selectedInquiry" class="content-view">

          <!-- Header -->
          <div class="view-header">
            <div class="sender-info">
              <div class="sender-avatar">{{ fullName(selectedInquiry).charAt(0).toUpperCase() }}</div>
              <div class="sender-meta">
                <h2 class="sender-name">{{ fullName(selectedInquiry) }}</h2>
                <a :href="`mailto:${selectedInquiry.email}`" class="sender-email">{{ selectedInquiry.email }}</a>
              </div>
            </div>

            <div class="view-actions">
              <!-- Status dropdown -->
              <div class="status-select-wrap">
                <select
                  :value="selectedInquiry.status ?? 'new'"
                  @change="updateStatus(selectedInquiry.id, ($event.target as HTMLSelectElement).value)"
                  class="status-select"
                >
                  <option value="new">New</option>
                  <option value="replied">Replied</option>
                  <option value="converted_to_booking">Converted</option>
                  <option value="archived">Archived</option>
                </select>
                <ChevronDown class="select-arrow w-3.5 h-3.5" />
              </div>

              <!-- Reply via email -->
              <a
                :href="`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.trips?.title ?? 'Your inquiry at Ethno Kenia'}`"
                class="action-btn success"
              >
                <Mail class="w-4 h-4" />
                <span>Reply</span>
              </a>
            </div>
          </div>

          <!-- Guest & trip details -->
          <div class="message-details">
            <div class="detail-row">
              <Calendar class="w-4 h-4" />
              <span>Received {{ formatDate(selectedInquiry.created_at) }}</span>
            </div>
            <div v-if="selectedInquiry.phone" class="detail-row">
              <span>📞 {{ selectedInquiry.phone }}</span>
            </div>
            <div v-if="selectedInquiry.travel_date" class="detail-row">
              <Calendar class="w-4 h-4 text-green-400" />
              <span>Travel date: <strong>{{ selectedInquiry.travel_date }}</strong></span>
            </div>
            <div v-if="selectedInquiry.adults_count" class="detail-row">
              <Users class="w-4 h-4 text-blue-400" />
              <span>
                {{ selectedInquiry.adults_count }} adult{{ selectedInquiry.adults_count !== 1 ? 's' : '' }}
                <template v-if="selectedInquiry.children_count">
                  · {{ selectedInquiry.children_count }} child{{ selectedInquiry.children_count !== 1 ? 'ren' : '' }}
                </template>
              </span>
            </div>
            <div v-if="selectedInquiry.trips?.title" class="detail-row">
              <MapPin class="w-4 h-4 text-orange-400" />
              <span>Interested in: <strong>{{ selectedInquiry.trips.title }}</strong></span>
            </div>
          </div>

          <!-- Message body -->
          <div class="message-body">
            {{ selectedInquiry.message ?? 'No message provided.' }}
          </div>

          <!-- Conversion actions -->
          <div class="conversion-bar">
            <template v-if="selectedInquiry.status !== 'converted_to_booking'">
              <!-- Has trip → direct upgrade -->
              <button
                v-if="selectedInquiry.trip_id"
                class="convert-btn"
                :disabled="isConverting"
                @click="convertToBooking"
              >
                <ArrowRight class="w-4 h-4" />
                {{ isConverting ? 'Creating…' : 'Upgrade to Booking' }}
              </button>
              <!-- No trip → open dialog -->
              <button v-else class="convert-btn convert-btn--custom" @click="openTripDialog">
                <ArrowRight class="w-4 h-4" />
                Create Custom Booking
              </button>
            </template>
            <span v-else class="converted-badge">
              <CheckCircle2 class="w-4 h-4" /> Converted to Booking
            </span>
          </div>
        </div>

        <div v-else class="no-selection">
          <div class="no-selection-inner">
            <MessageSquare class="w-16 h-16 opacity-10 mb-6" />
            <h3>Select an inquiry to view details</h3>
            <p>Track customer leads and respond to safari requests.</p>
          </div>
        </div>
      </main>
    </div>

    <!-- Trip selection dialog for custom bookings -->
    <div v-if="showTripDialog" class="dialog-overlay" @click.self="showTripDialog = false">
      <div class="dialog-box">
        <div class="dialog-header">
          <h3>Select a Trip</h3>
          <button @click="showTripDialog = false"><X class="w-5 h-5" /></button>
        </div>
        <p class="dialog-sub">Choose the trip to link with this custom booking.</p>
        <div class="trip-list">
          <button
            v-for="trip in availableTrips"
            :key="trip.id"
            :class="['trip-option', { 'trip-option--selected': selectedTripId === trip.id }]"
            @click="selectedTripId = trip.id"
          >
            {{ trip.title }}
          </button>
          <p v-if="availableTrips.length === 0" class="empty-trips">No active trips found.</p>
        </div>
        <div class="dialog-footer">
          <button class="dialog-cancel" @click="showTripDialog = false">Cancel</button>
          <button
            class="dialog-confirm"
            :disabled="!selectedTripId || isConverting"
            @click="convertToBooking"
          >
            {{ isConverting ? 'Creating…' : 'Create Booking' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 1.5rem; }
.text-muted { color: rgba(240, 232, 220, 0.4); }

/* Status tabs */
.status-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.tab-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 99px;
  color: rgba(240,232,220,0.5);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.tab-btn:hover { color: #e8e2d9; background: rgba(255,255,255,0.06); }
.tab-btn--active { background: rgba(196,113,78,0.15); color: #dfab90; border-color: rgba(196,113,78,0.3); }
.tab-count { font-size: 0.7rem; background: rgba(255,255,255,0.08); padding: 0.1rem 0.4rem; border-radius: 99px; }

/* Layout */
.inquiries-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 1.5rem;
  height: calc(100vh - 240px);
}

/* Sidebar */
.inquiry-list-pane {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.pane-controls { padding: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
.search-wrap { position: relative; }
.search-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); width: 0.9rem; height: 0.9rem; color: rgba(240,232,220,0.3); }
.search-input { width: 100%; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 0.65rem 1rem 0.65rem 2.5rem; color: #e8e2d9; font-size: 0.85rem; outline: none; }
.list-container { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
.inquiry-card { padding: 1.25rem; text-align: left; background: transparent; border: none; border-bottom: 1px solid rgba(255,255,255,0.03); cursor: pointer; transition: all 0.2s; }
.inquiry-card:hover { background: rgba(255,255,255,0.03); }
.inquiry-card--active { background: rgba(61,74,61,0.1) !important; border-left: 3px solid #c4714e; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.sender { font-weight: 700; color: #e8e2d9; font-size: 0.9rem; }
.time { font-size: 0.7rem; color: rgba(240,232,220,0.3); }
.subject { font-size: 0.8rem; color: rgba(232,226,217,0.7); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.75rem; }
.card-footer { display: flex; align-items: center; gap: 0.4rem; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; }
.status--new { background: #10b981; box-shadow: 0 0 8px rgba(16,185,129,0.5); }
.status--replied { background: #60a5fa; }
.status--converted_to_booking { background: #a78bfa; }
.status--archived { background: rgba(255,255,255,0.2); }
.status-text { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(240,232,220,0.4); }
.empty-list { padding: 2rem; text-align: center; color: rgba(240,232,220,0.2); font-size: 0.85rem; }

/* Content pane */
.inquiry-content-pane { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; }
.content-view { display: flex; flex-direction: column; height: 100%; overflow-y: auto; }

.view-header { padding: 1.5rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
.sender-info { display: flex; align-items: center; gap: 1.25rem; }
.sender-avatar { width: 48px; height: 48px; background: #c4714e; color: white; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; font-weight: 700; flex-shrink: 0; }
.sender-name { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.15rem; }
.sender-email { font-size: 0.85rem; color: #dfab90; text-decoration: none; }
.view-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }

.status-select-wrap { position: relative; display: flex; align-items: center; }
.status-select { appearance: none; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.5rem 2rem 0.5rem 0.8rem; color: #e8e2d9; font-size: 0.8rem; cursor: pointer; outline: none; }
.select-arrow { position: absolute; right: 0.5rem; pointer-events: none; color: rgba(240,232,220,0.4); }

.action-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.9rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #e8e2d9; font-size: 0.82rem; font-weight: 600; cursor: pointer; white-space: nowrap; text-decoration: none; }
.action-btn.success { background: rgba(16,185,129,0.1); color: #6ee7b7; border-color: rgba(16,185,129,0.2); }

/* Details + message */
.message-details { padding: 1rem 2rem; background: rgba(0,0,0,0.1); display: flex; flex-wrap: wrap; gap: 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
.detail-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: rgba(240,232,220,0.5); }
.message-body { flex: 1; padding: 1.75rem 2rem; font-size: 1rem; line-height: 1.7; color: rgba(232,226,217,0.9); white-space: pre-wrap; overflow-y: auto; min-height: 80px; }

/* Conversion bar */
.conversion-bar { padding: 1.25rem 2rem; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(255,255,255,0.02); display: flex; align-items: center; gap: 1rem; }
.convert-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.25rem; background: rgba(196,113,78,0.15); color: #dfab90; border: 1px solid rgba(196,113,78,0.3); border-radius: 10px; font-weight: 600; font-size: 0.85rem; cursor: pointer; }
.convert-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.convert-btn--custom { background: rgba(99,102,241,0.1); color: #a5b4fc; border-color: rgba(99,102,241,0.3); }
.converted-badge { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: #a78bfa; }

/* No selection */
.no-selection { height: 100%; display: flex; align-items: center; justify-content: center; text-align: center; padding: 3rem; }
.no-selection h3 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; }
.no-selection p { color: rgba(240,232,220,0.4); font-size: 0.9rem; }

/* Dialog */
.dialog-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; }
.dialog-box { background: #0d1610; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; width: 480px; max-width: 90vw; max-height: 80vh; display: flex; flex-direction: column; overflow: hidden; }
.dialog-header { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.07); }
.dialog-header h3 { font-size: 1.1rem; font-weight: 700; }
.dialog-header button { background: none; border: none; color: rgba(240,232,220,0.4); cursor: pointer; }
.dialog-sub { padding: 0.75rem 1.5rem 0; font-size: 0.85rem; color: rgba(240,232,220,0.4); }
.trip-list { flex: 1; overflow-y: auto; padding: 1rem 1.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
.trip-option { padding: 0.75rem 1rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; color: #e8e2d9; font-size: 0.9rem; text-align: left; cursor: pointer; transition: all 0.2s; }
.trip-option:hover { background: rgba(255,255,255,0.06); }
.trip-option--selected { background: rgba(196,113,78,0.15); border-color: rgba(196,113,78,0.4); color: #dfab90; }
.empty-trips { text-align: center; color: rgba(240,232,220,0.3); padding: 2rem 0; }
.dialog-footer { display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1.25rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.07); }
.dialog-cancel { padding: 0.6rem 1.25rem; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #e8e2d9; font-size: 0.85rem; cursor: pointer; }
.dialog-confirm { padding: 0.6rem 1.5rem; background: #c4714e; color: white; border: none; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer; }
.dialog-confirm:disabled { opacity: 0.4; cursor: not-allowed; }

.skeleton-item { height: 100px; background: rgba(255,255,255,0.02); margin: 0.5rem 1rem; border-radius: 12px; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
</style>
