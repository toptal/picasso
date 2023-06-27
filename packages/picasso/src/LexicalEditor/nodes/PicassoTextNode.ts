import type {
  DOMExportOutput,
  LexicalEditor,
  NodeKey,
  SerializedTextNode,
} from 'lexical'
import { TextNode } from 'lexical'

export class PicassoTextNode extends TextNode {
  constructor(text: string, key?: NodeKey) {
    super(text, key)
  }

  static getType(): string {
    return 'picasso-text'
  }

  static clone(node: PicassoTextNode): PicassoTextNode {
    console.log('@@@ clone')

    return super.clone(node)
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const { element } = super.exportDOM(editor)

    console.log('@@@ element', element, this.getFormat())

    return { element }
  }

  static importJSON(serializedNode: SerializedTextNode): PicassoTextNode {
    return super.importJSON(serializedNode)
  }

  exportJSON(): SerializedTextNode {
    return super.exportJSON()
  }
}
