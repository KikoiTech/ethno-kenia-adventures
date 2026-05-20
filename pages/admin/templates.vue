<script setup lang="ts">
import {
  FileCode,
  Eye,
  Save,
  Send,
  Info,
  Code
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const { isSuperAdmin } = useAdmin()
const supabase = useSupabase()

onMounted(() => {
  if (!isSuperAdmin.value) {
    navigateTo('/admin/dashboard')
  }
})

const templateDefs = [
  { id: 1, name: 'Booking Confirmation', key: 'booking_confirm', subject: 'Your Safari with Ethno Kenia is Confirmed!' },
  { id: 2, name: 'Inquiry Auto-Reply',   key: 'inquiry_reply',   subject: 'Thank you for your inquiry' },
  { id: 3, name: 'Payment Received',     key: 'payment_success', subject: 'Receipt for your payment' },
]

const selectedTemplate = ref(templateDefs[0]!)
const htmlContent = ref('')
const isSaving = ref(false)
const isLoadingTemplate = ref(false)

const defaultHtml = `<div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
  <h1 style="color: #3d4a3d;">Jambo {{guest_name}}!</h1>
  <p>Your booking for <strong>{{trip_title}}</strong> has been confirmed.</p>
  <p>We are excited to host you on {{travel_date}}.</p>
  <br>
  <p>Best regards,<br>Ethno Kenia Adventures</p>
</div>`

// ── Load template from DB ──────────────────────────────────────────────────
async function loadTemplate(key: string) {
  isLoadingTemplate.value = true
  try {
    const { data } = await supabase
      .from('email_templates')
      .select('body_html')
      .eq('slug', key)
      .single()

    htmlContent.value = data?.body_html ?? defaultHtml
  } catch {
    htmlContent.value = defaultHtml
  } finally {
    isLoadingTemplate.value = false
  }
}

// ── Save template to DB ────────────────────────────────────────────────────
async function saveTemplate() {
  isSaving.value = true
  try {
    const { error } = await supabase
      .from('email_templates')
      .upsert({
        slug: selectedTemplate.value.key,
        name: selectedTemplate.value.name,
        subject: selectedTemplate.value.subject,
        body_html: htmlContent.value,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'slug' })

    if (error) throw error
    toast.success('Template saved successfully')
  } catch (err: any) {
    toast.error('Save failed', { description: err.message })
  } finally {
    isSaving.value = false
  }
}

// ── Switch template ────────────────────────────────────────────────────────
function selectTemplate(t: typeof templateDefs[0]) {
  selectedTemplate.value = t
  loadTemplate(t.key)
}

onMounted(() => loadTemplate(selectedTemplate.value.key))
</script>

<template>
  <div class="templates-page" v-if="isSuperAdmin">
    <header class="page-header">
      <div class="title-wrap">
        <h1 class="text-2xl font-bold">Email Templates</h1>
        <p class="text-muted text-sm">Customize automated emails sent to your guests.</p>
      </div>
      <div class="header-actions">
        <button class="test-btn">
          <Send class="w-4 h-4" />
          <span>Send Test</span>
        </button>
        <button class="save-btn" @click="saveTemplate" :disabled="isSaving">
          <Save class="w-4 h-4" />
          <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
        </button>
      </div>
    </header>

    <div class="editor-layout">
      <!-- Template Selector -->
      <aside class="template-sidebar">
        <div class="sidebar-title">Templates</div>
        <div class="template-list">
          <button
            v-for="t in templateDefs"
            :key="t.id"
            @click="selectTemplate(t)"
            :class="['template-btn', { 'template-btn--active': selectedTemplate.id === t.id }]"
          >
            <span class="t-name">{{ t.name }}</span>
            <span class="t-key">{{ t.key }}</span>
          </button>
        </div>

        <div class="variables-card">
          <div class="v-header">
            <Info class="w-3.5 h-3.5" />
            <span>Available Variables</span>
          </div>
          <div class="v-list">
            <code v-pre>{{guest_name}}</code>
            <code v-pre>{{trip_title}}</code>
            <code v-pre>{{travel_date}}</code>
            <code v-pre>{{booking_id}}</code>
            <code v-pre>{{total_paid}}</code>
          </div>
        </div>
      </aside>

      <!-- Main Editor Split -->
      <main class="editor-main">
        <div class="editor-pane">
          <div class="pane-header">
            <Code class="w-4 h-4" />
            <span>HTML Content</span>
          </div>
          <textarea v-model="htmlContent" class="html-editor"></textarea>
        </div>

        <div class="preview-pane">
          <div class="pane-header">
            <Eye class="w-4 h-4" />
            <span>Live Preview</span>
          </div>
          <div class="preview-frame" v-html="htmlContent"></div>
        </div>
      </main>
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

.header-actions {
  display: flex;
  gap: 1rem;
}

.test-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: #e8e2d9;
  border-radius: 10px;
  cursor: pointer;
}

.save-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #c4714e;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.editor-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 1.5rem;
  height: calc(100vh - 200px);
}

.template-sidebar {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-title {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: rgba(240, 232, 220, 0.3);
  letter-spacing: 0.1em;
}

.template-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.template-btn {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.template-btn:hover {
  background: rgba(255, 255, 255, 0.05);
}

.template-btn--active {
  background: rgba(196, 113, 78, 0.1);
  border-color: rgba(196, 113, 78, 0.3);
}

.t-name { font-weight: 600; color: #e8e2d9; font-size: 0.9rem; margin-bottom: 0.25rem; }
.t-key { font-size: 0.7rem; font-family: monospace; color: rgba(240, 232, 220, 0.4); }

.variables-card {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.v-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #dfab90;
  margin-bottom: 1rem;
}

.v-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

code {
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: #9ec89e;
}

.editor-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  overflow: hidden;
}

.editor-pane, .preview-pane {
  display: flex;
  flex-direction: column;
}

.pane-header {
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(240, 232, 220, 0.4);
}

.html-editor {
  flex: 1;
  background: transparent;
  border: none;
  color: #9ec89e;
  padding: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  resize: none;
  outline: none;
  line-height: 1.6;
}

.preview-pane {
  background: white;
  color: #333;
}

.preview-frame {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}
</style>
