import type { SerializedTextNode, EditorConfig, NodeKey } from 'lexical'
import { TextNode } from 'lexical'

import { $createCodeBlockNode, $createCodeBlockTextNode } from '../nodes'
import type { CodeBlockNode } from '../nodes'

const ELEMENT_TYPE = 'code-block-text'

export class CodeBlockTextNode extends TextNode {
  constructor(text: string, key?: NodeKey) {
    super(text, key)
  }

  static getType() {
    return ELEMENT_TYPE
  }

  static clone(node: CodeBlockTextNode): CodeBlockTextNode {
    return new CodeBlockTextNode(node.__text, node.__key)
  }

  static importJSON(serializedNode: SerializedTextNode): CodeBlockTextNode {
    const { text } = serializedNode

    const node = $createCodeBlockTextNode(text)

    return node
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config)

    const theme = config.theme
    const className = theme.codeBlockText

    if (className !== undefined) {
      element.className = className
    }

    return element
  }

  exportJSON(): SerializedTextNode {
    return {
      ...super.exportJSON(),
      type: ELEMENT_TYPE,
      version: 1,
    }
  }

  // prevent formatting
  setFormat(): this {
    return this
  }

  isParentRequired() {
    return true
  }

  createParentElementNode(): CodeBlockNode {
    return $createCodeBlockNode()
  }
}
