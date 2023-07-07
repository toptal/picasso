import React from 'react'
import { DecoratorNode } from 'lexical'
import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical'

export interface CustomEmojiPayload {
  src: string
  id: string
}

type SerializedCustomEmojiNode = Spread<
  {
    src: string
    id: string
  },
  SerializedLexicalNode
>

const convertImageElement = (domNode: Node): null | DOMConversionOutput => {
  if (domNode instanceof HTMLImageElement) {
    const src = domNode.getAttribute('src')
    const id = domNode.getAttribute('data-emoji-name')

    if (src && id) {
      return {
        node: $createCustomEmojiNode({
          src,
          id,
        }),
      }
    }

    return null
  }

  return null
}

export class CustomEmojiNode extends DecoratorNode<JSX.Element> {
  src: string
  id: string

  static getType() {
    return 'custom-emoji'
  }

  static clone(node: CustomEmojiNode): CustomEmojiNode {
    return new CustomEmojiNode(node.src, node.id)
  }

  constructor(src: string, id: string, key?: NodeKey) {
    super(key)
    this.src = src
    this.id = id
  }

  static importJSON(
    serializedNode: SerializedCustomEmojiNode
  ): CustomEmojiNode {
    const { src, id } = serializedNode

    const node = $createCustomEmojiNode({ src, id })

    return node
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span')

    const theme = config.theme
    const className = theme.customEmoji

    if (className !== undefined) {
      span.className = className
    }

    return span
  }

  updateDOM() {
    return false
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img')

    element.setAttribute('src', this.src)
    element.setAttribute('data-src', this.src)
    element.setAttribute('data-emoji-name', this.id)

    return { element }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    }
  }

  exportJSON(): SerializedCustomEmojiNode {
    return {
      version: 1,
      type: 'custom-emoji',
      src: this.src,
      id: this.id,
    }
  }

  isInline() {
    return true
  }

  decorate() {
    return <img src={this.src} data-src={this.src} data-emoji-name={this.id} />
  }
}

export const $isCustomEmojiNode = (
  node: LexicalNode | null | undefined
): node is CustomEmojiNode => {
  return node instanceof CustomEmojiNode
}

export const $createCustomEmojiNode = ({
  src,
  id,
}: CustomEmojiPayload): CustomEmojiNode => {
  return new CustomEmojiNode(src, id)
}
