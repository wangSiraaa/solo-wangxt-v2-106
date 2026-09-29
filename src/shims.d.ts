declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'clipper2-wasm' {
  import type { MainModule } from 'clipper2-wasm/dist/clipper2z'
  const factory: (opts?: Record<string, unknown>) => Promise<MainModule>
  export default factory
}
