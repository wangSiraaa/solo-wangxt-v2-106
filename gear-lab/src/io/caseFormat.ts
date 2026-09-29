/**
 * 案例 / 轮廓 的导出文件格式（JSON，带版本与单位声明）。
 * 导出的轮廓坐标一律使用 mm，重新载入后与导出前几何完全一致。
 */
import type { GearParams } from '../geometry/spur'
import type { Ring } from '../geometry/spur'

export const FORMAT_VERSION = 1

export interface CaseInput {
  g1: GearParams
  g2: GearParams
  deltaA: number
}

export interface ExportedProfile {
  gear: 1 | 2
  unit: 'mm'
  params: GearParams
  /** 局部坐标（齿轮中心为原点），角度 0 时的闭合轮廓；首尾点相同 */
  ring: Ring
  pointCount: number
}

export interface CaseFile {
  format: 'gear-lab-case'
  version: number
  exportedAt: string
  input: CaseInput
  /** 可选：同时导出 θ=0 安装位置下的轮廓，便于在无几何内核时复核/绘图 */
  profiles?: {
    local1: Ring
    local2: Ring
  }
  notes?: string
}

export interface ProfileFile {
  format: 'gear-lab-profile'
  version: number
  exportedAt: string
  profiles: ExportedProfile[]
}

export function isCaseFile(x: unknown): x is CaseFile {
  return (
    !!x &&
    typeof x === 'object' &&
    (x as CaseFile).format === 'gear-lab-case' &&
    typeof (x as CaseFile).version === 'number' &&
    !!(x as CaseFile).input
  )
}

export function isProfileFile(x: unknown): x is ProfileFile {
  return (
    !!x &&
    typeof x === 'object' &&
    (x as ProfileFile).format === 'gear-lab-profile' &&
    Array.isArray((x as ProfileFile).profiles)
  )
}
