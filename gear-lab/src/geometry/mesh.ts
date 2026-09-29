/**
 * 一对外啮合直齿轮的正确啮合分析（无变位、理想刚性）。
 *
 * 正确啮合 ≠ “让两轮按转速比反向旋转”。转速比只能保证传动比 i = ω1/ω2 = z2/z1，
 * 不能保证齿廓在任一时刻恰好沿啮合线相切。本模块额外做：
 *   1) 同一时间只能沿公法线（啮合线）接触，用相位方程把齿摆到节点附近相切；
 *   2) 解析给出啮合线（理论作用线）、极限点、重合度；
 *   3) Clipper 多边形相交做数值复核：扫描整周期，检查顶刃/过渡曲线干涉，
 *      并在接触点处验证齿廓公法线与啮合线的偏差（contactCheck.ts）。
 */
import {
  GearGeom,
  GearParams,
  geom,
  halfAngleAt,
  pressureAngleAt,
  inv,
  invInverse,
} from './spur'

export interface MeshInput {
  g1: GearParams
  g2: GearParams
  /** 实际中心距偏差 Δa（mm），0 为标准中心距（理论零侧隙） */
  deltaA: number
}

export interface MeshReport {
  g1: GearGeom
  g2: GearGeom
  compatible: boolean           // m、α 相同才能啮合
  issues: string[]              // 不可啮合/需注意的问题
  aStandard: number             // 标准中心距 a0 = (d1+d2)/2
  a: number                     // 实际中心距
  alphaW: number                // 啮合角（工作压力角），Δa=0 时等于 α
  rw1: number                   // 工作节圆半径（沿中心连线）
  rw2: number
  center1: { x: number; y: number }
  center2: { x: number; y: number }
  ratio: number                 // ω1/ω2 = z2/z1（外啮合转向相反）
  // 啮合线（作用线）：过节点 P、与两节圆公切线夹角 αw 的公法线
  lineOfAction: { p: { x: number; y: number }; u: { x: number; y: number } }
  pitchPoint: { x: number; y: number }
  tangent1: number // 啮合线与轮1基圆切点参数 ξ（正值端）
  tangent2: number // 啮合线与轮2基圆切点参数 ξ（负值端）
  xiTip1: number   // 轮1齿顶圆与啮合线的相关交点（有效段下界侧）
  xiTip2: number   // 轮2齿顶圆与啮合线的相关交点（有效段上界侧）
  pathOfContactLength: number // 实际啮合线长度
  basePitch: number           // 基节 pb = π m cos α
  contactRatio: number        // 重合度 ε = 实际啮合线 / 基节
  // 相位：齿轮 k 的安装角 = phiK + signK·theta，theta 为轮1转角(rad，+CCW)
  phi1: number
  phi2: number
  // 根切提示
  undercut1: boolean
  undercut2: boolean
  // 过渡曲线干涉（齿顶尖角挤入对方基圆以内）
  filletInterference1: boolean // 轮2齿顶在轮1齿根过渡区发生干涉
  filletInterference2: boolean
  filletMargin1: number
  filletMargin2: number
}

const D2R = Math.PI / 180

