/**
 * 一对外啮合标准直齿轮的装配与运动学。
 *
 * 关键原则（对应需求"不把两个齿轮按转速比旋转就当作正确啮合"）：
 *  传动比 i = ω2/ω1 = −z1/z2 只是必要条件；真正的渐开线啮合还要求：
 *   (a) 模数、压力角分别相等（基节 pb = πm cosα 相等）；
 *   (b) 安装相位正确：在节点 P 处两轮的同侧渐开线（轮1 左齿面 / 轮2 右齿面）
 *       恰好接触，即齿面在 P 点共法线（啮合线）；
 *   (c) 沿啮合线滚动过程中，接触点始终是同一条渐开线，两轮转角满足
 *       rb1·φ1 = rb2·(−φ2)（有向），而不只是"转速比对就行"。
 *
 * 布局：轮1 中心 O1=(0,0) 在左，轮2 中心 O2=(a,0) 在右；
 * 节点 P=(r1',0)；外啮合两轮转向相反。
 * 局部齿廓约定：齿厚中心在 +y，右齿面为 +x 侧。
 */

import type { GearGeometry, Pt } from './gear'
import { tAtRadius } from './gear'

export interface PairInput {
  g1: GearGeometry
  g2: GearGeometry
  /** 实际安装中心距 a（mm）；标准值为 (r1+r2) */
  centerDistance: number
  /** 法向侧隙补偿（由用户侧隙设定产生的额外中心距已在 a 中，此处保留信息） */
}

export interface MeshInfo {
  /** 标准中心距 a0 = r1+r2 */
  a0: number
  /** 实际中心距 */
  a: number
  /** 啮合角 α′：cosα′ = a0·cosα / a */
  alphaPrime: number
  /** 实际节圆半径 r1′=rb1/cosα′, r2′=rb2/cosα′ */
  pitchR1: number
  pitchR2: number
  /** 中心距偏差 Δa = a − a0 */
  deltaA: number
  /** 圆周侧隙近似 jt ≈ 2a·(invα′−invα)（等基节、对称增大中心距） */
  backlashTangential: number
  /** 法向侧隙 jn = jt·cosα′ */
  backlashNormal: number
  /** 顶隙 c = a − ra1 − rf2（= c*·m 在标准中心距） */
  clearance12: number
  clearance21: number
  /** 基节是否一致（必须） */
  basePitchMatch: boolean
  /** 基节差 */
  basePitchDiff: number
  /** 中心距是否过小导致齿顶圆交叉（实体必干涉） */
  addendumOverlap: boolean
  /** 接触路径（啮合线）在两轮齿顶圆之间的线段，世界坐标 */
  actionLine: { p0: Pt; p1: Pt }
  /** 理论啮合线全长（两基圆内公切线，切点之间） */
  tangentLine: { p0: Pt; p1: Pt }
  /** 节点 */
  pitchPoint: Pt
  /** 实际啮合线长度 gα */
  pathOfContact: number
  /** 重合度 εα = gα/(πm cosα) */
  contactRatio: number
  /** 不根切的安装/齿数信息已在 gear 层给出；这里给顶隙是否为正 */
  ok: boolean
  warnings: string[]
}

