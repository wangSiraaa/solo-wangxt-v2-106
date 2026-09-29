/**
 * 标准直齿圆柱齿轮（外啮合、无变位、理想刚性）的解析尺寸与齿廓生成。
 *
 * 适用范围（务必在 UI 中向用户展示）：
 *  1. 仅用于外啮合的一对标准渐开线直齿轮，压力角 α 为分度圆压力角（默认 20°）；
 *  2. 齿顶高系数 ha* = 1，顶隙系数 c* = 0.25，齿根圆角按刀具刀尖 ρf* = 0.38 近似；
 *  3. 标准中心距 a = m(z1+z2)/2 安装时理论无侧隙；改变中心距仅用于观察侧隙/顶隙，
 *     此时按基节不变给出啮合角与侧隙，但不再是无侧隙正确啮合；
 *  4. 不考虑弹性变形、摩擦、热膨胀、制造误差与动载荷；
 *  5. 齿廓为端截面轮廓（2D 挤出），斜齿轮、内齿轮、变位齿轮不在本模型内；
 *  6. z < zmin = 2/sin²α（20° 时 ≈17.10）时标准齿条刀具会发生根切，本工具给出警告，
 *     齿廓仍按无侧隙几何构造（根部为简化处理），仅作教学示意，不代表可制造齿形。
 *
 * 角度全部使用弧度；内部长度单位固定为毫米（mm），与显示单位无关。
 */

export const DEG = Math.PI / 180

/** 标准（默认）刀具参数，均为模数的无量纲系数 */
export const TOOL = {
  haStar: 1.0, // 齿顶高系数 ha*
  cStar: 0.25, // 顶隙系数 c*
  rhoFStar: 0.38 // 刀尖圆角系数 ρf*（教学近似）
} as const

export interface GearInput {
  /** 齿数，整数，>=4 */
  z: number
  /** 模数 m，mm，>0 */
  module: number
  /** 分度圆压力角 α，弧度 */
  alpha: number
  /** 齿宽 b，mm，仅用于 3D 挤出，不影响啮合几何 */
  faceWidth: number
}

export interface GearGeometry {
  input: GearInput
  /** 分度圆半径 r = mz/2 */
  pitchR: number
  /** 基圆半径 rb = r·cosα */
  baseR: number
  /** 齿顶圆半径 ra = r + ha*·m */
  addendumR: number
  /** 齿根圆半径 rf = r − (ha*+c*)·m */
  dedendumR: number
  /** 基圆是否在根圆之外（rb>rf，齿数较少时） */
  baseAboveRoot: boolean
  /** 齿距 p = πm */
  circularPitch: number
  /** 基圆齿距 pb = p·cosα（啮合时两轮必须相等） */
  basePitch: number
  /** 齿厚（分度圆弧长）s = πm/2 */
  toothThickness: number
  /** 齿面构造旋转角 β = π/(2z)+invα */
  beta: number
  /** 渐开线在齿顶圆的展开参数 ta = tan αa */
  taTip: number
  /** 根切最少齿数 2/sin²α */
  zMinValue: number
  /** 是否根切（z<zmin） */
  undercut: boolean
  /** 齿顶圆处压力角，弧度 */
  alphaTip: number
  /** 齿顶厚（弧长），<=0 表示齿顶变尖 */
  tipThickness: number
  /** 齿顶变尖 */
  pointed: boolean
  /** 单个轮齿的闭合多边形片段（CCW，从 J_R 到 J_L） */
  toothProfile: Pt[]
  /** 完整齿轮轮廓（一个外环），局部坐标，逆时针 */
  outline: Pt[]
  /** 各齿齿厚中心（分度圆方向）极角，弧度 */
  toothCenterAngles: number[]
  /** 右(+x)、左(−x)齿面与根圆交点 J 的极角（相对本齿中心） */
  jAngleRight: number
  jAngleLeft: number
}

export interface Pt {
  x: number
  y: number
}

// ---------------------------------------------------------------------------
// 渐开线公式
// ---------------------------------------------------------------------------
/**
 * 基圆半径 rb、展开参数 t（滚动角，弧度）的渐开线：
 *   x(t) = rb (sin t − t cos t)
 *   y(t) = rb (cos t + t sin t)
 * 自基圆上的点 (0, rb) 出发，向 +x 一侧展开（极角随 t 增大而减小）。
 * 向径 R(t) = rb·sqrt(1+t²)；该点压力角 α 满足 t = tan α；
 * 相对基圆点的展角（极角变化量）= inv(α) = tan α − α。
 * 适用 t ∈ [0, ta]，ta = sqrt((ra/rb)²−1)；基圆以内无渐开线。
 */
