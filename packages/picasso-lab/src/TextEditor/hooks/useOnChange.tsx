import { useCallback, useEffect } from 'react'
import { TextChangeHandler } from 'quill'

import { EditorRefType } from '../types'
import { Props } from '../TextEditor'
import { removeCursorSpan, removeClasses } from '../utils'

const useOnChange = ({
  ref,
  onChange
}: {
  ref: EditorRefType
  onChange: Props['onChange']
}) => {
  const handler: TextChangeHandler = useCallback(() => {
    const quill = ref.current

    if (!quill) {
      return
    }

    const [cleanValue] = [quill.root.innerHTML]
      .map(removeCursorSpan)
      .map(removeClasses)

    onChange(cleanValue)
  }, [ref, onChange])

  useEffect(() => {
    const quill = ref.current

    if (quill) {
      quill.on('text-change', handler)

      return () => {
        quill.off('text-change', handler)
      }
    }
  }, [ref, handler])
}

export default useOnChange
