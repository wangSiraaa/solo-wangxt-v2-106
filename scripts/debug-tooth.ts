import { buildGear, DEG } from '../src/geometry/gear.ts'

const g = buildGear({ z: 20, module: 2, alpha: 20 * DEG, faceWidth: 10 })
const tp = g.toothProfile
console.log('tooth profile points:', tp.length)
tp.forEach((p, i) => {
  const r = Math.hypot(p.x, p.y)
  const a = (Math.atan2(p.y, p.x) * 180) / Math.PI
  console.log(
    `${String(i).padStart(3)} x=${p.x.toFixed(3).padStart(8)} y=${p.y.toFixed(3).padStart(8)} r=${r.toFixed(3).padStart(7)} ang=${a.toFixed(2).padStart(7)}`
  )
})
console.log('jAngleRight deg:', (g.jAngleRight * 180) / Math.PI)
console.log('jAngleLeft  deg:', (g.jAngleLeft * 180) / Math.PI)
console.log('pitch deg:', 360 / 20)
