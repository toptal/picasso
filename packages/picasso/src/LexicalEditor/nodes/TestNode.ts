import type { DOMExportOutput, LexicalEditor, NodeKey } from 'lexical'
import { TextNode } from 'lexical'

export class PicassoTextNode extends TextNode {
  constructor(text: string, key?: NodeKey) {
    super(text, key)
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const { element } = super.exportDOM(editor)

    return { element }
  }
}
