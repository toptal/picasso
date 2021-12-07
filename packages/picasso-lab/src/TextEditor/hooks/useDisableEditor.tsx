import { useEffect } from 'react'

import type { EditorRefType } from '../types'
import { Props } from '../TextEditor'

const useDisableEditor = (
  editorRef: EditorRefType,
  { disabled }: { disabled: Props['disabled'] }
) => {
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.enable(!disabled)
    }
  }, [disabled, editorRef])
}

export default useDisableEditor
