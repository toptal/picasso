import { useMemo, useEffect } from 'react'
import Quill, { EditorChangeHandler, TextChangeHandler } from 'quill'

import getFocusChangeHandler from '../../utils/getFocusChangeHandler'
import getTextChangeHandler from '../../utils/getTextChangeHandler'
import { ToolbarStateType } from '../../../TextEditor/store/toolbar/types'
import getEditorChangeHandler from '../../utils/getEditorChangeHandler'

type Props = {
  quill?: Quill
  handleFocusChange?: (isFocused: boolean) => void
  handleTextChange?: (html: string) => void
  handleFormatChange?: (format: ToolbarStateType['format']) => void
}

const useSubscribeToQuillEvents = ({
  quill,
  handleFocusChange,
  handleTextChange,
  handleFormatChange
}: Props) => {
  const selectionChangeHandler = useMemo(() => {
    if (!quill || !handleFocusChange) {
      return () => {}
    }

    return getFocusChangeHandler(quill, handleFocusChange)
  }, [quill, handleFocusChange])

  const textChangeHandler: TextChangeHandler = useMemo(() => {
    if (!quill || !handleTextChange) {
      return () => {}
    }

    return getTextChangeHandler(quill, handleTextChange)
  }, [quill, handleTextChange])

  const editorChangeHandler: EditorChangeHandler = useMemo(() => {
    if (!quill || !handleFormatChange) {
      return () => {}
    }

    return getEditorChangeHandler(quill, handleFormatChange)
  }, [quill, handleFormatChange])

  useEffect(() => {
    if (!quill) {
      return
    }

    quill.on('selection-change', selectionChangeHandler)
    quill.on('text-change', textChangeHandler)
    quill.on('editor-change', editorChangeHandler)

    return () => {
      quill.off('selection-change', selectionChangeHandler)
      quill.off('text-change', textChangeHandler)
      quill.off('editor-change', editorChangeHandler)
    }
  }, [quill, selectionChangeHandler, textChangeHandler, editorChangeHandler])
}

export default useSubscribeToQuillEvents
