<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TiptapUnderline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import {
  Save, Info,
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Link2, Heading1, Heading2,
  Pilcrow, Minus
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

console.log('[templates] setup() running — process.client:', process.client)

definePageMeta({ layout: 'admin', middleware: ['admin-auth'] })

const { isSuperAdmin, fetchProfile } = useAdmin()
const supabase = useSupabase()

const templateDefs = [
  { id: 1, name: 'Booking Confirmation',       key: 'booking_confirm',            defaultSubject: 'Your Safari with Ethno Kenia is Confirmed!' },
  { id: 2, name: 'Trip Inquiry Auto-Reply',    key: 'trip_inquiry_auto_reply',    defaultSubject: 'Thank you for your safari inquiry – {{trip_title}}' },
  { id: 3, name: 'General Inquiry Auto-Reply', key: 'general_inquiry_auto_reply', defaultSubject: 'Thank you for contacting Ethno Kenia Adventures' },
  { id: 4, name: 'Payment Received',           key: 'payment_success',            defaultSubject: 'Receipt for your payment' },
]

const selectedTemplate  = ref<typeof templateDefs[0]>(templateDefs[0]!)
const subject           = ref('')
const isSaving          = ref(false)
const isLoadingTemplate = ref(false)

const defaultBody = `<p>Jambo <strong>{{first_name}}</strong>!</p><p>Thank you for reaching out to Ethno Kenia Adventures.</p><p>Best regards,<br>Ethno Kenia Adventures</p>`

// ── Tiptap editor ────────────────────────────────────────────────────────────
console.log('[templates] about to call useEditor')
const editor = process.client ? useEditor({
  content: defaultBody,
  extensions: [
    StarterKit,
    TiptapUnderline,
    TextStyle,
    Color,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Link.configure({ openOnClick: false }),
  ],
}) : ref(undefined)
console.log('[templates] useEditor done')

// ── Load template ────────────────────────────────────────────────────────────
async function loadTemplate(key: string) {
  isLoadingTemplate.value = true
  try {
    const { data } = await supabase
      .from('email_templates')
      .select('subject, body_html')
      .eq('slug', key)
      .maybeSingle()

    subject.value = data?.subject ?? templateDefs.find(t => t.key === key)?.defaultSubject ?? ''
    editor.value?.commands.setContent(data?.body_html ?? defaultBody)
  } catch {
    subject.value = templateDefs.find(t => t.key === key)?.defaultSubject ?? ''
    editor.value?.commands.setContent(defaultBody)
  } finally {
    isLoadingTemplate.value = false
  }
}

// ── Save template ────────────────────────────────────────────────────────────
async function saveTemplate() {
  if (!editor.value) return
  isSaving.value = true
  try {
    const { data: { session } } = await supabase.auth.getSession()
    await $fetch(`/api/admin/templates/${selectedTemplate.value.key}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${session?.access_token}` },
      body: {
        name:      selectedTemplate.value.name,
        subject:   subject.value,
        body_html: editor.value.getHTML(),
      },
    })
    toast.success('Template saved')
  } catch (err: any) {
    toast.error('Save failed', { description: err.data?.statusMessage ?? err.message })
  } finally {
    isSaving.value = false
  }
}

function selectTemplate(t: typeof templateDefs[0]) {
  selectedTemplate.value = t
  loadTemplate(t.key)
}

// Toolbar helpers
function setLink() {
  const url = window.prompt('URL')
  if (!url) return
  editor.value?.chain().focus().setLink({ href: url }).run()
}

onMounted(async () => {
  console.log('[templates] onMounted fired')
  await fetchProfile()
  console.log('[templates] fetchProfile done — isSuperAdmin:', isSuperAdmin.value)
  if (!isSuperAdmin.value) {
    console.log('[templates] not super admin, redirecting')
    navigateTo('/admin/dashboard')
    return
  }
  console.log('[templates] loading template:', selectedTemplate.value.key)
  loadTemplate(selectedTemplate.value.key)
})

onBeforeUnmount(() => editor.value?.destroy())
</script>

