import React from 'react'
import { DecoratorNode } from 'lexical'
import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical'

import CodeComponent from '../../../RichText/components/Code'

export interface CodePayload {
  text: string
}

type SerializedCustomEmojiNode = Spread<
  {
    text: string
  },
  SerializedLexicalNode
>

const convertCodeElement = (domNode: Node): null | DOMConversionOutput => {
  if (domNode instanceof HTMLElement) {
    const text = domNode.innerText

    if (text) {
      return {
        node: $createCodeNode({
          text,
        }),
      }
    }

    return null
  }

  return null
}

export class CodeNode extends DecoratorNode<JSX.Element> {
  text: string

  static getType() {
    return 'code'
  }

  static clone(node: CodeNode): CodeNode {
    return new CodeNode(node.text)
  }

  constructor(text: string, key?: NodeKey) {
    super(key)
    this.text = text
  }

  static importJSON(serializedNode: SerializedCustomEmojiNode): CodeNode {
    const { text } = serializedNode

    const node = $createCodeNode({ text })

    return node
  }

  createDOM(): HTMLElement {
    const span = document.createElement('span')

    return span
  }

  updateDOM() {
    return false
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('code')

    element.innerText = this.text

    return { element }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (element: HTMLElement) => {
        // check if element is code tag
        if (element.tagName === 'CODE') {
          return {
            conversion: convertCodeElement,
            priority: 1,
          }
        }

        // Return null to pass the parsing to other plugins
        return null
      },
    }
  }

  exportJSON(): SerializedCustomEmojiNode {
    return {
      version: 1,
      type: 'code',
      text: this.text,
    }
  }

  isInline() {
    return true
  }

  decorate() {
    return <CodeComponent>{this.text}</CodeComponent>
  }
}

export const $isCodeNode = (
  node: LexicalNode | null | undefined
): node is CodeNode => {
  return node instanceof CodeNode
}

export const $createCodeNode = ({ text }: CodePayload): CodeNode => {
  return new CodeNode(text)
}
