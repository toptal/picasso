import type { Parent, Root } from 'hast'

declare module 'hast-util-from-dom' {
  type HastChild = Parent['children'][number]
  type HastNode = HastChild | Root

  type Options = {
    afterTransform: Function
  }
  export const fromDom: (node: Node, options?: Options) => HastNode
}
