import { useEffect } from 'react'
import { TextChangeHandler } from 'quill'

import { EditorRefType } from '../types'
import { Props } from '../TextEditor'
import { removeCursorSpan, removeClasses } from '../utils'

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
        const [cleanValue] = [editor.root.innerHTML]
          .map(removeCursorSpan)
          .map(removeClasses)

        onChange(cleanValue)
      }

      editor.on('text-change', handler)

      return () => {
        editor.off('text-change', handler)
      }
    }
  }, [onChange, editorRef])
}

export default useHandleChangeEvent
