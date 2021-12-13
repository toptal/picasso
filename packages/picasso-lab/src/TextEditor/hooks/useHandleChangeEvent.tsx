import { useEffect } from 'react'
import { TextChangeHandler } from 'quill'

import { EditorRefType } from '../types'
import { Props } from '../TextEditor'
import removeCursorSpan from '../utils/removeCursorSpan'

const useHandleChangeEvent = (
  editorRef: EditorRefType,
  {
    onChange
  }: {
    onChange: Props['onChange']
  }
) => {
  useEffect(() => {
    const { current: editor } = editorRef

    if (editor) {
      const handler: TextChangeHandler = () => {
        const value = editor.root.innerHTML
        const valueWithoutCursorSpan = removeCursorSpan(value)

        onChange(valueWithoutCursorSpan)
      }

      editor.on('text-change', handler)

      return () => {
        editor.off('text-change', handler)
      }
    }
  }, [onChange, editorRef])
}

export default useHandleChangeEvent
