import type { LexicalNode } from 'lexical'
import { $applyNodeReplacement } from 'lexical'

import { CodeBlockNode } from './CodeBlockNode'
import { CodeBlockTextNode } from './CodeBlockTextNode'

export const $createCodeBlockNode = (): CodeBlockNode =>
  $applyNodeReplacement(new CodeBlockNode())

export const $isCodeBlockNode = (
  node: LexicalNode | null | undefined
): node is CodeBlockNode => {
  return node instanceof CodeBlockNode
}

export const $isCodeBlockTextNode = (
  node: LexicalNode | CodeBlockTextNode | null | undefined
): node is CodeBlockTextNode => {
  return node instanceof CodeBlockTextNode
}

export const $createCodeBlockTextNode = (text: string): CodeBlockTextNode => {
  return $applyNodeReplacement(new CodeBlockTextNode(text))
}

export { CodeBlockNode, CodeBlockTextNode }
