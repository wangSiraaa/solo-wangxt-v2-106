/**
 * Three.js 场景：从 z 轴俯视一对直齿轮。
 * 几何只构建一次（局部坐标 Shape），运动时仅旋转两个 Group —— 避免“重画即对”的假象。
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import type { MeshReport } from '../geometry/mesh'
import { contactPointsAt, meshAngles } from '../geometry/mesh'
import type { Ring } from '../geometry/spur'
import { gearProfile } from '../geometry/spur'

export interface LayerFlags {
  pitchCircles: boolean
  baseCircles: boolean
  tipCircles: boolean
  rootCircles: boolean
  lineOfAction: boolean
  centerLine: boolean
  contactPoints: boolean
  profiles: boolean
}

const COLORS = {
  gear1: 0x4f8ef7,
  gear2: 0xf79950,
  pitch: 0xe8edf5,
  base: 0x3ddc84,
  tip: 0xffd23f,
  root: 0xc084fc,
  loa: 0xff4d6d,
  contact: 0xffffff,
  residual: 0x34d399,
  interference: 0xff2d55,
  centerLine: 0x6b7280,
}

export class GearScene {
  private renderer: THREE.WebGLRenderer
  private scene = new THREE.Scene()
  private camera: THREE.OrthographicCamera
  private controls: OrbitControls
  private gear1Group = new THREE.Group()
  private gear2Group = new THREE.Group()
  private overlay = new THREE.Group()
  private loaGroup = new THREE.Group()
  private circleGroup = new THREE.Group()
  private contactGroup = new THREE.Group()
  private rep: MeshReport | null = null
  private flags: LayerFlags = {
    pitchCircles: true,
    baseCircles: true,
    tipCircles: false,
    rootCircles: false,
    lineOfAction: true,
    centerLine: true,
    contactPoints: true,
    profiles: true,
  }
  private resizeObs: ResizeObserver
  private disposed = false

  constructor(private container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(this.renderer.domElement)
    this.renderer.domElement.style.width = '100%'
    this.renderer.domElement.style.height = '100%'
    this.renderer.domElement.style.display = 'block'

    this.scene.background = new THREE.Color(0x0b1220)
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10)
    this.camera.position.set(0, 0, 5)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableRotate = false
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: undefined,
    }

    this.scene.add(this.gear1Group, this.gear2Group, this.circleGroup, this.loaGroup, this.overlay, this.contactGroup)

    this.resizeObs = new ResizeObserver(() => this.resize())
    this.resizeObs.observe(container)
    this.resize()
    this.animate()
  }

  setLayers(flags: Partial<LayerFlags>) {
    Object.assign(this.flags, flags)
    this.applyFlags()
  }

  getLayers(): LayerFlags {
    return { ...this.flags }
  }

  private applyFlags() {
    this.gear1Group.visible = this.flags.profiles
    this.gear2Group.visible = this.flags.profiles
    this.loaGroup.visible = this.flags.lineOfAction
    this.contactGroup.visible = this.flags.contactPoints
    this.circleGroup.children.forEach((c) => {
      const layer = c.userData.layer as string
      c.visible = this.flags[layer as keyof LayerFlags] ?? true
    })
  }

  private clearGroup(g: THREE.Group) {
    while (g.children.length) {
      const c = g.children.pop()!
      const mesh = c as THREE.Mesh
      mesh.geometry?.dispose()
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
      else mat?.dispose()
      g.remove(c)
    }
  }

  setModel(rep: MeshReport) {
    this.rep = rep
    this.clearGroup(this.gear1Group)
    this.clearGroup(this.gear2Group)
    this.clearGroup(this.circleGroup)
    this.clearGroup(this.loaGroup)
    this.clearGroup(this.overlay)
    this.clearGroup(this.contactGroup)

    this.gear1Group.position.set(rep.center1.x, rep.center1.y, 0)
    this.gear2Group.position.set(rep.center2.x, rep.center2.y, 0)

    const ring1 = gearProfile(rep.g1, { involuteSegments: 30 })
    const ring2 = gearProfile(rep.g2, { involuteSegments: 30 })
    this.gear1Group.add(this.makeGearMesh(ring1, COLORS.gear1))
    this.gear2Group.add(this.makeGearMesh(ring2, COLORS.gear2))

    // 参考圆（世界坐标，不随轮齿转动）
    this.addCircle(rep.g1.r, rep.center1, COLORS.pitch, 'pitchCircles')
    this.addCircle(rep.g2.r, rep.center2, COLORS.pitch, 'pitchCircles')
    this.addCircle(rep.g1.rb, rep.center1, COLORS.base, 'baseCircles')
    this.addCircle(rep.g2.rb, rep.center2, COLORS.base, 'baseCircles')
    this.addCircle(rep.g1.ra, rep.center1, COLORS.tip, 'tipCircles')
    this.addCircle(rep.g2.ra, rep.center2, COLORS.tip, 'tipCircles')
    this.addCircle(rep.g1.rf, rep.center1, COLORS.root, 'rootCircles')
    this.addCircle(rep.g2.rf, rep.center2, COLORS.root, 'rootCircles')

    // 中心连线
    const centerGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(rep.center1.x, rep.center1.y, 0),
      new THREE.Vector3(rep.center2.x, rep.center2.y, 0),
    ])
    const centerLine = new THREE.Line(
      centerGeom,
      new THREE.LineDashedMaterial({ color: COLORS.centerLine, dashSize: 0.4, gapSize: 0.25 }),
    )
    centerLine.computeLineDistances()
    centerLine.userData.layer = 'centerLine'
    this.circleGroup.add(centerLine)

    // 啮合线及极限点
    this.buildLineOfAction(rep)
    this.fitView(rep)
    this.applyFlags()
    this.setTheta(0)
  }

  private makeGearMesh(ring: Ring, color: number): THREE.Mesh {
    const shape = new THREE.Shape()
    shape.moveTo(ring[0].x, ring[0].y)
    for (let i = 1; i < ring.length - 1; i++) shape.lineTo(ring[i].x, ring[i].y)
    shape.closePath()
    const geom = new THREE.ShapeGeometry(shape)
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const mesh = new THREE.Mesh(geom, mat)
    const edgeGeom = new THREE.EdgesGeometry(geom, 1)
    const edges = new THREE.LineSegments(
      edgeGeom,
      new THREE.LineBasicMaterial({ color: 0x0b1220, transparent: true, opacity: 0.9 }),
    )
    mesh.add(edges)
    return mesh
  }

  private addCircle(
    radius: number,
    center: { x: number; y: number },
    color: number,
    layer: string,
  ) {
    if (!(radius > 0)) return
    const seg = 160
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= seg; i++) {
      const a = (2 * Math.PI * i) / seg
      pts.push(new THREE.Vector3(center.x + radius * Math.cos(a), center.y + radius * Math.sin(a), 0))
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts)
    const line = new THREE.Line(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 }))
    line.userData.layer = layer
    this.circleGroup.add(line)
  }

  private buildLineOfAction(rep: MeshReport) {
    const { p, u } = rep.lineOfAction
    const xiA = Math.max(rep.xiTip1, rep.tangent2)
    const xiE = Math.min(rep.xiTip2, rep.tangent1)
    const mkPoint = (xi: number) => new THREE.Vector3(p.x + xi * u.x, p.y + xi * u.y, 0)

    // 理论啮合线（基圆切点之间）整条，虚线
    const full = new THREE.BufferGeometry().setFromPoints([mkPoint(rep.tangent1), mkPoint(rep.tangent2)])
    const fullLine = new THREE.Line(full, new THREE.LineDashedMaterial({
      color: COLORS.loa, dashSize: 0.5, gapSize: 0.3, transparent: true, opacity: 0.55,
    }))
    fullLine.computeLineDistances()
    this.loaGroup.add(fullLine)

    // 实际啮合段（齿顶圆之间）加亮
    if (xiE > xiA) {
      const active = new THREE.BufferGeometry().setFromPoints([mkPoint(xiA), mkPoint(xiE)])
      this.loaGroup.add(new THREE.Line(active, new THREE.LineBasicMaterial({ color: COLORS.loa })))
    }

    // 节点 P
    this.loaGroup.add(this.dot(new THREE.Vector3(p.x, p.y, 0), 0.09, 0xffffff, true))
    // 啮入点 A / 啮出点 E
    this.loaGroup.add(this.dot(mkPoint(xiA), 0.07, COLORS.tip))
    this.loaGroup.add(this.dot(mkPoint(xiE), 0.07, COLORS.tip))
  }

  private dot(pos: THREE.Vector3, r: number, color: number, ringed = false): THREE.Object3D {
    const m = new THREE.Mesh(
      new THREE.CircleGeometry(r, 20),
      new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, depthTest: false }),
    )
    m.position.copy(pos)
    m.renderOrder = 5
    if (ringed) return m
    return m
  }

  /** 干涉/残差多边形叠加：residual 绿色（数值弦误差），interference 红色（真实干涉） */
  setOverlapPolygons(polygons: { ring: Ring; real: boolean }[]) {
    this.clearGroup(this.overlay)
    for (const { ring, real } of polygons) {
      if (ring.length < 4) continue
      const shape = new THREE.Shape()
      shape.moveTo(ring[0].x, ring[0].y)
      for (let i = 1; i < ring.length - 1; i++) shape.lineTo(ring[i].x, ring[i].y)
      shape.closePath()
      const mesh = new THREE.Mesh(
        new THREE.ShapeGeometry(shape),
        new THREE.MeshBasicMaterial({
          color: real ? COLORS.interference : COLORS.residual,
          transparent: true,
          opacity: real ? 0.75 : 0.4,
          side: THREE.DoubleSide,
          depthTest: false,
        }),
      )
      mesh.renderOrder = 4
      this.overlay.add(mesh)
    }
  }

  clearOverlap() {
    this.clearGroup(this.overlay)
  }

  setTheta(theta: number) {
    if (!this.rep) return
    const a = meshAngles(this.rep, theta)
    this.gear1Group.rotation.z = a.a1
    this.gear2Group.rotation.z = a.a2

    this.clearGroup(this.contactGroup)
    const pts = contactPointsAt(this.rep, theta)
    for (const c of pts) {
      const dot = this.dot(new THREE.Vector3(c.x, c.y, 0), 0.08, COLORS.contact)
      this.contactGroup.add(dot)
    }
  }

  private fitView(rep: MeshReport) {
    const xmin = rep.center1.x - rep.g1.ra
    const xmax = rep.center2.x + rep.g2.ra
    const ymax = Math.max(rep.g1.ra, rep.g2.ra) * 1.15
    const w = xmax - xmin
    const h = 2 * ymax
    const aspect = this.container.clientWidth / Math.max(1, this.container.clientHeight)
    let halfW: number
    let halfH: number
    if (w / h > aspect) {
      halfW = (w * 1.12) / 2
      halfH = halfW / aspect
    } else {
      halfH = (h * 1.12) / 2
      halfW = halfH * aspect
    }
    const cx = (xmin + xmax) / 2
    this.camera.left = cx - halfW
    this.camera.right = cx + halfW
    this.camera.top = halfH
    this.camera.bottom = -halfH
    this.camera.updateProjectionMatrix()
    this.controls.target.set(cx, 0, 0)
    this.controls.update()
  }

  private resize() {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    if (!w || !h) return
    this.renderer.setSize(w, h, false)
    if (this.rep) this.fitView(this.rep)
  }

  private animate = () => {
    if (this.disposed) return
    requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.disposed = true
    this.resizeObs.disconnect()
    this.controls.dispose()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
