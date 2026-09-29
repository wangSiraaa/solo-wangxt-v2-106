/**
 * 案例导出/导入往返测试：导出的 JSON（含轮廓）必须能重新解析，
 * 且重载的轮廓与原轮廓数值一致、仍可用于 Clipper 求交。
 */
import { buildGear, DEG, transformOutline, polygonArea } from '../src/geometry/gear.ts'
import { analyzeMesh, mateAngle } from '../src/geometry/mesh.ts'
import { parseCase, serializeCase, SCHEMA_VERSION, type CaseData } from '../src/store.ts'
import { intersectOutlines } from '../src/geometry/clipper.ts'

let fails = 0
const ok = (cond: boolean, msg: string) => {
  if (cond) console.log('  ok  ', msg)
  else {
    fails++
    console.log('  FAIL', msg)
  }
}

const g1 = buildGear({ z: 20, module: 2, alpha: 20 * DEG, faceWidth: 10 })
const g2 = buildGear({ z: 40, module: 2, alpha: 20 * DEG, faceWidth: 10 })
const mesh = analyzeMesh({ g1, g2, centerDistance: g1.pitchR + g2.pitchR })

const data: CaseData = {
  schemaVersion: SCHEMA_VERSION,
  id: 'case-test',
  name: '往返样本',
  createdAt: 1,
  updatedAt: 1,
  note: '',
  gear1: { z: 20, module: 2, alpha: 20 * DEG, alphaDeg: 20, faceWidth: 10 },
  gear2: { z: 40, module: 2, alpha: 20 * DEG, alphaDeg: 20, faceWidth: 10 },
  centerDistance: null,
  unit: 'mm',
  outlines: { gear1: g1.outline, gear2: g2.outline }
}

const text = serializeCase(data)
const back = parseCase(text)

ok(back.gear1.z === 20 && back.gear2.z === 40, '参数往返一致')
ok(!!back.outlines, '轮廓随 JSON 导出/导入保留')
ok(back.outlines!.gear1.length === g1.outline.length, '轮1 轮廓点数一致')
ok(back.outlines!.gear2.length === g2.outline.length, '轮2 轮廓点数一致')

// 重载轮廓面积与原轮廓一致（闭合性不因序列化破坏）
const a1 = polygonArea(back.outlines!.gear1)
const a2 = polygonArea(back.outlines!.gear2)
ok(Math.abs(a1 - polygonArea(g1.outline)) < 1e-6, '轮1 轮廓面积往返一致')
ok(Math.abs(a2 - polygonArea(g2.outline)) < 1e-6, '轮2 轮廓面积往返一致')
ok(a1 > 0 && a2 > 0, '重载轮廓仍为正向闭合环')

// 重载轮廓在严格相位下可直接用于 Clipper 求交（标准安装无干涉 → 面积 0）
const p1 = 0.37
const p2 = mateAngle(g1, g2, mesh, p1)
const o1 = [transformOutline(back.outlines!.gear1, 0, 0, p1)]
const o2 = [transformOutline(back.outlines!.gear2, mesh.a, 0, p2)]
const res = await intersectOutlines(o1, o2)
ok(!res.intersects, `标准安装严格相位无实体干涉（重叠面积 ${res.area.toExponential(2)}）`)

// 人为错位中心距（齿顶交叉）→ 重载轮廓求交必须报干涉
const bad = analyzeMesh({ g1, g2, centerDistance: g1.pitchR + g2.pitchR - 3 })
const b2 = mateAngle(g1, g2, bad, p1)
const resBad = await intersectOutlines(
  [transformOutline(back.outlines!.gear1, 0, 0, p1)],
  [transformOutline(back.outlines!.gear2, bad.a, 0, b2)]
)
ok(resBad.intersects && resBad.area > 1, `中心距过小时 Clipper 检出干涉（面积 ${resBad.area.toFixed(2)} mm²）`)

console.log(fails ? `\n${fails} 项失败 ❌` : '\n往返与求交全部通过 ✅')
process.exit(fails ? 1 : 0)
