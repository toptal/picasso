import { useEffect } from 'react'
import Delta from 'quill-delta'

import { EditorRefType } from '../types'
import { Props } from '../TextEditor'
import { removeCursorSpan, removeClasses } from '../utils'

/**
 * TextEditor works as controlled input, when someone changes props.value
 * we need to also change value in editor itself
 */
const useOnValueChange = ({
  ref,
  value: controllerValue
}: {
  ref: EditorRefType
  value: Props['value']
}) => {
  useEffect(() => {
    const quill = ref.current

    if (!quill || !controllerValue) {
      return
    }

    const currentValue = quill.root.innerHTML
    const isValueChanged = currentValue !== controllerValue

    if (isValueChanged) {
      const [cleanValue] = [currentValue]
        .map(removeCursorSpan)
        .map(removeClasses)

      /**
       * when we format the text and want to enter new line, quill silently
       * adds <span class="ql-cursor"></span> to new line, that it is wrapped
       * with previously used format. For example, if we used on end of previous line bold,
       * on new line quill adds <strong><span class="ql-cursor"></span></strong> for internal
       * purposes. In this case comparison of values would fail, so we replace cursor with <br>
       * and check again
       */
      if (cleanValue !== controllerValue) {
        const delta = (quill.clipboard.convert as (html: string) => Delta)(
          controllerValue
        )

        quill.setContents(delta, 'silent')
      }
    }
  }, [controllerValue, ref])
}

export default useOnValueChange