<template>
  <div v-if="isSuperAdmin" class="templates-page">
    <header class="page-header">
      <div class="title-wrap">
        <h1 class="text-2xl font-bold">Email Templates</h1>
        <p class="text-muted text-sm">Customize automated emails sent to your guests.</p>
      </div>
      <button class="save-btn" @click="saveTemplate" :disabled="isSaving">
        <Save class="w-4 h-4" />
        <span>{{ isSaving ? 'Saving…' : 'Save Changes' }}</span>
      </button>
    </header>

    <div class="editor-layout">
      <!-- Sidebar -->
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
          <p class="v-hint">Type these directly into the editor body or subject line.</p>
          <div class="v-list">
            <code v-pre>{{first_name}}</code>
            <code v-pre>{{last_name}}</code>
            <code v-pre>{{trip_title}}</code>
            <code v-pre>{{message}}</code>
            <code v-pre>{{travel_date}}</code>
            <code v-pre>{{booking_id}}</code>
          </div>
        </div>
      </aside>

      <!-- Editor area -->
      <main class="editor-main">
        <!-- Subject line -->
        <div class="subject-row">
          <label class="subject-label">Subject</label>
          <input v-model="subject" type="text" class="subject-input" placeholder="Email subject line…" />
        </div>

        <!-- Tiptap toolbar + editor -->
        <div class="tiptap-card" :class="{ 'is-loading': isLoadingTemplate }">
          <!-- Toolbar -->
          <div class="toolbar" v-if="editor">
            <div class="toolbar-group">
              <button :class="['tb-btn', { active: editor.isActive('bold') }]"              @click="editor.chain().focus().toggleBold().run()"        title="Bold"><Bold          class="w-4 h-4" /></button>
              <button :class="['tb-btn', { active: editor.isActive('italic') }]"            @click="editor.chain().focus().toggleItalic().run()"      title="Italic"><Italic        class="w-4 h-4" /></button>
              <button :class="['tb-btn', { active: editor.isActive('underline') }]"         @click="editor.chain().focus().toggleUnderline().run()"   title="Underline"><UnderlineIcon class="w-4 h-4" /></button>
              <button :class="['tb-btn', { active: editor.isActive('strike') }]"            @click="editor.chain().focus().toggleStrike().run()"      title="Strikethrough"><Strikethrough class="w-4 h-4" /></button>
            </div>
            <div class="toolbar-sep" />
            <div class="toolbar-group">
              <button :class="['tb-btn', { active: editor.isActive('heading', { level: 1 }) }]" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" title="Heading 1"><Heading1 class="w-4 h-4" /></button>
              <button :class="['tb-btn', { active: editor.isActive('heading', { level: 2 }) }]" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" title="Heading 2"><Heading2 class="w-4 h-4" /></button>
              <button :class="['tb-btn', { active: editor.isActive('paragraph') }]"         @click="editor.chain().focus().setParagraph().run()"      title="Paragraph"><Pilcrow    class="w-4 h-4" /></button>
            </div>
            <div class="toolbar-sep" />
            <div class="toolbar-group">
              <button :class="['tb-btn', { active: editor.isActive({ textAlign: 'left' }) }]"   @click="editor.chain().focus().setTextAlign('left').run()"   title="Align left"><AlignLeft    class="w-4 h-4" /></button>
              <button :class="['tb-btn', { active: editor.isActive({ textAlign: 'center' }) }]" @click="editor.chain().focus().setTextAlign('center').run()" title="Align center"><AlignCenter  class="w-4 h-4" /></button>
              <button :class="['tb-btn', { active: editor.isActive({ textAlign: 'right' }) }]"  @click="editor.chain().focus().setTextAlign('right').run()"  title="Align right"><AlignRight   class="w-4 h-4" /></button>
            </div>
            <div class="toolbar-sep" />
            <div class="toolbar-group">
              <button :class="['tb-btn', { active: editor.isActive('bulletList') }]"        @click="editor.chain().focus().toggleBulletList().run()"   title="Bullet list"><List         class="w-4 h-4" /></button>
              <button :class="['tb-btn', { active: editor.isActive('orderedList') }]"       @click="editor.chain().focus().toggleOrderedList().run()"  title="Numbered list"><ListOrdered  class="w-4 h-4" /></button>
            </div>
            <div class="toolbar-sep" />
            <div class="toolbar-group">
              <button :class="['tb-btn', { active: editor.isActive('link') }]"              @click="setLink"                                           title="Insert link"><Link2        class="w-4 h-4" /></button>
              <button class="tb-btn"                                                         @click="editor.chain().focus().setHorizontalRule().run()"  title="Divider"><Minus          class="w-4 h-4" /></button>
            </div>
          </div>

          <!-- Editor content -->
          <div class="editor-body">
            <ClientOnly>
              <EditorContent :editor="editor" class="tiptap-content" />
            </ClientOnly>
          </div>
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
.text-muted { color: rgba(240, 232, 220, 0.4); }

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
  font-size: 0.9rem;
  cursor: pointer;
}
.save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.editor-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 1.5rem;
  height: calc(100vh - 196px);
}

