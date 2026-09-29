/**
 * 显示单位。内部一切长度均为毫米，单位切换只做显示换算，绝不改动模型尺寸。
 */
export type LengthUnit = 'mm' | 'cm' | 'm' | 'in'

export interface UnitDef {
  id: LengthUnit
  label: string
  /** 显示值 = 毫米值 × factor */
  factor: number
  /** 输入值换算回毫米：mm = 输入 / factor */
  precision: number
}

export const UNITS: Record<LengthUnit, UnitDef> = {
  mm: { id: 'mm', label: 'mm', factor: 1, precision: 3 },
  cm: { id: 'cm', label: 'cm', factor: 0.1, precision: 4 },
  m: { id: 'm', label: 'm', factor: 0.001, precision: 6 },
  in: { id: 'in', label: 'in', factor: 1 / 25.4, precision: 4 },
}

export function fromMm(mm: number, unit: LengthUnit): number {
  return mm * UNITS[unit].factor
}

export function toMm(displayValue: number, unit: LengthUnit): number {
  return displayValue / UNITS[unit].factor
}

export function formatMm(mm: number, unit: LengthUnit, digits?: number): string {
  const v = fromMm(mm, unit)
  const d = digits ?? UNITS[unit].precision
  return `${v.toFixed(d)} ${UNITS[unit].label}`
}
