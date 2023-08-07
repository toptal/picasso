import type { LexicalNode, LineBreakNode } from 'lexical'

import type { CodeBlockTextNode } from '../nodes'
import { $isCodeBlockTextNode } from '../nodes'

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

export default getFirstCodeNodeOfLine
