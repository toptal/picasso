import { useMemo, useEffect } from 'react'
import Quill, { SelectionChangeHandler, TextChangeHandler } from 'quill'

import getTextChangeHandler from '../../utils/getTextChangeHandler'
import { ToolbarStateType } from '../../../TextEditor/store/toolbar/types'
import getSelectionChangeHandler from '../../utils/getSelectionChangeHandler'

type Props = {
  quill?: Quill
  handleFocusChange?: (isFocused: boolean) => void
  handleTextChange?: (html: string) => void
  handleSelectionChange?: (format: ToolbarStateType['format']) => void
}

const useSubscribeToQuillEvents = ({
  quill,
  handleTextChange,
  handleSelectionChange
}: Props) => {
  const textChangeHandler: TextChangeHandler = useMemo(() => {
    if (!quill || !handleTextChange) {
      return () => {}
    }

    return getTextChangeHandler(quill, handleTextChange)
  }, [quill, handleTextChange])

  const selectionChangeHandler: SelectionChangeHandler = useMemo(() => {
    if (!quill || !handleSelectionChange) {
      return () => {}
    }

    return getSelectionChangeHandler(quill, handleSelectionChange)
  }, [quill, handleSelectionChange])

  useEffect(() => {
    if (!quill) {
      return
    }

    quill.on('selection-change', selectionChangeHandler)
    quill.on('text-change', textChangeHandler)

    return () => {
      quill.off('selection-change', selectionChangeHandler)
      quill.off('text-change', textChangeHandler)
    }
  }, [quill, textChangeHandler, selectionChangeHandler])
}

export default useSubscribeToQuillEvents