export function involutePoint(rb: number, t: number): Pt {
  return {
    x: rb * (Math.sin(t) - t * Math.cos(t)),
    y: rb * (Math.cos(t) + t * Math.sin(t))
  }
}

/** 渐开线函数 inv(α) = tan α − α（弧度） */
export function inv(alpha: number): number {
  return Math.tan(alpha) - alpha
}

/** 给定压力角反求展开参数 t = tan α */
export function tAtPressureAngle(alpha: number): number {
  return Math.tan(alpha)
}

/** 给定向径 r (>=rb) 求展开参数 t = sqrt((r/rb)²−1) */
export function tAtRadius(r: number, rb: number): number {
  const q = r / rb
  return Math.sqrt(Math.max(0, q * q - 1))
}

// ---------------------------------------------------------------------------

function rot(p: Pt, ang: number): Pt {
  const c = Math.cos(ang),
    s = Math.sin(ang)
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c }
}

function polar(r: number, a: number): Pt {
  return { x: r * Math.cos(a), y: r * Math.sin(a) }
}

function arcPoints(r: number, a0: number, a1: number, steps: number): Pt[] {
  const out: Pt[] = []
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps
    out.push(polar(r, a))
  }
  return out
}

/**
 * 构造完整齿轮轮廓。
 *
 * 轮廓约定（局部坐标，齿轮中心在原点）：
 *  - 0 号齿的齿厚中心方向为 +y 轴（极角 π/2），第 k 齿在 π/2 + 2πk/z；
 *  - 令 β = π/(2z) + inv(α)，基础渐开线 Q(t) 先旋转 +β：
 *      左齿面(−x 侧) P_L(t) = R(+β)·Q(t)
 *      右齿面(+x 侧) P_R(t) = 镜像_y(R(+β)·Q(t))
 *    分度圆点恰在 90°±π/(2z)，弧齿厚 s = πm/2；
 *    齿顶单侧半角 = π/(2z) + invα − invαa（教材 sa 公式）；
 *  - rb > rf：渐开线止于基圆，基圆→齿根为径向直线 + 刀具圆角
 *    （ρ=ρf*·m，与根圆外切、与径向直线相切；放不下时按几何上限自动缩小）；
 *  - rb ≤ rf（大齿数，20° 时 z ≳ 42）：渐开线直接延伸到根圆，根部简化尖角；
 *  - 整圆按 CCW 拼接：每齿 J_R → 圆角 → 渐开线 → 齿顶弧 → 渐开线 → 圆角 → J_L，
 *    再沿齿根圆弧走到下一齿 J_R。
 */
