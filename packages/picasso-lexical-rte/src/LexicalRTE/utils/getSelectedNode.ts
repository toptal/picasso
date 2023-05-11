import { $isAtNodeEnd } from '@lexical/selection'
import type { ElementNode, RangeSelection, TextNode } from 'lexical'

const getSelectedNode = (
  selection: RangeSelection
): TextNode | ElementNode => {
  const anchor = selection.anchor
  const anchorNode = selection.anchor.getNode()
  const focus = selection.focus
  const focusNode = selection.focus.getNode()

  if (anchorNode === focusNode) {
    return anchorNode
  }

  const isBackward = selection.isBackward()

  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  }
 
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode
  
}

export default getSelectedNode;
