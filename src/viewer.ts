/**
 * Three.js 场景：直齿轮 3D 齿形 + 参考圆 + 啮合线/接触点 + 旋转运动。
 * 纯前端、OrbitControls 由 three 自带模块提供。
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { GearGeometry, Pt } from './geometry/gear'
import type { MeshInfo } from './geometry/mesh'

export interface ViewerOptions {
  showPitchCircle: boolean
  showBaseCircle: boolean
  showAddendumCircle: boolean
  showDedendumCircle: boolean
  showActionLine: boolean
  showContact: boolean
  contactS: number // 啮合线参数 s（mm），仅 showContact 时
  contactRegions?: Pt[][][] // Clipper 干涉区域（世界坐标，按帧）
}

interface GearMesh {
  group: THREE.Group
  body: THREE.Mesh
  // 参考圆线段
  refs: Record<string, THREE.LineLoop>
}

export class GearViewer {
  readonly renderer: THREE.WebGLRenderer
  readonly scene: THREE.Scene
  readonly camera: THREE.OrthographicCamera
  private controls: OrbitControls
  private gear1: GearMesh | null = null
  private gear2: GearMesh | null = null
  private actionLine: THREE.Line | null = null
  private tangentLine: THREE.Line | null = null
  private pitchPoint: THREE.Mesh | null = null
  private contactMarker: THREE.Mesh | null = null
  private interferenceGroup: THREE.Group
  private raycaster = new THREE.Raycaster()
  private container: HTMLElement
  private resizeObs: ResizeObserver

  constructor(container: HTMLElement) {
    this.container = container
    const w = container.clientWidth || 800
    const h = container.clientHeight || 600

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(w, h)
    container.appendChild(this.renderer.domElement)

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x101318)

    const aspect = w / h
    const frustum = 80
    this.camera = new THREE.OrthographicCamera(
      (-frustum * aspect) / 2,
      (frustum * aspect) / 2,
      frustum / 2,
      -frustum / 2,
      0.1,
      2000
    )
    this.camera.position.set(0, 0, 120)
    this.camera.lookAt(0, 0, 0)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN
    }

    const amb = new THREE.AmbientLight(0xffffff, 0.65)
    const dir = new THREE.DirectionalLight(0xffffff, 0.9)
    dir.position.set(40, 60, 100)
    this.scene.add(amb, dir)

    this.interferenceGroup = new THREE.Group()
    this.scene.add(this.interferenceGroup)

    this.resizeObs = new ResizeObserver(() => this.resize())
    this.resizeObs.observe(container)

    this.animate()
  }

  private makeCircleLine(radius: number, color: number, z = 0.02, seg = 160) {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2
      pts.push(new THREE.Vector3(radius * Math.cos(a), radius * Math.sin(a), z))
    }
    const geo = new THREE.BufferGeometry().setFromPoints(pts)
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 })
    return new THREE.LineLoop(geo, mat)
  }

  private buildGearMesh(g: GearGeometry, color: number): GearMesh {
    const group = new THREE.Group()

    // 用 THREE.Shape 挤出齿廓
    const shape = new THREE.Shape()
    const o = g.outline
    shape.moveTo(o[0].x, o[0].y)
    for (let i = 1; i < o.length; i++) shape.lineTo(o[i].x, o[i].y)
    shape.closePath()

    const depth = g.input.faceWidth
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false,
      curveSegments: 1
    })
    geo.translate(0, 0, -depth / 2)
    geo.computeVertexNormals()
    const mat = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.35,
      roughness: 0.55
    })
    const body = new THREE.Mesh(geo, mat)
    group.add(body)

    // 齿廓边线（端面上更清楚地看到齿形）
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo, 12),
      new THREE.LineBasicMaterial({ color: 0x222a33, transparent: true, opacity: 0.5 })
    )
    group.add(edges)

    // 参考圆（放在前端面之上）
    const refs: Record<string, THREE.LineLoop> = {
      pitch: this.makeCircleLine(g.pitchR, 0x4aa3ff, depth / 2 + 0.02),
      base: this.makeCircleLine(g.baseR, 0x27c08a, depth / 2 + 0.02),
      addendum: this.makeCircleLine(g.addendumR, 0xffd166, depth / 2 + 0.02),
      dedendum: this.makeCircleLine(g.dedendumR, 0xff8fa3, depth / 2 + 0.02)
    }
    Object.values(refs).forEach((l) => group.add(l))

    return { group, body, refs }
  }

  setGears(g1: GearGeometry, g2: GearGeometry, centerDistance: number) {
    if (this.gear1) this.scene.remove(this.gear1.group)
    if (this.gear2) this.scene.remove(this.gear2.group)
    this.gear1 = this.buildGearMesh(g1, 0x6ea8fe)
    this.gear2 = this.buildGearMesh(g2, 0xffb86e)
    this.scene.add(this.gear1.group, this.gear2.group)
    this.gear2.group.position.x = centerDistance
    // 让整对齿轮大致居中
    this.targetCenter(centerDistance / 2, Math.max(g1.addendumR, g2.addendumR))
  }

  private targetCenter(cx: number, radius: number) {
    const aspect = (this.container.clientWidth || 800) / (this.container.clientHeight || 600)
    const need = (radius * 2 + 40) / 2
    const frustum = Math.max(need * 2, 80)
    this.camera.left = (-frustum * aspect) / 2
    this.camera.right = (frustum * aspect) / 2
    this.camera.top = frustum / 2
    this.camera.bottom = -frustum / 2
    this.camera.updateProjectionMatrix()
    this.controls.target.set(cx, 0, 0)
    this.camera.position.set(cx, 0, 140)
  }

  setAngles(phi1: number, phi2: number) {
    if (this.gear1) this.gear1.group.rotation.z = phi1
    if (this.gear2) this.gear2.group.rotation.z = phi2
  }

  setMeshOverlay(mesh: MeshInfo | null, opts: ViewerOptions) {
    this.clearOverlay()
    if (!mesh || !this.gear1 || !this.gear2) return

    const show = (key: keyof ViewerOptions) => opts[key] as boolean

    // 两齿轮齿宽（挤出深度），用于把覆盖物放到前端面之上
    const bodyDepth = (m: THREE.Mesh) => {
      m.geometry.computeBoundingBox()
      const bb = m.geometry.boundingBox
      return bb ? bb.max.z - bb.min.z : 0
    }
    const g1Depth = bodyDepth(this.gear1.body)
    const g2Depth = bodyDepth(this.gear2.body)

    this.gear1.refs.pitch.visible = !!show('showPitchCircle')
    this.gear2.refs.pitch.visible = !!show('showPitchCircle')
    this.gear1.refs.base.visible = !!show('showBaseCircle')
    this.gear2.refs.base.visible = !!show('showBaseCircle')
    this.gear1.refs.addendum.visible = !!show('showAddendumCircle')
    this.gear2.refs.addendum.visible = !!show('showAddendumCircle')
    this.gear1.refs.dedendum.visible = !!show('showDedendumCircle')
    this.gear2.refs.dedendum.visible = !!show('showDedendumCircle')

    if (show('showActionLine')) {
      // 覆盖在两齿轮前端面之上并关闭深度测试，保证任何视角都能看到啮合线
      const z = Math.max(g1Depth, g2Depth) / 2 + 1
      const mk = (p: Pt, q: Pt, color: number) => {
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(p.x, p.y, z),
          new THREE.Vector3(q.x, q.y, z)
        ])
        return new THREE.Line(
          geo,
          new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity: 0.9,
            depthTest: false
          })
        )
      }
      this.tangentLine = mk(mesh.tangentLine.p0, mesh.tangentLine.p1, 0x8893a3)
      this.tangentLine.renderOrder = 50
      this.actionLine = mk(mesh.actionLine.p0, mesh.actionLine.p1, 0x39e66b)
      this.actionLine.renderOrder = 51
      this.scene.add(this.tangentLine, this.actionLine)

      const dotGeo = new THREE.SphereGeometry(0.7, 16, 16)
      this.pitchPoint = new THREE.Mesh(
        dotGeo,
        new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false })
      )
      this.pitchPoint.position.set(mesh.pitchPoint.x, mesh.pitchPoint.y, z)
      this.pitchPoint.renderOrder = 52
      this.scene.add(this.pitchPoint)
    }

    if (show('showContact')) {
      const ap = mesh.alphaPrime
      const nx = Math.sin(ap),
        ny = Math.cos(ap)
      const c = {
        x: mesh.pitchPoint.x + opts.contactS * nx,
        y: mesh.pitchPoint.y + opts.contactS * ny
      }
      const z = Math.max(g1Depth, g2Depth) / 2 + 1.5
      const dotGeo = new THREE.SphereGeometry(1.0, 20, 20)
      this.contactMarker = new THREE.Mesh(
        dotGeo,
        new THREE.MeshBasicMaterial({ color: 0xff3b6b, depthTest: false })
      )
      this.contactMarker.position.set(c.x, c.y, z)
      this.contactMarker.renderOrder = 60
      this.scene.add(this.contactMarker)
    }

    if (opts.contactRegions) {
      for (const regionSet of opts.contactRegions) {
        for (const ring of regionSet) {
          if (ring.length < 3) continue
          const shape = new THREE.Shape()
          shape.moveTo(ring[0].x, ring[0].y)
          for (let i = 1; i < ring.length; i++) shape.lineTo(ring[i].x, ring[i].y)
          shape.closePath()
          const geo = new THREE.ShapeGeometry(shape)
          const mat = new THREE.MeshBasicMaterial({
            color: 0xff2d55,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
            depthTest: false
          })
          const m = new THREE.Mesh(geo, mat)
          m.position.z = Math.max(g1Depth, g2Depth) / 2 + 2
          m.renderOrder = 999
          this.interferenceGroup.add(m)
        }
      }
    }
  }

  private clearOverlay() {
    if (this.actionLine) {
      this.scene.remove(this.actionLine)
      this.actionLine.geometry.dispose()
      this.actionLine = null
    }
    if (this.tangentLine) {
      this.scene.remove(this.tangentLine)
      this.tangentLine.geometry.dispose()
      this.tangentLine = null
    }
    if (this.pitchPoint) {
      this.scene.remove(this.pitchPoint)
      this.pitchPoint = null
    }
    if (this.contactMarker) {
      this.scene.remove(this.contactMarker)
      this.contactMarker = null
    }
    while (this.interferenceGroup.children.length) {
      const c = this.interferenceGroup.children.pop()!
      ;(c as THREE.Mesh).geometry?.dispose()
    }
  }

  /** 返回世界坐标（用于拾取，本工具暂保留接口） */
  pick(_clientX: number, _clientY: number) {
    void this.raycaster
    return null
  }

  resize() {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    if (!w || !h) return
    this.renderer.setSize(w, h)
    const aspect = w / h
    const frustum = (this.camera.top - this.camera.bottom) / 1
    const halfH = frustum / 2
    this.camera.left = -halfH * aspect
    this.camera.right = halfH * aspect
    this.camera.updateProjectionMatrix()
  }

  private animate = () => {
    requestAnimationFrame(this.animate)
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.resizeObs.disconnect()
    this.controls.dispose()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}
