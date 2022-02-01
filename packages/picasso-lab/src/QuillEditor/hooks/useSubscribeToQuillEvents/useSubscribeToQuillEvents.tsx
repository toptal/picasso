import { useMemo, useEffect } from 'react'
import Quill, { TextChangeHandler } from 'quill'

import getFocusChangeHandler from '../../utils/getFocusChangeHandler'
import getTextChangeHandler from '../../utils/getTextChangeHandler'

type Props = {
  quill?: Quill
  handleFocusChange?: (isFocused: boolean) => void
  handleTextChange?: (html: string) => void
}

const useSubscribeToQuillEvents = ({
  quill,
  handleFocusChange,
  handleTextChange
}: Props) => {
  const selectionChangeHandler = useMemo(() => {
    if (!quill || !handleFocusChange) {
      return () => {}
    }

    return getFocusChangeHandler(quill, handleFocusChange)
  }, [quill, handleFocusChange])

  const textChangeHandler: TextChangeHandler = useMemo(() => {
    if (!quill || !handleTextChange) {
      return () => {}
    }

    return getTextChangeHandler(quill, handleTextChange)
  }, [quill, handleTextChange])

  useEffect(() => {
    if (!quill) {
      return
    }

    quill.on('selection-change', selectionChangeHandler)
    quill.on('text-change', textChangeHandler)
    // quill.on('selection-change', selectionChangeHandler)

    return () => {
      quill.off('selection-change', selectionChangeHandler)
      quill.off('text-change', textChangeHandler)
      // quill.off('selection-change', selectionChangeHandler)
    }
  }, [quill, selectionChangeHandler, textChangeHandler])
}

export default useSubscribeToQuillEvents
