import { TextChangeHandler } from 'quill'
import { useCallback } from 'react'

import { EditorRefType, TextEditorProps } from '../..'
import { removeClasses, removeCursorSpan } from '../../utils'

type Props = {
  ref: EditorRefType
  onChange: TextEditorProps['onChange']
}

const useTextChangeHandler = ({ ref, onChange }: Props) => {
  const textChangeHandler: TextChangeHandler = useCallback(() => {
    const quill = ref.current

    if (!quill) {
      return
    }

    const [cleanValue] = [quill.root.innerHTML]
      .map(removeCursorSpan)
      .map(removeClasses)

    onChange(cleanValue)
  }, [ref, onChange])

  return { textChangeHandler }
}

export default useTextChangeHandler
