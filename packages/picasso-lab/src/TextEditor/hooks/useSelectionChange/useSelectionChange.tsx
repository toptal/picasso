import { useEffect } from 'react'
import { SelectionChangeHandler } from 'quill'

import { EditorRefType } from '../../types'

const useSelectionChange = ({
  ref,
  handler
}: {
  ref: EditorRefType
  handler: SelectionChangeHandler
}) => {
  useEffect(() => {
    const quill = ref.current

    if (quill) {
      quill.on('selection-change', handler)

      return () => {
        quill.off('selection-change', handler)
      }
    }
  }, [ref, handler])
}

export default useSelectionChange
