/**
 * 显示单位切换。内部一切长度以毫米（mm）存储与计算；切换单位只改变显示换算，
 * 绝不改变实际尺寸（这是教学工具的硬要求）。
 */
export type LengthUnit = 'mm' | 'cm' | 'm' | 'in'

export interface UnitDef {
  id: LengthUnit
  label: string
  /** 1 mm = factor 个该单位 */
  factor: number
  /** 输入步长（该单位） */
  step: number
  decimals: number
}

export const UNITS: Record<LengthUnit, UnitDef> = {
  mm: { id: 'mm', label: 'mm', factor: 1, step: 0.1, decimals: 3 },
  cm: { id: 'cm', label: 'cm', factor: 0.1, step: 0.01, decimals: 4 },
  m: { id: 'm', label: 'm', factor: 0.001, step: 0.001, decimals: 5 },
  in: { id: 'in', label: 'in', factor: 1 / 25.4, step: 0.01, decimals: 4 }
}

/** mm → 显示单位数值 */
export function fromMm(mm: number, u: LengthUnit): number {
  return mm * UNITS[u].factor
}
/** 显示单位数值 → mm（内部存储） */
export function toMm(value: number, u: LengthUnit): number {
  return value / UNITS[u].factor
}
/** 按单位格式化长度显示 */
export function fmtLen(mm: number, u: LengthUnit): string {
  const v = fromMm(mm, u)
  return `${v.toFixed(UNITS[u].decimals)} ${UNITS[u].label}`
}
