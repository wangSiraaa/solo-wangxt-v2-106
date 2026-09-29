<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, reactive, ref, shallowRef, watch } from 'vue'
import GearInput from './components/GearInput.vue'
import { GearScene, type LayerFlags } from './components/GearScene'
import { analyzeMesh, type MeshReport } from './geometry/mesh'
import { checkAt, scanPeriod, type InterferenceCheck, type ScanResult } from './geometry/contactCheck'
import { clipperReady } from './clipper/intersection'
import { UNITS, formatMm, type LengthUnit } from './units'
import { deleteCase, listCases, saveCase, type StoredCase } from './db/cases'
import { buildCaseFile, buildProfileFile, downloadJson, importCaseOrProfile } from './io/exporter'
import type { CaseInput } from './io/caseFormat'
import type { GearParams } from './geometry/spur'

const stdGear = (z: number): GearParams => ({ z, m: 2, alphaDeg: 20, haStar: 1, cStar: 0.25 })

const input = reactive<CaseInput>({
  g1: stdGear(20),
  g2: stdGear(30),
  deltaA: 0,
})

const unit = ref<LengthUnit>('mm')
const running = ref(false)
const speed = ref(0.5) // 小轮角速度 rad/s
const theta = ref(0)
const clockwise = ref(false) // true: 小轮顺时针（取负方向）
const showFormulas = ref(false)

const report = computed(() => analyzeMesh(input))

const layers = reactive<LayerFlags>({
  pitchCircles: true,
  baseCircles: true,
  tipCircles: false,
  rootCircles: false,
  lineOfAction: true,
  centerLine: true,
  contactPoints: true,
  profiles: true,
})

const viewport = ref<HTMLDivElement | null>(null)
const scene = shallowRef<GearScene | null>(null)
const clipperState = ref<'loading' | 'ready' | 'error'>('loading')
const inspect = shallowRef<InterferenceCheck | null>(null)
const inspecting = ref(false)
const scanState = shallowRef<ScanResult | null>(null)
const scanning = ref(false)
const scanProgress = ref({ done: 0, total: 1, worst: 0 })
const toast = ref('')
const cases = ref<StoredCase[]>([])
const caseName = ref('')

let raf = 0
let lastT = 0

function showToast(msg: string, ms = 2600) {
  toast.value = msg
  setTimeout(() => {
    if (toast.value === msg) toast.value = ''
  }, ms)
}

function modelSync() {
  scene.value?.setModel(report.value)
  scene.value?.setLayers(layers)
  inspect.value = null
  scanState.value = null
}

watch(() => JSON.parse(JSON.stringify(input)), () => modelSync(), { deep: true })
watch(layers, () => scene.value?.setLayers(layers), { deep: true })

onMounted(async () => {
  const s = new GearScene(viewport.value!)
  scene.value = s
  s.setModel(report.value)
  s.setLayers(layers)
  refreshCases()
  try {
    await clipperReady()
    clipperState.value = 'ready'
  } catch (e) {
    clipperState.value = 'error'
    showToast('Clipper2 WASM 加载失败，干涉检查不可用')
  }
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  scene.value?.dispose()
})

function loop(t: number) {
  if (!lastT) lastT = t
  const dt = Math.min(0.05, (t - lastT) / 1000)
  lastT = t
  if (running.value) {
    const dir = clockwise.value ? -1 : 1
    theta.value += dir * speed.value * dt
    // 折叠到 [0, 2π/z1)，啮合相位分析对 θ 周期化处理
    const period = (2 * Math.PI) / input.g1.z
    theta.value = ((theta.value % period) + period) % period
    scene.value?.setTheta(theta.value)
  }
  raf = requestAnimationFrame(loop)
}

function seekTheta(deg: number) {
  theta.value = ((deg * Math.PI) / 180 + 2 * Math.PI) % (2 * Math.PI / input.g1.z)
  scene.value?.setTheta(theta.value)
}

