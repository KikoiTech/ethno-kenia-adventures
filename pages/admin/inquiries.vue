<script setup lang="ts">
import { 
  Mail, 
  Search, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Archive,
  MoreHorizontal,
  Trash2,
  MapPin,
  Clock
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const supabase = useSupabase()
const inquiries = ref<any[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedInquiry = ref<any>(null)

async function fetchInquiries() {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    inquiries.value = data ?? []
  } catch (err: any) {
    toast.error('Failed to load inquiries', { description: err.message })
  } finally {
    isLoading.value = false
  }
}

async function updateInquiryStatus(id: string, status: string) {
  try {
    const { error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)
    
    if (error) throw error
    
    toast.success(`Inquiry marked as ${status}`)
    fetchInquiries()
    if (selectedInquiry.value?.id === id) selectedInquiry.value = null
  } catch (err: any) {
    toast.error('Action failed', { description: err.message })
  }
}

const filteredInquiries = computed(() => {
  if (!searchQuery.value) return inquiries.value
  const q = searchQuery.value.toLowerCase()
  return inquiries.value.filter(i => 
    i.full_name?.toLowerCase().includes(q) || 
    i.email?.toLowerCase().includes(q) ||
    i.subject?.toLowerCase().includes(q)
  )
})

onMounted(fetchInquiries)

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="inquiries-page">
    <header class="page-header">
      <div class="title-wrap">
        <h1 class="text-2xl font-bold">Inquiries & Leads</h1>
        <p class="text-muted text-sm">Manage incoming messages and trip requests.</p>
      </div>
    </header>

    <div class="inquiries-layout">
      <!-- Sidebar / List -->
      <aside class="inquiry-list-pane">
        <div class="pane-controls">
          <div class="search-wrap">
            <Search class="search-icon" />
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search leads..." 
              class="search-input"
            />
          </div>
        </div>

        <div class="list-container">
          <div v-if="isLoading" v-for="n in 4" :key="n" class="skeleton-item" />
          <div v-else-if="filteredInquiries.length === 0" class="empty-list">
            No inquiries found.
          </div>
          <button 
            v-for="inquiry in filteredInquiries" 
            :key="inquiry.id"
            @click="selectedInquiry = inquiry"
            :class="['inquiry-card', { 'inquiry-card--active': selectedInquiry?.id === inquiry.id }]"
          >
            <div class="card-header">
              <span class="sender">{{ inquiry.full_name }}</span>
              <span class="time">{{ formatDate(inquiry.created_at) }}</span>
            </div>
            <p class="subject">{{ inquiry.subject || 'Trip Inquiry' }}</p>
            <div class="card-footer">
              <span :class="['status-dot', inquiry.status === 'responded' ? 'status--responded' : 'status--new']"></span>
              <span class="status-text">{{ inquiry.status || 'New' }}</span>
            </div>
          </button>
        </div>
      </aside>

      <!-- Message Viewer -->
      <main class="inquiry-content-pane">
        <div v-if="selectedInquiry" class="content-view">
          <div class="view-header">
            <div class="sender-info">
              <div class="sender-avatar">{{ selectedInquiry.full_name?.charAt(0) }}</div>
              <div class="sender-meta">
                <h2 class="sender-name">{{ selectedInquiry.full_name }}</h2>
                <a :href="`mailto:${selectedInquiry.email}`" class="sender-email">{{ selectedInquiry.email }}</a>
              </div>
            </div>
            <div class="view-actions">
              <button 
                v-if="selectedInquiry.status !== 'responded'"
                class="action-btn success" 
                @click="updateInquiryStatus(selectedInquiry.id, 'responded')"
              >
                <CheckCircle2 class="w-4 h-4" />
                <span>Mark Responded</span>
              </button>
              <button class="action-btn" @click="updateInquiryStatus(selectedInquiry.id, 'archived')">
                <Archive class="w-4 h-4" />
                <span>Archive</span>
              </button>
            </div>
          </div>

          <div class="message-details">
            <div class="detail-row">
              <Calendar class="w-4 h-4" />
              <span>Received on {{ new Date(selectedInquiry.created_at).toLocaleString() }}</span>
            </div>
            <div v-if="selectedInquiry.trip_title" class="detail-row">
              <MapPin class="w-4 h-4 text-orange-400" />
              <span>Interested in: <strong>{{ selectedInquiry.trip_title }}</strong></span>
            </div>
          </div>

          <div class="message-body">
            {{ selectedInquiry.message }}
          </div>

          <div class="quick-reply">
            <p class="reply-hint">Contact guest at <strong>{{ selectedInquiry.email }}</strong> to respond.</p>
            <a :href="`mailto:${selectedInquiry.email}?subject=Re: ${selectedInquiry.subject || 'Your inquiry at Ethno Kenia'}`" class="reply-link">
              <Mail class="w-4 h-4" />
              Reply via Email
            </a>
          </div>
        </div>

        <div v-else class="no-selection">
          <div class="no-selection-inner">
            <MessageSquare class="w-16 h-16 opacity-10 mb-6" />
            <h3>Select an inquiry to view details</h3>
            <p>Track your customer leads and respond to safari requests.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 2rem; }
