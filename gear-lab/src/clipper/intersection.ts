/**
 * Clipper2 WASM 封装：用多边形布尔交精确度量两齿轮轮廓的重叠（局部干涉）。
 * 所有坐标直接使用 mm（Double 版接口 IntersectD，内部保留 6 位小数，约 1 nm）。
 */
import type { MainModule, PathsD } from 'clipper2-wasm/dist/clipper2z'
import Clipper2Z from 'clipper2-wasm/dist/es/clipper2z.js'
import wasmUrl from 'clipper2-wasm/dist/es/clipper2z.wasm?url'
import type { Pt, Ring } from '../geometry/spur'

export interface IntersectionResult {
  area: number          // 重叠面积 mm²（理想零侧隙啮合在非接触位置应为 0）
  count: number         // 交叠多边形数量
  polygons: Ring[]      // 交叠多边形（世界坐标）
  maxPenetration: number // 交叠区到最近啮合线接触点的尺度，近似最大嵌入量 mm
}

let modulePromise: Promise<MainModule> | null = null
let wasmBinaryOverride: ArrayBuffer | undefined

/** 供无 fetch 的环境（如 Node 验证脚本）直接注入 wasm 字节 */
export function primeClipperWasm(bytes: ArrayBuffer): void {
  wasmBinaryOverride = bytes
  modulePromise = null
}

export function clipperReady(): Promise<MainModule> {
  const existing = modulePromise
  if (existing) return existing
  const created = Clipper2Z({
    // 显式指向 Vite 产出的 wasm 资源，避免部署到子目录时 404
    locateFile: (path: string) => (path.endsWith('.wasm') ? wasmUrl : path),
    ...(wasmBinaryOverride ? { wasmBinary: wasmBinaryOverride } : {}),
  })
  modulePromise = created
  return created
}

function ringToPath(mod: MainModule, ring: Ring): PathsD {
  // 去掉首尾重复点
  const pts = ring.length > 1 &&
    Math.abs(ring[0].x - ring[ring.length - 1].x) < 1e-12 &&
    Math.abs(ring[0].y - ring[ring.length - 1].y) < 1e-12
    ? ring.slice(0, -1)
    : ring.slice()
  const coords: number[] = []
  for (const p of pts) coords.push(p.x, p.y)
  const path = mod.MakePathD(coords)
  const paths = new mod.PathsD()
  paths.push_back(path)
  return paths
}

function pathsToRings(mod: MainModule, paths: PathsD): Ring[] {
  const out: Ring[] = []
  for (let i = 0; i < paths.size(); i++) {
    const path = paths.get(i)
    const ring: Ring = []
    for (let j = 0; j < path.size(); j++) {
      const pt = path.get(j)
      ring.push({ x: pt.x, y: pt.y })
    }
    if (ring.length > 0) ring.push({ ...ring[0] })
    out.push(ring)
  }
  return out
}

export async function intersectRings(a: Ring, b: Ring): Promise<IntersectionResult> {
  const mod = await clipperReady()
  const subj = ringToPath(mod, a)
  const clip = ringToPath(mod, b)
  const solution = mod.IntersectD(subj, clip, mod.FillRule.NonZero, 6)
  const polygons = pathsToRings(mod, solution)
  const area = Math.abs(mod.AreaPathsD(solution))
  let maxPenetration = 0
  for (const poly of polygons) {
    // 用交叠多边形直径作为嵌入尺度
    let dmax = 0
    for (let i = 0; i < poly.length; i++) {
      for (let j = i + 1; j < poly.length; j++) {
        const d = Math.hypot(poly[i].x - poly[j].x, poly[i].y - poly[j].y)
        if (d > dmax) dmax = d
      }
    }
    maxPenetration = Math.max(maxPenetration, dmax)
  }
  subj.delete()
  clip.delete()
  solution.delete()
  return { area, count: polygons.length, polygons, maxPenetration }
}

/** 点是否落在多边形内部/边界上（用于接触点落在齿廓上的辅助判定） */
export async function pointInPolygon(p: Pt, ring: Ring): Promise<number> {
  const mod = await clipperReady()
  const paths = ringToPath(mod, ring)
  const result = mod.PointInPolygonD({ x: p.x, y: p.y } as never, paths.get(0))
  paths.delete()
  return result.value // 0=外 1=内 2=边界
}
