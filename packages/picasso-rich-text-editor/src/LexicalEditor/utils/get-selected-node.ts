import { $isAtNodeEnd } from '@lexical/selection'
import type { ElementNode, RangeSelection, TextNode } from 'lexical'

export const getSelectedNode = (
  selection: RangeSelection
): TextNode | ElementNode => {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()

  if (anchorNode === focusNode) {
    return anchorNode
  }

  return $isAtNodeEnd(selection.isBackward() ? focus : anchor)
    ? anchorNode
    : focusNode
}
