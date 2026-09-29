/** 导出/导入 JSON 文件；轮廓坐标固定 mm，保证重载后实际尺寸不变。 */
import { analyzeMesh } from '../geometry/mesh'
import { gearProfile } from '../geometry/spur'
import type { CaseInput } from './caseFormat'
import { FORMAT_VERSION, isCaseFile, isProfileFile, type CaseFile, type ProfileFile } from './caseFormat'

export function buildCaseFile(input: CaseInput, withProfiles: boolean, notes?: string): CaseFile {
  const file: CaseFile = {
    format: 'gear-lab-case',
    version: FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    input: structuredClone(input),
    notes,
  }
  if (withProfiles) {
    const rep = analyzeMesh(input)
    file.profiles = {
      local1: gearProfile(rep.g1, { involuteSegments: 40 }),
      local2: gearProfile(rep.g2, { involuteSegments: 40 }),
    }
  }
  return file
}

export function buildProfileFile(input: CaseInput): ProfileFile {
  const rep = analyzeMesh(input)
  const raw = [
    {
      gear: 1 as const,
      unit: 'mm' as const,
      params: structuredClone(input.g1),
      ring: gearProfile(rep.g1, { involuteSegments: 48 }),
      pointCount: 0,
    },
    {
      gear: 2 as const,
      unit: 'mm' as const,
      params: structuredClone(input.g2),
      ring: gearProfile(rep.g2, { involuteSegments: 48 }),
      pointCount: 0,
    },
  ]
  return {
    format: 'gear-lab-profile',
    version: FORMAT_VERSION,
    exportedAt: new Date().toISOString(),
    profiles: raw.map((p) => ({ ...p, pointCount: p.ring.length })),
  }
}

export function downloadJson(name: string, data: unknown): void {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}

export async function pickJsonFile(): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/json,.json'
    input.onchange = () => {
      const f = input.files?.[0]
      if (!f) {
        reject(new Error('未选择文件'))
        return
      }
      f.text()
        .then((t) => JSON.parse(t))
        .then(resolve, reject)
    }
    input.click()
  })
}

/** 载入并校验，返回规范化后的案例输入；轮廓文件可回填参数 */
export async function importCaseOrProfile(): Promise<{
  kind: 'case' | 'profile'
  input: CaseInput
  file: CaseFile | ProfileFile
}> {
  const data = await pickJsonFile()
  if (isCaseFile(data)) {
    validateParams(data.input)
    return { kind: 'case', input: data.input, file: data }
  }
  if (isProfileFile(data)) {
    const p1 = data.profiles.find((p) => p.gear === 1)
    const p2 = data.profiles.find((p) => p.gear === 2)
    if (!p1 || !p2) throw new Error('轮廓文件缺少齿轮 1 或齿轮 2 的数据')
    const input: CaseInput = { g1: p1.params, g2: p2.params, deltaA: 0 }
    validateParams(input)
    return { kind: 'profile', input, file: data }
  }
  throw new Error('无法识别的文件格式')
}

function validateParams(input: CaseInput): void {
  for (const [name, p] of [
    ['齿轮1', input.g1],
    ['齿轮2', input.g2],
  ] as const) {
    if (!Number.isFinite(p.z) || p.z < 4 || !Number.isInteger(p.z))
      throw new Error(`${name} 齿数无效（应为 ≥4 的整数）`)
    if (!Number.isFinite(p.m) || p.m <= 0) throw new Error(`${name} 模数必须为正数`)
    if (!(p.alphaDeg > 0 && p.alphaDeg < 45)) throw new Error(`${name} 压力角超出合理范围 (0°,45°)`)
  }
}
