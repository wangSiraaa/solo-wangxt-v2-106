/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module '*.wasm?url' {
  const url: string
  export default url
}
// clipper2-wasm 的 ES 入口只随包提供了全局 .d.ts，这里显式关联
declare module 'clipper2-wasm/dist/es/clipper2z.js' {
  import type { Clipper2ZFactoryFunction } from 'clipper2-wasm/dist/clipper2z'
  const Clipper2Z: Clipper2ZFactoryFunction
  export default Clipper2
}
