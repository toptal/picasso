import { useCallback, useEffect, useMemo } from 'react'
import Quill from 'quill'

import {
  CUSTOM_QUILL_EDITOR_FORMAT_EVENT,
  INSERT_DEFAULT_LINK_TEXT,
} from '../../constants'
import getFormatChangeHandler from '../../utils/getFormatChangeHandler'

const useSubscribeToTextEditorEvents = ({
  editorRef,
  quill,
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

  const insertDefaultLinkText = useCallback(
    ({ detail }) => {
      if (!quill) {
        return
      }

      const { link } = detail

      const selection = quill.getSelection(true) ?? { index: 0, length: 0 }

      if (selection.length === 0) {
        quill.insertText(selection.index, link)
        quill.setSelection(
          quill.getLength() - 1 - link.length,
          quill.getLength()
        )
      }
    },
    [quill]
  )

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

    editor.addEventListener(
      INSERT_DEFAULT_LINK_TEXT,
      insertDefaultLinkText,
      false
    )

    return () => {
      editor?.removeEventListener(
        CUSTOM_QUILL_EDITOR_FORMAT_EVENT,
        formatChangeHandler,
        false
      )
      editor?.removeEventListener(
        INSERT_DEFAULT_LINK_TEXT,
        insertDefaultLinkText,
        false
      )
    }
  }, [editorRef, formatChangeHandler, insertDefaultLinkText])
}

export default useSubscribeToTextEditorEvents
