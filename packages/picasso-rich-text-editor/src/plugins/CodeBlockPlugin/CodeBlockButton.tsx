import { CodeBlock16 } from '@toptal/picasso-icons'
import React, { useCallback, useState } from 'react'
import {
  $createLineBreakNode,
  $createParagraphNode,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  ElementNode,
} from 'lexical'
import type { LexicalNode, RangeSelection } from 'lexical'
import { $getNearestNodeOfType } from '@lexical/utils'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $setBlocksType } from '@lexical/selection'

import { useRTEPluginContext, useRTEUpdate } from '../api'
import RichTextEditorButton from '../../RichTextEditorButton'
import type { CodeBlockNode } from './nodes'
import {
  $createCodeBlockTextNode,
  $createCodeBlockNode,
  $isCodeBlockNode,
} from './nodes'
import { getSelectedNode } from '../../LexicalEditor/utils'

export type Props = {
  'data-testid'?: string
}

// go up through the tree and find the nearest block node (paragraph, heading, list, etc)
const getParentBlockNode = (node: LexicalNode | null): ElementNode | null => {
  if (!node) {
    return null
  }

  const elementNode = $getNearestNodeOfType(node, ElementNode)

  if (!elementNode) {
    return null
  }

  if (elementNode.isInline()) {
    return getParentBlockNode(elementNode.getParent())
  }

  return elementNode
}

const getBlockNodesInSelection = (): ElementNode[] => {
  const selection = $getSelection()

  if (!$isRangeSelection(selection)) {
    return []
  }

  let blockNodesInSelection = selection
    .getNodes()
    .filter($isElementNode)
    .filter(node => node.isInline() === false)

  const isBlockNodesEmpty = blockNodesInSelection.length === 0

  if (isBlockNodesEmpty) {
    const selectedNode = getSelectedNode(selection)
    const blockNode = getParentBlockNode(selectedNode)

    if (!blockNode) {
      return []
    }

    blockNodesInSelection = [blockNode]
  }

  return blockNodesInSelection
}

const appendTextToCodeBlock = (
  node: ElementNode,
  codeBlock: CodeBlockNode,
  isLast: boolean
) => {
  const text = node.getTextContent()

  if (text) {
    codeBlock.append($createCodeBlockTextNode(text))
  }
  if (!isLast) {
    codeBlock.append($createLineBreakNode())
  }
}

const replaceChildrenNodesWithRawText = (selection: RangeSelection) => {
  $setBlocksType(selection, () => $createParagraphNode())
  const codeBlock = $createCodeBlockNode()
  const blockNodesInSelection = getBlockNodesInSelection()

  if (blockNodesInSelection.length === 0) {
    return
  }

  blockNodesInSelection.forEach((node, index) => {
    const isLast = index === blockNodesInSelection.length - 1

    appendTextToCodeBlock(node, codeBlock, isLast)

    if (isLast) {
      node.insertAfter(codeBlock)
    }

    node.remove()
  })

  codeBlock.select()
}

const CodeBlockButton = ({ 'data-testid': testId }: Props) => {
  const [isButtonActive, setButtonActive] = useState(false)
  const [editor] = useLexicalComposerContext()
  const { disabled, focused } = useRTEPluginContext()

  const handleClick = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        if (isButtonActive) {
          return $setBlocksType(selection, () => $createParagraphNode())
        }

        replaceChildrenNodesWithRawText(selection)
      }
    })
  }, [editor, isButtonActive])

  useRTEUpdate(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      const isCodeBlockSelected =
        $isCodeBlockNode(parent) || $isCodeBlockNode(node)

      setButtonActive(isCodeBlockSelected)
    }
  })

  return (
    <RichTextEditorButton
      icon={<CodeBlock16 />}
      onClick={handleClick}
      active={isButtonActive}
      disabled={disabled || !focused}
      data-testid={testId}
    />
  )
}

export default CodeBlockButton