export function analyzeMesh(input: MeshInput): MeshReport {
  const g1 = geom(input.g1)
  const g2 = geom(input.g2)
  const issues: string[] = []

  const compatible =
    Math.abs(g1.p.m - g2.p.m) < 1e-9 &&
    Math.abs(g1.p.alphaDeg - g2.p.alphaDeg) < 1e-9 &&
    Math.abs(g1.p.haStar - g2.p.haStar) < 1e-9 &&
    Math.abs(g1.p.cStar - g2.p.cStar) < 1e-9
  if (!compatible) issues.push('两轮模数或压力角（齿制）不同，不能正确啮合。')

  const aStandard = g1.r + g2.r
  const a = aStandard + input.deltaA // 允许小于标准值（过盈），用于让 Clipper 检出顶死
  if (input.deltaA < -1e-9) issues.push('中心距小于标准中心距，标准零侧隙齿轮无法装入（顶死，应出现实体重叠）。')

  // 无侧隙啮合方程对标准齿轮（x1=x2=0）：inv αw = inv α；
  // 中心距拉开时 cos αw = a0 cosα / a（产生侧隙）；过盈时 cosαw > 1 无实数解，
  // 退回 αw=α 以便几何仍可生成、由布尔交报告干涉。
  const cosAlphaW = (aStandard * Math.cos(g1.alpha)) / a
  const alphaW = Math.acos(Math.min(1, Math.max(-1, cosAlphaW)))
  const rw1 = g1.rb / Math.cos(alphaW)
  const rw2 = g2.rb / Math.cos(alphaW)

  const center1 = { x: 0, y: 0 }
  const center2 = { x: a, y: 0 }
  const pitchPoint = { x: rw1, y: 0 }

  // 啮合线方向 u：取 (−sin αw, +cos αw)。
  // 轮1 +CCW 推动轮2 −CCW 时，接触点 Q(ξ) = P + ξ u，ξ 增大 = 啮出方向。
  const u = { x: -Math.sin(alphaW), y: Math.cos(alphaW) }

  // 啮合线与两基圆切点。由 rb = rw cosαw，相切是二重根，直接取闭式值，
  // 避免浮点反算 acos 导致判别式微负：
  //  u=(−sinαw,+cosαw)，轮1切点 ξ = +rw1 sinαw；轮2切点 ξ = −rw2 sinαw。
  const t1 = rw1 * Math.sin(alphaW)
  const t2 = -rw2 * Math.sin(alphaW)

  // 实际啮合段的两个极限（齿顶圆截啮合线，每个圆在切点两侧各有一个交点）：
  //  随接触点 ξ 增大（轮1 +CCW 推动）：下界由轮1齿顶圆的小根给出，
  //  上界由轮2齿顶圆的大根给出。
  const sinW = Math.sin(alphaW)
  const discE1 = (2 * rw1 * sinW) ** 2 - 4 * (rw1 * rw1 - g1.ra * g1.ra)
  const e1 = discE1 >= 0 ? rw1 * sinW - 0.5 * Math.sqrt(Math.max(0, discE1)) : 0
  const discE2 = (2 * rw2 * sinW) ** 2 - 4 * (rw2 * rw2 - g2.ra * g2.ra)
  const e2 = discE2 >= 0 ? -rw2 * sinW + 0.5 * Math.sqrt(Math.max(0, discE2)) : 0

  // 有效接触区间 = 两轮渐开线存在域 ∩ 两轮齿顶域
  const xiA = Math.max(e1, t2) // 啮入点
  const xiE = Math.min(e2, t1) // 啮出点
  const pathLen = Math.max(0, xiE - xiA)
  const basePitch = Math.PI * g1.p.m * Math.cos(g1.alpha)
  const contactRatio = pathLen / basePitch

  // ---- 正确啮合的安装相位 ----
  // 关键：只让齿廓“点”经过节点并不够，接触点处两轮齿廓的公法线必须同属啮合线。
  // 轮1：标准肢（法线方向 +u）的 c=π 齿，节点处局部角 π−ψ1：
  //   φ1 + (π−ψ1) = 0(模2π)  =>  φ1 = −π+ψ1 ≡ π+ψ1
  // 轮2：节点必须落在其“法线同为 u”的那一肢上。镜像肢法线翻转不可用，
  //   应为 c=−π 齿的标准肢（局部角 −π−ψ2）：
  //   (−π−ψ2) + φ2 = −π  =>  φ2 = +ψ2
  // （若误取 φ2=−ψ2，齿廓虽穿过节点但法线错位 ~2α，会产生整片实体重叠。）
  // 轮1 转角 θ(+CCW)：angle1 = φ1 + θ；外啮合 angle2 = φ2 − (z1/z2)θ
  const psi1 = halfAngleAt(g1, rw1)
  const psi2 = halfAngleAt(g2, rw2)
  const phi1 = Math.PI + psi1
  const phi2 = psi2

  // ---- 过渡曲线干涉 ----
  // 接触点越过某轮基圆切点进入其基圆以内侧时，该侧无渐开线，为齿根过渡区。
  //  下界 ξ_A 低于轮2切点 t2，或上界 ξ_E 高于轮1切点 t1 即越界。
  const filletMargin1 = t1 - xiE // 轮1侧安全裕量（>= 0 安全）
  const filletMargin2 = xiA - t2 // 轮2侧安全裕量（>= 0 安全）
  const fi1 = filletMargin1 < -1e-6
  const fi2 = filletMargin2 < -1e-6

  if (g1.undercut) issues.push(`小轮 z1=${g1.p.z} 少于无根切最少齿数 zmin=${g1.zMin.toFixed(2)}（α=${g1.p.alphaDeg}°, ha*=${g1.p.haStar}）：标准刀具加工会根切，齿根渐开线被切去一部分。`)
  if (g2.undercut) issues.push(`大轮 z2=${g2.p.z} 少于无根切最少齿数 zmin=${g2.zMin.toFixed(2)}，会根切。`)
  if (fi1) issues.push('存在过渡曲线干涉风险：大轮齿顶进入小轮齿根非渐开线区（需修齿顶/变位）。')
  if (fi2) issues.push('存在过渡曲线干涉风险：小轮齿顶进入大轮齿根非渐开线区。')
  if (compatible && contactRatio < 1) issues.push(`重合度 ε=${contactRatio.toFixed(3)} < 1，传动不连续。`)
  if (input.deltaA > 1e-9) issues.push(`中心距拉开 Δa=${input.deltaA} mm：产生齿侧间隙，啮合角变为 ${((alphaW / D2R).toFixed(3))}°，单向传动时仅一侧齿面接触。`)

  return {
    g1, g2, compatible, issues,
    aStandard, a, alphaW, rw1, rw2,
    center1, center2,
    ratio: g2.p.z / g1.p.z,
    lineOfAction: { p: pitchPoint, u },
    pitchPoint,
    tangent1: t1, tangent2: t2, xiTip1: e1, xiTip2: e2,
    pathOfContactLength: pathLen,
    basePitch,
    contactRatio,
    phi1, phi2,
    undercut1: g1.undercut, undercut2: g2.undercut,
    filletInterference1: fi1, filletInterference2: fi2,
    filletMargin1, filletMargin2,
  }
}

