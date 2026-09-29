/**
 * 单位约定：模块内部所有长度一律使用毫米 (mm)，角度在公式中用弧度，
 * UI 层显示用度。单位切换只影响显示换算，不改变内部实际尺寸。
 *
 * 适用范围（本工具的建模前提）：
 *  - 一对平行轴外啮合直齿圆柱齿轮
 *  - 标准齿、无变位（x1 = x2 = 0），齿顶高系数 ha*、顶隙系数 c* 取标准值
 *  - 理想刚性、无载荷变形、无制造误差
 *  - 渐开线齿廓；基圆与齿根圆之间用径向直线过渡（教学常用简化，
 *    比真实刀具摆线略占材料，故非接触区干涉判定偏保守，UI 已注明）。
 */

export interface GearParams {
  z: number
  m: number
  alphaDeg: number
  haStar: number
  cStar: number
}

export interface GearGeom {
  p: GearParams
  alpha: number
  r: number
  rb: number
  ra: number
  rf: number
  pCircular: number
  s: number
  zMin: number
  undercut: boolean
}

export type Pt = { x: number; y: number }
export type Ring = Pt[]

/** 渐开线函数 inv(α) = tan α − α */
export function inv(alpha: number): number {
  return Math.tan(alpha) - alpha
}

/** 由 inv 值反求压力角（牛顿迭代） */
export function invInverse(target: number): number {
  if (target <= 0) return 0
  let a = Math.cbrt(3 * target)
  for (let i = 0; i < 30; i++) {
    const f = Math.tan(a) - a - target
    a -= f / Math.tan(a) ** 2
    if (Math.abs(f) < 1e-12) break
  }
  return a
}

export function geom(p: GearParams): GearGeom {
  const alpha = (p.alphaDeg * Math.PI) / 180
  const r = (p.m * p.z) / 2
  const rb = r * Math.cos(alpha)
  const ra = r + p.haStar * p.m
  const rf = r - (p.haStar + p.cStar) * p.m
  const zMin = (2 * p.haStar) / Math.sin(alpha) ** 2
  return {
    p, alpha, r, rb, ra, rf,
    pCircular: Math.PI * p.m,
    s: (Math.PI * p.m) / 2,
    zMin,
    undercut: p.z < zMin - 1e-9,
  }
}

export function pressureAngleAt(g: GearGeom, rho: number): number {
  return Math.acos(Math.min(1, g.rb / rho))
}

/** 半径 rho 处齿厚半角 ψ(ρ) = s/2r + invα − inv(αρ) */
export function halfAngleAt(g: GearGeom, rho: number): number {
  return g.s / (2 * g.r) + inv(g.alpha) - inv(pressureAngleAt(g, rho))
}

/**
 * 渐开线一肢（齿关于中心方位 centerAngle 对称）。
 * t = tanαt：x0=rb(cos t+t sin t)，y0=±rb(sin t−t cos t)。
 * side=+1 标准曲线；−1 镜像。
 */
export function involuteSide(
  g: GearGeom,
  side: 1 | -1,
  rhoStart: number,
  rhoEnd: number,
  nSegments: number,
  centerAngle = 0,
): Pt[] {
  const gammaBase = g.s / (2 * g.r) + inv(g.alpha)
  const sign = side === 1 ? 1 : -1
  const rot = centerAngle - sign * gammaBase
  const tStart = Math.sqrt(Math.max(0, (rhoStart / g.rb) ** 2 - 1))
  const tEnd = Math.sqrt(Math.max(0, (rhoEnd / g.rb) ** 2 - 1))
  const pts: Pt[] = []
  const c = Math.cos(rot)
  const s = Math.sin(rot)
  for (let i = 0; i <= nSegments; i++) {
    const t = tStart + ((tEnd - tStart) * i) / nSegments
    const x0 = g.rb * (Math.cos(t) + t * Math.sin(t))
    const y0 = sign * g.rb * (Math.sin(t) - t * Math.cos(t))
    pts.push({ x: x0 * c - y0 * s, y: x0 * s + y0 * c })
  }
  return pts
}

function arcPoints(radius: number, a0: number, a1: number, maxStep: number): Pt[] {
  const span = a1 - a0
  const n = Math.max(1, Math.ceil(Math.abs(span) / maxStep))
  const out: Pt[] = []
  for (let i = 1; i <= n; i++) {
    const a = a0 + (span * i) / n
    out.push({ x: radius * Math.cos(a), y: radius * Math.sin(a) })
  }
  return out
}

export interface ProfileOptions {
  involuteSegments?: number
  arcStep?: number
}

/**
 * 完整齿廓闭合外环（逆时针，首尾重合）。齿 i 中心方位 c=i·2π/z（齿0朝+x）。
 * 每齿：+1 肢渐开线(根→顶) → 齿顶圆弧 → −1 肢渐开线(顶→根) → 齿根圆弧到下一齿。
 * 渐开线从 ρ0=max(rb,rf) 起；ρ0 到齿根圆用径向直线（沿 ρ0 处方位）。
 */
export function gearProfile(g: GearGeom, opts: ProfileOptions = {}): Ring {
  const nInv = opts.involuteSegments ?? 28
  const arcStep = opts.arcStep ?? (2 * Math.PI) / 180
  const rho0 = Math.max(g.rb, g.rf)
  const gammaRoot = halfAngleAt(g, rho0)
  const gammaTip = halfAngleAt(g, g.ra)
  const pitch = (2 * Math.PI) / g.p.z

  const ring: Pt[] = []
  for (let i = 0; i < g.p.z; i++) {
    const c = i * pitch
    // 渐开线起点（ρ0）与齿根圆投影点（rf，同方位）
    const right = involuteSide(g, 1, rho0, g.ra, nInv, c)
    const rootPt: Pt = {
      x: g.rf * Math.cos(c - gammaRoot),
      y: g.rf * Math.sin(c - gammaRoot),
    }
    if (i === 0) ring.push(rootPt)
    // 径向直线 rf → ρ0
    ring.push(right[0])
    for (let k = 1; k < right.length; k++) ring.push(right[k])
    ring.push(...arcPoints(g.ra, c - gammaTip, c + gammaTip, arcStep))
    const left = involuteSide(g, -1, rho0, g.ra, nInv, c)
    for (let k = left.length - 2; k >= 0; k--) ring.push(left[k])
    // 径向直线 ρ0 → rf（左肢根点到齿根圆）
    const leftRoot: Pt = {
      x: g.rf * Math.cos(c + gammaRoot),
      y: g.rf * Math.sin(c + gammaRoot),
    }
    ring.push(leftRoot)
    const next = (i + 1) * pitch
    if (i === g.p.z - 1) {
      ring.push(...arcPoints(g.rf, c + gammaRoot, 2 * Math.PI - gammaRoot, arcStep))
    } else {
      ring.push(...arcPoints(g.rf, c + gammaRoot, next - gammaRoot, arcStep))
    }
  }
  ring.push({ ...ring[0] })
  return ring
}

export function polygonArea(ring: Ring): number {
  let a = 0
  for (let i = 0; i < ring.length - 1; i++) {
    a += ring[i].x * ring[i + 1].y - ring[i + 1].x * ring[i].y
  }
  return a / 2
}

export function transformRing(ring: Ring, cx: number, cy: number, angle: number): Ring {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return ring.map((p) => ({ x: cx + p.x * c - p.y * s, y: cy + p.x * s + p.y * c }))
}

export function rotatePoint(p: Pt, angle: number): Pt {
  const c = Math.cos(angle)
  const s = Math.sin(angle)
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c }
}