.text-muted { color: rgba(240, 232, 220, 0.4); }

.inquiries-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 1.5rem;
  height: calc(100vh - 200px);
}

/* Sidebar List */
.inquiry-list-pane {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pane-controls { padding: 1.25rem; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }

.search-wrap { position: relative; }
.search-icon {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.9rem;
  height: 0.9rem;
  color: rgba(240, 232, 220, 0.3);
}

.search-input {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  padding: 0.65rem 1rem 0.65rem 2.5rem;
  color: #e8e2d9;
  font-size: 0.85rem;
  outline: none;
}

.list-container {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.inquiry-card {
  padding: 1.25rem;
  text-align: left;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.2s;
}

.inquiry-card:hover { background: rgba(255, 255, 255, 0.03); }
.inquiry-card--active { background: rgba(61, 74, 61, 0.1) !important; border-left: 3px solid #c4714e; }

.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.sender { font-weight: 700; color: #e8e2d9; font-size: 0.9rem; }
.time { font-size: 0.7rem; color: rgba(240, 232, 220, 0.3); }
.subject { font-size: 0.8rem; color: rgba(232, 226, 217, 0.7); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.75rem; }

.card-footer { display: flex; align-items: center; gap: 0.4rem; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; }
.status--new { background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.5); }
.status--responded { background: rgba(255, 255, 255, 0.2); }
.status-text { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em; color: rgba(240, 232, 220, 0.4); }

/* Content Pane */
.inquiry-content-pane {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  overflow: hidden;
}

.content-view { display: flex; flex-direction: column; height: 100%; }

.view-header {
  padding: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sender-info { display: flex; align-items: center; gap: 1.25rem; }
.sender-avatar {
  width: 52px;
  height: 52px;
  background: #c4714e;
  color: white;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
}

.sender-name { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.2rem; }
.sender-email { font-size: 0.9rem; color: #dfab90; text-decoration: none; }

.view-actions { display: flex; gap: 0.75rem; }
.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #e8e2d9;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.action-btn.success { background: rgba(16, 185, 129, 0.1); color: #6ee7b7; border-color: rgba(16, 185, 129, 0.2); }

.message-details {
  padding: 1.25rem 2rem;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-row { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: rgba(240, 232, 220, 0.5); }

.message-body {
  flex: 1;
  padding: 2.5rem;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(232, 226, 217, 0.9);
  white-space: pre-wrap;
  overflow-y: auto;
}

.quick-reply {
  padding: 1.5rem 2.5rem;
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reply-hint { font-size: 0.85rem; color: rgba(240, 232, 220, 0.4); }
.reply-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1.5rem;
  background: #c4714e;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
}

.no-selection {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem;
}

.no-selection h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
.no-selection p { color: rgba(240, 232, 220, 0.4); font-size: 0.9rem; }

.skeleton-item { height: 100px; background: rgba(255, 255, 255, 0.02); margin: 0.5rem 1rem; border-radius: 12px; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.8; } }
</style>