/** 给定轮1转角 θ（rad，+CCW），返回两轮安装后绝对转角 */
export function meshAngles(rep: MeshReport, theta: number) {
  return {
    a1: rep.phi1 + theta,
    a2: rep.phi2 - (rep.g1.p.z / rep.g2.p.z) * theta,
  }
}

/**
 * 当前 θ 下的理论接触点集合（可能 1 对或 2 对齿同时接触）。
 * 返回每个接触点的世界坐标及所属齿对（轮1齿号 i1，轮2齿号 i2）。
 *
 * 对第 j 对同时啮合齿：ξ(θ,j) = rb1·θ + (j − offset)·pb，
 * 落在 [ξ_A, ξ_E] 内即为接触点。
 */
export function contactPointsAt(rep: MeshReport, theta: number): {
  x: number; y: number; xi: number; pairIndex: number
}[] {
  const { g1, lineOfAction } = rep
  const xiA = Math.max(rep.xiTip1, rep.tangent2)
  const xiE = Math.min(rep.xiTip2, rep.tangent1)
  const pb = rep.basePitch
  const out: { x: number; y: number; xi: number; pairIndex: number }[] = []
  // 基准齿对在 θ=0 接触于节点 ξ=0；轮1 +CCW 时接触点沿 +u 上行：xi = rb1 θ + n pb
  const center = g1.rb * theta
  const n0 = Math.round(-center / pb)
  for (let n = n0 - 2; n <= n0 + 2; n++) {
    const xi = center + n * pb
    if (xi >= xiA - 1e-7 && xi <= xiE + 1e-7) {
      out.push({
        x: lineOfAction.p.x + xi * lineOfAction.u.x,
        y: lineOfAction.p.y + xi * lineOfAction.u.y,
        xi,
        pairIndex: n,
      })
    }
  }
  return out
}

/** 工作节圆上的压力角校验辅助：给定半径反求渐开线对应转角（调试用） */
export function checkAlphaAt(g: GearGeom, rho: number): number {
  return pressureAngleAt(g, rho)
}

export { inv, invInverse }
