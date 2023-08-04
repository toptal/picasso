import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from 'lexical'
import type { ChangeEvent } from 'react'
import React, { useEffect, useReducer } from 'react'

import {
  registerLexicalEvents,
  synchronizeToolbarState,
  toolbarStateReducer,
} from '../LexicalEditor/utils'
import type { HeaderValue } from '../RichTextEditorToolbar'
import RichTextEditorToolbar, {
  ALLOWED_HEADER_TYPE,
} from '../RichTextEditorToolbar'
import { useRTEPluginContext, useRTEUpdate } from '../plugins/api'
import { getSelectedNode } from '../LexicalEditor/utils/getSelectedNode'

type Props = {
  disabled?: boolean
  id: string
  toolbarRef: React.RefObject<HTMLDivElement>
  testIds?: {
    wrapper?: string
    editor?: string
    headerSelect?: string
    boldButton?: string
    italicButton?: string
    unorderedListButton?: string
    orderedListButton?: string
  }
}

const LexicalEditorToolbarPlugin = ({
  disabled = false,
  toolbarRef,
  testIds,
  id,
}: Props) => {
  const [editor] = useLexicalComposerContext()
  const { setDisabledFormatting } = useRTEPluginContext()
  const [{ bold, italic, list, header }, dispatch] = useReducer(
    toolbarStateReducer,
    {
      bold: false,
      italic: false,
      list: false,
      header: '',
    }
  )

  useEffect(() => {
    return registerLexicalEvents({
      editor,
      updateToolbar: () => synchronizeToolbarState(dispatch, editor),
    })
  }, [dispatch, editor])

  useRTEUpdate(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()

      setDisabledFormatting(
        Boolean($isHeadingNode(node) || $isHeadingNode(parent))
      )
    }
  })

  const handleBoldClick = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
  }
  const handleItalicClick = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
  }
  const handleUnorderedClick = () => {
    editor.dispatchCommand(
      list === 'bullet' ? REMOVE_LIST_COMMAND : INSERT_UNORDERED_LIST_COMMAND,
      undefined
    )
  }
  const handleOrderedClick = () => {
    editor.dispatchCommand(
      list === 'ordered' ? REMOVE_LIST_COMMAND : INSERT_ORDERED_LIST_COMMAND,
      undefined
    )
  }

  const handleHeaderClick = ({
    target: { value },
  }: ChangeEvent<{
    value: HeaderValue
  }>) => {
    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        if (value === ALLOWED_HEADER_TYPE) {
          $setBlocksType(selection, () => $createHeadingNode('h3'))
        } else {
          $setBlocksType(selection, () => $createParagraphNode())
        }
      }
    })
  }

  return (
    <RichTextEditorToolbar
      format={{
        bold,
        italic,
        list,
        header,
      }}
      onUnorderedClick={handleUnorderedClick}
      onOrderedClick={handleOrderedClick}
      onBoldClick={handleBoldClick}
      onItalicClick={handleItalicClick}
      onHeaderChange={handleHeaderClick}
      disabled={disabled}
      ref={toolbarRef}
      testIds={testIds}
      id={id}
    />
  )
}

export default LexicalEditorToolbarPlugin
