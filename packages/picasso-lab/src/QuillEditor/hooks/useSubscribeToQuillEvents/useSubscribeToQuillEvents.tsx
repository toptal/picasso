import { useMemo, useEffect } from 'react'
import Quill, { SelectionChangeHandler, TextChangeHandler } from 'quill'

import getTextChangeHandler from '../../utils/getTextChangeHandler'
import { ToolbarStateType } from '../../../TextEditor/store/toolbar/types'
import getSelectionChangeHandler from '../../utils/getSelectionChangeHandler'

type Props = {
  quill?: Quill
  onTextChange?: (html: string) => void
  onSelectionChange?: (format: ToolbarStateType['format']) => void
}

const useSubscribeToQuillEvents = ({
  quill,
  onTextChange,
  onSelectionChange
}: Props) => {
  const textChangeHandler: TextChangeHandler = useMemo(() => {
    if (!quill || !onTextChange) {
      return () => {}
    }

    return getTextChangeHandler(quill, onTextChange)
  }, [quill, onTextChange])

  const selectionChangeHandler: SelectionChangeHandler = useMemo(() => {
    if (!quill || !onSelectionChange) {
      return () => {}
    }

    return getSelectionChangeHandler(quill, onSelectionChange)
  }, [quill, onSelectionChange])

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
