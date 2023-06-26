import { useMemo, useEffect } from 'react'
import type {
  SelectionChangeHandler,
  TextChangeHandler,
  EditorChangeHandler,
} from 'quill'
import type Quill from 'quill'

import getTextChangeHandler from '../../utils/getTextChangeHandler'
import getSelectionChangeHandler from '../../utils/getSelectionChangeHandler'
import getEditorChangeHandler from '../../utils/getEditorChangeHandler'
import getTextLengthChangeHandler from '../../utils/getTextLengthChangeHandler'
import getCleanupOnAllContentRemovalHandler from '../../utils/getCleanupOnAllContentRemovalHandler'
import type {
  SelectionHandler,
  ChangeHandler,
  TextLengthChangeHandler,
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
  onTextLengthChange,
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

  const cleanupOnAllContentRemovalHandler: TextChangeHandler = useMemo(() => {
    if (!quill) {
      return () => {}
    }

    return getCleanupOnAllContentRemovalHandler(quill)
  }, [quill])

  useEffect(() => {
    if (!quill) {
      return
    }

    quill.on('selection-change', selectionChangeHandler)
    quill.on('text-change', textChangeHandler)
    quill.on('text-change', textLengthChangeHandler)
    quill.on('text-change', cleanupOnAllContentRemovalHandler)
    quill.on('editor-change', editorChangeHandler)

    return () => {
      quill.off('selection-change', selectionChangeHandler)
      quill.off('text-change', textChangeHandler)
      quill.off('text-change', textLengthChangeHandler)
      quill.off('text-change', cleanupOnAllContentRemovalHandler)
      quill.off('editor-change', editorChangeHandler)
    }
  }, [
    quill,
    textChangeHandler,
    selectionChangeHandler,
    editorChangeHandler,
    textLengthChangeHandler,
    cleanupOnAllContentRemovalHandler,
  ])
}

export default useSubscribeToQuillEvents
