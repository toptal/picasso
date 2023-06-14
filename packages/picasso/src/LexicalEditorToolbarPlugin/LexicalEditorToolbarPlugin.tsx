import React, { useEffect, useReducer } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'
import type { ChangeEvent } from 'react'
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
} from 'lexical'
import { $createHeadingNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'

import {
  registerLexicalEvents,
  synchronizeToolbarState,
  toolbarStateReducer,
} from '../LexicalEditor/utils'
import { noop } from '../utils'
import type { HeaderValue } from '../RichTextEditorToolbar'
import RichTextEditorToolbar from '../RichTextEditorToolbar'

type Props = {
  disabled?: boolean
  toolbarRef: React.RefObject<HTMLDivElement>
}

const LexicalEditorToolbarPlugin = ({
  disabled = false,
  toolbarRef,
}: Props) => {
  const [editor] = useLexicalComposerContext()
  const [{ bold, italic, list, header }, dispatch] = useReducer(
    toolbarStateReducer,
    {
      bold: false,
      italic: false,
      list: false,
      header: '',
      link: '',
    }
  )

  useEffect(() => {
    return registerLexicalEvents({
      editor,
      updateToolbar: () => synchronizeToolbarState(dispatch, editor),
    })
  }, [dispatch, editor])

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

  const formatNormal = () => {
    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatHeading = () => {
    editor.update(() => {
      const selection = $getSelection()

      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode('h3'))
      }
    })
  }

  const handleHeaderClick = ({
    target: { value },
  }: ChangeEvent<{
    value: HeaderValue
  }>) => {
    if (value === '3') {
      formatHeading()
    } else {
      formatNormal()
    }
  }

  return (
    <RichTextEditorToolbar
      format={{
        bold,
        italic,
        list,
        header,
        link: '',
      }}
      id='toolbar'
      onUnorderedClick={handleUnorderedClick}
      onOrderedClick={handleOrderedClick}
      onBoldClick={handleBoldClick}
      onItalicClick={handleItalicClick}
      onLinkClick={noop}
      onHeaderChange={handleHeaderClick}
      disabled={disabled}
      onInsertEmoji={noop}
      ref={toolbarRef}
    />
  )
}

export default LexicalEditorToolbarPlugin
