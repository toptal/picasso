import { useEffect } from 'react'

import { EditorRefType } from '../../types'

const useAutofocus = ({
  autofocus,
  ref
}: {
  autofocus?: boolean
  ref: EditorRefType
}) => {
  useEffect(() => {
    const quill = ref.current

    if (quill && autofocus) {
      quill.focus()
    }
  }, [autofocus, ref])
}

export default useAutofocus