async function inspectCurrent() {
  if (clipperState.value !== 'ready') return
  inspecting.value = true
  try {
    const r = await checkAt(report.value, theta.value)
    inspect.value = r
    scene.value?.setOverlapPolygons(r.classified)
    if (r.hasInterference) {
      showToast(`发现真实干涉：嵌入 ${r.realMaxPenetration.toFixed(4)} mm，面积 ${r.realInterferenceArea.toFixed(4)} mm²`)
    } else {
      showToast('当前相位：无真实干涉（绿色小块为折线化数值残差）')
    }
  } finally {
    inspecting.value = false
  }
}

async function runScan() {
  if (clipperState.value !== 'ready' || scanning.value) return
  scanning.value = true
  scanState.value = null
  try {
    const result = await scanPeriod(report.value, 72, (done, total, worst) => {
      scanProgress.value = { done, total, worst }
    })
    scanState.value = result
    if (result.interferenceAngles.length === 0) showToast('整周期扫描：未发现真实局部干涉')
    else showToast(`整周期扫描：${result.interferenceAngles.length} 个相位存在干涉，最大嵌入 ${result.maxPenetration.toFixed(4)} mm`, 4200)
  } finally {
    scanning.value = false
  }
}

function jumpWorst() {
  if (scanState.value) seekTheta((scanState.value.worstTheta * 180) / Math.PI)
}

// ---- 案例库 ----
async function refreshCases() {
  cases.value = await listCases()
}
async function doSave() {
  const name = caseName.value.trim() || `案例 z1=${input.g1.z} z2=${input.g2.z} m=${input.g1.m}`
  const file = buildCaseFile(input, true, name)
  const id = await saveCase({ file })
  caseName.value = ''
  await refreshCases()
  showToast(`已保存到 IndexedDB（id ${id.slice(0, 8)}…）`)
}
async function doLoad(c: StoredCase) {
  Object.assign(input, JSON.parse(JSON.stringify(c.file.input)))
  showToast('已载入案例')
}
async function doDelete(id: string) {
  await deleteCase(id)
  await refreshCases()
}

// ---- 导出 / 导入 ----
function exportCase(withProfiles: boolean) {
  const file = buildCaseFile(input, withProfiles)
  downloadJson(`gear-case-z${input.g1.z}-z${input.g2.z}.json`, file)
}
function exportProfiles() {
  const file = buildProfileFile(input)
  downloadJson(`gear-profiles-z${input.g1.z}-z${input.g2.z}.json`, file)
}
async function doImport() {
  try {
    const { kind, input: loaded } = await importCaseOrProfile()
    Object.assign(input, JSON.parse(JSON.stringify(loaded)))
    showToast(kind === 'case' ? '已重新载入案例文件' : '已从轮廓文件回填参数（中心距按零侧隙标准值恢复）')
  } catch (e) {
    showToast(`导入失败：${(e as Error).message}`)
  }
}

// ---- 标准样本 ----
function loadSample(z1: number, z2: number) {
  Object.assign(input, { g1: stdGear(z1), g2: stdGear(z2), deltaA: 0 })
}

