import React, { useCallback, useEffect, useReducer } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { FORMAT_TEXT_COMMAND } from 'lexical'

import {
  registerLexicalEvents,
  synchronizeToolbarState,
  toolbarStateReducer,
} from '../LexicalEditor/utils'
import { noop } from '../utils'
import type { FormatType } from '../RichTextEditorToolbar'
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
  const [{ isBold, isItalic, isEditable, activeEditor }, dispatch] = useReducer(
    toolbarStateReducer,
    {
      isBold: false,
      isItalic: false,
      isEditable: editor.isEditable(),
      list: false,
      header: '',
      link: '',
      activeEditor: editor,
    }
  )

  const updateToolbar = useCallback(
    () => synchronizeToolbarState(dispatch),
    [activeEditor]
  )

  useEffect(() => {
    return registerLexicalEvents({
      editor,
      activeEditor,
      updateToolbar,
      dispatch,
    })
  }, [updateToolbar, activeEditor, editor])

  const handleBoldClick = () => {
    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
  }
  const handleItalicClick = () => {
    activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
  }

  // Convert toolbar state to format that is compatible with old RichTextEditorToolbar
  const format: FormatType = {
    bold: isBold,
    italic: isItalic,
    list: false,
    header: '',
    link: '',
  }

  return (
    <RichTextEditorToolbar
      format={format}
      id='toolbar'
      onUnorderedClick={noop}
      onOrderedClick={noop}
      onBoldClick={handleBoldClick}
      onItalicClick={handleItalicClick}
      onLinkClick={noop}
      onHeaderChange={noop}
      disabled={!isEditable || disabled}
      onInsertEmoji={noop}
      ref={toolbarRef}
    />
  )
}

export default LexicalEditorToolbarPlugin
