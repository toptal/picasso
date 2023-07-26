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
  const isEmptyRoot = root.isEmpty()

  if (value && Object.keys(value).length > 0 && !isEmptyRoot) {
    const domValue = getDomValue(value)
    const lexicalValueNodes = $generateNodesFromDOM(editor, domValue)

    lexicalValueNodes.forEach(node => {
      const nodeToAppend =
        $isElementNode(node) || $isDecoratorNode(node)
          ? node
          : $createParagraphNode().append(node)

      root.append(nodeToAppend)
    })
  } else {
    if (isEmptyRoot) {
      root.append($createParagraphNode())
    }
  }
}
