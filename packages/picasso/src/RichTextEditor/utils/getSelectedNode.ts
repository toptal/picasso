import { $isAtNodeEnd } from '@lexical/selection'
import type { ElementNode, RangeSelection, TextNode } from 'lexical'

const getSelectedNode = (selection: RangeSelection): TextNode | ElementNode => {
  const anchor = selection.anchor
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()

  if (anchorNode === focusNode) {
    return anchorNode
  }

  return $isAtNodeEnd(anchor) ? anchorNode : focusNode
}

export default getSelectedNode