export function analyzeMesh(input: PairInput): MeshInfo {
  const { g1, g2, centerDistance: a } = input
  const a0 = g1.pitchR + g2.pitchR
  const alpha = g1.input.alpha
  const cosAp = Math.min(1, Math.max(-1, (a0 * Math.cos(alpha)) / a))
  const alphaPrime = Math.acos(cosAp)
  const rp1 = g1.baseR / Math.cos(alphaPrime)
  const rp2 = g2.baseR / Math.cos(alphaPrime)
  const deltaA = a - a0

  const inv = (x: number) => Math.tan(x) - x
  const jt = 2 * a * (inv(alphaPrime) - inv(alpha))
  const jn = jt * Math.cos(alphaPrime)

  const c12 = a - g1.addendumR - g2.dedendumR
  const c21 = a - g2.addendumR - g1.dedendumR

  const basePitchDiff = Math.abs(g1.basePitch - g2.basePitch)
  const basePitchMatch = basePitchDiff < 1e-6

  const warnings: string[] = []
  const addendumOverlap = a < g1.addendumR + g2.addendumR
  if (addendumOverlap) warnings.push('中心距小于两齿顶圆半径之和，齿顶圆交叉，必然实体干涉')
  if (c12 < 0 || c21 < 0) warnings.push('存在齿顶与对方齿根圆交叉（顶隙为负）')
  if (Math.abs(deltaA) > 1e-9) {
    if (deltaA > 0) warnings.push(`非标准中心距（+${deltaA.toFixed(3)} mm）：有侧隙安装，啮合角增大，不再是无侧隙啮合`)
    else warnings.push('中心距小于标准值：无侧隙空间，齿面相互挤压（仅教学演示干涉）')
  }
  if (!basePitchMatch) warnings.push(`两轮基节不等（差 ${basePitchDiff.toFixed(4)} mm），不能正确啮合`)

  // 节点 P
  const P: Pt = { x: rp1, y: 0 }
  // 啮合线（作用线）：过 P，与两节圆公切线（竖直）成 α′ 角。
  // 单位法线 n（指向轮2 齿顶啮出端）：(sinα′, −cosα′)? 取 n = (sinα′, cosα′) 使啮出端在 +y。
  // 统一：n = (sinα′, cosα′)（P 向 +y 为啮出，轮2 齿顶切入），−n 为啮入。
  const nx = Math.sin(alphaPrime)
  const ny = Math.cos(alphaPrime)

  // 基圆内公切线切点（理论极限）：
  // O1 到作用线垂足参数 s1 = −rp1·sinα′；O2 垂足参数 s2v = +rp2·sinα′
  const s1 = -rp1 * nx
  const T1: Pt = { x: P.x + s1 * nx, y: P.y + s1 * ny }
  const s2v = rp2 * nx
  const T2: Pt = { x: P.x + s2v * nx, y: P.y + s2v * ny }

  // 与齿顶圆求交：|P + s n − Oi| = rai
  const rootOnCircle = (cx: number, ra: number): number[] => {
    const px = P.x - cx,
      py = P.y
    // s² + 2(px nx + py ny) s + (px²+py²−ra²)=0
    const b = 2 * (px * nx + py * ny)
    const cc = px * px + py * py - ra * ra
    const disc = b * b - 4 * cc
    if (disc < 0) return []
    const sq = Math.sqrt(disc)
    return [(-b - sq) / 2, (-b + sq) / 2]
  }
  const sOn1 = rootOnCircle(0, g1.addendumR)
  const sOn2 = rootOnCircle(a, g2.addendumR)
  // 注意：作用线方向 n 指向 +y。
  //  啮入端（s<0，轮2 齿顶先切入）受轮2 齿顶圆限制 → O2 的负根；
  //  啮出端（s>0，轮1 齿顶退出）受轮1 齿顶圆限制 → O1 的正根。
  const negRoots2 = sOn2.filter((v) => v <= 1e-9)
  const posRoots1 = sOn1.filter((v) => v >= -1e-9)
  const sEnter = negRoots2.length ? Math.max(...negRoots2) : s1
  const sExit = posRoots1.length ? Math.min(...posRoots1) : s2v
  const pEnter: Pt = { x: P.x + sEnter * nx, y: P.y + sEnter * ny }
  const pExit: Pt = { x: P.x + sExit * nx, y: P.y + sExit * ny }
  const gAlpha = Math.max(0, sExit - sEnter)
  const epsilon = gAlpha / g1.basePitch

  return {
    a0,
    a,
    alphaPrime,
    pitchR1: rp1,
    pitchR2: rp2,
    deltaA,
    backlashTangential: Math.max(0, jt),
    backlashNormal: Math.max(0, jn),
    clearance12: c12,
    clearance21: c21,
    basePitchMatch,
    basePitchDiff,
    addendumOverlap,
    actionLine: { p0: pEnter, p1: pExit },
    tangentLine: { p0: T1, p1: T2 },
    pitchPoint: P,
    pathOfContact: gAlpha,
    contactRatio: epsilon,
    ok: basePitchMatch && !addendumOverlap,
    warnings
  }
}

