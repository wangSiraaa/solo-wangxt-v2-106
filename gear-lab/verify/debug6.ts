import { analyzeMesh } from '../src/geometry/mesh'
import { checkAt } from '../src/geometry/contactCheck'
import { clipperReady, primeClipperWasm } from '../src/clipper/intersection'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bytes = readFileSync(path.join(root, 'node_modules/clipper2-wasm/dist/es/clipper2z.wasm'))
primeClipperWasm(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength))
await clipperReady()

for (const [z1, z2, thetaDeg] of [[20, 30, 17.75], [17, 17, 9.71]] as const) {
  const rep = analyzeMesh({
    g1: { z: z1, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    g2: { z: z2, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    deltaA: 0,
  })
  const theta = (thetaDeg * Math.PI) / 180
  const r = await checkAt(rep, theta, { segments: 30 })
  console.log(`=== ${z1}/${z2} θ=${thetaDeg}°  realArea=${r.realInterferenceArea.toExponential(2)} pen=${r.realMaxPenetration.toFixed(4)}`)
  for (const poly of r.classified.filter((c) => c.real)) {
    const cx = poly.ring.reduce((s, p) => s + p.x, 0) / poly.ring.length
    const cy = poly.ring.reduce((s, p) => s + p.y, 0) / poly.ring.length
    const dC1 = Math.hypot(cx, cy)
    const dC2 = Math.hypot(cx - rep.a, cy)
    const r1 = dC1 / rep.g1.r
    const r2 = dC2 / rep.g2.r
    console.log(`  块(${poly.ring.length}点) 中心=(${cx.toFixed(2)},${cy.toFixed(2)}) 距C1=${dC1.toFixed(2)}(${r1.toFixed(2)}r) 距C2=${dC2.toFixed(2)}(${r2.toFixed(2)}r)`)
    const contacts = r.contacts.map((c) => `(${c.point.x.toFixed(2)},${c.point.y.toFixed(2)})`).join(' ')
    console.log(`  接触点: ${contacts}`)
  }
}

// deltaA<0 为什么干涉面积小
{
  const rep = analyzeMesh({
    g1: { z: 20, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    g2: { z: 30, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 },
    deltaA: -1,
  })
  console.log('deltaA=-1: a=', rep.a, 'issues:', rep.issues.length)
  const r = await checkAt(rep, 0, { segments: 30 })
  console.log('total polygons:', r.intersection.count, 'area total:', r.intersection.area, 'real:', r.realInterferenceArea, 'residual:', r.numericalResidualArea)
}
