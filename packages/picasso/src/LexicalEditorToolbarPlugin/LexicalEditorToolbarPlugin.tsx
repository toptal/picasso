import React, { useEffect, useReducer } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FORMAT_TEXT_COMMAND } from 'lexical'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list'

import {
  registerLexicalEvents,
  synchronizeToolbarState,
  toolbarStateReducer,
} from '../LexicalEditor/utils'
import { noop } from '../utils'
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
  const [{ bold, italic, list }, dispatch] = useReducer(toolbarStateReducer, {
    bold: false,
    italic: false,
    list: false,
    header: '',
    link: '',
  })

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

  return (
    <RichTextEditorToolbar
      format={{
        bold,
        italic,
        list,
        header: '',
        link: '',
      }}
      id='toolbar'
      onUnorderedClick={handleUnorderedClick}
      onOrderedClick={handleOrderedClick}
      onBoldClick={handleBoldClick}
      onItalicClick={handleItalicClick}
      onLinkClick={noop}
      onHeaderChange={noop}
      disabled={disabled}
      onInsertEmoji={noop}
      ref={toolbarRef}
    />
  )
}

export default LexicalEditorToolbarPlugin
