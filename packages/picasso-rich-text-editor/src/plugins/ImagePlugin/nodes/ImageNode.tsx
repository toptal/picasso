import React from 'react'
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
import { $applyNodeReplacement, DecoratorNode } from 'lexical'
import { Image } from '@toptal/picasso'

import isCustomEmojiDOMNode from '../../../utils/is-custom-emoji-dom-node'

export interface ImageNodePayload {
  src: string
  alt?: string
}

type SerializedImageNode = Spread<
  {
    src: string
    alt?: string
  },
  SerializedLexicalNode
>

const convertImageElement = (domNode: Node): null | DOMConversionOutput => {
  if (domNode instanceof HTMLImageElement) {
    const src = domNode.getAttribute('src')
    const alt = domNode.getAttribute('alt') ?? undefined

    if (src) {
      return {
        node: $createImageNode({
          src,
          alt,
        }),
      }
    }

    return null
  }

  return null
}

export class ImageNode extends DecoratorNode<JSX.Element> {
  src: string
  alt?: string

  static getType() {
    return 'img'
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.src, node.alt)
  }

  constructor(src: string, alt?: string, key?: NodeKey) {
    super(key)
    this.src = src
    this.alt = alt
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, alt } = serializedNode

    return $createImageNode({ src, alt })
  }

  createDOM(config: EditorConfig): HTMLElement {
    const container = document.createElement('div')

    const theme = config.theme
    const className = theme.image

    if (className !== undefined) {
      container.className = className
    }

    return container
  }

  updateDOM() {
    return false
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('img')

    element.setAttribute('src', this.src)
    if (this.alt) {
      element.setAttribute('alt', this.alt)
    }

    return { element }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (element: HTMLElement) => {
        // Return null to pass the parsing to the custom emoji plugin
        if (isCustomEmojiDOMNode(element)) {
          return null
        }

        return {
          conversion: convertImageElement,
          // Priority is set to 1 to make sure that the image is parsed before the custom emoji
          priority: 1,
        }
      },
    }
  }

  exportJSON(): SerializedImageNode {
    return {
      version: 1,
      type: 'img',
      src: this.src,
      alt: this.alt,
    }
  }

  isInline() {
    // Technically it is not inline in DOM, but setting this to false prevents image deletion
    return true
  }

  decorate() {
    return <Image src={this.src} alt={this.alt ?? ''} />
  }
}

export const $isImageNode = (
  node: LexicalNode | null | undefined
): node is ImageNode => {
  return node instanceof ImageNode
}

export const $createImageNode = ({ src, alt }: ImageNodePayload): ImageNode => {
  return $applyNodeReplacement(new ImageNode(src, alt))
}