const rad2deg = 180 / Math.PI
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="title">
        <strong>直齿轮参数化啮合实验室</strong>
        <span class="scope">外啮合 · 标准齿无变位 · 理想刚性 · 渐开线直齿</span>
      </div>
      <div class="unit-switch">
        长度单位：
        <button
          v-for="u in Object.keys(UNITS) as LengthUnit[]"
          :key="u"
          :class="{ active: unit === u }"
          @click="unit = u"
        >{{ UNITS[u].label }}</button>
        <em class="unit-hint">切换单位只换显示，不改实际尺寸（内部恒为 mm）</em>
      </div>
    </header>

    <main class="layout">
      <aside class="panel">
        <GearInput title="齿轮 1（小轮/主动轮，+CCW）" v-model="input.g1" :unit="unit" />
        <GearInput title="齿轮 2（大轮/从动轮）" v-model="input.g2" :unit="unit" />

        <section class="gear-card">
          <h3>安装</h3>
          <label class="num-row">
            <span class="num-label">中心距偏差 Δa</span>
            <span class="num-field">
              <input type="number" step="any" v-model.number="input.deltaA" />
              <em class="unit">mm</em>
            </span>
          </label>
          <p class="hint">Δa=0 为标准零侧隙安装；Δa&gt;0 拉开中心距产生侧隙，啮合角改变。</p>
        </section>

        <section class="gear-card">
          <h3>标准齿数样本（核对用）</h3>
          <div class="samples">
            <button @click="loadSample(20, 30)">20 / 30</button>
            <button @click="loadSample(17, 17)">17 / 17</button>
            <button @click="loadSample(13, 20)">13 / 20（根切）</button>
            <button @click="loadSample(40, 40)">40 / 40</button>
          </div>
        </section>

        <section class="gear-card">
          <h3>案例库（IndexedDB）与文件</h3>
          <div class="row">
            <input v-model="caseName" placeholder="案例名称（可空）" />
            <button @click="doSave">保存</button>
          </div>
          <div class="row">
            <button @click="doImport()">导入案例/轮廓</button>
            <button @click="exportCase(true)">导出案例(含轮廓)</button>
          </div>
          <div class="row">
            <button @click="exportCase(false)">仅导出参数</button>
            <button @click="exportProfiles()">导出轮廓</button>
          </div>
          <ul v-if="cases.length" class="case-list">
            <li v-for="c in cases" :key="c.id">
              <span class="case-name">{{ c.file.notes || `${c.file.input.g1.z}/${c.file.input.g2.z} 齿` }}</span>
              <span class="case-date">{{ new Date(c.updatedAt).toLocaleString() }}</span>
              <button @click="doLoad(c)">载入</button>
              <button class="danger" @click="doDelete(c.id)">删</button>
            </li>
          </ul>
        </section>
      </aside>

      <section class="center">
        <div ref="viewport" class="viewport"></div>

        <div class="controls">
          <button :class="{ primary: running }" @click="running = !running">
            {{ running ? '暂停' : '运转' }}
          </button>
          <button :disabled="clockwise === false" @click="clockwise = false">小轮 +CCW</button>
          <button :disabled="clockwise === true" @click="clockwise = true">小轮 −CCW（反向）</button>
          <label class="speed">
            角速度
            <input type="range" min="0.02" max="3" step="0.02" v-model.number="speed" />
            {{ speed.toFixed(2) }} rad/s
          </label>
          <label class="speed">
            相位 θ₁
            <input type="range" min="0" :max="360 / input.g1.z" step="0.1" :value="theta * 180 / Math.PI"
              @input="seekTheta(Number(($event.target as HTMLInputElement).value))" />
            {{ (theta * 180 / Math.PI).toFixed(1) }}°
          </label>
        </div>

        <div class="layers">
          <label><input type="checkbox" v-model="layers.profiles" />齿廓</label>
          <label><input type="checkbox" v-model="layers.pitchCircles" />分度圆(白)</label>
          <label><input type="checkbox" v-model="layers.baseCircles" />基圆(绿)</label>
          <label><input type="checkbox" v-model="layers.tipCircles" />齿顶圆(黄)</label>
          <label><input type="checkbox" v-model="layers.rootCircles" />齿根圆(紫)</label>
          <label><input type="checkbox" v-model="layers.lineOfAction" />啮合线(红)</label>
          <label><input type="checkbox" v-model="layers.centerLine" />中心连线</label>
          <label><input type="checkbox" v-model="layers.contactPoints" />接触点(白)</label>
        </div>
      </section>

      <aside class="panel right">
        <section class="gear-card" :class="{ bad: !report.compatible }">
          <h3>啮合检查</h3>
          <ul class="issues">
            <li v-for="(msg, i) in report.issues" :key="i" class="issue">⚠ {{ msg }}</li>
            <li v-if="!report.issues.length" class="ok">尺寸、齿制与根切判据通过</li>
          </ul>
          <dl class="data">
            <dt>标准中心距 a₀</dt><dd>{{ formatMm(report.aStandard, unit) }}</dd>
            <dt>实际中心距 a</dt><dd>{{ formatMm(report.a, unit) }}</dd>
            <dt>啮合角 αw</dt><dd>{{ (report.alphaW * rad2deg).toFixed(3) }}°</dd>
            <dt>节圆 rw1 / rw2</dt>
            <dd>{{ formatMm(report.rw1, unit) }} / {{ formatMm(report.rw2, unit) }}</dd>
            <dt>基圆 rb1 / rb2</dt>
            <dd>{{ formatMm(report.g1.rb, unit) }} / {{ formatMm(report.g2.rb, unit) }}</dd>
            <dt>齿顶 ra1 / ra2</dt>
            <dd>{{ formatMm(report.g1.ra, unit) }} / {{ formatMm(report.g2.ra, unit) }}</dd>
            <dt>齿根 rf1 / rf2</dt>
            <dd>{{ formatMm(report.g1.rf, unit) }} / {{ formatMm(report.g2.rf, unit) }}</dd>
            <dt>传动比 ω1/ω2</dt><dd>{{ report.ratio.toFixed(4) }}（=z2/z1，外啮合反向）</dd>
            <dt>基节 pb</dt><dd>{{ formatMm(report.basePitch, unit) }}</dd>
            <dt>实际啮合线长</dt><dd>{{ formatMm(report.pathOfContactLength, unit) }}</dd>
            <dt>重合度 ε</dt>
            <dd :class="{ warn: report.contactRatio < 1 }">{{ report.contactRatio.toFixed(3) }}</dd>
            <dt>zmin（α,ha*）</dt><dd>{{ report.g1.zMin.toFixed(2) }}（两轮同齿制）</dd>
          </dl>
        </section>

        <section class="gear-card">
          <h3>暂停检查（Clipper2 WASM）</h3>
          <p class="hint">状态：{{ clipperState === 'ready' ? '已就绪' : clipperState === 'loading' ? '加载中…' : '加载失败' }}</p>
          <div class="row">
            <button :disabled="clipperState !== 'ready' || inspecting" @click="inspectCurrent">
              {{ inspecting ? '计算中…' : '检查当前相位' }}
            </button>
            <button :disabled="clipperState !== 'ready' || scanning" @click="runScan">
              {{ scanning ? `扫描 ${scanProgress.done}/${scanProgress.total}` : '扫描一个基节周期' }}
            </button>
            <button v-if="scanState" @click="jumpWorst">跳到最差相位</button>
          </div>
          <div v-if="inspect" class="inspect">
            <p>理论接触点 {{ inspect.contacts.length }} 个：</p>
            <p v-for="(c, i) in inspect.contacts" :key="i" class="mono">
              ({{ c.point.x.toFixed(3) }}, {{ c.point.y.toFixed(3) }})
              到两轮齿廓距离 {{ c.distToGear1.toExponential(2) }} / {{ c.distToGear2.toExponential(2) }} mm
            </p>
            <p>数值残差面积 {{ inspect.numericalResidualArea.toExponential(2) }} mm²
              （弦逼近曲线所致，应很小）</p>
            <p :class="{ badtext: inspect.hasInterference }">
              真实干涉面积 {{ inspect.realInterferenceArea.toExponential(2) }} mm²，
              最大嵌入 {{ inspect.realMaxPenetration.toFixed(4) }} mm
            </p>
          </div>
          <div v-if="scanState" class="inspect">
            <p>扫描相位 {{ scanState.checked }} 个；干涉相位 {{ scanState.interferenceAngles.length }} 个；
              最大嵌入 <strong :class="{ badtext: scanState.maxPenetration > 0.01 }">
              {{ scanState.maxPenetration.toFixed(4) }} mm</strong></p>
          </div>
          <p class="hint">图中绿色块＝接触点附近的折线残差；红色块＝真实局部干涉（顶刃/过渡曲线）。</p>
        </section>

        <section class="gear-card">
          <h3>渐开线公式与适用范围</h3>
          <button class="link" @click="showFormulas = !showFormulas">
            {{ showFormulas ? '收起' : '展开' }}
          </button>
          <div v-if="showFormulas" class="formulas">
            <p><strong>渐开线（直角坐标，t=tan αₜ 为展开参数）：</strong><br />
            x = r<sub>b</sub>(cos t + t sin t)，y = r<sub>b</sub>(sin t − t cos t)</p>
            <p>极径 ρ(t)=r<sub>b</sub>√(1+t²)，展角 β(t)=t−atan t = inv(αₜ)</p>
            <p><strong>渐开线参数方程（t=tan αₜ 为展开参数）：</strong><br />
            x=r<sub>b</sub>(cos t + t sin t)，y=r<sub>b</sub>(sin t − t cos t)，
            仅在 ρ≥r<sub>b</sub> 存在（基圆内无渐开线）</p>
            <p><strong>渐开线函数：</strong>inv(α)=tan α − α；展角 β(t)=t−atan t=inv(αₜ)</p>
            <p><strong>基本尺寸：</strong>r=mz/2，r<sub>b</sub>=r cosα，r<sub>a</sub>=r+ha*m，
              r<sub>f</sub>=r−(ha*+c*)m，p=πm，s=πm/2（标准齿）</p>
            <p><strong>任意半径 ρ≥r<sub>b</sub> 处齿厚半角：</strong><br />
              ψ(ρ)=s/(2r)+inv(α)−inv(arccos(r<sub>b</sub>/ρ))</p>
            <p><strong>根切判据：</strong>z<sub>min</sub>=2ha*/sin²α
              （α=20°,ha*=1 时严格值 17.097，工程上常取 17）</p>
            <p><strong>无侧隙安装：</strong>a₀=r₁+r₂；标准齿轮 αw=α。
              拉开中心距时 cos αw=a₀cosα/a</p>
            <p><strong>重合度：</strong>ε=gα/p<sub>b</sub>，p<sub>b</sub>=πm cosα，
              gα 为两齿顶圆在啮合线上截得的实际啮合线长度</p>
            <p><strong>正确啮合的安装相位（不只按转速比转动）：</strong><br />
              令 ψ<sub>k</sub>=ψ(r<sub>wk</sub>)，θ=0 时一对齿在节点相切且公法线重合：
              φ₁=π+ψ₁，φ₂=+ψ₂；运动时 θ₁=φ₁+θ，θ₂=φ₂−(z₁/z₂)θ（外啮合反向）。
              接触点沿固定啮合线移动：ξ=r<sub>b1</sub>θ+n·p<sub>b</sub>。</p>
            <p class="hint">
              适用范围：渐开线仅在 ρ≥r<sub>b</sub> 存在；本工具限定
              外啮合、标准齿无变位、理想刚性、无误差；齿根过渡曲线用径向线+齿根圆近似，
              因此非接触区干涉判定偏安全。红色啮合线为理论作用线（过节点、切于两基圆），
              白色亮点为瞬时接触点；绿色块是齿廓折线化的数值残差，红色块才是真实局部干涉。
            </p>
          </div>
        </section>
      </aside>
    </main>

    <div v-if="toast" class="toast">{{ toast }}</div>
  </div>
