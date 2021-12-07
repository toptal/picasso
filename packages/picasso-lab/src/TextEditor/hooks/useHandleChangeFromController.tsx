import { useEffect } from 'react'

import type { EditorRefType } from '../types'
import { Props } from '../TextEditor'

/**
 * TextEditor works as controlled input, when someone changes props.value
 * we need to also change value in editor itself
 */
const useHandleChangeFromController = (
  editorRef: EditorRefType,
  { value: controllerValue }: { value: Props['value'] }
) => {
  useEffect(() => {
    if (editorRef?.current && typeof controllerValue === 'string') {
      const {
        clipboard,
        root: { innerHTML: editorValue }
      } = editorRef.current

      // is value set from outside
      if (editorValue !== controllerValue) {
        // TODO discuss with others, if we should sanitize here
        // usecase - editing current job description
        clipboard.dangerouslyPasteHTML(controllerValue)
      }
    }
  }, [controllerValue, editorRef])
}

export default useHandleChangeFromController
