<script setup lang="ts">
import { Plus, Trash, GripVertical, Clock, MapPin } from 'lucide-vue-next'

interface ItineraryDay {
  time: string
  title: string
  details: string
}

const props = defineProps<{
  modelValue: ItineraryDay[]
}>()

const emit = defineEmits(['update:modelValue'])

const addDay = () => {
  const newItinerary = [...props.modelValue, { time: '', title: '', details: '' }]
  emit('update:modelValue', newItinerary)
}

const removeDay = (index: number) => {
  const newItinerary = props.modelValue.filter((_, i) => i !== index)
  emit('update:modelValue', newItinerary)
}

const updateDay = (index: number, field: keyof ItineraryDay, value: string) => {
  const newItinerary = [...props.modelValue]
  newItinerary[index] = { ...newItinerary[index], [field]: value }
  emit('update:modelValue', newItinerary)
}
</script>

<template>
  <div class="itinerary-editor">
    <div v-if="modelValue.length === 0" class="empty-itinerary">
      <p>No itinerary days added yet.</p>
      <button type="button" @click="addDay" class="add-first-btn">
        <Plus class="w-4 h-4" />
        Add Day 1
      </button>
    </div>

    <div v-else class="days-list">
      <div v-for="(day, index) in modelValue" :key="index" class="day-card">
        <div class="day-header">
          <div class="day-number">Day {{ index + 1 }}</div>
          <button type="button" class="remove-btn" @click="removeDay(index)">
            <Trash class="w-4 h-4" />
          </button>
        </div>

        <div class="day-body">
          <div class="input-grid">
            <div class="input-group">
              <label class="input-label"><Clock class="w-3 h-3" /> Time / Period</label>
              <input 
                :value="day.time" 
                @input="e => updateDay(index, 'time', (e.target as HTMLInputElement).value)"
                placeholder="e.g. 08:00 AM or Morning"
                class="form-input"
              />
            </div>
            <div class="input-group">
              <label class="input-label"><MapPin class="w-3 h-3" /> Title</label>
              <input 
                :value="day.title" 
                @input="e => updateDay(index, 'title', (e.target as HTMLInputElement).value)"
                placeholder="e.g. Arrival at Masai Mara"
                class="form-input"
              />
            </div>
          </div>
          <div class="input-group mt-4">
            <label class="input-label">Activities & Details</label>
            <textarea 
              :value="day.details" 
              @input="e => updateDay(index, 'details', (e.target as HTMLTextAreaElement).value)"
              placeholder="Describe the activities for this day..."
              class="form-textarea"
              rows="3"
            />
          </div>
        </div>
      </div>

      <button type="button" @click="addDay" class="add-day-btn">
        <Plus class="w-4 h-4" />
        Add Another Day
      </button>
    </div>
  </div>
</template>

<style scoped>
.itinerary-editor {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.empty-itinerary {
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.02);
  border: 2px dashed rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: rgba(240, 232, 220, 0.4);
}

.add-first-btn {
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: #c4714e;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.days-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.day-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  overflow: hidden;
}

.day-header {
  padding: 0.75rem 1.25rem;
  background: rgba(255, 255, 255, 0.02);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.day-number {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #c4714e;
  letter-spacing: 0.05em;
}

.remove-btn {
  background: none;
  border: none;
  color: rgba(239, 68, 68, 0.5);
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #ef4444;
}

.day-body {
  padding: 1.25rem;
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.input-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(240, 232, 220, 0.4);
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.form-input, .form-textarea {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #e8e2d9;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  width: 100%;
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus, .form-textarea:focus {
  border-color: #c4714e;
}

.add-day-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(240, 232, 220, 0.6);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.add-day-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  color: #e8e2d9;
}
</style>
