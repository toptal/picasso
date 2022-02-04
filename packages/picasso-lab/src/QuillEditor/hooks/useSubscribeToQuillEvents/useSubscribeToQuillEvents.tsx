import { useMemo, useEffect } from 'react'
import Quill, {
  SelectionChangeHandler,
  TextChangeHandler,
  EditorChangeHandler
} from 'quill'

import getTextChangeHandler from '../../utils/getTextChangeHandler'
import getSelectionChangeHandler from '../../utils/getSelectionChangeHandler'
import getFormatChangeHandler from '../../utils/getFormatChangeHandler'
import getEditorChangeHandler from '../../utils/getEditorChangeHandler'
import { SelectionHandler, ChangeHandler } from '../../types'
import { CUSTOM_QUILL_EDITOR_FORMAT_EVENT } from '../../constants'

type Props = {
  id: string
  quill?: Quill
  onTextChange: ChangeHandler
  onSelectionChange: SelectionHandler
}

const useSubscribeToQuillEvents = ({
  id,
  quill,
  onTextChange,
  onSelectionChange
}: Props) => {
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

  const formatChangeHandler = useMemo(() => {
    if (!quill) {
      return () => {}
    }

    return getFormatChangeHandler(quill) as EventListener
  }, [quill])

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

    const quillMountElement = document.getElementById(id)

    quill.on('selection-change', selectionChangeHandler)
    quill.on('text-change', textChangeHandler)
    quill.on('editor-change', editorChangeHandler)
    quillMountElement?.addEventListener(
      CUSTOM_QUILL_EDITOR_FORMAT_EVENT,
      formatChangeHandler,
      false
    )

    return () => {
      quill.off('selection-change', selectionChangeHandler)
      quill.off('text-change', textChangeHandler)
      quill.off('editor-change', editorChangeHandler)
      quillMountElement?.removeEventListener(
        CUSTOM_QUILL_EDITOR_FORMAT_EVENT,
        formatChangeHandler,
        false
      )
    }
  }, [
    quill,
    textChangeHandler,
    selectionChangeHandler,
    editorChangeHandler,
    formatChangeHandler,
    id
  ])
}

export default useSubscribeToQuillEvents
