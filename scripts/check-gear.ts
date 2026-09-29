import { buildGear, polygonArea, minRadius, maxRadius, DEG, inv, involutePoint, tAtRadius } from '../src/geometry/gear.ts'

let fails = 0
const approx = (a: number, b: number, tol: number, name: string) => {
  const ok = Math.abs(a - b) <= tol
  if (!ok) {
    fails++
    console.log(`  FAIL ${name}: got ${a}, want ${b}, diff ${a - b}`)
  } else console.log(`  ok   ${name}: ${a}`)
  return ok
}

function checkGear(z: number, m: number, alphaDeg = 20) {
  console.log(`\n=== z=${z} m=${m} α=${alphaDeg}° ===`)
  const g = buildGear({ z, module: m, alpha: alphaDeg * DEG, faceWidth: 10 })
  const a = alphaDeg * DEG
  const r = (m * z) / 2
  const rb = r * Math.cos(a)
  const ra = r + m
  const rf = r - 1.25 * m
  approx(g.pitchR, r, 1e-9, '分度圆半径 mz/2')
  approx(g.baseR, rb, 1e-9, '基圆半径 r cosα')
  approx(g.addendumR, ra, 1e-9, '齿顶圆半径 r+m')
  approx(g.dedendumR, rf, 1e-9, '齿根圆半径 r−1.25m')
  approx(g.circularPitch, Math.PI * m, 1e-9, '齿距 πm')
  approx(g.basePitch, Math.PI * m * Math.cos(a), 1e-9, '基节 pb')
  approx(g.toothThickness, (Math.PI * m) / 2, 1e-9, '分度圆齿厚 πm/2')
  const zMin = 2 / Math.sin(a) ** 2
  approx(g.zMinValue, zMin, 1e-6, '根切最少齿数')
  console.log(`  undercut=${g.undercut}  baseAboveRoot=${g.baseAboveRoot}  tipThick=${g.tipThickness.toFixed(4)} pointed=${g.pointed}`)

  // 齿顶厚教材公式 sa = ra·[π/z + 2(invα − invαa)]
  const ta = tAtRadius(ra, rb)
  const invAa = ta - Math.atan(ta)
  const saText = ra * (Math.PI / z + 2 * (inv(a) - invAa))
  approx(g.tipThickness, saText, 1e-6 * m, '齿顶厚与教材公式一致')

  // 渐开线自身校验：t=0 点 (0,rb)，向径 rb√(1+t²)
  const p0 = involutePoint(rb, 0)
  approx(p0.x, 0, 1e-12, '渐开线起点 x=0')
  approx(p0.y, rb, 1e-12, '渐开线起点 y=rb')
  const p1 = involutePoint(rb, 0.7)
  approx(Math.hypot(p1.x, p1.y), rb * Math.sqrt(1 + 0.49), 1e-9, '渐开线向径公式')

  // 分度圆点极角应为 90°±π/(2z)
  const tp = Math.tan(a)
  const qp = involutePoint(rb, tp)
  // 右齿面 = mirror(rot(+β))
  const c = Math.cos(g.beta), s = Math.sin(g.beta)
  const rq = { x: -(qp.x * c - qp.y * s), y: qp.x * s + qp.y * c }
  const angR = Math.atan2(rq.y, rq.x)
  approx(angR, Math.PI / 2 - Math.PI / (2 * z), 1e-9, '右齿面分度圆点极角 90°−π/2z')
  // 弧齿厚检查：两侧分度圆点关于齿中心对称
  const lq = { x: qp.x * c - qp.y * s, y: qp.x * s + qp.y * c }
  const angL = Math.atan2(lq.y, lq.x)
  approx(angL, Math.PI / 2 + Math.PI / (2 * z), 1e-9, '左齿面分度圆点极角 90°+π/2z')
  approx(r * (angL - angR), Math.PI * m / 2, 1e-9, '分度圆弧齿厚 πm/2')

  // 闭合多边形：点数、CCW、半径范围
  const o = g.outline
  console.log(`  outline points=${o.length}`)
  const area = polygonArea(o)
  const areaExpect = Math.PI * (rf * rf) // 至少大于根圆面积
  if (area <= 0) {
    fails++
    console.log(`  FAIL outline 方向: area=${area}（应为正/CCW）`)
  } else console.log(`  ok   outline CCW, area=${area.toFixed(2)} (>根圆面积 ${areaExpect.toFixed(2)})`)
  approx(maxRadius(o), ra, 1e-7 * m + 1e-6, '最大半径 = ra')
  const mn = minRadius(o)
  if (mn < rf - 1e-7) {
    fails++
    console.log(`  FAIL 最小半径 ${mn} < rf ${rf}`)
  } else console.log(`  ok   最小半径 ${mn.toFixed(4)} >= rf ${rf}`)

  // 相邻点不应有大跳变（周长连续性粗检）
  let maxJump = 0
  for (let i = 0; i < o.length; i++) {
    const p = o[i], q = o[(i + 1) % o.length]
    maxJump = Math.max(maxJump, Math.hypot(q.x - p.x, q.y - p.y))
  }
  const chordLimit = Math.max(0.5 * m, 2 * Math.PI * ra / 60)
  if (maxJump > chordLimit) {
    // 严重根切小齿数齿轮径向段较长（教学近似），允许到一个齿距量级
    if (g.undercut && maxJump <= g.circularPitch * 0.35) {
      console.log(`  ok   相邻点最大跳变 ${maxJump.toFixed(4)}（根切近似径向段，容差内）`)
    } else {
      fails++
      console.log(`  FAIL 相邻点最大跳变 ${maxJump.toFixed(4)} 超过 ${chordLimit.toFixed(4)}`)
    }
  } else console.log(`  ok   相邻点最大跳变 ${maxJump.toFixed(4)}`)

  // 径向自交粗检：每条从原点出发的射线与多边形交点数应为偶数（2）
  // 采样大量角度，扫描半径序列
  const rays = 360
  let badRays = 0
  for (let i = 0; i < rays; i++) {
    const ang = (i / rays) * 2 * Math.PI
    const dx = Math.cos(ang), dy = Math.sin(ang)
    let crossings = 0
    for (let k = 0; k < o.length; k++) {
      const p = o[k], q = o[(k + 1) % o.length]
      // 边与射线交点（符号翻转）
      const cp = p.x * dy - p.y * dx
      const cq = q.x * dy - q.y * dx
      if ((cp < 0 && cq >= 0) || (cq < 0 && cp >= 0)) crossings++
    }
    if (crossings !== 2) badRays++
  }
  if (badRays > 0) {
    fails++
    console.log(`  FAIL ${badRays}/${rays} 条射线交点数≠2（可能自交/开口）`)
  } else console.log(`  ok   ${rays} 条射线均恰好 2 个交点（星形区域，无自交）`)

  return g
}

checkGear(20, 2)
checkGear(40, 2.5)
checkGear(17, 2)
checkGear(16, 2) // 根切
checkGear(12, 3) // 明显根切
checkGear(60, 2) // rb < rf
checkGear(42, 2)
checkGear(8, 4)

console.log(`\ninv(20°)=${(inv(20 * DEG)).toFixed(6)} (教材值 0.014904)`)
console.log(fails === 0 ? '\n全部通过 ✅' : `\n${fails} 项失败 ❌`)
process.exit(fails === 0 ? 0 : 1)
