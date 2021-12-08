import { useEffect, useRef } from 'react'

import type { EditorRefType } from '../types'
import { Props } from '../TextEditor'

const useHandleAutofocus = (
  editorRef: EditorRefType,
  { autofocus }: { autofocus: Props['autofocus'] }
) => {
  const firstRender = useRef(true)

  useEffect(() => {
    const editorApi = editorRef?.current

    if (firstRender?.current && editorApi && autofocus) {
      // without setTimeout is focus called on last instance🤷‍♂️
      setTimeout(() => {
        editorApi.focus()
        firstRender.current = false
      }, 0)
    }
  }, [autofocus, editorRef])
}

export default useHandleAutofocus