</template>

<style>
* { box-sizing: border-box; }
html, body, #app { margin: 0; height: 100%; }
body { background: #0a1120; color: #dce6f5; font-family: 'Segoe UI', system-ui, sans-serif; }
</style>

<style scoped>
.app { display: flex; flex-direction: column; height: 100%; }
.topbar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 16px; background: #0e1830; border-bottom: 1px solid #21304d; gap: 12px;
}
.title { display: flex; flex-direction: column; }
.title strong { font-size: 16px; }
.scope { font-size: 12px; color: #8494b3; }
.unit-switch { font-size: 12px; color: #aebbd2; display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
.unit-hint { color: #6b7a96; font-style: normal; }

.layout { flex: 1; display: grid; grid-template-columns: 300px 1fr 350px; gap: 10px; padding: 10px; min-height: 0; }
.panel { display: flex; flex-direction: column; gap: 10px; overflow-y: auto; padding-right: 2px; }
.center { display: flex; flex-direction: column; gap: 8px; min-width: 0; min-height: 0; }
.viewport { flex: 1; min-height: 320px; background: #0b1220; border: 1px solid #21304d; border-radius: 8px; overflow: hidden; }

button {
  background: #1d3a6d; color: #e8edf5; border: 1px solid #2f4f8a; border-radius: 5px;
  padding: 4px 10px; font-size: 12px; cursor: pointer;
}
button:hover { background: #274d8c; }
button:disabled { opacity: 0.45; cursor: default; }
button.active { background: #3b6fd4; border-color: #5a8df0; }
button.primary { background: #1d7a4d; border-color: #2ea268; }
button.danger { background: #6d2436; border-color: #a23650; }
button.link { background: none; border: none; color: #7fb0ff; padding: 0; text-decoration: underline; }

.controls, .layers {
  display: flex; gap: 10px; align-items: center; flex-wrap: wrap;
  background: #0e1830; border: 1px solid #21304d; border-radius: 8px; padding: 8px 10px; font-size: 12px;
}
.speed { display: inline-flex; align-items: center; gap: 6px; color: #aebbd2; }
.layers label { color: #aebbd2; display: inline-flex; gap: 4px; align-items: center; }

.gear-card {
  background: #111c31; border: 1px solid #21304d; border-radius: 8px; padding: 10px 12px;
  display: flex; flex-direction: column; gap: 8px;
}
.gear-card h3 { margin: 0; font-size: 13px; color: #9ec3ff; }
.num-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; font-size: 12px; }
.num-label { color: #c8d3e5; }
.num-field { display: inline-flex; align-items: center; gap: 4px; }
.num-row input, .num-field input, .row input {
  width: 90px; background: #0f1a2e; border: 1px solid #243350; border-radius: 4px;
  color: #e8edf5; padding: 3px 6px; font-size: 12px;
}
.hint { margin: 0; font-size: 11px; color: #7d8da8; line-height: 1.5; }
.samples { display: flex; flex-wrap: wrap; gap: 6px; }
.row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.row input { flex: 1; min-width: 100px; width: auto; }

.case-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
.case-list li { display: flex; align-items: center; gap: 6px; font-size: 11px; }
.case-name { flex: 1; color: #d5def0; }
.case-date { color: #6e7e9a; font-size: 10px; }
.case-list button { padding: 2px 8px; }

.issues { margin: 0; padding-left: 2px; list-style: none; display: flex; flex-direction: column; gap: 4px; }
.issue { font-size: 12px; color: #ffd0a8; }
.ok { font-size: 12px; color: #8be0a3; margin: 0; }
.data { display: grid; grid-template-columns: auto 1fr; gap: 3px 10px; margin: 4px 0 0; font-size: 12px; }
.data dt { color: #8ea0bf; }
.data dd { margin: 0; text-align: right; }
.warn { color: #ffb84d; font-weight: 700; }
.bad { border-color: #a23650; }
.badtext { color: #ff6b85; font-weight: 700; }
.inspect { font-size: 11px; color: #bccadc; }
.inspect p { margin: 3px 0; }
.mono { font-family: ui-monospace, Consolas, monospace; }
.formulas { font-size: 12px; color: #c6d2e6; line-height: 1.55; }
.formulas p { margin: 4px 0; }

.toast {
  position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
  background: #1a2c4e; border: 1px solid #3b6fd4; color: #eaf1ff;
  padding: 8px 16px; border-radius: 6px; font-size: 13px; max-width: 70vw;
}
</style>
