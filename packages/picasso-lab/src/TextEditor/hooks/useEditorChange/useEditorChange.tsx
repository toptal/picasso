import { useEffect } from 'react'
import Quill, { EditorChangeHandler } from 'quill'

type Props = {
  quill: Quill | undefined
  handler: EditorChangeHandler
}

const useEditorChange = ({ quill, handler }: Props) => {
  useEffect(() => {
    if (!quill) {
      return
    }

    quill.on('editor-change', handler)

    return () => {
      quill.off('editor-change', handler)
    }
  }, [handler, quill])
}

export default useEditorChange