/* Sidebar */
.template-sidebar { display: flex; flex-direction: column; gap: 1.25rem; overflow-y: auto; }
.sidebar-title { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: rgba(240,232,220,0.3); letter-spacing: 0.1em; }
.template-list { display: flex; flex-direction: column; gap: 0.5rem; }
.template-btn { display: flex; flex-direction: column; padding: 0.9rem 1rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; text-align: left; cursor: pointer; transition: all 0.2s; }
.template-btn:hover { background: rgba(255,255,255,0.05); }
.template-btn--active { background: rgba(196,113,78,0.1); border-color: rgba(196,113,78,0.3); }
.t-name { font-weight: 600; color: #e8e2d9; font-size: 0.88rem; margin-bottom: 0.2rem; }
.t-key { font-size: 0.68rem; font-family: monospace; color: rgba(240,232,220,0.35); }

.variables-card { background: rgba(0,0,0,0.2); border-radius: 12px; padding: 1.1rem; border: 1px solid rgba(255,255,255,0.05); }
.v-header { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 700; color: #dfab90; margin-bottom: 0.4rem; }
.v-hint { font-size: 0.7rem; color: rgba(240,232,220,0.3); margin-bottom: 0.75rem; line-height: 1.4; }
.v-list { display: flex; flex-direction: column; gap: 0.4rem; }
code { font-size: 0.73rem; background: rgba(255,255,255,0.05); padding: 0.2rem 0.5rem; border-radius: 4px; color: #9ec89e; }

/* Main editor */
.editor-main { display: flex; flex-direction: column; gap: 0.75rem; min-height: 0; }

.subject-row { display: flex; align-items: center; gap: 0.75rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 0.75rem 1.25rem; }
.subject-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(240,232,220,0.35); white-space: nowrap; }
.subject-input { flex: 1; background: transparent; border: none; color: #e8e2d9; font-size: 0.95rem; outline: none; }
.subject-input::placeholder { color: rgba(240,232,220,0.2); }

.tiptap-card { flex: 1; display: flex; flex-direction: column; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; overflow: hidden; min-height: 0; }
.tiptap-card.is-loading { opacity: 0.5; pointer-events: none; }

/* Toolbar */
.toolbar { display: flex; align-items: center; flex-wrap: wrap; gap: 0.25rem; padding: 0.6rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.07); background: rgba(255,255,255,0.02); }
.toolbar-group { display: flex; gap: 0.15rem; }
.toolbar-sep { width: 1px; height: 20px; background: rgba(255,255,255,0.08); margin: 0 0.3rem; }
.tb-btn { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: transparent; border: 1px solid transparent; border-radius: 6px; color: rgba(240,232,220,0.45); cursor: pointer; transition: all 0.15s; }
.tb-btn:hover { background: rgba(255,255,255,0.07); color: #e8e2d9; }
.tb-btn.active { background: rgba(196,113,78,0.2); color: #dfab90; border-color: rgba(196,113,78,0.3); }

/* Tiptap editor body */
.editor-body { flex: 1; overflow-y: auto; background: white; }
</style>

<!-- Tiptap content styles — not scoped so they reach inside the editor -->
<style>
.tiptap-content { height: 100%; }
.tiptap-content .ProseMirror {
  min-height: 100%;
  padding: 1.75rem 2rem;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #1a1a1a;
}
.tiptap-content .ProseMirror p { margin: 0 0 0.75em; }
.tiptap-content .ProseMirror h1 { font-size: 1.6rem; font-weight: 700; margin: 0 0 0.5em; }
.tiptap-content .ProseMirror h2 { font-size: 1.25rem; font-weight: 700; margin: 0 0 0.5em; }
.tiptap-content .ProseMirror ul,
.tiptap-content .ProseMirror ol { padding-left: 1.5rem; margin: 0 0 0.75em; }
.tiptap-content .ProseMirror li { margin-bottom: 0.25em; }
.tiptap-content .ProseMirror hr { border: none; border-top: 1px solid #ddd; margin: 1.5em 0; }
.tiptap-content .ProseMirror a { color: #c4714e; text-decoration: underline; }
.tiptap-content .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  color: #aaa;
  pointer-events: none;
  float: left;
  height: 0;
}
</style>
