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
    if (!editorRef.current) {
      return
    }

    editorRef.current.addEventListener(
      CUSTOM_QUILL_EDITOR_FORMAT_EVENT,
      formatChangeHandler,
      false
    )

    return () => {
      editorRef.current?.removeEventListener(
        CUSTOM_QUILL_EDITOR_FORMAT_EVENT,
        formatChangeHandler,
        false
      )
    }
  }, [editorRef.current, formatChangeHandler])
}

export default useSubscribeToTextEditorEvents
