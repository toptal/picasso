import { useEffect } from 'react'
import { TextChangeHandler } from 'quill'

import { EditorRefType } from '../types'
import { Props } from '../TextEditor'

const useHandleChangeEvent = (
  editorRef: EditorRefType,
  { onChange }: { onChange: Props['onChange'] }
) => {
  useEffect(() => {
    const { current: editorApi } = editorRef

    if (editorApi) {
      const handler: TextChangeHandler = () => {
        onChange(editorApi.root.innerHTML)
      }

      editorApi.on('text-change', handler)

      return () => {
        editorApi.off('text-change', handler)
      }
    }
  }, [onChange, editorRef])
}

export default useHandleChangeEvent
