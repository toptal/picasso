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
        // @types/quill has incorrect convert typing
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const delta = clipboard.convert(controllerValue)

        editorRef.current.setContents(delta, 'silent')
      }
    }
  }, [controllerValue, editorRef])
}

export default useHandleChangeFromController
