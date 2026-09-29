/**
 * 接触与干涉的数值复核。
 *
 * 解析理论给出“应当”在啮合线上的接触点；这里用两份独立的几何计算复核：
 *  - 接触点到两齿廓（折线近似）的最短距离，应只含折线化误差；
 *  - Clipper 布尔交得到的重叠多边形：
 *      * 紧邻理论接触点的小块属于折线化数值残差（曲线被弦替代所致）；
 *      * 远离接触点、或嵌入深度超阈值的块是真实局部干涉（顶刃/过渡曲线干涉、背面接触）。
 */
import type { MeshReport } from './mesh'
import { contactPointsAt, meshAngles } from './mesh'
import { gearProfile, transformRing, type Pt, type Ring } from './spur'
import { intersectRings, type IntersectionResult } from '../clipper/intersection'

export interface Placement {
  profile1: Ring
  profile2: Ring
  theta: number
}

export function placeGears(rep: MeshReport, theta: number, segments = 24): Placement {
  const ring1 = gearProfile(rep.g1, { involuteSegments: segments })
  const ring2 = gearProfile(rep.g2, { involuteSegments: segments })
  const ang = meshAngles(rep, theta)
  return {
    profile1: transformRing(ring1, rep.center1.x, rep.center1.y, ang.a1),
    profile2: transformRing(ring2, rep.center2.x, rep.center2.y, ang.a2),
    theta,
  }
}

/** 点到闭合折线的最短距离及最近点 */
export function distanceToRing(p: Pt, ring: Ring): { dist: number; nearest: Pt } {
  let best = Infinity
  let nearest: Pt = ring[0]
  for (let i = 0; i < ring.length - 1; i++) {
    const a = ring[i]
    const b = ring[i + 1]
    const abx = b.x - a.x
    const aby = b.y - a.y
    const len2 = abx * abx + aby * aby || 1e-12
    let t = ((p.x - a.x) * abx + (p.y - a.y) * aby) / len2
    t = Math.max(0, Math.min(1, t))
    const qx = a.x + t * abx
    const qy = a.y + t * aby
    const d = Math.hypot(p.x - qx, p.y - qy)
    if (d < best) {
      best = d
      nearest = { x: qx, y: qy }
    }
  }
  return { dist: best, nearest }
}

export interface ContactDeviation {
  point: Pt
  distToGear1: number
  distToGear2: number
}

export interface InterferenceCheck {
  theta: number
  contacts: ContactDeviation[]
  intersection: IntersectionResult
  /** 归属到理论接触点附近的数值残差面积 */
  numericalResidualArea: number
  /** 远离接触点的真实干涉面积 */
  realInterferenceArea: number
  /** 真实干涉的最大嵌入深度 mm */
  realMaxPenetration: number
  hasInterference: boolean
  tolerance: number
  classified: { ring: Ring; real: boolean }[]
}

function centroid(ring: Ring): Pt {
  let x = 0
  let y = 0
  let n = 0
  for (const p of ring) {
    x += p.x
    y += p.y
    n++
  }
  return { x: x / n, y: y / n }
}

export async function checkAt(
  rep: MeshReport,
  theta: number,
  opts: { segments?: number; tolerance?: number; residualRadius?: number } = {},
): Promise<InterferenceCheck> {
  const segments = opts.segments ?? 24
  // 嵌入阈值：模数的 0.5%，但不小于折线弦误差量级
  const tolerance = opts.tolerance ?? Math.max(0.002 * rep.g1.p.m, 2e-3)
  const residualRadius = opts.residualRadius ?? Math.max(0.02 * rep.g1.p.m, 0.02)

  const { profile1, profile2 } = placeGears(rep, theta, segments)
  const theoretical = contactPointsAt(rep, theta)
  const contacts: ContactDeviation[] = theoretical.map((c) => ({
    point: { x: c.x, y: c.y },
    distToGear1: distanceToRing({ x: c.x, y: c.y }, profile1).dist,
    distToGear2: distanceToRing({ x: c.x, y: c.y }, profile2).dist,
  }))

  const intersection = await intersectRings(profile1, profile2)
  let numericalResidualArea = 0
  let realInterferenceArea = 0
  let realMaxPenetration = 0
  const classified: { ring: Ring; real: boolean }[] = []
  for (const poly of intersection.polygons) {
    const c = centroid(poly)
    const nearContact = theoretical.some((q) => Math.hypot(q.x - c.x, q.y - c.y) <= residualRadius)
    if (nearContact) {
      numericalResidualArea += polygonAreaSimple(poly)
      classified.push({ ring: poly, real: false })
    } else {
      realInterferenceArea += polygonAreaSimple(poly)
      realMaxPenetration = Math.max(realMaxPenetration, penetrationDepth(poly))
      classified.push({ ring: poly, real: true })
    }
  }
  const hasInterference =
    realInterferenceArea > tolerance * tolerance || realMaxPenetration > tolerance
  return {
    theta,
    contacts,
    intersection,
    numericalResidualArea,
    realInterferenceArea,
    realMaxPenetration,
    hasInterference,
    tolerance,
    classified,
  }
}

function polygonAreaSimple(ring: Ring): number {
  let a = 0
  for (let i = 0; i < ring.length - 1; i++) a += ring[i].x * ring[i + 1].y - ring[i + 1].x * ring[i].y
  return Math.abs(a / 2)
}

/** 多边形沿啮合线法向? 这里以最小包围盒短边近似嵌入深度 */
function penetrationDepth(poly: Ring): number {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const p of poly) {
    minX = Math.min(minX, p.x)
    maxX = Math.max(maxX, p.x)
    minY = Math.min(minY, p.y)
    maxY = Math.max(maxY, p.y)
  }
  return Math.min(maxX - minX, maxY - minY)
}

export interface ScanResult {
  steps: number
  checked: number
  maxPenetration: number
  worstTheta: number
  interferenceAngles: number[]
  aborted: boolean
}

/**
 * 扫描一个基节周期 θ ∈ [0, 2π/z1)，逐相位做布尔交。
 * await onYield 之间让出主线程，便于 UI 显示进度。
 */
export async function scanPeriod(
  rep: MeshReport,
  steps: number,
  onProgress?: (done: number, total: number, worst: number) => void,
): Promise<ScanResult> {
  const period = (2 * Math.PI) / rep.g1.p.z
  let maxPenetration = 0
  let worstTheta = 0
  const interferenceAngles: number[] = []
  let checked = 0
  for (let i = 0; i < steps; i++) {
    const theta = (period * (i + 0.5)) / steps
    const result = await checkAt(rep, theta, { segments: 18 })
    checked++
    if (result.realMaxPenetration > maxPenetration) {
      maxPenetration = result.realMaxPenetration
      worstTheta = theta
    }
    if (result.hasInterference) interferenceAngles.push(theta)
    onProgress?.(checked, steps, maxPenetration)
    // 每步让出事件循环
    await new Promise((r) => setTimeout(r, 0))
  }
  return {
    steps,
    checked,
    maxPenetration,
    worstTheta,
    interferenceAngles,
    aborted: false,
  }
}
