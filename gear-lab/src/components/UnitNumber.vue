<script setup lang="ts">
import { computed } from 'vue'
import { fromMm, toMm, UNITS, type LengthUnit } from '../units'

/**
 * v-model 始终是 mm。组件显示值随当前单位换算；
 * 切换单位只改变显示文本，不向父级回写，因此实际尺寸不变。
 */
const props = defineProps<{
  modelValue: number
  unit: LengthUnit
  label: string
  step?: number
  min?: number
  disabled?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [number: number] }>()

const display = computed({
  get: () => {
    const v = fromMm(props.modelValue, props.unit)
    return Number(v.toFixed(UNITS[props.unit].precision))
  },
  set: (v: number) => {
    if (Number.isFinite(v)) emit('update:modelValue', toMm(v, props.unit))
  },
})

function onInput(e: Event) {
  const v = parseFloat((e.target as HTMLInputElement).value)
  if (Number.isFinite(v)) emit('update:modelValue', toMm(v, props.unit))
}
</script>

<template>
  <label class="num-row">
    <span class="num-label">{{ label }}</span>
    <span class="num-field">
      <input
        type="number"
        :value="display"
        :step="step ?? 'any'"
        :min="min"
        :disabled="disabled"
        @change="onInput"
      />
      <em class="unit">{{ UNITS[unit].label }}</em>
    </span>
  </label>
</template>

<style scoped>
.num-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  font-size: 13px;
}
.num-label {
  color: #c8d3e5;
  white-space: nowrap;
}
.num-field {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.num-field input {
  width: 92px;
  background: #0f1a2e;
  border: 1px solid #243350;
  border-radius: 4px;
  color: #e8edf5;
  padding: 3px 6px;
  font-size: 13px;
}
.unit {
  font-style: normal;
  color: #7f8ea6;
  font-size: 11px;
  width: 22px;
}
</style>
