/* eslint-disable no-console */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { geom, gearProfile, polygonArea, pressureAngleAt, halfAngleAt, inv } from '../src/geometry/spur'
import { analyzeMesh, contactPointsAt, meshAngles } from '../src/geometry/mesh'
import { checkAt, distanceToRing, placeGears } from '../src/geometry/contactCheck'
import { clipperReady, primeClipperWasm } from '../src/clipper/intersection'
import { buildProfileFile, buildCaseFile } from '../src/io/exporter'
import { isProfileFile, isCaseFile } from '../src/io/caseFormat'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
let failures = 0
function check(name: string, cond: boolean, detail = '') {
  if (cond) console.log(`  PASS  ${name}${detail ? ' — ' + detail : ''}`)
  else {
    failures++
    console.error(`  FAIL  ${name}${detail ? ' — ' + detail : ''}`)
  }
}
function approx(a: number, b: number, tol = 1e-9) {
  return Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b))
}

console.log('A. 解析尺寸（m=2, α=20°, ha*=1, c*=0.25）')
{
  const g20 = geom({ z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 })
  check('z=20: r = mz/2 = 20', approx(g20.r, 20), g20.r.toFixed(6))
  check('z=20: rb = r cos20°', approx(g20.rb, 20 * Math.cos(20 * Math.PI / 180)), g20.rb.toFixed(6))
  check('z=20: ra = r+m = 22', approx(g20.ra, 22), g20.ra.toFixed(6))
  check('z=20: rf = r−1.25m = 17.5', approx(g20.rf, 17.5), g20.rf.toFixed(6))
  check('z=20: p = πm = 2π', approx(g20.pCircular, 2 * Math.PI), g20.pCircular.toFixed(6))
  check('z=20: s = πm/2 = π', approx(g20.s, Math.PI), g20.s.toFixed(6))

  const zmin = 2 / Math.sin((20 * Math.PI) / 180) ** 2
  check('zmin = 17.097（20°,ha*=1，严格值；工程上取 17）', approx(zmin, 17.097, 2e-3), zmin.toFixed(3))
  check('z=18 不根切', geom({ z: 18, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 }).undercut === false)
  check('z=17 严格说轻微根切（17 < 17.097；工程近似取 17）',
    geom({ z: 17, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 }).undercut === true)
  check('z=16 根切', geom({ z: 16, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 }).undercut === true)
  check('z=13 根切', geom({ z: 13, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 }).undercut === true)
  check('α=14.5° 时 zmin≈31.90（旧齿制）',
    approx(geom({ z: 33, m: 2, alphaDeg: 14.5, haStar: 1, cStar: 0.25 }).zMin, 31.90, 2e-3))

  const g30 = geom({ z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 })
  check('z=30: r=30, ra=32, rf=27.5',
    approx(g30.r, 30) && approx(g30.ra, 32) && approx(g30.rf, 27.5))
}

