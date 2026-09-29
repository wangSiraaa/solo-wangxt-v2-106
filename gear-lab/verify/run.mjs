/**
 * 无浏览器的核对脚本（esbuild 打包 + Clipper2 WASM 直接注入）。
 * 运行：node verify/run.mjs
 *
 *  A. 标准齿数样本解析尺寸
 *  B. 齿形闭合（首尾、CCW、径向范围）
 *  C. 接触点位于两轮齿廓上（接触线复核）
 *  D. 旋转方向与转速比
 *  E. Clipper 整周期相交（零侧隙标准对不应有真实干涉）
 *  F. 导出轮廓 → JSON → 重新载入 → 重新生成，逐点一致
 */
import { build } from 'esbuild'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { rmSync } from 'node:fs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const entryArg = process.argv[2] || 'verify/checks.ts'
const entry = path.isAbsolute(entryArg) ? entryArg : path.join(root, entryArg)
const outfile = path.join(root, 'verify/.bundled.mjs')

const stubPlugin = {
  name: 'wasm-url-stub',
  setup(b) {
    b.onResolve({ filter: /\.wasm\?url$/ }, () => ({ path: 'wasm-url-stub', namespace: 'stub' }))
    b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({
      contents: 'export default "clipper2z.wasm"',
      loader: 'js',
    }))
  },
}

await build({
  entryPoints: [entry],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile,
  plugins: [stubPlugin],
  logLevel: 'silent',
})

await import(outfile)
rmSync(outfile, { force: true })
