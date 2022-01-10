import { useEffect, useRef } from 'react'

import { EditorRefType } from '../types'

const useAutofocus = ({
  autofocus,
  ref
}: {
  autofocus?: boolean
  ref: EditorRefType
}) => {
  const firstRender = useRef(true)

  useEffect(() => {
    const quill = ref.current

    if (firstRender.current && quill && autofocus) {
      quill.focus()
      firstRender.current = false
    }
  }, [autofocus, ref])
}

export default useAutofocus
