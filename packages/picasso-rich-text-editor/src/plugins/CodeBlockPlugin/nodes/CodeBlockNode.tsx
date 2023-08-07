import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  LineBreakNode,
  NodeKey,
  ParagraphNode,
  RangeSelection,
  SerializedElementNode,
} from 'lexical'
import {
  $createLineBreakNode,
  $createParagraphNode,
  ElementNode,
} from 'lexical'

import type { CodeBlockTextNode } from '../nodes'
import {
  $createCodeBlockNode,
  $createCodeBlockTextNode,
  $isCodeBlockTextNode,
} from '../nodes'
import hasChildDOMNodeTag from '../../../LexicalEditor/utils/hasChildDOMNodeTag'

const getFirstCodeNodeOfLine = (
  anchor: CodeBlockTextNode | LineBreakNode
): null | CodeBlockTextNode | LineBreakNode => {
  let previousNode = anchor
  let node: null | LexicalNode = anchor

  while ($isCodeBlockTextNode(node)) {
    previousNode = node
    node = node.getPreviousSibling()
  }

  return previousNode
}

const convertPreElement = (): DOMConversionOutput => {
  return { node: $createCodeBlockNode() }
}

const ELEMENT_TYPE = 'code-block'

export class CodeBlockNode extends ElementNode {
  static getType() {
    return ELEMENT_TYPE
  }

  static clone(node: CodeBlockNode) {
    return new CodeBlockNode(node.__key)
  }

  constructor(key?: NodeKey) {
    super(key)
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement('code')
    const theme = config.theme
    const className = theme.codeBlock

    if (className !== undefined) {
      element.className = className
    }

    return element
  }

  updateDOM() {
    return false
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement('pre')

    return { element }
  }

  static importDOM(): DOMConversionMap | null {
    return {
      // Typically <pre> is used for code blocks, and <code> for inline code styles
      // but if it's a multi line <code> we'll create a block. Pass through to
      // inline format handled by TextNode otherwise.
      code: (node: Node) => {
        const isMultiLine =
          node.textContent != null &&
          (/\r?\n/.test(node.textContent) || hasChildDOMNodeTag(node, 'BR'))

        return isMultiLine
          ? {
              conversion: convertPreElement,
              priority: 1,
            }
          : null
      },
      pre: () => ({
        conversion: convertPreElement,
        priority: 0,
      }),
    }
  }

  static importJSON(serializedNode: SerializedElementNode): CodeBlockNode {
    const node = $createCodeBlockNode()

    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)

    return node
  }

  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: ELEMENT_TYPE,
      version: 1,
    }
  }

  canIndent() {
    return false
  }

  // eslint-disable-next-line max-statements, complexity
  insertNewAfter(
    selection: RangeSelection,
    restoreSelection = true
  ): null | ParagraphNode | CodeBlockTextNode {
    const children = this.getChildren()
    const childrenLength = children.length

    if (
      childrenLength >= 2 &&
      children[childrenLength - 1].getTextContent() === '\n' &&
      children[childrenLength - 2].getTextContent() === '\n' &&
      selection.isCollapsed() &&
      selection.anchor.key === this.__key &&
      selection.anchor.offset === childrenLength
    ) {
      children[childrenLength - 1].remove()
      children[childrenLength - 2].remove()
      const newElement = $createParagraphNode()

      this.insertAfter(newElement, restoreSelection)

      return newElement
    }

    // If the selection is within the codeblock, find all leading tabs and
    // spaces of the current line. Create a new line that has all those
    // tabs and spaces, such that leading indentation is preserved.
    const anchor = selection.anchor
    const focus = selection.focus
    const firstPoint = anchor.isBefore(focus) ? anchor : focus
    const firstSelectionNode = firstPoint.getNode()

    if ($isCodeBlockTextNode(firstSelectionNode)) {
      let node = getFirstCodeNodeOfLine(firstSelectionNode)
      const insertNodes = []

      // eslint-disable-next-line no-constant-condition
      while (true) {
        if ($isCodeBlockTextNode(node)) {
          const text = node.getTextContent()
          const textSize = node.getTextContentSize()

          // eslint-disable-next-line max-depth
          for (
            let spaces = 0;
            spaces < textSize && text[spaces] === ' ';
            spaces++
          ) {
            // eslint-disable-next-line max-depth
            if (spaces !== 0) {
              insertNodes.push($createCodeBlockTextNode(' '.repeat(spaces)))
            }
            // eslint-disable-next-line max-depth
            if (spaces !== textSize) {
              break
            }
          }
          node = node.getNextSibling()
        } else {
          break
        }
      }

      if (insertNodes.length > 0) {
        selection.insertNodes([$createLineBreakNode(), ...insertNodes])

        return insertNodes[insertNodes.length - 1]
      }
    }

    return null
  }

  collapseAtStart(): boolean {
    const paragraph = $createParagraphNode()
    const children = this.getChildren()

    children.forEach(child => paragraph.append(child))
    this.replace(paragraph)

    return true
  }
}
