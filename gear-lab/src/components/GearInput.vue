<script setup lang="ts">
import type { GearParams } from '../geometry/spur'
import UnitNumber from './UnitNumber.vue'
import type { LengthUnit } from '../units'

const props = defineProps<{
  title: string
  modelValue: GearParams
  unit: LengthUnit
}>()
const emit = defineEmits<{ 'update:modelValue': [v: GearParams] }>()

function patch(p: Partial<GearParams>) {
  emit('update:modelValue', { ...props.modelValue, ...p })
}
</script>

<template>
  <section class="gear-card">
    <h3>{{ title }}</h3>
    <label class="num-row">
      <span class="num-label">齿数 z（整数）</span>
      <input
        type="number"
        min="4"
        step="1"
        :value="modelValue.z"
        @change="patch({ z: Math.max(4, Math.round(Number(($event.target as HTMLInputElement).value))) })"
      />
    </label>
    <UnitNumber
      label="模数 m"
      :model-value="modelValue.m"
      :unit="unit"
      @update:model-value="(v) => patch({ m: v })"
    />
    <label class="num-row">
      <span class="num-label">压力角 α（度）</span>
      <input
        type="number"
        min="1"
        max="44"
        step="0.5"
        :value="modelValue.alphaDeg"
        @change="patch({ alphaDeg: Number(($event.target as HTMLInputElement).value) })"
      />
    </label>
    <div class="two-col">
      <label class="num-row">
        <span class="num-label">ha*</span>
        <input
          type="number"
          step="0.05"
          :value="modelValue.haStar"
          @change="patch({ haStar: Number(($event.target as HTMLInputElement).value) })"
        />
      </label>
      <label class="num-row">
        <span class="num-label">c*</span>
        <input
          type="number"
          step="0.05"
          :value="modelValue.cStar"
          @change="patch({ cStar: Number(($event.target as HTMLInputElement).value) })"
        />
      </label>
    </div>
  </section>
</template>

<style scoped>
.gear-card {
  background: #111c31;
  border: 1px solid #21304d;
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
h3 {
  margin: 0 0 2px;
  font-size: 14px;
  color: #9ec3ff;
}
.num-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
}
.num-label {
  color: #c8d3e5;
}
.num-row input {
  width: 92px;
  background: #0f1a2e;
  border: 1px solid #243350;
  border-radius: 4px;
  color: #e8edf5;
  padding: 3px 6px;
  font-size: 13px;
}
.two-col {
  display: flex;
  gap: 8px;
}
</style>
