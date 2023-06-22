import type { LexicalEditor as LexicalEditorType } from 'lexical'
import {
  $createParagraphNode,
  $isLineBreakNode,
  $getRoot,
  $isDecoratorNode,
  $isElementNode,
} from 'lexical'
import { $generateNodesFromDOM } from '@lexical/html'

import type { ASTType } from '../../RichText'
import { getDomValue } from './getDomValue'

export const setEditorValue = (editor: LexicalEditorType, value: ASTType) => {
  const domValue = getDomValue(value)

  editor.update(() => {
    const root = $getRoot()
    const lexicalValueNodes = $generateNodesFromDOM(editor, domValue)

    lexicalValueNodes.forEach(node => {
      if ($isElementNode(node) || $isDecoratorNode(node)) {
        root.append(node)
      } else if ($isLineBreakNode(node)) {
        const paragraphNode = $createParagraphNode()

        root.append(paragraphNode)
      } else {
        const paragraphNode = $createParagraphNode()

        paragraphNode.append(node)
        root.append(paragraphNode)
      }
    })
  })
}
