/**
 * Clipper2 WASM 封装：用真实布尔求交计算两轮实体轮廓的重叠区域（局部干涉）。
 * 所有几何在调用前已变换到世界坐标（mm，double 精度）。
 */
import Clipper2ZFactory from 'clipper2-wasm'
import type { MainModule, PathD, PathsD } from 'clipper2-wasm/dist/clipper2z'
import type { Pt } from './gear'

let modulePromise: Promise<MainModule> | null = null

/** 惰性初始化 WASM（Vite 会自动处理同目录 .wasm 的资源 URL） */
export function getClipper(): Promise<MainModule> {
  if (!modulePromise) {
    modulePromise = Clipper2ZFactory() as unknown as Promise<MainModule>
  }
  return modulePromise
}

/** 把一个环（Pt[]）转成 Clipper PathD */
function toPath(mod: MainModule, ring: Pt[]) {
  const flat: number[] = []
  for (const p of ring) flat.push(p.x, p.y)
  return mod.MakePathD(flat)
}

function toPaths(mod: MainModule, rings: Pt[][]) {
  const Ctor = mod.PathsD as unknown as { new (): PathsD }
  const paths = new Ctor()
  for (const r of rings) {
    if (r.length >= 3) paths.push_back(toPath(mod, r))
  }
  return paths
}

function pathToArray(path: PathD): Pt[] {
  const n = path.size()
  const out: Pt[] = []
  for (let i = 0; i < n; i++) {
    const pt = path.get(i)
    out.push({ x: pt.x, y: pt.y })
  }
  return out
}

function pathsToArray(paths: PathsD): Pt[][] {
  const out: Pt[][] = []
  const n = paths.size()
  for (let i = 0; i < n; i++) out.push(pathToArray(paths.get(i)))
  return out
}

export interface IntersectionResult {
  /** 重叠区域（外环多边形，可能多块） */
  regions: Pt[][]
  /** 重叠总面积 mm²（Clipper 有符号面积绝对值） */
  area: number
  /** 是否存在重叠（局部干涉） */
  intersects: boolean
}

/**
 * 求两组闭合轮廓（各自为实体，取 EvenOdd/NonZero）的交集。
 * 齿轮轮廓为单一外环，NonZero 即可。
 */
export async function intersectOutlines(a: Pt[][], b: Pt[][]): Promise<IntersectionResult> {
  const mod = await getClipper()
  const subj = toPaths(mod, a)
  const clip = toPaths(mod, b)
  const precision = 6 // 内部 10^6 倍整型化（double 接口）
  const sol = mod.IntersectD(subj, clip, mod.FillRule.NonZero, precision)
  const area = Math.abs(mod.AreaPathsD(sol))
  const regions = pathsToArray(sol)
  return { regions, area, intersects: area > 1e-8 }
}

/** 仅判断是否相交并给面积（暂停帧做干涉检查用） */
export async function intersectionArea(a: Pt[][], b: Pt[][]): Promise<number> {
  const mod = await getClipper()
  const subj = toPaths(mod, a)
  const clip = toPaths(mod, b)
  const sol = mod.IntersectD(subj, clip, mod.FillRule.NonZero, 6)
  return Math.abs(mod.AreaPathsD(sol))
}