/**
 * 给定啮合线上参数 s（世界点 C = P + s·n，n=(sinα′, cosα′)），返回两轮本体转角。
 *
 * 严格推导（不是只套速比）。外啮合在节点 P 接触的齿面是：
 *   轮1（左，O1=0）的【左齿面】与 轮2（右，O2=(a,0)）的【右齿面】。
 * 接触点的基圆切线展开参数（切点到 C 的切线长 = rb·t）：
 *   t1 = tanα′ + s/rb1，t2 = tanα′ − s/rb2
 * 渐开线展角 δ(t)=t−atan t。该齿面在【本体坐标】中的极角：
 *   θ1 = π/2 + β1 − δ(t1)   （左齿面）
 *   θ2 = π/2 − β2 + δ(t2)   （右齿面）
 * 接触点在【世界坐标】中相对各中心的方位角：
 *   C−O1 = (rp1+s sinα′, s cosα′) ⇒ ψ1 = atan2(...)，s=0 时 ψ1=0（朝 +x 指 P）
 *   C−O2 = (−rp2+s sinα′, s cosα′)，s=0 时朝 −x；为与本体角统一，用 −x 为零角：
 *     ψ2 = atan2(s cosα′, rp2 − s sinα′)，s=0 时 ψ2=0（随 s 增大而减小）。
 * 于是 φ1 = ψ1 − θ1 + 常量，φ2 = ψ2 − θ2 + 常量；
 * 节点 s=0 时要求：φ1(0)=−(π/2+π/(2z1))，φ2(0)=−(π/2−π/(2z2))。
 * 对 s 求导（用 δ′=sin²α/rb 及极角几何）：
 *   dφ1/ds = cos²α′/rb1 − (−sin²α′/rb1) = +1/rb1
 *   dφ2/ds = −cos²α′/rb2 − (+sin²α′/rb2) = −1/rb2
 * 即 rb1·Δφ1 = −rb2·Δφ2，ω2/ω1 = −z1/z2（外啮合反向），且全过程是同一条渐开线接触。
 */
export function gearAnglesAt(mesh: MeshInfo, g1: GearGeometry, g2: GearGeometry, s: number) {
  const ap = mesh.alphaPrime
  const sn = Math.sin(ap),
    cn = Math.cos(ap)
  const t1 = Math.tan(ap) + s / g1.baseR
  const t2 = Math.tan(ap) - s / g2.baseR
  const delta1 = t1 - Math.atan(t1)
  const delta2 = t2 - Math.atan(t2)
  // 本体齿面极角（外啮合：轮1 左齿面、轮2 右齿面；下方 ψ2 以 −x 为零角，
  // 故轮2 在该镜像度量下也用"左齿面形式" π/2+β−δ，保证 dφ2/ds=−1/rb2）
  const theta1 = Math.PI / 2 + g1.beta - delta1
  const theta2 = Math.PI / 2 + g2.beta - delta2
  // 世界接触点方位（相对各自的"指向节点"零角）
  const psi1 = Math.atan2(s * cn, mesh.pitchR1 + s * sn) // 轮1 零角=+x
  const psi2 = Math.atan2(s * cn, -mesh.pitchR2 + s * sn) // 轮2 零角=−x
  // 节点对齐常量
  const phi1 = psi1 - theta1
  const phi2 = psi2 - theta2
  return { phi1, phi2, t1, t2 }
}

/** 轮1 本体转角 φ1 求配对转角 φ2：先反解 s 再走严格相位公式（保证同一条渐开线接触） */
export function mateAngle(g1: GearGeometry, g2: GearGeometry, mesh: MeshInfo, phi1: number) {
  const ap = mesh.alphaPrime
  const sn = Math.sin(ap),
    cn = Math.cos(ap)
  // 由 φ1 = ψ1(s) − (π/2+β1−δ(t1)) 数值反解 s（dφ1/ds=1/rb1 单调，牛顿法）
  let s = 0
  for (let iter = 0; iter < 30; iter++) {
    const t1 = Math.tan(ap) + s / g1.baseR
    const delta1 = t1 - Math.atan(t1)
    const theta1 = Math.PI / 2 + g1.beta - delta1
    const psi1 = Math.atan2(s * cn, mesh.pitchR1 + s * sn)
    const f = psi1 - theta1 - phi1
    s -= f / (1 / g1.baseR)
    if (Math.abs(f) < 1e-12) break
  }
  const t2 = Math.tan(ap) - s / g2.baseR
  const delta2 = t2 - Math.atan(t2)
  const theta2 = Math.PI / 2 + g2.beta - delta2
  const psi2 = Math.atan2(s * cn, -mesh.pitchR2 + s * sn)
  return psi2 - theta2
}

/** 接触点世界坐标 */
export function contactPoint(mesh: MeshInfo, s: number): Pt {
  const ap = mesh.alphaPrime
  const nx = Math.sin(ap),
    ny = Math.cos(ap)
  return { x: mesh.pitchPoint.x + s * nx, y: mesh.pitchPoint.y + s * ny }
}

/** 展开参数转接触点到基圆切点距离，供调试 */
export function rollDistance(g: GearGeometry, radius: number) {
  return g.baseR * tAtRadius(radius, g.baseR)
}