export function buildGear(input: GearInput, involuteSteps = 16): GearGeometry {
  const { z, module: m, alpha } = input
  const r = (m * z) / 2
  const rb = r * Math.cos(alpha)
  const ra = r + TOOL.haStar * m
  const rf = r - (TOOL.haStar + TOOL.cStar) * m
  const p = Math.PI * m
  const pb = p * Math.cos(alpha)
  const s = (Math.PI * m) / 2
  const pitch = (2 * Math.PI) / z
  const baseAboveRoot = rb > rf

  const invA = inv(alpha)
  const beta = Math.PI / (2 * z) + invA

  const taTip = tAtRadius(ra, rb)
  const alphaTip = Math.atan(taTip)
  const invTip = taTip - Math.atan(taTip) // inv(αa)
  const tipHalfAngle = Math.PI / (2 * z) + invA - invTip
  const tipThickness = 2 * ra * tipHalfAngle
  const pointed = tipHalfAngle <= 0

  const zMinValue = 2 / (Math.sin(alpha) * Math.sin(alpha))
  const undercut = z < zMinValue

  const mirrorY = (q: Pt): Pt => ({ x: -q.x, y: q.y })
  const tLo = baseAboveRoot ? 0 : tAtRadius(rf, rb)

  const sidePoints = (sgn: 1 | -1, t0: number, t1: number, steps: number): Pt[] => {
    const out: Pt[] = []
    for (let i = 0; i <= steps; i++) {
      const tt = t0 + ((t1 - t0) * i) / steps
      const q = rot(involutePoint(rb, tt), beta)
      out.push(sgn === 1 ? mirrorY(q) : q)
    }
    return out
  }

  const filletSteps = 6

  interface RootSide {
    j: Pt
    jAngle: number
    /** 圆角弧 J→T（CCW 多边形走向） */
    fillet: Pt[]
    /** 径向线外端点（基圆点）；无圆角时为 null */
    flankLo: Pt | null
  }

  /**
   * 一侧根部（sgn=+1 右/+x 侧，−1 左/−x 侧）。
   * 渐开线下端方向角：
   *   rb>rf：aB = 90° ∓ β；槽中心 θg = 90° ∓ π/z。
   * 圆角圆心位于 aB 朝槽中心偏转 δ 处，OC = rf+ρ，sin δ = ρ/(rf+ρ)，
   * 同时与径向直线相切（T 为垂足），与根圆外切于 J。
   */
  const buildRootSide = (sgn: 1 | -1): RootSide => {
    const dir = -sgn // 右侧角度向下(−)，左侧向上(+)
    const aB = Math.PI / 2 + dir * beta
    const flankLoPts = sidePoints(sgn, tLo, tLo, 1)

    if (!baseAboveRoot) {
      return {
        j: flankLoPts[0],
        jAngle: Math.atan2(flankLoPts[0].y, flankLoPts[0].x),
        fillet: [],
        flankLo: null
      }
    }

    const thetaG = Math.PI / 2 + dir * (pitch / 2)
    // ρ 上限 1：垂足 T 不越过基圆（|OT|≤rb）
    const rhoCapT = (rb * rb - rf * rf) / (2 * rf)
    // ρ 上限 2：J（在根圆上、角度 aB∓δ）不越过齿槽中心
    const deltaMax = Math.abs(aB - thetaG)
    const sinD = Math.sin(deltaMax)
    const rhoCapG = sinD < 1 ? (rf * sinD) / (1 - sinD) : Infinity
    const rho = Math.max(
      0,
      Math.min(TOOL.rhoFStar * m, rhoCapT * 0.999, rhoCapG * 0.999)
    )
    const d = rf + rho
    const delta = Math.asin(Math.min(1, rho / d))
    // 圆角圆心角（朝齿槽中心方向偏转），J 与 C 同方向、在根圆上
    const gAngle = sgn === 1 ? aB - delta : aB + delta
    const C = polar(d, gAngle)
    const J = polar(rf, gAngle)

    // T：圆 C(ρ) 与径向直线（方向 aB，过原点）相切。
    // CT⊥OT，|OC|=d=rf+ρ，故 |OT|=√(d²−ρ²)（Thales 圆），垂足在 aB 方向上。
    const fDist = Math.sqrt(Math.max(0, d * d - rho * rho))
    const T = polar(fDist, aB)

    const aJ = Math.atan2(J.y - C.y, J.x - C.x)
    const aT = Math.atan2(T.y - C.y, T.x - C.x)
    let da = aT - aJ
    while (da > Math.PI) da -= 2 * Math.PI
    while (da < -Math.PI) da += 2 * Math.PI
    // 沿 CCW 轮廓走向：右侧(+x)圆角顺时针绕 C（sweep=−1），左侧逆时针（+1）。
    // 取短弧（|da| 即外凸圆角）并指定扫向。
    da = Math.abs(da) * (-sgn as 1 | -1)
    const fillet: Pt[] = []
    for (let i = 0; i <= filletSteps; i++) {
      const a = aJ + (da * i) / filletSteps
      fillet.push({ x: C.x + rho * Math.cos(a), y: C.y + rho * Math.sin(a) })
    }

    return { j: J, jAngle: gAngle, fillet, flankLo: flankLoPts[0] }
  }

  const right = buildRootSide(1)
  const left = buildRootSide(-1)

  const rightInv = sidePoints(1, tLo, taTip, involuteSteps)
  const leftInv = sidePoints(-1, tLo, taTip, involuteSteps)
  const rightTip = rightInv[involuteSteps]
  const leftTip = leftInv[involuteSteps]
  const rightTipAng = Math.atan2(rightTip.y, rightTip.x)
  const leftTipAng = Math.atan2(leftTip.y, leftTip.x)

  // 单齿片段（CCW）：J_R → 右圆角 → (径向) → 右渐开线 → 齿顶弧
  //               → 左渐开线(逆向) → (径向) → 左圆角(逆向) → J_L
  const toothProfile: Pt[] = []
  toothProfile.push(...right.fillet)
  if (right.flankLo) toothProfile.push(right.flankLo)
  toothProfile.push(...rightInv.slice(1))
  let tipArc = leftTipAng - rightTipAng
  while (tipArc > Math.PI) tipArc -= 2 * Math.PI
  while (tipArc < -Math.PI) tipArc += 2 * Math.PI
  const tipSteps = Math.max(4, Math.ceil((Math.abs(tipArc) / pitch) * 24))
  toothProfile.push(...arcPoints(ra, rightTipAng, rightTipAng + tipArc, tipSteps).slice(1))
  for (let i = involuteSteps - 1; i >= 0; i--) toothProfile.push(leftInv[i])
  if (left.flankLo) {
    toothProfile.push(left.flankLo) // 径向段：基圆点 → T_L
    toothProfile.push(left.fillet[left.fillet.length - 1])
  }
  toothProfile.push(...left.fillet.slice(0, -1).reverse())

  // 整圆
  const outline: Pt[] = []
  const rootSteps = 6
  const pushUnique = (q: Pt) => {
    const last = outline[outline.length - 1]
    if (!last || Math.hypot(q.x - last.x, q.y - last.y) > 1e-10) outline.push(q)
  }
  for (let k = 0; k < z; k++) {
    const cAng = k * pitch
    const rotated = toothProfile.map((q) => rot(q, cAng))
    const jLAng = left.jAngle + cAng
    const jRNextAng = right.jAngle + (k + 1) * pitch
    for (const q of rotated.slice(0, -1)) pushUnique(q)
    for (let i = 1; i <= rootSteps; i++) {
      const a = jLAng + ((jRNextAng - jLAng) * i) / rootSteps
      pushUnique(polar(rf, a))
    }
  }
  // 首尾若重复去掉尾点
  if (outline.length > 1) {
    const f = outline[0],
      l = outline[outline.length - 1]
    if (Math.hypot(f.x - l.x, f.y - l.y) < 1e-10) outline.pop()
  }

  const toothCenterAngles = Array.from({ length: z }, (_, k) => Math.PI / 2 + k * pitch)

  return {
    input,
    pitchR: r,
    baseR: rb,
    addendumR: ra,
    dedendumR: rf,
    baseAboveRoot,
    circularPitch: p,
    basePitch: pb,
    toothThickness: s,
    beta,
    taTip,
    zMinValue,
    undercut,
    alphaTip,
    tipThickness,
    pointed,
    toothProfile,
    outline,
    toothCenterAngles,
    jAngleRight: right.jAngle,
    jAngleLeft: left.jAngle
  }
}