console.log('A2. 中心距 / 啮合角 / 重合度')
{
  const input = {
    g1: { z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    g2: { z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    deltaA: 0,
  }
  const rep = analyzeMesh(input)
  check('标准中心距 a0 = r1+r2 = 50', approx(rep.aStandard, 50), rep.aStandard.toFixed(4))
  check('Δa=0 时啮合角 αw = 20°', approx(rep.alphaW, 20 * Math.PI / 180, 1e-12))
  check('节圆 = 分度圆 rw1=20 rw2=30', approx(rep.rw1, 20) && approx(rep.rw2, 30))
  check('传动比 ω1/ω2 = z2/z1 = 1.5', approx(rep.ratio, 1.5))
  // 解析重合度：20/30 m=2 α=20 标准值约 1.605（齿数/模数无关时同）
  check('重合度 ε ≈ 1.605（手册值）', approx(rep.contactRatio, 1.605, 8e-3), rep.contactRatio.toFixed(4))
  check('实际啮合线长度 = ε·pb',
    approx(rep.pathOfContactLength, rep.contactRatio * rep.basePitch, 1e-10))
  check('基节 pb = πm cosα', approx(rep.basePitch, 2 * Math.PI * Math.cos(20 * Math.PI / 180), 1e-12))

  // 拉开中心距
  const repGap = analyzeMesh({ ...input, deltaA: 1 })
  const alphaW = Math.acos((50 * Math.cos(20 * Math.PI / 180)) / 51)
  check('Δa=1: αw 由 a0cosα/a 计算', approx(repGap.alphaW, alphaW, 1e-12))
  check('Δa=1: 实际中心距 = 51', approx(repGap.a, 51))
  check('Δa<0 被拒绝安装',
    analyzeMesh({ ...input, deltaA: -0.5 }).issues.some((s) => s.includes('小于标准中心距')))
  check('模数不兼容',
    analyzeMesh({ ...input, g2: { ...input.g2, m: 3 } }).compatible === false)
}

console.log('B. 齿形闭合')
for (const z of [13, 17, 20, 30, 40]) {
  const g = geom({ z, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 })
  const ring = gearProfile(g, { involuteSegments: 40 })
  const first = ring[0]
  const last = ring[ring.length - 1]
  const closed = approx(first.x, last.x, 1e-9) && approx(first.y, last.y, 1e-9)
  const area = polygonArea(ring)
  // 实体齿轮面积介于“齿根圆盘”与“齿顶圆盘”之间，且更接近齿根圆盘加齿顶环带
  const diskRoot = Math.PI * g.rf ** 2
  const diskTip = Math.PI * g.ra ** 2
  let rMin = Infinity
  let rMax = 0
  for (const p of ring) {
    const r = Math.hypot(p.x, p.y)
    rMin = Math.min(rMin, r)
    rMax = Math.max(rMax, r)
  }
  check(`z=${z}: 首尾闭合`, closed)
  check(`z=${z}: 逆时针(面积正) 且面积在齿根圆盘与齿顶圆盘之间`,
    area > 0 && area > diskRoot && area < diskTip,
    `area=${area.toFixed(2)} ∈ (${diskRoot.toFixed(1)}, ${diskTip.toFixed(1)})`)
  check(`z=${z}: 径向范围 [rf,ra]（容差 2e-3）`,
    rMin >= g.rf - 2e-3 && rMax <= g.ra + 2e-3,
    `[${rMin.toFixed(3)}, ${rMax.toFixed(3)}] vs [${g.rf}, ${g.ra}]`)
  check(`z=${z}: 旋转对称性（转过 2π/z 后点集重合）`, (() => {
    const step = (2 * Math.PI) / z
    const c = Math.cos(step)
    const s = Math.sin(step)
    const set = new Set(ring.map((p) => `${p.x.toFixed(6)},${p.y.toFixed(6)}`))
    for (const p of ring.slice(0, 20)) {
      const rx = p.x * c - p.y * s
      const ry = p.x * s + p.y * c
      if (!set.has(`${rx.toFixed(6)},${ry.toFixed(6)}`)) return false
    }
    return true
  })())
}

console.log('B2. 渐开线本体：展角 β=inv(αt)、半径 ρ=rb√(1+t²)')
{
  const g = geom({ z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 })
  const ring = gearProfile(g, { involuteSegments: 50 })
  // 取齿顶处一点验证压力角关系 cos αa = rb/ra
  const alphaA = pressureAngleAt(g, g.ra)
  check('齿顶压力角 αa = arccos(rb/ra)', approx(Math.cos(alphaA), g.rb / g.ra, 1e-12))
  // 齿顶厚半角公式自洽：halfAngleAt(ra) > 0（齿顶有厚度）
  check('齿顶厚半角为正', halfAngleAt(g, g.ra) > 0)
  // inv 函数单调性
  check('inv(α) 单调增', inv(0.5) > inv(0.4))
  void ring
}

console.log('C. 接触线 / 正确啮合相位（不是只按转速比旋转）')
{
  const input = {
    g1: { z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    g2: { z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    deltaA: 0,
  }
  const rep = analyzeMesh(input)
  let maxDist = 0
  let contactCountOk = true
  const N = 90
  const period = (2 * Math.PI) / 20
  for (let i = 0; i < N; i++) {
    const theta = (period * i) / N
    const { profile1, profile2 } = placeGears(rep, theta, 30)
    const pts = contactPointsAt(rep, theta)
    if (pts.length < 1 || pts.length > 2) contactCountOk = false
    for (const q of pts) {
      const d1 = distanceToRing({ x: q.x, y: q.y }, profile1).dist
      const d2 = distanceToRing({ x: q.x, y: q.y }, profile2).dist
      maxDist = Math.max(maxDist, d1, d2)
    }
  }
  check('每个相位 1~2 对齿接触（ε≈1.6）', contactCountOk)
  check('理论接触点到两轮齿廓折线距离仅为弦误差 (<0.01mm)', maxDist < 0.01, `max=${maxDist.toExponential(2)}`)

  // θ=0 接触点必须是节点 P
  const at0 = contactPointsAt(rep, 0)
  const atNode = at0.some((p) => approx(p.x, rep.pitchPoint.x, 1e-9) && approx(p.y, rep.pitchPoint.y, 1e-9))
  check('θ=0 接触点为节点 P', atNode)
}

console.log('D. 旋转方向与转速比')
{
  const rep = analyzeMesh({
    g1: { z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    g2: { z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    deltaA: 0,
  })
  const a0 = meshAngles(rep, 0)
  const a1 = meshAngles(rep, 0.1)
  const dw1 = a1.a1 - a0.a1
  const dw2 = a1.a2 - a0.a2
  check('外啮合转向相反 (Δθ1·Δθ2 < 0)', dw1 * dw2 < 0)
  check('|Δθ2/Δθ1| = z1/z2 = 2/3', approx(Math.abs(dw2 / dw1), 20 / 30, 1e-12))
  // 转过整数个齿后相位复原
  const afterOneTooth = meshAngles(rep, (2 * Math.PI) / 20)
  check('轮1转过一齿后角度增量为 2π/z1', approx(afterOneTooth.a1 - a0.a1, 2 * Math.PI / 20, 1e-12))
}

console.log('E. Clipper2 WASM 布尔交：整周期扫描')
{
  const wasmPath = path.join(root, 'node_modules/clipper2-wasm/dist/es/clipper2z.wasm')
  const bytes = readFileSync(wasmPath)
  primeClipperWasm(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength))
  await clipperReady()
  console.log('  (WASM 初始化成功)')

  for (const [z1, z2, label] of [
    [20, 30, '标准 20/30'],
    [17, 17, '极少齿 17/17（工程临界，严格轻微根切）'],
    [40, 40, '40/40'],
  ] as const) {
    const rep = analyzeMesh({
      g1: { z: z1, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
      g2: { z: z2, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
      deltaA: 0,
    })
    let worst = 0
    let worstTheta = 0
    const steps = 36
    for (let i = 0; i < steps; i++) {
      const theta = ((2 * Math.PI) / z1 * (i + 0.5)) / steps
      const r = await checkAt(rep, theta, { segments: 22 })
      if (r.realMaxPenetration > worst) {
        worst = r.realMaxPenetration
        worstTheta = theta
      }
    }
    // 22 段/渐开线肢的弦误差：嵌入阈值 0.004mm（0.2%m）
    check(`${label}: 整周期无真实干涉 (max<0.004mm)`, worst < 0.004,
      `worst=${worst.toExponential(2)}@${(worstTheta * 180 / Math.PI).toFixed(2)}°`)
  }

  // 中心距不足（过盈安装）必须报告干涉
  {
    const rep = analyzeMesh({
      g1: { z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
      g2: { z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
      deltaA: -1,
    })
    const r = await checkAt(rep, 0, { segments: 22 })
    check('过盈中心距 a=49: Clipper 检出大面积真实干涉',
      r.realInterferenceArea > 1, `area=${r.realInterferenceArea.toFixed(2)} mm²`)
  }
}

console.log('F. 导出轮廓往返一致')
{
  const input = {
    g1: { z: 17, m: 2.5, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    g2: { z: 23, m: 2.5, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    deltaA: 0,
  }
  const pf = buildProfileFile(input)
  const json = JSON.parse(JSON.stringify(pf))
  check('轮廓文件格式可识别', isProfileFile(json))
  check('轮廓文件含两个齿轮', json.profiles.length === 2)
  check('坐标单位声明为 mm', json.profiles.every((p: { unit: string }) => p.unit === 'mm'))

  // 用导出文件中的 params 重新生成，逐点与导出 ring 比较
  for (const item of json.profiles) {
    const g = geom(item.params)
    const regen = gearProfile(g, { involuteSegments: 48 })
    const same =
      regen.length === item.ring.length &&
      regen.every((p, i) => approx(p.x, item.ring[i].x, 1e-10) && approx(p.y, item.ring[i].y, 1e-10))
    check(`齿轮 ${item.gear} 轮廓重新生成逐点一致`, same, `点数=${regen.length}`)
  }

  const cf = buildCaseFile(input, true)
  const cj = JSON.parse(JSON.stringify(cf))
  check('案例文件格式可识别', isCaseFile(cj))
  check('案例含轮廓与参数', !!cj.profiles && cj.input.g1.z === 17)
}

console.log(failures === 0 ? '\n全部核对通过 ✅' : `\n${failures} 项失败 ❌`)
process.exit(failures === 0 ? 0 : 1)
