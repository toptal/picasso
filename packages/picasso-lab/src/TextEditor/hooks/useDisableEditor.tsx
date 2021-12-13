import { useEffect } from 'react'

import type { EditorRefType } from '../types'

const useDisableEditor = (
  editorRef: EditorRefType,
  { disabled }: { disabled?: boolean }
) => {
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.enable(!disabled)
    }
  }, [disabled, editorRef])
}

export default useDisableEditor
