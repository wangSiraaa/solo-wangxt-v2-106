import { buildGear, DEG, transformOutline } from '../src/geometry/gear.ts'
import { analyzeMesh, gearAnglesAt, contactPoint } from '../src/geometry/mesh.ts'

let fails = 0
const fail = (m: string) => {
  fails++
  console.log('  FAIL', m)
}

/**
 * 点到（旋转后）渐开线齿面的解析距离：
 * 在齿轮 i 本体坐标系内把点转回局部，对每齿两侧渐开线参数 t 做一维搜索最近距离。
 */
function analyticFlankDist(
  g: ReturnType<typeof buildGear>,
  world: { x: number; y: number },
  cx: number,
  phi: number
) {
  // 转到齿轮局部坐标（齿轮中心 (cx,0)，本体转角 phi）
  const c = Math.cos(-phi),
    s = Math.sin(-phi)
  const lx0 = world.x - cx,
    ly0 = world.y
  const lx = lx0 * c - ly0 * s
  const ly = lx0 * s + ly0 * c

  let best = Infinity
  const rb = g.baseR,
    beta = g.beta
  const tLo = g.baseAboveRoot ? 0 : Math.sqrt(Math.max(0, (g.dedendumR / rb) ** 2 - 1))
  const tHi = g.taTip
  const N = 200
  for (const sgn of [1, -1] as const) {
    let bestT = tLo
    let bestLocal = Infinity
    for (let i = 0; i < N; i++) {
      const t = tLo + ((tHi - tLo) * (i + 0.5)) / N
      const qx0 = rb * (Math.sin(t) - t * Math.cos(t))
      const qy0 = rb * (Math.cos(t) + t * Math.sin(t))
      const rx = qx0 * Math.cos(beta) - qy0 * Math.sin(beta)
      const ry = qx0 * Math.sin(beta) + qy0 * Math.cos(beta)
      const px = sgn === 1 ? -rx : rx
      const py = ry
      for (let k = 0; k < g.input.z; k++) {
        const a = (2 * Math.PI * k) / g.input.z
        const ex = px * Math.cos(a) - py * Math.sin(a)
        const ey = px * Math.sin(a) + py * Math.cos(a)
        const dd = Math.hypot(lx - ex, ly - ey)
        if (dd < bestLocal) {
          bestLocal = dd
          bestT = t
        }
      }
    }
    // 在 bestT 附近细化
    const span = (tHi - tLo) / N
    for (let j = -20; j <= 20; j++) {
      const t = bestT + (j * span) / 20
      if (t < tLo || t > tHi) continue
      const qx0 = rb * (Math.sin(t) - t * Math.cos(t))
      const qy0 = rb * (Math.cos(t) + t * Math.sin(t))
      const rx = qx0 * Math.cos(beta) - qy0 * Math.sin(beta)
      const ry = qx0 * Math.sin(beta) + qy0 * Math.cos(beta)
      const px = sgn === 1 ? -rx : rx
      const py = ry
      for (let k = 0; k < g.input.z; k++) {
        const a = (2 * Math.PI * k) / g.input.z
        const ex = px * Math.cos(a) - py * Math.sin(a)
        const ey = px * Math.sin(a) + py * Math.cos(a)
        bestLocal = Math.min(bestLocal, Math.hypot(lx - ex, ly - ey))
      }
    }
    best = Math.min(best, bestLocal)
  }
  return best
}

function testPair(z1: number, z2: number, m: number, da = 0) {
  console.log(`\n=== ${z1}/${z2} m=${m} Δa=${da} ===`)
  const g1 = buildGear({ z: z1, module: m, alpha: 20 * DEG, faceWidth: 8 })
  const g2 = buildGear({ z: z2, module: m, alpha: 20 * DEG, faceWidth: 8 })
  const a0 = g1.pitchR + g2.pitchR
  const mesh = analyzeMesh({ g1, g2, centerDistance: a0 + da })
  console.log(
    `  α'=${(mesh.alphaPrime / DEG).toFixed(3)}° ε=${mesh.contactRatio.toFixed(3)} jt=${mesh.backlashTangential.toFixed(3)} c=${mesh.clearance12.toFixed(3)}`
  )

  const ap = mesh.alphaPrime
  const nx = Math.sin(ap),
    ny = Math.cos(ap)
  const sEnter =
    (mesh.actionLine.p0.x - mesh.pitchPoint.x) * nx +
    (mesh.actionLine.p0.y - mesh.pitchPoint.y) * ny
  const sExit =
    (mesh.actionLine.p1.x - mesh.pitchPoint.x) * nx +
    (mesh.actionLine.p1.y - mesh.pitchPoint.y) * ny

  let maxErr = 0
  let phi1u = 0,
    phi2u = 0
  let prevPhi1: number | null = null,
    prevPhi2: number | null = null
  let prevRaw1 = 0,
    prevRaw2 = 0
  const samples = 21
  for (let i = 0; i <= samples; i++) {
    const s = sEnter + ((sExit - sEnter) * i) / samples
    const { phi1, phi2 } = gearAnglesAt(mesh, g1, g2, s)
    const c = contactPoint(mesh, s)
    const d1 = analyticFlankDist(g1, c, 0, phi1)
    const d2 = analyticFlankDist(g2, c, mesh.a, phi2)
    maxErr = Math.max(maxErr, d1, d2)
    if (i > 0) {
      let dP1 = phi1 - prevRaw1
      let dP2 = phi2 - prevRaw2
      while (dP1 > Math.PI) dP1 -= 2 * Math.PI
      while (dP1 < -Math.PI) dP1 += 2 * Math.PI
      while (dP2 > Math.PI) dP2 -= 2 * Math.PI
      while (dP2 < -Math.PI) dP2 += 2 * Math.PI
      phi1u += dP1
      phi2u += dP2
    }
    prevRaw1 = phi1
    prevRaw2 = phi2
    prevPhi1 = phi1
    prevPhi2 = phi2
  }
  void prevPhi1
  void prevPhi2
  console.log(`  接触点到解析渐开线最大距离: ${maxErr.toExponential(2)} mm`)
  if (maxErr > 6e-3) fail(`接触点不在两轮渐开线齿面上（${maxErr}）`)

  const ratioObs = phi2u / phi1u
  console.log(
    `  转角比 = ${ratioObs.toFixed(6)}（理论 ${(-z1 / z2).toFixed(6)}），转向 ${phi1u * phi2u < 0 ? '相反 ✅' : '相同 ❌'}`
  )
  if (Math.abs(ratioObs + z1 / z2) > 1e-6) fail('传动比不符')
  if (Math.abs(g1.baseR * phi1u + g2.baseR * phi2u) > 1e-6) fail('rb1Δφ1 ≠ −rb2Δφ2')

  // 轮廓变换健全性（确保 transformOutline 可用）
  const o2 = transformOutline(g2.outline, mesh.a, 0, 0)
  if (o2.some((p) => !isFinite(p.x))) fail('轮廓变换异常')
}

testPair(20, 40, 2)
testPair(17, 17, 2)
testPair(25, 30, 2.5)
testPair(12, 40, 2)
testPair(20, 40, 2, 0.5)

console.log(fails ? `\n${fails} 项失败 ❌` : '\n全部通过 ✅')
process.exit(fails ? 1 : 0)
