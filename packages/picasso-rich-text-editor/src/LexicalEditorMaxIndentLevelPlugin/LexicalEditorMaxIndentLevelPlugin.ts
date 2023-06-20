import type { RangeSelection, ElementNode } from 'lexical'
import { $getListDepth, $isListItemNode, $isListNode } from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  INDENT_CONTENT_COMMAND,
} from 'lexical'
import { useEffect } from 'react'

type Props = {
  maxDepth?: number
}

const defaultMaxDepth = 7

const getElementNodesInSelection = (
  selection: RangeSelection
): Set<ElementNode> => {
  const nodesInSelection = selection.getNodes()

  if (nodesInSelection.length === 0) {
    return new Set([
      selection.anchor.getNode().getParentOrThrow(),
      selection.focus.getNode().getParentOrThrow(),
    ])
  }

  return new Set(
    nodesInSelection.map(node =>
      $isElementNode(node) ? node : node.getParentOrThrow()
    )
  )
}

const isIndentPermitted = (maxDepth: number): boolean => {
  const selection = $getSelection()

  if (!$isRangeSelection(selection)) {
    return false
  }

  const elementNodesInSelection: Set<ElementNode> =
    getElementNodesInSelection(selection)

  let totalDepth = 0

  for (const elementNode of elementNodesInSelection) {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth)
    } else if ($isListItemNode(elementNode)) {
      const parent = elementNode.getParent()

      if (!$isListNode(parent)) {
        console.error(
          'ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.'
        )

        return false
      }

      totalDepth = Math.max($getListDepth(parent) + 1, totalDepth)
    }
  }

  return totalDepth <= maxDepth
}

const LexicalEditorMaxIndentLevelPlugin = ({ maxDepth }: Props): null => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INDENT_CONTENT_COMMAND,
      () => !isIndentPermitted(maxDepth ?? defaultMaxDepth),
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, maxDepth])

  return null
}

export default LexicalEditorMaxIndentLevelPlugin
