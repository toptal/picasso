import { $findMatchingParent } from '@lexical/utils'
import type { RangeSelection, LexicalEditor } from 'lexical'
import { $isRootOrShadowRoot } from 'lexical'

// Get a LexicalNode and related nodes from a RangeSelection (what is currently selected in the editor)
export const getLexicalNode = (
  selection: RangeSelection,
  editor: LexicalEditor
) => {
  const anchorNode = selection.anchor.getNode()
  let node =
    anchorNode.getKey() === 'root'
      ? anchorNode
      : $findMatchingParent(anchorNode, foundNode => {
          const parent = foundNode.getParent()

          return parent !== null && $isRootOrShadowRoot(parent)
        })

  if (node === null) {
    node = anchorNode.getTopLevelElementOrThrow()
  }
  const elementKey = node.getKey()
  const elementDOM = editor.getElementByKey(elementKey)

  return {
    // The LexicalNode itself
    node,
    // Text or Element node
    anchorNode,
    // HTMLElement rendered by the LexicalNode
    elementDOM,
  }
}
