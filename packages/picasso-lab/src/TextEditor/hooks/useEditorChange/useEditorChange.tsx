import { useEffect } from 'react'
import { EditorChangeHandler } from 'quill'

import { EditorRefType } from '../../types'

type Props = {
  ref: EditorRefType
  handler: EditorChangeHandler
}

const useEditorChange = ({ ref, handler }: Props) => {
  // on quill change events update toolbar active states
  useEffect(() => {
    const quill = ref.current

    if (quill) {
      quill.on('editor-change', handler)

      return () => {
        quill.off('editor-change', handler)
      }
    }
  }, [handler, ref])
}

export default useEditorChange
