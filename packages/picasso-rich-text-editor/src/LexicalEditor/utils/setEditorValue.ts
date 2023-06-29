import type { LexicalEditor as LexicalEditorType } from 'lexical'
import {
  $createParagraphNode,
  $getRoot,
  $isDecoratorNode,
  $isElementNode,
} from 'lexical'
import { $generateNodesFromDOM } from '@lexical/html'

import type { ASTType } from '../../RichText'
import { getDomValue } from './getDomValue'

export const setEditorValue = (editor: LexicalEditorType, value?: ASTType) => {
  const root = $getRoot()

  if (value) {
    const domValue = getDomValue(value)
    const lexicalValueNodes = $generateNodesFromDOM(editor, domValue)

    lexicalValueNodes.forEach(node => {
      if ($isElementNode(node) || $isDecoratorNode(node)) {
        root.append(node)
      } else {
        const paragraphNode = $createParagraphNode()

        paragraphNode.append(node)
        root.append(paragraphNode)
      }
    })
  } else {
    if (root.isEmpty()) {
      const paragraphNode = $createParagraphNode()

      root.append(paragraphNode)
    }

    root.getLastChild()?.select()
  }
}
