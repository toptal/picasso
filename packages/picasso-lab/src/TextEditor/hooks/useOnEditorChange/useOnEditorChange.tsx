import { useEffect } from 'react'
import Quill from 'quill'

import { EditorChangeHandler } from '../../types'

type Props = {
  quill: Quill
  handler: EditorChangeHandler
}

const useOnEditorChange = ({ quill, handler }: Props) => {
  useEffect(() => {
    quill.on('editor-change', handler)

    return () => {
      quill.off('editor-change', handler)
    }
  }, [handler, quill])
}

export default useOnEditorChange
