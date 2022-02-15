import { useMemo, useEffect } from 'react'
import Quill, {
  SelectionChangeHandler,
  TextChangeHandler,
  EditorChangeHandler
} from 'quill'

import getTextChangeHandler from '../../utils/getTextChangeHandler'
import getSelectionChangeHandler from '../../utils/getSelectionChangeHandler'
import getEditorChangeHandler from '../../utils/getEditorChangeHandler'
import getTextLengthChangeHandler from '../../utils/getTextLengthChangeHandler'
import {
  SelectionHandler,
  ChangeHandler,
  TextLengthChangeHandler
} from '../../types'

type Props = {
  quill?: Quill
  onTextChange: ChangeHandler
  onSelectionChange: SelectionHandler
  onTextLengthChange: TextLengthChangeHandler
  maxlength?: number
}

const useSubscribeToQuillEvents = ({
  quill,
  onTextChange,
  onSelectionChange,
  onTextLengthChange,
  maxlength
}: Props) => {
  const textLengthChangeHandler = useMemo(() => {
    if (!quill) {
      return () => {}
    }

    return getTextLengthChangeHandler({ quill, maxlength, onTextLengthChange })
  }, [maxlength, onTextLengthChange, quill])
  const textChangeHandler: TextChangeHandler = useMemo(() => {
    if (!quill) {
      return () => {}
    }

    return getTextChangeHandler(quill, onTextChange)
  }, [quill, onTextChange])

  const selectionChangeHandler: SelectionChangeHandler = useMemo(() => {
    if (!quill) {
      return () => {}
    }

    return getSelectionChangeHandler(quill, onSelectionChange)
  }, [quill, onSelectionChange])

  const editorChangeHandler: EditorChangeHandler = useMemo(() => {
    if (!quill) {
      return () => {}
    }

    return getEditorChangeHandler(quill, onSelectionChange)
  }, [quill, onSelectionChange])

  useEffect(() => {
    if (!quill) {
      return
    }

    quill.on('selection-change', selectionChangeHandler)
    quill.on('text-change', textChangeHandler)
    quill.on('text-change', textLengthChangeHandler)
    quill.on('editor-change', editorChangeHandler)

    return () => {
      quill.off('selection-change', selectionChangeHandler)
      quill.off('text-change', textChangeHandler)
      quill.off('text-change', textLengthChangeHandler)
      quill.off('editor-change', editorChangeHandler)
    }
  }, [
    quill,
    textChangeHandler,
    selectionChangeHandler,
    editorChangeHandler,
    textLengthChangeHandler
  ])
}

export default useSubscribeToQuillEvents
