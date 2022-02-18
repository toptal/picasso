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
import getCleanupOnAllContentRemoval from '../../utils/getCleanupOnAllContentRemoval'
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
}

const useSubscribeToQuillEvents = ({
  quill,
  onTextChange,
  onSelectionChange,
  onTextLengthChange
}: Props) => {
  const textLengthChangeHandler = useMemo(() => {
    if (!quill) {
      return () => {}
    }

    return getTextLengthChangeHandler(quill, onTextLengthChange)
  }, [quill, onTextLengthChange])

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

  const cleanupOnAllContentRemoval: TextChangeHandler = useMemo(() => {
    if (!quill) {
      return () => {}
    }

    return getCleanupOnAllContentRemoval(quill)
  }, [quill])

  useEffect(() => {
    if (!quill) {
      return
    }

    quill.on('selection-change', selectionChangeHandler)
    quill.on('text-change', textChangeHandler)
    quill.on('text-change', textLengthChangeHandler)
    quill.on('text-change', cleanupOnAllContentRemoval)
    quill.on('editor-change', editorChangeHandler)

    return () => {
      quill.off('selection-change', selectionChangeHandler)
      quill.off('text-change', textChangeHandler)
      quill.off('text-change', textLengthChangeHandler)
      quill.off('text-change', cleanupOnAllContentRemoval)
      quill.off('editor-change', editorChangeHandler)
    }
  }, [
    quill,
    textChangeHandler,
    selectionChangeHandler,
    editorChangeHandler,
    textLengthChangeHandler,
    cleanupOnAllContentRemoval
  ])
}

export default useSubscribeToQuillEvents
