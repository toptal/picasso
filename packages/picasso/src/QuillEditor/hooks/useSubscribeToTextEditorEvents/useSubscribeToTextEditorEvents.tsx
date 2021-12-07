import { useEffect, useMemo } from 'react'
import Quill from 'quill'

import { CUSTOM_QUILL_EDITOR_FORMAT_EVENT } from '../../constants'
import getFormatChangeHandler from '../../utils/getFormatChangeHandler'

const useSubscribeToTextEditorEvents = ({
  editorRef,
  quill
}: {
  editorRef: React.RefObject<HTMLDivElement>
  quill?: Quill
}) => {
  const formatChangeHandler = useMemo(() => {
    if (!quill) {
      return () => {}
    }

    return getFormatChangeHandler(quill) as EventListener
  }, [quill])

  useEffect(() => {
    const editor = editorRef.current

    if (!editor) {
      return
    }

    editor.addEventListener(
      CUSTOM_QUILL_EDITOR_FORMAT_EVENT,
      formatChangeHandler,
      false
    )

    return () => {
      editor?.removeEventListener(
        CUSTOM_QUILL_EDITOR_FORMAT_EVENT,
        formatChangeHandler,
        false
      )
    }
  }, [editorRef, formatChangeHandler])
}

export default useSubscribeToTextEditorEvents