/** 多边形面积（Shoelace），正值表示逆时针 */
export function polygonArea(poly: Pt[]): number {
  let a = 0
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i],
      q = poly[(i + 1) % poly.length]
    a += p.x * q.y - q.x * p.y
  }
  return a / 2
}

/** 有向边与点的折角检查辅助（保留最小外接半径） */
export function minRadius(poly: Pt[]): number {
  let m = Infinity
  for (const p of poly) m = Math.min(m, Math.hypot(p.x, p.y))
  return m
}
export function maxRadius(poly: Pt[]): number {
  let m = 0
  for (const p of poly) m = Math.max(m, Math.hypot(p.x, p.y))
  return m
}

/** 将局部轮廓按 (cx,cy) 与转角 phi 变换到世界坐标 */
export function transformOutline(poly: Pt[], cx: number, cy: number, phi: number): Pt[] {
  const c = Math.cos(phi),
    s = Math.sin(phi)
  return poly.map((p) => ({
    x: cx + p.x * c - p.y * s,
    y: cy + p.x * s + p.y * c
  }))
}

/** 判定输入是否合法（范围检查） */
export function validateGearInput(i: GearInput): string[] {
  const errs: string[] = []
  if (!Number.isFinite(i.z) || i.z < 4 || Math.abs(i.z - Math.round(i.z)) > 1e-9)
    errs.push('齿数必须为 ≥4 的整数')
  if (!(i.module > 0) || !Number.isFinite(i.module)) errs.push('模数必须 > 0')
  if (!(i.alpha > 0) || i.alpha >= Math.PI / 2) errs.push('压力角必须在 (0°, 90°) 内')
  if (!(i.faceWidth > 0)) errs.push('齿宽必须 > 0')
  return errs
}
