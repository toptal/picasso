import { useCallback, useEffect } from 'react'
import { EditorChangeHandler, RangeStatic } from 'quill'
import Delta from 'quill-delta'

import { EditorRefType } from '../types'
import { EMPTY_STATE } from '../constants'

type Props = {
  ref: EditorRefType
  setToolbarState: Function
}

const useToolbarActiveStates = ({ ref, setToolbarState }: Props) => {
  // on quill change events update toolbar active states

  const handler: EditorChangeHandler = useCallback(
    (
      eventName: 'text-change' | 'selection-change',
      ...args: [Delta | RangeStatic]
    ) => {
      const quill = ref.current

      if (!quill) {
        return
      }

      if (eventName === 'text-change') {
        const format = quill.getFormat()

        setToolbarState(format)
      }

      if (eventName === 'selection-change') {
        const [range] = args as [RangeStatic]

        if (range) {
          const format = quill.getFormat(range)

          setToolbarState(format)
        } else {
          // when user clicks out of text editor
          setToolbarState(EMPTY_STATE)
        }
      }
    },
    [ref, setToolbarState]
  )

  useEffect(() => {
    const quill = ref.current

    if (quill) {
      quill.on('editor-change', handler)
    }
  }, [handler, ref])
}

export default useToolbarActiveStates
