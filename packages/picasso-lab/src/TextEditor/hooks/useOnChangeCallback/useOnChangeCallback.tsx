import { useCallback } from 'react'
import Quill, { TextChangeHandler } from 'quill'

import { TextEditorProps } from '../../index'
import { removeClasses, removeCursorSpan } from '../../utils'
import useOnTextChange from '../useOnTextChange'

type Props = {
  quill: Quill
  onChange: TextEditorProps['onChange']
}

const useOnChange = ({ quill, onChange }: Props) => {
  const handleOnChange: TextChangeHandler = useCallback(() => {
    const [cleanValue] = [quill.root.innerHTML]
      .map(removeCursorSpan)
      .map(removeClasses)

    onChange(cleanValue)
  }, [quill, onChange])

  useOnTextChange({
    quill,
    handler: handleOnChange
  })
}

export default useOnChange
