import type { LexicalNode } from 'lexical'
import { $applyNodeReplacement } from 'lexical'

import { CodeBlockNode } from './CodeBlockNode'

export const $createCodeBlockNode = (): CodeBlockNode =>
  $applyNodeReplacement(new CodeBlockNode())

export const $isCodeBlockNode = (
  node: LexicalNode | null | undefined
): node is CodeBlockNode => {
  return node instanceof CodeBlockNode
}

export { CodeBlockNode }
